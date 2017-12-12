import React, { Component } from "react";

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestCharge: "..."
    };
    this.createCharge = this.createCharge.bind(this);
  }

  createCharge(event) {
    const month_year = this._month.value;
    const amount = this._amount.value;
    const cardNum = this._cardNum.value;
    const descrpt = this._description.value;

    this.setState(
      {
        latestCharge: "Creating token..."
      },
      () => {
        this.props
          .postPublic("tokens", {
            "card[number]": cardNum,
            "card[exp_month]": month_year.split("-")[1],
            "card[exp_year]": month_year.split("-")[0]
          })
          .then(response => {
            if (response.error) {
              alert(response.error.message);
              this.setState({
                latestCharge: "Failed"
              });
            }
            this.setState({
              latestCharge: "Create charges..."
            });

            return this.props.postSecret("charges", {
              amount: amount,
              currency: "usd",
              description: descrpt,
              source: response.id
            });
          })
          .then(charge => {
            if (charge.error) {
              this.setState({
                latestCharge: "failed"
              });
            } else {
              this.setState({
                latestCharge: charge.status
              });
            }
          });
      }
    );

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.createCharge}>
        <div className="tabs">
          <h2>Make a charge!</h2>
          <p className="subtitle">Card details</p>
          <label>
            Card number:
            <input
              type="text"
              placeholder="Card number"
              pattern="[0-9]{13,16}"
              ref={card => (this._cardNum = card)}
            />
          </label>

          <label>
            Exp Month:
            <input
              type="month"
              placeholder="Expire Month"
              ref={input => (this._month = input)}
            />
          </label>

          <label style={{ marginTop: 10 }}>
            Amount:
            <input
              type="number"
              placeholder="Enter amount to charge"
              ref={input => (this._amount = input)}
            />
          </label>

          <label style={{ marginTop: 5 }}>
            Description:
            <input
              type="text"
              placeholder="Description for charge"
              ref={input => (this._description = input)}
            />
          </label>
        </div>

        <input type="submit" value="Pay" />

        <br />
        <p
          className={`${
            this.state.latestCharge === "succeeded"
              ? "succeeded"
              : (this.state.latestCharge === "failed" ? "failed" : "normal")
          }`}
        >
          Status: {this.state.latestCharge}
        </p>
      </form>
    );
  }
}

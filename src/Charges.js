import React, { Component } from "react";
import "./App.css";
import ChargeItem from "./ChargeItem";

export default class Charges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCharges: [],
      status: "None"
    };
  }

  componentWillMount(props) {
    console.log(this.props);
    this.setState(
      {
        status: "Loading charges..."
      },
      () => {
        this.props.getCharges("charges").then(json => {
          console.log(json.data);
          this.setState({
            listCharges: json.data,
            status: ""
          });
        });
      }
    );
  }

  render() {
    return (
      <div>
        <div className="chargeHolder">
          <h3 className="item_center">Amount</h3>
          <h3 className="item_center">Currency</h3>
          <h3 className="item_center">Amount refunded</h3>
          <h3 className="item_center">Description</h3>
        </div>

        {this.state.listCharges.map(c => (
          <ChargeItem key={c.id} chargeItem={c} />
        ))}

        <p>{this.state.status}</p>
      </div>
    );
  }
}

import React, { Component } from 'react';
import './App.css';

export default class ChargeItem extends Component {
    render() {
        const props = this.props.chargeItem;

        return (
            <div  className="chargeHolder">
                <p className="item_center">{props.amount}</p>
                <p className="item_center">{props.currency}</p>
                <p className="item_center">{props.amount_refunded}</p>
                <p className="item_left">{props.description}</p>
              
            </div>
        )
    }
}

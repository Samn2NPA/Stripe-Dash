import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { TabList, Tab } from "./Tabs";
import Checkout from "./Checkout.js";
import Charges from "./Charges.js";
import {withStripe} from './StripeApi.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.setState({
    })
  }

  render() {
    const WrappedCheckout = withStripe(
      Checkout, 
      'pk_test_Obwmz73MEeCdYR1G8l7431TY',
      'sk_test_ZWaAcTswUoUkckGIjLcSuyAO'
    )

    const WrappedCharges = withStripe(
      Charges,
      'pk_test_Obwmz73MEeCdYR1G8l7431TY',
      'sk_test_ZWaAcTswUoUkckGIjLcSuyAO'
    )

    return (
      <TabList>
        <Tab name="Checkout">
        <WrappedCheckout />
        </Tab>
        <Tab name="Charges">
        <WrappedCharges/>
        </Tab>
      </TabList>
    );
  }
}

export default App;

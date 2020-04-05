import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { STRIPE_APIKEY } from '../firebase.config';

export default class Stripe extends React.Component {
  onToken = (token) => {
    alert('Successfully Payment')
   // save token in database

  }


  render() {
    return (
      <StripeCheckout
        SameSite={true}
        stripeKey={STRIPE_APIKEY}
        token={this.onToken}
      />
    )
  }
}
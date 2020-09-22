import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { STRIPE_APIKEY } from '../firebase.config';

export default class Stripe extends React.Component {
  onToken = (token) => {
    alert('Successfully Payment')
    let cartInfo = {
      card:token.card.id,
      email:token.email
    }
    this.props.handlePayInfo(cartInfo)
   // save token in database
    console.log(cartInfo)
  }


  render() {
    return (
      <StripeCheckout
        {...this.props}
        SameSite={true}
        stripeKey={STRIPE_APIKEY}
        token={this.onToken}
      />
    )
  }
}
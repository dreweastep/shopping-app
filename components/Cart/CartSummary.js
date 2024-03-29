import { Button, Segment, Divider } from 'semantic-ui-react'
import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import calculateCartTotal from '../../utils/calculateCartTotal'

function CartSummary({ products, handleCheckout, success }) {
  const [cartAmount, setCartAmount] = React.useState(0)
  const [stripeAmount, setStripeAmount] = React.useState(0)
  const [isCartEmpty, setCartEmpty] = React.useState(false)

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products)

    setCartAmount(cartTotal)
    setStripeAmount(stripeTotal)
    setCartEmpty(products.length === 0)
  }, [products])

  return <>
    <Divider />
    <Segment clearing size="large">
      <strong>Sub total:</strong> ${cartAmount}
      <StripeCheckout
        name="Shopping app"
        amount={stripeAmount}
        image={products.length > 0 ? products[0].product.mediaUrl : ""}
        currency="USD"
        shippingAddress={true}
        billingAddress={true}
        zipCode={true}
        token={handleCheckout}
        stripeKey="pk_test_B2pYa0ihO44Z1JU1fIcmbU4n00tGPsPU9o"
        trigger="onClick"
      >
        <Button
          icon="cart"
          color="teal"
          floated="right"
          content="Checkout"
          disabled={isCartEmpty || success}
        />
      </StripeCheckout>
    </Segment>
  </>;
}

export default CartSummary;

import { OrderStatus } from "@saleor/sdk";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { ThankYou } from ".";

const continueShopping = action("Continue shopping has been clicked");
const orderDetails = action("Order details has been clicked");

storiesOf("@components/organisms/ThankYou", module)
  .addParameters({ component: ThankYou })
  .add("default", () => (
    <ThankYou
      orderStatus={OrderStatus.UNFULFILLED}
      orderNumber="#341414"
      amount="999"
      qr="qr_code"
      paymentMethodName="promptpay"
      continueShopping={continueShopping}
      orderDetails={orderDetails}
      paymentMethodName="PromptPay"
    />
  ))
  .add("with order unfulfilled", () => (
    <ThankYou
      orderStatus={OrderStatus.UNFULFILLED}
      orderNumber="#341414"
      amount="999"
      qr="qr_code"
      paymentMethodName="promptpay"
      continueShopping={continueShopping}
      orderDetails={orderDetails}
      paymentMethodName="PromptPay"
    />
  ))
  .add("with order unconfirmed", () => (
    <ThankYou
      orderStatus={OrderStatus.UNCONFIRMED}
      orderNumber="#341414"
      amount="999"
      qr="qr_code"
      paymentMethodName="promptpay"
      continueShopping={continueShopping}
      orderDetails={orderDetails}
      paymentMethodName="PromptPay"
    />
  ));

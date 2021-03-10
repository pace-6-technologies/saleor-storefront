import { OrderStatus } from "@saleor/sdk";
import { storiesOf } from "@storybook/react";
import React from "react";

import { ThankYou } from ".";

storiesOf("@components/organisms/ThankYou", module)
  .addParameters({ component: ThankYou })
  .add("default", () => (
    <ThankYou
      orderStatus={OrderStatus.UNFULFILLED}
      orderNumber="#341414"
      amount="999"
      qr="qr_code"
      continueShopping={() => {}}
      orderDetails={() => {}}
      paymentMethodName="PromptPay"
      continueShoppingUrl="/"
      orderDetailsUrl="/order/xyz"
    />
  ))
  .add("with order unfulfilled", () => (
    <ThankYou
      orderStatus={OrderStatus.UNFULFILLED}
      orderNumber="#341414"
      amount="999"
      qr="qr_code"
     continueShopping={() => {}}
      paymentMethodName="PromptPay"
      continueShoppingUrl="/"
      orderDetailsUrl="/order/xyz"
    />
  ))
  .add("with order unconfirmed", () => (
    <ThankYou
      orderStatus={OrderStatus.UNCONFIRMED}
      orderNumber="#341414"
      amount="999"
      qr="qr_code"
      orderDetails={() => {}}
      paymentMethodName="PromptPay"
      continueShoppingUrl="/"
      orderDetailsUrl="/order/xyz"
    />
  ));

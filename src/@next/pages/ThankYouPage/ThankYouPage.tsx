import { useAuth } from "@saleor/sdk";
import { NextPage } from "next";
import React from "react";

import { ThankYou } from "@components/organisms";
import { paths } from "@paths";
import NotFound from "@temp/components/NotFound";

import { IProps } from "./types";

export const ThankYouPage: NextPage<IProps> = ({
  query: { orderNumber, token, orderStatus, amount, qr, paymentMethodName },
}) => {
  const { user } = useAuth();

  return token && orderNumber && orderStatus ? (
    <ThankYou
      continueShoppingUrl={paths.home}
      orderNumber={orderNumber}
      orderDetailsUrl={{
        pathname: user ? paths.accountOrderDetail : paths.guestOrderDetail,
        query: { token },
      }}
      orderStatus={orderStatus}
      amount={amount}
      paymentMethodName={paymentMethodName}
      continueShopping={() => {}}
      qr={qr}
      orderDetails={() => {}}
    />
  ) : (
    <NotFound />
  );
};

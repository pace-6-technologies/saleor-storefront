import { OrderStatus } from "@saleor/sdk";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import QRCode from "react-qr-code";

import { Button } from "@components/atoms";
import { Container } from "@components/templates";
import { PROVIDERS } from "@temp/core/config";
import { checkoutMessages } from "@temp/intl";

import * as S from "./styles";
import { IProps } from "./types";

export const messages = defineMessages({
  unfulfilled: {
    defaultMessage:
      "We’ve emailed you an order confirmation, and we’ll notify you when the order has been shipped.",
    description: "thank you subtitle",
  },
  unconfirmed: {
    defaultMessage:
      "Your order has been placed, it needs to be confirmed by the staff, we'll send you an email when it's done.",
    description: "thank you subtitle",
  },
});

/**
 * Thank you page after completing the checkout.
 */
const ThankYou: React.FC<IProps> = ({
  orderStatus,
  orderNumber,
  continueShopping,
  orderDetails,
  amount,
  paymentMethodName,
  qr,
  continueShoppingUrl,
  orderDetailsUrl,
}: IProps) => {
  const [promptpayQR, setPromptpayQR] = useState("");

  useEffect(() => {
    if (qr !== "" && PROVIDERS.PROMPTPAY.label === paymentMethodName) {
      setPromptpayQR(qr);
    }
  }, []);

  return (
    <Container data-test="thankYouView">
      <S.Wrapper>
        <S.ThankYouHeader>
          <FormattedMessage defaultMessage="Thank you" />
          <br />
          <span>
            <FormattedMessage defaultMessage="for your order!" />
          </span>
        </S.ThankYouHeader>
        <S.Paragraph>
          <FormattedMessage defaultMessage="Your order number is" />{" "}
          <span>{orderNumber}</span>
        </S.Paragraph>
        <S.Paragraph>
          <FormattedMessage
            {...(orderStatus === OrderStatus.UNCONFIRMED
              ? messages.unconfirmed
              : messages.unfulfilled)}
          />
        </S.Paragraph>
        <S.Paragraph>
          {PROVIDERS.OMISE_PROMPTPAY.label === paymentMethodName && (
            <img
              alt="omise_qr"
              src={qr}
              style={{ width: "100%", height: "500px" }}
            />
          )}
          {PROVIDERS.PROMPTPAY.label === paymentMethodName && (
            <QRCode value={promptpayQR} />
          )}
        </S.Paragraph>
        <S.Buttons>
          <Link href={continueShoppingUrl}>
            <Button
              testingContext="continueShoppingButton"
              color="secondary"
              fullWidth
            >
              <FormattedMessage {...checkoutMessages.continueShopping} />
            </Button>
          </Link>
          <Link href={orderDetailsUrl}>
            <Button testingContext="gotoOrderDetailsButton" fullWidth>
              <FormattedMessage defaultMessage="ORDER DETAILS" />
            </Button>
          </Link>
        </S.Buttons>
      </S.Wrapper>
    </Container>
  );
};

export { ThankYou };

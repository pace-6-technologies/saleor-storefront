import React, { useEffect, useState } from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { Button } from "@components/atoms";
import { Container } from "@components/templates";
import { checkoutMessages } from "@temp/intl";

import { OrderStatus } from "@saleor/sdk";
import QRCode from "react-qr-code";

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
}: IProps) => {
  const [promptpayQR, setPromptpayQR] = useState("");

  useEffect(() => {
    if (qr !== "") {
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
          {promptpayQR && <QRCode value={promptpayQR} />}
        </S.Paragraph>
        <S.Buttons>
          <Button
            testingContext="continueShoppingButton"
            onClick={continueShopping}
            color="secondary"
            fullWidth
          >
            <FormattedMessage {...checkoutMessages.continueShopping} />
          </Button>
          <Button
            testingContext="gotoOrderDetailsButton"
            onClick={orderDetails}
            fullWidth
          >
            <FormattedMessage defaultMessage="ORDER DETAILS" />
          </Button>
        </S.Buttons>
      </S.Wrapper>
    </Container>
  );
};

export { ThankYou };

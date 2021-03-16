/* eslint-disable no-undef */
import { useCheckout } from "@saleor/sdk";
import React, { useState } from "react";

import { ErrorMessage } from "@components/atoms";
import { CreditCardForm } from "@components/organisms";

import {
  braintreePayment,
  ErrorData,
  ICardInputs,
  ICardPaymentInput,
  IPaymentCardError,
  PaymentData,
} from "../../../../core/payments/braintree";
import { maybe, removeEmptySpaces } from "../../../../core/utils";
import * as S from "./styles";

const INITIAL_CARD_ERROR_STATE = {
  fieldErrors: {
    cvv: null,
    expirationMonth: null,
    expirationYear: null,
    number: null,
    name: null,
  },
  nonFieldError: "",
};

export const OmiseCreditPaymentGateway = ({
  config,
  processPayment,
  formRef,
  formId,
  errors = [],
  onError,
}) => {
  const [submitErrors, setSubmitErrors] = useState([]);
  const { payment } = useCheckout();
  const [test, setTest] = useState(null);
  const public_Key = config.find(({ field }) => field === "api_public_key")
    ?.value;

  const [cardErrors, setCardErrors] = useState(INITIAL_CARD_ERROR_STATE);

  const setCardErrorsHelper = errors =>
    errors.map(({ field, message }) =>
      setCardErrors(({ fieldErrors }) => ({
        fieldErrors: {
          ...fieldErrors,
          [field]: { field, message },
        },
      }))
    );

  const handleSubmit = async formData => {
    const data_checkout = localStorage.getItem("data_checkout");
    const parse_data_checkout = JSON.parse(data_checkout);
    setSubmitErrors([]);
    const creditCard = {
      security_code: removeEmptySpaces(maybe(() => formData.ccCsc, "") || ""),
      expirationDate: removeEmptySpaces(maybe(() => formData.ccExp, "") || ""),
      number: removeEmptySpaces(maybe(() => formData.ccNumber, "") || ""),
      name: removeEmptySpaces(maybe(() => formData.ccName, "") || ""),
    };
    const { Omise } = window;
    const exp = creditCard?.expirationDate?.split("/");
    const bodyCreditCard = {
      ...creditCard,
      expiration_month: exp[0],
      expiration_year: exp[1],
    };
    await Omise.createToken(
      "card",
      bodyCreditCard,
      (statusCode, { card, id }) => {
        if (statusCode !== 200) {
          const braintreePayloadErrors = [
            {
              message:
                "Payment submission error. Braintree gateway returned no token in payload.",
            },
          ];
          setSubmitErrors(braintreePayloadErrors);
          onError(braintreePayloadErrors);
          return;
        }
        processPayment(id, {
          brand: card?.brand,
          expMonth: card?.exp_month || null,
          expYear: card?.exp_year || null,
          firstDigits: null,
          lastDigits: card?.last_digits,
        });
      }
    );
  };

  const allErrors = [...errors, ...submitErrors];

  const initialOmiseCard = () => {
    const { Omise } = window;
    Omise.publicKey = public_Key;
  };

  React.useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://cdn.omise.co/omise.js";
    script.async = true;
    script.id = "omise";
    script.onload = () => initialOmiseCard();

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div data-test="braintreePaymentGateway">
      <CreditCardForm
        formRef={formRef}
        formId={formId}
        cardErrors={cardErrors.fieldErrors}
        labelsText={{
          ccName: "Name on card",
          ccCsc: "CVC",
          ccExp: "Expiration date",
          ccNumber: "Card number",
        }}
        disabled={false}
        handleSubmit={handleSubmit}
      />
      <ErrorMessage errors={allErrors} />
    </div>
  );
};

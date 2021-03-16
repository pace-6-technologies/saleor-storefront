import { OrderStatus, useCheckout } from "@saleor/sdk";
import React, {
  forwardRef,
  RefForwardingComponent,
  useImperativeHandle,
  useState,
} from "react";

import { CheckoutReview } from "@components/organisms";
import { statuses as dummyStatuses } from "@components/organisms/DummyPaymentGateway";
import { IFormError } from "@types";

import {
  CheckoutStep,
  SubpageBaseProps,
  SubpageCompleteHandler,
} from "../utils";

export interface ISubmitCheckoutData {
  id: string;
  orderNumber: string;
  token: string;
  orderStatus: OrderStatus;
  amount: string;
  paymentMethodName: string;
  qr: string;
}

interface CheckoutReviewSubpageProps extends SubpageBaseProps {
  selectedPaymentGatewayToken?: string;
  paymentGatewayFormRef: React.RefObject<HTMLFormElement>;
}

const CheckoutReviewSubpageWithRef: RefForwardingComponent<
  SubpageCompleteHandler,
  CheckoutReviewSubpageProps
> = (
  {
    selectedPaymentGatewayToken,
    paymentGatewayFormRef,
    changeSubmitProgress,
    onSubmitSuccess,
  },
  ref
) => {
  const { checkout, payment, completeCheckout } = useCheckout();

  const [errors, setErrors] = useState<IFormError[]>([]);

  const checkoutShippingAddress = checkout?.shippingAddress
    ? {
        ...checkout?.shippingAddress,
        phone: checkout?.shippingAddress?.phone || undefined,
      }
    : undefined;

  const checkoutBillingAddress = checkout?.billingAddress
    ? {
        ...checkout?.billingAddress,
        phone: checkout?.billingAddress?.phone || undefined,
      }
    : undefined;

  const getPaymentMethodDescription = () => {
    if (payment?.gateway === "mirumee.payments.dummy") {
      return `Dummy: ${
        dummyStatuses.find(
          status => status.token === selectedPaymentGatewayToken
        )?.label
      }`;
    }
    if (payment?.gateway === "mirumee.payments.adyen") {
      return `Adyen payments`;
    }
    if (payment?.gateway === "pace6.payments.promptpay") {
      return `PromptPay`;
    }
    if (payment?.gateway === "pace6.payments.omise.promptpay") {
      return `Omise PromptPay`;
    }
    if (
      payment?.gateway === "pace6.payments.omise.credit_card" &&
      payment?.creditCard
    ) {
      return `Omise Credit Card Ending in ${payment?.creditCard.lastDigits}`;
    }
    if (payment?.creditCard) {
      return `Ending in ${payment?.creditCard.lastDigits}`;
    }
    return ``;
  };

  useImperativeHandle(ref, () => async () => {
    changeSubmitProgress(true);
    if (payment?.gateway === "mirumee.payments.adyen") {
      paymentGatewayFormRef.current?.dispatchEvent(
        new Event("submitComplete", { cancelable: true })
      );
    }

    const response = await completeCheckout();
    const { dataError, data } = response;
    changeSubmitProgress(false);

    if (dataError) {
      setErrors(dataError as any);
    } else {
      setErrors([]);
      let qrData = "";
      if (payment?.gateway === "pace6.payments.promptpay") {
        qrData = JSON.parse(data?.confirmationData).qr_code;
      }
      if (payment?.gateway === "pace6.payments.omise.promptpay") {
        qrData = JSON.parse(data?.confirmationData).qr_code_url;
      }
      onSubmitSuccess(CheckoutStep.Review, {
        id: data?.order?.id,
        orderStatus: data?.order?.status,
        orderNumber: data?.order?.number,
        token: data?.order?.token,
        amount:
          data?.order?.total?.net?.amount || data?.order?.total?.gross?.amount,
        paymentMethodName: getPaymentMethodDescription(),
        qr: qrData,
      });
    }
  });

  return (
    <CheckoutReview
      shippingAddress={checkoutShippingAddress}
      billingAddress={checkoutBillingAddress}
      shippingMethodName={checkout?.shippingMethod?.name}
      paymentMethodName={getPaymentMethodDescription()}
      email={checkout?.email}
      errors={errors}
    />
  );
};

const CheckoutReviewSubpage = forwardRef(CheckoutReviewSubpageWithRef);

export { CheckoutReviewSubpage };

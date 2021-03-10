import { useCheckout } from "@saleor/sdk";
import React, { useRef } from "react";

export interface IPromptPayGatewayProps {
  formRef?: React.RefObject<HTMLFormElement>;
  processPayment: (token?: string) => void;
}

export const PromptPayGateway: React.FC<IPromptPayGatewayProps> = ({
  formRef,
  processPayment,
}) => {
  const gatewayRef = useRef<HTMLDivElement>(null);
  const { checkout } = useCheckout();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    processPayment(checkout?.token);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div ref={gatewayRef} />
    </form>
  );
};

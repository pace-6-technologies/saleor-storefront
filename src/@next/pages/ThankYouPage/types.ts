import { OrderStatus } from "@saleor/sdk";

export type IProps = {
  query: {
    orderNumber?: string;
    token?: string;
    orderStatus?: OrderStatus;
    amount: string;
    qr: string;
    paymentMethodName: string;
  };
};

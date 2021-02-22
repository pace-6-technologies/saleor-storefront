import { OrderStatus } from "@saleor/sdk";

export interface IProps {
  orderStatus: OrderStatus | null;
  orderNumber: string;
  continueShopping: () => void;
  orderDetails: () => void;
  amount: string;
  paymentMethodName: string;
}

import { OrderStatus } from "@saleor/sdk";
import { UrlObject } from "url";

export interface IProps {
  orderStatus: OrderStatus | null;
  orderNumber: string;
  continueShopping: () => void;
  orderDetails: () => void;
  amount: string;
  paymentMethodName: string;
  qr: string;
  continueShoppingUrl: string | UrlObject;
  orderDetailsUrl: string | UrlObject;
}

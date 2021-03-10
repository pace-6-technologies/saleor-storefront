import { QRPaymentTokenPage } from "@temp/views/QRPaymentToken";

export default QRPaymentTokenPage;

QRPaymentTokenPage.getInitialProps = async ({ query }) =>
    ({ query });

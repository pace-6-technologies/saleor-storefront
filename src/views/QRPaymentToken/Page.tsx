import "./scss/index.scss";

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getPaymentDetailByTokenQR } from "../../sitemap/fetchCustom";

interface paramsType {
  token: string;
}

const Page: React.FC = () => {
  const { token } = useParams<paramsType>();

  useEffect(() => {
    getPaymentDetailByTokenQR({
      params: { paymentToken: token },
      callback: (response: any) => {
        console.log("response :>> ", response);
      },
    });
  }, [token]);

  return (
    <>
      <h1>FCKK</h1>
    </>
  );
};

export default Page;

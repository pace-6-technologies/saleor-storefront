import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@components/atoms";
import { FormattedMessage } from "react-intl";
import { checkoutMessages } from "@temp/intl";
import { Container } from "@components/templates";
import QRCode from "react-qr-code";
import * as S from "./styles";

import { getPaymentDetailByTokenQR } from "../../sitemap/fetchCustom";

interface paramsType {
  token: string;
}

const Page: React.FC = () => {
  const { token } = useParams<paramsType>();
  const inputFile = useRef<HTMLFormElement>(null);
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    getPaymentDetailByTokenQR({
      params: { paymentToken: token },
      callback: (response: any) => {
        if (!response) return;
        setOrderDetail(response);
      },
    });
  }, [token]);

  const handleUploadSlipPayment = () => {
    return inputFile && inputFile?.current?.click();
  };

  const onChangeUpload = (e: any) => {
    // eslint-disable-next-line no-alert
    alert("wait api ...");
    // console.log("file: e?.target.files[0] :>> ", { file: e?.target.files[0] });
  };

  return (
    <Container className="container-fluid">
      <div className="not-found-page">
        {orderDetail?.payment?.chargeStatus === "pending" ? (
          <S.Wrapper>
            <input
              ref={inputFile as any}
              hidden
              type="file"
              accept="image/*"
              onChange={onChangeUpload}
            />
            {orderDetail?.qrCode && <QRCode value={orderDetail?.qrCode} />}
            <Button
              testingContext="uploadSlipPaymentButton"
              onClick={handleUploadSlipPayment}
              color="primary"
              fullWidth
              style={{ marginTop: "24px" }}
            >
              <FormattedMessage {...checkoutMessages.uploadSlip} />
            </Button>
          </S.Wrapper>
        ) : (
          <>
            <h2 className="not-found-page__header">
              <FormattedMessage defaultMessage="404" />
            </h2>
            <div className="not-found-page__ruler" />
            <div className="not-found-page__message">
              <p>
                <FormattedMessage defaultMessage="We can’t seem to find a page you are looking for!" />{" "}
              </p>
              <p>
                <FormattedMessage defaultMessage="You may have mistyped the address or the page may have moved." />{" "}
              </p>
              <p>
                <FormattedMessage defaultMessage="We’re sorry for the error and hope you’ll have a good day." />
              </p>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default Page;

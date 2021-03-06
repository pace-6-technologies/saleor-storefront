import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@components/atoms";
import { FormattedMessage } from "react-intl";
import { checkoutMessages } from "@temp/intl";
import * as S from "./styles";

import { getPaymentDetailByTokenQR } from "../../sitemap/fetchCustom";

interface paramsType {
  token: string;
}

const Page: React.FC = () => {
  const { token } = useParams<paramsType>();
  const inputFile = useRef<HTMLFormElement>(null);
  // const [promptpayQR, setPromptpayQR] = useState("");

  useEffect(() => {
    // "token": "e15be37f-45dd-4e0f-973e-f9930e23ae0c",
    // console.log("token :>> ", token);
    getPaymentDetailByTokenQR({
      params: { paymentToken: token },
      callback: (response: any) => {
        // console.log("response :>> ", response);
      },
    });
  }, [token]);

  const handleUploadSlipPayment = () => {
    return inputFile && inputFile?.current?.click();
  };

  const onChangeUpload = (e: any) => {
    // console.log("file: e?.target.files[0] :>> ", { file: e?.target.files[0] });
  };

  return (
    <>
      <input
        ref={inputFile as any}
        hidden
        type="file"
        accept="image/*"
        onChange={onChangeUpload}
      />
      <S.Paragraph>
        {/* {promptpayQR && <QRCode value={promptpayQR} />} */}
        <S.Buttons>
          <Button
            testingContext="uploadSlipPaymentButton"
            onClick={handleUploadSlipPayment}
            color="primary"
            fullWidth
          >
            <FormattedMessage {...checkoutMessages.uploadSlip} />
          </Button>
        </S.Buttons>
      </S.Paragraph>
    </>
  );
};

export default Page;

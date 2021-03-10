import { Formik } from "formik";
import { pick } from "lodash";
import React from "react";
import { countryCode, countryName } from "@temp/constants";
import { IAddress } from "@types";

import { AddressFormContent } from "./AddressFormContent";
import { IProps } from "./types";

const ADDRESS_FIELDS = [
  "cityArea",
  "city",
  "companyName",
  "countryArea",
  "firstName",
  "lastName",
  "country",
  "phone",
  "postalCode",
  "streetAddress1",
  "streetAddress2",
  "email",
];

export const AddressForm: React.FC<IProps> = ({
  address,
  handleSubmit,
  formId,
  defaultValue,
  countriesOptions,
  ...props
}: IProps) => {
  let addressWithPickedFields: Partial<IAddress> = {};
  if (address) {
    addressWithPickedFields = pick(address, ADDRESS_FIELDS);
  }
  if (defaultValue) {
    addressWithPickedFields.country = defaultValue;
  } else {
    addressWithPickedFields.country = {
      code: countryCode,
      country: countryName,
    };
  }
  return (
    <Formik
      initialValues={addressWithPickedFields}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        if (handleSubmit) {
          handleSubmit(values);
        }
        setSubmitting(false);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        setFieldValue,
        setFieldTouched,
      }) => {
        return (
          <AddressFormContent
            {...{
              countriesOptions,
              defaultValue,
              formId,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldTouched,
              setFieldValue,
              values,
            }}
            {...props}
          />
        );
      }}
    </Formik>
  );
};

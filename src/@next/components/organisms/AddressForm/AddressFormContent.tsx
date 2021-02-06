import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { debounce } from "lodash";

import { InputSelect, TextField } from "@components/molecules";
import { commonMessages } from "@temp/intl";

import * as S from "./styles";
import { PropsWithFormik } from "./types";

import { getAddress } from "../../../../sitemap/fetchCustom";

export const AddressFormContent: React.FC<PropsWithFormik> = ({
  formRef,
  handleChange,
  handleBlur,
  formId,
  errors,
  handleSubmit,
  values,
  // countriesOptions,
  // defaultValue,
  setFieldValue,
  testingContext,
  includeEmail = false,
}) => {
  const basicInputProps = useCallback(
    () => ({ onBlur: handleBlur, onChange: handleChange }),
    [handleChange, handleBlur]
  );
  const intl = useIntl();
  const fieldErrors: any = {};
  const [listAddress, setListAddress] = useState([]);
  if (errors) {
    errors.map(({ field, message }: { field: string; message: string }) => {
      fieldErrors[field] = fieldErrors[field]
        ? [...fieldErrors[field], { message }]
        : [{ message }];
    });
  }
  const handleZipCode = debounce(zipcode => {
    if (zipcode.length === 5) {
      getAddress({
        params: { zipcode },
        callback: (response: any) => {
          // console.log("response :", response);
          if (response.length > 0 && zipcode.length === 5) {
            setListAddress(response as any);
            setFieldValue("province", response[0].province);
            setFieldValue("amphoe", response[0].city);
            setFieldValue("district", "");
          }
        },
      });
      return true;
    }
    setListAddress([]);
    setFieldValue("province", "");
    setFieldValue("amphoe", "");
    setFieldValue("district", "");
  }, 750);

  return (
    <S.AddressForm
      id={formId}
      ref={formRef}
      onSubmit={handleSubmit}
      data-test={testingContext}
    >
      <S.Wrapper>
        <S.RowWithTwoCells>
          <TextField
            name="firstName"
            label={intl.formatMessage(commonMessages.firstName)}
            value={values!.firstName}
            autoComplete="given-name"
            errors={fieldErrors!.firstName}
            maxLength={20}
            {...basicInputProps()}
          />
          <TextField
            name="lastName"
            label={intl.formatMessage(commonMessages.lastName)}
            value={values!.lastName}
            autoComplete="family-name"
            maxLength={20}
            errors={fieldErrors!.lastName}
            {...basicInputProps()}
          />
        </S.RowWithTwoCells>
        <S.RowWithTwoCells>
          <TextField
            name="companyName"
            label={intl.formatMessage({
              defaultMessage: "Company Name (Optional)",
            })}
            value={values!.companyName}
            autoComplete="organization"
            errors={fieldErrors!.companyName}
            {...basicInputProps()}
          />
          <TextField
            name="phone"
            label={intl.formatMessage(commonMessages.phone)}
            value={values!.phone || undefined}
            autoComplete="tel"
            errors={fieldErrors!.phone}
            maxLength={10}
            {...basicInputProps()}
          />
        </S.RowWithTwoCells>
        <S.RowWithOneCell>
          <TextField
            name="streetAddress1"
            label={intl.formatMessage({ defaultMessage: "Address line 1" })}
            value={values!.streetAddress1}
            autoComplete="address-line1"
            errors={fieldErrors!.streetAddress1}
            {...basicInputProps()}
          />
        </S.RowWithOneCell>
        <S.RowWithOneCell>
          <TextField
            name="streetAddress2"
            label={intl.formatMessage({ defaultMessage: "Address line 2" })}
            value={values!.streetAddress2}
            autoComplete="address-line2"
            errors={fieldErrors!.streetAddress2}
            {...basicInputProps()}
          />
        </S.RowWithOneCell>
        <S.RowWithTwoCells>
          <TextField
            name="postalCode"
            label={intl.formatMessage({ defaultMessage: "Zipcode" })}
            value={values!.postalCode}
            onBlur={handleBlur}
            onChange={e => {
              handleChange(e);
              handleZipCode(e.target.value);
            }}
            autoComplete="postal-code"
            errors={fieldErrors!.postalCode}
            maxLength={5}
            // {...basicInputProps()}
          />
          <TextField
            name="province"
            label={intl.formatMessage({ defaultMessage: "Province" })}
            value={values!.province}
            errors={fieldErrors!.province}
            {...basicInputProps()}
            readOnly
          />
        </S.RowWithTwoCells>
        <S.RowWithTwoCells>
          <TextField
            name="amphoe"
            label={intl.formatMessage({ defaultMessage: "Amphoe" })}
            value={values!.amphoe}
            errors={fieldErrors!.amphoe}
            {...basicInputProps()}
            readOnly
          />

          <InputSelect
            label={intl.formatMessage({ defaultMessage: "District" })}
            name="district"
            options={listAddress}
            value={values!.district}
            // value={
            //   values!.district &&
            //   listAddress!.find(
            //     (option: any) => option.district === values!.district
            //     // console.log("WOWW :", option.district)
            //   )
            //   // values!.district && listAddress!.find(option => values!.district)
            // }
            onChange={(value: any, name: any) => setFieldValue(name, value)}
            optionLabelKey="district"
            optionValueKey="district"
            errors={fieldErrors!.district}
            autoComplete="country"
          />
        </S.RowWithTwoCells>
        {includeEmail && (
          <S.RowWithTwoCells>
            <TextField
              name="email"
              label={intl.formatMessage(commonMessages.shortEmail)}
              value={values!.email}
              autoComplete="email"
              errors={fieldErrors!.email}
              {...basicInputProps()}
              maxLength={40}
            />
          </S.RowWithTwoCells>
        )}
      </S.Wrapper>
    </S.AddressForm>
  );
};

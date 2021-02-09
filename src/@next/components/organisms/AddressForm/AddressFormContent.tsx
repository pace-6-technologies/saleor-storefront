import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { debounce, uniqBy } from "lodash";

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
  const [listCityArea, setListCityArea] = useState([]);
  const [isHaveCity, setIsHaveCity] = useState(false);

  if (errors) {
    if (errors.length > 0) {
      errors.map(({ field, message }: { field: string; message: string }) => {
        fieldErrors[field] = fieldErrors[field]
          ? [...fieldErrors[field], { message }]
          : [{ message }];
      });
    }
  }

  const handleZipCode = debounce(postalCode => {
    if (postalCode.length === 5) {
      getAddress({
        params: { postalCode },
        callback: (response: any) => {
          if (response.length > 0 && postalCode.length === 5) {
            const GroupByCity: any = uniqBy(response, "city");
            setListAddress(GroupByCity);
            setFieldValue("countryArea", GroupByCity[0]?.countryArea);
            if (GroupByCity.length === 1) {
              setFieldValue("city", GroupByCity[0]?.city);
              handleCity(GroupByCity[0]?.city);
              setIsHaveCity(true);
            } else {
              setFieldValue("city", "");
            }
            setFieldValue("cityArea", "");
          }
        },
      });
      return true;
    }
    setIsHaveCity(false);
    setListAddress([]);
    setFieldValue("countryArea", "");
    setFieldValue("city", "");
    setFieldValue("cityArea", "");
  }, 750);

  const handleCity = (city: any) => {
    getAddress({
      params: { city },
      callback: (response: any) => {
        if (response.length > 0) {
          const GroupByCityArea: any = uniqBy(response, "cityArea");
          setListCityArea(GroupByCityArea);
          setIsHaveCity(true);
        }
      },
    });
  };

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
            maxLength={12}
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
            name="countryArea"
            label={intl.formatMessage({ defaultMessage: "countryArea" })}
            value={values!.countryArea}
            errors={fieldErrors!.province}
            {...basicInputProps()}
            readOnly
          />
        </S.RowWithTwoCells>

        <S.RowWithTwoCells>
          {listAddress.length === 1 ? (
            <TextField
              name="city"
              label={intl.formatMessage({ defaultMessage: "City" })}
              value={values!.city}
              errors={fieldErrors!.city}
              readOnly
              {...basicInputProps()}
            />
          ) : (
            <InputSelect
              label={intl.formatMessage({ defaultMessage: "City" })}
              name="city"
              options={listAddress}
              value={values!.city}
              onChange={(value: any, name: any) => {
                handleCity(value.city);
                setFieldValue("cityArea", "");
                setFieldValue(name, value);
              }}
              optionLabelKey="city"
              optionValueKey="city"
              errors={fieldErrors!.city}
              autoComplete="country"
            />
          )}

          <InputSelect
            label={intl.formatMessage({ defaultMessage: "cityArea" })}
            name="cityArea"
            options={isHaveCity ? listCityArea : []}
            value={values!.cityArea}
            onChange={(value: any, name: any) => setFieldValue(name, value)}
            optionLabelKey="cityArea"
            optionValueKey="cityArea"
            errors={fieldErrors!.cityArea}
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

import gql from "graphql-tag";

import { TypedMutation } from "../core/mutations";

export const getProductsQuery = gql`
  query GetProducts($cursor: String, $perPage: Int, $channel: String) {
    products(after: $cursor, first: $perPage, channel: $channel) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const getCategoriesQuery = gql`
  query GetCategories($cursor: String, $perPage: Int) {
    categories(after: $cursor, first: $perPage) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const getCollectionsQuery = gql`
  query GetCollections($cursor: String, $perPage: Int, $channel: String) {
    collections(after: $cursor, first: $perPage, channel: $channel) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const getAddressQuery = gql`
  query getAddressQuery($postalCode: String, $city: String) {
    regions(first: 50, postalCode: $postalCode, city: $city) {
      edges {
        node {
          postalCode
          countryArea
          city
          cityArea
          id
        }
      }
    }
  }
`;

export const uploadSlipQuery = gql`
  query GetCategories($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
      url
    }
  }
`;

export const getPaymentDetailByTokenQRQuery = gql`
  query getPaymentDetailByTokenQRQuery($paymentToken: String) {
    promptpayPaymentByPaymentToken(paymentToken: $paymentToken) {
      qrCode
      paymentProofImageBase64
      paymentProofUploadNoteOrderToken
      paymentProofUploadNote
      paymentProofUploadTimestamp
      payment {
        id
        gateway
        total {
          amount
        }
        chargeStatus
      }
    }
  }
`;

const mutationPaymentCreate = gql`
  mutation mutationPaymentCreate(
    $checkoutId: ID!
    $token: String!
    $amount: PositiveDecimal!
  ) {
    checkoutPaymentCreate(
      checkoutId: $checkoutId
      input: {
        gateway: "pace6.payments.omise.credit_card"
        token: $token
        amount: $amount
      }
    ) {
      payment {
        id
        chargeStatus
      }
      paymentErrors {
        field
        message
      }
    }
  }
`;
export const MutationPaymentCreate = TypedMutation(mutationPaymentCreate);

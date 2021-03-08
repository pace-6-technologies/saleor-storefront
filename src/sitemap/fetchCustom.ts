import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import fetch from "isomorphic-fetch";

// import {
//   generateCategoryUrl,
//   generateCollectionUrl,
//   generateProductUrl,
// } from "../core/utils";

import { getAddressQuery, getPaymentDetailByTokenQRQuery } from "./queries";

const API_URL = process.env.API_URI || "/graphql/";
const DEFAULT_CHANNEL = process.env.SALEOR_CHANNEL_SLUG || "default-channel";

const fetchItems = async ({ query, variables = {} }, callback: any) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({ uri: API_URL, fetch }),
  });
  const next = async () => {
    const response = await client.query({
      query,
      variables: { ...variables, channel: DEFAULT_CHANNEL },
    });
    const promise_data = [];
    const data =
      response.data[query.definitions[0].selectionSet.selections[0].name.value];
    data.edges.map(({ node }) => promise_data.push(node));
    await callback(promise_data);
  };
  await next();
};

const fetchQRbyToken = async ({ query, variables = {} }, callback: any) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({ uri: API_URL, fetch }),
  });
  const next = async () => {
    const response = await client.query({
      query,
      variables: { ...variables, channel: DEFAULT_CHANNEL },
    });
    await callback(response?.data);
  };
  await next();
};

export const getAddress = async ({ params, callback }) => {
  await fetchItems({ query: getAddressQuery, variables: params }, res => {
    callback(res);
  });
};

export const getPaymentDetailByTokenQR = async ({ params, callback }) => {
  await fetchQRbyToken(
    { query: getPaymentDetailByTokenQRQuery, variables: params },
    res => {
      if (res?.promptpayPaymentByPaymentToken) {
        callback(res?.promptpayPaymentByPaymentToken);
      } else {
        callback(null);
      }
    }
  );
};

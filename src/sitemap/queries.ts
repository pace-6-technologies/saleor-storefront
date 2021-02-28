import gql from "graphql-tag";

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

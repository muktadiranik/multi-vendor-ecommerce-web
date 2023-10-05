const { gql } = require("@apollo/client");

export const getProductTypeProductRateRecentHiresGoVeloWorks = gql`
  query {
    productTypes {
      id
      name
    }
    productRateTypes {
      id
      name
    }
    latestOrder {
      id
      quantity
      price
      product {
        id
        model
        brand
        shop {
          id
          name
          state
          street
        }
        productType {
          id
          name
        }
        image
        size {
          id
          productSize
        }
        productrateSet {
          id
          rate
          rateType {
            id
            name
          }
        }
        rating
        totalReviews
        stock
        description
        isAvailable
        createdAt
      }
    }
    workFlow {
      id
      title
      description
      icon
    }
  }
`;

export const getCurrencies = gql`
  query {
    currencies {
      id
      name
      symbol
      code
    }
  }
`;

export const eventTypes = gql`
  query {
    eventTypes {
      id
      name
    }
  }
`;

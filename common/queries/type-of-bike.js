import { gql } from "@apollo/client";
export const getBikeTypesAndProductRateTypes = gql`
  query {
    productTypes {
      id
      name
    }

    productRateTypes {
      id
      name
    }
  }
`;

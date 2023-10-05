import { gql } from "@apollo/client";
export const getProductTypes = gql`
  query {
    productTypes {
      id
      name
    }
  }
`;

import { gql } from "@apollo/client";
export const getTermsAndCondations = gql`
  query {
    termsAndConditions {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

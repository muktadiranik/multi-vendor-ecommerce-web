import { gql } from "@apollo/client";
export const getPrivacyAndPolicy = gql`
  query {
    privacyPolicy {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

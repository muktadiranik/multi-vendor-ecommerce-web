import { gql } from "@apollo/client";
export const getAboutUs = gql`
  query {
    aboutUs {
      id
      title
      content
      image
      createdAt
      updatedAt
    }
  }
`;

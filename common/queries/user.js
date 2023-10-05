import { gql } from "@apollo/client";

export const accessTokenMutation = gql`
  mutation ($token: String) {
    verifyToken(token: $token) {
      payload
    }
  }
`;

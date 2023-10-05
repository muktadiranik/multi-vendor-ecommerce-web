import { gql } from "@apollo/client";
export const getNominationTypes = gql`
  query {
    nominationTypes {
      id
      name
    }
  }
`;

export const mutationOfNomination = gql`
  mutation ($name: String!, $nominationType: ID, $reason: String!) {
    createNomination(
      input: { name: $name, nominationType: $nominationType, reason: $reason }
    ) {
      nomination {
        id
        name
        reason
        nominationType {
          id
          name
        }
      }
      success
    }
  }
`;

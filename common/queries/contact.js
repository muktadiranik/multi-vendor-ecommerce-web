import { gql } from "@apollo/client";

export const getContactTypes = gql`
  query {
    contactTypes {
      id
      name
    }
  }
`;

export const mutationCreateContact = gql`
  mutation (
    $name: String!
    $rentalBooking: String!
    $email: String!
    $contactType: ID
  ) {
    createContact(
      input: {
        name: $name
        rentalBooking: $rentalBooking
        email: $email
        contactType: $contactType
      }
    ) {
      success
      contact {
        id
        name
        email
      }
    }
  }
`;

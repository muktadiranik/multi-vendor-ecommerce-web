import { gql } from "@apollo/client";

export const createShopMutation = gql`
  mutation (
    $userId: ID
    $name: String
    $legalEntity: String
    $street: String
    $city: String
    $zipCode: String
    $country: String
    $latitude: Decimal
    $longitude: Decimal
    $state: String
    $phone: String
    $email: String
    $openingTime: Time
    $closingTime: Time
    $shopImage: Upload
    $shopCover: Upload
  ) {
    createShop(
      input: {
        userId: $userId
        name: $name
        legalEntity: $legalEntity
        street: $street
        city: $city
        zipCode: $zipCode
        country: $country
        latitude: $latitude
        longitude: $longitude
        state: $state
        phone: $phone
        email: $email
        openingTime: $openingTime
        closingTime: $closingTime
        shopImage: $shopImage
        shopCover: $shopCover
      }
    ) {
      shop {
        id
        name
        owner {
          id
          username
        }
      }
      success
    }
  }
`;

export const updateShopByOwnerId = gql`
  mutation (
    $id: ID!
    $name: String
    $legalEntity: String
    $street: String
    $city: String
    $zipCode: String
    $country: String
    $latitude: Decimal
    $longitude: Decimal
    $state: String
    $phone: String
    $email: String
    $openingTime: Time
    $closingTime: Time
    $shopImage: Upload
    $shopCover: Upload
  ) {
    updateShop(
      input: {
        id: $id
        name: $name
        legalEntity: $legalEntity
        street: $street
        city: $city
        zipCode: $zipCode
        country: $country
        latitude: $latitude
        longitude: $longitude
        state: $state
        phone: $phone
        email: $email
        shopImage: $shopImage
        shopCover: $shopCover
        openingTime: $openingTime
        closingTime: $closingTime
      }
    ) {
      shop {
        id
        name
      }
      success
    }
  }
`;

export const getProductReviewByShopId = gql`
  query ($shopId: ID) {
    getProductReviewsByShopId(id: $shopId) {
      user {
        id
        name
        userImage
      }
      rating
      review
      product {
        id
        brand
        model
        image
      }
    }
  }
`;

export const getShopByUserId = gql`
  query ($ownerId: String) {
    shops(ownerId: $ownerId) {
      edges {
        node {
          id
          name
          street
          city
          state
          zipCode
          areaCode
          latitude
          longitude
          country
          phone
          website
          email
          description
          shopCover
          shopImage
          isVerified
          openingTime
          closingTime
          rating
          totalReviews
          createdAt
          owner {
            id
            name
            email
          }
          createdAt
          productSet {
            edges {
              node {
                id
                model
                brand
                shop {
                  id
                  name
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
                  currency {
                    id
                    name
                    symbol
                    code
                  }
                }
                image
                productoptionSet {
                  id
                  option
                }
                productreviewSet {
                  id
                  review
                  rating
                  user {
                    id
                    username
                    userImage
                  }
                }
                productdepositSet {
                  id
                  deposit
                  currency {
                    id
                    name
                    code
                    symbol
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
          }
        }
      }
    }
  }
`;

export const orderItems = gql`
  query ($shopId: Decimal) {
    orderItems(shopId: $shopId) {
      edges {
        node {
          id
          order {
            id
            isPaid
            user {
              id
              name
              userImage
            }
            deliveredAt
            returnedAt
            isDelivered
            isCancelled
            paymentMethod
            status
            totalPrice
          }
          product {
            id
            model
            image
            productrateSet {
              id
              rate
              rateType {
                id
                name
              }
              currency {
                id
                name
                symbol
                code
              }
            }
            shop {
              id
            }
          }
        }
      }
    }
  }
`;

export const shopVerificationMutation = gql`
  mutation (
    $shopId: ID
    $ownerImage: Upload
    $idFrontImage: Upload
    $idBackImage: Upload
  ) {
    createShopVerification(
      input: {
        shopId: $shopId
        ownerImage: $ownerImage
        idFrontImage: $idFrontImage
        idBackImage: $idBackImage
      }
    ) {
      success
      shopVerification {
        id
        shop {
          id
          isVerified
        }
        status
        ownerImage
        idFrontImage
        idBackImage
      }
    }
  }
`;

import { gql } from "@apollo/client";

export const getCartByUserId = gql`
  query ($userId: String) {
    carts(userId: $userId) {
      edges {
        node {
          id
          createdAt
          cartitemSet {
            edges {
              node {
                id
                product {
                  id
                  brand
                  model
                  image
                  productrateSet {
                    id
                    rate
                    currency {
                      id
                      name
                      symbol
                      code
                    }
                    rateType {
                      id
                      name
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
                }
                quantity
                price
              }
            }
          }
        }
      }
    }
  }
`;

export const addToCartMutation = gql`
  mutation ($userId: ID, $productId: ID, $quantity: Int) {
    addToCart(userId: $userId, productId: $productId, quantity: $quantity) {
      cart {
        id
        user {
          id
          username
        }
        cartitemSet {
          edges {
            node {
              id
              price
              quantity
              product {
                id
                brand
              }
            }
          }
        }
      }
    }
  }
`;

export const removeFromCartMutation = gql`
  mutation ($userId: ID, $productId: ID, $quantity: Int) {
    removeFromCart(
      userId: $userId
      productId: $productId
      quantity: $quantity
    ) {
      cart {
        id
        user {
          id
          username
        }
        cartitemSet {
          edges {
            node {
              id
              price
              quantity
              product {
                id
                brand
              }
            }
          }
        }
      }
    }
  }
`;

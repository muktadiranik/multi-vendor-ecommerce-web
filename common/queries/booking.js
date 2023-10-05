const { gql } = require("@apollo/client");

export const getBookingsMutation = gql`
  query ($userId: ID!) {
    orderByUserId(userId: $userId) {
      id
      user {
        id
        username
      }
      paymentMethod
      isCancelled
      refundRequested
      status
      isPaid
      isDelivered
      totalPrice
      paidAt
      deliveredAt
      returnedAt
      duration
      paymentinformationSet {
        edges {
          node {
            id
            purchaseAmount
            purchaseCurrencyCode
          }
        }
      }
      orderitemSet {
        edges {
          node {
            product {
              id
              model
              brand
              shop {
                id
                name
                state
                street
              }
              productType {
                id
                name
              }
              image
              size {
                productSize
              }
              productrateSet {
                id
                rate
                rateType {
                  id
                  name
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
`;

export const getBookingsItems = gql`
  query ($orderId: ID!) {
    orderItemByOrderId(orderId: $orderId) {
      id
      price
      quantity
      order {
        id
      }
      product {
        id
        model
        brand
        shop {
          id
          name
          state
          street
        }
        productType {
          id
          name
        }
        image
        size {
          productSize
        }
        productrateSet {
          id
          rate
          rateType {
            id
            name
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
`;

export const updateBooking = gql`
  mutation (
    $id: ID!
    $isCancelled: Boolean
    $refundRequested: Boolean
    $isDelivered: Boolean
  ) {
    updateOrder(
      id: $id
      input: {
        isCancelled: $isCancelled
        refundRequested: $refundRequested
        isDelivered: $isDelivered
      }
    ) {
      order {
        id
        paymentMethod
        status
        orderitemSet {
          edges {
            node {
              id
              quantity
              product {
                id
                brand
                model
                image
                shop {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const createProductReviewMutation = gql`
  mutation ($user: ID, $product: ID, $review: String, $rating: Int) {
    createProductReview(
      input: {
        user: $user
        product: $product
        review: $review
        rating: $rating
      }
    ) {
      success
      productReview {
        id
        product {
          id
          model
          brand
          createdAt
          rating
        }
      }
      productReview {
        id
        rating
        review
      }
    }
  }
`;

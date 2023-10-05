import { gql } from "@apollo/client";

export const createOrderMutation = gql`
  mutation (
    $cartId: ID
    $paymentMethod: String
    $isPaid: Boolean
    $isDelivered: Boolean
    $address: String
    $city: String
    $state: String
    $zipCode: String
    $areaCode: String
    $country: String
    $phone: String
    $createTime: DateTime
    $updateTime: DateTime
    $deliveredAt: DateTime
    $returnedAt: DateTime
    $duration: Int
    $paymentId: String
    $paymentOrderId: String
    $intent: String
    $payerCountryCode: String
    $payerEmail: String
    $payerId: String
    $payerName: String
    $purchaseAmount: Decimal
    $purchaseCurrencyCode: String
    $purchaseUnitsReferenceId: String
    $purchaseShippingAddress: JSONString
    $purchaseShippingName: String
    $status: String
    $totalPrice: Decimal
  ) {
    createOrder(
      input: {
        cartId: $cartId
        paymentMethod: $paymentMethod
        isPaid: $isPaid
        isDelivered: $isDelivered
        address: $address
        city: $city
        state: $state
        zipCode: $zipCode
        areaCode: $areaCode
        country: $country
        phone: $phone
        createTime: $createTime
        updateTime: $updateTime
        deliveredAt: $deliveredAt
        returnedAt: $returnedAt
        duration: $duration
        paymentId: $paymentId
        paymentOrderId: $paymentOrderId
        intent: $intent
        payerCountryCode: $payerCountryCode
        payerEmail: $payerEmail
        payerId: $payerId
        payerName: $payerName
        purchaseAmount: $purchaseAmount
        purchaseCurrencyCode: $purchaseCurrencyCode
        purchaseUnitsReferenceId: $purchaseUnitsReferenceId
        purchaseShippingAddress: $purchaseShippingAddress
        purchaseShippingName: $purchaseShippingName
        status: $status
        totalPrice: $totalPrice
      }
    ) {
      success
      order {
        id
      }
    }
  }
`;

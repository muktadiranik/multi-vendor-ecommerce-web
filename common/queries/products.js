import { gql } from "@apollo/client";

export const getAllProducts = gql`
  query {
    products {
      edges {
        node {
          id
          model
          brand
          shop {
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
          }
          productType {
            id
            name
          }
          rating
          totalReviews
          stock
          description
          isAvailable
          stock
          size {
            id
            productSize
          }
          condition
          createdAt
          productrateSet {
            id
            rate
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
        }
      }
    }
  }
`;

export const getProductsByFilter = gql`
  query (
    $shopLocation: String
    $productTypeId: String
    $productRateType: String
    $date: Date
    $riders: Decimal
    $latMin: Decimal
    $latMax: Decimal
    $lonMin: Decimal
    $lonMax: Decimal
  ) {
    products(
      shopLocation: $shopLocation
      productTypeId: $productTypeId
      productRateTypeId: $productRateType
      date: $date
      riders: $riders
      latMin: $latMin
      latMax: $latMax
      lonMin: $lonMin
      lonMax: $lonMax
    ) {
      edges {
        node {
          id
          model
          brand
          shop {
            name
            street
            city
            state
            zipCode
            areaCode
            country
            phone
            website
            email
            description
            latitude
            longitude
            shopCover
            shopImage
            isVerified
            openingTime
            closingTime
            rating
            totalReviews
            createdAt
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
          rating
          totalReviews
          stock
          description
          isAvailable
          createdAt
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const getAllProductTypesAndRates = gql`
  query {
    products {
      edges {
        node {
          id
          model
          brand
          shop {
            name
            street
            city
            state
            zipCode
            areaCode
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
              userImage
              userCover
              dateJoined
            }
          }
          productType {
            id
            name
          }
          rating
          totalReviews
          stock
          description
          isAvailable
          stock
          size {
            id
            productSize
          }
          condition
          createdAt
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
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
    productTypes {
      id
      name
    }
    productRateTypes {
      id
      name
    }
  }
`;

export const getProductById = gql`
  query ($id: String) {
    products(id: $id) {
      edges {
        node {
          id
          model
          brand
          shop {
            name
            street
            city
            state
            zipCode
            areaCode
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
              userImage
              userCover
              dateJoined
            }
          }
          productType {
            id
            name
          }
          rating
          totalReviews
          stock
          description
          isAvailable
          stock
          size {
            id
            productSize
          }
          condition
          createdAt
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
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
    productTypes {
      id
      name
    }
    productRateTypes {
      id
      name
    }
  }
`;

export const getProductSizesAndTypes = gql`
  query {
    productTypes {
      id
      name
    }
    productsSizes {
      id
      productSize
    }
  }
`;

export const getProductRateType = gql`
  query {
    productRateTypes {
      id
      name
    }
  }
`;

export const createProductMutation = gql`
  mutation (
    $brand: String
    $model: String
    $productType: ID
    $shop: ID
    $description: String
    $stock: Int
    $deposit: [CreateProductDepositInput]
    $size: ID
    $condition: String
    $image: Upload
    $prices: [CreateProductRateInput]
  ) {
    createProduct(
      input: {
        brand: $brand
        model: $model
        productType: $productType
        shop: $shop
        description: $description
        stock: $stock
        deposit: $deposit
        size: $size
        condition: $condition
        image: $image
        prices: $prices
      }
    ) {
      success
      product {
        id
        brand
        model
        size {
          id
          productSize
        }
        productType {
          id
          name
        }
        shop {
          id
        }
        description
        stock
        productrateSet {
          id
          product {
            id
          }
          rateType {
            id
          }
          rate
        }
        condition
      }
    }
  }
`;

export const updateProductMutation = gql`
  mutation (
    $id: String
    $brand: String
    $model: String
    $productType: ID
    $description: String
    $stock: Int
    $size: ID
    $condition: String
    $image: Upload
    $deposit: [UpdateProductDepositInput]
    $prices: [UpdateProductRateInput]
  ) {
    updateProduct(
      id: $id
      input: {
        brand: $brand
        model: $model
        productType: $productType
        description: $description
        stock: $stock
        size: $size
        condition: $condition
        image: $image
        prices: $prices
        deposit: $deposit
      }
    ) {
      success
      product {
        id
        brand
        model
        description
        stock
        condition
        size {
          id
          productSize
        }
        productType {
          id
          name
        }
        shop {
          id
        }
        productrateSet {
          id
          product {
            id
          }
          rateType {
            id
          }
          rate
        }
        image
      }
    }
  }
`;

export const deleteProduct = gql`
  mutation ($productId: ID!) {
    deleteProduct(id: $productId) {
      success
    }
  }
`;

export const getProductByShopId = gql`
  query ($shopId: ID) {
    products(shopId: $shopId) {
      edges {
        node {
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
`;

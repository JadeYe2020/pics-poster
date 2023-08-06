/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      password
      posts {
        items {
          id
          img
          userID
          createdAt
          updatedAt
          userPostsId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        password
        posts {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      img
      userID
      author {
        id
        email
        password
        posts {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      userPostsId
      __typename
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        img
        userID
        author {
          id
          email
          password
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        userPostsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const usersByEmail = /* GraphQL */ `
  query UsersByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        password
        posts {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const postsByUserID = /* GraphQL */ `
  query PostsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        img
        userID
        author {
          id
          email
          password
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        userPostsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;

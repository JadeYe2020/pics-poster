/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
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

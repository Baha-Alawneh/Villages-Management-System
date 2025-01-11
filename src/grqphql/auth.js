import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($input: loginInput!) {
  login(input: $input) {
    token
  }
}
`;

export const SIGNUP_USER = gql`
mutation signup($input: SignupInput!) {
  signup(input: $input)
}
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: String!) {
    userById(id: $id) {
      full_name
      username
    }
  }
`;

export const GET_ADMINS = gql`
query {
  admins {
    user_id
    username
    full_name
    password
    role
  }
}
`;

export const GET_USERS = gql`
query {
  users {
    user_id
    username
    full_name
    password
    role
  }
}
`
export const LOGOUT_USER = gql`
mutation logout($token: String) {
  logout(token: $token)
}
`;

import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation loginUser($input: loginInput!) {
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
  
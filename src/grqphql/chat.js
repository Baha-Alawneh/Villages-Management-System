import { gql } from '@apollo/client';

export const GET_CHAT = gql`
  query GetChat($user: String!, $admin: String!) {
    chat(user: $user, admin: $admin)
  }
`;

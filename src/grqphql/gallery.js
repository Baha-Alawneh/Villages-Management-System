import {gql} from '@apollo/client';
// Define the GraphQL query to fetch images
export const GET_IMAGES = gql`
  query GetImages {
    getAllImages {
      description
      image_url
    }
  }
`;




// Define the GraphQL mutation to add a new image
export const ADD_IMAGE = gql`
  mutation AddImage($galleryData: galleryInput!) {
    addImage(galleryData: $galleryData) {
      description
      image_url
    }
  }
`;
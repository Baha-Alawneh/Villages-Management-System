import {gql} from '@apollo/client';
export const GET_IMAGES = gql`
  query GetImages {
    getAllImages {
      description
      image_url
    }
  }
`;




export const ADD_IMAGE = gql`
  mutation AddImage($galleryData: galleryInput!) {
    addImage(galleryData: $galleryData) {
      description
      image_url
    }
  }
`;
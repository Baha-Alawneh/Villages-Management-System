import { gql } from '@apollo/client';

export const GET_VILLAGES = gql`
  query GetVillages {
    villages {
      village_id
      village_name
      region
      land_area
      latitude
      longitude
      categories
      image_url
    }
  }
`;

export const ADD_VILLAGE = gql`
  mutation AddVillage($villageData: VillageInput!) {
    addVillage(villageData: $villageData) {
      village_id
      village_name
      region
      land_area
      latitude
      longitude
      categories
      image_url
    }
  }
`;

export const DELETE_VILLAGE = gql`
  mutation DeleteVillage($villageName: String!) {
    deleteVillage(villageName: $villageName)
  }
`;


export const UPDATE_VILLAGE = gql`
  mutation UpdateVillage($villageData: VillageInput!) {
    updateVillage(villageData: $villageData){
      village_id
      village_name
      region
      land_area
      latitude
      longitude
      categories
      image_url
    }
  }
`;
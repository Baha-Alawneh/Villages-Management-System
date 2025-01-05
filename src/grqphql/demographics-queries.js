import {gql} from '@apollo/client';


export const GET_DEMOGRAPHICS = gql`
    query GetDemographics{
        demographics{
            demographic_id
            village_id
            population_size
            age_distribution
            gender_ratios
            population_growth_rate
        }
    
    }

`;
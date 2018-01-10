import gql from 'graphql-tag';

const SearchMutation = gql`
mutation searchPublication($carState: String!, $text: String!)
{
    searchPublication(carState: $carState, text: $text,){
       CurrentState{
    stateName
  }
    ImageGroup{
      image1
      image2
      image3
    }
    group
    modelName
    price
    fuel
    year
    carState
    kms        
}}
    `;
export default SearchMutation;

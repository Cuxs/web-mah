import gql from 'graphql-tag';

const SearchMutation = gql`
mutation searchPublication($carState: String!, $text: String!, $page: Int $fuel: String, $year: Int, $state: String)
  {searchPublication(carState: $carState, text: $text, page: $page, fuel: $fuel, year: $year state: $state) {
    Publications {
      CurrentState {
        stateName
      }
      ImageGroup {
        image1
        image2
        image3
      }
      id
      group
      modelName
      price
      fuel
      year
      carState
      kms
      User{
        id
        agencyName
      }
    }
  }
}
    `;
export default SearchMutation;

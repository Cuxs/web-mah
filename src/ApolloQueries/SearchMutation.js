import gql from 'graphql-tag';

const SearchMutation = gql`
mutation searchPublication($userType:String, $user_id:Int, $carState: String, $text: String, $page: Int $fuel: String, $year: Int, $state: String, $MAHtoken: String)
  {searchPublication(userType:$userType, user_id: $user_id, carState: $carState, text: $text, page: $page, fuel: $fuel, year: $year state: $state, MAHtoken:$MAHtoken) {
    totalCount
    hasNextPage    
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

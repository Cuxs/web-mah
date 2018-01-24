import gql from 'graphql-tag';

const SearchUserPublicationQuery = gql`
mutation searchPublication($carState: String, $state: String, $MAHtoken: String, $page: Int, $order: String)
  {searchPublication(carState: $carState, state: $state, MAHtoken:$MAHtoken page:$page, order:$order) {
    hasNextPage
    totalCount    
    Publications {
      CurrentState {
        stateName
      }
      ImageGroup {
        image1
      }
      id
      group
      modelName
      price
      fuel
      year
      carState
      kms
    }
  }
}
    `;
export default SearchUserPublicationQuery;

import gql from 'graphql-tag';

const SearchUserPublicationQuery = gql`
mutation searchPublication($carState: String, $state: String, $MAHtoken: String, $page: Int, $order: String)
  {searchPublication(carState: $carState, state: $state, MAHtoken:$MAHtoken, page:$page, order:$order) {
    hasNextPage
    totalCount    
    Publications {
      CurrentState {
        stateName
      }
      ImageGroup {
        image1
      }
      User{
        name
        agencyName
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

const markAsSoldMutation = gql`
mutation markAsSold($publication_id: Int, $MAHtoken:String){
  markAsSold(publication_id:,$publication_id, MAHtoken: $MAHtoken) {
    id
  }
}
`;
const highlightPublication = gql`
mutation highlightPublication($publication_id: Int, $MAHtoken:String){
  highlightPublication(publication_id:,$publication_id, MAHtoken: $MAHtoken) {
    id
  }
}
`;
export { SearchUserPublicationQuery, markAsSoldMutation, highlightPublication };

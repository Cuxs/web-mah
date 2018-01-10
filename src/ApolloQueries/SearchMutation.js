import gql from 'graphql-tag';

const SearchMutation = gql`
mutation searchPublication($carState: String!, $text: String!, $page: Int) {
  searchPublication(carState: $carState, text: $text, page: $page) {
    hasNextPage,
    totalResult
    Publications {
      CurrentState {
        stateName
      }
      ImageGroup {
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
    }
  }
}
    `;
export default SearchMutation;

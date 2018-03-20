import gql from 'graphql-tag';

const AprovePublicationMutation = gql`
mutation AprovePublication($MAHtoken: String!, $publication_id: Int!){
    aprovePublication(MAHtoken: $MAHtoken, publication_id:$publication_id){
      id
      CurrentState{
        stateName
      }
    }
  }
`;
const DisaprovePublicationMutation = gql`
mutation DisaprovePublication($MAHtoken: String!, $publication_id: Int! $reason: String!){
    disaprovePublication(MAHtoken: $MAHtoken, publication_id:$publication_id, reason:$reason){
      id
      CurrentState{
        stateName
      }
    }
  }
`;

const HightlightPublication = gql`
mutation adminhighlightPublication($publication_id: Int, $MAHtoken: String) {
  adminhighlightPublication(publication_id: $publication_id, MAHtoken: $MAHtoken) {
    id
    CurrentState {
      stateName
    }
  }
}
`;


export { AprovePublicationMutation, DisaprovePublicationMutation, HightlightPublication };


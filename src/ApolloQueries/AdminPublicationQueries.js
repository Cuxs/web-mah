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
mutation DisaprovePublication($MAHtoken: String!, $publication_id: Int!){
    disaprovePublication(MAHtoken: $MAHtoken, publication_id:$publication_id){
      id
      CurrentState{
        stateName
      }
    }
  }
`;

export { AprovePublicationMutation, DisaprovePublicationMutation };


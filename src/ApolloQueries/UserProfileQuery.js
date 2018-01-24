import gql from 'graphql-tag';

const UserDetailQuery = gql`
query ($id: Int!) {
    User(id: $id) {
      name
      address
      email
      phone
    }
  }  
`;

export { UserDetailQuery };

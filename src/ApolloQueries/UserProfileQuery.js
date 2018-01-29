import gql from 'graphql-tag';

const UserDetailQuery = gql`
query User($id: Int!) {
    User(id: $id) {
      name
      address
      email
      phone
    }
  }  
`;
const UserDataMutation = gql`
mutation modifyUserData($MAHtoken: String!, $name:String, $address:String, $phone:String) {
  modifyUserData(MAHtoken: $MAHtoken, name:$name, address:$address, phone:$phone){
    name,
    address,
    email
    phone
  }
}
`;
const UserPasswordMutation = gql`
mutation updatePassword($MAHtoken: String!, $oldPassword: String!, $newPassword: String!){
  updatePassword(MAHtoken:$MAHtoken, oldPassword:$oldPassword, newPassword:$newPassword)
}`;
export { UserDetailQuery, UserDataMutation, UserPasswordMutation };

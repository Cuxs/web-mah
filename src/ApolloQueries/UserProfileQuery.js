import gql from 'graphql-tag';

const UserDetailQuery = gql`
query User($MAHtoken: String!) {
    User(MAHtoken: $MAHtoken) {
      name
      address
      email
      phone
    }
  }  
`;
const UserDataMutation = gql`
mutation modifyUserData($MAHtoken: String!, $name:String, $address:String, $phone:String, $agencyName:String, $agencyAdress:String,$agencyEmail:String, $agencyPhone:String) {
  modifyUserData(MAHtoken: $MAHtoken, name:$name, address:$address, phone:$phone, agencyName:$agencyName, agencyAdress:$agencyAdress, agencyEmail:$agencyEmail, agencyPhone:$agencyPhone ){
    name,
    address,
    email
    phone,
    agencyName,
    agencyAdress,
    agencyEmail,
    agencyPhone
  }
}
`;
const UserPasswordMutation = gql`
mutation updatePassword($MAHtoken: String!, $oldPassword: String!, $newPassword: String!){
  updatePassword(MAHtoken:$MAHtoken, oldPassword:$oldPassword, newPassword:$newPassword)
}`;
const ResetPasswordMutation = gql`
mutation resetPassword($oldPassword: String!, $newPassword: String!){
  resetPassword(oldPassword:$oldPassword, newPassword:$newPassword)
}`;
export { UserDetailQuery, UserDataMutation, UserPasswordMutation, ResetPasswordMutation };

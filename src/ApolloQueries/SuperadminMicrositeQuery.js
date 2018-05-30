import gql from 'graphql-tag';

const AdminUserDataMutation = gql`
mutation modifyUserData($userId: Int, $MAHtoken: String!, $name:String, $address:String, $phone:String, $agencyName:String, $agencyAdress:String,$agencyEmail:String, $agencyPhone:String) {
  modifyUserData(userId:$userId, MAHtoken: $MAHtoken, name:$name, address:$address, phone:$phone, agencyName:$agencyName, agencyAdress:$agencyAdress, agencyEmail:$agencyEmail, agencyPhone:$agencyPhone ){
    name,
    address,
    email
    phone,
    agencyName,
    agencyAdress,
    agencyEmail,
    agencyPhone
  }
}`

export {AdminUserDataMutation}
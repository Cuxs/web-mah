import gql from 'graphql-tag';


const searchUserMutation = gql `mutation searchUser($text: String!) {
  searchUser(text:$text){
    Users {
		  name
      email
      address
      phone
      profileImage
      bannerImage
      agencyName
      agencyAdress
      agencyEmail
      agencyPhone
      isAgency
      isAdmin
		}
    totalCount
    hasNextPage
  }
}`;

export {searchUserMutation};
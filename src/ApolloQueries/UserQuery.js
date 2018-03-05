import gql from 'graphql-tag';

const AllUsersQuery = gql`
query AllUsers($page: Int) {
  AllUsers(page: $page) {
    Users {
      id
      name
      email
      phone
      address
      agencyPhone
      agencyName
      agencyAdress
      agencyEmail
    }
    totalCount
    hasNextPage
  }
}`;
const AllUsersMailsQuery = gql`
query AllUsersMails {
  AllUsersMails {
    totalCount
    Users {
      id
      email
      isAdmin
    }
  }
}`;


export { AllUsersQuery, AllUsersMailsQuery };

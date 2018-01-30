import gql from 'graphql-tag';

const AgencyDetailQuery = gql`
query User($MAHtoken: String!) {
    User(MAHtoken: $MAHtoken) {
      agencyName
      agencyAdress
      agencyEmail
      agencyPhone
      phone
      profileImage
      bannerImage
    }
  }  
`;

export { AgencyDetailQuery };


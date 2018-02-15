import gql from 'graphql-tag';

const GetAllAgencies = gql`
{GetAllAgencies {
    id
    phone
    agencyName
    agencyEmail
    agencyAdress
    agencyPhone
    bannerImage
    profileImage
  }}`;

export { GetAllAgencies };
import gql from 'graphql-tag';

const CarDetailQuery = gql`
query Publication($id: Int!) {
  Publication(id: $id) {
      CurrentState {
        stateName
      }
      ImageGroup {
        image1
        image2
        image3
      }
      brand
      observation
      group
      modelName
      price
      fuel
      year
      carState
      kms
      User{
        id
        email
        name
        address
        phone
        agencyName
        agencyAdress
        agencyEmail
        agencyPhone
        profileImage
        bannerImage
      }
    }
  }
    `;
export default CarDetailQuery;

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
      group
      modelName
      price
      fuel
      year
      carState
      kms
    }
  }
    `;
export default CarDetailQuery;

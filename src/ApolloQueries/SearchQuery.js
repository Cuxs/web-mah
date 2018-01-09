import gql from 'graphql-tag';

const SearchQuery = gql`
  query AllPublications($limit: Int)
    {AllPublications(stateName:"Activas", limit: $limit){
      CurrentState{
        stateName
      }
        ImageGroup{
          image1
          image2
          image3
          image4
          image5
          image6
          image7
          image8
        }
        group
        modelName
        price
        fuel
        year
        carState
        kms  
      }}
    `;
export default SearchQuery;

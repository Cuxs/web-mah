import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const HomeQuery = graphql(gql`
    {AllPublications(stateName:"Activas"){
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
        year
        kms  
      }}
    `);
export default HomeQuery;

import gql from 'graphql-tag';

const CountUnreadMessagesQuery = gql`query UnreadMessages($MAHtoken: String!){
  CountUnreadMessages(MAHtoken:$MAHtoken)
}`;
const CountActivePublications = gql`
query AllPublications($user_id: Int, $stateName: String, $limit:Int, $order:String, $page:Int){
  AllPublications(user_id: $user_id, stateName:$stateName, limit:$limit, order:$order, page:$page){
    id  
    CurrentState{
      stateName
    }
  }
}
`;
const GetPublicationData = gql`
query AllPublications($user_id: Int, $stateName: String, $limit:Int, $order:String, $page:Int){
  AllPublications(user_id: $user_id, stateName:$stateName, limit:$limit, order:$order, page:$page){
    id 
    brand
    group
    modelName
    price,
    year,
    kms
    CurrentState{
      stateName
    } 
    ImageGroup{
      image1
    }
    CurrentState{
      stateName
    }
  }
}
`;

export { CountUnreadMessagesQuery, CountActivePublications, GetPublicationData };


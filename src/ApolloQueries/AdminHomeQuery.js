import gql from 'graphql-tag';

const CountUnreadMessagesQuery = gql`query UnreadMessages($MAHtoken: String!){
  CountUnreadMessages(MAHtoken:$MAHtoken)
}`;

const CountActivePublications = gql`
query AllPublications($MAHtoken: String, $stateName: String, $limit:Int, $order:String){
  AllPublications(MAHtoken: $MAHtoken, stateName:$stateName, limit:$limit, order:$order){
    id  
    CurrentState{
      stateName
    }
  }
}
`;

export { CountUnreadMessagesQuery, CountActivePublications };


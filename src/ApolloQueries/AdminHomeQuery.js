import gql from 'graphql-tag';

const CountUnreadMessagesQuery = gql`query UnreadMessages($MAHtoken: String!){
  CountUnreadMessages(MAHtoken:$MAHtoken)
}`;
const CountActivePublications = gql`
query AllPublications($user_id: Int, $stateName: String, $limit:Int, $order:String){
  AllPublications(user_id: $user_id, stateName:$stateName, limit:$limit, order:$order){
    id  
    CurrentState{
      stateName
    }
  }
}
`;
export default CountActivePublications;

export { CountUnreadMessagesQuery, CountActivePublications };


import gql from 'graphql-tag';

const CommentThreadQuery = gql`
query CommentThread($MAHtoken: String!) {
    CommentThread(MAHtoken: $MAHtoken) {
      id
      chatToken
      participant1_id
      participant2_id
      Publication{
        id
        brand
        modelName
        year
        kms
        carState
        price
        ImageGroup{
          image1
        }
      }
      messages{
        createdAt
        content
        read
        User{
          email
        }
      }
    }
  }
`;
const CountUnreadMessagesQuery = gql`
query CountUnreadMessages($MAHtoken: String!) {
    CountUnreadMessages(MAHtoken: $MAHtoken)
  }
  `;

export { CommentThreadQuery, CountUnreadMessagesQuery };


import gql from 'graphql-tag';

const GetTextsQuery = gql`
  query GetTextsQuery($route: String, $section: String){
    PageTexts(route: $route, section:$section) {
      section
      text
    }
  }

`;
export { GetTextsQuery };

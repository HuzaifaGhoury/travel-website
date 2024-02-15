import gql from "graphql-tag";

export const GetExperienceFilter = gql`
query experienceFilter($search: String) {
  experienceFilter(search: $search) {
    id
    name
    location
    mainImageUrl
    highlights
    averageRating
    duration
    experienceDate {
      price
    }
    
  }
}
`;
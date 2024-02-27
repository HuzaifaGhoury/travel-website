import gql from "graphql-tag";

export const GetExperienceFilter = gql`
query experienceFilter($search: String, $durations: [Int]) {
  experienceFilter(search: $search, durations: $durations) {
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
import { gql } from "@apollo/client";

export const GET_EPISODES = gql`
  query GetEpisodes($page: Int!, $name: String, $episode: String) {
    episodes(page: $page, filter: { name: $name, episode: $episode }) {
      results {
        id
        name
        air_date
        episode
        characters {
          id
          name
          status
          species
          type
          gender
          image
        }
        created
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      created
    }
  }
`;

export const GET_TOTALS = gql`
  query GetTotals {
    episodes {
      info {
        count
      }
    }
    characters {
      info {
        count
      }
    }
  }
`;

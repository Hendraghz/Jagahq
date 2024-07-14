import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_EPISODES } from "../api/queries";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

interface Character {
  id: string;
  name: string;
}

interface Episode {
  id: string;
  name: string;
  episode: string;
  air_date: string;
  characters: Character[];
}

interface EpisodesData {
  episodes: {
    results: Episode[];
    info: {
      next: number;
    };
  };
}

interface ListEpisodeProps {
  filterNama: string;
  filterEpisode: string;
}

const ListEpisode: React.FC<ListEpisodeProps> = ({
  filterNama,
  filterEpisode,
}) => {
  const [page, setPage] = useState(1);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const { loading, error, data, fetchMore } = useQuery<EpisodesData>(
    GET_EPISODES,
    {
      variables: { page, name: filterNama, episode: filterEpisode },
    }
  );

  useEffect(() => {
    if (data && data.episodes && data.episodes.results) {
      setEpisodes(data.episodes.results);
    }
  }, [data]);

  const fetchMoreData = () => {
    if (data?.episodes?.info?.next) {
      fetchMore({
        variables: {
          page: data.episodes.info.next,
          name: filterNama,
          episode: filterEpisode,
        },
      }).then((fetchMoreResult) => {
        setPage(fetchMoreResult.data.episodes.info.next);
      });
    }
  };

  const filterEpisodes = (ep: Episode) => {
    const nameMatch = ep.name.toLowerCase().includes(filterNama.toLowerCase());
    const episodeMatch = ep.episode
      .toLowerCase()
      .includes(filterEpisode.toLowerCase());
    return nameMatch || episodeMatch;
  };

  if (loading && page === 1) return <div>Loading...</div>;
  if (error) return <div>Error loading episodes</div>;

  return (
    <div className="text-black pt-[2rem] flex flex-col px-10 h-screen overflow-auto scrollable-div">
      {/* Infinite Scroll */}
      <InfiniteScroll
        dataLength={episodes.length}
        next={fetchMoreData}
        hasMore={!!data?.episodes?.info?.next}
        loader={<div>Loading more episodes...</div>}
      >
        {/* Data Episodes */}
        {episodes.filter(filterEpisodes).map((ep) => (
          <div key={ep.id} className="episode-container">
            <a
              href="#"
              className="w-[15rem] bg-gray-200 mb-[1rem] px-5 py-12 flex justify-center rounded-md hover:bg-gray-400"
            >
              <div className="icon bg-white px-3 py-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                  />
                </svg>
              </div>
            </a>
            <p className="font-semibold">{ep.name}</p>
            <div className="flex justify-between w-[15rem] mt-2">
              <p>{ep.episode}</p>
              <p>{ep.air_date}</p>
            </div>
            {/* Data Character */}
            <div className="character flex flex-wrap gap-2 mt-[2rem] mb-[2rem]">
              {ep.characters.map((char: Character) => (
                <div key={char.id}>
                  <Link
                    to={`/char/${char.id}`}
                    className="flex items-center hover:bg-gray-300 hover:rounded-md px-2 py-1.5"
                  >
                    {char.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ListEpisode;

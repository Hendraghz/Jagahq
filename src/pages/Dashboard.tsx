import React, { useState, ChangeEvent } from "react";
import ListEpisode from "../components/ListEpisode";
import { GET_TOTALS } from "../api/queries";
import { useQuery } from "@apollo/client";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [filterNama, setFilterNama] = useState<string>("");
  const [filterEpisode, setFilterEpisode] = useState<string>("");

  const { data } = useQuery(GET_TOTALS);
  const handleFilterNamaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterNama(event.target.value);
  };

  const handleFilterEpisodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterEpisode(event.target.value);
  };

  const total_eps = data?.episodes?.info.count || 0;
  const total_char = data?.characters?.info.count || 0;
  return (
    <>
      <div className="flex gap-5">
        {/* Sidebar */}
        <div className="sidebar w-[5rem] bg-white h-screen">
          <div className="logo flex justify-center pt-[1rem]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={0.6}
              stroke="black"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
              />
            </svg>
          </div>
          <ul className="flex justify-center pt-[4rem]">
            <li className="bg-purple-300 px-2 py-2 rounded-lg">
              <a href="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="black"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
        {/* End Sidebar */}
        {/* Info Data*/}
        <div className="info">
          <div className="bg-white w-[20rem] h-[15rem] px-5 pt-[2rem]">
            <h1 className="text-black text-lg font-bold">Test JagaHQ</h1>
            <p className="text-black text-sm mt-[1rem]">
              Website dibuat guna memenuhi test dari JagaHQ
            </p>
            {/* Filters */}
            <div className="filters mb-4 mt-[2rem]">
              <input
                type="text"
                placeholder="Filter by name"
                value={filterNama}
                onChange={handleFilterNamaChange}
                className="mr-2 px-2 py-1 border border-gray-300 rounded-md bg-white text-gray-400"
              />
              <input
                type="text"
                placeholder="Filter by episode"
                value={filterEpisode}
                onChange={handleFilterEpisodeChange}
                className="px-2 py-1 border border-gray-300 rounded-md bg-white mt-[1rem] text-gray-400"
              />
            </div>
          </div>
          <div className="bg-white w-[20rem] px-8 py-8 mt-5 rounded-md">
            <h1 className="text-black font-bold">Total Episodes</h1>
            <p className="text-black text-3xl font-bold">
              {total_eps} <span className="text-sm font-normal">Episodes</span>
            </p>
          </div>
          <div className="bg-white w-[20rem] px-8 py-8 mt-5 rounded-md">
            <h1 className="text-black font-bold">Total Character</h1>
            <p className="text-black text-3xl font-bold">
              {total_char}{" "}
              <span className="text-sm font-normal">Character</span>
            </p>
          </div>
        </div>
        {/* End Info Data */}
        {/* Main */}
        <div className="main w-[50rem] bg-white">
          <div className="episodes">
            <ListEpisode
              filterEpisode={filterEpisode}
              filterNama={filterNama}
            />
          </div>
        </div>
        {/* End Main */}
      </div>
    </>
  );
};

export default Dashboard;

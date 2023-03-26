import ArtistCard from "@/shared/components/artist_card";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import search from "../public/search.png";
import Loading from "./Loading";
const client_secret = "67d0070707a34622afcb7921ec1ecda4";

export default function Home() {
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchForArtists = async (search: any) => {
    if (typeof(search) === 'object' && !query) {
      return;
    } else {
      setIsLoading(true);
      const artists_endpoint = `https://api.spotify.com/v1/search?q=${
        query ? query : search
      }&type=artist`;
      let config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("spotify_token")}`,
        },
      };
      let res = await axios.get(artists_endpoint, config);
      setArtists(res?.data?.artists?.items);
      if (query) {
        localStorage.setItem("search", query);
      }

      setIsLoading(false);
    }
  };

  useEffect(() => {
    let search = localStorage.getItem("search");
    if (search) {
      searchForArtists(search);
      setQuery(search);
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-start">
      <div className=" border px-6 pr-8 py-2 my-8 flex flex-row items-center  rounded relative">
        <input
          className="outline-none"
          type="text"
          placeholder="Search for an artist..."
          onChange={e => setQuery(e.target.value)}
          value={query}
        />
        <img
          onClick={searchForArtists}
          className="h-4 w-4 absolute right-2 cursor-pointer"
          src={search.src}
          alt=""
        />
      </div>
      <div className="w-full flex flex-row items-center justify-center flex-wrap p-8">
        {isLoading ? (
          <Loading />
        ) : artists?.length > 0 ? (
          artists?.map((artist: any, index: any) => (
            <Link href={`/artist/${artist?.id}?name=${artist?.name}`}>
              <ArtistCard
                id={artist?.id}
                rating={artist?.popularity}
                image={artist?.images[0]?.url}
                name={artist?.name}
                followers={artist?.followers?.total}
              />
            </Link>
          ))
        ) : (
          <div>No Artists</div>
        )}
      </div>
    </div>
  );
}

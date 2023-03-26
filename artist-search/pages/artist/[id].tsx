import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ArtistAlbum from "@/shared/components/artist_album";

export default function Artist() {
  const router = useRouter();
  const [albums, setAlbums] = useState([]);
  const { name } = router.query;

  const getAlbums = async (id: any) => {
    if (id) {
      let end_point = `https://api.spotify.com/v1/artists/${id}/albums`;
      let config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("spotify_token")}`,
        },
      };

      let res = await axios.get(end_point, config);
      setAlbums(res.data.items);
  
    }
  };

  useEffect(() => {
    const { id } = router.query;
    getAlbums(id);
  }, [router.query]);
  return (
    <div className="w-full p-8 flex flex-col items-start">
      <div className="w-full flex flex-col items-start">
        <div className="text-xl font-semibold">{name}</div>
        <div className="text-lg text-gray-400 font-semibold">Albums</div>
      </div>
      <div className="w-full flex flex-row flex-wrap items-center py-8">
        {albums?.length > 0 &&
          albums.map((album: any, index: any) => (
            <ArtistAlbum
            key={album?.id}
              release_year={album?.release_date}
              album_title={album?.name}
              number_of_tracks={album?.total_tracks}
              image={album?.images[0]?.url}
              link={album?.external_urls?.spotify}
              list_of_artists={album?.artists}
            />
          ))}
      </div>
    </div>
  );
}

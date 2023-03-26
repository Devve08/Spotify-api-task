import React from "react";

type AlbumProps = {
  album_title: string;
  image: string;
  list_of_artists: any;
  release_year: string;
  number_of_tracks: number;
  link: string;
};

export default function ArtistAlbum({
  album_title,
  image,
  list_of_artists,
  release_year,
  number_of_tracks,
  link,
}: AlbumProps) {
  const prepareArtists = (array: any) => {
    let arr: any = [];
    if (array?.length > 0) {
      array?.forEach((item: any) => arr.push(item?.name));
    }

    return arr.join(", ");
  };

  return (
    <div className="w-56 h-96 flex flex-col m-4 border-2 bg-gray-200">
      <img src={image} className="w-full h-2/4" />
      <div className="w-full p-2 flex flex-col justify-between items-start h-2/4">
        <div className="w-full">
          <div className="font-semibold text-md">{album_title}</div>
          <div className="text-sm text-gray-600">
            {prepareArtists(list_of_artists)}
          </div>
        </div>
        <div>
          <div>{release_year}</div>
          <div>{number_of_tracks}</div>
        </div>
      </div>
      <a
        href={link}
        className="w-full flex flex-row justify-center items-center border-2 p-1 border-gray-400 hover:bg-gray-400"
      >
        Preview on Spotify
      </a>
    </div>
  );
}

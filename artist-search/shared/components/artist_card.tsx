import Image from "next/image";
import React from "react";
import ReactStars from "react-stars";

type ArtistProps = {
  image: string;
  name: string;
  followers: number;
  rating: number;
  id: string
};

export default function ArtistCard({
  image,
  name,
  followers,
  rating,
  id
}: ArtistProps) {
  const prepareRating = (rating: number) => {
    return (rating * 5) / 100;
  };
  return (
    <a  className="w-52 h-72 flex flex-col m-4 cursor-pointer border-2 bg-gray-200 hover:bg-gray-400">
      <img src={image} className="w-full h-2/4" />
      <div className="w-full p-2 flex flex-col justify-between items-start h-2/4">
        <div className="w-full">
          <div className="font-semibold text-xl">{name}</div>
          <div className="text-sm text-gray-600">{followers} followers</div>
        </div>
        <div>
          <ReactStars
            value={prepareRating(rating)}
            size={24}
            color2={"#ffd700"}
            count={5}
            edit={false}
          />
        </div>
      </div>
    </a>
  );
}

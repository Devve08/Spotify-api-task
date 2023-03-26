import { getReturnedParams, loginToSpotify } from "@/shared/helpers/functions";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import spotify from "../public/spotify.png";
const client_id = "e462109aa20d4c04b32bdadd0b3ff11e";

const spotify_auth_endpoint = "https://accounts.spotify.com/authorize";
const redirect = "http://localhost:3000/home";
export default function Login() {
  const handleLogin = () => {
    let url = `${spotify_auth_endpoint}?client_id=${client_id}&response_type=token&redirect_uri=${redirect}&show_dialog=true`;
    loginToSpotify(url);
    localStorage.removeItem('search')
  };

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <div onClick={handleLogin} className="flex flex-row py-3 relative items-center justify-center border rounded w-1/4 cursor-pointer hover:bg-gray-200">
        <span className="font-semibold" >
          Login
        </span>
        <img className="h-8 w-8 absolute right-2 " src={spotify.src} alt="" />
      </div>
    </div>
  );
}

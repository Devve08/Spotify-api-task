import Loading from "@/pages/Loading";
import Login from "@/pages/login";
import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { getReturnedParams } from "../helpers/functions";
type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [isLoading, setIsLoading] = useState(true);

  const checkUser = () => {

    if (window.location.hash) {
      const { access_token, expires_in, token_type } = getReturnedParams(
        window.location.hash
      );
      localStorage.setItem("spotify_token", access_token);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <div className="w-full h-screen">
      <Header />
      <div className="w-full">{children}</div>
    </div>
  );
}

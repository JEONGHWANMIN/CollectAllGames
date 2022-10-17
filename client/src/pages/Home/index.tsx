import React from "react";
import { useLoaderData } from "react-router";
interface Props {
  user?: string;
}

function Home() {
  const user = useLoaderData();
  console.log(user);
  return <div>안녕하세요 !!</div>;
}

export default Home;

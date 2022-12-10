/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useGetPostsQuery from "./query/useGetPostsQuery";

function useHomeFetch() {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage } = useGetPostsQuery();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return {
    data,
    ref,
  };
}

export default useHomeFetch;

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PaginatedSerieTV from "../components/PaginatedSerieTV";
import { fetchSerieTVByQuery } from "../action/serietvActions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const SerieTVPage = () => {
  const [query, setQuery] = useState("");

  const serietv = useSelector((state) => state.serietv.searchResults);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryParam = queryParams.get("query");
    if (queryParam) {
      setQuery(queryParam);
      dispatch(fetchSerieTVByQuery(queryParam));
      setQuery("");
    }
  }, [dispatch, location]);
  return (
    <div className="p-4 background">
      <h1>Serie TV</h1>
      {serietv && serietv.length > 0 ? (
        <PaginatedSerieTV />
      ) : (
        <p>No serietv found for your search.</p>
      )}
    </div>
  );
};

export default SerieTVPage;

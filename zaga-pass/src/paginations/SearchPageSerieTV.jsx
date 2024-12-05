import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSerieTVByQuery } from "../action/serietvActions";
import SerieTVComponents from "../components/SerieTVComponents";

const SearchPageSerieTV = () => {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const serietv = useSelector((state) => state.serietv.searchResultsSerieTV);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("query");
    if (searchQuery) {
      setQuery(searchQuery);
      dispatch(fetchSerieTVByQuery(searchQuery));
    }
  }, [location.search, dispatch]);

  return (
    <div className="p-4 background">
      <h1>Risultati per: "{query}"</h1>
      <SerieTVComponents tvShowList={serietv} />
    </div>
  );
};

export default SearchPageSerieTV;

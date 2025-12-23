import { useState, useEffect } from "react";
import axios from "axios";

function MoviePoster() {
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    axios.get("https://api.netflix.com/movies/random");
    .then((res)=>setPoster(res))
  }, []);

  return <div>{poster && <img src={poster} alt="Movie Poster" />}</div>;
}
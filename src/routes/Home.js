import { useState, useEffect } from "react";
import Movie from '../components/Movie';

function Home() {
  //로딩 여부
  const [loading, setLoading] = useState(true);
  //coin 정보 배열
  const [movies, setMovies] = useState([]);
  
  const getMovies = async () => {
    //api 적용
    const response = await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year")
    const json = await response.json();
    
    setMovies(json.data.movies);
    setLoading(false);
  }

  useEffect(() => {
    getMovies();
  }, [])


  return (
    <div>
      {loading ? (
        <h1>Loding ...</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
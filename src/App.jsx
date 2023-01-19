import { useState, useEffect } from "react";
import AddMovieForm from "./components/AddMovieForm";
import MovieList from "./components/MovieList";

function App() {
  const [movies, setMovies] = useState([]);
  const [updateStorage, setUpdateStorage] = useState(false);

  useEffect(() => {
    if (updateStorage) {
      localStorage.setItem("allMovies", JSON.stringify(movies));
      setUpdateStorage(false);
    }
  }, [movies, updateStorage]);

  useEffect(() => {
    const moviesFromStorage = localStorage.getItem("allMovies");
    if (moviesFromStorage) {
      const json = JSON.parse(moviesFromStorage);
      setMovies(json);
    }
  }, []);

  const handleDelete = (movieId) => {
    const newMovieList = movies.filter((m) => m.id !== movieId);
    setMovies(newMovieList);
  };

  const handleAdd = (movieInfo) => {
    const moviePayload = {
      ...movieInfo,
      id: new Date().getTime(),
    };
    setMovies((prev) => {
      const update = [...prev];
      update.push(moviePayload);
      return update;
    });
    setUpdateStorage(true);
  };

  return (
    <div className="container">
      <AddMovieForm onMovieAdd={handleAdd} />
      <MovieList movies={movies} onMovieDelete={handleDelete} />
    </div>
  );
}

export default App;

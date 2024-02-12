const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

  getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  showMovies(respData.results);
}

async function getMovieGenre(ids) {
  const resp = await fetch(API_URL_GENRES);
  const respData = await resp.json();

  let result = [];
  for (const [, value] of Object.entries(respData.genres)) {
    ids.map((el) => {
      if (el === value.id) {
        result.push(value.name);
      }
    });
  }
  return result.join(", ");
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(movies) {
  const moviesEl = document.querySelector(".movies");
  movies.forEach(async (movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <div class="movie__cover-inner">
          <img src="https://image.tmdb.org/t/p/w500/${
            movie.poster_path
          }" class="movie__cover" alt="Годзилла против Конга">
          <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
          <div class="movie__title">${movie.title}</div>
          <div class="movie__category">${await getMovieGenre(
            movie.genre_ids
          )}</div>
          <div class="movie__average movie__average--${getClassByRate(
            movie.vote_average
          )}">${movie.vote_average}</div> 
        </div>
      `;
    moviesEl.appendChild(movieEl);
  });
}
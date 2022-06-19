import getMovieData from "./movieData.js";

init();

async function init() {
  const URL = "https://api.themoviedb.org/3/movie/upcoming";
  const API_KEY = process.env.SILVERSCREEN_FETCH_SAMPLE_API_KEY;

  let allUpcomingMoviesData, upcomingMoviesData;

  // Gets all movie data from the API
  // Ref 1: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
  // Ref 2: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
  allUpcomingMoviesData = await getMovieData(URL, API_KEY);

  // Extract only the title, release date, and poster image Url
  // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  upcomingMoviesData = allUpcomingMoviesData.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      releaseDate: movie.release_date,
      posterUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    };
  });

  // Add the movie data to the page
  for (const movieData of upcomingMoviesData) {
    // id, title, releaseDate & posterUrl are extracted using object destructuring
    // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring
    const { id, title, releaseDate, posterUrl } = movieData;

    const template = `
      <div class="movie-card" data-movie-id="${id}">
        <h3 class="movie-title">${title}</h3>
        <div class="movie-poster-wrapper">
          <p class="movie-release-date">Released on: ${releaseDate}</p>
          <img class="movie-poster" src="${posterUrl}" alt="Poster of ${title}">
          <div class="movie-overlay">
            <a href="./movie-details?movieId=${id}">View More</a>
          </div>
        </div>
      </div>`;

    // Parses the 'template' as HTML and inserts the resulting nodes into the DOM tree.
    // Ref: https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
    document
      .getElementById("moviesContainer")
      .insertAdjacentHTML("beforeend", template);
  }
}

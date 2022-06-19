import getMovieData from "./movieData.js";

init();

async function init() {
  const URL = "https://api.themoviedb.org/3/movie/upcoming";
  const API_KEY = process.env.SILVERSCREEN_FETCH_SAMPLE_API_KEY;

  // Gets all movie data from the API
  let allUpcomingMovieData, upcomingMovieData;

  // If the upcoming movies data is not already stored in localStorage,
  // fetch the data from the MovieDb API
  const retrievedData = localStorage.getItem("upcoming_movies");

  // No movie data in localStorage
  if (!retrievedData) {
    allUpcomingMovieData = await getMovieData(URL, API_KEY);

    // Extract only the title, release date, and poster image Url
    upcomingMovieData = allUpcomingMovieData.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        releaseDate: movie.release_date,
        posterUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
      };
    });

    localStorage.setItem("upcoming_movies", JSON.stringify(upcomingMovieData));
  } else {
    // Movie data is already in localStorage. Just need to parse it
    upcomingMovieData = JSON.parse(retrievedData);
  }

  // Add the movie data to the page
  for (const { id, title, releaseDate, posterUrl } of upcomingMovieData) {
    // title, releaseDate & posterUrl are extracted using object destructuring
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
      </div>
                      `;
    document
      .getElementById("moviesContainer")
      .insertAdjacentHTML("beforeend", template);
  }
}

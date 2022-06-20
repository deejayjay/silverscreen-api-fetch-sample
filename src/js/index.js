import getMovieData from "./movieData.js";

init();

async function init() {
  const URL = "https://api.themoviedb.org/3/movie/upcoming";
  const API_KEY = process.env.SILVERSCREEN_FETCH_SAMPLE_API_KEY;

  // Gets all movie data from the API
  let allUpcomingMoviesData, upcomingMoviesData;

  // If the upcoming movies data is not already stored in localStorage,
  // fetch the data from the MovieDb API
  const retrievedData = localStorage.getItem("upcoming_movies");
  const lastQueryTime = +localStorage.getItem("upcoming_lastQueryTime"); // Prefix + is added to convert the value to Number
  const currentTime = Date.now();
  const timeDiffInSeconds = (currentTime - lastQueryTime) / 1000;

  // If there is no movie data in localStorage or
  // it has been 8 hours (28800 seconds) or more since the last query
  if (!retrievedData || timeDiffInSeconds >= 28800) {
    allUpcomingMoviesData = await getMovieData(URL, API_KEY);
    console.log(`Fetched Movie Data:`, allUpcomingMoviesData);

    // Extract only the title, release date, and poster image Url
    upcomingMoviesData = allUpcomingMoviesData.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        releaseDate: movie.release_date,
        posterUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
      };
    });

    // Store the Timestamp for when the movie data was fetched to the local storage
    const queryTime = Date.now();
    localStorage.setItem("upcoming_lastQueryTime", queryTime);
    localStorage.setItem("upcoming_movies", JSON.stringify(upcomingMoviesData));
  } else {
    // Movie data is already in localStorage. Just need to parse it
    upcomingMoviesData = JSON.parse(retrievedData);
  }

  // Add the movie data to the page
  for (const movieData of upcomingMoviesData) {
    // id, title, releaseDate & posterUrl are extracted using object destructuring
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
      </div>
                      `;
    document
      .getElementById("moviesContainer")
      .insertAdjacentHTML("beforeend", template);
  }
}

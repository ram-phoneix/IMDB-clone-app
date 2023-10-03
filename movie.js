
const apiKey = 'ca77102b'; 
const movieDetails = document.getElementById('movie-details');

// Function to fetch and display movie details
async function fetchMovieDetails(imdbID) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
        const movie = await response.json();

        if (!movie.Error) {
            const poster = movie.Poster === 'N/A' ? '' : `<img src="${movie.Poster}" alt="${movie.Title} Poster">`;
            movieDetails.innerHTML = `
                <h2>${movie.Title} (${movie.Year})</h2>
                ${poster}
                <p><strong>Plot:</strong> ${movie.Plot}</p>
                <!-- Add more movie details here if needed -->
            `;
        }
    } catch (error) {
        console.error(error);
    }
}

// Check if IMDb ID is present in the URL
const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('imdbID');

if (imdbID) {
    fetchMovieDetails(imdbID);
}

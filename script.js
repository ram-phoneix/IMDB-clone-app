const apiKey = 'ca77102b'; 
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const favoritesLink = document.querySelector('.favorites-link');
let data; // Declare data at a higher scope
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Function to fetch and display movie search results
async function fetchMovies(query) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
        data = await response.json();

        if (data.Search) {
            searchResults.innerHTML = '';
            data.Search.forEach(movie => {
                const movieBox = document.createElement('div');
                movieBox.classList.add('movie-box');
                movieBox.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title} Poster">
                    <h3>${movie.Title} (${movie.Year})</h3>
                    <button class="add-favorite" data-id="${movie.imdbID}">Add to Favorites</button>
                    <button class="movie-details-button" data-id="${movie.imdbID}">Movie Details</button>
                `;
                searchResults.appendChild(movieBox);

                // Add an event listener to the "Add to Favorites" button
                const addFavoriteButton = movieBox.querySelector('.add-favorite');
                addFavoriteButton.addEventListener('click', () => {
                    const imdbID = movie.imdbID;
                    const isMovieInFavorites = favorites.some(fav => fav.imdbID === imdbID);

                    if (!isMovieInFavorites) {
                        favorites.push(movie);
                        localStorage.setItem('favorites', JSON.stringify(favorites));
                    }

                    // Update the text of the button
                    addFavoriteButton.textContent = isMovieInFavorites ? 'Remove from Favorites' : 'Added to Favorites';
                });

                // Add an event listener to the "Movie Details" button
                const movieDetailsButton = movieBox.querySelector('.movie-details-button');
                movieDetailsButton.addEventListener('click', () => {
                    // Redirect to the movie details page with the imdbID as a query parameter
                    window.location.href = `movie.html?imdbID=${movie.imdbID}`;
                });
            });
        }
    } catch (error) {
        console.error(error);
    }
}

// Event listener for search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query.length >= 3) {
        fetchMovies(query);
    }
});

// Event listener for searching as you type
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query.length >= 3) {
        fetchMovies(query);
    }
});

// Event listener for the "My Favorite Movies" link
favoritesLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'favorites.html';
});


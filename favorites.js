const favoritesList = document.getElementById('favorites-list');
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Function to display favorite movies
function displayFavorites() {
    favoritesList.innerHTML = '';
    favorites.forEach(movie => {
        const listItem = document.createElement('div');
        listItem.classList.add('favorite-item');
        listItem.innerHTML = `
            <h3>${movie.Title} (${movie.Year})</h3>
            <button class="remove-favorite" data-id="${movie.imdbID}">Remove from Favorites</button>
        `;
        favoritesList.appendChild(listItem);
    });
}

// Event listener for removing a movie from favorites
favoritesList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-favorite')) {
        const imdbID = event.target.getAttribute('data-id');
        const movie = favorites.find(fav => fav.imdbID === imdbID);

        if (movie) {
            favorites.splice(favorites.indexOf(movie), 1);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            displayFavorites();
        }
    }
});

// Call the function to display favorite movies on page load
displayFavorites();

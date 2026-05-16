const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchHistory = document.getElementById('searchHistory');

function getSearches() {
    return JSON.parse(localStorage.getItem('searches')) || [];
}

function saveSearch(term) {
    let searches = getSearches();
    searches = searches.filter(s => s !== term);
    searches.unshift(term);
    searches = searches.slice(0, 5);
    localStorage.setItem('searches', JSON.stringify(searches));
}

function renderHistory() {
    const searches = getSearches();
    searchHistory.innerHTML = '';
    searches.forEach(term => {
        const li = document.createElement('li');
        li.textContent = term;
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => {
            searchInput.value = term;
        });
        searchHistory.appendChild(li);
    });
}

searchBtn.addEventListener('click', function () {
    const term = searchInput.value.trim();
    if (!term) return;
    saveSearch(term);
    renderHistory();
    searchInput.value = '';
});

renderHistory();
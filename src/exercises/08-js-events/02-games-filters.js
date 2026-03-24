let applyBtn = document.getElementById('apply_filters');
let clearBtn = document.getElementById('clear_filters');

let cards = document.querySelectorAll('.card');

let form = document.getElementById("filters");

applyBtn.addEventListener('click', (event) => {
    event.preventDefault();
    applyFilters();
})
clearBtn.addEventListener('click', (event) => {
    event.preventDefault();
    clearFilters();
})

function applyFilters() {
    // console.log("Applying filters");
    let filters = getFilters();
    // let matches = [];
    for (let i = 0; i != cards.length; i++) {
        let card = cards[i]; 
        let match = cardMatches(card, filters);
        card.classList.toggle('hidden',!match);

    }
    let cardsArray = Array.from(cards);
    const sorted = sortCards(cardsArray, filters.sortBy);

}

function sortCards(cards, sortBy){
    const list = cards.slice();
    
    list.sort((a, b) => {
    let titleA = a.dataset.title.toLowerCase();
    let titleB = b.dataset.title.toLowerCase();
    let yearA = Number(a.dataset.year);
    let yearB = Number(b.dataset.year);

    if (sortBy === "year_desc") return yearB - yearA;
    if (sortBy === "year_asc") return yearA - yearB;

    return titleA.localeCompare(titleB);
});

    return list; 
}



function cardMatches(crd,fltrs) {
    // console.log(crd,dataset.title, fltrs.titleFilter)
    let title = crd.dataset.title.toLowerCase();
    let genre = crd.dataset.genre;
    let platform = crd.dataset.platform;

    let matchTitle    = fltrs.titleFilter     === "" || title.includes(fltrs.titleFilter);
    let matchGenre    = fltrs.genreFilter     === "" || genre === fltrs.genreFilter;
    let matchPlatform = fltrs.platformFilter  === "" || platform.includes(fltrs.platformFilter);

    return matchTitle && matchGenre && matchPlatform;
}

function getFilters() {
     const titleEL = form.elements['title_filter'];
     const genreEL = form.elements['genre_filter'];
     const platformEL = form.elements['platform_filter'];
     const sortEL = form.elements['sort_by'];

     let titleFilter = (titleEL.value || '').trim().toLowerCase();
     let genreFilter = genreEL.value || '';
     let platformFilter = platformEL.value || '';
     let sortBy = sortEL.value || 'title_asc';

     return {
        "titleFilter" : titleFilter,
        "genreFilter" : genreFilter,
        "platformFilter" : platformFilter,
        "sortBy" : sortBy,
     }
}

function clearingFilters() {
    console.log("Clearing filters");
    
}
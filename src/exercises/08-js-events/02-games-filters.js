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
    let matches = [];
    for (let i = 0; i != cards.length; i++) {
        let card = cards[i]; 
        matches[i] = cardMatches(card, filters);

    }
    console.log (matches);

}

function cardMatches(crd,fltrs) {
    // console.log(crd,dataset.title, fltrs.titleFilter)
    let title = crd.dataset.title.toLowerCase();
    return title.includes(fltrs.titleFilter);
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
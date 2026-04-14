let applyBtn = document.getElementById('apply_filters');
let clearBtn = document.getElementById('clear_filters');

let cardContainer = document.getElementById("book_cards");

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
document.querySelector("form").addEventListener("submit", (event)=>{
    event.preventDefault();
    applyFilters();
});
 
 


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
    sorted.forEach(card => {
        cardContainer.appendChild(card)
    });

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
    let publisher = crd.dataset.publisher;
    let format = crd.dataset.format;

    let matchTitle    = fltrs.titleFilter     === "" || title.includes(fltrs.titleFilter);
    let matchPublisher    = fltrs.publisherFilter     === "" || publisher === fltrs.publisherFilter;
    let matchFormat = fltrs.formatFilter  === "" || format.includes(fltrs.formatFilter);

    return matchTitle && matchFormat && matchPublisher;
}

function getFilters() {
     const titleEL = form.elements['title_filter'];
     const publisherEL = form.elements['publisher_filter'];
     const formatEL = form.elements['format_filter'];
     const sortEL = form.elements['sort_by'];

     let titleFilter = (titleEL.value || '').trim().toLowerCase();
     let publisherFilter = publisherEL.value || '';
     let formatFilter = formatEL.value || '';
     let sortBy = sortEL.value || 'title_asc';

     return {
        "titleFilter" : titleFilter,
        "publisherFilter" : publisherFilter,
        "formatFilter" : formatFilter,
        "sortBy" : sortBy,
     }
}

function clearFilters() {
    form.reset();
    cards.forEach(function(card){
        let match = cardMatches(card,filters)
        card.classList.remove('hidden');

    });

    let cardsArray = Array.form(cards);
    const sorted = sortCards(cardsArray, "title");
    sorted.forEach(card => {
        cardContainer.appendChild(card);
    });
    console.log("Clearing filters");
    
}
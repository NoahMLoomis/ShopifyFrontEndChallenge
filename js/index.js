const searchBtn = document.querySelector("#searchBtn");
const searchDetails = document.querySelector("#searchBar");
const results = document.querySelector("#movieResultList");

searchBtn.addEventListener("click", () => {
    let link = "http://www.omdbapi.com/?i=tt3896198&apikey=824b361b&t=" + searchDetails.value;
    fetch(link)
    .then(data => data.json())
    .then(movie => {
       results.innerHTML+= `<li>${movie.Title}, ${movie.Year} <button id="${movie.Title}">Nominate</button></li>`;
    })
})
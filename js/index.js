const searchBtn = document.querySelector("#searchBtn");
const searchDetails = document.querySelector("#searchBar");
const results = document.querySelector("#movieResultList");
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
let nominatedMovies=[];

//Always use const!!!
for (let i=0; i<26; i++){

}

const searchForMovie = (link) => {
    fetch(link)
        .then(data => data.json())
        .then(movie => {

            console.log(movie);
            if (movie.Response === "False"){
                results.innerHTML+= `${movie.Error}`;
            }else{
                results.innerHTML+= `<li>${movie.Title}, ${movie.Year} <button id="${movie.Title}Add" class="btn btn-secondary">Nominate</button></li>`;

                document.querySelector(`#${movie.Title}Add`).addEventListener("click", (e) => { 
                        e.target.disabled=true;
                        console.log(e.target)
                        addToNominate(movie);
                    })

            }

            

        })
        .catch(e => console.log(`Exception caught${e}`));
}

const addToNominate = (movie) => {

    document.querySelector("#nominationList").innerHTML="";
    nominatedMovies.push(movie)

    nominatedMovies.forEach(movie => {
        document.querySelector("#nominationList").innerHTML += 
            `<li>${movie.Title}, ${movie.Year} <button id="${movie.Title}Remove" class="btn btn-secondary">Remove</button></li>`;
        
    })

    document.querySelector(`${movie.Title}Remove`).addEventListener('click', () => {
        
    })

    if (nominatedMovies.length === 5){
        console.alert("All done");
    }
}

searchBtn.addEventListener("click", () => {
    results.innerHTML="";

    let link = "http://www.omdbapi.com/?i=tt3896198&apikey=824b361b&t=" + searchDetails.value;
    searchForMovie(link)
})

searchDetails.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
            
        results.innerHTML="";
        let link = "http://www.omdbapi.com/?i=tt3896198&apikey=824b361b&t=" + searchDetails.value;
        searchForMovie(link)
    }
})
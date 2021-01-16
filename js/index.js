const searchBtn = document.querySelector("#searchBtn");
const searchDetails = document.querySelector("#searchBar");
const results = document.querySelector("#movieResultList");
let nominatedMovies = [];

/*
Returns false if the movie has not been nominated, and true otherwise
*/

const checkNominate = (movie) => {
    let movieAlreadyNominated = false;
    nominatedMovies.forEach(nomMovie => {
        if (movie.imdbID === nomMovie.imdbID) {
            movieAlreadyNominated = true;
        }
    })
    return movieAlreadyNominated;

}

const searchForMovie = (link) => {
    fetch(link)
        .then(data => data.json())
        .then(movies => {
            console.log(movies);
            if (movies.Response === "False") {
                results.innerHTML += `${movies.Error}`;
            } else {
                movies.Search.forEach(movie => {

                    let detailsNode = document.createElement("li");
                    let btnNode = document.createElement("button");
                    btnNode.setAttribute("class", "btn btn-success");
                    btnNode.innerHTML = "Nominate";
                    btnNode.setAttribute("id", `${movie.imdbID}Add`);

                    btnNode.addEventListener("click", (e) => {
                        e.target.disabled = true;
                        addToNominate(movie);
                    })

                    detailsNode.innerHTML = `${movie.Title}, ${movie.Year}<br/>`

                    if (checkNominate(movie)) {
                        console.log("movie already nominated")
                        btnNode.setAttribute("disabled", "true");
                    }

                    detailsNode.appendChild(btnNode);
                    results.appendChild(detailsNode);
                })
            }

        }).catch(e => console.log(`Exception caught ${e}`));
}



const addToNominate = (movie) => {



    document.querySelector("#nominationList").innerHTML = "";
    nominatedMovies.push(movie)
    console.log(nominatedMovies);
    nominatedMovies.forEach(movie => {

        let detailsNode = document.createElement("li");
        let btnNode = document.createElement("button");
        btnNode.setAttribute("class", "btn btn-danger");
        btnNode.innerHTML = "Remove";
        btnNode.setAttribute("id", `${movie.imdbID}Remove`);
        detailsNode.innerHTML = `${movie.Title}, ${movie.Year} <br/>`;

        btnNode.addEventListener("click", (e) => {
            e.target.disabled = true;
            document.querySelector(`#${movie.imdbID}Add`).disabled = false;
            detailsNode.remove();
            let removeEl = nominatedMovies.indexOf(movie);

            (removeEl > -1) ? (nominatedMovies.splice(removeEl, 1)) : null;
        })
        detailsNode.appendChild(btnNode);
        document.querySelector("#nominationList").appendChild(detailsNode)
    })

    if (nominatedMovies.length === 5) {
        console.log("All done");

    }
}





searchBtn.addEventListener("click", () => {
    results.innerHTML = "";
    let link = "http://www.omdbapi.com/?i=tt3896198&apikey=824b361b&s=" + searchDetails.value;
    searchForMovie(link)
})

searchDetails.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        results.innerHTML = "";
        let link = "http://www.omdbapi.com/?i=tt3896198&apikey=824b361b&s=" + searchDetails.value;
        searchForMovie(link)
    }
})
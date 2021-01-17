const $$ = (id) => document.querySelector(id);
const searchBtn = $$("#searchBtn");
const searchDetails = $$("#searchBar");
const results = $$("#movieResultList");

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

            

            if ((movies.Response === "False") || (searchDetails.value ==="")) {
                //Hiding all movies, displaying error message

                document.getElementById("errorMsg").setAttribute("class", "animate__animated animate__headShake")
                document.getElementById("errorMsg").hidden = false;
                document.getElementById("searchResults").hidden = true;
                document.getElementById("nominations").hidden = true;
            } else {

                //Hide error message, show movies, add class names for animations
                
                document.getElementById("errorMsg").hidden = true;
                document.getElementById("searchResults").hidden = false;
                document.getElementById("nominations").hidden = false;

                document.getElementById("searchResults").setAttribute("class", "animate__animated animate__backInDown") 
                document.getElementById("nominations").setAttribute("class", "animate__animated animate__backInDown") 

                $$("#searchWord").textContent = searchDetails.value

                $$("#numResults").textContent= movies.Search.length

                /*
                Creating individual div for each movie and appending to "results" div
                */

                movies.Search.forEach(movie => {
                    let detailsNode = document.createElement("div");
                    detailsNode.setAttribute("class", "singleMovie");

                    let imgNode = document.createElement("img");
                    imgNode.setAttribute("src", `${movie.Poster}`)
                    imgNode.setAttribute("alt", `Movie poster`)
                    imgNode.setAttribute("width", '180px' );
                    imgNode.setAttribute("height", '250px' );

                    let btnNode = document.createElement("button");
                    btnNode.setAttribute("class", "btn btn-success");
                    btnNode.innerHTML = "Nominate";
                    btnNode.setAttribute("id", `${movie.imdbID}Add`);

                    btnNode.addEventListener("click", (e) => {
                        e.target.disabled = true;
                        addToNominate(movie);
                    })

                    detailsNode.innerHTML = `${movie.Title}, ${movie.Year}<br/>`

                    /*
                    This makes sure that if a movie pops up on a different search, the Nominate btn is disabled
                    */
                    if (checkNominate(movie)) {
                        console.log("movie already nominated")
                        btnNode.setAttribute("disabled", "true");
                    }
                    
                    detailsNode.appendChild(btnNode);
                    detailsNode.appendChild(imgNode);
                    results.appendChild(detailsNode);
                })
            }

        }).catch(e => console.log(`Exception caught ${e}`));
}


    /*
    Adds the selected movie to the "Nominated" section on the right side
    */

const addToNominate = (movie) => {

    $$("#nominationList").innerHTML = "";
    nominatedMovies.push(movie)
    nominatedMovies.forEach(movie => {

        let detailsNode = document.createElement("li");
        let btnNode = document.createElement("button");
        btnNode.setAttribute("class", "btn btn-danger");
        btnNode.innerHTML = "Remove";
        btnNode.setAttribute("id", `${movie.imdbID}Remove`);
        detailsNode.innerHTML = `${movie.Title}, ${movie.Year} <br/>`;
        detailsNode.className = "animate__animated animate__bounceIn"

        btnNode.addEventListener("click", (e) => {
            e.target.disabled = true;
            if ($$(`#${movie.imdbID}Add`) !== null)
                $$(`#${movie.imdbID}Add`).disabled = false;
            detailsNode.className = "animate__animated animate__bounceOut";
            let removeEl = nominatedMovies.indexOf(movie);

            (removeEl > -1) ? (nominatedMovies.splice(removeEl, 1)) : null;
        })
        detailsNode.appendChild(btnNode);
        $$("#nominationList").appendChild(detailsNode)
    })

    /*
    If 5 movies are nominated, transition out and show banner
    */
    if (nominatedMovies.length === 5) {

        document.getElementById("main").setAttribute("class", "animate__animated animate__bounceOut")
        $$("#header").setAttribute("class", "animate__animated animate__bounceOut")


        setTimeout(() => {
   document.getElementById("finishedNominations").hidden = false;
        document.getElementById("finishedNominations").setAttribute("class","animate__animated animate__backInDown"); 
        document.getElementById("searchResults").hidden = true;
        document.getElementById("nominations").hidden = true;
        }, 1000)
     

        nominatedMovies.forEach(movie => {
            let detailsNode = document.createElement("li");
            detailsNode.innerHTML = `${movie.Title}, ${movie.Year} <br/>`;
            $$("#bannerNominations").appendChild(detailsNode);
        })
    }
    
    $$("#startAgain").addEventListener("click", () => {
        document.getElementById("finishedNominations").setAttribute("class","animate__animated animate__backOutDown"); 
        setTimeout( () => {
            location.reload();
        }, 1000)
        
    })
        
}


/*
Event listeners for both "Enter" and a click on the search
*/


searchBtn.addEventListener("click", () => {
    results.innerHTML = "";
    let link = "https://www.omdbapi.com/?i=tt3896198&apikey=824b361b&s=" + searchDetails.value;
    searchForMovie(link)
})

searchDetails.addEventListener("keyup", (e) => {
    if (e.key === 'Enter') {
        results.innerHTML = "";
        let link = "https://www.omdbapi.com/?i=tt3896198&apikey=824b361b&s=" + searchDetails.value;
        searchForMovie(link)
    }
})


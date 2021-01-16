const searchBtn = document.querySelector("#searchBtn");
const searchDetails = document.querySelector("#searchBar");
const results = document.querySelector("#movieResultList");
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
let nominatedMovies=[];


const checkNominate = (movie) => {
    let movieAlreadyNominated = false;
    nominatedMovies.forEach(nomMovie => {
        if (movie === nomMovie){
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
            if (movies.Response === "False"){
                results.innerHTML+= `${movie.Error}`;
            }else{

                movies.Search.forEach(movie => {

                    let detailsNode = document.createElement("li");
                    let btnNode = document.createElement("button");
                    btnNode.innerHTML = "Nominate";
                    btnNode.setAttribute("id", `${movie.Title}Add`);
                    btnNode.addEventListener("click", (e) => {
                            e.target.disabled=true;
                            addToNominate(movie);
                    })

                    detailsNode.innerHTML = `${movie.Title}, ${movie.Year}`

                    detailsNode.appendChild(btnNode);
                    results.appendChild(detailsNode);
                })
            }

        }).catch(e => console.log(`Exception caught${e}`));
}



const addToNominate = (movie) => {

    

    document.querySelector("#nominationList").innerHTML="";
    nominatedMovies.push(movie)
    console.log(nominatedMovies);
    nominatedMovies.forEach(movie => {

            let detailsNode = document.createElement("li");
            detailsNode.innerHTML = `${movie.Title}, ${movie.Year}`;
            let btnNode = document.createElement("button");
            btnNode.innerHTML = "Remove";
            btnNode.setAttribute("id", `${movie.Title}Remove`);
            btnNode.addEventListener("click", (e) => {
                e.target.disabled=true;
                document.querySelector(`#${movie.Title}Add`).disabled=false;
            
        })



        detailsNode.appendChild(btnNode);
        document.querySelector("#nominationList").appendChild(detailsNode)
    })

    if (nominatedMovies.length === 5){
        console.log("All done");
    }
}





searchBtn.addEventListener("click", () => {
    results.innerHTML="";

    let link = "http://www.omdbapi.com/?i=tt3896198&apikey=824b361b&s=" + searchDetails.value;
    searchForMovie(link)
})

searchDetails.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
            
        results.innerHTML="";
        let link = "http://www.omdbapi.com/?i=tt3896198&apikey=824b361b&s=" + searchDetails.value;
        searchForMovie(link)
    }
})
document.getElementById("song-search").addEventListener('click', function(){
    document.getElementById("all-results").innerHTML = '';
    const songName = document.getElementById("song-name").value;
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
    .then( res => res.json())
    .then( data => {
        dataStored = data;
        for (let i = 0; i < data.data.length; i++) {
            const details = data.data[i];
            const title = details.title;
            const name = details.artist.name;
            const id = details.id;
            document.getElementById("all-results").innerHTML += `
            <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${title}</h3>
                <p class="author lead">Album by <span>${name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick = "getLyrics(${id})" class="btn btn-success">Get Lyrics</button>
            </div>
            </div>`

            if( i == 9){
                break;
            }
        }
    })
})

function getLyrics(songId){
    for (let i = 0; i < 10; i++) {
        if(dataStored.data[i].id == songId){
            const artistName = dataStored.data[i].artist.name;
            const songTitle = dataStored.data[i].title;
    fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
    .then( res => res.json())
    .then( json => {
        let lyrics = json.lyrics;
        if( lyrics == undefined){
            lyrics = `Lyrics not Found`
        }
        else{
            document.getElementById("song-lyrics").innerHTML =  `
            <div class="single-lyrics text-center">
            <h2 class="text-success mb-4">Song Lyrics</h2>
            <h5>${lyrics}</h5>
            <button class="btn btn-success" onClick="back()"><a class="nav-link text-white" href="#">Back<span class="sr-only">(current)</span></a></button>
            </div>`
        }
    })       
    }
    }
    document.getElementById("all-results").style.display= "none"
}
function back(){
    document.getElementById("all-results").style.display= "block"
    document.getElementById("song-lyrics").style.display= "none"

}
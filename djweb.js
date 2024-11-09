// Define Song and Playlist classes
class Song {
    constructor(title, artist, duration) {
        this.title = title;
        this.artist = artist;
        this.duration = duration;
    }
}

class Playlist {
    constructor(name, description, songs = [], thumbnail = "") {
        this.name = name;
        this.description = description;
        this.songs = songs; 
        this.thumbnail = thumbnail; 
    }

    addSong(song) {
        this.songs.push(song);
    }

    removeSong(songTitle) {
        this.songs = this.songs.filter(song => song.title !== songTitle);
    }

    setSongs(songs) {
        this.songs = songs; 
    }
}

const summer24 = new Playlist(
    "Summer 24'", 
    "10/28/2024: 4:30 PM - 6:00 PM", 
    [
        new Song("Despacito", "Luis Fonsi ft. Daddy Yankee", "3:45"),
        new Song("Taki Taki", "DJ Snake ft. Selena Gomez, Ozuna, Cardi B", "3:32"),
        new Song("El Farsante", "Ozuna", "2:42"),
        new Song("Con Calma", "Daddy Yankee ft. Snow", "3:13"),
        new Song("China", "Anuel AA, Daddy Yankee, Karol G, Ozuna, J Balvin", "5:01")
    ],
    "images/Beach.png" 
);

const urbanPicante = new Playlist(
    "Urban Picante", 
    "10/26/2024: 5:30 PM - 7:00 PM", 
    [
        new Song("Bailando", "Enrique Iglesias ft. Descemer Bueno & Gente de Zona", "4:15"),
        new Song("Chantaje", "Shakira ft. Maluma", "3:16"),
        new Song("Hawai", "Maluma", "3:22"),
        new Song("La Cancion", "J Balvin, Bad Bunny", "4:02"),
        new Song("Dakiti", "Bad Bunny, Jhay Cortez", "3:25")
    ],
    "images/Urban.png"
);

const fiestaVibes = new Playlist(
    "Fiesta Vibes", 
    "10/18/2024: 1:30 PM - 3:00 PM", 
    [
        new Song("Mi Gente", "J Balvin, Willy William", "3:06"),
        new Song("Felices los 4", "Maluma", "3:49"),
        new Song("Taki Taki", "DJ Snake ft. Selena Gomez, Ozuna, Cardi B", "3:32"),
        new Song("Con Calma", "Daddy Yankee ft. Snow", "3:13"),
        new Song("La Cancion", "J Balvin, Bad Bunny", "4:02")
    ],
    "images/Hits.png"
);


let current = new Playlist(
    "Currently Playing:", 
    summer24.name,
    [...summer24.songs], 
    summer24.thumbnail
);

function displayPlaylists() {
    const playlists = [current, summer24, urbanPicante, fiestaVibes]; 
    const playlistsContainer = document.getElementById("playlists");
    playlistsContainer.innerHTML = ""; 

    playlists.forEach((playlist, index) => {
        
        const playlistDiv = document.createElement("div");
        playlistDiv.classList.add("playlist");

        
        if (playlist === current) {
            playlistDiv.classList.add("current-playlist");
        }

       
        const playlistInfoDiv = document.createElement("div");
        playlistInfoDiv.classList.add("playlist-info");

      
        if (index % 2 === 0) {
            playlistInfoDiv.classList.add("left");
        } else {
            playlistInfoDiv.classList.add("right");
        }

        
        const thumbnail = document.createElement("img");
        thumbnail.classList.add("playlist-thumbnail");
        thumbnail.src = playlist.thumbnail; 
        thumbnail.alt = "Playlist Thumbnail"; 

        
        playlistInfoDiv.appendChild(thumbnail);

        const playlistName = document.createElement("h2");
        playlistName.textContent = playlist.name;

        const playlistDescription = document.createElement("p");
        playlistDescription.textContent = playlist.description;

        
        playlistInfoDiv.appendChild(playlistName);
        playlistInfoDiv.appendChild(playlistDescription);

        
        const songsList = document.createElement("ul");
        songsList.classList.add("songs-list");

        songsList.id = playlist.name + "-songs-list";  

        playlist.songs.forEach(song => {
            const songItem = document.createElement("li");
            songItem.classList.add("song-item");

            
            const titleElement = document.createElement("span");
            titleElement.classList.add("song-title");
            titleElement.textContent = song.title;

            const artistElement = document.createElement("span");
            artistElement.classList.add("song-artist");
            artistElement.textContent = song.artist;

            const durationElement = document.createElement("span");
            durationElement.classList.add("song-duration");
            durationElement.textContent = song.duration;

            const toggleImage = document.createElement("img");
            toggleImage.classList.add("toggle-image");
            toggleImage.src = isSongInCurrent(song.title) ? "images/check.png" : "images/plus.png";
            toggleImage.onclick = () => toggleSongInCurrent(song, toggleImage);

            
            songItem.appendChild(titleElement);
            songItem.appendChild(artistElement);
            songItem.appendChild(durationElement);
            songItem.appendChild(toggleImage);

            
            songsList.appendChild(songItem);
        });

        
        playlistDiv.appendChild(playlistInfoDiv);
        playlistDiv.appendChild(songsList);

        
        playlistsContainer.appendChild(playlistDiv);

        
        if (playlist === current) {
            const introDiv = document.createElement("div");
            introDiv.id = "intro";
            introDiv.innerHTML = "<h2>My Playlists</h2><p>Welcome to your playlists! Here, you can explore previous versions of our playlists created by you!</p>";

            
            playlistsContainer.appendChild(introDiv);
        }
    });
}



function isSongInCurrent(songTitle) {
    return current.songs.some(song => song.title === songTitle);
}


function toggleSongInCurrent(song, imageElement) {
    imageElement.classList.add("scale");

    setTimeout(() => {
        if (isSongInCurrent(song.title)) {
            current.removeSong(song.title);
            imageElement.src = "images/plus.png"; 
        } else {
            current.addSong(song);
            imageElement.src = "images/check.png"; 
        }

        imageElement.classList.remove("scale"); 
        displayPlaylists();
    }, 300); 
}


function validateForm() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "") {
        alert("Username is required.");
        return false;
    }

    if (password === "") {
        alert("Password is required.");
        return false;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', function() {

    const backButton = document.querySelector('.back');
    backButton.addEventListener('click', function() {
        window.location.href = 'djwebsite.html';
    });
});
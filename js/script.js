console.log("Welcome to Spotify")

let songIndex= 0;
let audioElement = new Audio('asset/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName: "Sia - Unstoppable", filePath:"asset/1.mp3", coverPath: "img/cover1.jpg"},
    {songName: "Aero Chord - Surface", filePath:"asset/2.mp3", coverPath: "img/cover2.jpg"},
    {songName: "Bad Style-Time Back", filePath:"asset/3.mp3", coverPath: "img/cover3.jpg"},
    {songName: "Crywolf - Angels (T-Mass Remix)", filePath:"asset/4.mp3", coverPath: "img/cover4.jpg"},
    {songName: "I'd Love to Change the World", filePath:"asset/5.mp3", coverPath: "img/cover5.jpg"},
    {songName: "KDrew - Circles (Original Mix)", filePath:"asset/6.mp3", coverPath: "img/cover6.jpg"},
    {songName: "Monster - Creatures Lie Here", filePath:"asset/7.mp3", coverPath: "img/cover7.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//audioElement.play()

//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity= 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity= 0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update SeekBar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value = progress;
})

progressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (progressBar.value * audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
})
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src= `asset/${songIndex+1}.mp3`;
        masterSongName.innerText =songs[songIndex].songName;
        audioElement.currentTime= 0;
        audioElement.play();
        gif.style.opacity= 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6)
    {
        songIndex= 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src= `asset/${songIndex+1}.mp3`;
    masterSongName.innerText =songs[songIndex].songName;
    audioElement.currentTime= 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0)
    {
        songIndex= 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src= `asset/${songIndex+1}.mp3`;
    masterSongName.innerText =songs[songIndex].songName;
    audioElement.currentTime= 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
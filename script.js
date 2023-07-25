
console.log("Welcome to My Music");

let songIndex=0;
let audioElement = new Audio('songs/Duniya - Luka Chuppi_128-(DJMaza).mp3');
let masterPlay=document.getElementById('masterPlay');
let myprogressbar=document.getElementById('myprogressbar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=document.getElementsByClassName('songItem');
let songItemsArray = Array.from(songItems);
const currentTimeDisplay = document.getElementById('currentTimeDisplay');

let songs=[
    {songName:"Duniya song " , filePath:"songs/Duniya - Luka Chuppi_128-(DJMaza).mp3",coverPath:"cover photos/duniya song.jpg"},
    {songName:"Har Har Shambhu " , filePath:"songs/Har Har Shambhu - 64Kbps-(Mr-Jat.in).mp3",coverPath:"cover photos/shambhu.jpg"},
    {songName:"Let me love you " , filePath:"songs/Let me love you Mr Raja Dhillon Justin bieber.mp3",coverPath:"cover photos/love me like you do.jpg"},
    {songName:"Maan Meri Jaan" , filePath:"songs/Maan Meri Jaan(PagalWorld.com.se).mp3",coverPath:"cover photos/maan meri jaan.jpg"},
    {songName:"Moonlight " , filePath:"songs/Moonlight - Harnoor.mp3",coverPath:"cover photos/moonlight.jpg"},
    {songName:"Obsessed " , filePath:"songs/Obsessed - Riar Saab_128-(DJMaza).mp3",coverPath:"cover photos/obsessed.jpg"},
    {songName:"Raatan Lambiyan" , filePath:"songs/Raatan Lambiyan_64(PagalWorld.com.se).mp3",coverPath:"cover photos/raataan lambiyan.webp"},
    {songName:"Tere Vaaste" , filePath:"songs/Tere Vaaste(PagalWorld.com.se).mp3",coverPath:"cover photos/tere vaaste.webp"},
    
]
songItemsArray.forEach((element, i)=>{
    console.log(element,i);
    if (songs[i]){
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("song")[0].innerText=songs[i].songName;}
});
//audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;


    }
})
    audioElement.addEventListener('timeupdate',()=>{
        console.log('timeupdate')
        const Progress=parseInt((audioElement.currentTime/audioElement.duration)*100)
        myprogressbar.value=Progress;
            const currentTime = audioElement.currentTime;
            const minutes = Math.floor(currentTime / 60);
            const seconds = Math.floor(currentTime % 60);
            const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            currentTimeDisplay.textContent = formattedTime;
        });

    myprogressbar.addEventListener('change',()=>{
        const Progress=myprogressbar.value;
        audioElement.currentTime=myprogressbar.value*audioElement.duration/100;
         
    })
    const makeAllPlay=()=>{
        Array.from(document.getElementsByClassName('songlistplay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
    }
    Array.from(document.getElementsByClassName('songlistplay')).forEach((element)=>{
        element.addEventListener('click',(e)=>{
            makeAllPlay();
            songIndex=parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src= songs[songIndex].filePath;
            masterSongName.innerText=songs[songIndex].songName;
            audioElement.currentTime=0;
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        })
    })
    document.getElementById('next').addEventListener('click',()=>{
        if(songIndex>=songs.length-1){
            songIndex=0

        }
        else{
            songIndex +=1;
        }
        playSongAtIndex(songIndex);
    })
    document.getElementById('previous').addEventListener('click',()=>{
        if(songIndex<=0){
            songIndex=0

        }
        else{
            songIndex -=1;
        }
        playSongAtIndex(songIndex);
    })
    audioElement.addEventListener('ended', () => {
        if (songIndex >= songs.length - 1) {
          songIndex = 0;
        } else {
          songIndex += 1;
        }
        playSongAtIndex(songIndex);
      });

    function playSongAtIndex(index) {
        audioElement.src = songs[index].filePath;
        masterSongName.innerText = songs[index].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
      }

      

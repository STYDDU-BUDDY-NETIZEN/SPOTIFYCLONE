console.log('lets write java script');
let currentSong = new Audio();
let currfolder;
// let songs;
function secondsToMinutesSeconds(seconds) {
    if(isNaN (seconds )|| seconds<0){
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const secs =Math.floor (seconds % 60);
    

    

    // Format minutes and seconds to always be two digits
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(secs).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currfolder = folder;
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`)
    let response = await a.text();
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    // console.log(as)
     songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];

        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }

    }
     //load the playlist
     Array.from(document.getElementsByClassName("card")).forEach(e=>{
        // console.log(e)
        e.addEventListener("click", async item=>{
            // console.log(item,item.currentTarget.dataset)
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0])
            
        })
      })
      let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
      songUL.innerHTML = ""
      for (const song of songs) {
          songUL.innerHTML = songUL.innerHTML + `<li> <img class="invert" src="music.svg" alt="">
                              <div class="infoo">
                                 <div>${song.replaceAll("%20", " ")}</div>
                                 <div>kASHAF</div>
                              </div>
                              <div class="playnow">
                                  <span>Play Now</span>
                                  <img class="invert" src="play.svg" alt="">
                              </div>
  </li>`;
  
      }
      // Attach event listener to each song item
      
      //attach an event listener to ach song
      Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach((e) => {
          e.addEventListener("click", () => {
          
  
                  console.log(e.querySelector(".infoo").firstElementChild.innerHTML);
                  playMusic(e.querySelector(".infoo").firstElementChild.innerHTML.trim());
              })
  
  
  
      })


      
    return songs
}
const playMusic = (track ,pause=false) => {
    // let audio = new Audio("/songs/" + track)
    currentSong.src = `/${currfolder}/` + track
    if(!pause){
currentSong.play()
    play.src = "pause.svg"
    }
 
    
   
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
                document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}





async function displayAlbums() {
    console.log("displaying albums")
    let a = await fetch(`/songs/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardContainer")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index]; 
        if (e.href.includes("/songs") && !e.href.includes(".htaccess")) {
            let folder = e.href.split("/").slice(-2)[0]
            // Get the metadata of the folder
        //     let a = await fetch(`/songs/${folder}/info.json`)
        //     let response = await a.json(); 
        //     cardContainer.innerHTML = cardContainer.innerHTML + ` <div data-folder="${folder}" class="card">
        //     <div class="play">
        //         <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        //             xmlns="http://www.w3.org/2000/svg">
        //             <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
        //                 stroke-linejoin="round" />
        //         </svg>
        //     </div>

        //     <img src="/songs/${folder}/cover.jpg" alt="">
        //     <h2>${response.title}</h2>
        //     <p>${response.description}</p>
        // </div>`
        }
    }

    // Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => { 
        e.addEventListener("click", async item => {
            console.log("Fetching Songs")
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)  
            playMusic(songs[0])

        })
    })
}









async function main() {
    // let currentSong;
     await getSongs("songs/ncs")
    playMusic(songs[0],true)
    //  console.log('Songs array:', songs);

    console.log(songs)
   
    //attach an eventlistener to play next and previous
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg"
            
        }
        else {
            currentSong.pause()
            play.src = "play.svg"
        }
    })
    //listen for time upate event
    currentSong.addEventListener("timeupdate" , () =>{
        console.log(currentSong.currentTime , currentSong.duration)
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}:${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration) * 100 +"%";
    })
 // add an event listener to seek bar
    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent = (e.offsetX / e.target , getBoundingClientRect() .width)*100;
        document.querySelector (".circle").style.left = percent +"%";
        currentSong.currentTime = ((currentSong.duration) * percent)/ 100
    })
    //add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "0"
    })
    //add event listener for close button
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "-120%"
    })
    //add an event listener to pre and next
    // previous.addEventListener("click",()=>{
    //     console.log("previous clicked")
    //     console.log(currentSong)
    //     let index =songs.indexOf(currentSong .src .split("/") .slice(-1)[0]
    //     if ((index-1) >= 0){
    //    playMusic(songs[index-1])
    //     }
    // })
    //add an event listener to pre and next
    // next.addEventListener("click",()=>{
    //     console.log("Next clicked")
    //     let index =songs.indexOf(currentSong .src .split("/") .slice(-1)[0]
    //      if((index+1) >= length){
    //     playMusic(songs[index+1])
    //      }
    // })
    //add event listener to pre
    previous.addEventListener("click", () => {
        currentSong.pause()
        console.log("Previous is clicked");
        console.log(currentSong);
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index - 1) >= 0) {
          playMusic(songs[index - 1]);
        }
      });
      //add event listener to next
      next.addEventListener("click", () => {
        currentSong.pause()
        console.log("Next is clicked");
        console.log(currentSong);
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index + 1) < songs.length) {
          playMusic(songs[index + 1]);
        } 
      });
      //add an event to volume
      document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
        console.log(e ,e.target,e.target.value)
        currentSong.volume = parseInt(e.target.value)/100
      })

     

}
main()


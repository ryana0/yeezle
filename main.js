const discography = ["Intro","We Dont Care","Graduation Day","All Falls Down","Ill Fly Away","Spaceship","Jesus Walks","Never Let Me Down","Get Em High","Workout Plan","The New Workout Plan","Slow Jamz","Breathe In Breathe Out","School Spirit Skit 1","School Spirit","School Spirit Skit 2","Lil Jimmy Skit","Two Words","Through The Wire","Family Business","Last Call","Wake Up Mr. West","Heard Em Say","Touch The Sky","Gold Digger","Skit #1","Drive Slow","My Way Home","Crack Music","Roses","Bring Me Down","Addiction","Skit #2","Diamonds From Sierra Leone - Remix","We Major","Skit #3","Hey Mama","Celebration","Skit #4","Gone","Diamonds From Sierra Leone - Bonus Track","Late","Good Morning","Champion","Stronger","I Wonder","Good Life","Cant Tell Me Nothing","Barry Bonds","Drunk and Hot Girls","Flashing Lights","Everything I Am","The Glory","Homecoming","Big Brother","Good Night","Say You Will","Welcome To Heartbreak","Heartless","Amazing","Love Lockdown","Paranoid","RoboCop","Street Lights","Bad News","See You In My Nightmares","Coldest Winter","Pinocchio Story","Dark Fantasy","Gorgeous","POWER","All Of The Lights (Interlude)","All Of The Lights","Monster","So Appalled","Devil In A New Dress","Runaway","Hell Of A Life","Blame Game","Lost In The Word","Who Will Survive In America","No Church In the Wild","Lift Off","Ni**as In Paris","Otis","Gotta Have It","New Day","Thats My Bitch","Welcome To The Jungle","Who Gon Stop Me","Murder To Excellence","Made In America","Why I Love You","On Sight","Black Skinhead","I Am A God","New Slaves","Hold My Liquor","Im In It","Blood On The Leaves","Guilt Trip","Send It Up","Bound 2","Ultralight Beam","Father Stretch My Hands Pt. 1","Pt. 2","Famous","Feedback","Low Lights","Highlights","Freestyle 4","I Love Kanye","Waves","FML","Real Friends","Wolves","Franks Track","Siiiiiiiiilver Surffffeeeeer Intermission","30 Hours","No More Parties In LA","Facts (Charlie Heat Version)","Fade","Saint Pablo","I Thought About Killing You","Yikes","All Mine","Wouldnt Leave","No Mistakes","Ghost Town","Violent Crimes","Feel The Love","Fire","4th Dimension","Freeee (Ghost Town Pt. 2)","Reborn","Kids See Ghosts","Cudi Montage","Every Hour","Selah","Follow God","Closed On Sunday","On God","Everything We Need","Water","God Is","Hands On","Use This Gospel","Jesus Is Lord","Donda Chant","Jail","God Breathed","Off The Grid","Hurricane","Praise God","Jonah","Ok Ok","Junya","Believe What I Say","24","Remote Control","Moon","Heaven and Hell","Donda","Keep My Spirit Alive","Jesus Lord","New Again","Tell The Vision","Lord I Need You","Pure Souls","Come to Life","No Child Left Behind","Jail pt 2","Ok Ok pt 2","Junya pt 2","Jesus Lord pt 2","STARS","KEYS TO MY LIFE","PAID","TALKING","BACK TO ME","HOODRAT","DO IT","PAPERWORK","BURN","FUK SUMN","VULTURES","CARNIVAL","BEG FORGIVENESS","PROBLEMATIC","KING"]

function randomYeSong() {
    for(i = 0; i < 191; i++) {
        return discography[Math.floor(Math.random() * 191)]
    }
}

window.localStorage.setItem('guessCount', 0)

const yeSong = randomYeSong()
if(!JSON.parse(window.localStorage.getItem('guessCount'))) {
    window.localStorage.setItem('guessCount', 0)
}

console.log(yeSong)

function numStringToNum(string) {
    let stringArray = string.toString().split(',')
    stringArray = stringArray.join('')
    return parseInt(stringArray)
}

async function makeRow(trackName, trackNo, streams, features, album) {
    // console.log('guess: trackNo ' + trackNo, 'streams ' + streams)
    const row = document.createElement('div')
    row.classList.add('gameRow')
    const albumCover = document.createElement('img')
    albumCover.classList.add('cover')
    albumCover.style.content = 'url(./assets/' + album + '.jpg)'
    const tName = document.createElement('h1')
    tName.classList.add('songTitle')
    const tNo = document.createElement('h1')
    tNo.classList.add('trackNo')
    const streamNo = document.createElement('h1')
    streamNo.classList.add('trackLength')
    const featureList = document.createElement('h1')
    featureList.classList.add('features')
    tName.textContent = trackName
    tNo.textContent = trackNo.toString()
    streamNo.textContent = Intl.NumberFormat('en', {notation: 'compact'}).format(parseInt(numStringToNum(streams)))
    if (features == '') {
        featureList.textContent = 'N/A'
    } else {
        featureList.textContent = features
    }

    fetch('./assets/kanye.json')
    .then((data) => data.json())
    .then((data) => {
        Object.keys(data).forEach((albumA) => {
            data[albumA].forEach((song) => {
                if(song.trackName == yeSong) { 
                    const albumDir = document.createElement('h1')
                    albumDir.classList.add('arrow')
                    const streamsDir = document.createElement('span')
                    const trackNoDir = document.createElement('span')
                    const albumGuessIndex = Object.keys(data).indexOf(album)
                    const actualIndex = Object.keys(data).indexOf(albumA)
                    if (albumGuessIndex > actualIndex) {
                        albumDir.textContent = ' ↓'
                    } else if (albumGuessIndex < actualIndex) {
                        albumDir.textContent = ' ↑'
                    } else {
                        albumDir.textContent = '='
                        albumDir.style.color = '#3da03d'
                    }

                    if (numStringToNum(streams) > numStringToNum(song.streams)) {
                        streamsDir.textContent = ' ↓'
                    } else if (numStringToNum(streams) < numStringToNum(song.streams)) {
                        streamsDir.textContent = ' ↑'
                    } else {
                        streamsDir.textContent = '='
                        streamsDir.style.color = '#3da03d'
                    }

                    if (numStringToNum(trackNo) > numStringToNum(song.trackNo)) {
                        trackNoDir.textContent = ' ↓'
                    } else if (numStringToNum(trackNo) < numStringToNum(song.trackNo)) {
                        trackNoDir.textContent = ' ↑'
                    } else {
                        trackNoDir.textContent = '='
                        trackNoDir.style.color = '#3da03d'
                    }

                    tNo.appendChild(trackNoDir)
                    streamNo.appendChild(streamsDir)
                    row.appendChild(albumDir)
                }
            })
        })
    })

    row.appendChild(albumCover)
    row.appendChild(tName)
    row.appendChild(tNo)
    row.appendChild(streamNo)
    row.appendChild(featureList)

    document.getElementById('game').appendChild(row)
    songGuess.value = ''
}



function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = arr[i].substr(0, val.length);
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) { //up
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

autocomplete(document.getElementById('songGuess'), discography)

const results = document.getElementById('resultsworl')
const yeTitle = document.getElementById('yeTitle')
const yeCover = document.getElementById('yeCover')
const numPlayed = document.getElementById('numPlayed')
const winPercent = document.getElementById('winPercent')

function gameEnd(win) {

    document.getElementById('gameEnd').style.display = 'grid'

    if(!JSON.parse(window.localStorage.getItem('gamesPlayed'))) {
        window.localStorage.setItem('gamesPlayed', JSON.stringify('1'))
    } else {
        window.localStorage.setItem('gamesPlayed', JSON.stringify(Number.parseInt(JSON.parse(window.localStorage.getItem('gamesPlayed'))) + 1))
    }

    if(!JSON.parse(window.localStorage.getItem('wins'))) {
        if (win) {
            window.localStorage.setItem('wins', JSON.stringify('1'))
        }
    } else if (JSON.parse(window.localStorage.getItem('wins')) && win) {
        window.localStorage.setItem('wins', JSON.stringify(Number.parseInt(JSON.parse(window.localStorage.getItem('wins'))) + 1))
    }

    if(!JSON.parse(window.localStorage.getItem('losses'))) {
        if(!win) {
            window.localStorage.setItem('losses', JSON.stringify('1'))
        }
    } else if (JSON.parse(window.localStorage.getItem('wins')) && !win) {
        window.localStorage.setItem('losses', JSON.stringify(Number.parseInt(JSON.parse(window.localStorage.getItem('losses'))) + 1))
    }

    numPlayed.textContent = JSON.parse(window.localStorage.getItem('gamesPlayed'))
    winPercent.textContent = (Number.parseInt(JSON.parse(window.localStorage.getItem('wins'))) / Number.parseInt(JSON.parse(window.localStorage.getItem('gamesPlayed')))).toFixed(1) * 100 + '%'

    if (win) {
        results.textContent = 'YOU WON!'
        results.style.color = '#3da03d'
    } else {
        results.textContent = 'YOU LOST!'
        results.style.color = '#fa5858'
    }

    yeTitle.textContent = yeSong


    fetch('./assets/kanye.json')
    .then((data) => data.json())
    .then((data) => {
        Object.keys(data).forEach((albumA) => {
            data[albumA].forEach((song) => {
                if(song.trackName == yeSong) {
                    yeCover.style.content = 'url(./assets/' + albumA + '.jpg)'
                }
            })
        })
    })
}

const playAgain = document.getElementById('playAgain')
playAgain.addEventListener('click', () => {
    window.location.reload()
})

const submit = document.getElementById('submit')
submit.addEventListener('click', () => {
    fetch('./assets/kanye.json')
    .then((data) => data.json())
    .then((data) => {
        Object.keys(data).forEach((album) => {
            data[album].forEach((song) => {
                if(song.trackName.toLowerCase() == songGuess.value.toLowerCase()) {
                    makeRow(song[Object.keys(song)[0]], song[Object.keys(song)[1]], song[Object.keys(song)[2]], song[Object.keys(song)[3]], album)
                }
            })
        })
    })
    if(JSON.parse(window.localStorage.getItem('guessCount')) == 7) {
        gameEnd(false)
        console.log('hello')
    } else {
        window.localStorage.setItem('guessCount', JSON.parse(window.localStorage.getItem('guessCount')) + 1)

    }

    if(songGuess.value == yeSong) {
        gameEnd(true)
    }

})

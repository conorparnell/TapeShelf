let tapes = [];
let tapeNumber = 0;
let idString;


document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

function processFile() {
    const deleteMe = document.querySelectorAll(".cassette");
    deleteMe.forEach((item) => { item.delete(); });

    var file = document.querySelector('#collectionFile').files[0];
    var reader = new FileReader();
    reader.readAsText(file);

    //When the file finish load
    reader.onload = function (event) {

        //get the file.
        const csv = event.target.result;

        //split and get the rows in an array
        let rows = csv.split('\n');

        //move line by line
        for (let i = 1; (i + 1) < rows.length; i++) {
            //split by separator (,) and get the columns
            cols = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            //cols = rows[i].split(/(?=([^"]|"[^"]*")*$)/)
            //0 - catalogue number
            //1 - artist
            //2 - album
            //3 - record label
            //4 - medium
            //5 - nothing??
            //6 - year
            //7-10 bunk

            testCass(cols[4]);

            let artist = cols[1];
            let album = cols[2];
            let year = cols[6];

            //remove quotes from artist
            if (artist.charAt(0) === '"' && artist.charAt(artist.length - 1) === '"') {
                artist = artist.substr(1, artist.length - 2);
            }
            //remove discogs number from artist
            if (artist.charAt(artist.length - 3) === '(' && artist.charAt(artist.length - 1) === ')') {
                artist = artist.substr(0, artist.length - 4);
            } else if (artist.charAt(artist.length - 4) === '(' && artist.charAt(artist.length - 1) === ')') {
                artist = artist.substr(0, artist.length - 5);
            }

            //abbridge longer artist names
            if (artist.length > 30) {
                artist = artist.substring(0, 30) + "...";
            }

            //remove quotes from album
            if (album.charAt(0) === '"' && album.charAt(album.length - 1) === '"') {
                album = album.substr(1, album.length - 2);
            }
            //abbridge longer album titles
            if (album.length > 55) {
                album = album.substring(0, 55) + "...";
            }

            if (year == 0) {
                year = "unknown";
            }

            if (tapeNumber == 1) {
                let newTape = {
                    artist: artist,
                    title: album,
                    year: year
                };
                tapes.push(newTape);
            } else {
                for (j = 0; j < tapeNumber; j++) {
                    let albumNext = `${album} [Tape ${(j + 1)}]`;
                    console.log(albumNext);
                    let newTape = {
                        artist: artist,
                        title: albumNext,
                        year: year
                    };

                    tapes.push(newTape);
                }
            }
        }
        paste();
        setTimeout(startDraggable, 10);
    }
}


function paste() {
    //alphabetical and chronological order
    tapes.sort(function (a, b) {
        let artistA = a.artist;
        let artistB = b.artist;
    
        if (artistA.startsWith("The ")) {
          artistA = artistA.slice(4);
        }
    
        if (artistB.startsWith("The ")) {
          artistB = artistB.slice(4);
        }
    
        return artistA.localeCompare(artistB) || a.year - b.year;
      });


    const div = document.getElementById("paste");

    for (let i = 0; i < tapes.length; i++) {
        const tape = document.createElement("div");
        tape.classList.add("cassette");
        tape.setAttribute("id", `tape${i + 1}`);
        tape.addEventListener('click', (e) => {
            console.log(e.target.id);
            idString = e.target.id;
        });
        tape.setAttribute("draggable", "true");

        const tapeText = document.createElement("p");
        tapeText.innerHTML = `<strong>${tapes[i].artist}</strong><br><em>${tapes[i].title}</em><br>(${tapes[i].year})`;
        tape.appendChild(tapeText);
        div.appendChild(tape);
    
    }

    const cass = document.querySelectorAll(".cassette");
    cass.forEach( item => {
        console.log(item.innerText);
        item.addEventListener('contextmenu', (e) => {
            colorRefresh(e.target.id);
            console.log('right clicked');
            console.log(e.target.id);
            colorPicker(e.target.id);
          });
    });


}





function testCass(str) {
    //clear quotes
    if (str.charAt(0) === '"' && str.charAt(str.length - 1) === '"') {
        str = str.substr(1, str.length - 2);
    }

    str = str.replaceAll(", ", "|");
    str = str.replaceAll(" ", "|");
    let strArr = str.split("|");
    let cassNumber = "";
    let cassFormat = false;

    for (i = 0; i < strArr.length; i++) {
        let start = strArr[i].length - 4;
        if (strArr[i].substring(start) == "Cass") {
            console.log(strArr[i]);
            cassNumber = strArr[i];
            cassFormat = true;
        }
    }

    if (cassNumber.length > 4) {
        console.log(cassNumber[0]);
        tapeNumber = cassNumber[0];
    } else {
        tapeNumber = 1;
    }

    if (cassFormat == false) {
        tapeNumber = 0;
    }

}




function startDraggable() {

    function handleDragStart(e) {
        this.style.opacity = '0.4';
        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
        e.dataTransfer.setData('text/plain', this.className);
        
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';

        items.forEach(function (item) {
            item.classList.remove('over');
        });
    }

    function handleDragOver(e) {
        e.preventDefault();
        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');
    }

    function handleDrop(e) {
        e.stopPropagation(); // stops the browser from redirecting.
        if (dragSrcEl !== this) {
            dragSrcEl.innerHTML = this.innerHTML;
            dragSrcEl.className = this.className;
            this.innerHTML = e.dataTransfer.getData("text/html");
            this.className = e.dataTransfer.getData("text/plain");
        }
        return false;
    }

    let items = document.querySelectorAll('.container .cassette');
    items.forEach(function (item) {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('dragenter', handleDragEnter);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('drop', handleDrop);
    });
}

function clickTest(id) {
    const selectedBox = document.getElementById(id);
    console.log(`You clicked ${selectedBox.innerText} ${id}`);


    const promptBox = document.createElement("div");
    promptBox.setAttribute("id", "prompt-box");

    const userInput = document.createElement("input");
    userInput.setAttribute("type", "text");
    userInput.setAttribute("id", "user-input");

    const genreButton = document.createElement("button");
    genreButton.onclick = ( () => {
        console.log(document.getElementById('user-input').value);
        let genreText = document.getElementById('user-input').value;
        console.log(genreText);

        selectedBox.classList.add(genreText);
        
        promptBox.remove();

    })
    genreButton.innerText = "Add Genre";

    promptBox.appendChild(userInput);
    promptBox.appendChild(genreButton);

    const topbar = document.getElementById("top");
    topbar.appendChild(promptBox);

}




//COLOR PICKER
//TO BE APPENDED TO #top

function colorPicker(id){
    blockScreen();
    const selectedBox = document.getElementById(id);
    console.log(`You clicked ${selectedBox.innerText} ${id}`);

    const pickerBox = document.createElement("div");
    pickerBox.setAttribute("id", "colorpicker");

    //text
    const textBox = document.createElement("div");
    textBox.setAttribute("id", "colorbox");
    const boxText = document.createElement("p");
    boxText.classList.add("color-text");
    boxText.innerText = `Choose a color for ${changeString(selectedBox.innerHTML)}:`;
    console.log(`${selectedBox.innerHTML}`);
    textBox.appendChild(boxText);
    pickerBox.appendChild(textBox);

    //red
    const redBox = document.createElement("div");
    redBox.classList.add("red");
    redBox.classList.add("box");
    redBox.onclick = ( () => {
        console.log("red");
        let genreText = "red";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(redBox);

    //orange
    const orangeBox = document.createElement("div");
    orangeBox.classList.add("orange");
    orangeBox.classList.add("box");
    orangeBox.onclick = ( () => {
        console.log("orange");
        let genreText = "orange";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(orangeBox);

    //mustard
    const mustardBox = document.createElement("div");
    mustardBox.classList.add("mustard");
    mustardBox.classList.add("box");
    mustardBox.onclick = ( () => {
        console.log("mustard");
        let genreText = "mustard";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(mustardBox);

    //yellow
    const yellowBox = document.createElement("div");
    yellowBox.classList.add("yellow");
    yellowBox.classList.add("box");
    yellowBox.onclick = ( () => {
        console.log("yellow");
        let genreText = "yellow";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(yellowBox);

    //green
    const greenBox = document.createElement("div");
    greenBox.classList.add("green");
    greenBox.classList.add("box");
    greenBox.onclick = ( () => {
        console.log("green");
        let genreText = "green";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(greenBox);

    //foam
    const foamBox = document.createElement("div");
    foamBox.classList.add("foam");
    foamBox.classList.add("box");
    foamBox.onclick = ( () => {
        console.log("foam");
        let genreText = "foam";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(foamBox);

    //moss
    const mossBox = document.createElement("div");
    mossBox.classList.add("moss");
    mossBox.classList.add("box");
    mossBox.onclick = ( () => {
        console.log("moss");
        let genreText = "moss";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(mossBox);

    //pine
    const pineBox = document.createElement("div");
    pineBox.classList.add("pine");
    pineBox.classList.add("box");
    pineBox.onclick = ( () => {
        console.log("pine");
        let genreText = "pine";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(pineBox);

    //teal
    const tealBox = document.createElement("div");
    tealBox.classList.add("teal");
    tealBox.classList.add("box");
    tealBox.onclick = ( () => {
        console.log("teal");
        let genreText = "teal";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(tealBox);

    //aqua
    const aquaBox = document.createElement("div");
    aquaBox.classList.add("aqua");
    aquaBox.classList.add("box");
    aquaBox.onclick = ( () => {
        console.log("aqua");
        let genreText = "aqua";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(aquaBox);

    //sky
    const skyBox = document.createElement("div");
    skyBox.classList.add("sky");
    skyBox.classList.add("box");
    skyBox.onclick = ( () => {
        console.log("sky");
        let genreText = "sky";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(skyBox);

    //cerulean
    const ceruleanBox = document.createElement("div");
    ceruleanBox.classList.add("cerulean");
    ceruleanBox.classList.add("box");
    ceruleanBox.onclick = ( () => {
        console.log("cerulean");
        let genreText = "cerulean";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(ceruleanBox);

    //navy
    const navyBox = document.createElement("div");
    navyBox.classList.add("navy");
    navyBox.classList.add("box");
    navyBox.onclick = ( () => {
        console.log("navy");
        let genreText = "navy";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(navyBox);

    //periwinkle
    const periBox = document.createElement("div");
    periBox.classList.add("periwinkle");
    periBox.classList.add("box");
    periBox.onclick = ( () => {
        console.log("periwinkle");
        let genreText = "periwinkle";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(periBox);

    //plum
    const plumBox = document.createElement("div");
    plumBox.classList.add("plum");
    plumBox.classList.add("box");
    plumBox.onclick = ( () => {
        console.log("plum");
        let genreText = "plum";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(plumBox);

    //purple
    const purpleBox = document.createElement("div");
    purpleBox.classList.add("purple");
    purpleBox.classList.add("box");
    purpleBox.onclick = ( () => {
        console.log("purple");
        let genreText = "purple";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(purpleBox);

    //pink
    const pinkBox = document.createElement("div");
    pinkBox.classList.add("pink");
    pinkBox.classList.add("box");
    pinkBox.onclick = ( () => {
        console.log("pink");
        let genreText = "pink";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(pinkBox);

    //peach
    const peachBox = document.createElement("div");
    peachBox.classList.add("peach");
    peachBox.classList.add("box");
    peachBox.onclick = ( () => {
        console.log("peach");
        let genreText = "peach";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(peachBox);

    //tan
    const tanBox = document.createElement("div");
    tanBox.classList.add("tan");
    tanBox.classList.add("box");
    tanBox.onclick = ( () => {
        console.log("tan");
        let genreText = "tan";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(tanBox);

    //brown
    const brownBox = document.createElement("div");
    brownBox.classList.add("brown");
    brownBox.classList.add("box");
    brownBox.onclick = ( () => {
        console.log("brown");
        let genreText = "brown";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(brownBox);

    //black
    const blackBox = document.createElement("div");
    blackBox.classList.add("black");
    blackBox.classList.add("box");
    blackBox.onclick = ( () => {
        console.log("black");
        let genreText = "black";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(blackBox);

    //dusk
    const duskBox = document.createElement("div");
    duskBox.classList.add("dusk");
    duskBox.classList.add("box");
    duskBox.onclick = ( () => {
        console.log("dusk");
        let genreText = "dusk";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(duskBox);

    //grey
    const greyBox = document.createElement("div");
    greyBox.classList.add("grey");
    greyBox.classList.add("box");
    greyBox.onclick = ( () => {
        console.log("grey");
        let genreText = "grey";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(greyBox);

    //dawn
    const dawnBox = document.createElement("div");
    dawnBox.classList.add("dawn");
    dawnBox.classList.add("box");
    dawnBox.onclick = ( () => {
        console.log("dawn");
        let genreText = "dawn";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(dawnBox);

    //white
    const whiteBox = document.createElement("div");
    whiteBox.classList.add("white");
    whiteBox.classList.add("box");
    whiteBox.onclick = ( () => {
        console.log("white");
        let genreText = "white";
        console.log(genreText);
        selectedBox.classList.add(genreText);
        pickerBox.remove();
        unblockScreen();
    });
    pickerBox.appendChild(whiteBox);



    const top = document.getElementById("top");
    top.appendChild(pickerBox);
}

const colorArray = ["red", "orange", "mustard", "yellow", "green", "foam", "moss", "pine", "teal", "aqua", "sky", "cerulean", "navy", "periwinkle", "plum", "purple", "pink", "peach", "tan", "brown", "black", "dusk", "grey", "dawn", "white"];
/*
<div id="colorpicker">
  <div class="red box"></div>
  <div class="orange box"></div>
  <div class="mustard box"></div>
  <div class="yellow box"></div>
  <div class="green box"></div>
  <div class="foam box"></div>
  <div class="moss box"></div>
  <div class="pine box"></div>
  <div class="teal box"></div>
  <div class="aqua box"></div>
  <div class="sky box"></div>
  <div class="cerulean box"></div>
  <div class="navy box"></div>
  <div class="periwinkle box"></div>
  <div class="plum box"></div>
  <div class="purple box"></div>
  <div class="pink box"></div>
  <div class="peach box"></div>
  <div class="tan box"></div>
  <div class="brown box"></div>
  <div class="black box"></div>
  <div class="dusk box"></div>
  <div class="grey box"></div>
  <div class="dawn box"></div>
  <div class="white box"></div>
  */

  function colorRefresh(id){
      const refreshBox = document.getElementById(id);
      refreshBox.classList.remove(...colorArray);
  }

  function blockScreen(){
      const paste =document.getElementById("paste");
      paste.classList.add("block");
  }

  function unblockScreen(){
    const paste = document.getElementById("paste");
    paste.classList.remove("block");
  }



function changeString(inputString){
  let el = document.createElement('div');
  el.innerHTML = inputString;
  
  let strong = el.getElementsByTagName('strong')[0].textContent;
  let em = el.getElementsByTagName('em')[0].textContent;
  
  return em + " by " + strong;
}



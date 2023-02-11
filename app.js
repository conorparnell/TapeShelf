let tapes = [];
let tapeNumber = 0;
let idString;


document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

document.getElementById("export").disabled = 'true';


function processFile() {
    const deleteMe = document.querySelectorAll(".cassette");
    deleteMe.forEach((item) => { item.delete(); }); //doesn't work lol but it stops from reprocessing for now

    let file = document.querySelector('#collectionFile').files[0];
    let reader = new FileReader();
    reader.readAsText(file);

    //When the file finish load
    reader.onload = function (event) {

        //get the file.
        const csv = event.target.result;

        //split and get the rows in an array
        let rows = csv.split('\n');

        let processed = false;

        //move line by line
        for (let i = 1; (i + 1) < rows.length; i++) {
            //split by separator (,) and get the columns
            cols = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            //0 - catalogue number
            //1 - artist
            //2 - album
            //3 - record label
            //4 - medium
            //5 - nothing??
            //6 - year
            //7-10 bunk

            determineNumberOfCassettes(cols[4]);

            let artist = cols[1];
            let album = cols[2];
            let year = cols[6];
            let color = "unassigned";
            if (cols.length > 11) {
                color = cols[11];
                processed = true;
            }



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

            //abridge longer artist names
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
                    year: year,
                    color: color
                };
                tapes.push(newTape);
            } else {
                for (j = 0; j < tapeNumber; j++) {
                    let albumNext = `${album} [Tape ${(j + 1)}]`;
                    let newTape = {
                        artist: artist,
                        title: albumNext,
                        year: year,
                        color: color
                    };
                    tapes.push(newTape);
                }
            }
        }
        paste(processed);
        setTimeout(startDraggable, 10);
        setTimeout(disableButton, 10);
        document.getElementById("export").disabled = false;
    }



    function disableButton() {
        document.getElementById("process").disabled = 'true';
    }
}

function enableExport() {
    document.getElementById("export").disabled = false;
}

function paste(processed) {
    if (processed == false) {
        //alphabetical and chronological order
        tapes.sort(function (a, b) {
            let artistA = a.artist;
            let artistB = b.artist;

            //remove the "the"
            if (artistA.startsWith("The ")) {
                artistA = artistA.slice(4);
            }

            if (artistB.startsWith("The ")) {
                artistB = artistB.slice(4);
            }

            return artistA.localeCompare(artistB) || a.year - b.year;
        });
    }


    const div = document.getElementById("paste");

    for (let i = 0; i < tapes.length; i++) {
        const tape = document.createElement("div");
        tape.classList.add("cassette");
        tape.classList.add(tapes[i].color);
        tape.setAttribute("id", `tape${i + 1}`);
        tape.setAttribute("draggable", "true");

        const tapeText = document.createElement("p");
        tapeText.innerHTML = `<strong>${tapes[i].artist}</strong><br><em>${tapes[i].title}</em><br>(<span>${tapes[i].year}</span>)`;
        tape.appendChild(tapeText);
        div.appendChild(tape);

    }

    const cass = document.querySelectorAll(".cassette");
    cass.forEach(item => {
        item.addEventListener('contextmenu', (e) => {
            colorRefresh(e.target.id);
            colorPicker(e.target.id);
        });
    });
}

function determineNumberOfCassettes(str) {
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
            cassNumber = strArr[i];
            cassFormat = true;
        }
    }

    if (cassNumber.length > 4) {
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

//COLOR PICKER
//TO BE APPENDED TO #top

function colorPicker(id) {
    blockScreen();
    const selectedBox = document.getElementById(id);

    const pickerBox = document.createElement("div");
    pickerBox.setAttribute("id", "colorpicker");

    //text
    const textBox = document.createElement("div");
    textBox.setAttribute("id", "colorbox");
    const boxText = document.createElement("p");
    boxText.classList.add("color-text");
    boxText.innerText = `Choose a color for ${changeString(selectedBox.innerHTML)}:`;
    textBox.appendChild(boxText);
    pickerBox.appendChild(textBox);

    for (const color of colorArray) {
        const colorBox = document.createElement("div");
        colorBox.classList.add(color);
        colorBox.classList.add("box");
        colorBox.onclick = (() => {
            selectedBox.classList.add(color);
            pickerBox.remove();
            unblockScreen();
        });
        pickerBox.appendChild(colorBox);
    }


    const top = document.getElementById("top");
    top.appendChild(pickerBox);
}

const colorArray = ["red", "orange", "mustard", "yellow", "green", "foam", "moss", "pine", "teal", "aqua", "sky", "cerulean", "navy", "periwinkle", "plum", "purple", "pink", "peach", "tan", "brown", "black", "dusk", "grey", "dawn", "white"];

function colorRefresh(id) {
    let allColors = colorArray.concat(["unassigned"]);
    const refreshBox = document.getElementById(id);
    refreshBox.classList.remove(...allColors);
}

function blockScreen() {
    const paste = document.getElementById("paste");
    paste.classList.add("block");
}

function unblockScreen() {
    const paste = document.getElementById("paste");
    paste.classList.remove("block");
}



function changeString(inputString) {
    let el = document.createElement('div');
    el.innerHTML = inputString;

    let strong = el.getElementsByTagName('strong')[0].textContent;
    let em = el.getElementsByTagName('em')[0].textContent;

    return em + " by " + strong;
}


function exportData() {
    const allTapes = document.querySelectorAll(".cassette");

    let exportData = [];


    allTapes.forEach((item) => {
        let order = item.id.substring(4);
        let artist = item.getElementsByTagName('strong')[0].textContent;
        let album = item.getElementsByTagName('em')[0].textContent;
        let year = item.getElementsByTagName('span')[0].textContent;
        let color = item.classList[1];
        console.log(`${order}: ${artist} - ${album} (${year}) [${color}]`);
        let tapeArray = [order, `"${artist}"`, `"${album}"`, 'x', '"Cass"', 'x', year, 'x', 'x', 'x', 'x', color];
        exportData.push(tapeArray);
    });


    //define the heading for each row of the data  
    let csv = "CatalogNum,Artist,Title,Label,Format,Rating,Released,release_id,CollectionFolder,Date Added,Collection Notes,Color\n";

    //merge the data with CSV  
    exportData.forEach(function (row) {
        csv += row.join(',');
        csv += "\n";
    });

    //make a hidden link for the download
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';

    //timestamp for file
    let timestamp = new Date();


    hiddenElement.download = 'TapeShelf_Collection' + getTimestamp() + '.csv';
    hiddenElement.click();
    document.getElementById("export").disabled = 'true';
    setTimeout(enableExport, 5000);
}

function getTimestamp() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = mm + '_' + dd + '_' + yyyy;
    return today;
}
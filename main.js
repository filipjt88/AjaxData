let navLink        = document.querySelectorAll(".navLink");
let contentDisplay = document.querySelector(".contentDisplay");
let loader         = document.querySelector(".loader");
let navHeading     = document.querySelector("h1");

navLink.forEach(link => {
    // Prolaz kroz sve linkove na klik i pravljenje funkcije getData
    link.addEventListener("click",getData);
});

function getData(e) {
    e.preventDefault(); // stopiranje linka
    showLoader(); // prikaz loadera
    let xml = new XMLHttpRequest();
    let url = this.getAttribute("href"); // atribut url adrese na koje je kliknuto
    xml.open("GET",url); // priprema fajlova
    xml.onreadystatechange = () => {
        if(xml.readyState === 4 && xml.status === 200) { // provera statusa i da li imas gresaka
            displayData(JSON.parse(xml.responseText), this.innerHTML);
        }
    }
    xml.send(); // slanje fajlova
}

function displayData(data,naslov) { // data- podaci, naslov - na koji je kliknut
    hideLoader(); // skrivanje loadera
    let first = data[0];
    navHeading.innerHTML = naslov;
    let txt = "<table class='table table-bordered table-striped'>";
        txt += "<thead class='bg-primary text-white'>";
        txt += "<tr>";
        for(key in first) {
            txt += `<th>${key}</th>`;
        }
        txt += "</tr>";
        txt += "</thead>";
        txt += "<tbody>";
        txt += "<tr>";
        data.forEach(el => {
            for(key in el) {
                txt += `<td>${el[key]}</td>`;
            }
            txt += "</tr>";
        });
        txt += "</tbody>";
        txt += "</table>";
        contentDisplay.innerHTML = txt;
}


function showLoader() {
    loader.style.display         = "block";
    contentDisplay.style.display = "none";
    navHeading.style.display     = "none";
}

function hideLoader() {
    loader.style.display         = "none";
    contentDisplay.style.display = "block";
    navHeading.style.display     = "block";
}
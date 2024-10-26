/**
 * author Mohammad Haj
 * created on 26-10-2024-18h-18m
 * github: https://github.com/MohammadHHaj
 * copyright 2024
*/

// Laver kaffe-teobjekt
function Produkter(category, name, price, description, inStock, rating, image) {
    // Initialisering af egenskaber for produktet
    this.category = category;  // Kategori af produktet
    this.name = name;          // Navn på produktet
    this.price = price;        // Pris på produktet
    this.description = description; // Beskrivelse af produktet
    this.inStock = inStock;    // Lagerstatus (er produktet på lager?)
    this.rating = rating;      // Vurdering af produktet
}

// Funktion til at hente stjerner til vurderingen
function getRatingStars(rating) {
    // Tjekker om vurderingen er 5 og giver en skjult besked i konsollen
    if (rating === 5) {
        console.log("🌟 Shoutout til den skarpe koder! Du har fundet en skjult besked! 🌟");
    }
    // Returnerer en streng af stjerner baseret på vurderingen
    return "★".repeat(rating) + "☆".repeat(5 - rating); // 5 stjerner i alt
}

// Funktion til at tilføje produkter til tabellen
function addProdukterToTable(produkter) {
    const tableBody = document.getElementById("productTableBody"); // Hent tabelkroppen
    console.log("Hentet tabelbody", tableBody); // Tjekker om tabelkroppen er hentet

    const newRow = tableBody.insertRow(); // Indsætter en ny række i tabellen
    console.log("tilføjet række", newRow); // Tjekker om rækken er tilføjet

    // Tilføjer celler til den nye række med produktinformation
    const categoryCell = newRow.insertCell(0); // Celle til kategori
    categoryCell.textContent = produkter.category; // Indsæt kategori i cellen

    const nameCell = newRow.insertCell(1); // Celle til navn
    nameCell.textContent = produkter.name; // Indsæt navn i cellen

    const priceCell = newRow.insertCell(2); // Celle til pris
    priceCell.textContent = (`${produkter.price} kr.`); // Indsæt pris i cellen

    const descriptionCell = newRow.insertCell(3); // Celle til beskrivelse
    descriptionCell.textContent = produkter.description; // Indsæt beskrivelse i cellen

    const inStockCell = newRow.insertCell(4); // Celle til lagerstatus
    inStockCell.textContent = produkter.inStock ? "På lager" : "Ikke på lager"; // Tjek lagerstatus
    inStockCell.classList.add(produkter.inStock ? "in-stock" : "out-of-stock"); // Tilføj klasse til styling

    // Ændrer farven på lagerstatus
    if (produkter.inStock) {
        inStockCell.style.color = "green"; // Grøn for på lager
    } else {
        inStockCell.style.color = "red"; // Rød for ikke på lager
    }

    const ratingCell = newRow.insertCell(5); // Celle til vurdering
    ratingCell.textContent = getRatingStars(produkter.rating); // Indsæt vurderingsstjerner
    ratingCell.classList.add("rating"); // Tilføj klasse til vurderingscellen
}

// Funktion til at sortere produkter
function sortProducts(products, isAscending) {
    // Sorterer produkterne baseret på pris
    return products.sort((a, b) => {
        return isAscending ? a.price - b.price : b.price - a.price; // Sorter stigende eller faldende
    });
}

// Hentning af produktdata fra JSON
fetchContent("products-data.json").then(function(data) {
    const produkterne = data.products; // Hent produkter fra data
    const productList = []; // Opret en liste til at gemme produkter

    // Gennemgår hvert produkt og tilføjer det til listen og tabellen
    for (let i = 0; i < produkterne.length; i++) {
        const produkter = new Produkter(
            produkterne[i].category,
            produkterne[i].name,
            produkterne[i].price,
            produkterne[i].description,
            produkterne[i].inStock,
            produkterne[i].rating,
            produkterne[i].image
        );
        productList.push(produkter); // Tilføj produkt til listen
        addProdukterToTable(produkter); // Tilføj produkt til tabellen
    }

    // Event listeners for sorteringsknapper
    document.getElementById("sortPriceLow").addEventListener("click", function() {
        const sortedProducts = sortProducts(productList, true); // Sorter stigende
        updateProductTable(sortedProducts); // Opdater tabel med sorterede produkter
    });

    document.getElementById("sortPriceHigh").addEventListener("click", function() {
        const sortedProducts = sortProducts(productList, false); // Sorter faldende
        updateProductTable(sortedProducts); // Opdater tabel med sorterede produkter
    });
})
.catch(function(error) {
    console.error("Der opstod en fejl ved hentning af data:", error); // Log fejl ved hentning af data
});

// Funktion til at opdatere produktbordet
function updateProductTable(products) {
    const tableBody = document.getElementById("productTableBody"); // Hent tabelkroppen
    tableBody.innerHTML = ""; // Tøm bordet før opdatering

    // Tilføj hvert produkt til tabellen
    products.forEach(product => {
        addProdukterToTable(product); // Tilføj produkt til tabellen
    });
}

// Funktion til at filtrere produkter baseret på søgeord
function filterProducts() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase(); // Hent søgeordet
    const tableBody = document.getElementById("productTableBody"); // Hent tabelkroppen
    const rows = tableBody.getElementsByTagName("tr"); // Hent alle rækker i tabellen

    // Gennemgå hver række og skjul dem, der ikke matcher søgeordet
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td"); // Hent celler i rækken
        let rowVisible = false; // Start med at antage, at rækken ikke er synlig

        // Gennemgå hver celle for at se, om den indeholder søgeordet
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().includes(searchInput)) {
                rowVisible = true; // Sæt rækken til at være synlig, hvis et match findes
                break; // Stop med at lede, da vi har fundet et match
            }
        }

        // Skjul eller vis rækken baseret på om et match blev fundet
        rows[i].style.display = rowVisible ? "" : "none"; // Vis eller skjul rækken
    }
}

// Event listener til søgefeltet, der kalder filter-funktionen, når der skrives
document.getElementById("searchInput").addEventListener("input", filterProducts);

// Funktion til at hente indhold fra en URL
async function fetchContent(url) {
    const response = await fetch(url); // Hent data fra URL
    const json = await response.json(); // Konverter svaret til JSON
    return json; // Returner JSON-data
}

// Hent produktdata og tilføj til tabellen
fetchContent("products-data.json").then(function(data) {
    const produkterne = data.products; // Hent produkter fra data
    for (let i = 0; i < produkterne.length; i++) {
        const produkter = new Produkter(
            produkterne[i].category,
            produkterne[i].name,
            produkterne[i].price,
            produkterne[i].description,
            produkterne[i].inStock,
            produkterne[i].rating,
            produkterne[i].image
        );
        addProdukterToTable(produkter); // Tilføj produkt til tabellen
    }
})
.catch(function(error) {
    console.error("Der opstod en fejl ved hentning af data:", error); // Log fejl ved hentning af data
});
document.querySelector('button').addEventListener('click', function() {
    const box = document.querySelector('.box');
    box.classList.toggle('active');
});

//  __  __       _                                         _   _    _       _ 
// |  \/  |     | |                                       | | | |  | |     (_)
// | \  / | ___ | |__   __ _ _ __ ___  _ __ ___   __ _  __| | | |__| | __ _ _ 
// | |\/| |/ _ \| '_ \ / _` | '_ ` _ \| '_ ` _ \ / _` |/ _` | |  __  |/ _` | |
// | |  | | (_) | | | | (_| | | | | | | | | | | | (_| | (_| | | |  | | (_| | |
// |_|  |_|\___/|_| |_|\__,_|_| |_| |_|_| |_| |_|\__,_|\__,_| |_|  |_|\__,_| |
//                                                                        _/ |
//                                                                       |__/ 
//
//
// Made by Mohammad H. 
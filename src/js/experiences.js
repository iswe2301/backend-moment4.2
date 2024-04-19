"use strict";

// Importerar moduler
import { deleteExperience } from './delete.js';
import { fillEditForm } from './edit.js';

export const url = "https://backend-moment3.onrender.com/api/workexperience"; // Lagrar url för API, lägger till export

// Asynkron funktion för att hämta data (exporteras som modul)
export async function fetchExperiences() {
    try {
        const response = await fetch(url); // Inväntar fetchanrop
        const data = await response.json(); // Inväntar svar och omvandlar till json
        // Kontrollerar om resultatet innehåller några erfarenheter
        if (data.length > 0) {
            displayExperiences(data); // Anropar funktion för att visa erfarenheter med svaret från anropet
        }
    } catch (error) {
        console.error('Felmeddelande:', error); // Fångar upp ev. felmeddelanen
    }
}


// Funktion för att visa befintliga jobberfarenheter
function displayExperiences(experiences) {

    // Hämtar container för jobberfarenheter och lagrar i variabel
    const workContainer = document.getElementById("work-container");

    // Sorterar erfarenheterna baserat på startdatum med den senast påbörjade erfarenheten först
    experiences.sort((a, b) => {
        if (a.startDate < b.startDate) {
            return 1; // Om a är mindre (tidigare datum) än b, sortera a efter b
        } else if (a.startDate > b.startDate) {
            return -1; // Om a är större (senare datum) än b, sortera a före b
        } else {
            return 0; // Om a och b är samma, behåll den nuvarande ordningen
        }
    });

    // Kontrollerar om containern existerar på sidan
    if (workContainer) {
        workContainer.innerHTML = "<h2>Mina jobberfarenheter</h2>"; // Tömmer tidigare innehåll och visar endast rubriken
        // Loopar isåfall igenom varje erfarenhet
        experiences.forEach(experience => {

            // Använder substring för att endast inkludera de 10 första tecknen i datumet (börjar på index 0)
            const startDate = experience.startDate.substring(0, 10);

            let endDate = "Pågående"; // Sätter slutdatum till "Pågående" initalt (om den är null)

            // Kontrollerar om enddate finns och inte är null
            if (experience.endDate) {
                endDate = experience.endDate.substring(0, 10); // Inkluderar datumets första 10 tecken
            }

            // Skapar en article för varje jobberfarenhet
            const articleEl = document.createElement("article");

            // Skapar ett unikt ID för varje article baserat på erfarenhetens ID
            let articleID = `${experience._id}`;
            articleEl.id = articleID;

            // Sätter artikelns innehåll till erfarenhetens data (företagsnamn, titel, plats, datum och beskrivning)
            articleEl.innerHTML = `
            <div>
            <h3 class="company-name">${experience.companyName}</h3>
            <p><strong>Roll:</strong> ${experience.jobTitle}</p>
            <p><strong>Plats:</strong> ${experience.location}</p>
            <p><strong>Tidsperiod:</strong> ${startDate} - ${endDate}</p>
            <h4>Beskrivning</h4>
            <p>${experience.description}</p>
            </div>
            <div>
            <button class="edit-btn">Redigera <i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete-btn">Radera <i class='fa fa-solid fa-trash-can'></i></button>
            </div>
        `;

            // Lägger till artikeln i container för att skriva ut till DOM
            workContainer.appendChild(articleEl);

            // Lägger till händelselyssnare för klick på redigera-knappen
            const editBtn = articleEl.querySelector(".edit-btn");
            editBtn.addEventListener("click", () => {
                fillEditForm(experience); // Anropar funktion och skickar med erfarenhetens data
            });

            // Lägger till händelselyssnare för klick på delete-knappen
            const deleteBtn = articleEl.querySelector(".delete-btn");
            deleteBtn.addEventListener("click", () => {
                deleteExperience(articleID); // Anropar funktion för att ta bort erfarenhet och skickar med specifikt ID
            });
        });
    }
}
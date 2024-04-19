"use strict";

// Importerar url och variabel som modul
import { url } from './experiences.js';
import { popupMsg } from './add.js';

// Asynkron funktion för att radera en erfarenhet från servern
export async function deleteExperience(articleID) {
    try {
        // Skickar en DELETE-förfrågan till servern med artikelns ID
        const response = await fetch(`${url}/${articleID}`, {
            method: "DELETE"
        });

        // Lagrar en variabel för artikeln med det specifika ID:et
        const experienceToDelete = document.getElementById(articleID);

        // Hämtar innehållet från rubriken med klassen company-name för den specifika artikeln
        const companyName = document.getElementById(articleID).querySelector('.company-name').innerHTML;

        // Tar bort hela artikeln med jobberfarenheten
        experienceToDelete.remove();

        popupMsg.classList.add("show"); // Lägger till klassen show för popup när erfarenheten har raderats
        popupMsg.innerHTML = `Jobberfarenhet för ${companyName} har raderats!`; // Skapar innehållet för popupen

        // Döljer popup efter 3 sekunder
        setTimeout(function () {
            popupMsg.classList.remove("show"); // Tar bort show-klassen
            popupMsg.innerHTML = ""; // Tömmer innehållet
        }, 3000); // 3 sekunder


        // Fångar upp eventuella felmeddelanden
    } catch (error) {
        console.error("Något gick fel vid radering av erfarenhet: ", error);
    }
}
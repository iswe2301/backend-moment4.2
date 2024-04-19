"use strict";

// Importerar url som modul
import { url } from './experiences.js';

// Lagrar variabel för popup, exporterar
export let popupMsg = document.querySelector(".popup");

// Asynkron funktion som lägger till ny jobberfarenhet
export async function createExperience(companyname, jobtitle, location, startdate, enddate, description) {
    try {
        // Skapar ett nytt objekt för jobberfarenheten
        let workexperience = {
            companyName: companyname,
            jobTitle: jobtitle,
            location: location,
            startDate: startdate,
            endDate: enddate,
            description: description
        }

        // Skickar ett POST-anrop med fetch API till webbtjänsten med objektet som skapats för erfarenheten
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(workexperience)
        });

        // Inväntar svar och omvandlar till json
        const data = await response.json();

        popupMsg.classList.add("show"); // Lägger till klassen show för popup när erfarenheten har skapats
        popupMsg.innerHTML = `Jobberfarenhet för ${companyname} har skapats!`; // Skapar innehållet för popupen

        // Döljer popup efter 3 sekunder
        setTimeout(function () {
            popupMsg.classList.remove("show"); // Tar bort show-klassen
            popupMsg.innerHTML = ""; // Tömmer innehållet
            // Omdirigerar användaren till startsidan efter att popupen har dolts
            setTimeout(function () {
                window.location.href = "index.html";
            }, 800); // Omdirigerar användaren till startsidan efter att popupen har dolts, 0.8 sekunders fördräjning
        }, 3000); // 3 sekunder

        // Fångar upp eventuella felmeddelanden
    } catch (error) {
        console.error("Något gick fel vid skapande av erfarenhet: ", error);
    }
}

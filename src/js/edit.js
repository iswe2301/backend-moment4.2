"use strict";

// Importerar url och variabler som modul
import { fetchExperiences, url } from './experiences.js';
import { errorMsg } from './main.js';
import { popupMsg } from './add.js';

// Hämtar element från DOM och lagrar i variabler
const submitChange = document.getElementById("submit-change");
const editFormContainer = document.getElementById("edit-container");
const editContainer = document.getElementById("edit-form-container");
const companyNameInput = document.getElementById('companyname');
const jobTitleInput = document.getElementById('jobtitle');
const locationInput = document.getElementById('location');
const startDateInput = document.getElementById('startdate');
const endDateInput = document.getElementById('enddate');
const descriptionInput = document.getElementById('description');
let experienceID = null; // Skapar en global variabel för erfarenhetens ID och sätter initalt till null

// Funktion för att fylla i redigeringsformuläret med specifik erfarenhet
export function fillEditForm(experience) {
    experienceID = experience._id; // Sätter erfarenhetens ID till det specifika ID:et för erfarenheten
    // Visar redigeringsformuläret
    editFormContainer.style.display = "block";
    // Scrollar till formulärets position med ett mjukt beteende
    editFormContainer.scrollIntoView({ behavior: "smooth" });

    // Fyller i formuläret med uppgifterna för den valda erfarenheten
    editContainer.companyname.value = experience.companyName;
    editContainer.jobtitle.value = experience.jobTitle;
    editContainer.location.value = experience.location;
    editContainer.startdate.value = experience.startDate.substring(0, 10);

    // Kontrollerar om enddate finns
    if (experience.endDate) {
        editContainer.enddate.value = experience.endDate.substring(0, 10);
    } else {
        editContainer.enddate.value = ""; // Lämnar fältet tomt om enddate är null/pågående
    }
    editContainer.description.value = experience.description;

    // Hämtar alla input, date och textarea-element från formuläret och lagrar i variabel
    const formInputs = editContainer.querySelectorAll("input, date, textarea");

    // Lägger till händelselyssnare för varje input och select i formuläret
    formInputs.forEach(input => {
        input.addEventListener("input", () => {
            // Kontrollerar om formuläret är giltigt
            if (editContainer.checkValidity()) {
                errorMsg.style.display = "none"; // Döljer felmeddelandet när fomruläret är giltigt
            }
        });
    });
}

if (editFormContainer) {
    // Skapar en global händelselyssnare vid klick på submit-knappen i redigeringsformuläret
    submitChange.addEventListener("click", (event) => {
        event.preventDefault(); // Förhindrar formulärets standardbeteende (så att sidan inte laddas om)
        // Förhindrar formuläret från att skickas om det inte är giltigt
        if (!editContainer.checkValidity()) {
            errorMsg.style.display = "flex"; // Visar felmeddelandet om formuläret inte är giltigt
        } else {
            errorMsg.style.display = "none"; // Döljer felmeddelandet om formuläret är giltigt

            // Hämtar värdena från formulärets fält
            const companyname = companyNameInput.value;
            const jobtitle = jobTitleInput.value;
            const location = locationInput.value;
            const startdate = startDateInput.value;
            const enddate = endDateInput.value;
            const description = descriptionInput.value;

            // Anropar funktion för att uppdatera erfarenheten, skickar med värdena från formulärets fält + specifikt ID
            updateExperience(experienceID, companyname, jobtitle, location, startdate, enddate, description);
        }
    });
}

// Asynkron funktion som uppdaterar en befintlig jobberfarenhet
export async function updateExperience(id, companyname, jobtitle, location, startdate, enddate, description) {
    try {
        // Skapar ett objekt med uppdaterad information för jobberfarenheten
        let updatedExperience = {
            _id: id,
            companyName: companyname,
            jobTitle: jobtitle,
            location: location,
            startDate: startdate,
            endDate: enddate,
            description: description
        }

        // Skickar en PUT-förfrågan med fetch API till webbtjänsten för att uppdatera erfarenheten
        const response = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(updatedExperience)
        });

        // Kontrollerar om uppdateringen lyckades
        if (response.ok) {
            fetchExperiences(); // Anropar funktion för att hämta erfarenheter på nytt
            // Hämtar den specifika artikelns element
            const articleEl = document.getElementById(id);
            // Scrollar tillbaka till artikelns position med ett mjukt beteende
            articleEl.scrollIntoView({ behavior: "smooth" });
            // Döljer redigeringsformuläret
            editFormContainer.style.display = "none";
            // Visar en popup-meddelande om att erfarenheten har uppdaterats
            popupMsg.classList.add("show");
            popupMsg.innerHTML = `Jobberfarenhet för ${companyname} har uppdaterats!`;
            // Döljer popup efter 3 sekunder
            setTimeout(function () {
                popupMsg.classList.remove("show");
                popupMsg.innerHTML = "";
            }, 3000);
        }
        // Fångar upp ev. fel
    } catch (error) {
        console.error("Något gick fel vid uppdatering av erfarenhet: ", error);
    }
}

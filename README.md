# DT207G - Backend-baserad webbutveckling, Moment 2.2 Webbtjänster

## Moment 2 - projektbeskrivning
I detta projekt har en webbapplikation skapats som använder den webbtjänst som skapats i Moment 3: "https://github.com/iswe2301/backend-moment3.git". Webbapplikationen läser ut befintliga lagrade poster från databasen, och har möjlighet att lägga till nya via ett formulär. Det finns även möjlighet att redigera och radera poster. Webbplatsen använder Fetch API för att hämta (GET), skicka data (POST), redigera (PUT) samt radera (DELETE) från och till webbtjänsten.

## Webbapplikationen WorkXperience
Applikationen är skapad med syftet att tillhandahålla plattform där användare kan dela med sig av sina jobberfarenheter. Webbapplikationen består av tre sidor:

* **Erfarenheter:** startsida som visar alla befintliga jobberfarenheter, med möjlighet att redigera/radera.
* **Lägg till erfarenhet:** undersida med formulär där användare kan lägga till nya erfarenheter. När en erfarenhet läggs till omdirigeras användaren automatiskt till startsidan som visar alla erfarenheter.
* **Om sidan:** undersida med information om webbapplikationen.

De funktioner som skapats är:

* **Lägg till erfarenhet:** Användare kan fylla i ett formulär med detaljer om sina jobberfarenheter, inklusive företagsnamn, jobbtitel, plats, datum (start och slut), och en beskrivning av arbetsuppgifterna.
* **Visa erfarenheter:** Webbapplikationen hämtar och visar en "lista" över alla lagrade erfarenheter, som sorteras efter startdatum med de senaste erfarenheterna först.
* **Redigera erfarenhet:** Användare kan uppdatera detaljer om sina tidigare inlagda erfarenheter genom en redigera-knapp som genererar ett redigeringsformulär.
* **Radera erfarenhet:** Användare kan radera befintliga erfarenheter genom en radera-knapp.

## Tekniker
Applikationen är byggd med HTML, CSS (SCSS), och JavaScript. Applikationen använder av Fetch API för att kommunicera med en backend-server där data för erfarenheterna lagras. De ikoner som används är hämtade från FontAwesome.

### Utvecklingsmiljö
* **Node.js och Express:** för utveckling på serversidan och API-hantering (moment 3)
* **MongoDB Atlas:** används som databas för lagring av jobberfarenheter.
* **Render:** för publicering av webbtjänsten (moment 3).
* **Netlify:** för publicering av webbapplikationen.

## Om
* **Av:** Isa Westling
* **Kurs:** Backend-baserad programmering (DT207G)
* **Program:** Webbutvecklingsprogrammet
* **År:** 2024
* **Skola:** Mittuniversitetet
# The library.
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Projekt gjort av:
[Filip Brandt](https://github.com/filip-brandt)
[Lina Svärd](https://github.com/linasvard)
[Marcus Yttermyr](https://github.com/Marcusey)


## Installation

1. Klona repot:
```bash
git clone https://github.com/linasvard/grupp-7-inlamning.git
git clone 
cd grupp-7-inlamning
```

2. Installera dependencies:
```bash
npm install
```

3. Skapa en `.env`-fil i projektets rot med följande innehåll:

```bash
JWT_SECRET=valfri_hemlig_sträng
NODE_ENV=development
MONGODB_URL=din_mongodb_connection_sträng
CLIENT_URL=http://localhost:3000
```


4. (Valfritt) Importera exempeldata från `exports/`-mappen till din egen MongoDB:
```bash
mongoimport --uri="din_connection_sträng" --collection=books --file=exports/book_db.books.json --jsonArray
mongoimport --uri="din_connection_sträng" --collection=reviews --file=exports/book_db.reviews.json --jsonArray
mongoimport --uri="din_connection_sträng" --collection=users --file=exports/book_db.users.json --jsonArray
```

5. Starta servern:
```bash
npm run dev
```

6. Öppna `http://localhost:3000` i webbläsaren.

### Skapa en admin-inloggning

Registrera en användare via ett POST-anrop till `/api/auth/register` (t.ex. via Insomnia/Postman) med body:
```json
{
    "username": "admin",
    "password": "123"
}
```
Logga sedan in via inloggningssidan i klienten med samma uppgifter.


## Vad vi har gjort

### Ansvarsområde 1 - Users
- [Filip Brandt](https://github.com/filip-brandt)

Jag tog på mig ansvarsområde 1 med users, registrering och inloggning.

### Filer jag har arbetat i

#### 💻 Backend
* **`src/models/User.ts`** – Skapat Mongoose-schemat och modellen för användare i databasen.
* **`src/controllers/authController.ts`** – Byggt auth-logik (`login`, `register`, `logout`) med lösenords-hashing (`bcrypt`), JWT-signering och cookie-hantering med robust `try/catch`.
* **`src/controllers/userController.ts`** – Skapat alla CRUD-funktioner för användare (`fetchAllUsers`, `fetchUserById`, `updateUser`, `deleteUser`) och säkrat dem med `.select('-password')`.
* **`src/routes/auth.ts`** – Definerat Express-routern och bundit `POST`-metoderna för inloggning, registrering och utloggning.
* **`src/routes/users.ts`** – Kopplat ihop alla CRUD-anrop (`GET`, `PATCH`, `DELETE`) för användare och skyddat dem med dörrvakten `verifyToken`.

#### 🎨 Frontend / Klient
* **`public/login.html`** – Byggt om strukturen för att rymma två Bootstrap-formulär (login och register) i samma vy med smarta id-taggar.
* **`public/admin.html`** – Lagt till en responsiv Bootstrap-tabell längst ner på sidan för att visualisera registrerade användare samt en ny välkomsttext.
* **`public/js/login.js`** – Skrivit JavaScript-logiken för inloggning, registrering, automatisk fälttömning, felhantering och dynamisk flikväxling.
* **`public/js/adminBooks.js`** – Hämtat användardata från API:et och renderat tabellraderna live med `.map().join("")` samt byggt `deleteUser`-funktionen.

---

### Vad jag har gjort i projektet

#### 1. Backend & Databasintegrering
* **Persistent databas:** Ersatt lärarens hårdkodade arrayer med en riktig, levande **MongoDB**-databas via Mongoose.
* **Användarmodell:** Implementerat ett robust `UserSchema` i Mongoose med fält för `username`, krypterat `password`, `is_admin`-status samt automatiska tidsstämplar via `created_at`.

#### 2. Autentisering & Säkerhet (Auth-systemet)
* **Registrering (`POST /api/auth/register`):** Byggt en endpoint som kontrollerar mot databasen så att användarnamnet inte redan är upptaget innan ett nytt konto skapas.
* **Lösenordskryptering:** Integrerat `bcrypt` för att hasha lösenord innan de sparas. Inga lösenord sparas eller hanteras i klartext.
* **Inloggning (`POST /api/auth/login`):** Skapat ett inloggningssystem som validerar lösenord med `bcrypt.compare` och signerar en säker **JSON Web Token (JWT)** vid lyckad inloggning.
* **HttpOnly Cookies:** Konfigurerat Express till att skicka JWT-token i en säker `httpOnly`-cookie (`accessToken`). Detta skyddar sessionen mot XSS-attacker eftersom klient-JavaScript inte kan läsa cookien.
* **Utloggning (`POST /api/auth/logout`):** Byggt hantering som rensar och sätter utgångsdatumet på autentiseringscookien till Unix-epoken (1970) för omedelbar radering.
* **Skyddade Routes:** Kopplat på Express-middleware (`verifyToken`) som dörrvakt på alla känsliga endpoints för att säkerställa att användaren har en giltig session.

#### 3. CRUD-logik för användare
* **Säkra databasanrop:** Använt `.select('-password')` på alla endpoints där användardata hämtas, vilket garanterar att krypterade lösenordshashar aldrig läcker ut till frontend.
* **PATCH & DELETE:** Implementerat endpoints för att säkert uppdatera (med automatisk om-hashing av lösenord vid ändring) samt radera användarkonton helt ur MongoDB.

#### 4. Klientsida & Frontend JavaScript
* **Dynamisk vy-växling:** Byggt ett modernt gränssnitt på `login.html` som växlar mellan logga in- och registreringsvyer utan omladdning via Bootstraps `d-none`-klass och formulärets inbyggda `.reset()`.
* **Stateful felhantering:** Skapat logik som automatiskt städar bort gamla meddelanden och uppdaterar färgklasser (`text-success` / `text-danger`) när användaren navigerar eller skickar formulär.
* **Cookie-överföring:** Konfigurerat klientsidans `fetch`-anrop med **`credentials: "include"`**. Detta krävs för att webbläsaren ska tillåtas att spara, skicka med och rensar cookies automatiskt i bakgrunden.
* **Användartabell på Adminpanelen (`admin.html`):**
  * **Säkerhetskontroll vid sidladdning:** Om ett API-anrop returnerar `401` eller `403` skickas en utloggad användare omedelbart tillbaka till loginsidan med flaggan `?error=unauthorized`.
  * **Dynamisk tabellritning:** Använt prestandavänlig array-mapping (`.map().join("")`) för att generera en Bootstrap-tabell som visar användarnas `_id`, `username`, `is_admin` och `created_at`.
  * **Interaktiv radering:** Lagt till en **Delete User**-knapp på varje rad som kör en `confirm`-ruta innan den raderar användaren live ur MongoDB och uppdaterar vyn direkt.


---------------------------------------------------------------------------------

### Ansvarsområde 2 - Books
[Lina Svärd](https://github.com/linasvard)

Jag tog på mig ansvaret av att göra books-delen. Nedan listas de generella punkterna jag gjort i projektet:

#### Initiering av projekt
- Mappstrukturen

#### Routes
- books.ts
- genres.ts

#### Models
- Book.ts
- Review.ts (för att komma vidare i min del, avstämde med ansvarsområde 3)

#### Controllers
- bookController.ts

#### JavaScript
- adminBooks.js
- book.js
- books.js
- navbarFooter.js

#### Data
- genres.json

#### HTML
Till största del har vi jobbat i våra egna html-filer om det inte krävts att en går in och modifierar pga att strukturen kräver det eller liknande. Exempelvis ligger listan av users i admin.html som tidigare enbart var böcker (för admin). Nedan listas de html-filer som jag jobbat i: 

- __admin.html__ (tidigare admin-books.html)
- __index.html__ (tidigare books.html)
- __book.html__ 

#### Styling
Jag har byggt upp den generealla stylingen för projektet då jag hade tid över och fick okej från resten av gruppen. De har fått komma med input och korrigerar ändras därefter. 

#### Övrigt
På grund av miss i att läsa beskrivningen råkade jag ta tag i att göra book.html där bok listas med tillhörande reviews. Kom på det efter att jag byggt bokdelen i filen. Lämnade över det senare på ansvarsområde 3 så att han fick avsluta med reviews delen i denna fil. 


---------------------------------------------------------------------------------

### Ansvarsområde 3 - Reviews
- [Marcus Yttermyr](https://github.com/Marcusey)

Jag tog på mig ansvarsområde 3 med reviews.

#### Models
- Review.ts (name, content, rating 1-5, samt book_id som refererar)

#### Controllers
- reviewController.ts (getAllReviews, getReview, createReview, updateReview, deleteReview)

#### Routes
- reviews.ts (GET/POST öppna, PATCH/DELETE skyddade med verifyToken)

#### HTML/JS - klient
- book.html - formulär för att skapa en ny review (grundstrukturen och bokvisningen byggdes av ansvarsområde 2, jag byggde på med review-formuläret)
- reviewForm.js - hanterar formulärets submit, POST till /api/reviews, och uppdaterar review-listan automatiskt efter lyckad inskickning
- navbarFooter.js - la till inloggningsstatus i navbar/footer: visar/döljer admin-länken beroende på om man är inloggad, samt växlar text mellan "Log in"/"Log out" med tillhörande utloggningsfunktion

#### Övrigt
Testade samtliga endpoints manuellt med REST Client (reviews-test.http), både lyckade anrop och felfall (ogiltigt rating, obefintligt book_id, borttagen review) för att säkerställa att valideringen fungerar som den ska.


---------------------------------------------------------------------------------

## Egna tankar från medlemmarna

### Filip - ansvarsområde: users

#### Sammanfattning
Grupparbetet har gått mycket bra. Vi kom enkelt överens och kunde snabbt enas om vad och hur vi skulle göra. Vi hade möten nästan alla dagar och kommunicerade i chatten stort sett varje dag. Kände att kommunikationen var god. Upplevde inte att det uppstod någon förvirring kring arbetet. Vi blev färdiga i god tid och behövde inte stressa vilket var skönt. Vi arbetade strukturerat med github issues och branches vilket gjorde att arbetet lades upp smidigt. 

#### Vad har varit svårt
I början var det utmanande att se helhetsperspektivet på hur projektet skulle se ut. Hur man skulle börja koda och sen koppla ihop varandras områden, utan att råka kliva in på andras områden. Hade mest problem med att få till så att feedback-meddelanden för success eller error visas och försvinner vid rätt tillfällen. Detta fick jag pilla lite med. Ett frustreringsmoment var när man frågade AI om lösningar och den spottade ut kod som var antingen överkomplicerad eller för simpel som inte var bra praxis.

#### Vad har varit lätt
Skapa CRUD med MongoDB var mer simpelt än SQL. Och eftersom vi övat i klassen en del nu på CRUD så kändes det inte så invecklat. Bootstrap underlättade styling så man inte behövde lägga lika mycket tid på det. Att få ett kodskal med instruktioner och de olika ansvarsområdena tydligt uppdelade var en stor hjälp för att komma igång vilket brukar vara det svåraste för mig. Att få se exempel på tidigare projekt gav en bra inblick på hur slutprodukten ska se ut.

---------------------------------------------------------------------------------


### Lina - ansvarsområde: books

#### Sammanfattning
Tycker det har gått bra i överlag. Har varit väldigt tacksamt att få gå direkt till kodandet med en nästintill färdig mall. Fått tydliga instruktioner på hur arbetet ska gå till och detta har varit på gott och ont. Medans det samtidigt har varit väldigt skönt att få slippa stor del av initieringen är det ju också där man lär sig mycket om projektet och hur man startar upp projekt, i vilka steg och filer man ska ha. Men med det här har man också bara behövt fokusera på koden utan strul från initiering osv vilket har också varit givande.

Sammarbetet har i stor grad gått bra, vi har skrivit i chatten mestadels för hjälp eller uppdateringar. Med tanke på att en av gruppmedlemmarna jobbade dagtid vissa dagar har det gått bra och man har fått anpassa sig till det helt enkelt. Då jag och han har behövt koppla ihop våra delar (books och reviews) har det krävts att man få tänka på vad som inte kräver sammarbete för att kunna jobba med det istället för inväntande av ansvarsområde 3. 

#### Vad har varit svårt?
Personligen har jag kämpat extra med att generera olika genres. Hade kunnat gå en enkel väg och lägga dem i en array i modellen, men ville ha mer flexibilitet och kontroll. Efter mycket googlande och utforskande i hur jag kan göra landade det i att ha en json-fil som genereras via en router. Försökte ha den i public mappen men då kunde inte databasen hämta den. 

Vår grupp bestämde sig för att delvis implemintera bootsrap som ett ramverk för stylingen. Var till en början emot detta pga för att jag aldrig jobbat med detta så det var svårt till en början att förstå det övergriapande konceptet. Men med lite övning gav det också färdighet och lärde mig att hantera det.

#### Vad har varit lätt?
I och med att man fått göra så många övningsuppgifter med models, routes och controllers gick det relativt snabbt att komma igenom dessa. Det är ett mönster som är relativt enkelt att följa och tolka så i den delen krävde inte så mycket efterforskning osv. 

---------------------------------------------------------------------------------

### Marcus - ansvarsområde: reviews

#### Sammanfattning
Arbetet har gått bra, bra med en grundstruktur i början så det kunde fokuseras på delarna från början, på gott och ont men med rätt liten tidsram och relativ okunskap kring tidsåtgångs-perspektivet för något som detta var det fint med en grund ändå. Som relativt ny på backend och något ringrostig med GitHub har det varit lärorikt att bygga en hel CRUD-kedja från modell till klient och köra på i praktiken. Samarbetet med 2'an kring kopplingen mellan böcker och reviews fungerade smidigt - vi stämde av och det undveks onödig väntan. Rent gruppmässigt så känns det som vi tog det lugnt och sansat i början med en liten push i mitten och lagom tid att avrunda arbetet i tid innan redovisning, vilket har varit en produkt av god kommunikation och skapande av issues och delavstämningar.

#### Vad har varit svårt?
Till en början att se helhetsperspektivet tyckte jag var lite utmanande, uppdelningen kring vad som ska ligga vart och koppla, jag kommer in i processen men med vardagslivs-avbrott som jobb och liknande så har det varit en del reboot och starta om med fokuseringen och spåret som man var på. Det släppte mer med att den visuella delen av sidan uppenbarade sig.
Har stött på en del saknade div's och liknande små fallgropar under vägen som tagit tid att felsöka, men ändå gett bättre förståelse för hur man läser felmeddelanden och spårar, learning by doing. Men rent generellt utmanande att se till att alla kopplingar placeras där dom ska och i rätt ordning.

#### Vad har varit lätt?
Mönstret för CRUD (modell → controller → routes) kändes relativt bekant efter tidigare övningsuppgifter, så själva backend-strukturen för reviews kändes ändå som det kunde rulla på bra. Att testa endpoints kändes också naturligt efter att ha övat på det nyligen i kursen. Samarbetet tycker jag också har varit avslappnat och uppdelat vilket har gjort det lätt att någorlunda kunna fokusera på en sak i taget.


---------------------------------------------------------------------------------

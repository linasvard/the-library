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

**[🔗 Demo](https://this-is-the-library.vercel.app/)**

## Om projektet
![Bilder på hemsidan i gult, staplade på varandra](/public/images/the-library.jpg)

**The library.** är en fullstack-webbapp för bokrecensioner, byggd som ett grupprojekt på Medieinstitutet. Besökare kan bläddra bland bokkollektionen, läsa mer om varje bok och lämna egna recensioner med betyg. Administratörer loggar in för att hantera böcker och användare via en skyddad adminpanel.

### Contributors:
[Filip Brandt](https://github.com/filip-brandt) | [Lina Svärd](https://github.com/linasvard) | [Marcus Yttermyr](https://github.com/Marcusey)


### Teknik

| Del | Teknik |
|---|---|
| Backend | Node.js, Express, TypeScript |
| Databas | MongoDB med Mongoose |
| Autentisering | JWT, bcrypt, httpOnly-cookies |
| Frontend | HTML, CSS, JavaScript, Bootstrap |
| Hosting | Vercel |

-----

## Installation

1. Klona repot:
```bash
git clone https://github.com/linasvard/the-library.git
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

-----------


## Ansvarsfördelning

### Users och autentisering: [Filip Brandt](https://github.com/filip-brandt)

Byggde användarmodellen och hela auth-flödet: registrering, inloggning och utloggning med bcrypt-hashade lösenord och JWT i en httpOnly-cookie. Skapade CRUD-endpoints för användare, skyddade med `verifyToken`, och såg till att lösenordshashar aldrig skickas till klienten. På klientsidan byggde han login-sidan med växling mellan inloggning och registrering, samt användartabellen i adminpanelen.
 
**Filer:** `User.ts`, `authController.ts`, `userController.ts`, `auth.ts`, `users.ts`, `login.html`, `login.js`, delar av `admin.html` och `adminBooks.js`

---------------------------------------------------------------------------------

### Design och Books: [Lina Svärd](https://github.com/linasvard)

Satte upp projektets mappstruktur och byggde bokdelen från modell till klient: CRUD-endpoints för böcker, genrer via en egen JSON-fil och route, samt startsidan med boklistan, boksidan och bokhanteringen i adminpanelen. Byggde även den övergripande stylingen för projektet, med input från gruppen.
 
**Filer:** `Book.ts`, `bookController.ts`, `books.ts`, `genres.ts`, `genres.json`, `index.html`, `book.html`, `admin.html`, `books.js`, `book.js`, `adminBooks.js`, `navbarFooter.js`

---------------------------------------------------------------------------------

### Reviews: [Marcus Yttermyr](https://github.com/Marcusey)

Byggde recensionsdelen med betyg 1–5 kopplat till varje bok. GET och POST är öppna, medan PATCH och DELETE kräver inloggning. Lade till recensionsformuläret på boksidan, som uppdaterar listan direkt efter inskickning, samt inloggningsstatus i navbar och footer. Testade alla endpoints manuellt med REST Client, inklusive felfall.
 
**Filer:** `Review.ts`, `reviewController.ts`, `reviews.ts`, `reviewForm.js`, `reviews-test.http`, delar av `book.html` och `navbarFooter.js`


---------------------------------------------------------------------------------

## 💭 Reflektion
 
**Samarbete:** Gruppen kom snabbt överens, hade täta avstämningar och arbetade strukturerat med GitHub issues och branches. Projektet blev klart i god tid.
 
**Utmaningar:** Att i början se helheten och koppla ihop varandras delar utan att krocka. Individuellt lärde vi oss mycket av bland annat feedbackmeddelanden i UI:t, att bygga en flexibel genrelösning och att komma in i Bootstrap.
 
**Det som gick lätt:** CRUD-mönstret (modell → controller → routes) kändes bekant efter kursens övningar, och den färdiga grundmallen gjorde att vi kunde fokusera på koden från start.
 

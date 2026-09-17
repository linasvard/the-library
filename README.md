# Bokapplikation

## Made by

### Ansvarsområde 1 - Users
- [Filip Brandt](https://github.com/filip-brandt)

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

### Filip
din text här

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
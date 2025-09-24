#  Flagg World 

## En webbapp byggd med **React + Redux Toolkit**  
för att studera världens flaggor, göra quiz och följa resultat  
på en **leaderboard**.

för att lära sig världens flaggor, köra quiz och följa resultat på en leaderboard.

👉 Live-demo: flag-world-app.web.app

## Funktioner
---

## Beskrivning

Ett skol-/projekt i **React** där man kan:
- Studera länder från olika regioner (Europe, Asia, Oceania, Americas, Africa).
- Spara favoritländer i en **Collection** (lagras i localStorage).
- Köra ett **Quiz** för att testa sina kunskaper.
- Se resultat på en **Leaderboard**.

Data hämtas från [REST Countries API](https://restcountries.com/).

---

##  Funktioner
### krav
- Startsida med navigation: `/countries`, `/collection`, `/quiz`, `/leaderboard`  
- Visa länder per region med flaggor  
- Klicka på flagga → landdetaljsida  
- Möjlighet att spara länder i **Collection** (lagras i localStorage)  
- Dubletter förhindras  
<hr>
- Användaren väljer **region** + skriver in sitt **användarnamn**  
- Quizet består av **15 slumpmässiga frågor**  
- Feedback ges direkt (**Correct! / Wrong!**)  
- Resultatet sparas i **localStorage**  

#### Leaderboard
- Resultat **grupperas per region**  
- Sortering sker **Högst → Lägst** (default)  
- Användare kan **radera** sina resultat  
- Data sparas i **localStorage**  

---

##  Quiz-flöde

1. Användaren matar in ett **användarnamn** och väljer en **region**  
2. Appen hämtar **15 slumpmässiga länder** från API:et  
3. För varje fråga:
   - Visa **flaggan**  
   - Användaren skriver in landets namn  
   - Kontrollera svaret:  
     - Rätt → `incrementScore()`  
     - Fel → Visa rätt land  
4. Efter sista frågan:
   - Resultatet sparas i localStorage (användarnamn + region + poäng)  
   - Användaren kan starta om quizet  

---

##  Tekniker & Syntax

- **useSelector** → hämta data från Redux  
- **useDispatch** → skicka actions till Redux  
- **useEffect** → kör kod vid ändringar (t.ex. efter API-anrop)  
- **localStorage** → lagra resultat lokalt i webbläsaren  

---

##  Logik & State Management (Redux)

Vi använder **Redux Toolkit** för att hantera appens state:

- `score` → antal rätt svar  
- `currentIndex` → nuvarande frågenummer  
- `stage` → `"start" | "inProgress" | "finished"`  
- `questions` → lista med slumpmässiga frågor  
- `feedback` → text (Correct! / Wrong!)  
- `userAnswer` → spelarens svar  
- `username` → spelarens namn  
- `region` → vald region  

Exempel på actions:
```js
dispatch(setUsername("Kalle Anka"))
dispatch(setRegion("Europe"))
dispatch(incrementScore())
dispatch(nextQuestion())
dispatch(setStage("finished"))
```


## Arbetssätt 
1. Strukturering av projektet
Började med att tänka igenom mapp- och sidstrukturen.
Satte upp App som förälder och planerade routing via React Router för sidor som /, /countries, /collection, /quiz, /leaderboard.

2. Navigation & gränssnitt
Implementerade en Navbar med aktiva länkar (useLocation) och byggde en Home-sida med knappar för navigation.

3. Länderlistor & detaljer
Lade till en Countries-sida där användaren kan välja region.
När ett land klickas → navigerar till CountryDetail (data från REST Countries API).
Användaren kan spara länder i en Collection (lagras i localStorage).

4. Quiz-funktionalitet
Började enkelt med useState för att testa logiken.
Flyttade sedan över till Redux Toolkit → delade upp state i olika slices (quiz, countries, leaderboard).
Detta gjorde statehanteringen mer enhetlig och återanvändbar.

5. Asynkrona anrop (Redux Thunk)
Använde createAsyncThunk för API-anrop.
Införde tre tydliga states:

- loading

- fulfilled

- error
Detta gjorde det enklare att hantera och testa API-flöden.

6. Leaderboard & persistens
Byggde en leaderboard som grupperar resultat per region och sorterar efter poäng.
Data sparas i localStorage och användare kan ta bort resultat.
Dubbelinmatningar förhindras.

7. Iterativ utveckling
Testade ofta i små steg → lättare att hitta buggar.
Förbättrade gradvis både prestanda och underhållbarhet genom att flytta logik till Redux och separera komponenter.

## Utmaningar
- Förstå varför dispatch(setRegion()) krävs istället 
för vanlig setRegion()

- Undvika dubbla states vid övergången från useState → Redux

- Visa feedback på sista frågan innan quizet avslutas

## Lärdomar
- Att strukturera projektet tidigt gör utvecklingen enklare

- Redux Toolkit gör statehantering enklare och tydligare

- Att dela upp i slices per domän gör koden mer återanvändbar

- Genom Redux Thunk kunde vi hantera:

> loading (data hämtas)

> fulfilled (klart)

 >error (felhantering)

-  Iterativ utveckling (bygga → testa → förbättra)
 gjorde projektet stabilare
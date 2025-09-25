#  Flag World 

## En webbapp byggd med **React + Redux Toolkit**  
för att studera världens flaggor, göra quiz och följa resultat  
på en **leaderboard**.

### 👉 Live-demo : (https://flag-world-app.web.app)
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
#### G-nivå
- Startsida med navigation: `/countries`,`/countries/:countryName`, 
`/collection`, `/quiz`, `/leaderboard`  
- Visa länder per region med flaggor  
- Klicka på flagga → landdetaljsida  
- Möjlighet att spara länder i **Collection** (lagras i localStorage)  
- Dubletter förhindras  
#### VG-nivå
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

 **Redux Toolkit** för att hantera appens state:

Exempel på actions:
```js
dispatch(setUsername("Kalle Anka"))
dispatch(setRegion("Europe"))
dispatch(incrementScore())
dispatch(nextQuestion())
dispatch(setStage("finished"))
```

## Arbetssätt 
1. Projektstruktur → satte upp mappar, App som root, routing 
med React Router

2. Navigation → Navbar med aktiva länkar (useLocation)

3. Countries → lista per region + detaljerad sida

4. Collection → favoritländer sparas i localStorage

5. Quiz → först med useState, sedan flyttad till Redux Toolkit

6. Async → createAsyncThunk för API-anrop (loading, success, error)

7. Leaderboard → grupperad per region, sorterad efter poäng, sparas i localStorage

8. Iterativ utveckling → små steg → test → förbättra

## Utmaningar
- Förstå varför dispatch(setRegion()) krävs istället 
för vanlig setRegion()

- Undvika dubbla states vid övergången från useState → Redux

- Visa feedback på sista frågan innan quizet avslutas

## Lärdomar
- Att strukturera projektet tidigt gör utvecklingen enklare

- Redux Toolkit gör statehantering enklare och tydligare

- Att dela upp i slices per domän gör koden mer återanvändbar

- Genom Redux Thunk kunde hantera:

> loading (data hämtas)

> fulfilled (klart)

 >error (felhantering)

-  Iterativ utveckling (bygga → testa → förbättra)
 gjorde projektet stabilare
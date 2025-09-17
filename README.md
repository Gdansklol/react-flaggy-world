# React + Vite (personligt projekt)

## Projekt – Country Explorer

Ett skol-/övningsprojekt i **React** där man kan:
- Studera länder från olika regioner (Europe, Asia, Oceania, Americas, Africa).
- Spara favoritländer i en **Collection** (lagras i localStorage).
- Köra ett **Quiz** (VG-nivå) för att testa sina kunskaper.
- Se resultat på en **Leaderboard** (VG-nivå).

Data hämtas från [REST Countries API](https://restcountries.com/).

---

##  G-nivå
- Startsida med navigation: `/countries`, `/collection`, `/quiz`, `/leaderboard`
- Visa länder per region med flaggor
- Klicka på flagga → landdetaljsida
- Möjlighet att spara länder i Collection (localStorage)

##  VG-nivå
- Quiz
-  Leaderboard

### Quiz
Byggt med **React** och **Redux Toolkit**.

- Användaren kan välja region och skriva in sitt användarnamn.  
- Quizet består av **15 slumpmässiga frågor** från den valda regionen.  
- Varje fråga visar en flagga → användaren ska skriva landets namn.  
- Feedback ges direkt (Correct! / Wrong!).  
- Resultatet sparas i **localStorage** tillsammans med användarnamn och region.  

### Leaderboard
- Visar en lista av alla resultat per region.
- För varje deltagare visas:
  - **Användarnamn**
  - **Poäng (antal rätt)**

---

## Använd syntax

- **useSelector** → hämta data från Redux  
- **useDispatch** → skicka actions till Redux  
- **useEffect** → kör kod när data ändras (t.ex. efter API-anrop)  
- **localStorage** → spara resultat lokalt i webbläsaren  

---

## Struktur (Quiz-flöde)

1. **Startläge (`start`)**
   - Användaren skriver in sitt namn och väljer region.
   - Klickar på **Start Quiz**.

2. **Hämta frågor**
   - Appen hämtar regionens länder från API:et.
   - 15 slumpmässiga frågor väljs ut.

3. **Svarshantering**
   - Användaren skriver sitt svar och trycker **Submit**.
   - Om rätt → `score + 1`, feedback visar **Correct!**.
   - Om fel → feedback visar rätt svar.

4. **Nästa fråga**
   - Om fler frågor → nästa fråga visas.
   - Om sista frågan → resultatet sparas i localStorage.

5. **Slutläge (`finished`)**
   - Användaren ser sitt slutresultat (`poäng / antal frågor`).
   - Kan välja att starta om quizet.

---

##  Logik & State Management (Redux)

Vi använder **Redux Toolkit** för att hantera quizets state:

- `score` → antal rätt svar  
- `currentIndex` → nuvarande frågenummer  
- `stage` → `"start" | "inProgress" | "finished"`  
- `questions` → lista med slumpmässiga frågor  
- `feedback` → text som visar om svaret var rätt eller fel  
- `userAnswer` → det användaren skriver i input  
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
---

## Arbetssätt

- Började med useState för att snabbt testa quiz-logiken.

- Flyttade gradvis allt till Redux Toolkit för en enhetlig state management.

- Gjorde små steg och testade varje gång.

## Vad var svårt?

- Att förstå varför man måste anropa dispatch(setRegion(...)) istället för bara setRegion.

- Att flytta useState → Redux utan att blanda ihop dubbla states.

- Hantera sista frågans feedback innan quizet avslutas.

## Vad har jag lärt mig?
- Redux Toolkit gör state management enklare än klassisk Redux.

- Vikten av att hålla all quiz-logik i Redux → enklare och tydligare kod.

- Att arbeta iterativt (först useState, sedan Redux) gör det lättare att förstå och bygga steg för steg.


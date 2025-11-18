# ¿Dónde Está la Pupusa?  
### A Salvadoran Memory Game

A funny, nostalgic browser-based memory game inspired by Salvadoran food, culture, and childhood humor.  

Match pairs of pupusas, horchata, elote loco, and other Salvadoran icons — all while enjoying playful phrases after each move.

---

## Play the Game
Live Demo:  
https://edithaleiva.github.io/browser-memory-game/

---

## Project Planning
All planning docs, pseudocode, user stories, requirements, and theme development:

Planning Document:  
https://github.com/edithaleiva/browser-memory-game/blob/main/planning.md

---

## GitHub Repository
https://github.com/edithaleiva/browser-memory-game

---

## Game Description
"¿Dónde Está la Pupusa?" is a lighthearted memory game where users flip cards to find matching pairs. Each match or mismatch includes a playful Salvadoran phrase such as:

- “Púchica, buena suerte.”
- “Ya casi, bichita/o.”
- “Vaya pues, encontraste un par.”

The game is designed to be fun, culturally familiar, and charming.

---

## User Stories

### Landing & Instructions
- As a user, I want to see a landing screen that clearly explains the game.
- As a user, I want clear instructions so I know what to do.

### Gameplay
- As a user, I want to see all cards face down at the start.
- As a user, I want to click cards to flip them.
- As a user, I want mismatched cards to flip back down.
- As a user, I want matched cards to stay revealed.
- As a user, I want feedback after each choice.

### Humor and Nostalgia
- As a user, I want Salvadoran phrases to appear after each match or mismatch.

### Winning and Restart
- As a user, I want a celebration or message when all pairs are found.
- As a user, I want an easy “Play Again” button.

---

## Core Game Logic (Pseudocode Overview)

Key steps include:

1. Duplicate and shuffle card deck  
2. Track flipped and matched cards  
3. Lock board during animations  
4. Display random match or mismatch phrases  
5. Render card front or back depending on state  
6. Trigger win screen when all pairs are matched  
7. Reset the game with `init()`  

Full pseudocode is available in the planning document.

---

## Directory Structure

```
browser-memory-game/
│
├── index.html
├── style.css
├── app.js
├── data.js
├── planning.md
└── /images
```

---

## Stretch Goals

- Sound effects  
- Card-flip animations  
- Confetti on win  
- Light/dark mode  
- Timer mode  
- Move counter  
- Difficulty levels  
- Additional themes or characters  

---

## Getting Started

1. Clone the repo:  
   ```bash
   git clone https://github.com/edithaleiva/browser-memory-game.git
   ```
2. Open the directory:  
   ```bash
   cd browser-memory-game
   ```
3. Open in VS Code:  
   ```bash
   code .
   ```
4. Run the project by opening `index.html` in your browser.

---

## Author
Created by Edith Alejandra Leiva  
General Assembly Software Engineering Immersive — Unit 1 Project


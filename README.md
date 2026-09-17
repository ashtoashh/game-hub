# Game Hub

A small static site hosting browser games, deployed with GitHub Pages.

## Play

https://ashtoashh.github.io/game-hub/

## Games

- **Snake** — `games/snake/`
- **Memory Match** — `games/memory/`
- **패턴 인식 IQ 게임** (Pattern Recognition IQ Game) — `games/iq-pattern/`
- **적성검사 실전 연습** (SKCT-style aptitude test practice) — `games/skct/`

## Run locally

No build step — it's plain HTML/CSS/JS. Serve the folder with any static server, e.g.:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Adding a new game

1. Create a folder under `games/<your-game>/` with its own `index.html`.
2. Link back to the hub from the game page (see existing games for the pattern).
3. Add a card for it in the root `index.html`.

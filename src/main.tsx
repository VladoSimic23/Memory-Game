import React from "react";
import ReactDOM from "react-dom/client";
import App, { CardI } from "./App";
import "./index.css";

const cards: CardI[] = [
  { id: 1, type: "1", flipped: false, solved: false },
  { id: 2, type: "2", flipped: false, solved: false },
  { id: 3, type: "3", flipped: false, solved: false },
  { id: 4, type: "4", flipped: false, solved: false },
  { id: 5, type: "5", flipped: false, solved: false },
  { id: 6, type: "6", flipped: false, solved: false },
  { id: 7, type: "7", flipped: false, solved: false },
  { id: 8, type: "8", flipped: false, solved: false },
];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App cards={cards} />
  </React.StrictMode>
);

import { useCallback, useEffect, useState } from "react";
import Card from "./Card";
import { initializeCards, isMatch } from "./functions";

export interface CardI {
  id: number;
  type: string;
  flipped: boolean;
  solved: boolean;
}

interface AppProps {
  cards: CardI[];
}

const App: React.FC<AppProps> = ({ cards }) => {
  // The state for the current pair of cards being checked
  const [currentPair, setCurrentPair] = useState<number[]>([]);
  // The state for all of the cards' states
  const [cardStates, setCardStates] = useState<CardI[]>([]);
  // The state for the number of moves made
  const [moves, setMoves] = useState<number>(0);
  // The state for the message to display
  const [message, setMessage] = useState<string>("");

  // Use Effect hook to initialize the cards' states
  useEffect(() => {
    setCardStates(initializeCards(cards));
  }, [cards]);

  // Use Effect hook to check if a pair of cards match
  useEffect(() => {
    if (currentPair.length === 2) {
      if (isMatch(cardStates, currentPair)) {
        // If the cards match, update their solved state to true
        setCardStates((prevState) =>
          prevState.map((card) =>
            card.id === currentPair[0] || card.id === currentPair[1]
              ? { ...card, solved: true }
              : card
          )
        );
        setCurrentPair([]);
      } else {
        // If the cards do not match, flip them back over after 1 second
        setTimeout(
          () =>
            setCardStates((prevState) =>
              prevState.map((card) =>
                card.id === currentPair[0] || card.id === currentPair[1]
                  ? { ...card, flipped: false }
                  : card
              )
            ),
          1000
        );
        setCurrentPair([]);
      }
      // Increase the number of moves
      setMoves((prevState) => prevState + 1);
    }
  }, [currentPair, cardStates]);

  // Use Effect hook to check if all cards have been solved
  useEffect(() => {
    if (cardStates.every((card) => card.solved)) {
      setMessage(`You won in ${moves} moves!`);
    }
  }, [cardStates, moves]);

  // The callback for when a card is clicked
  const handleClick = useCallback(
    (id: number) => {
      if (currentPair.length === 2) return;

      // Flip the card with the matching id
      setCardStates((prevState) =>
        prevState.map((card) =>
          card.id === id && !card.solved
            ? { ...card, flipped: !card.flipped }
            : card
        )
      );
      // Add the id of the clicked card to the currentPair array
      setCurrentPair((prevState) =>
        prevState.length === 2 || prevState.includes(id)
          ? prevState
          : [...prevState, id]
      );
    },
    [currentPair]
  );

  return (
    // This code is for rendering the UI of the memory game.
    // It contains a restart button and a grid of cards.

    <div>
      <div className="btnContainer">
        {/* Restart button which reloads the page */}
        <button onClick={() => location.reload()}>Restart</button>
      </div>

      {/* Grid of cards */}
      <div className="grid4">
        {cardStates.map((card) => (
          <Card
            // unique identifier for the card component
            key={card.id}
            id={card.id}
            type={card.type}
            // disables the card if it's solved or in the current pair
            disabled={card.solved || currentPair.includes(card.id)}
            flipped={card.flipped}
            solved={card.solved}
            // handleClick function to handle clicking on the card
            handleClick={handleClick}
          />
        ))}
      </div>

      {/* Message to show success or failure of matching pair */}
      <div className="message">
        <h1>{message}</h1>
      </div>
    </div>
  );
};

export default App;

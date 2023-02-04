import { CardI } from "../App";

// `isMatch` function takes two arguments: an array of cards and an array of currentPair of cards' ids.
export const isMatch = (cards: CardI[], currentPair: number[]) => {
  // Destructure the `currentPair` array into `firstId` and `secondId`.
  const [firstId, secondId] = currentPair;

  // Use `Array.prototype.find` to search for the first card with the specified `id` in the `cards` array.
  const firstCard = cards.find((card) => card.id === firstId);

  // Use `Array.prototype.find` to search for the second card with the specified `id` in the `cards` array.
  const secondCard = cards.find((card) => card.id === secondId);

  // Check if both `firstCard` and `secondCard` exist and their `type` property is equal.
  return firstCard && secondCard && firstCard.type === secondCard.type;
};

// `initializeCards` function takes an array of cards as an argument.
export const initializeCards = (cards: CardI[]) => {
  // Concatenate the `cards` array with itself to double the length.
  // Sort the concatenated array using `Array.prototype.sort` with a random sort function.
  // Use `Array.prototype.map` to map over each card and add `id`, `flipped`, and `solved` properties to each card.
  return cards
    .concat(cards)
    .sort(() => 0.5 - Math.random())
    .map((card, index) => ({
      ...card,
      id: index,
      flipped: false,
      solved: false,
    }));
};

interface CardProps {
  id: number;
  type: string;
  disabled: boolean;
  flipped: boolean;
  solved: boolean;
  handleClick: (id: number) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  type,
  disabled,
  flipped,
  solved,
  handleClick,
}) => {
  return (
    // Wrap the card in a `div` element and dynamically add CSS classes based on the card's properties.
    <div
      className={`card ${flipped ? "flipped" : ""} ${solved ? "solved" : ""}`}
      // Attach a click event handler to the `div` element.
      onClick={() => (disabled ? null : handleClick(id))}
    >
      {flipped ? (
        // If the card is flipped, render the back of the card with the card's type.
        <div className="back">
          <p>{type}</p>
        </div>
      ) : (
        // If the card is not flipped, render the front of the card.
        <div className="front"></div>
      )}
    </div>
  );
};

export default Card;

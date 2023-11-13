import { useContext } from "react";
import { Card } from "../card";
import "./styles.css";
import { CardListContext } from "../../contexts/card-list-context";

export function CardList() {
  const { cards } = useContext(CardListContext)

  return (
    <div className="cards content__cards">
      {cards.map((dataItem, index) => (
        <Card key={index} {...dataItem} />
      ))}

    </div>
  );
}

import { useContext } from "react";
import { Card, PatternsContext } from "../context/PatternsContext";
import GameCard from "./GameCard";

const DifficultyButton: React.FC = (): React.ReactElement => {

    const { cards, difficulty, handleClickOnCard } = useContext(PatternsContext)

    return (
        <div className={`mx-auto flex flex-wrap ${difficulty < 13 ? "w-1/2 scale-150" : difficulty < 21 ? "w-2/3 scale-125" : "w-full"} h-1/2  justify-center content-center my-auto gap-3`}>
            {
                cards.map((card: Card, idx: number) => {
                    return <GameCard card={card} idx={idx} difficulty={difficulty} onClick={handleClickOnCard} />
                })
            }
        </div>
    );
}

export default DifficultyButton;
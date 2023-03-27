import { Card } from "../context/PatternsContext";

const GameCard: React.FC<{ card: Card, idx: number, difficulty: number, onClick: any }> = ({ card, idx, difficulty, onClick }): React.ReactElement => {
    return (
        <button key={idx} className={`flex items-center justify-center ${difficulty < 13 ? "basis-1/4 h-[15%]" : difficulty < 21 ? "basis-1/5 h-[15%]" : "basis-1/6 h-[15%]"}  ${card.visible ? "bg-slate-900" : "bg-slate-300"} hover:cursor-pointer text-center text-white text-3xl`}
            onClick={() => onClick(card)}
        >
            {card.visible ? card.value : null}
        </button>
    );
}

export default GameCard;
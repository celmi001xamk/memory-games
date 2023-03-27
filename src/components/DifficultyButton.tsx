import { useContext } from "react";
import { Gamestate, PatternsContext } from "../context/PatternsContext";

const DifficultyButton: React.FC<{ name: string, value: number }> = ({ name, value }): React.ReactElement => {

    const { gameState, difficulty, handleDifficultyChange } = useContext(PatternsContext)

    return (
        <button className={`w-full ${difficulty === value ? "bg-slate-900" : "bg-slate-500"} ${gameState === Gamestate.Off ? "hover:bg-slate-200 hover:text-slate-900 hover:shadow-slate-900 hover:shadow-md" : ""}   rounded-lg m-0 h-10 text-lg md:text-xl text-white shadow-lg shadow-slate-200`} onClick={() => handleDifficultyChange(value)}>{name}</button>
    );
}

export default DifficultyButton;
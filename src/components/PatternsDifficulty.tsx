import { useContext } from "react";
import { PatternsContext, Gamestate } from "../context/PatternsContext";
import DifficultyButton from "./DifficultyButton";

const PatternsResult: React.FC = (): React.ReactElement => {

    const { gameState, handleStart } = useContext(PatternsContext)

    return (
        <div className="w-full flex flex-wrap">
            <div className="w-full flex flex-wrap justify-center">
                <div className="w-full text-base md:text-lg">Choose difficulty</div>
                <div className="flex w-full justify-start items-center gap-4">
                    <DifficultyButton name="3x3" value={9} />
                    <DifficultyButton name="4x4" value={16} />
                    <DifficultyButton name="5x5" value={25} />
                </div>
            </div>
            <button
                className={`w-full bg-slate-900 ${gameState === Gamestate.Off ? "hover:bg-slate-200 hover:text-slate-900 hover:shadow-slate-900 hover:shadow-md" : ""}   rounded-lg my-3 h-10 text-lg md:text-xl text-white shadow-lg shadow-slate-200`}
                onClick={() => handleStart()}>
                {gameState === Gamestate.Off || gameState === Gamestate.Over
                    ? "Start"
                    : "Good luck!"
                }
            </button>
        </div>
    );
}

export default PatternsResult;


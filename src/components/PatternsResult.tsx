import { useContext } from "react";
import { PatternsContext, Gamestate } from "../context/PatternsContext";

const PatternsResult: React.FC = (): React.ReactElement => {

    const { gameState, score, difficulty, countdown } = useContext(PatternsContext)
    return (
        <div className="flex justify-center items-center h-12 rounded-lg w-full">
            {
                score === difficulty
                    ? <div className="text-2xl text-center h-8">HOLY MOLY YOU DID IT! Turn it up?</div>
                    : gameState === Gamestate.Off
                        ? <div className="text-md text-center h-8">Press start to begin</div>
                        : gameState === Gamestate.Prep
                            ? <div className="text-3xl text-slate-900 text-center h-8">{(countdown >= 10 ? countdown.toFixed(0) : countdown.toFixed(1))}
                                <div className="relative bottom-12 border-t-8 border-t-slate-900 border-r-4 border-r-slate-700 border-b-4 border-b-slate-500 rounded-full w-16 h-16 animate-spin"></div>
                            </div>
                            : gameState === Gamestate.On
                                ? <div className="text-3xl text-slate-900 h-8"> Go! </div>
                                : <div className="text-md text-center h-8">You scored {score}! Try again?</div>
            }
        </div>
    );
}

export default PatternsResult;


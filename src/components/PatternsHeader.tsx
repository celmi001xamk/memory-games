import { useContext } from "react";
import { PatternsContext } from "../context/PatternsContext";

const DifficultyButton: React.FC = (): React.ReactElement => {

    const { hiScore, score } = useContext(PatternsContext)

    return (
        <div className="flex flex-wrap w-full h-fit justify-center">
            <div className="flex flex-wrap justify-between w-full">
                <div className="text-lg md:text-2xl basis-1/4 underline">Patterns</div>
                <div className="flex flex-wrap">
                    <ScoreText text={`HiScore: ${hiScore}`} />
                    <ScoreText text={`Current score: ${score}`} />
                </div>
            </div>
            <RuleText text="1. Choose difficulty" />
            <RuleText text="2. Press start" />
            <RuleText text="3. Memorize numerical order" />
            <RuleText text="4. Reveal cards in numerical order" />
        </div>
    );
}

const RuleText: React.FC<{ text: string }> = ({ text }): React.ReactElement => {
    return <div className="text-sm md:text-md w-full h-fit">{text}</div>
}

const ScoreText: React.FC<{ text: string }> = ({ text }): React.ReactElement => {
    return <div className="text-sm md:text-md w-full text-end">{text}</div>
}

export default DifficultyButton;
import PatternsDifficulty from "./PatternsDifficulty";
import PatternsGameBoard from "./PatternsGameBoard";
import PatternsHeader from "./PatternsHeader";
import PatternsResult from "./PatternsResult";

const Patterns: React.FC = (): React.ReactElement => {

    return (
        <div className="mx-auto flex flex-wrap max-w-lg min-w-[400px] w-1/2  h-3/5 min-h-[600px]  bg-slate-100 rounded-lg shadow-xl shadow-slate-900 justify-center content-between my-auto p-3">
            <PatternsHeader />
            <PatternsDifficulty />
            <PatternsResult />
            <PatternsGameBoard />
        </div>
    );
}

export default Patterns;
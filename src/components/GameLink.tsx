import { Link } from "react-router-dom";


const GameLink: React.FC<{ to: string, name: string }> = ({ to, name }): React.ReactElement => {
    return (
        <Link to={to} className="flex basis-1/3 h-32 bg-slate-200 m-3 p-3 items-center justify-center">
            <p className="text-center text-slate-900 text-lg">{name}</p>
        </Link>
    );
}

export default GameLink;
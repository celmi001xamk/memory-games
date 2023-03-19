import GameLink from "./GameLink";

const Home: React.FC = (): React.ReactElement => {

    return (
        <nav className="self-center flex flex-wrap w-96 h-fit content-evenly justify-center">
            <GameLink to="/patterns" name="Patterns" />
            <GameLink to="/memory-cards" name="Memory Cards" />
            <GameLink to="/" name="Game 3" />
            <GameLink to="/" name="Game 4" />
        </nav>
    );
}

export default Home;
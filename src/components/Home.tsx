import GameLink from "./GameLink";

const Home: React.FC = (): React.ReactElement => {

    return (
        <nav className="self-center flex flex-wrap w-96 md:w-1/2 h-fit content-evenly justify-center">
            <GameLink to="/patterns" name="Patterns" />
            <GameLink to="/" name="Memory cards (Coming soon!)" />
            <GameLink to="/" name="Work in progress" />
            <GameLink to="/" name="Work in progress" />
        </nav>
    );
}

export default Home;
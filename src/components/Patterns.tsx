import { useEffect, useState } from "react";

interface Card {
    value: number,
    visible: boolean
}

enum Gamestate {
    On = "on",
    Off = "off",
    Prep = "prep",
    Over = "over"
}

const Patterns: React.FC = (): React.ReactElement => {

    const [cards, setCards] = useState<Card[]>([]);
    const [score, setScore] = useState<number>(0);
    const [hiScore, setHiScore] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<number>(10);
    const [gameState, setGameState] = useState<Gamestate>(Gamestate.Off);
    const [prepTime, setPrepTime] = useState<number>(difficulty * 1000);
    const [countdown, setCountdown] = useState<number>(difficulty);

    const handleClickOnCard = (clickedCard: Card): void => {
        if (gameState !== Gamestate.On) return;
        if (clickedCard.value === score + 1) {
            setScore(score + 1)
            const newCards = cards.map(card => {
                if (card.value === clickedCard.value) {
                    card.visible = true
                }
                return card
            });
            setCards(newCards);
        } else {
            setGameState(Gamestate.Off);
            if (score > hiScore) {
                setHiScore(score);
            }
            setGameState(Gamestate.Over)
        }
    }

    const handleDifficultyChange = (difficulty: number): void => {
        if (![Gamestate.Off, Gamestate.Over].includes(gameState)) return;
        setDifficulty(difficulty);
    }

    const handleStart = (): void => {
        if (![Gamestate.Off, Gamestate.Over].includes(gameState)) return;
        setGameState(Gamestate.Prep);
        prepCountdown();
        setScore(0);
        const newCards: Card[] = createAndShuffleCards();
        setCards(newCards)
        setTimeout(hideCards, prepTime / 2, newCards)
    }

    const createAndShuffleCards = (): Card[] => {
        const newCards: Card[] = [];
        for (let i = 1; i <= difficulty; i++) {
            newCards.push({ value: i, visible: true });
        };
        shuffleCards(newCards);
        return newCards;
    }

    const hideCards = (newCards: Card[]): void => {
        newCards.forEach((card, idx) => {
            setTimeout(() => {
                const hiddenCards = newCards.map(card => {
                    if (card.value === idx + 1) {
                        card.visible = false;
                        if (idx === newCards.length - 1) {
                            setGameState(Gamestate.On)
                        };
                    }
                    return card;
                });
                setCards(hiddenCards);
            }, (idx) * prepTime / difficulty / 2)
        })

    }

    const shuffleCards = (cards: Card[]): void => {
        for (let i = cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }
    }

    const prepCountdown = (): void => {
        setCountdown(difficulty);
        let countdownEnd: number = new Date().valueOf() + prepTime;
        let countdownInterval = setInterval(() => {
            let timeToEnd = countdownEnd - new Date().valueOf();
            if (timeToEnd <= 0.1) {
                clearInterval(countdownInterval)
            }
            setCountdown(timeToEnd / 1000);
        }, 100)
    }

    useEffect(() => {
        const newCards: Card[] = [];
        for (let i = 1; i <= difficulty; i++) {
            newCards.push({ value: i, visible: false })
        };
        setCards(newCards);
        setPrepTime(difficulty * 1000)
    }, [difficulty])

    return (
        <div className="mx-auto flex flex-wrap max-w-lg min-w-[400px] w-1/2  h-3/5 min-h-[600px]  bg-slate-100 rounded-lg shadow-xl shadow-slate-900 justify-center content-between my-auto p-3">
            <div className="flex flex-wrap w-full h-fit justify-center">
                <div className="flex flex-wrap justify-between w-full mb-3">
                    <div className="text-lg md:text-2xl basis-1/4">Patterns</div>
                    <div className="flex flex-wrap">
                        <div className="text-sm md:text-md w-full text-end">HiScore: {hiScore}</div>
                        <div className="text-sm md:text-md w-full text-end">Current score: {score}</div>
                    </div>
                </div>
                <div className="text-sm md:text-md w-full h-fit">1. Choose difficulty</div>
                <div className="text-sm md:text-md w-full h-fit">2. Press start</div>
                <div className="text-sm md:text-md w-full h-fit">3. Memorize numerical order</div>
                <div className="text-sm md:text-md w-full h-fit">4. Reveal cards in numerical order</div>
            </div>
            <div className="w-full flex flex-wrap h-fit">
                <div className="w-full flex flex-wrap justify-center">
                    <div className="w-full text-sm md:text-lg">Difficulty: {difficulty}</div>
                    <input type="range" min="10" max="20" value={difficulty}
                        onChange={(e) => handleDifficultyChange(Number(e.target.value))}
                        className="w-full bg-slate-300 rounded-lg appearance-none cursor-pointer my-3 accent-slate-900"
                    />
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
            <div className="flex justify-center items-center h-12 rounded-lg w-full">
                {
                    gameState === Gamestate.Off
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
            <div className="mx-auto flex flex-wrap w-full h-1/2  justify-center content-center my-auto">
                {
                    cards.map((card, idx) => {
                        return <button key={idx} className={`flex items-center justify-center basis-1/6 m-1 h-1/6 ${card.visible ? "bg-slate-900" : "bg-slate-300"} hover:cursor-pointer`}
                            onClick={() => handleClickOnCard(card)}
                        >
                            <p className={`text-center text-white text-3xl`}>
                                {card.visible ? card.value : null}
                            </p>
                        </button>
                    })
                }
            </div>
        </div>
    );
}

export default Patterns;
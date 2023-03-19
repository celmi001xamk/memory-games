import { useEffect, useState } from "react";

interface Card {
    value: number,
    visible: boolean
}

const Patterns: React.FC = (): React.ReactElement => {

    const [cards, setCards] = useState<Card[]>([]);
    const [score, setScore] = useState<number>(0);
    const [hiScore, setHiScore] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<number>(10);
    const [gameState, setGameState] = useState<string>("off");

    const handleClickOnCard = (clickedCard: Card): void => {
        if (gameState !== "on") return;
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
            setGameState("off");
            if (score > hiScore) {
                setHiScore(score);
            }
            alert("Incorrect! Start over!")
        }
    }

    const handleDifficultyChange = (difficulty: number): void => {
        if (gameState !== "off") return;
        setDifficulty(difficulty);
    }

    const handleStart = (): void => {
        if (gameState !== "off") return;
        setGameState("prep");
        setScore(0);
        const newCards: Card[] = createAndShuffleCards();
        setCards(newCards)
        setTimeout(hideCards, difficulty * 500, newCards)
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
                            setGameState("on")
                        };
                    }
                    return card;
                });
                setCards(hiddenCards);
            }, idx * 500)
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

    useEffect(() => {
        const newCards: Card[] = [];
        for (let i = 1; i <= difficulty; i++) {
            newCards.push({ value: i, visible: false })
        };
        setCards(newCards);
    }, [difficulty])

    return (
        <div className="mx-auto flex flex-wrap max-w-lg w-1/2 h-3/5  bg-slate-100 rounded-lg shadow-xl shadow-slate-900 justify-center content-between my-auto p-3">
            <div className="flex flex-wrap w-full h-1/4 justify-center">
                <div className="flex flex-wrap justify-between w-full mb-3">
                    <div className="text-lg md:text-2xl basis-1/4">Patterns</div>
                    <div className="flex flex-wrap">
                        <div className="text-sm md:text-md w-full text-end">HiScore: {hiScore}</div>
                        <div className="text-sm md:text-md w-full text-end">Current score: {score}</div>
                    </div>
                </div>
                <div className="text-sm md:text-md w-full justify-self-start">1. Choose difficulty</div>
                <div className="text-sm md:text-md w-full justify-self-start">2. Press start</div>
                <div className="text-sm md:text-md w-full justify-self-start">3. Memorize numerical order</div>
                <div className="text-sm md:text-md w-full justify-self-start">4. Reveal cards in numerical order</div>
            </div>
            <div className="w-full flex flex-wrap h-1/4">
                <div className="w-full flex flex-wrap justify-center">
                    <div className="w-full text-sm md:text-lg">Difficulty: {difficulty}</div>
                    <input type="range" min="10" max="20" value={difficulty}
                        onChange={(e) => handleDifficultyChange(Number(e.target.value))}
                        className="w-full bg-slate-300 rounded-lg appearance-none cursor-pointer my-3 accent-slate-900"
                    />
                </div>
                <button
                    className="w-full bg-slate-900 hover:bg-slate-200 hover:text-slate-900 hover:shadow-slate-900 hover:shadow-md rounded-lg my-3 h-10 text-lg md:text-xl text-white shadow-lg shadow-slate-200"
                    onClick={() => handleStart()}>
                    Start
                </button>

            </div>
            <div className="mx-auto flex flex-wrap w-full h-1/2  justify-center content-center my-auto">
                {
                    cards.map((card, idx) => {
                        return <div key={idx} className={`flex items-center justify-center basis-1/6 m-1 h-1/6 ${card.visible ? "bg-slate-900" : "bg-slate-300"} hover:cursor-pointer`}
                            onClick={() => handleClickOnCard(card)}
                        >
                            <p className={`text-center text-white text-3xl`}>
                                {card.visible ? card.value : null}
                            </p>
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default Patterns;
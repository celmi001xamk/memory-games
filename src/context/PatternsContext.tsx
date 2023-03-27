import React, { createContext, useEffect, useState } from 'react';

export const PatternsContext: React.Context<any> = createContext(undefined);

interface Props {
    children: React.ReactNode;
}

export interface Card {
    value: number,
    visible: boolean
}

export enum Gamestate {
    On = "on",
    Off = "off",
    Prep = "prep",
    Over = "over"
}

export const PatternsProvider: React.FC<Props> = (props: Props): React.ReactElement => {

    const [cards, setCards] = useState<Card[]>([]);
    const [score, setScore] = useState<number>(0);
    const [hiScore, setHiScore] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<number>(9);
    const [gameState, setGameState] = useState<Gamestate>(Gamestate.Off);
    const [prepTime, setPrepTime] = useState<number>(difficulty * 1000);
    const [countdown, setCountdown] = useState<number>(difficulty);

    useEffect(() => {
        const newCards: Card[] = [];
        for (let i = 1; i <= 9; i++) {
            newCards.push({ value: i, visible: false })
        };
        setCards(newCards);
        if (localStorage.getItem("patternsHiscore")) {
            setHiScore(Number(localStorage.getItem("patternsHiscore")));
        }
    }, [])

    const handleClickOnCard = (clickedCard: Card): void => {
        if (gameState !== Gamestate.On) return;
        if (clickedCard.value === score + 1) {
            setScore(prev => prev + 1)
            const newCards = cards.map(card => {
                if (card.value === clickedCard.value) {
                    card.visible = true
                }
                return card
            });
            setCards(newCards);
            if (score + 1 === difficulty) {
                setGameState(Gamestate.Over)
                if (score >= hiScore) {
                    const newHiscore = score + 1;
                    setHiScore(newHiscore);
                    localStorage.setItem("patternsHiscore", String(newHiscore));
                }
            }
        } else {
            setGameState(Gamestate.Off);
            if (score > hiScore) {
                localStorage.setItem("patternsHiscore", String(score));
                setHiScore(score);
            }
            setGameState(Gamestate.Over)
        }
    }

    const handleDifficultyChange = (newDifficulty: number): void => {
        if (![Gamestate.Off, Gamestate.Over].includes(gameState)) return;
        setScore(0);
        setGameState(Gamestate.Off)
        setDifficulty(newDifficulty);
        const newCards: Card[] = [];
        for (let i = 1; i <= newDifficulty; i++) {
            newCards.push({ value: i, visible: false })
        };
        setCards(newCards);
        setPrepTime(newDifficulty * 1000)
    };

    const handleStart = (): void => {
        if (![Gamestate.Off, Gamestate.Over].includes(gameState)) return;
        setGameState(Gamestate.Prep);
        prepCountdown();
        setScore(0);
        const newCards: Card[] = createAndShuffleCards();
        setCards(newCards)
        setTimeout(hideCards, prepTime / 2, newCards)
    };

    const createAndShuffleCards = (): Card[] => {
        const newCards: Card[] = [];
        for (let i = 1; i <= difficulty; i++) {
            newCards.push({ value: i, visible: true });
        };
        shuffleCards(newCards);
        return newCards;
    };

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

    };

    const shuffleCards = (cards: Card[]): void => {
        for (let i = cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }
    };

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
    };

    return (
        <PatternsContext.Provider value={{
            cards,
            setCards,
            score,
            setScore,
            hiScore,
            setHiScore,
            difficulty,
            setDifficulty,
            gameState,
            setGameState,
            prepTime,
            setPrepTime,
            countdown,
            setCountdown,
            handleDifficultyChange,
            handleStart,
            handleClickOnCard
        }}>
            {props.children}
        </PatternsContext.Provider>
    )
}
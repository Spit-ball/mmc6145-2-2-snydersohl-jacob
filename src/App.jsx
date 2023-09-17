import React, { useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [bestTime, setBestTime] = useState(0);
  const [previousTime, setPreviousTime] = useState(0);

  const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer();

  const cardTexts = [
    "Bunny 🐰",
    "Frog 🐸",
    "Panda 🐼",
    "Doggy 🐶",
    "Kitty 😺",
    "Duck 🦆",
  ];

  function onGameStart() {
    timerStart();
  }

  function onGameEnd() {
    timerStop();
    setPreviousTime(time);
    timerReset();
    if (time < bestTime || bestTime === 0) {
      setBestTime(time);
    }
    return;
  }

  function onGameRestart() {
    timerReset();
  }

  return (
    <>
      <Header
        // add time, bestTime, previousTime props
        time={time}
        bestTime={bestTime}
        previousTime={previousTime}
        openModal={() => setShowModal(true)}
      />
      <CardGame
        // add onGameStart, onGameEnd props
        onGameStart={onGameStart}
        onGameEnd={onGameEnd}
        onGameRestart={onGameRestart}
        cardTexts={cardTexts}
      />
      <Modal isShown={showModal} close={() => setShowModal(false)} />
    </>
  );
}

import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { GameContext } from "./context/GameContext";
import { GameContextInterface } from "./models/game-state";

import { Image } from './models/image'
import { CardList } from "./components/CardList/CardList";
import { Modal } from "./components/Modal/Modal";
import { Button } from "./components/Button/Button";
import styles from './App.module.scss'

const IMAGE_AMOUNT = 8
const API_KEY = process.env.REACT_APP_API_KEY as string
const API_URL = `https://api.nasa.gov/planetary/apod?thumbs=True&count=${IMAGE_AMOUNT}&api_key=${API_KEY}`

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { isFinished, attempts, reset } = useContext(GameContext) as GameContextInterface;

  function fetchImages() {
    axios.get<Image[]>(API_URL)
      .then(res => {
        if (res.statusText !== 'OK') {
          throw new Error('Failed to fetch images!')
        }
        setImages(res.data)
      })
      .catch(err => {
        alert(err.message)
      })
  }

  function handleCloseModal() {
    setShowModal(false)
  }
  
  function handleStartGame() {
    reset()
    setShowModal(false)
    fetchImages()
  }

  useEffect(() => {
    let timer: NodeJS.Timer
    if (isFinished) {
      timer = setTimeout(() => {
        setShowModal(true)
      }, 1000);
    }
    return () => clearTimeout(timer)
  }, [isFinished])
  
  return (
    <main className={styles.container}>
      {!!images.length ? (
        <>
          <CardList images={images} />
          {isFinished && (
            <div className={styles.startWrapper}>
              <Button 
                text="New game"
                variant="confirm"
                onClick={handleStartGame} 
              />
            </div>
          )}
        </>
      ) : (  
        <div className={styles.startWrapper}>
          <Button 
            text="Start game"
            variant="confirm"
            onClick={handleStartGame} 
          />
        </div>
      )}
      {showModal && (
        <Modal
          heading="You did it!"
          body={[`You finished the game in ${attempts} attempts.`, 'Try again?']}
          cta={{
            text: "Start new game",
            onClick: handleStartGame
          }}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}

export default App;

import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { GameContext } from "./context/GameContext";
import { GameContextInterface } from "./models/game-state";

import { Image } from './models/image'
import { CardList } from "./components/CardList/CardList";
import { Modal } from "./components/Modal/Modal";

const IMAGE_AMOUNT = 8
const API_KEY = process.env.REACT_APP_API_KEY as string
const API_URL = `https://api.nasa.gov/planetary/apod?thumbs=True&count=${IMAGE_AMOUNT}&api_key=${API_KEY}`

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const { isFinished, attempts } = useContext(GameContext) as GameContextInterface;

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
  
  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <div>
      {/* click button to play // load images */}
      <CardList images={images} />
      <Modal>
        <p>Finished: {isFinished.toString()}</p>
        <p>{attempts} attempts</p>
      </Modal>
    </div>
  );
}

export default App;

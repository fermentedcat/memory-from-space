import axios from "axios";
import { useEffect, useState } from "react";
import { Image } from './models/image'
import { CardList } from "./components/CardList/CardList";

const IMAGE_AMOUNT = 8
const API_KEY = process.env.REACT_APP_API_KEY as string
const API_URL = `https://api.nasa.gov/planetary/apod?count=${IMAGE_AMOUNT}&api_key=${API_KEY}`

function App() {
  const [images, setImages] = useState<Image[]>([]);
  
  useEffect(() => {
    axios.get<Image[]>(API_URL)
      .then(res => {
        if (res.statusText !== 'OK') {
          throw new Error('Failed to fetch images!')
        }
        setImages([...res.data, ...res.data])
      })
      .catch(err => {
        alert(err.message)
      })
  }, [])

  return (
    <div>
      {/* click button to play // load images */}
      <CardList images={images} />
    </div>
  );
}

export default App;

import React, { useState, useEffect, useRef } from 'react'
import styles from './CardList.module.scss'
import { Image } from '../../models/image'
import { Card } from '../Card/Card'
import { shuffle } from 'lodash'
import { MemoryCard } from '../../models/memory-card'

interface CardListProps {
  images: Image[]
}

export const CardList: React.FC<CardListProps> = ({ images }) => {
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [isFlippingBack, setIsFlippingBack] = useState<boolean>(false)
  const timer = useRef<NodeJS.Timer>()
  
  useEffect(() => {
    const firstSet = images.map(image => new MemoryCard(image))
    const secondSet = images.map(image => new MemoryCard(image))
    setCards(shuffle([...firstSet, ...secondSet]))
  }, [images])
  
  function cardFlipHandler(index: number) {
    const prevFlippedIndex = cards.findIndex(card => card.isFlipped)
    const isFlippable = !cards[index].isMatched && !cards[index].isFlipped

    if (isFlippingBack) {
      finishFlipBack()
      isFlippable && flipCard(index)
      return
    }
    if (!isFlippable) {
      return
    }
    
    // flip clicked card
    flipCard(index)
    
    // check for matched cards
    if (checkIsMatchable(index, prevFlippedIndex)) {
      const isMatch = checkIsMatch(index, prevFlippedIndex)

      if (isMatch) {
        setMatchedCards(index, prevFlippedIndex)
        unFlipCards()
        return
      }

      setIsFlippingBack(true)
      timer.current = setTimeout(() => {
        unFlipCards()
        setIsFlippingBack(false)
      }, 1300);
    }
  }


  function finishFlipBack() {
    timer.current && clearTimeout(timer.current)
    unFlipCards()
    setIsFlippingBack(false)
  }
  
  function checkIsMatchable(index1: number, index2: number) {
    return !cards[index1].isFlipped && index2 >= 0
  }

  function checkIsMatch(index1: number, index2: number) {
    return cards[index1].url === cards[index2].url
  }

  function setMatchedCards(index1: number, index2: number) {
    setCards(prevState => {
      prevState[index1].isMatched = true
      prevState[index2].isMatched = true
      return [...prevState]
    })
  }

  function flipCard(index: number) {
    setCards(prevState => {
      prevState[index].isFlipped = true
      return [...prevState]
    })
  }

  function unFlipCards() {
    setCards(prevState => {
      return prevState.map(card => {
        return {
          ...card,
          isFlipped: false  
        }
      })
    })
  }

  useEffect(() => {
    return () => {
      timer.current && clearTimeout(timer.current)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      {cards.map((card, index) => (
        <Card 
          key={index} 
          card={card}
          onFlip={cardFlipHandler.bind(null, index)}
        />
      ))}
    </div>
  )
}

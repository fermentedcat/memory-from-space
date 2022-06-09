import React from 'react'
import { MemoryCard } from '../../models/memory-card'
import styles from './Card.module.scss'

interface CardProps {
  card: MemoryCard
  onFlip: () => void
}

export const Card: React.FC<CardProps> = ({ card, onFlip }) => {
  return (
    <button 
      onClick={onFlip}
      title={card.title}
      style={{ backgroundImage: card.isFlipped || card.isMatched ? `url(${card.url})` : 'none'}} 
      className={styles.wrapper}>
      {/* {image.title} */}
    </button>
  )
}

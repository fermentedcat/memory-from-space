import React from 'react'
import { motion } from 'framer-motion'
import { MemoryCard } from '../../models/memory-card'
import styles from './Card.module.scss'

interface CardProps {
  card: MemoryCard
  onFlip: () => void
}

export const Card: React.FC<CardProps> = ({ card, onFlip }) => {
  const { title, url, isFlipped, isMatched } = card
  const transition = {
    rotateY: {
      type: 'spring',
      mass: 1.7,
      stiffness: 50,
      duration: 0.5
    },
    opacity: { 
      delay: .2,
      stiffness: isFlipped ? 50 : 100,
      duration: .1
    }
  }

  return (
    <button
      onClick={onFlip}
      className={styles.wrapper}
      aria-label='Flip card'
    >
      <motion.div 
        className={styles.front}
        initial={{ rotateY: '-180deg' }}
        animate={{ 
          rotateY: isFlipped || isMatched ? '0deg' : '-180deg'
        }}
        transition={transition}
        >
          <div 
            title={title}
            className={styles.inner}
            style={{ backgroundImage: `url(${url})`}} 
          >
          </div>
      </motion.div>

      <motion.div 
        className={styles.back}
        initial={{ rotateY: '0deg' }}
        animate={{
          rotateY: isFlipped || isMatched ? '180deg' : '0deg', 
          opacity: isFlipped || isMatched ? 0 : 1
        }}
        transition={transition}
        >
          <div className={styles.inner}>
          </div>
      </motion.div>
    </button>
  )
}

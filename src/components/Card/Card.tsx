import React from 'react'
import { Image } from '../../models/image'
import styles from './Card.module.scss'

interface CardProps {
  image: Image
}

export const Card: React.FC<CardProps> = ({ image }) => {
  return (
    <button 
      title={image.title}
      style={{ backgroundImage: `url(${image.url})`}} 
      className={styles.wrapper}>
      {/* {image.title} */}
    </button>
  )
}

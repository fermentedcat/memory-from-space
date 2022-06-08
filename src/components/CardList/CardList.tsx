import React from 'react'
import styles from './CardList.module.scss'
import { Image } from '../../models/image'
import { Card } from '../Card/Card'
import { shuffle } from 'lodash'

interface CardListProps {
  images: Image[]
}

export const CardList: React.FC<CardListProps> = ({ images }) => {
  const shuffled = shuffle(images)
  return (
    <div className={styles.wrapper}>
      {shuffled.map(image => (
        <Card image={image} />
      ))}
    </div>
  )
}

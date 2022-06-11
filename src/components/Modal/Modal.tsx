import React from 'react'
import { Button } from '../Button/Button'
import styles from './Modal.module.scss'

interface ModalProps {
  heading?: string
  body?: string[]
  cta?: {
    text: string,
    onClick: () => void
  }
  onClose: () => void
  children?: React.ReactElement[]
}

export const Modal: React.FC<ModalProps> = ({ 
  heading, 
  body, 
  cta,
  onClose,
  children 
}) => {
  return (
    <>
    <div className={styles.backdrop}></div>
    <div className={styles.wrapper}>
      <aside className={styles.modal}>
        <div className={styles.mainContent}>
          {heading && <h1>{heading}</h1>}
          {body && body.map((text, index) => {
            return <p key={index}>{text}</p>
          })}
          {children && children}
        </div>
        <div className={styles.actions}>
          {cta && <Button text={cta.text} variant="confirm" onClick={cta.onClick} />}
          <Button text="Close" variant={cta ? "cancel" : "confirm"} onClick={onClose} />
        </div>
      </aside>
    </div>
    </>
  )
}

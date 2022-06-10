import React from 'react'
import { Button } from '../Button/Button'
import styles from './Modal.module.scss'

interface ModalProps {
  heading?: string
  body?: string[]
  cta?: React.ReactElement[]
  onClose?: () => void
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
        {cta && (
          <div className={styles.actions}>
            {cta}
          </div>
        )}
        {onClose && (
          <div className={styles.actions}>
            <Button text="Close" variant="confirm" onClick={onClose} />
          </div>
        )}
      </aside>
    </div>
    </>
  )
}

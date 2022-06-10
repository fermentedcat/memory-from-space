import React from 'react'
import styles from './Button.module.scss'

type ButtonVariantType = 'cancel' | 'close' | 'confirm' | 'icon'


type ButtonProps = {
  text?: string
  ariaLabel?: string
  disabled?: boolean
  variant: ButtonVariantType
  children?: React.ReactElement
  onClick: () => void
}

export const Button: React.FC<ButtonProps> = ({ text = '', onClick = () => {}, disabled, variant, ariaLabel, children }) => {
  return (
    <button 
      className={`${styles.button} ${styles[variant]}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || ''}
    >
      {text && text}
      {children && children}
    </button>
  )
}
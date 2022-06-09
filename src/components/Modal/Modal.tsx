import React from 'react'

interface ModalProps {
  children: React.ReactElement[]
}

export const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}

import React from 'react'
import './MinusButton.scss'

interface Props {
  onClick: () => void
  className: string
}

export default function MinusButton({ onClick, className }: Props) {
  return (
    <button className={`minus-button ${className}`} onClick={onClick}>
      <span className="horizontal-bar"></span>
    </button>
  )
}

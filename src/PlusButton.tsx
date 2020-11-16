import React from 'react'
import './PlusButton.scss'

interface Props {
  onClick: () => void
  size: "large" | "small"
}

export default function PlusButton({ onClick, size }: Props) {
  return (
    <button className={`plus-button ${size}`} onClick={onClick}>
      <span className="vertical-bar"></span>
      <span className="horizontal-bar"></span>
    </button>
  )
}

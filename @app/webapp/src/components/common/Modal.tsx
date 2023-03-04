import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

type Props = {
  children: any
  onClose: () => void
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  height: 90%;
  width: 90%;
  overflow-y: auto;
`

const ModalCloseButton = styled.button`
  position: absolute;
  top: 7%;
  right: 8%;
  background: none;
  border: none;
  font-size: 3em;
  cursor: pointer;
  color: ${({ theme }) => theme.color.grayscale[1]};
`

export const Modal = ({ children, onClose }: Props) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const handleOverlayClick = (event: any) => {
    if (event.target === modalRef.current) {
      onClose()
    }
  }
  return (
    <ModalOverlay ref={modalRef} onClick={handleOverlayClick}>
      <ModalContent>
        <ModalCloseButton onClick={onClose}>&times;</ModalCloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  )
}

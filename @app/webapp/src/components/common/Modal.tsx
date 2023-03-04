import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
/* lightTheme used here because modal uses the same colors despite dark/light mode */
import { lightTheme } from '@styles/theme'

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
  position: relative;
  background-color: ${() => lightTheme.color.grayscale[7]};
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  height: 90%;
  overflow-y: auto;
  min-width: 80%;
  & > * {
    color: ${() => lightTheme.color.grayscale[2]};
  }
  @media (min-width: ${({ theme }) => theme.breakpoint.mobileMedium}) {
    min-width: 60%;
    max-width: 60%;
  }
  @media (min-width: ${({ theme }) => theme.breakpoint.mobileLarge}) {
    min-width: 40%;
    max-width: 40%;
  }
`

const ModalCloseButton = styled.button`
  position: absolute;
  top: 3%;
  right: 5%;
  background: none;
  border: none;
  font-size: 3em;
  cursor: pointer;
  color: ${() => lightTheme.color.grayscale[2]};
`

export const Modal = ({ children, onClose }: Props) => {
  const modalRef = useRef(null)

  /* Allow modal to be closed with Esc key */
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

  /* Allow modal to be closed when clicking on overlay */
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

import { useEffect } from 'react'

/*
  Number of components currently holding the lock. Overlays are reference
  counted so that the document is only unlocked once the last one has closed.
*/
let lockCount = 0
let savedScrollY = 0
const savedBodyStyle = {
  position: '',
  top: '',
  left: '',
  right: '',
}

const lockDocument = () => {
  const { body } = document
  savedScrollY = window.scrollY
  savedBodyStyle.position = body.style.position
  savedBodyStyle.top = body.style.top
  savedBodyStyle.left = body.style.left
  savedBodyStyle.right = body.style.right

  /*
    `overflow: hidden` on the body is ignored by iOS Safari, so the body is
    pinned instead and offset by the current scroll position to keep the page
    looking exactly as it did. Taking the body out of flow also removes the
    document scrollbar, so its width is reserved with `right` to stop the
    centered layout from sliding sideways as the modal opens.
  */
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  body.style.position = 'fixed'
  body.style.top = `-${savedScrollY}px`
  body.style.left = '0'
  body.style.right = `${scrollbarWidth}px`
}

const unlockDocument = () => {
  const { body } = document
  body.style.position = savedBodyStyle.position
  body.style.top = savedBodyStyle.top
  body.style.left = savedBodyStyle.left
  body.style.right = savedBodyStyle.right
  window.scrollTo(0, savedScrollY)
}

/**
 * Prevents the document behind an overlay from scrolling while `enabled` is
 * true, restoring the previous scroll position once it is released.
 */
export function useScrollLock(enabled: boolean = true): void {
  useEffect(() => {
    if (!enabled) return

    lockCount += 1
    if (lockCount === 1) {
      lockDocument()
    }

    return () => {
      lockCount -= 1
      if (lockCount === 0) {
        unlockDocument()
      }
    }
  }, [enabled])
}

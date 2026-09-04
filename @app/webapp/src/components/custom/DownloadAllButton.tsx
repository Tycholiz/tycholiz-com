import JSZip from 'jszip'
import styled from 'styled-components'
import { useState } from 'react'
import { Song } from '@types'

type Props = {
  songs: Song[]
}

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-left: auto;
  padding: 0.6em 1.2em;
  border: none;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.primary[0]};
  color: ${({ theme }) => theme.color.background};
  font-weight: bold;
  font-size: 0.9em;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.color.primary[1]};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`

const sanitizeFilename = (name: string) => name.replace(/[/\\?%*:|"<>]/g, '-')

const getFileExtension = (url: string) => {
  const match = /\.([a-zA-Z0-9]+)(?:\?.*)?$/.exec(url)
  return match ? match[1] : 'mp3'
}

export const DownloadAllButton: React.FC<Props> = ({ songs }) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleDownloadAll = async () => {
    setIsDownloading(true)
    setProgress(0)

    try {
      const zip = new JSZip()
      const usedNames = new Set<string>()

      for (let i = 0; i < songs.length; i++) {
        const song = songs[i]
        if (song.audioFileUrl) {
          const response = await fetch(song.audioFileUrl)
          const blob = await response.blob()

          let filename = `${sanitizeFilename(song.title)}.${getFileExtension(
            song.audioFileUrl
          )}`
          if (usedNames.has(filename)) {
            filename = `${sanitizeFilename(song.title)}-${i + 1}.${getFileExtension(
              song.audioFileUrl
            )}`
          }
          usedNames.add(filename)

          zip.file(filename, blob)
        }
        setProgress(i + 1)
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(zipBlob)

      const link = document.createElement('a')
      link.href = url
      link.download = 'kyle-tycholiz-music.zip'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } finally {
      setIsDownloading(false)
      setProgress(0)
    }
  }

  return (
    <Button onClick={handleDownloadAll} disabled={isDownloading || songs.length === 0}>
      {isDownloading ? `Downloading ${progress}/${songs.length}...` : 'Download All'}
    </Button>
  )
}

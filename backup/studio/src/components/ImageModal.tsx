import React, {useState, useEffect, useCallback} from 'react'
import {Card, Stack, Text, Button, Flex, Box} from '@sanity/ui'
import {CloseIcon, ExpandIcon} from '@sanity/icons'
import {useClient} from 'sanity'

interface Asset {
  _id: string
  title: string
  type: 'folder' | 'image'
  slug: {current: string}
  parentFolder?: {_ref: string; title: string}
  image?: any
  color?: string
}

interface ImageModalProps {
  asset: Asset | null
  isOpen: boolean
  onClose: () => void
}

export function ImageModal({asset, isOpen, onClose}: ImageModalProps) {
  const client = useClient()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Get high-resolution image URL
  useEffect(() => {
    if (!asset?.image?.asset?._ref || !isOpen) {
      setImageUrl(null)
      return
    }

    setIsLoading(true)
    setImageError(false)

    // Get the image asset details
    const getImageUrl = async () => {
      try {
        const imageAsset = await client.fetch(
          `*[_type == "sanity.imageAsset" && _id == $assetId][0]`,
          {assetId: asset.image.asset._ref}
        )

        if (imageAsset?.url) {
          // Get high-quality version
          const highResUrl = `${imageAsset.url}?w=2000&h=2000&fit=max&auto=format`
          setImageUrl(highResUrl)
        } else {
          setImageError(true)
        }
      } catch (error) {
        console.error('Error fetching image:', error)
        setImageError(true)
      } finally {
        setIsLoading(false)
      }
    }

    getImageUrl()
  }, [asset, isOpen, client])

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false)
        } else {
          onClose()
        }
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, isFullscreen, onClose])

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev)
  }, [])

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (isFullscreen) {
        setIsFullscreen(false)
      } else {
        onClose()
      }
    }
  }, [isFullscreen, onClose])

  if (!isOpen || !asset) {
    return null
  }

  return (
    <>
      {/* Modal Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isFullscreen ? '0' : '20px',
          transition: 'all 0.3s ease'
        }}
        onClick={handleBackdropClick}
      >
        {/* Modal Content */}
        <div
          style={{
            position: 'relative',
            maxWidth: isFullscreen ? '100vw' : '90vw',
            maxHeight: isFullscreen ? '100vh' : '90vh',
            width: isFullscreen ? '100vw' : 'auto',
            height: isFullscreen ? '100vh' : 'auto',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--card-bg-color)',
            borderRadius: isFullscreen ? '0' : '8px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease'
          }}
        >
          {/* Header */}
          <Card padding={3} tone="transparent" style={{
            borderBottom: '1px solid var(--card-border-color)',
            flexShrink: 0
          }}>
            <Flex align="center" justify="space-between">
              <Stack space={1}>
                <Text weight="medium" size={2}>{asset.title}</Text>
                <Text size={1} muted>
                  {asset.image?.alt || 'No description available'}
                </Text>
              </Stack>
              
              <Flex gap={2}>
                <Button
                  icon={ExpandIcon}
                  mode="ghost"
                  tone="default"
                  onClick={toggleFullscreen}
                  title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  text={isFullscreen ? 'Exit' : 'Fullscreen'}
                />
                <Button
                  icon={CloseIcon}
                  mode="ghost"
                  tone="critical"
                  onClick={onClose}
                  title="Close"
                />
              </Flex>
            </Flex>
          </Card>

          {/* Image Container */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isFullscreen ? '0' : '20px',
              backgroundColor: 'var(--card-bg2-color)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {isLoading && (
              <Stack space={3} style={{textAlign: 'center'}}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid var(--card-border-color)',
                    borderTop: '3px solid var(--card-accent-fg-color)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto'
                  }}
                />
                <Text muted>Loading high-resolution image...</Text>
              </Stack>
            )}

            {imageError && (
              <Stack space={3} style={{textAlign: 'center'}}>
                <Text size={2} style={{color: 'var(--card-critical-fg-color)'}}>Failed to load image</Text>
                <Text size={1} muted>The image could not be displayed</Text>
              </Stack>
            )}

            {imageUrl && !isLoading && !imageError && (
              <img
                src={imageUrl}
                alt={asset.image?.alt || asset.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: isFullscreen ? '0' : '4px',
                  boxShadow: isFullscreen ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onError={() => setImageError(true)}
                draggable={false}
              />
            )}
          </div>

          {/* Footer with image info */}
          {!isFullscreen && imageUrl && (
            <Card padding={3} tone="transparent" style={{
              borderTop: '1px solid var(--card-border-color)',
              flexShrink: 0
            }}>
              <Flex align="center" justify="space-between">
                <Text size={1} muted>
                  Click and drag to move • Press ESC to close
                </Text>
                <Text size={1} muted>
                  High resolution view
                </Text>
              </Flex>
            </Card>
          )}
        </div>
      </div>

      {/* CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
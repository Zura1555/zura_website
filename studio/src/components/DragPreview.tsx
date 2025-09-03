import React, { useState, useEffect, useRef } from 'react'
import { Card } from '@sanity/ui'
import './DragPreview.css'

interface DragPreviewProps {
  imageUrl: string | null
  isVisible: boolean
  title: string
}

export function DragPreview({ imageUrl, isVisible, title }: DragPreviewProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isVisible) return

    const handleMouseMove = (e: MouseEvent) => {
      // Position the preview at the cursor with a slight offset
      setPosition({
        x: e.clientX + 10,
        y: e.clientY - 40
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('dragover', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('dragover', handleMouseMove)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div
      ref={previewRef}
      className="drag-preview"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 10000,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <Card
        padding={0}
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
          border: '2px solid var(--card-accent-fg-color)',
          backgroundColor: 'var(--card-bg-color)'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--card-bg2-color)',
            position: 'relative'
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '6px'
              }}
              draggable={false}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--card-muted-bg-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--card-muted-fg-color)',
                fontSize: '12px',
                textAlign: 'center',
                padding: '4px'
              }}
            >
              {title.substring(0, 8)}...
            </div>
          )}
          
          {/* Drag indicator overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              borderRadius: '6px'
            }}
          />
        </div>
      </Card>
    </div>
  )
}

// Hook to manage drag preview state
export function useDragPreview() {
  const [dragPreview, setDragPreview] = useState<{
    isVisible: boolean
    imageUrl: string | null
    title: string
  }>({ isVisible: false, imageUrl: null, title: '' })

  const showPreview = (imageUrl: string | null, title: string) => {
    setDragPreview({ isVisible: true, imageUrl, title })
  }

  const hidePreview = () => {
    setDragPreview({ isVisible: false, imageUrl: null, title: '' })
  }

  return {
    dragPreview,
    showPreview,
    hidePreview
  }
}
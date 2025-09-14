import React, {useState, useRef, useCallback, useContext} from 'react'
import {Card, Flex, Text, Box, Button, MenuButton, Menu, MenuItem} from '@sanity/ui'
import {ImageIcon, DragHandleIcon, EditIcon, TrashIcon, EllipsisHorizontalIcon} from '@sanity/icons'
import {useClient} from 'sanity'
import {DragPreview, useDragPreview} from './DragPreview'

interface Asset {
  _id: string
  title: string
  type: 'folder' | 'image'
  slug: {current: string}
  parentFolder?: {_ref: string; title: string}
  image?: any
  color?: string
}

interface InteractiveImageProps {
  asset: Asset
  onClick?: (asset: Asset) => void
  onDragStart?: (asset: Asset) => void
  onDragEnd?: () => void
  isDragOver?: boolean
  onEdit?: (asset: Asset) => void
  onDelete?: (asset: Asset) => void
}

export function InteractiveImage({
  asset,
  onClick,
  onDragStart,
  onDragEnd,
  isDragOver = false,
  onEdit,
  onDelete
}: InteractiveImageProps) {
  const client = useClient()
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)
  const { dragPreview, showPreview, hidePreview } = useDragPreview()

  // Load thumbnail image
  React.useEffect(() => {
    if (!asset.image?.asset?._ref) {
      setThumbnailUrl(null)
      return
    }

    const getThumbnailUrl = async () => {
      try {
        const imageAsset = await client.fetch(
          `*[_type == "sanity.imageAsset" && _id == $assetId][0]`,
          {assetId: asset.image.asset._ref}
        )

        if (imageAsset?.url) {
          // Get optimized thumbnail
          const thumbUrl = `${imageAsset.url}?w=300&h=200&fit=crop&auto=format`
          setThumbnailUrl(thumbUrl)
        } else {
          setImageError(true)
        }
      } catch (error) {
        console.error('Error fetching thumbnail:', error)
        setImageError(true)
      }
    }

    getThumbnailUrl()
  }, [asset.image?.asset?._ref, client])

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isDragging && onClick) {
      onClick(asset)
    }
  }, [asset, onClick, isDragging])

  const handleDragStart = useCallback((e: React.DragEvent) => {
    setIsDragging(true)
    
    // Set drag data
    e.dataTransfer.setData('application/json', JSON.stringify({
      type: 'asset',
      asset: asset
    }))
    
    // Set drag effect
    e.dataTransfer.effectAllowed = 'move'
    
    // Hide the default drag image by creating an invisible one
    const invisibleImg = new Image()
    invisibleImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='
    e.dataTransfer.setDragImage(invisibleImg, 0, 0)
    
    // Show our custom drag preview
    showPreview(thumbnailUrl, asset.title)
    
    if (onDragStart) {
      onDragStart(asset)
    }
  }, [asset, onDragStart, thumbnailUrl, showPreview])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
    hidePreview()
    if (onDragEnd) {
      onDragEnd()
    }
  }, [onDragEnd, hidePreview])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  return (
    <>
      <Card
      ref={dragRef}
      padding={0}
      tone={isDragOver ? 'primary' : 'transparent'}
      style={{
        cursor: isDragging ? 'grabbing' : 'pointer',
        border: `2px solid ${isDragOver ? 'var(--card-accent-fg-color)' : 'var(--card-border-color)'}`,
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        transform: isDragging ? 'scale(0.95)' : isHovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isHovered ? '0 8px 25px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
        opacity: isDragging ? 0.7 : 1
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '160px',
          backgroundColor: 'var(--card-bg2-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Action Menu Overlay */}
        {isHovered && (onEdit || onDelete) && (
          <div
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              zIndex: 2
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <MenuButton
              button={<Button mode="ghost" icon={EllipsisHorizontalIcon} tone="default" style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white'}} />}
              id="image-actions"
              menu={
                <Menu>
                  {onEdit && (
                    <MenuItem
                      text="Edit"
                      icon={EditIcon}
                      onClick={() => onEdit(asset)}
                    />
                  )}
                  {onDelete && (
                    <MenuItem
                      text="Delete"
                      icon={TrashIcon}
                      tone="critical"
                      onClick={() => onDelete(asset)}
                    />
                  )}
                </Menu>
              }
            />
          </div>
        )}

        {/* Click to View Overlay */}
        {isHovered && (
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '8px',
              zIndex: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: '4px',
              padding: '4px 8px',
              color: 'white',
              fontSize: '11px',
              fontWeight: '500'
            }}
          >
            Click to view
          </div>
        )}

        {/* Image or Placeholder */}
        {imageError || !thumbnailUrl ? (
          <Box style={{
            color: 'var(--card-muted-fg-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}>
            <ImageIcon style={{fontSize: '2rem'}} />
            <Text size={1} muted>No preview</Text>
          </Box>
        ) : (
          <img
            src={thumbnailUrl}
            alt={asset.image?.alt || asset.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.2s ease'
            }}
            onError={() => setImageError(true)}
            draggable={false}
          />
        )}
      </div>

      {/* Image Info */}
      <div style={{padding: '12px'}}>
        <Flex align="center" gap={2}>
          <div style={{flex: 1, minWidth: 0}}>
            <Text
              weight="medium"
              size={1}
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {asset.title}
            </Text>
            {asset.image?.alt && (
              <Text
                size={0}
                muted
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  marginTop: '2px'
                }}
              >
                {asset.image.alt}
              </Text>
            )}
          </div>
          
          {/* Visual drag indicator */}
          <Box style={{
            color: 'var(--card-muted-fg-color)',
            opacity: isHovered ? 1 : 0.5,
            transition: 'opacity 0.2s ease'
          }}>
            <DragHandleIcon style={{fontSize: '14px'}} />
          </Box>
        </Flex>
      </div>
    </Card>
    
    {/* Custom drag preview */}
    <DragPreview
      imageUrl={dragPreview.imageUrl}
      isVisible={dragPreview.isVisible}
      title={dragPreview.title}
    />
    </>
  )
}
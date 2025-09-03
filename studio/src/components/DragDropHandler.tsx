import React, {useState, useCallback} from 'react'
import {useClient} from 'sanity'
import {Card, Flex, Text, Box} from '@sanity/ui'
import {FolderIcon, CheckmarkIcon, CloseIcon} from '@sanity/icons'
import './DragDropHandler.css'

interface Asset {
  _id: string
  title: string
  type: 'folder' | 'image'
  slug: {current: string}
  parentFolder?: {_ref: string; title: string}
  image?: any
  color?: string
}

interface DragDropHandlerProps {
  children: React.ReactNode
  onAssetMoved?: () => void
}

interface DropZoneProps {
  targetFolder: Asset | null
  onDrop: () => void
  children: React.ReactNode
  isActive?: boolean
}

export function DragDropHandler({children, onAssetMoved}: DragDropHandlerProps) {
  const client = useClient()
  const [isMoving, setIsMoving] = useState(false)
  const [moveResult, setMoveResult] = useState<{success: boolean; message: string} | null>(null)

  const moveAssetToFolder = useCallback(async (asset: Asset, targetFolderId: string | null) => {
    setIsMoving(true)
    setMoveResult(null)

    try {
      // Prepare the update data
      const updateData: any = {
        _id: asset._id,
        _type: 'asset'
      }

      if (targetFolderId) {
        updateData.parentFolder = {
          _type: 'reference',
          _ref: targetFolderId
        }
      } else {
        // Moving to root - unset parentFolder
        updateData.parentFolder = undefined
      }

      // Update the asset
      await client.patch(asset._id).set(updateData).commit()

      setMoveResult({
        success: true,
        message: `Moved "${asset.title}" successfully`
      })

      // Notify parent component to refresh
      if (onAssetMoved) {
        onAssetMoved()
      }

    } catch (error) {
      console.error('Error moving asset:', error)
      setMoveResult({
        success: false,
        message: `Failed to move "${asset.title}"`
      })
    } finally {
      setIsMoving(false)
      
      // Clear result after 3 seconds
      setTimeout(() => {
        setMoveResult(null)
      }, 3000)
    }
  }, [client, onAssetMoved])

  const checkCircularReference = useCallback(async (draggedFolderId: string, targetFolderId: string | null): Promise<boolean> => {
    if (!targetFolderId) return false // Moving to root is always safe
    
    // Check if target folder is the same as dragged folder
    if (draggedFolderId === targetFolderId) return true
    
    try {
      // Get the complete hierarchy of the target folder to check for circular reference
      const query = `*[_type == "asset" && _id == $targetId][0]{
        _id,
        parentFolder->{
          _id,
          parentFolder->{
            _id,
            parentFolder->{
              _id,
              parentFolder->{
                _id,
                parentFolder->{
                  _id
                }
              }
            }
          }
        }
      }`
      
      const targetFolder = await client.fetch(query, { targetId: targetFolderId })
      
      // Check if dragged folder appears anywhere in the target's parent chain
      let current = targetFolder
      while (current) {
        if (current._id === draggedFolderId) {
          return true // Circular reference detected
        }
        current = current.parentFolder
      }
      
      return false
    } catch (error) {
      console.error('Error checking circular reference:', error)
      return true // Err on the side of caution
    }
  }, [client])

  const handleDrop = useCallback(async (draggedAsset: Asset, targetFolder: Asset | null) => {
    if (!draggedAsset) return

    // Prevent dropping on self
    if (targetFolder && targetFolder._id === draggedAsset._id) {
      setMoveResult({
        success: false,
        message: 'Cannot move item into itself'
      })
      setTimeout(() => setMoveResult(null), 3000)
      return
    }

    // For folders, check for circular references
    if (draggedAsset.type === 'folder') {
      const hasCircularRef = await checkCircularReference(draggedAsset._id, targetFolder?._id || null)
      if (hasCircularRef) {
        setMoveResult({
          success: false,
          message: 'Cannot create circular folder reference'
        })
        setTimeout(() => setMoveResult(null), 3000)
        return
      }
    }

    moveAssetToFolder(draggedAsset, targetFolder?._id || null)
  }, [moveAssetToFolder, checkCircularReference])

  // Context for drag and drop
function DragDropContext({children, onDrop}: {children: React.ReactNode, onDrop: (draggedAsset: Asset, targetFolder: Asset | null) => void}) {
  const [draggedAsset, setDraggedAsset] = useState<Asset | null>(null)

  return (
    <DragContext.Provider value={{draggedAsset, setDraggedAsset, onDrop}}>
      {children}
    </DragContext.Provider>
  )
}

return (
    <DragDropContext onDrop={handleDrop}>
      <div style={{position: 'relative'}}>
        {children}

        {/* Move status notification */}
        {(isMoving || moveResult) && (
          <div
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 10000,
              maxWidth: '300px'
            }}
          >
            <Card
              padding={3}
              tone={moveResult?.success ? 'positive' : moveResult?.success === false ? 'critical' : 'default'}
              style={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                border: '1px solid var(--card-border-color)'
              }}
            >
              <Flex align="center" gap={3}>
                {isMoving && (
                  <div
                    className="spinner"
                    style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid var(--card-border-color)',
                      borderTop: '2px solid var(--card-accent-fg-color)',
                      borderRadius: '50%'
                    }}
                  />
                )}
                {moveResult?.success && <CheckmarkIcon />}
                {moveResult?.success === false && <CloseIcon />}
                
                <Text size={1} weight="medium">
                  {isMoving ? 'Moving asset...' : moveResult?.message}
                </Text>
              </Flex>
            </Card>
          </div>
        )}
      </div>
    </DragDropContext>
  )
}

// Create context for sharing drag state
const DragContext = React.createContext<{
  draggedAsset: Asset | null
  setDraggedAsset: (asset: Asset | null) => void
  onDrop: (draggedAsset: Asset, targetFolder: Asset | null) => void
} | null>(null)

export function DropZone({targetFolder, onDrop, children, isActive = false}: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const dragContext = React.useContext(DragContext)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'move'
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Only set drag over to false if we're actually leaving this element
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX
    const y = e.clientY
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsDragOver(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    const data = e.dataTransfer.getData('application/json')
    if (data && dragContext) {
      try {
        const {asset} = JSON.parse(data)
        dragContext.onDrop(asset, targetFolder)
        onDrop() // Call the refresh function
      } catch (error) {
        console.error('Error parsing drop data:', error)
      }
    }
  }, [onDrop, targetFolder, dragContext])

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={isDragOver ? 'drop-zone-active' : ''}
      style={{
        position: 'relative',
        transition: 'all 0.2s ease'
      }}
    >
      {children}
      
      {/* Drop indicator overlay */}
      {isDragOver && (
        <div
          className="drop-indicator"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            border: '2px dashed var(--card-accent-fg-color)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          <Card padding={3} tone="primary" style={{
            backgroundColor: 'var(--card-accent-fg-color)',
            color: 'white',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}>
            <Flex align="center" gap={2}>
              <FolderIcon />
              <Text size={1} weight="medium">
                Drop here to move to {targetFolder?.title || 'root folder'}
              </Text>
            </Flex>
          </Card>
        </div>
      )}
    </div>
  )
}
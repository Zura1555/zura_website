import React, {useState, useMemo} from 'react'
import {Card, Stack, Text, Button, Flex, Box, MenuButton, Menu, MenuItem} from '@sanity/ui'
import {ChevronLeftIcon, FolderIcon, ImageIcon, ChevronDownIcon, ChevronRightIcon, EditIcon, TrashIcon, EllipsisHorizontalIcon} from '@sanity/icons'
import {useClient} from 'sanity'
import {useEffect} from 'react'
import {InteractiveImage} from './InteractiveImage'
import {ImageModal} from './ImageModal'
import {DragDropHandler, DropZone} from './DragDropHandler'

interface Asset {
  _id: string
  title: string
  type: 'folder' | 'image'
  slug: {current: string}
  parentFolder?: {_ref: string; title: string}
  image?: any
  color?: string
}

interface AssetBrowserProps {
  onSelect?: (asset: Asset) => void
  searchQuery?: string
  refreshTrigger?: number
  onFolderChange?: (folderId: string | null) => void
  initialFolderId?: string | null
  filterByFolder?: string | null
}

interface BreadcrumbItem {
  id: string | null
  title: string
}

export function AssetBrowser({onSelect, searchQuery = '', refreshTrigger, onFolderChange}: AssetBrowserProps) {
  const client = useClient()
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([{id: null, title: 'Home'}])
  const [showMoreFolders, setShowMoreFolders] = useState(false)
  const [internalRefreshTrigger, setInternalRefreshTrigger] = useState(0)
  const [selectedImage, setSelectedImage] = useState<Asset | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch assets for current folder
  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true)
      try {
        const query = currentFolderId
          ? `*[_type == "asset" && parentFolder._ref == $folderId] | order(type desc, title asc)`
          : `*[_type == "asset" && !defined(parentFolder)] | order(type desc, title asc)`
        
        const result = await client.fetch(query, {folderId: currentFolderId})
        setAssets(result)
      } catch (error) {
        console.error('Error fetching assets:', error)
        setAssets([])
      } finally {
        setLoading(false)
      }
    }

    fetchAssets()
  }, [client, currentFolderId, refreshTrigger, internalRefreshTrigger])

  // Build breadcrumbs when folder changes
  useEffect(() => {
    const buildBreadcrumbs = async () => {
      if (!currentFolderId) {
        setBreadcrumbs([{id: null, title: 'Home'}])
        return
      }

      try {
        // Get the current folder and its ancestors
        const query = `*[_type == "asset" && _id == $folderId][0]{
          _id,
          title,
          parentFolder->{
            _id,
            title,
            parentFolder->{
              _id,
              title,
              parentFolder->{
                _id,
                title,
                parentFolder->{
                  _id,
                  title
                }
              }
            }
          }
        }`
        
        const folder = await client.fetch(query, {folderId: currentFolderId})
        
        if (folder) {
          const crumbs: BreadcrumbItem[] = [{id: null, title: 'Home'}]
          
          // Build breadcrumb chain from the folder hierarchy
          const buildChain = (folderData: any): BreadcrumbItem[] => {
            const chain: BreadcrumbItem[] = []
            let current = folderData
            
            while (current) {
              chain.unshift({id: current._id, title: current.title})
              current = current.parentFolder
            }
            
            return chain
          }
          
          const folderChain = buildChain(folder)
          setBreadcrumbs([...crumbs, ...folderChain])
        }
      } catch (error) {
        console.error('Error building breadcrumbs:', error)
      }
    }

    buildBreadcrumbs()
  }, [client, currentFolderId])

  // Filter assets based on search query (only within current folder)
  const filteredAssets = useMemo(() => {
    if (!searchQuery.trim()) return assets
    
    return assets.filter(asset => 
      asset.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [assets, searchQuery])

  // Separate folders and files
  const folders = filteredAssets.filter(asset => asset.type === 'folder')
  const files = filteredAssets.filter(asset => asset.type === 'image')

  // Handle folder navigation
  const navigateToFolder = (folderId: string) => {
    setCurrentFolderId(folderId)
    setShowMoreFolders(false)
    if (onFolderChange) {
      onFolderChange(folderId)
    }
  }

  const navigateToBreadcrumb = (breadcrumbId: string | null) => {
    setCurrentFolderId(breadcrumbId)
    setShowMoreFolders(false)
    if (onFolderChange) {
      onFolderChange(breadcrumbId)
    }
  }

  const goBack = () => {
    if (breadcrumbs.length > 1) {
      const parentBreadcrumb = breadcrumbs[breadcrumbs.length - 2]
      navigateToBreadcrumb(parentBreadcrumb.id)
    }
  }

  const handleUploadComplete = () => {
    // Refresh the asset list after upload
    setInternalRefreshTrigger(prev => prev + 1)
  }

  const handleImageClick = (image: Asset) => {
    setSelectedImage(image)
    setIsModalOpen(true)
  }

  const handleAssetMoved = () => {
    // Refresh the asset list after moving
    setInternalRefreshTrigger(prev => prev + 1)
  }

  const handleDeleteFolder = async (folderId: string, folderTitle: string) => {
    if (confirm(`Are you sure you want to delete the folder "${folderTitle}"? This action cannot be undone.`)) {
      try {
        await client.delete(folderId)
        setInternalRefreshTrigger(prev => prev + 1)
      } catch (error) {
        console.error('Error deleting folder:', error)
        alert('Failed to delete folder. Please try again.')
      }
    }
  }

  const handleEditFolder = (folder: Asset) => {
    // For now, we'll just show an alert. In a full implementation,
    // you would open an edit modal similar to CreateFolderModal
    const newTitle = prompt('Enter new folder name:', folder.title)
    if (newTitle && newTitle.trim() && newTitle.trim() !== folder.title) {
      updateFolderTitle(folder._id, newTitle.trim())
    }
  }

  const updateFolderTitle = async (folderId: string, newTitle: string) => {
    try {
      const slug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      
      await client
        .patch(folderId)
        .set({
          title: newTitle,
          slug: {
            current: slug,
            _type: 'slug'
          }
        })
        .commit()
      
      setInternalRefreshTrigger(prev => prev + 1)
    } catch (error) {
      console.error('Error updating folder:', error)
      alert('Failed to update folder. Please try again.')
    }
  }

  const handleDeleteImage = async (asset: Asset) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${asset.title}"? This action cannot be undone.`)
    
    if (!confirmDelete) return
    
    try {
      // Delete the asset document
      await client.delete(asset._id)
      
      // Also delete the actual image asset if it exists
      if (asset.image?.asset?._ref) {
        await client.delete(asset.image.asset._ref)
      }
      
      setInternalRefreshTrigger(prev => prev + 1)
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Failed to delete image. Please try again.')
    }
  }

  const handleEditImage = async (asset: Asset) => {
    const newTitle = window.prompt('Enter new title for the image:', asset.title)
    
    if (!newTitle || newTitle.trim() === '' || newTitle === asset.title) {
      return
    }
    
    try {
      await client
        .patch(asset._id)
        .set({
          title: newTitle.trim()
        })
        .commit()
      
      setInternalRefreshTrigger(prev => prev + 1)
    } catch (error) {
      console.error('Error updating image:', error)
      alert('Failed to update image. Please try again.')
    }
  }

  // Determine which folders to show
  const visibleFolders = showMoreFolders ? folders : folders.slice(0, 5)
  const hasMoreFolders = folders.length > 5

  const getFolderColor = (color?: string) => {
    const colors: Record<string, string> = {
      blue: '#3b82f6',
      green: '#10b981',
      yellow: '#f59e0b',
      red: '#ef4444',
      purple: '#8b5cf6',
      orange: '#f97316',
      gray: '#6b7280',
    }
    return colors[color || 'blue'] || colors.blue
  }

  if (loading) {
    return (
      <Card padding={4}>
        <Text>Loading assets...</Text>
      </Card>
    )
  }

  return (
    <DragDropHandler onAssetMoved={handleAssetMoved}>
      <Stack space={4}>
      {/* Breadcrumbs with Drag-and-Drop */}
      <Card padding={3} tone="transparent">
        <Flex align="center" gap={2}>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.id || 'root'}>
              {index > 0 && <Text size={1} muted> / </Text>}
              {index < breadcrumbs.length - 1 ? (
                <DropZone
                  targetFolder={crumb.id ? { _id: crumb.id, title: crumb.title, type: 'folder' as const, slug: { current: '' } } : null}
                  onDrop={handleAssetMoved}
                >
                  <Button
                    mode="bleed"
                    tone="default"
                    text={crumb.title}
                    onClick={() => navigateToBreadcrumb(crumb.id)}
                    style={{
                      transition: 'all 0.2s ease'
                    }}
                  />
                </DropZone>
              ) : (
                <Button
                  mode="bleed"
                  tone="primary"
                  text={crumb.title}
                  disabled
                />
              )}
            </React.Fragment>
          ))}
        </Flex>
      </Card>

      {/* Back button */}
      {currentFolderId && (
        <Card padding={3}>
          <Button
            icon={ChevronLeftIcon}
            text="Back"
            mode="ghost"
            onClick={goBack}
          />
        </Card>
      )}



      {/* Folders Section */}
      {folders.length > 0 && (
        <Stack space={3}>
          <Text weight="semibold" size={2}>Folders</Text>
          <Stack space={2}>
            {visibleFolders.map((folder) => (
              <DropZone
                key={folder._id}
                targetFolder={folder}
                onDrop={handleAssetMoved}
              >
                <Card
                  padding={3}
                  tone="transparent"
                  style={{
                    border: '1px solid var(--card-border-color)',
                  }}
                >
                  <Flex align="center" gap={3}>
                    <Box 
                      draggable
                      style={{
                        color: getFolderColor(folder.color),
                        cursor: 'grab',
                        flex: 1,
                        transition: 'opacity 0.2s ease'
                      }}
                      onDragStart={(e) => {
                        e.dataTransfer.setData('application/json', JSON.stringify({ asset: folder }))
                        e.dataTransfer.effectAllowed = 'move'
                        e.currentTarget.style.opacity = '0.5'
                      }}
                      onDragEnd={(e) => {
                        e.currentTarget.style.opacity = '1'
                      }}
                      onClick={(e) => {
                        // Only navigate if not dragging
                        if (!e.defaultPrevented) {
                          navigateToFolder(folder._id)
                        }
                      }}
                    >
                      <Flex align="center" gap={3}>
                        <FolderIcon />
                        <Text weight="medium">{folder.title}</Text>
                      </Flex>
                    </Box>
                    <MenuButton
                      button={<Button mode="bleed" icon={EllipsisHorizontalIcon} />}
                      id={`folder-menu-${folder._id}`}
                      menu={
                        <Menu>
                          <MenuItem
                            text="Edit"
                            icon={EditIcon}
                            onClick={() => handleEditFolder(folder)}
                          />
                          <MenuItem
                            text="Delete"
                            icon={TrashIcon}
                            tone="critical"
                            onClick={() => handleDeleteFolder(folder._id, folder.title)}
                          />
                        </Menu>
                      }
                    />
                  </Flex>
                </Card>
              </DropZone>
            ))}
            
            {hasMoreFolders && (
              <Button
                mode="ghost"
                tone="primary"
                icon={showMoreFolders ? ChevronDownIcon : ChevronRightIcon}
                text={showMoreFolders ? 'Show fewer folders' : `Show ${folders.length - 5} more folders`}
                onClick={() => setShowMoreFolders(!showMoreFolders)}
              />
            )}
          </Stack>
        </Stack>
      )}

      {/* Files Section */}
      {files.length > 0 && (
        <Stack space={3}>
          <Text weight="semibold" size={2}>Images</Text>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {files.map((file) => (
              <InteractiveImage
                key={file._id}
                asset={file}
                onClick={() => {
                  if (onSelect) {
                    onSelect(file)
                  } else {
                    handleImageClick(file)
                  }
                }}
                onEdit={handleEditImage}
                onDelete={handleDeleteImage}
              />
            ))}
          </div>
        </Stack>
      )}

      {/* Empty state */}
      {filteredAssets.length === 0 && (
        <DropZone
          targetFolder={null}
          onDrop={handleAssetMoved}
        >
          <Card padding={4} tone="transparent">
            <Text align="center" muted>
              {searchQuery ? 'No assets found matching your search.' : 'This folder is empty.'}
            </Text>
          </Card>
        </DropZone>
      )}
      </Stack>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          asset={selectedImage}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedImage(null)
          }}
        />
      )}
    </DragDropHandler>
  )
}
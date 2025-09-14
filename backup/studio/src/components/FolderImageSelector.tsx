import React, { useState, useCallback, forwardRef } from 'react'
import { Button, Dialog, Flex, Text, Select, Box } from '@sanity/ui'
import { set, unset } from 'sanity'
import { useClient } from 'sanity'
import { AssetBrowser } from './AssetBrowser'

interface Asset {
  _id: string
  _type: string
  title?: string
  type: 'folder' | 'image'
  parentFolder?: {
    _ref: string
  }
  image?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
}

const FolderImageSelector = forwardRef<HTMLDivElement, any>((props, ref) => {
  const { onChange, value } = props
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState<string | null>(value?.selectedFolder || null)
  const [folders, setFolders] = useState<Asset[]>([])
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const client = useClient()

  // Fetch folders on component mount
  React.useEffect(() => {
    const fetchFolders = async () => {
      try {
        const folderAssets = await client.fetch(`
          *[_type == "asset" && type == "folder"] {
            _id,
            title,
            type,
            parentFolder
          }
        `)
        setFolders(folderAssets)
      } catch (error) {
        console.error('Error fetching folders:', error)
      }
    }
    fetchFolders()
  }, [])

  const handleOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleSelect = useCallback(
    (asset: any) => {
      // Handle Asset type from AssetBrowser
      if (asset.type === 'image' && asset.image?.asset?._ref) {
        const imageValue = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset.image.asset._ref,
          },
          selectedFolder: selectedFolder || undefined,
        }
        onChange(set(imageValue))
        setIsOpen(false)
      }
    },
    [onChange, selectedFolder]
  )

  const handleRemove = useCallback(() => {
    onChange(unset())
  }, [onChange])

  const handleFolderChange = useCallback((folderId: string) => {
    setSelectedFolder(folderId === 'all' ? null : folderId)
    setRefreshTrigger(prev => prev + 1)
  }, [])

  const buildFolderOptions = () => {
    const options = [{ value: 'all', label: 'All Images' }]
    
    // Create a map for quick lookup
    const folderMap = new Map(folders.map(f => [f._id, f]))
    
    // Build hierarchical folder structure
    const buildHierarchy = (folderId: string, level = 0): string => {
      const folder = folderMap.get(folderId)
      if (!folder) return ''
      
      const indent = '  '.repeat(level)
      if (folder.parentFolder) {
        const parentHierarchy = buildHierarchy(folder.parentFolder._ref, level)
        return parentHierarchy ? `${parentHierarchy} > ${folder.title}` : `${indent}${folder.title}`
      }
      return `${indent}${folder.title}`
    }
    
    folders.forEach(folder => {
      const hierarchyLabel = buildHierarchy(folder._id)
      options.push({
        value: folder._id,
        label: hierarchyLabel || folder.title || 'Untitled Folder'
      })
    })
    
    return options
  }

  const getCurrentFolderName = () => {
    if (!selectedFolder) return 'All Images'
    const folder = folders.find(f => f._id === selectedFolder)
    return folder?.title || 'Selected Folder'
  }

  return (
    <div ref={ref}>
      <Flex direction="column" gap={3}>
        {/* Folder Selection */}
        <Box>
          <Text size={1} weight="medium" style={{ marginBottom: '8px', display: 'block' }}>
            Image Folder Scope
          </Text>
          <Select
            value={selectedFolder || 'all'}
            onChange={(event) => handleFolderChange(event.currentTarget.value)}
          >
            {buildFolderOptions().map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Box>

        {/* Current Selection Display */}
        {value?.asset && (
          <Box padding={3} style={{ border: '1px solid #e1e3e6', borderRadius: '4px' }}>
            <Text size={1}>Selected image from: {getCurrentFolderName()}</Text>
          </Box>
        )}

        {/* Action Buttons */}
        <Flex gap={2}>
          <Button
            text={value?.asset ? 'Change Image' : 'Select Image'}
            tone="primary"
            onClick={handleOpen}
          />
          {value?.asset && (
            <Button text="Remove" tone="critical" onClick={handleRemove} />
          )}
        </Flex>

        {/* Asset Selection Dialog */}
        {isOpen && (
          <Dialog
            header="Select Image"
            id="asset-selector"
            onClose={handleClose}
            width={4}
          >
            <Box padding={4}>
              <Text size={1} style={{ marginBottom: '16px', display: 'block' }}>
                Browsing: {getCurrentFolderName()}
              </Text>
              <AssetBrowser
                onSelect={handleSelect}
                searchQuery=""
                refreshTrigger={refreshTrigger}
                onFolderChange={() => {}} // We handle folder changes through the dropdown
                initialFolderId={selectedFolder}
                filterByFolder={selectedFolder}
              />
            </Box>
          </Dialog>
        )}
      </Flex>
    </div>
  )
})

FolderImageSelector.displayName = 'FolderImageSelector'

export default FolderImageSelector
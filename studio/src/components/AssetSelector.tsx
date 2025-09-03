import React, {useState, useCallback} from 'react'
import {Dialog, Card, Stack, Text, Button, Flex} from '@sanity/ui'
import {ImageIcon, CloseIcon} from '@sanity/icons'
import {AssetBrowser} from './AssetBrowser'
import {useClient} from 'sanity'
import {uuid} from '@sanity/uuid'
import {set, unset} from 'sanity'

interface Asset {
  _id: string
  title: string
  type: 'folder' | 'image'
  slug: {current: string}
  parentFolder?: {_ref: string; title: string}
  image?: any
  color?: string
}

interface AssetSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (asset: Asset) => void
  title?: string
}

export function AssetSelector({
  isOpen,
  onClose,
  onSelect,
  title = 'Select Asset'
}: AssetSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)

  const handleAssetSelect = useCallback((asset: Asset) => {
    if (asset.type === 'image') {
      onSelect(asset)
      onClose()
    }
  }, [onSelect, onClose])

  const handleFolderChange = useCallback((folderId: string | null) => {
    setCurrentFolderId(folderId)
  }, [])

  if (!isOpen) return null

  return (
    <Dialog
      id="asset-selector-dialog"
      onClose={onClose}
      width={5}
      header={
        <Card padding={3} tone="transparent">
          <Flex align="center" justify="space-between">
            <Flex align="center" gap={2}>
              <ImageIcon />
              <Text weight="semibold" size={2}>{title}</Text>
            </Flex>
            <Button
              icon={CloseIcon}
              mode="ghost"
              tone="critical"
              onClick={onClose}
              title="Close"
            />
          </Flex>
        </Card>
      }
    >
      <Card padding={4} style={{height: '70vh', overflow: 'hidden'}}>
        <Stack space={4} style={{height: '100%'}}>
          <Text size={1} muted>
            Browse and select an image from your asset library. Click on any image to select it.
          </Text>
          
          <div style={{flex: 1, overflow: 'auto'}}>
            <AssetBrowser
              onSelect={handleAssetSelect}
              searchQuery={searchQuery}
              refreshTrigger={refreshTrigger}
              onFolderChange={handleFolderChange}
            />
          </div>
        </Stack>
      </Card>
    </Dialog>
  )
}

// Custom input component for Sanity image fields
export function AssetSelectorInput(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const client = useClient()
  const {onChange, value, schemaType} = props

  const handleAssetSelect = useCallback(async (asset: Asset) => {
    if (asset.image?.asset?._ref) {
      // Create a proper Sanity image value
      const imageValue = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset.image.asset._ref
        },
        alt: asset.image.alt || asset.title,
        caption: asset.title
      }
      // Use Sanity's set patch operation
      onChange(set(imageValue))
    }
  }, [onChange])

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <>
      <Card padding={3} tone="transparent" border>
        <Stack space={3}>
          {value?.asset && (
            <div style={{
              width: '100%',
              height: '200px',
              backgroundColor: 'var(--card-bg2-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              borderRadius: '4px'
            }}>
              {value.asset._ref && (
                <img
                  src={`https://cdn.sanity.io/images/${client.config().projectId}/${client.config().dataset}/${value.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`}
                  alt={value.alt || 'Selected image'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              )}
            </div>
          )}
          
          <Flex gap={2}>
            <Button
              icon={ImageIcon}
              text={value?.asset ? 'Change Asset' : 'Select Asset'}
              tone="primary"
              onClick={handleOpenModal}
              style={{flex: 1}}
            />
            {value?.asset && (
              <Button
                text="Remove"
                tone="critical"
                mode="ghost"
                onClick={() => onChange(unset())}
              />
            )}
          </Flex>
          
          {value?.alt && (
            <Text size={1} muted>
              Alt text: {value.alt}
            </Text>
          )}
          {value?.caption && (
            <Text size={1} muted>
              Caption: {value.caption}
            </Text>
          )}
        </Stack>
      </Card>

      <AssetSelector
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelect={handleAssetSelect}
        title="Select Asset"
      />
    </>
  )
}
import React, {useState} from 'react'
import {
  Dialog,
  Card,
  Stack,
  Text,
  TextInput,
  Button,
  Flex,
  Box,
  Grid,
  Toast
} from '@sanity/ui'
import {FolderIcon, CheckmarkIcon} from '@sanity/icons'
import {useClient} from 'sanity'
import {uuid} from '@sanity/uuid'

interface CreateFolderModalProps {
  isOpen: boolean
  onClose: () => void
  currentFolderId?: string | null
  onFolderCreated?: () => void
}

const FOLDER_COLORS = [
  {name: 'Blue', value: 'blue', color: '#3b82f6'},
  {name: 'Green', value: 'green', color: '#10b981'},
  {name: 'Yellow', value: 'yellow', color: '#f59e0b'},
  {name: 'Red', value: 'red', color: '#ef4444'},
  {name: 'Purple', value: 'purple', color: '#8b5cf6'},
  {name: 'Orange', value: 'orange', color: '#f97316'},
  {name: 'Gray', value: 'gray', color: '#6b7280'},
]

export function CreateFolderModal({
  isOpen,
  onClose,
  currentFolderId,
  onFolderCreated
}: CreateFolderModalProps) {
  const client = useClient()
  const [folderName, setFolderName] = useState('')
  const [selectedColor, setSelectedColor] = useState('blue')
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!folderName.trim()) {
      setError('Folder name is required')
      return
    }

    setIsCreating(true)
    setError(null)

    try {
      // Generate slug from folder name
      const slug = folderName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

      // Create the folder document
      const folderDoc = {
        _type: 'asset',
        type: 'folder',
        title: folderName.trim(),
        slug: {
          current: slug,
          _type: 'slug'
        },
        color: selectedColor,
        ...(currentFolderId && {
          parentFolder: {
            _type: 'reference',
            _ref: currentFolderId
          }
        })
      }

      await client.create(folderDoc)
      
      // Reset form and close modal
      setFolderName('')
      setSelectedColor('blue')
      onClose()
      
      // Notify parent component to refresh
      if (onFolderCreated) {
        onFolderCreated()
      }
    } catch (error) {
      console.error('Error creating folder:', error)
      setError(error instanceof Error ? error.message : 'Failed to create folder')
    } finally {
      setIsCreating(false)
    }
  }

  const handleClose = () => {
    if (!isCreating) {
      setFolderName('')
      setSelectedColor('blue')
      setError(null)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <Dialog
      id="create-folder-modal"
      onClose={handleClose}
      width={1}
      style={{
        maxWidth: '500px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000
      }}
    >
      <Card padding={4}>
        <form onSubmit={handleSubmit}>
          <Stack space={4}>
            {/* Header */}
            <Flex align="center" gap={3}>
              <Box style={{color: FOLDER_COLORS.find(c => c.value === selectedColor)?.color}}>
                <FolderIcon style={{fontSize: '1.5rem'}} />
              </Box>
              <Text size={3} weight="semibold">Create New Folder</Text>
            </Flex>

            {/* Folder Name Input */}
            <Stack space={2}>
              <Text size={1} weight="medium">Folder Name</Text>
              <TextInput
                placeholder="Enter folder name..."
                value={folderName}
                onChange={(event) => {
                  setFolderName(event.currentTarget.value)
                  setError(null)
                }}
                disabled={isCreating}
                autoFocus
              />
            </Stack>

            {/* Color Selection */}
            <Stack space={2}>
              <Text size={1} weight="medium">Folder Color</Text>
              <Grid columns={7} gap={2}>
                {FOLDER_COLORS.map((color) => (
                  <Card
                    key={color.value}
                    padding={2}
                    tone={selectedColor === color.value ? 'primary' : 'transparent'}
                    style={{
                      cursor: 'pointer',
                      border: selectedColor === color.value 
                        ? '2px solid var(--card-accent-fg-color)' 
                        : '2px solid transparent',
                      borderRadius: '6px',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => setSelectedColor(color.value)}
                  >
                    <Flex direction="column" align="center" gap={1}>
                      <Box
                        style={{
                          width: '24px',
                          height: '24px',
                          backgroundColor: color.color,
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {selectedColor === color.value && (
                          <CheckmarkIcon style={{color: 'white', fontSize: '14px'}} />
                        )}
                      </Box>
                      <Text size={0} style={{textAlign: 'center'}}>
                        {color.name}
                      </Text>
                    </Flex>
                  </Card>
                ))}
              </Grid>
            </Stack>

            {/* Error Message */}
            {error && (
              <Card padding={3} tone="critical">
                <Text size={1} style={{color: 'var(--card-critical-fg-color)'}}>
                  {error}
                </Text>
              </Card>
            )}

            {/* Action Buttons */}
            <Flex gap={3} justify="flex-end">
              <Button
                text="Cancel"
                mode="ghost"
                onClick={handleClose}
                disabled={isCreating}
              />
              <Button
                text={isCreating ? 'Creating...' : 'Create Folder'}
                tone="primary"
                type="submit"
                disabled={isCreating || !folderName.trim()}
                loading={isCreating}
              />
            </Flex>
          </Stack>
        </form>
      </Card>
    </Dialog>
  )
}
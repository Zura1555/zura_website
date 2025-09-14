import React, {useState, useCallback, useRef} from 'react'
import {
  Dialog,
  Card,
  Stack,
  Text,
  Button,
  Flex,
  Box,
  Spinner
} from '@sanity/ui'
import {UploadIcon, LinkIcon, CloseIcon, CheckmarkIcon} from '@sanity/icons'
import {useClient} from 'sanity'
import {uuid} from '@sanity/uuid'

interface UploadFileModalProps {
  isOpen: boolean
  onClose: () => void
  currentFolderId?: string | null
  onUploadComplete?: () => void
}

interface UploadProgress {
  file: File
  progress: number
  status: 'uploading' | 'completed' | 'error'
  error?: string
  assetId?: string
}

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export function UploadFileModal({
  isOpen,
  onClose,
  currentFolderId,
  onUploadComplete
}: UploadFileModalProps) {
  const client = useClient()
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploads, setUploads] = useState<UploadProgress[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return `File type ${file.type} is not supported. Please use JPEG, PNG, GIF, WebP, or SVG.`
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File size ${(file.size / 1024 / 1024).toFixed(1)}MB exceeds the 10MB limit.`
    }
    return null
  }

  const uploadFile = async (file: File): Promise<void> => {
    const uploadId = uuid()
    
    // Add to uploads list
    setUploads(prev => [...prev, {
      file,
      progress: 0,
      status: 'uploading'
    }])

    try {
      // Upload the image asset to Sanity
      const imageAsset = await client.assets.upload('image', file, {
        filename: file.name
      })

      // Update progress to 50% after asset upload
      setUploads(prev => prev.map(upload => 
        upload.file === file ? {...upload, progress: 50} : upload
      ))

      // Create the asset document
      const title = file.name.replace(/\.[^/.]+$/, '') // Remove file extension
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      
      const assetDoc = {
        _type: 'asset',
        type: 'image',
        title,
        slug: {
          current: slug,
          _type: 'slug'
        },
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          },
          alt: title
        },
        ...(currentFolderId && {
          parentFolder: {
            _type: 'reference',
            _ref: currentFolderId
          }
        })
      }

      const createdAsset = await client.create(assetDoc)

      // Update progress to completed
      setUploads(prev => prev.map(upload => 
        upload.file === file ? {
          ...upload, 
          progress: 100, 
          status: 'completed',
          assetId: createdAsset._id
        } : upload
      ))

    } catch (error) {
      console.error('Upload error:', error)
      setUploads(prev => prev.map(upload => 
        upload.file === file ? {
          ...upload, 
          status: 'error',
          error: error instanceof Error ? error.message : 'Upload failed'
        } : upload
      ))
    }
  }

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    const validFiles: File[] = []
    const errors: string[] = []

    // Validate all files first
    fileArray.forEach(file => {
      const error = validateFile(file)
      if (error) {
        errors.push(`${file.name}: ${error}`)
      } else {
        validFiles.push(file)
      }
    })

    // Show validation errors
    if (errors.length > 0) {
      console.error('File validation errors:', errors)
    }

    if (validFiles.length === 0) return

    setIsUploading(true)

    // Upload files sequentially to avoid overwhelming the server
    for (const file of validFiles) {
      await uploadFile(file)
    }

    setIsUploading(false)
  }, [currentFolderId])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFiles(files)
    }
  }, [handleFiles])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFiles(files)
    }
    // Reset the input value so the same file can be selected again
    e.target.value = ''
  }, [handleFiles])

  const handleClose = () => {
    if (!isUploading) {
      setUploads([])
      setIsDragOver(false)
      onClose()
      
      // Call the completion callback to refresh the asset list
      if (onUploadComplete && uploads.some(u => u.status === 'completed')) {
        onUploadComplete()
      }
    }
  }

  const allCompleted = uploads.length > 0 && uploads.every(u => u.status === 'completed')
  const hasErrors = uploads.some(u => u.status === 'error')

  if (!isOpen) return null

  return (
    <Dialog
      id="upload-file-modal"
      onClose={handleClose}
      width={1}
      style={{
        maxWidth: 'min(540px, 95vw)',
        width: '100%',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000
      }}
    >
      <Card padding={3} style={{
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        <Stack space={3} style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '300px'
          }}>
          {/* Header */}
          <Text size={3} weight="semibold">Add File</Text>

          {/* Upload Area */}
          <Card
            padding={3}
            tone={isDragOver ? 'primary' : 'transparent'}
            style={{
              border: `2px dashed ${isDragOver ? 'var(--card-accent-fg-color)' : 'var(--card-border-color)'}`,
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flex: 1,
              minHeight: '140px'
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Flex 
              direction="column" 
              align="center" 
              justify="center" 
              gap={2} 
              style={{
                height: '100%',
                minHeight: '140px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Upload Icon */}
              <Flex gap={2} align="center" justify="center">
                <Box 
                  style={{
                    padding: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--card-muted-bg-color)',
                    color: 'var(--card-muted-fg-color)'
                  }}
                >
                  <UploadIcon style={{fontSize: '1.2rem'}} />
                </Box>
                <Box 
                  style={{
                    padding: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--card-muted-bg-color)',
                    color: 'var(--card-muted-fg-color)'
                  }}
                >
                  <LinkIcon style={{fontSize: '1.2rem'}} />
                </Box>
              </Flex>

              {/* Upload Text */}
              <Stack space={1} style={{textAlign: 'center', alignItems: 'center'}}>
                <Text weight="semibold" size={1}>
                  {isDragOver ? 'Drop a File Here' : 'Drag & Drop a File Here'}
                </Text>
                <Text size={0} muted>
                  Click to browse files
                </Text>
              </Stack>
            </Flex>
          </Card>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(',')}
            multiple
            style={{display: 'none'}}
            onChange={handleFileSelect}
          />

          {/* Upload Progress */}
          {uploads.length > 0 && (
            <Box style={{
              maxHeight: '60px',
              overflow: 'auto',
              border: '1px solid var(--card-border-color)',
              borderRadius: '4px',
              padding: '6px',
              flexShrink: 0
            }}>
              <Stack space={2}>
                {uploads.map((upload, index) => (
                  <Flex key={index} align="center" gap={2}>
                    <Box style={{
                      color: upload.status === 'completed' ? 'var(--card-positive-fg-color)' :
                             upload.status === 'error' ? 'var(--card-critical-fg-color)' :
                             'var(--card-muted-fg-color)'
                    }}>
                      {upload.status === 'uploading' && <Spinner />}
                      {upload.status === 'completed' && <CheckmarkIcon />}
                      {upload.status === 'error' && <CloseIcon />}
                    </Box>
                    
                    <Stack space={0} style={{flex: 1, minWidth: 0}}>
                      <Text size={0} weight="medium" style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {upload.file.name}
                      </Text>
                      {upload.status === 'uploading' && (
                        <Text size={0} muted>Uploading... {upload.progress}%</Text>
                      )}
                      {upload.status === 'completed' && (
                        <Text size={0} style={{color: 'var(--card-positive-fg-color)'}}>
                          Completed
                        </Text>
                      )}
                      {upload.status === 'error' && (
                        <Text size={0} style={{color: 'var(--card-critical-fg-color)'}}>
                          Error
                        </Text>
                      )}
                    </Stack>
                  </Flex>
                ))}
              </Stack>
            </Box>
          )}

          {/* Action Buttons */}
          <Flex gap={3} justify="flex-end" style={{flexShrink: 0, marginTop: 'auto'}}>
            <Button
              text="Cancel"
              mode="ghost"
              onClick={handleClose}
              disabled={isUploading}
            />
            <Button
              text={allCompleted ? 'Done' : isUploading ? 'Uploading...' : 'Done'}
              tone={hasErrors ? 'critical' : 'primary'}
              onClick={handleClose}
              disabled={isUploading}
            />
          </Flex>
        </Stack>
      </Card>
    </Dialog>
  )
}
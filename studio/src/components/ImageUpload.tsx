import React, {useState, useCallback, useRef} from 'react'
import {Card, Stack, Text, Button, Flex, Box, Spinner, Toast} from '@sanity/ui'
import {UploadIcon, ImageIcon, CheckmarkIcon, CloseIcon} from '@sanity/icons'
import {useClient} from 'sanity'
import {uuid} from '@sanity/uuid'

interface ImageUploadProps {
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

export function ImageUpload({currentFolderId, onUploadComplete}: ImageUploadProps) {
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
      // In a real implementation, you'd show these errors in a toast or alert
      console.error('File validation errors:', errors)
    }

    if (validFiles.length === 0) return

    setIsUploading(true)

    // Upload files sequentially to avoid overwhelming the server
    for (const file of validFiles) {
      await uploadFile(file)
    }

    setIsUploading(false)
    
    // Call the completion callback to refresh the asset list
    if (onUploadComplete) {
      onUploadComplete()
    }
  }, [currentFolderId, onUploadComplete])

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

  const clearCompletedUploads = () => {
    setUploads(prev => prev.filter(upload => upload.status !== 'completed'))
  }

  const removeUpload = (file: File) => {
    setUploads(prev => prev.filter(upload => upload.file !== file))
  }

  return (
    <Stack space={4}>
      {/* Upload Area */}
      <Card
        padding={4}
        tone={isDragOver ? 'primary' : 'transparent'}
        style={{
          border: `2px dashed ${isDragOver ? 'var(--card-accent-fg-color)' : 'var(--card-border-color)'}`,
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Flex direction="column" align="center" gap={3}>
          <Box style={{color: isDragOver ? 'var(--card-accent-fg-color)' : 'var(--card-muted-fg-color)'}}>
            <UploadIcon style={{fontSize: '2rem'}} />
          </Box>
          <Stack space={2} style={{textAlign: 'center'}}>
            <Text weight="medium" size={2}>
              {isDragOver ? 'Drop images here' : 'Upload Images'}
            </Text>
            <Text size={1} muted>
              Drag and drop images here, or click to select files
            </Text>
            <Text size={0} muted>
              Supports JPEG, PNG, GIF, WebP, SVG • Max 10MB per file
            </Text>
          </Stack>
          <Button
            text="Select Files"
            tone="primary"
            icon={ImageIcon}
            disabled={isUploading}
          />
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
        <Card padding={3} tone="transparent">
          <Stack space={3}>
            <Flex align="center" justify="space-between">
              <Text weight="medium" size={2}>Upload Progress</Text>
              {uploads.some(u => u.status === 'completed') && (
                <Button
                  text="Clear Completed"
                  mode="ghost"
                  tone="primary"
                  onClick={clearCompletedUploads}
                />
              )}
            </Flex>
            
            <Stack space={2}>
              {uploads.map((upload, index) => (
                <Card key={index} padding={3} tone="transparent" style={{
                  border: '1px solid var(--card-border-color)',
                  borderRadius: '4px'
                }}>
                  <Flex align="center" gap={3}>
                    <Box style={{
                      color: upload.status === 'completed' ? 'var(--card-positive-fg-color)' :
                             upload.status === 'error' ? 'var(--card-critical-fg-color)' :
                             'var(--card-muted-fg-color)'
                    }}>
                      {upload.status === 'uploading' && <Spinner />}
                      {upload.status === 'completed' && <CheckmarkIcon />}
                      {upload.status === 'error' && <CloseIcon />}
                    </Box>
                    
                    <Stack space={1} style={{flex: 1}}>
                      <Text size={1} weight="medium">{upload.file.name}</Text>
                      {upload.status === 'uploading' && (
                        <Text size={0} muted>Uploading... {upload.progress}%</Text>
                      )}
                      {upload.status === 'completed' && (
                        <Text size={0} style={{color: 'var(--card-positive-fg-color)'}}>
                          Upload completed
                        </Text>
                      )}
                      {upload.status === 'error' && (
                        <Text size={0} style={{color: 'var(--card-critical-fg-color)'}}>
                          {upload.error}
                        </Text>
                      )}
                    </Stack>
                    
                    {upload.status !== 'uploading' && (
                      <Button
                        icon={CloseIcon}
                        mode="bleed"
                        tone="critical"
                        onClick={() => removeUpload(upload.file)}
                      />
                    )}
                  </Flex>
                  
                  {upload.status === 'uploading' && (
                    <Box style={{
                      marginTop: '8px',
                      height: '4px',
                      backgroundColor: 'var(--card-border-color)',
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}>
                      <Box style={{
                        height: '100%',
                        width: `${upload.progress}%`,
                        backgroundColor: 'var(--card-accent-fg-color)',
                        transition: 'width 0.3s ease'
                      }} />
                    </Box>
                  )}
                </Card>
              ))}
            </Stack>
          </Stack>
        </Card>
      )}
    </Stack>
  )
}
import React, {useState} from 'react'
import {Card, Stack, TextInput, Box, Button, Flex} from '@sanity/ui'
import {SearchIcon, FolderIcon, UploadIcon} from '@sanity/icons'
import {AssetBrowser} from './AssetBrowser'
import {CreateFolderModal} from './CreateFolderModal'
import {UploadFileModal} from './UploadFileModal'
import type {StructureBuilder} from 'sanity/structure'

interface AssetListViewProps {
  // Props from Sanity's list view
  [key: string]: any
}

export function AssetListView(props: AssetListViewProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false)
  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  const handleFolderChange = (folderId: string | null) => {
    setCurrentFolderId(folderId)
  }

  return (
    <Card height="fill" tone="transparent">
      <Stack space={4} padding={4}>
        {/* Optimized Header - Action Buttons and Search in one row */}
        <Flex gap={3} align="center" justify="space-between">
          {/* Action Buttons */}
          <Flex gap={3}>
            <Button
              text="Create Folder"
              icon={FolderIcon}
              tone="primary"
              onClick={() => setIsCreateFolderModalOpen(true)}
            />
            <Button
              text="Upload File"
              icon={UploadIcon}
              tone="default"
              onClick={() => setIsUploadFileModalOpen(true)}
            />
          </Flex>

          {/* Search Input */}
          <Card padding={3} tone="transparent" style={{
            border: '1px solid var(--card-border-color)',
            borderRadius: '6px',
            minWidth: '300px',
            maxWidth: '400px',
            flex: 1,
            marginLeft: '16px'
          }}>
            <TextInput
              icon={SearchIcon}
              placeholder="Search in current folder..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.currentTarget.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none'
              }}
            />
          </Card>
        </Flex>

        {/* Asset Browser */}
        <Box style={{flex: 1, overflow: 'auto'}}>
          <AssetBrowser 
            searchQuery={searchQuery} 
            refreshTrigger={refreshTrigger}
            onFolderChange={handleFolderChange}
          />
        </Box>
      </Stack>

      {/* Modals */}
      <CreateFolderModal
        isOpen={isCreateFolderModalOpen}
        onClose={() => setIsCreateFolderModalOpen(false)}
        currentFolderId={currentFolderId}
        onFolderCreated={handleRefresh}
      />
      
      <UploadFileModal
        isOpen={isUploadFileModalOpen}
        onClose={() => setIsUploadFileModalOpen(false)}
        onUploadComplete={handleRefresh}
      />
    </Card>
  )
}

// Helper function to create the asset list structure
export function createAssetListStructure(S: StructureBuilder): any {
  return S.component(AssetListView).title('Assets')
}
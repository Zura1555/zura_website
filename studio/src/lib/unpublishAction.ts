import {UnpublishIcon} from '@sanity/icons'
import type {DocumentActionComponent} from 'sanity'
import {useDocumentOperation} from 'sanity'

// Custom unpublish action for documents
export const unpublishAction = (context: any): DocumentActionComponent => {
  return (props) => {
    const {draft, published, id, onComplete} = props
    const {unpublish} = useDocumentOperation(id, props.type)
    
    // Only show for published documents that don't have a draft
    if (!published || draft) {
      return null
    }
    
    return {
      label: 'Unpublish',
      icon: UnpublishIcon,
      disabled: Boolean(unpublish.disabled),
      onHandle: async () => {
        try {
          // Unpublish the document (moves it back to draft)
          unpublish.execute()
          
          // Call onComplete to refresh the document
          onComplete()
        } catch (error) {
          console.error('Failed to unpublish document:', error)
        }
      },
    }
  }
}
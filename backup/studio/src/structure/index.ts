import {CogIcon, DocumentTextIcon, EditIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'
import {createAssetListStructure} from '../components/AssetListView'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = ['settings', 'assist.instruction.context', 'asset', 'post', 'person', 'category']

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Posts organized by publication status
      S.listItem()
      .title('Posts')
      .icon(DocumentTextIcon)
      .child(
        S.list()
          .title('Posts')
          .items([
            S.listItem()
              .title('Published Posts')
              .icon(DocumentTextIcon)
              .child(
                S.documentList()
                  .title('Published Posts')
                  .filter('_type == "post" && defined(publishedAt)')
                  .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
              ),
            S.listItem()
              .title('Draft Posts')
              .icon(EditIcon)
              .child(
                S.documentList()
                  .title('Draft Posts')
                  .filter('_type == "post" && !defined(publishedAt)')
                  .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
              ),
          ])
      ),
      
      // Authors (Person documents)
      S.documentTypeListItem('person').title('Authors'),
      
      // Categories
      S.documentTypeListItem('category').title('Categories'),
      
      // Regular document types
      ...S.documentTypeListItems().filter(
        (listItem) => !DISABLED_TYPES.includes(listItem.getId()!)
      ),
      
      // Custom Asset Browser
      S.listItem()
        .title('Assets')
        .id('assets')
        .child(createAssetListStructure(S)),
      
      // Settings singleton
      S.listItem()
        .title('Settings')
        .id('settings')
        .icon(CogIcon)
        .child(S.document().schemaType('settings').documentId('siteSettings')),
    ])


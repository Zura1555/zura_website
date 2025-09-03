import {CogIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'
import {createAssetListStructure} from '../components/AssetListView'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = ['settings', 'assist.instruction.context', 'asset']

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Settings singleton
      S.listItem()
        .title('Settings')
        .id('settings')
        .icon(CogIcon)
        .child(S.document().schemaType('settings').documentId('siteSettings')),
      
      S.divider(),
      
      // Custom Asset Browser
      S.listItem()
        .title('Assets')
        .id('assets')
        .child(createAssetListStructure(S)),
      
      S.divider(),
      
      // Regular document types
      ...S.documentTypeListItems().filter(
        (listItem) => !DISABLED_TYPES.includes(listItem.getId()!)
      ),
    ])


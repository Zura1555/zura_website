import {ImageIcon, FolderIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Asset schema. Define and edit the fields for the 'asset' content type.
 * This document type supports both folders and images in a unified structure.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const asset = defineType({
  name: 'asset',
  title: 'Asset',
  icon: ImageIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Folder', value: 'folder'},
          {title: 'Image', value: 'image'},
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the asset to be referenced',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.image as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        }),
      ],
      hidden: ({document}) => document?.type === 'folder',
      validation: (rule) => {
        return rule.custom((image, context) => {
          if (context.document?.type === 'image' && !image) {
            return 'Image is required for image type assets'
          }
          return true
        })
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional description of the asset',
    }),
    defineField({
      name: 'parentFolder',
      title: 'Parent Folder',
      type: 'reference',
      to: [{type: 'asset'}],
      options: {
        filter: 'type == "folder"',
      },
      description: 'Select a parent folder to organize this asset',
      validation: (rule) => {
        return rule.custom((parentFolder, context) => {
          // Prevent self-reference
          if (parentFolder?._ref === context.document?._id) {
            return 'An asset cannot be its own parent'
          }
          return true
        })
      },
    }),
    defineField({
      name: 'color',
      title: 'Folder Color',
      type: 'string',
      options: {
        list: [
          {title: 'Blue', value: 'blue'},
          {title: 'Green', value: 'green'},
          {title: 'Yellow', value: 'yellow'},
          {title: 'Red', value: 'red'},
          {title: 'Purple', value: 'purple'},
          {title: 'Orange', value: 'orange'},
          {title: 'Gray', value: 'gray'},
        ],
        layout: 'radio',
      },
      initialValue: 'blue',
      description: 'Choose a color to help visually organize your folders',
      hidden: ({document}) => document?.type === 'image',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'Add tags to help categorize and search for assets',
    }),
  ],
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
    {
      title: 'Title Z-A',
      name: 'titleDesc',
      by: [{field: 'title', direction: 'desc'}],
    },
    {
      title: 'Created Date (Newest)',
      name: 'createdDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
    {
      title: 'Created Date (Oldest)',
      name: 'createdAsc',
      by: [{field: '_createdAt', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      media: 'image',
      parentFolder: 'parentFolder.title',
      color: 'color',
    },
    prepare({title, type, media, parentFolder, color}) {
      if (type === 'folder') {
        return {
          title,
          subtitle: parentFolder ? `Folder: ${parentFolder}` : 'Root folder',
          media: FolderIcon,
        }
      }
      
      return {
        title,
        subtitle: parentFolder ? `Folder: ${parentFolder}` : 'No folder',
        media: media || ImageIcon,
      }
    },
  },
})
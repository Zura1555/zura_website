import {defineField, defineType} from 'sanity'
import type {ValidationContext, Reference} from 'sanity'
import {TagIcon} from '@sanity/icons'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The display name of the category',
      validation: (rule) => rule.required().min(1).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly version of the title',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of what this category covers',
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color code for category styling (e.g., #3B82F6)',
      validation: (rule) => 
        rule.custom((color: string | undefined) => {
          if (!color) return true; // Optional field
          const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
          return hexPattern.test(color) || 'Please enter a valid hex color code (e.g., #3B82F6)';
        }),
      initialValue: '#6B7280',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Category',
      type: 'boolean',
      description: 'Mark this category as featured to highlight it',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      description: 'Optional image to represent this category',
      options: {
        hotspot: true,
      },
    }),
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      description: 'Search engine optimization settings',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title for search engines (50-60 characters)',
          validation: (rule: any) => rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'Description for search engines (150-160 characters)',
          validation: (rule: any) => rule.max(160),
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          description: 'SEO keywords for this category',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: 'parentCategory',
      title: 'Parent Category',
      type: 'reference',
      description: 'Optional parent category for hierarchical organization',
      to: [{type: 'category'}],
      validation: (rule: any) => 
        rule.custom((parent: Reference | undefined, context: ValidationContext) => {
          if (parent && context.document?._id === parent._ref) {
            return 'A category cannot be its own parent';
          }
          return true;
        }),
    },
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Number to control the display order (lower numbers appear first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      media: 'image',
      color: 'color',
    },
    prepare(selection) {
      const {title, description, media, color} = selection;
      return {
        title: title || 'Untitled Category',
        subtitle: description || 'No description',
        media: media,
      };
    },
  },
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
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
    {
      title: 'Created Date',
      name: 'createdAt',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],
})
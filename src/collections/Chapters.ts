import { CollectionConfig } from 'payload'
import { formatSlug } from '../utilities/formatSlug'

export const CourseChapterPageComponent: CollectionConfig = {
  slug: 'course-chapter-page-component',

  admin: {
    useAsTitle: 'title',
    group: 'Components',
    description: 'Controls all content and styling for the course chapter detail page layout.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
      admin: {
        description: 'Chapter title (used to auto-generate slug)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'URL path (e.g., "chapter-1-introduction")',
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
      index: true,
    },

    {
      name: 'course',
      type: 'relationship',
      relationTo: 'course-service-page-component',
      required: true,
      label: 'Parent Course',
      admin: {
        description: 'Select which course this chapter belongs to',
        position: 'sidebar',
      },
    },

    {
      name: 'order',
      type: 'number',
      required: true,
      label: 'Chapter Order',
      admin: {
        description: 'Controls chapter sequence inside the course',
        step: 1,
        position: 'sidebar',
      },
    },

    // ─── HERO SECTION ────────────────────────────────────────────────────────────
    {
      name: 'heroSection',
      type: 'group',
      label: 'Hero Section',
      admin: {
        description: 'Full-width hero with background image and course name heading.',
      },
      fields: [
        {
          name: 'courseName',
          type: 'text',
          label: 'Course Name (H1)',
          defaultValue: 'Course Name',
          admin: {
            description: 'Main heading displayed over the hero image',
          },
        },
        {
          name: 'courseNameColor',
          type: 'text',
          label: 'Course Name Color',
          defaultValue: '#ffffff',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
          admin: {
            description: 'Hero background image (recommended: 1920x1080px)',
          },
        },
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Background Fallback Color',
          defaultValue: '#081122',
          admin: {
            description: 'Shown when no background image is set (hex or rgba)',
          },
        },
        {
          name: 'overlayTopColor',
          type: 'text',
          label: 'Top Overlay Color',
          defaultValue: 'rgba(0, 0, 0, 0.45)',
          admin: {
            description: 'Semi-transparent overlay layered on top of background image',
          },
        },
        {
          name: 'overlayBottomColor',
          type: 'text',
          label: 'Bottom Overlay Color',
          defaultValue: 'rgba(0, 0, 0, 0.65)',
          admin: {
            description: 'Gradient overlay at the bottom of the hero (for fade effect)',
          },
        },
        {
          name: 'sectionBackgroundColor',
          type: 'text',
          label: 'Section Background Color',
          defaultValue: '#081122',
        },
        {
          name: 'minHeight',
          type: 'text',
          label: 'Hero Min Height',
          defaultValue: '480px',
          admin: {
            description: 'Minimum height of the hero section (e.g. 480px, 60vh)',
          },
        },
      ],
    },

    // ─── CHAPTER INFO SECTION ─────────────────────────────────────────────────────
    {
      name: 'chapterInfoSection',
      type: 'group',
      label: 'Chapter Info Section',
      admin: {
        description: 'Left sidebar feature items and all draggable content blocks.',
      },
      fields: [
        {
          name: 'sectionBackgroundColor',
          type: 'text',
          label: 'Section Background Color',
          defaultValue: '#ffffff',
        },
        {
          name: 'sectionTextColor',
          type: 'text',
          label: 'Section Default Text Color',
          defaultValue: '#081122',
        },
        {
          name: 'containerMaxWidth',
          type: 'text',
          label: 'Container Max Width',
          defaultValue: '1200px',
          admin: {
            description: 'Max width of the main content container',
          },
        },

        // ── LEFT SIDEBAR FEATURE ITEMS ─────────────────────────────────────────
        {
          name: 'featureItems',
          type: 'array',
          label: 'Feature Items (Left Sidebar)',
          minRows: 1,
          maxRows: 8,
          admin: {
            description: 'Drag to reorder. Each item shows an icon, a label, and a value.',
            initCollapsed: false,
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label (e.g. "Name", "Go to")',
              required: true,
            },
            {
              name: 'labelColor',
              type: 'text',
              label: 'Label Color',
              defaultValue: 'rgba(8, 17, 34, 0.64)',
            },
            {
              name: 'value',
              type: 'text',
              label: 'Value (e.g. "Chapter 1", "Next chapter")',
              required: true,
            },
            {
              name: 'valueColor',
              type: 'text',
              label: 'Value Color',
              defaultValue: '#081122',
            },
            {
              name: 'iconBackgroundColor',
              type: 'text',
              label: 'Icon Wrapper Background Color',
              defaultValue: '#f0f4ff',
            },
            {
              name: 'iconColor',
              type: 'text',
              label: 'Icon Color',
              defaultValue: '#081122',
            },
            {
              name: 'itemBackgroundColor',
              type: 'text',
              label: 'Item Background Color',
              defaultValue: 'transparent',
            },
            {
              name: 'itemBorderColor',
              type: 'text',
              label: 'Item Border Color',
              defaultValue: 'transparent',
            },
          ],
          defaultValue: [
            {
              label: 'Name',
              labelColor: 'rgba(8, 17, 34, 0.64)',
              value: 'Chapter 1',
              valueColor: '#081122',
              iconBackgroundColor: '#f0f4ff',
              iconColor: '#081122',
              itemBackgroundColor: 'transparent',
              itemBorderColor: 'transparent',
            },
            {
              label: 'Go to',
              labelColor: 'rgba(8, 17, 34, 0.64)',
              value: 'Next chapter',
              valueColor: '#081122',
              iconBackgroundColor: '#f0f4ff',
              iconColor: '#081122',
              itemBackgroundColor: 'transparent',
              itemBorderColor: 'transparent',
            },
          ],
        },

        // ── CONTENT BLOCKS (draggable: richText | video | image | ctaStory) ────
        {
          name: 'contentBlocks',
          type: 'array',
          label: 'Content Blocks',
          minRows: 1,
          admin: {
            description:
              'Drag to reorder. Choose block type: Rich Text, Video, Image, or CTA Story.',
            initCollapsed: false,
          },
          fields: [
            {
              name: 'blockType',
              type: 'select',
              label: 'Block Type',
              required: true,
              defaultValue: 'richText',
              options: [
                { label: 'Rich Text', value: 'richText' },
                { label: 'Video', value: 'video' },
                { label: 'Image', value: 'image' },
                { label: 'CTA Story', value: 'ctaStory' },
              ],
            },

            // ── RICH TEXT BLOCK ────────────────────────────────────────────────
            {
              name: 'richTextContent',
              type: 'richText',
              label: 'Rich Text Content',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'richText',
                description: 'Supports headings, paragraphs, bold, italic, lists, etc.',
              },
            },
            {
              name: 'richTextColor',
              type: 'text',
              label: 'Rich Text Color',
              defaultValue: '#081122',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'richText',
              },
            },
            {
              name: 'richTextBackgroundColor',
              type: 'text',
              label: 'Rich Text Block Background Color',
              defaultValue: 'transparent',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'richText',
              },
            },
            {
              name: 'richTextPaddingColor',
              type: 'text',
              label: 'Rich Text Block Border/Accent Color',
              defaultValue: 'transparent',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'richText',
                description: 'Optional left-border accent color for the text block',
              },
            },

            // ── VIDEO BLOCK ────────────────────────────────────────────────────
            
            {
              name: 'video',
              type: 'upload',
              relationTo: 'media',
              label: 'Video File',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'video',

                description: 'Upload video through Media collection (Cloudinary)',
              },
            },
            {
              name: 'videoCaption',
              type: 'text',
              label: 'Video Caption',
              defaultValue: 'Chapter 1 video',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'video',
              },
            },
            {
              name: 'videoCaptionColor',
              type: 'text',
              label: 'Video Caption Color',
              defaultValue: 'rgba(8, 17, 34, 0.88)',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'video',
              },
            },
            {
              name: 'videoContainerBackgroundColor',
              type: 'text',
              label: 'Video Container Background Color',
              defaultValue: '#f5f7fa',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'video',
              },
            },
            {
              name: 'videoBorderColor',
              type: 'text',
              label: 'Video Container Border Color',
              defaultValue: 'transparent',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'video',
              },
            },
            {
              name: 'videoAutoplay',
              type: 'checkbox',
              label: 'Autoplay Video',
              defaultValue: false,
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'video',
              },
            },
            {
              name: 'videoLoop',
              type: 'checkbox',
              label: 'Loop Video',
              defaultValue: false,
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'video',
              },
            },
            {
              name: 'videoMuted',
              type: 'checkbox',
              label: 'Muted by Default',
              defaultValue: true,
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'video',
              },
            },

            // ── IMAGE BLOCK ────────────────────────────────────────────────────
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Image',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'image',
              },
            },
            {
              name: 'imageAlt',
              type: 'text',
              label: 'Image Alt Text',
              defaultValue: '',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'image',
              },
            },
            {
              name: 'imageCaption',
              type: 'text',
              label: 'Image Caption',
              defaultValue: 'Image Caption',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'image',
              },
            },
            {
              name: 'imageCaptionColor',
              type: 'text',
              label: 'Image Caption Color',
              defaultValue: 'rgba(8, 17, 34, 0.88)',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'image',
              },
            },
            {
              name: 'imageContainerBackgroundColor',
              type: 'text',
              label: 'Image Container Background Color',
              defaultValue: '#f5f7fa',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'image',
              },
            },
            {
              name: 'imageBorderColor',
              type: 'text',
              label: 'Image Container Border Color',
              defaultValue: 'transparent',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'image',
              },
            },
            {
              name: 'imageObjectFit',
              type: 'select',
              label: 'Image Fit',
              defaultValue: 'cover',
              options: [
                { label: 'Cover', value: 'cover' },
                { label: 'Contain', value: 'contain' },
                { label: 'Fill', value: 'fill' },
              ],
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'image',
              },
            },

            // ── CTA STORY BLOCK ────────────────────────────────────────────────
            {
              name: 'ctaImage',
              type: 'upload',
              relationTo: 'media',
              label: 'CTA Person / Instructor Image',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'ctaStory',
                description: 'Profile or instructor image shown on the left of the CTA card',
              },
            },
            {
              name: 'ctaImageBackgroundColor',
              type: 'text',
              label: 'CTA Image Container Background',
              defaultValue: '#e8f0fe',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'ctaStory',
              },
            },
            {
              name: 'ctaEyebrowText',
              type: 'text',
              label: 'Eyebrow / Badge Text',
              defaultValue: 'Next chapter ( 2 )?',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'ctaStory',
                description: 'Small label with a dot shown above the heading',
              },
            },
            {
              name: 'ctaEyebrowTextColor',
              type: 'text',
              label: 'Eyebrow Text Color',
              defaultValue: '#081122',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'ctaStory',
              },
            },
            {
              name: 'ctaEyebrowDotColor',
              type: 'text',
              label: 'Eyebrow Dot Color',
              defaultValue: '#1a4db3',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'ctaStory',
                description: 'Color of the circular dot next to the eyebrow label',
              },
            },
            {
              name: 'ctaHeading',
              type: 'text',
              label: 'CTA Heading',
              defaultValue: "Let's start next chapter",
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'ctaStory',
              },
            },
            {
              name: 'ctaHeadingColor',
              type: 'text',
              label: 'CTA Heading Color',
              defaultValue: '#081122',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'ctaStory',
              },
            },
            {
              name: 'ctaDescription',
              type: 'textarea',
              label: 'CTA Description',
              defaultValue: 'Anna is here to guide you every step of the way.',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'ctaStory',
              },
            },
            {
              name: 'ctaDescriptionColor',
              type: 'text',
              label: 'CTA Description Color',
              defaultValue: 'rgba(8, 17, 34, 0.88)',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'ctaStory',
              },
            },
            {
              name: 'ctaLinks',
              type: 'array',
              label: 'CTA Links',
              minRows: 1,
              maxRows: 4,
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'ctaStory',
                description: 'Drag to reorder links shown in the CTA card.',
              },
              fields: [
                {
                  name: 'linkText',
                  type: 'text',
                  label: 'Link Text',
                  required: true,
                  defaultValue: 'Start chapter 2',
                },
                {
                  name: 'linkUrl',
                  type: 'text',
                  label: 'Link URL',
                  required: true,
                  defaultValue: '#',
                },
                {
                  name: 'linkTextColor',
                  type: 'text',
                  label: 'Link Text Color',
                  defaultValue: '#081122',
                },
                {
                  name: 'linkArrowColor',
                  type: 'text',
                  label: 'Link Arrow Icon Color',
                  defaultValue: '#081122',
                },
                {
                  name: 'linkBackgroundColor',
                  type: 'text',
                  label: 'Link Background Color',
                  defaultValue: 'transparent',
                },
                {
                  name: 'linkHoverBackgroundColor',
                  type: 'text',
                  label: 'Link Hover Background Color',
                  defaultValue: '#f0f4ff',
                },
                {
                  name: 'openInNewTab',
                  type: 'checkbox',
                  label: 'Open in New Tab',
                  defaultValue: false,
                },
              ],
              defaultValue: [
                {
                  linkText: 'Start chapter 2',
                  linkUrl: '#',
                  linkTextColor: '#081122',
                  linkArrowColor: '#081122',
                  linkBackgroundColor: 'transparent',
                  linkHoverBackgroundColor: '#f0f4ff',
                  openInNewTab: false,
                },
              ],
            },
            {
              name: 'ctaBackgroundColor',
              type: 'text',
              label: 'CTA Card Background Color',
              defaultValue: '#f5f7fa',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'ctaStory',
              },
            },
            {
              name: 'ctaBorderColor',
              type: 'text',
              label: 'CTA Card Border Color',
              defaultValue: '#e2e8f0',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'ctaStory',
              },
            },
          ],
          defaultValue: [
            {
              blockType: 'richText',
              richTextColor: '#081122',
              richTextBackgroundColor: 'transparent',
              richTextPaddingColor: 'transparent',
            },
            {
              blockType: 'video',
              videoUrl: '',
              videoCaption: 'Chapter 1 video',
              videoCaptionColor: 'rgba(8, 17, 34, 0.88)',
              videoContainerBackgroundColor: '#f5f7fa',
              videoBorderColor: 'transparent',
              videoAutoplay: false,
              videoLoop: false,
              videoMuted: true,
            },
            {
              blockType: 'richText',
              richTextColor: '#081122',
              richTextBackgroundColor: 'transparent',
              richTextPaddingColor: 'transparent',
            },
            {
              blockType: 'richText',
              richTextColor: '#081122',
              richTextBackgroundColor: 'transparent',
              richTextPaddingColor: 'transparent',
            },
            {
              blockType: 'image',
              imageAlt: 'Case study image',
              imageCaption: 'Image Caption',
              imageCaptionColor: 'rgba(8, 17, 34, 0.88)',
              imageContainerBackgroundColor: '#f5f7fa',
              imageBorderColor: 'transparent',
              imageObjectFit: 'cover',
            },
            {
              blockType: 'ctaStory',
              ctaImageBackgroundColor: '#e8f0fe',
              ctaEyebrowText: 'Next chapter ( 2 )?',
              ctaEyebrowTextColor: '#081122',
              ctaEyebrowDotColor: '#1a4db3',
              ctaHeading: "Let's start next chapter",
              ctaHeadingColor: '#081122',
              ctaDescription: 'Anna is here to guide you every step of the way.',
              ctaDescriptionColor: 'rgba(8, 17, 34, 0.88)',
              ctaLinks: [
                {
                  linkText: 'Start chapter 2',
                  linkUrl: '#',
                  linkTextColor: '#081122',
                  linkArrowColor: '#081122',
                  linkBackgroundColor: 'transparent',
                  linkHoverBackgroundColor: '#f0f4ff',
                  openInNewTab: false,
                },
              ],
              ctaBackgroundColor: '#f5f7fa',
              ctaBorderColor: '#e2e8f0',
            },
          ],
        },
      ],
    },

    // ─── GLOBAL PAGE SETTINGS ────────────────────────────────────────────────────
    {
      name: 'pageSettings',
      type: 'group',
      label: 'Global Page Settings',
      admin: {
        description: 'Page-wide defaults, SEO, and typography.',
      },
      fields: [
        {
          name: 'pageBackgroundColor',
          type: 'text',
          label: 'Page Background Color',
          defaultValue: '#ffffff',
        },
        {
          name: 'primaryTextColor',
          type: 'text',
          label: 'Primary Text Color',
          defaultValue: '#081122',
        },
        {
          name: 'accentColor',
          type: 'text',
          label: 'Accent / Link Color',
          defaultValue: '#1a4db3',
        },
        {
          name: 'fontFamily',
          type: 'text',
          label: 'Font Family Override',
          defaultValue: '',
          admin: {
            description: 'Leave blank to inherit from site globals (e.g. "Inter, sans-serif")',
          },
        },
        {
          name: 'seo',
          type: 'group',
          label: 'SEO Settings',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              defaultValue: 'Chapter 1 | Course Name',
              maxLength: 100,
              admin: {
                description: '60 characters recommended',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              defaultValue:
                'Dive into Chapter 1 with guided video content, rich study materials, and expert instruction to accelerate your learning.',
              maxLength: 200,
              admin: {
                description: '155–160 characters recommended',
              },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Social Share Image',
              admin: {
                description: '1200x630px recommended',
              },
            },
            {
              name: 'keywords',
              type: 'text',
              label: 'Focus Keywords',
              defaultValue: 'online course, chapter 1, video lessons, learning platform',
              admin: {
                description: 'Comma-separated keywords',
              },
            },
          ],
        },
      ],
    },
  ],
}

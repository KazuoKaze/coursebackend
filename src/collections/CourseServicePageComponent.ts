// import type { CollectionConfig } from 'payload'
// import { formatSlug } from '../utilities/formatSlug'

// export const Courses: CollectionConfig = {
//   slug: 'course-service-page-component',
//   admin: {
//     useAsTitle: 'title',
//     group: 'Components',
//     description:
//       'Controls all content and styling for the course/service detail page layout (hero split, features grid, about/process section).',
//   },
//   access: {
//     read: () => true,
//   },
//   fields: [
//     {
//       name: 'title',
//       type: 'text',
//       required: true,
//       label: 'Page Title',
//       defaultValue: 'Web-Development Masterclass',
//       admin: {
//         description: 'Main title for the page (also used to auto-generate slug)',
//       },
//     },
//     {
//       name: 'slug',
//       type: 'text',
//       required: true,
//       unique: true,
//       label: 'URL Slug',
//       defaultValue: 'web-development-masterclass',
//       admin: {
//         description: 'URL path (e.g. "web-development-masterclass")',
//         position: 'sidebar',
//       },
//       hooks: {
//         beforeValidate: [formatSlug('title')],
//       },
//       index: true,
//     },

//     // ─── HERO SECTION ────────────────────────────────────────────────────────────
//     {
//       name: 'heroSection',
//       type: 'group',
//       label: 'Hero Section',
//       admin: {
//         description: 'Split-layout hero: image left, content right.',
//       },
//       fields: [
//         {
//           name: 'sectionBackgroundColor',
//           type: 'text',
//           label: 'Section Background Color',
//           defaultValue: '#ffffff',
//           admin: { description: 'Background color of the entire hero section' },
//         },

//         // ── Image column ──
//         {
//           name: 'heroImage',
//           type: 'upload',
//           relationTo: 'media',
//           label: 'Hero Image',
//           admin: { description: 'Left-column image (recommended: 800x900px or taller)' },
//         },
//         {
//           name: 'heroImageAlt',
//           type: 'text',
//           label: 'Hero Image Alt Text',
//           defaultValue: 'Web development course hero',
//         },
//         {
//           name: 'heroImageBackgroundColor',
//           type: 'text',
//           label: 'Image Container Background Color',
//           defaultValue: '#f5f7fa',
//         },
//         {
//           name: 'showImageOverlayTiles',
//           type: 'checkbox',
//           label: 'Show Overlay Tile Animation',
//           defaultValue: true,
//           admin: {
//             description: 'Decorative animated tile overlay on the hero image',
//           },
//         },
//         {
//           name: 'overlayTileColors',
//           type: 'array',
//           label: 'Overlay Tile Colors',
//           minRows: 4,
//           maxRows: 4,
//           admin: {
//             description: 'Exactly 4 tile colors for the overlay animation (_1 through _4)',
//             condition: (_, siblingData) => siblingData?.showImageOverlayTiles === true,
//           },
//           defaultValue: [
//             { tileColor: 'rgba(8,17,34,0.18)' },
//             { tileColor: 'rgba(8,17,34,0.12)' },
//             { tileColor: 'rgba(8,17,34,0.08)' },
//             { tileColor: 'rgba(8,17,34,0.04)' },
//           ],
//           fields: [
//             {
//               name: 'tileColor',
//               type: 'text',
//               label: 'Tile Color (rgba)',
//               required: true,
//             },
//           ],
//         },

//         // ── Content column ──
//         {
//           name: 'contentBackgroundColor',
//           type: 'text',
//           label: 'Content Column Background Color',
//           defaultValue: 'transparent',
//         },

//         // Eyebrow
//         {
//           name: 'eyebrow',
//           type: 'group',
//           label: 'Eyebrow Badge',
//           fields: [
//             {
//               name: 'show',
//               type: 'checkbox',
//               label: 'Show Eyebrow',
//               defaultValue: true,
//             },
//             {
//               name: 'text',
//               type: 'text',
//               label: 'Eyebrow Text',
//               defaultValue: 'Course',
//             },
//             {
//               name: 'textColor',
//               type: 'text',
//               label: 'Eyebrow Text Color',
//               defaultValue: '#081122',
//             },
//             {
//               name: 'circleColor',
//               type: 'text',
//               label: 'Eyebrow Circle Color',
//               defaultValue: '#1a4db3',
//             },
//             {
//               name: 'backgroundColor',
//               type: 'text',
//               label: 'Eyebrow Background Color',
//               defaultValue: 'transparent',
//             },
//           ],
//         },

//         // Heading
//         {
//           name: 'heading',
//           type: 'text',
//           label: 'Main Heading (H1)',
//           defaultValue: 'Web-Development Masterclass',
//         },
//         {
//           name: 'headingColor',
//           type: 'text',
//           label: 'Heading Color',
//           defaultValue: '#081122',
//         },

//         // Subtext
//         {
//           name: 'subtext',
//           type: 'textarea',
//           label: 'Sub-description',
//           defaultValue:
//             'Learn frontend and backend development from scratch through practical projects, step-by-step lessons, and expert guidance. Master modern tools, build real-world applications, and gain the skills needed to launch your career.',
//         },
//         {
//           name: 'subtextColor',
//           type: 'text',
//           label: 'Subtext Color',
//           defaultValue: '#081122',
//         },
//         {
//           name: 'subtextBackgroundColor',
//           type: 'text',
//           label: 'Subtext Container Background Color',
//           defaultValue: 'transparent',
//         },

//         // CTA Buttons
//         {
//           name: 'ctaButtons',
//           type: 'array',
//           label: 'CTA Buttons',
//           minRows: 0,
//           maxRows: 4,
//           admin: {
//             description: 'Drag to reorder buttons. Each button has its own style.',
//             initCollapsed: false,
//           },
//           defaultValue: [
//             {
//               text: '$10.00',
//               href: '#',
//               variant: 'secondary-dark',
//               openInNewTab: false,
//               backgroundColor: '#081122',
//               textColor: '#ffffff',
//               borderColor: 'transparent',
//               hoverBackgroundColor: '#1a4db3',
//               hoverTextColor: '#ffffff',
//               showArrowIcon: false,
//             },
//             {
//               text: 'Pay now',
//               href: '/login',
//               variant: 'accent',
//               openInNewTab: false,
//               backgroundColor: '#1a4db3',
//               textColor: '#ffffff',
//               borderColor: 'transparent',
//               hoverBackgroundColor: '#081122',
//               hoverTextColor: '#ffffff',
//               showArrowIcon: true,
//             },
//           ],
//           fields: [
//             {
//               name: 'text',
//               type: 'text',
//               label: 'Button Label',
//               required: true,
//             },
//             {
//               name: 'href',
//               type: 'text',
//               label: 'Button Link (href)',
//               defaultValue: '#',
//             },
//             {
//               name: 'openInNewTab',
//               type: 'checkbox',
//               label: 'Open in New Tab',
//               defaultValue: false,
//             },
//             {
//               name: 'variant',
//               type: 'select',
//               label: 'Button Variant',
//               defaultValue: 'accent',
//               options: [
//                 { label: 'Accent', value: 'accent' },
//                 { label: 'Secondary Dark', value: 'secondary-dark' },
//                 { label: 'Primary', value: 'primary' },
//                 { label: 'Outline', value: 'outline' },
//                 { label: 'Ghost', value: 'ghost' },
//               ],
//             },
//             {
//               name: 'backgroundColor',
//               type: 'text',
//               label: 'Background Color',
//               defaultValue: '#1a4db3',
//             },
//             {
//               name: 'textColor',
//               type: 'text',
//               label: 'Text Color',
//               defaultValue: '#ffffff',
//             },
//             {
//               name: 'borderColor',
//               type: 'text',
//               label: 'Border Color',
//               defaultValue: 'transparent',
//             },
//             {
//               name: 'hoverBackgroundColor',
//               type: 'text',
//               label: 'Hover Background Color',
//               defaultValue: '#081122',
//             },
//             {
//               name: 'hoverTextColor',
//               type: 'text',
//               label: 'Hover Text Color',
//               defaultValue: '#ffffff',
//             },
//             {
//               name: 'showArrowIcon',
//               type: 'checkbox',
//               label: 'Show Arrow Icon',
//               defaultValue: true,
//             },
//             {
//               name: 'arrowIconColor',
//               type: 'text',
//               label: 'Arrow Icon Color',
//               defaultValue: 'currentColor',
//             },
//           ],
//         },
//       ],
//     },

//     // ─── FEATURES SECTION ────────────────────────────────────────────────────────
//     {
//       name: 'featuresSection',
//       type: 'group',
//       label: 'Features Section ("What You\'ll Learn")',
//       admin: {
//         description: 'Grid of feature cards with headline, subheadline, CTA, and icon cards.',
//       },
//       fields: [
//         {
//           name: 'sectionBackgroundColor',
//           type: 'text',
//           label: 'Section Background Color',
//           defaultValue: '#ffffff',
//         },
//         {
//           name: 'sectionPaddingTop',
//           type: 'text',
//           label: 'Section Padding Top',
//           defaultValue: '80px',
//         },
//         {
//           name: 'sectionPaddingBottom',
//           type: 'text',
//           label: 'Section Padding Bottom',
//           defaultValue: '80px',
//         },

//         // Headline block
//         {
//           name: 'headline',
//           type: 'group',
//           label: 'Section Headline',
//           fields: [
//             {
//               name: 'eyebrow',
//               type: 'group',
//               label: 'Eyebrow Badge',
//               fields: [
//                 {
//                   name: 'show',
//                   type: 'checkbox',
//                   label: 'Show Eyebrow',
//                   defaultValue: true,
//                 },
//                 {
//                   name: 'text',
//                   type: 'text',
//                   label: 'Eyebrow Text',
//                   defaultValue: "WHAT YOU'LL LEARN",
//                 },
//                 {
//                   name: 'textColor',
//                   type: 'text',
//                   label: 'Eyebrow Text Color',
//                   defaultValue: '#081122',
//                 },
//                 {
//                   name: 'circleColor',
//                   type: 'text',
//                   label: 'Eyebrow Circle Color',
//                   defaultValue: '#1a4db3',
//                 },
//               ],
//             },
//             {
//               name: 'heading',
//               type: 'text',
//               label: 'Section Heading (H2)',
//               defaultValue: "Skills You'll Master",
//             },
//             {
//               name: 'headingColor',
//               type: 'text',
//               label: 'Heading Color',
//               defaultValue: '#081122',
//             },
//             {
//               name: 'headlineBackgroundColor',
//               type: 'text',
//               label: 'Headline Area Background Color',
//               defaultValue: 'transparent',
//             },
//             // CTA inside headline
//             {
//               name: 'ctaButton',
//               type: 'group',
//               label: 'Headline CTA Button',
//               fields: [
//                 {
//                   name: 'show',
//                   type: 'checkbox',
//                   label: 'Show Button',
//                   defaultValue: true,
//                 },
//                 {
//                   name: 'text',
//                   type: 'text',
//                   label: 'Button Text',
//                   defaultValue: 'Enroll Now',
//                 },
//                 {
//                   name: 'href',
//                   type: 'text',
//                   label: 'Button Link',
//                   defaultValue: '/login',
//                 },
//                 {
//                   name: 'openInNewTab',
//                   type: 'checkbox',
//                   label: 'Open in New Tab',
//                   defaultValue: false,
//                 },
//                 {
//                   name: 'backgroundColor',
//                   type: 'text',
//                   label: 'Background Color',
//                   defaultValue: '#1a4db3',
//                 },
//                 {
//                   name: 'textColor',
//                   type: 'text',
//                   label: 'Text Color',
//                   defaultValue: '#ffffff',
//                 },
//                 {
//                   name: 'hoverBackgroundColor',
//                   type: 'text',
//                   label: 'Hover Background Color',
//                   defaultValue: '#081122',
//                 },
//                 {
//                   name: 'showArrowIcon',
//                   type: 'checkbox',
//                   label: 'Show Arrow Icon',
//                   defaultValue: true,
//                 },
//                 {
//                   name: 'arrowIconColor',
//                   type: 'text',
//                   label: 'Arrow Icon Color',
//                   defaultValue: 'currentColor',
//                 },
//               ],
//             },
//           ],
//         },

//         // Feature cards grid
//         {
//           name: 'featureCards',
//           type: 'array',
//           label: 'Feature Cards',
//           minRows: 1,
//           maxRows: 12,
//           admin: {
//             description: 'Drag to reorder feature cards in the grid.',
//             initCollapsed: false,
//           },
//           defaultValue: [
//             {
//               title: 'Frontend Development',
//               description: 'Learn HTML, CSS, JavaScript, and modern UI building techniques.',
//               iconSvg:
//                 '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none"><path d="M23.047 17.197L18.729 21.132C16.698 22.982 14.067 24 11.321 24H0V22H11.32C13.567 22 15.719 21.167 17.381 19.653L21.665 15.751C22.012 15.403 22.095 14.807 21.821 14.427C21.641 14.178 21.379 14.028 21.081 14.003C20.79 13.984 20.501 14.085 20.293 14.293L16.059 18.179C15.521 18.687 14.797 19 14 19H9V17H14C14.273 17 14.521 16.89 14.701 16.712H14.7L14.723 16.69C14.894 16.51 15 16.268 15 16V15H8.812C6.409 15 4.148 15.937 2.448 17.636L1.431 18.654L0.018 17.239L1.035 16.221C3.113 14.144 5.876 12.999 8.813 12.999H17.001V14.6L18.911 12.848C19.502 12.255 20.367 11.933 21.242 12.009C22.122 12.079 22.925 12.534 23.445 13.257C24.289 14.431 24.118 16.123 23.048 17.196L23.047 17.197ZM4 1V0H5C8.528 0 10.81 1.004 12 3.166C13.19 1.004 15.472 0 19 0H20V1C20 6.187 17.831 8.68 13 8.971V11H11V8.971C6.169 8.68 4 6.187 4 1ZM13.032 6.968C16.351 6.745 17.745 5.352 17.968 2.032C14.649 2.255 13.255 3.648 13.032 6.968ZM6.032 2.032C6.255 5.351 7.648 6.745 10.968 6.968C10.745 3.649 9.352 2.255 6.032 2.032Z" fill="currentColor"/></svg>',
//               cardSize: 'large',
//               cardBackgroundColor: '#f5f7fa',
//               cardBorderColor: '#e2e8f0',
//               iconWrapBackgroundColor: '#ffffff',
//               iconColor: '#081122',
//               titleColor: '#081122',
//               descriptionColor: 'rgba(8,17,34,0.64)',
//             },
//             {
//               title: 'Backend Development',
//               description: 'Understand servers, databases, APIs, and backend frameworks.',
//               iconSvg:
//                 '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none"><path d="M8 0C4.691 0 2 2.691 2 6C2 9.309 4.691 12 8 12C11.309 12 14 9.309 14 6C14 2.691 11.309 0 8 0ZM8 10C5.794 10 4 8.206 4 6C4 3.794 5.794 2 8 2C10.206 2 12 3.794 12 6C12 8.206 10.206 10 8 10ZM5 14H11V16H5C3.346 16 2 17.346 2 19V24H0V19C0 16.243 2.243 14 5 14ZM22.286 11.601L18.5 10.346L14.714 11.601C13.689 11.941 13 12.894 13 13.974V17.4C13 20.969 16.714 23.103 17.853 23.672L18.457 23.974L19.084 23.722C20.237 23.258 24.001 21.43 24.001 17.4V13.974C24.001 12.894 23.313 11.941 22.287 11.601H22.286ZM22 17.4C22 19.982 19.576 21.325 18.545 21.779C17.629 21.288 15 19.68 15 17.4V13.974C15 13.758 15.138 13.567 15.343 13.499L18.5 12.453L21.657 13.499C21.862 13.567 22 13.758 22 13.974V17.4Z" fill="currentColor"/></svg>',
//               cardSize: 'large',
//               cardBackgroundColor: '#f5f7fa',
//               cardBorderColor: '#e2e8f0',
//               iconWrapBackgroundColor: '#ffffff',
//               iconColor: '#081122',
//               titleColor: '#081122',
//               descriptionColor: 'rgba(8,17,34,0.64)',
//             },
//             {
//               title: 'Real Projects',
//               description: 'Build practical applications to strengthen your portfolio.',
//               iconSvg:
//                 '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none"><path d="M12 24C5.383 24 0 18.617 0 12C0 5.383 5.383 0 12 0C18.617 0 24 5.383 24 12C24 18.617 18.617 24 12 24ZM12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM15.397 15.803L13 11.727V5H11V12.272L13.673 16.816L15.398 15.802L15.397 15.803Z" fill="currentColor"/></svg>',
//               cardSize: 'large',
//               cardBackgroundColor: '#f5f7fa',
//               cardBorderColor: '#e2e8f0',
//               iconWrapBackgroundColor: '#ffffff',
//               iconColor: '#081122',
//               titleColor: '#081122',
//               descriptionColor: 'rgba(8,17,34,0.64)',
//             },
//             {
//               title: 'Career Guidance',
//               description: 'Get expert tips, mentorship, and career-focused insights.',
//               iconSvg:
//                 '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none"><path d="M23.9703 0.941375L23.9153 -0.015625L22.9563 -0.000625C16.2493 0.103375 13.2953 4.23037 12.0003 7.60437C10.7053 4.23037 7.75133 0.103375 1.04433 -0.000625L0.0853275 -0.015625L0.0303275 0.941375C-0.188673 4.73938 0.779328 7.73238 2.90433 9.83438C5.53633 12.4374 9.20533 12.9194 11.0003 12.9894V23.9994H13.0003V12.9894C14.7953 12.9194 18.4633 12.4374 21.0963 9.83438C23.2213 7.73138 24.1893 4.73938 23.9703 0.941375ZM4.30233 8.40338C2.78833 6.90138 2.01733 4.76737 2.00033 2.05038C8.83833 2.67038 10.4893 8.52938 10.8823 10.9774C9.32033 10.8874 6.35033 10.4354 4.30233 8.40238V8.40338ZM13.1183 10.9784C13.5113 8.52938 15.1623 2.67038 22.0003 2.05138C21.9833 4.76838 21.2123 6.90238 19.6983 8.40438C17.6493 10.4384 14.6803 10.8884 13.1183 10.9784Z" fill="currentColor"/></svg>',
//               cardSize: 'large',
//               cardBackgroundColor: '#f5f7fa',
//               cardBorderColor: '#e2e8f0',
//               iconWrapBackgroundColor: '#ffffff',
//               iconColor: '#081122',
//               titleColor: '#081122',
//               descriptionColor: 'rgba(8,17,34,0.64)',
//             },
//           ],
//           fields: [
//             {
//               name: 'title',
//               type: 'text',
//               label: 'Card Title',
//               required: true,
//             },
//             {
//               name: 'titleColor',
//               type: 'text',
//               label: 'Title Color',
//               defaultValue: '#081122',
//             },
//             {
//               name: 'description',
//               type: 'textarea',
//               label: 'Card Description',
//             },
//             {
//               name: 'descriptionColor',
//               type: 'text',
//               label: 'Description Color',
//               defaultValue: 'rgba(8,17,34,0.64)',
//             },
//             {
//               name: 'iconSvg',
//               type: 'textarea',
//               label: 'Icon SVG (raw HTML)',
//               admin: {
//                 description: 'Paste full <svg>…</svg> markup for the card icon.',
//               },
//             },
//             {
//               name: 'iconColor',
//               type: 'text',
//               label: 'Icon Color',
//               defaultValue: '#081122',
//               admin: { description: 'Applies as CSS currentColor to the SVG fill/stroke.' },
//             },
//             {
//               name: 'iconWrapBackgroundColor',
//               type: 'text',
//               label: 'Icon Wrap Background Color',
//               defaultValue: '#ffffff',
//             },
//             {
//               name: 'cardSize',
//               type: 'select',
//               label: 'Card Size',
//               defaultValue: 'large',
//               options: [
//                 { label: 'Large', value: 'large' },
//                 { label: 'Small', value: 'small' },
//               ],
//             },
//             {
//               name: 'cardBackgroundColor',
//               type: 'text',
//               label: 'Card Background Color',
//               defaultValue: '#f5f7fa',
//             },
//             {
//               name: 'cardBorderColor',
//               type: 'text',
//               label: 'Card Border Color',
//               defaultValue: '#e2e8f0',
//             },
//             {
//               name: 'cardBorderRadius',
//               type: 'text',
//               label: 'Card Border Radius',
//               defaultValue: '12px',
//             },
//           ],
//         },

//         // Optional sky background image
//         {
//           name: 'skyBackground',
//           type: 'group',
//           label: 'Sky Background (optional decorative image)',
//           fields: [
//             {
//               name: 'show',
//               type: 'checkbox',
//               label: 'Show Sky Background Image',
//               defaultValue: false,
//             },
//             {
//               name: 'image',
//               type: 'upload',
//               relationTo: 'media',
//               label: 'Sky Image',
//               admin: {
//                 condition: (_, siblingData) => siblingData?.show === true,
//               },
//             },
//             {
//               name: 'rotate',
//               type: 'checkbox',
//               label: 'Apply Rotation Animation',
//               defaultValue: true,
//               admin: {
//                 condition: (_, siblingData) => siblingData?.show === true,
//               },
//             },
//           ],
//         },
//       ],
//     },

//     // ─── ABOUT / PROCESS SECTION ─────────────────────────────────────────────────
//     {
//       name: 'aboutSection',
//       type: 'group',
//       label: 'About / Process Section',
//       admin: {
//         description:
//           'Large intro quote, a split image + step-by-step process list. Drag process steps to reorder.',
//       },
//       fields: [
//         {
//           name: 'sectionBackgroundColor',
//           type: 'text',
//           label: 'Section Background Color',
//           defaultValue: '#ffffff',
//         },

//         // Intro quote
//         {
//           name: 'introText',
//           type: 'textarea',
//           label: 'Intro Large Text (H5 style quote)',
//           defaultValue:
//             'This course is designed to take you from beginner to confident developer through structured lessons, practical projects, and expert guidance. Learn at your own pace while building real-world skills that prepare you for career opportunities.',
//         },
//         {
//           name: 'introTextColor',
//           type: 'text',
//           label: 'Intro Text Color',
//           defaultValue: '#081122',
//         },
//         {
//           name: 'introBackgroundColor',
//           type: 'text',
//           label: 'Intro Text Area Background Color',
//           defaultValue: 'transparent',
//         },

//         // Process image
//         {
//           name: 'processImage',
//           type: 'upload',
//           relationTo: 'media',
//           label: 'Process Section Image',
//           admin: {
//             description: 'Left-column image for the process list (horizontal crop)',
//           },
//         },
//         {
//           name: 'processImageAlt',
//           type: 'text',
//           label: 'Process Image Alt Text',
//           defaultValue: 'Web development learning process',
//         },
//         {
//           name: 'processImageBackgroundColor',
//           type: 'text',
//           label: 'Process Image Container Background Color',
//           defaultValue: '#f5f7fa',
//         },

//         // Process steps
//         {
//           name: 'processSteps',
//           type: 'array',
//           label: 'Process Steps',
//           minRows: 1,
//           maxRows: 10,
//           admin: {
//             description: 'Drag to reorder steps.',
//             initCollapsed: false,
//           },
//           defaultValue: [
//             {
//               stepTitle: 'Learn',
//               stepTitleColor: '#081122',
//               stepDescription:
//                 'Start with step-by-step lessons covering the fundamentals of web development, including HTML, CSS, JavaScript, and modern development tools.',
//               stepDescriptionColor: 'rgba(8,17,34,0.64)',
//               stepBackgroundColor: 'transparent',
//               stepBorderColor: 'transparent',
//               stepNumberShow: false,
//               stepNumberColor: '#1a4db3',
//             },
//             {
//               stepTitle: 'Build',
//               stepTitleColor: '#081122',
//               stepDescription:
//                 'Apply what you learn through real-world projects and practical assignments designed to strengthen your skills and confidence.',
//               stepDescriptionColor: 'rgba(8,17,34,0.64)',
//               stepBackgroundColor: 'transparent',
//               stepBorderColor: 'transparent',
//               stepNumberShow: false,
//               stepNumberColor: '#1a4db3',
//             },
//             {
//               stepTitle: 'Launch',
//               stepTitleColor: '#081122',
//               stepDescription:
//                 'Complete the course with a professional portfolio, career guidance, and the knowledge needed to start freelancing or land your first developer role.',
//               stepDescriptionColor: 'rgba(8,17,34,0.64)',
//               stepBackgroundColor: 'transparent',
//               stepBorderColor: 'transparent',
//               stepNumberShow: false,
//               stepNumberColor: '#1a4db3',
//             },
//           ],
//           fields: [
//             {
//               name: 'stepTitle',
//               type: 'text',
//               label: 'Step Title',
//               required: true,
//             },
//             {
//               name: 'stepTitleColor',
//               type: 'text',
//               label: 'Step Title Color',
//               defaultValue: '#081122',
//             },
//             {
//               name: 'stepDescription',
//               type: 'textarea',
//               label: 'Step Description',
//             },
//             {
//               name: 'stepDescriptionColor',
//               type: 'text',
//               label: 'Step Description Color',
//               defaultValue: 'rgba(8,17,34,0.64)',
//             },
//             {
//               name: 'stepBackgroundColor',
//               type: 'text',
//               label: 'Step Item Background Color',
//               defaultValue: 'transparent',
//             },
//             {
//               name: 'stepBorderColor',
//               type: 'text',
//               label: 'Step Item Border / Divider Color',
//               defaultValue: 'transparent',
//             },
//             {
//               name: 'stepNumberShow',
//               type: 'checkbox',
//               label: 'Show Step Number',
//               defaultValue: false,
//             },
//             {
//               name: 'stepNumberColor',
//               type: 'text',
//               label: 'Step Number Color',
//               defaultValue: '#1a4db3',
//               admin: {
//                 condition: (_, siblingData) => siblingData?.stepNumberShow === true,
//               },
//             },
//           ],
//         },
//       ],
//     },

//     // ─── GLOBAL PAGE SETTINGS ────────────────────────────────────────────────────
//     {
//       name: 'pageSettings',
//       type: 'group',
//       label: 'Global Page Settings',
//       admin: {
//         description: 'Page-wide defaults, SEO meta tags, and typography overrides.',
//       },
//       fields: [
//         {
//           name: 'pageBackgroundColor',
//           type: 'text',
//           label: 'Page Background Color',
//           defaultValue: '#ffffff',
//         },
//         {
//           name: 'primaryTextColor',
//           type: 'text',
//           label: 'Primary Text Color',
//           defaultValue: '#081122',
//         },
//         {
//           name: 'accentColor',
//           type: 'text',
//           label: 'Accent / Link Color',
//           defaultValue: '#1a4db3',
//         },
//         {
//           name: 'fontFamily',
//           type: 'text',
//           label: 'Font Family Override',
//           defaultValue: '',
//           admin: {
//             description: 'Leave blank to use the site default (e.g. "Inter, sans-serif")',
//           },
//         },
//         {
//           name: 'seo',
//           type: 'group',
//           label: 'SEO Settings',
//           fields: [
//             {
//               name: 'metaTitle',
//               type: 'text',
//               label: 'Meta Title',
//               defaultValue: 'Web-Development Masterclass | Learn Frontend & Backend',
//               maxLength: 100,
//               admin: { description: '60 characters recommended' },
//             },
//             {
//               name: 'metaDescription',
//               type: 'textarea',
//               label: 'Meta Description',
//               defaultValue:
//                 'Learn frontend and backend development from scratch. Build real-world projects, master modern tools, and launch your developer career.',
//               maxLength: 200,
//               admin: { description: '155–160 characters recommended' },
//             },
//             {
//               name: 'ogImage',
//               type: 'upload',
//               relationTo: 'media',
//               label: 'Social Share Image (OG)',
//               admin: { description: '1200x630px recommended' },
//             },
//             {
//               name: 'keywords',
//               type: 'text',
//               label: 'Focus Keywords',
//               defaultValue:
//                 'web development course, frontend development, backend development, learn coding',
//               admin: { description: 'Comma-separated keywords' },
//             },
//             {
//               name: 'canonicalUrl',
//               type: 'text',
//               label: 'Canonical URL',
//               defaultValue: '',
//               admin: { description: 'Leave blank to use the page URL automatically' },
//             },
//           ],
//         },
//       ],
//     },
//   ],
// }




import type { CollectionConfig } from 'payload'
import { formatSlug } from '../utilities/formatSlug'

export const Courses: CollectionConfig = {
  slug: 'course-service-page-component',
  admin: {
    useAsTitle: 'title',
    group: 'Components',
    description:
      'Controls all content and styling for the course/service detail page layout (hero split, features grid, about/process section).',
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
        description: 'Main title for the page (also used to auto-generate slug)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'URL path (e.g. "web-development-masterclass")',
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
      index: true,
    },

    {
      name: 'price',
      type: 'number',
      required: true,
    },

    // ─── HERO SECTION ────────────────────────────────────────────────────────────
    {
      name: 'heroSection',
      type: 'group',
      label: 'Hero Section',
      admin: {
        description: 'Split-layout hero: image left, content right.',
      },
      fields: [
        {
          name: 'sectionBackgroundColor',
          type: 'text',
          label: 'Section Background Color',
          defaultValue: '#ffffff',
          admin: { description: 'Background color of the entire hero section' },
        },

        // ── Image column ──
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Image',
          admin: { description: 'Left-column image (recommended: 800x900px or taller)' },
        },
        {
          name: 'heroImageAlt',
          type: 'text',
          label: 'Hero Image Alt Text',
        },
        {
          name: 'heroImageBackgroundColor',
          type: 'text',
          label: 'Image Container Background Color',
          defaultValue: '#f5f7fa',
        },
        {
          name: 'showImageOverlayTiles',
          type: 'checkbox',
          label: 'Show Overlay Tile Animation',
          defaultValue: true,
          admin: {
            description: 'Decorative animated tile overlay on the hero image',
          },
        },
        {
          name: 'overlayTileColors',
          type: 'array',
          label: 'Overlay Tile Colors',
          minRows: 4,
          maxRows: 4,
          admin: {
            description: 'Exactly 4 tile colors for the overlay animation (_1 through _4)',
            condition: (_, siblingData) => siblingData?.showImageOverlayTiles === true,
          },
          defaultValue: [
            { tileColor: 'rgba(8,17,34,0.18)' },
            { tileColor: 'rgba(8,17,34,0.12)' },
            { tileColor: 'rgba(8,17,34,0.08)' },
            { tileColor: 'rgba(8,17,34,0.04)' },
          ],
          fields: [
            {
              name: 'tileColor',
              type: 'text',
              label: 'Tile Color (rgba)',
              required: true,
            },
          ],
        },

        // ── Content column ──
        {
          name: 'contentBackgroundColor',
          type: 'text',
          label: 'Content Column Background Color',
          defaultValue: 'transparent',
        },

        // Eyebrow
        {
          name: 'eyebrow',
          type: 'group',
          label: 'Eyebrow Badge',
          fields: [
            {
              name: 'show',
              type: 'checkbox',
              label: 'Show Eyebrow',
              defaultValue: true,
            },
            {
              name: 'text',
              type: 'text',
              label: 'Eyebrow Text',
            },
            {
              name: 'textColor',
              type: 'text',
              label: 'Eyebrow Text Color',
              defaultValue: '#081122',
            },
            {
              name: 'circleColor',
              type: 'text',
              label: 'Eyebrow Circle Color',
              defaultValue: '#1a4db3',
            },
            {
              name: 'backgroundColor',
              type: 'text',
              label: 'Eyebrow Background Color',
              defaultValue: 'transparent',
            },
          ],
        },

        // Heading
        {
          name: 'heading',
          type: 'text',
          label: 'Main Heading (H1)',
        },
        {
          name: 'headingColor',
          type: 'text',
          label: 'Heading Color',
          defaultValue: '#081122',
        },

        // Subtext
        {
          name: 'subtext',
          type: 'textarea',
          label: 'Sub-description',
        },
        {
          name: 'subtextColor',
          type: 'text',
          label: 'Subtext Color',
          defaultValue: '#081122',
        },
        {
          name: 'subtextBackgroundColor',
          type: 'text',
          label: 'Subtext Container Background Color',
          defaultValue: 'transparent',
        },

        // CTA Buttons
        {
          name: 'ctaButtons',
          type: 'array',
          label: 'CTA Buttons',
          minRows: 0,
          maxRows: 4,
          admin: {
            description: 'Drag to reorder buttons. Each button has its own style.',
            initCollapsed: false,
          },
          defaultValue: [
            {
              text: '$10.00',
              href: '#',
              variant: 'secondary-dark',
              openInNewTab: false,
              backgroundColor: '#081122',
              textColor: '#ffffff',
              borderColor: 'transparent',
              hoverBackgroundColor: '#1a4db3',
              hoverTextColor: '#ffffff',
              showArrowIcon: false,
            },
            {
              text: 'Pay now',
              href: '/login',
              variant: 'accent',
              openInNewTab: false,
              backgroundColor: '#1a4db3',
              textColor: '#ffffff',
              borderColor: 'transparent',
              hoverBackgroundColor: '#081122',
              hoverTextColor: '#ffffff',
              showArrowIcon: true,
            },
          ],
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Button Label',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              label: 'Button Link (href)',
              defaultValue: '#',
            },
            {
              name: 'openInNewTab',
              type: 'checkbox',
              label: 'Open in New Tab',
              defaultValue: false,
            },
            {
              name: 'variant',
              type: 'select',
              label: 'Button Variant',
              defaultValue: 'accent',
              options: [
                { label: 'Accent', value: 'accent' },
                { label: 'Secondary Dark', value: 'secondary-dark' },
                { label: 'Primary', value: 'primary' },
                { label: 'Outline', value: 'outline' },
                { label: 'Ghost', value: 'ghost' },
              ],
            },
            {
              name: 'backgroundColor',
              type: 'text',
              label: 'Background Color',
              defaultValue: '#1a4db3',
            },
            {
              name: 'textColor',
              type: 'text',
              label: 'Text Color',
              defaultValue: '#ffffff',
            },
            {
              name: 'borderColor',
              type: 'text',
              label: 'Border Color',
              defaultValue: 'transparent',
            },
            {
              name: 'hoverBackgroundColor',
              type: 'text',
              label: 'Hover Background Color',
              defaultValue: '#081122',
            },
            {
              name: 'hoverTextColor',
              type: 'text',
              label: 'Hover Text Color',
              defaultValue: '#ffffff',
            },
            {
              name: 'showArrowIcon',
              type: 'checkbox',
              label: 'Show Arrow Icon',
              defaultValue: true,
            },
            {
              name: 'arrowIconColor',
              type: 'text',
              label: 'Arrow Icon Color',
              defaultValue: 'currentColor',
            },
          ],
        },
      ],
    },

    // ─── FEATURES SECTION ────────────────────────────────────────────────────────
    {
      name: 'featuresSection',
      type: 'group',
      label: 'Features Section ("What You\'ll Learn")',
      admin: {
        description: 'Grid of feature cards with headline, subheadline, CTA, and icon cards.',
      },
      fields: [
        {
          name: 'sectionBackgroundColor',
          type: 'text',
          label: 'Section Background Color',
          defaultValue: '#ffffff',
        },
        {
          name: 'sectionPaddingTop',
          type: 'text',
          label: 'Section Padding Top',
          defaultValue: '80px',
        },
        {
          name: 'sectionPaddingBottom',
          type: 'text',
          label: 'Section Padding Bottom',
          defaultValue: '80px',
        },

        // Headline block
        {
          name: 'headline',
          type: 'group',
          label: 'Section Headline',
          fields: [
            {
              name: 'eyebrow',
              type: 'group',
              label: 'Eyebrow Badge',
              fields: [
                {
                  name: 'show',
                  type: 'checkbox',
                  label: 'Show Eyebrow',
                  defaultValue: true,
                },
                {
                  name: 'text',
                  type: 'text',
                  label: 'Eyebrow Text',
                },
                {
                  name: 'textColor',
                  type: 'text',
                  label: 'Eyebrow Text Color',
                  defaultValue: '#081122',
                },
                {
                  name: 'circleColor',
                  type: 'text',
                  label: 'Eyebrow Circle Color',
                  defaultValue: '#1a4db3',
                },
              ],
            },
            {
              name: 'heading',
              type: 'text',
              label: 'Section Heading (H2)',
            },
            {
              name: 'headingColor',
              type: 'text',
              label: 'Heading Color',
              defaultValue: '#081122',
            },
            {
              name: 'headlineBackgroundColor',
              type: 'text',
              label: 'Headline Area Background Color',
              defaultValue: 'transparent',
            },
            // CTA inside headline
            {
              name: 'ctaButton',
              type: 'group',
              label: 'Headline CTA Button',
              fields: [
                {
                  name: 'show',
                  type: 'checkbox',
                  label: 'Show Button',
                  defaultValue: true,
                },
                {
                  name: 'text',
                  type: 'text',
                  label: 'Button Text',
                },
                {
                  name: 'href',
                  type: 'text',
                  label: 'Button Link',
                  defaultValue: '/login',
                },
                {
                  name: 'openInNewTab',
                  type: 'checkbox',
                  label: 'Open in New Tab',
                  defaultValue: false,
                },
                {
                  name: 'backgroundColor',
                  type: 'text',
                  label: 'Background Color',
                  defaultValue: '#1a4db3',
                },
                {
                  name: 'textColor',
                  type: 'text',
                  label: 'Text Color',
                  defaultValue: '#ffffff',
                },
                {
                  name: 'hoverBackgroundColor',
                  type: 'text',
                  label: 'Hover Background Color',
                  defaultValue: '#081122',
                },
                {
                  name: 'showArrowIcon',
                  type: 'checkbox',
                  label: 'Show Arrow Icon',
                  defaultValue: true,
                },
                {
                  name: 'arrowIconColor',
                  type: 'text',
                  label: 'Arrow Icon Color',
                  defaultValue: 'currentColor',
                },
              ],
            },
          ],
        },

        // Feature cards grid
        {
          name: 'featureCards',
          type: 'array',
          label: 'Feature Cards',
          minRows: 1,
          maxRows: 12,
          admin: {
            description: 'Drag to reorder feature cards in the grid.',
            initCollapsed: false,
          },
          defaultValue: [
            {
              title: '',
              description: '',
              iconSvg:
                '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none"><path d="M23.047 17.197L18.729 21.132C16.698 22.982 14.067 24 11.321 24H0V22H11.32C13.567 22 15.719 21.167 17.381 19.653L21.665 15.751C22.012 15.403 22.095 14.807 21.821 14.427C21.641 14.178 21.379 14.028 21.081 14.003C20.79 13.984 20.501 14.085 20.293 14.293L16.059 18.179C15.521 18.687 14.797 19 14 19H9V17H14C14.273 17 14.521 16.89 14.701 16.712H14.7L14.723 16.69C14.894 16.51 15 16.268 15 16V15H8.812C6.409 15 4.148 15.937 2.448 17.636L1.431 18.654L0.018 17.239L1.035 16.221C3.113 14.144 5.876 12.999 8.813 12.999H17.001V14.6L18.911 12.848C19.502 12.255 20.367 11.933 21.242 12.009C22.122 12.079 22.925 12.534 23.445 13.257C24.289 14.431 24.118 16.123 23.048 17.196L23.047 17.197ZM4 1V0H5C8.528 0 10.81 1.004 12 3.166C13.19 1.004 15.472 0 19 0H20V1C20 6.187 17.831 8.68 13 8.971V11H11V8.971C6.169 8.68 4 6.187 4 1ZM13.032 6.968C16.351 6.745 17.745 5.352 17.968 2.032C14.649 2.255 13.255 3.648 13.032 6.968ZM6.032 2.032C6.255 5.351 7.648 6.745 10.968 6.968C10.745 3.649 9.352 2.255 6.032 2.032Z" fill="currentColor"/></svg>',
              cardSize: 'large',
              cardBackgroundColor: '#f5f7fa',
              cardBorderColor: '#e2e8f0',
              iconWrapBackgroundColor: '#ffffff',
              iconColor: '#081122',
              titleColor: '#081122',
              descriptionColor: 'rgba(8,17,34,0.64)',
            },
            {
              title: '',
              description: '',
              iconSvg:
                '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none"><path d="M8 0C4.691 0 2 2.691 2 6C2 9.309 4.691 12 8 12C11.309 12 14 9.309 14 6C14 2.691 11.309 0 8 0ZM8 10C5.794 10 4 8.206 4 6C4 3.794 5.794 2 8 2C10.206 2 12 3.794 12 6C12 8.206 10.206 10 8 10ZM5 14H11V16H5C3.346 16 2 17.346 2 19V24H0V19C0 16.243 2.243 14 5 14ZM22.286 11.601L18.5 10.346L14.714 11.601C13.689 11.941 13 12.894 13 13.974V17.4C13 20.969 16.714 23.103 17.853 23.672L18.457 23.974L19.084 23.722C20.237 23.258 24.001 21.43 24.001 17.4V13.974C24.001 12.894 23.313 11.941 22.287 11.601H22.286ZM22 17.4C22 19.982 19.576 21.325 18.545 21.779C17.629 21.288 15 19.68 15 17.4V13.974C15 13.758 15.138 13.567 15.343 13.499L18.5 12.453L21.657 13.499C21.862 13.567 22 13.758 22 13.974V17.4Z" fill="currentColor"/></svg>',
              cardSize: 'large',
              cardBackgroundColor: '#f5f7fa',
              cardBorderColor: '#e2e8f0',
              iconWrapBackgroundColor: '#ffffff',
              iconColor: '#081122',
              titleColor: '#081122',
              descriptionColor: 'rgba(8,17,34,0.64)',
            },
            {
              title: '',
              description: '',
              iconSvg:
                '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none"><path d="M12 24C5.383 24 0 18.617 0 12C0 5.383 5.383 0 12 0C18.617 0 24 5.383 24 12C24 18.617 18.617 24 12 24ZM12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM15.397 15.803L13 11.727V5H11V12.272L13.673 16.816L15.398 15.802L15.397 15.803Z" fill="currentColor"/></svg>',
              cardSize: 'large',
              cardBackgroundColor: '#f5f7fa',
              cardBorderColor: '#e2e8f0',
              iconWrapBackgroundColor: '#ffffff',
              iconColor: '#081122',
              titleColor: '#081122',
              descriptionColor: 'rgba(8,17,34,0.64)',
            },
            {
              title: '',
              description: '',
              iconSvg:
                '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none"><path d="M23.9703 0.941375L23.9153 -0.015625L22.9563 -0.000625C16.2493 0.103375 13.2953 4.23037 12.0003 7.60437C10.7053 4.23037 7.75133 0.103375 1.04433 -0.000625L0.0853275 -0.015625L0.0303275 0.941375C-0.188673 4.73938 0.779328 7.73238 2.90433 9.83438C5.53633 12.4374 9.20533 12.9194 11.0003 12.9894V23.9994H13.0003V12.9894C14.7953 12.9194 18.4633 12.4374 21.0963 9.83438C23.2213 7.73138 24.1893 4.73938 23.9703 0.941375ZM4.30233 8.40338C2.78833 6.90138 2.01733 4.76737 2.00033 2.05038C8.83833 2.67038 10.4893 8.52938 10.8823 10.9774C9.32033 10.8874 6.35033 10.4354 4.30233 8.40238V8.40338ZM13.1183 10.9784C13.5113 8.52938 15.1623 2.67038 22.0003 2.05138C21.9833 4.76838 21.2123 6.90238 19.6983 8.40438C17.6493 10.4384 14.6803 10.8884 13.1183 10.9784Z" fill="currentColor"/></svg>',
              cardSize: 'large',
              cardBackgroundColor: '#f5f7fa',
              cardBorderColor: '#e2e8f0',
              iconWrapBackgroundColor: '#ffffff',
              iconColor: '#081122',
              titleColor: '#081122',
              descriptionColor: 'rgba(8,17,34,0.64)',
            },
          ],
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Card Title',
              required: true,
            },
            {
              name: 'titleColor',
              type: 'text',
              label: 'Title Color',
              defaultValue: '#081122',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Card Description',
            },
            {
              name: 'descriptionColor',
              type: 'text',
              label: 'Description Color',
              defaultValue: 'rgba(8,17,34,0.64)',
            },
            {
              name: 'iconSvg',
              type: 'textarea',
              label: 'Icon SVG (raw HTML)',
              admin: {
                description: 'Paste full <svg>…</svg> markup for the card icon.',
              },
            },
            {
              name: 'iconColor',
              type: 'text',
              label: 'Icon Color',
              defaultValue: '#081122',
              admin: { description: 'Applies as CSS currentColor to the SVG fill/stroke.' },
            },
            {
              name: 'iconWrapBackgroundColor',
              type: 'text',
              label: 'Icon Wrap Background Color',
              defaultValue: '#ffffff',
            },
            {
              name: 'cardSize',
              type: 'select',
              label: 'Card Size',
              defaultValue: 'large',
              options: [
                { label: 'Large', value: 'large' },
                { label: 'Small', value: 'small' },
              ],
            },
            {
              name: 'cardBackgroundColor',
              type: 'text',
              label: 'Card Background Color',
              defaultValue: '#f5f7fa',
            },
            {
              name: 'cardBorderColor',
              type: 'text',
              label: 'Card Border Color',
              defaultValue: '#e2e8f0',
            },
            {
              name: 'cardBorderRadius',
              type: 'text',
              label: 'Card Border Radius',
              defaultValue: '12px',
            },
          ],
        },

        // Optional sky background image
        {
          name: 'skyBackground',
          type: 'group',
          label: 'Sky Background (optional decorative image)',
          fields: [
            {
              name: 'show',
              type: 'checkbox',
              label: 'Show Sky Background Image',
              defaultValue: false,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Sky Image',
              admin: {
                condition: (_, siblingData) => siblingData?.show === true,
              },
            },
            {
              name: 'rotate',
              type: 'checkbox',
              label: 'Apply Rotation Animation',
              defaultValue: true,
              admin: {
                condition: (_, siblingData) => siblingData?.show === true,
              },
            },
          ],
        },
      ],
    },

    // ─── ABOUT / PROCESS SECTION ─────────────────────────────────────────────────
    {
      name: 'aboutSection',
      type: 'group',
      label: 'About / Process Section',
      admin: {
        description:
          'Large intro quote, a split image + step-by-step process list. Drag process steps to reorder.',
      },
      fields: [
        {
          name: 'sectionBackgroundColor',
          type: 'text',
          label: 'Section Background Color',
          defaultValue: '#ffffff',
        },

        // Intro quote
        {
          name: 'introText',
          type: 'textarea',
          label: 'Intro Large Text (H5 style quote)',
        },
        {
          name: 'introTextColor',
          type: 'text',
          label: 'Intro Text Color',
          defaultValue: '#081122',
        },
        {
          name: 'introBackgroundColor',
          type: 'text',
          label: 'Intro Text Area Background Color',
          defaultValue: 'transparent',
        },

        // Process image
        {
          name: 'processImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Process Section Image',
          admin: {
            description: 'Left-column image for the process list (horizontal crop)',
          },
        },
        {
          name: 'processImageAlt',
          type: 'text',
          label: 'Process Image Alt Text',
        },
        {
          name: 'processImageBackgroundColor',
          type: 'text',
          label: 'Process Image Container Background Color',
          defaultValue: '#f5f7fa',
        },

        // Process steps
        {
          name: 'processSteps',
          type: 'array',
          label: 'Process Steps',
          minRows: 1,
          maxRows: 10,
          admin: {
            description: 'Drag to reorder steps.',
            initCollapsed: false,
          },
          defaultValue: [
            {
              stepTitle: 'Learn',
              stepTitleColor: '#081122',
              stepDescription:
                'Start with step-by-step lessons covering the fundamentals of web development, including HTML, CSS, JavaScript, and modern development tools.',
              stepDescriptionColor: 'rgba(8,17,34,0.64)',
              stepBackgroundColor: 'transparent',
              stepBorderColor: 'transparent',
              stepNumberShow: false,
              stepNumberColor: '#1a4db3',
            },
            {
              stepTitle: 'Build',
              stepTitleColor: '#081122',
              stepDescription:
                'Apply what you learn through real-world projects and practical assignments designed to strengthen your skills and confidence.',
              stepDescriptionColor: 'rgba(8,17,34,0.64)',
              stepBackgroundColor: 'transparent',
              stepBorderColor: 'transparent',
              stepNumberShow: false,
              stepNumberColor: '#1a4db3',
            },
            {
              stepTitle: 'Launch',
              stepTitleColor: '#081122',
              stepDescription:
                'Complete the course with a professional portfolio, career guidance, and the knowledge needed to start freelancing or land your first developer role.',
              stepDescriptionColor: 'rgba(8,17,34,0.64)',
              stepBackgroundColor: 'transparent',
              stepBorderColor: 'transparent',
              stepNumberShow: false,
              stepNumberColor: '#1a4db3',
            },
          ],
          fields: [
            {
              name: 'stepTitle',
              type: 'text',
              label: 'Step Title',
              required: true,
            },
            {
              name: 'stepTitleColor',
              type: 'text',
              label: 'Step Title Color',
              defaultValue: '#081122',
            },
            {
              name: 'stepDescription',
              type: 'textarea',
              label: 'Step Description',
            },
            {
              name: 'stepDescriptionColor',
              type: 'text',
              label: 'Step Description Color',
              defaultValue: 'rgba(8,17,34,0.64)',
            },
            {
              name: 'stepBackgroundColor',
              type: 'text',
              label: 'Step Item Background Color',
              defaultValue: 'transparent',
            },
            {
              name: 'stepBorderColor',
              type: 'text',
              label: 'Step Item Border / Divider Color',
              defaultValue: 'transparent',
            },
            {
              name: 'stepNumberShow',
              type: 'checkbox',
              label: 'Show Step Number',
              defaultValue: false,
            },
            {
              name: 'stepNumberColor',
              type: 'text',
              label: 'Step Number Color',
              defaultValue: '#1a4db3',
              admin: {
                condition: (_, siblingData) => siblingData?.stepNumberShow === true,
              },
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
        description: 'Page-wide defaults, SEO meta tags, and typography overrides.',
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
            description: 'Leave blank to use the site default (e.g. "Inter, sans-serif")',
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
              maxLength: 100,
              admin: { description: '60 characters recommended' },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              maxLength: 200,
              admin: { description: '155–160 characters recommended' },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Social Share Image (OG)',
              admin: { description: '1200x630px recommended' },
            },
            {
              name: 'keywords',
              type: 'text',
              label: 'Focus Keywords',
              admin: { description: 'Comma-separated keywords' },
            },
            {
              name: 'canonicalUrl',
              type: 'text',
              label: 'Canonical URL',
              defaultValue: '',
              admin: { description: 'Leave blank to use the page URL automatically' },
            },
          ],
        },
      ],
    },
  ],
}

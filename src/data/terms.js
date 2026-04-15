// The 120 immutable English UI terms organized into 14 categories.
// These are read-only — users only edit translations.

export const CATEGORIES = [
  {
    category: 'Navigation',
    color: '#6ea8fe',
    terms: ['Back', 'Forward', 'Home', 'Menu', 'Search', 'Browse', 'Navigate'],
  },
  {
    category: 'Actions — Primary',
    color: '#4ecdc4',
    terms: ['Submit', 'Cancel', 'OK', 'Apply', 'Confirm', 'Done', 'Send'],
  },
  {
    category: 'Actions — Secondary',
    color: '#7dd3a0',
    terms: ['Edit', 'Delete', 'Remove', 'Add', 'Create', 'Copy', 'Paste', 'Cut', 'Undo', 'Redo'],
  },
  {
    category: 'Actions — Tertiary',
    color: '#a3d977',
    terms: ['Export', 'Import', 'Sync', 'Attach', 'Preview', 'Bookmark', 'Star', 'Fullscreen'],
  },
  {
    category: 'Authentication',
    color: '#e8a87c',
    terms: ['Sign In', 'Sign Out', 'Sign Up', 'Password', 'Username', 'Forgot Password'],
  },
  {
    category: 'Data Management',
    color: '#c38bd9',
    terms: ['Save', 'Load', 'Upload', 'Download', 'Refresh', 'Update'],
  },
  {
    category: 'Settings & Preferences',
    color: '#9b8ed9',
    terms: ['Settings', 'Profile', 'Account', 'Preferences', 'Language', 'Theme', 'Notifications'],
  },
  {
    category: 'Messaging',
    color: '#d98ec0',
    terms: ['Message', 'Notification', 'Alert', 'Chat', 'Reply', 'Forward Message'],
  },
  {
    category: 'Status & Feedback',
    color: '#e8c87c',
    terms: ['Loading', 'Error', 'Success', 'Warning', 'Pending', 'Complete', 'Failed'],
  },
  {
    category: 'Commerce',
    color: '#f0a878',
    terms: ['Cart', 'Checkout', 'Purchase', 'Order', 'Payment', 'Price'],
  },
  {
    category: 'Content',
    color: '#7cc4d9',
    terms: ['File', 'Folder', 'Document', 'Image', 'Video', 'Audio', 'Link', 'Share'],
  },
  {
    category: 'Help & Support',
    color: '#8cd9c4',
    terms: ['Help', 'FAQ', 'Contact', 'Support', 'About', 'Tutorial', 'Guide'],
  },
  {
    category: 'Social',
    color: '#d97c8c',
    terms: ['Like', 'Follow', 'Comment', 'Post', 'Feed', 'Block', 'Report'],
  },
  {
    category: 'Interface Controls',
    color: '#a8a8c0',
    terms: [
      'Close', 'Open', 'Expand', 'Collapse', 'Filter', 'Sort', 'Select',
      'Drag', 'Drop', 'Resize', 'Toggle', 'Enable', 'Disable', 'Show', 'Hide',
    ],
  },
];

export const ALL_TERMS = CATEGORIES.flatMap((c) =>
  c.terms.map((term) => ({ term, category: c.category }))
);

export const TOTAL_TERM_COUNT = ALL_TERMS.length;

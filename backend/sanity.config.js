import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'chatverse',

  projectId: '6ji99kiz',
  dataset: 'chatverse',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

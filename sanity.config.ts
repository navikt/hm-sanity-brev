import { visionTool } from '@sanity/vision'
import { AuthStore, createAuthStore, defineConfig, WorkspaceOptions } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schema as types } from './src/schema'

const projectId = 'ypyqai5p'

function navAuthProvider(dataset: string): AuthStore {
  return createAuthStore({
    projectId,
    dataset,
    mode: 'append',
    redirectOnSingle: false,
    providers: [
      {
        name: 'saml',
        title: 'NAV SSO',
        url: 'https://api.sanity.io/v2021-10-01/auth/saml/login/f3270b37',
        logo: '/static/nav-logo-red.svg',
      },
    ],
  })
}

export default defineConfig<WorkspaceOptions[]>([
  {
    projectId,
    title: 'dev',
    dataset: 'hotsak-brev-dev',
    name: 'hotsak-brev-dev',
    basePath: '/hotsak-brev-dev',
    plugins: [deskTool(), visionTool({ defaultApiVersion: '2021-10-21' })],
    schema: {
      types,
    },
    auth: navAuthProvider('hotsak-brev-dev'),
  },
  {
    projectId,
    title: 'prod',
    dataset: 'hotsak-brev-prod',
    name: 'hotsak-brev-prod',
    basePath: '/hotsak-brev-prod',
    plugins: [deskTool(), visionTool({ defaultApiVersion: '2021-10-21' })],
    schema: {
      types,
    },
    auth: navAuthProvider('hotsak-brev-prod'),
  },
  {
    projectId,
    title: 'feedback-dev',
    dataset: 'hotsak-feedback-dev',
    name: 'hotsak-feedback-dev',
    basePath: '/hotsak-feedback-dev',
    plugins: [deskTool(), visionTool({ defaultApiVersion: '2021-10-21' })],
    schema: {
      types,
    },
    auth: navAuthProvider('hotsak-brev-dev'),
  },
])

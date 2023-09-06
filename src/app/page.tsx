// 'use client'
import type { DocSpringTemplate } from '../../types/docspringTypes'
import DocSpring from 'docspring'

import { Button } from '../material-tw-react'
import Link from 'next/link'

const DS_HOST = process.env.DS_HOST || 'https://app.docspring.com'
const DS_API_HOST = process.env.DS_API_HOST || 'https://api.docspring.com'
const DS_API_PATH = process.env.DS_API_PATH || '/api/v1'

// function createDSClient() {
//   const dsConfig = new DocSpring.Configuration()
//   dsConfig.basePath = DS_API_HOST + DS_API_PATH
//   dsConfig.apiTokenId = process.env.DS_API_TOKEN_ID
//   dsConfig.apiTokenSecret = process.env.DS_API_TOKEN_SECRET

//   const dsClient = new DocSpring.Client(dsConfig)
//   return dsClient
// }

async function getTemplates(): Promise<DocSpringTemplate[]> {
  // const dsClient = createDSClient()
  const dsConfig = new DocSpring.Configuration()
  dsConfig.basePath = DS_API_HOST + DS_API_PATH
  dsConfig.apiTokenId = process.env.DS_API_TOKEN_ID
  dsConfig.apiTokenSecret = process.env.DS_API_TOKEN_SECRET

  const dsClient = new DocSpring.Client(dsConfig)

  const dsOpts = {
    page: 1,
    perPage: 10,
  }

  return new Promise((resolve, reject) => {
    dsClient.listTemplates(
      dsOpts,
      (err: Error | null, templates: Array<DocSpringTemplate>) => {
        if (err) {
          reject(err)
        } else {
          resolve(templates)
        }
      }
    )
  })
}

// async function deleteTemplate(templateId: string) {
//   const dsClient = createDSClient()

//   return new Promise((resolve, reject) => {
//     dsClient.deleteTemplate(templateId, (err: Error | null, response: any) => {
//       if (err) {
//         reject(err)
//       } else {
//         console.log(response)
//         resolve(response)
//       }
//     })
//   })
// }

function ButtonLink({ href, label }: { href: string; label: string }) {
  return (
    <a target="_blank" rel="noopener noreferrer" href={href}>
      <div className="p-2 bg-blue-gray-800 hover:bg-teal-800 rounded-md">
        {label}
      </div>
    </a>
  )
}

function TemplateCard({ template }: { template: DocSpringTemplate }) {
  return (
    <li key={template.id} className="bg-blue-gray-700 p-2 rounded-md shadow-md">
      <div>
        <div className="p-2 flex flex-row justify-between">
          <h2 className="text-slate-800 text-2xl break-words">
            {template.name}
          </h2>

          {/* <Button
            onClick={() => deleteTemplate(template.id)}
            className="bg-red-200 shadow-none hover:shadow-none hover:bg-red-800"
          >
            Delete
          </Button> */}
        </div>
        <div className="p-2">{template.description}</div>
      </div>
      <div className="flex flex-row-reverse gap-2">
        <ButtonLink
          href={`${DS_HOST}/templates/${template.id}/edit`}
          label="Edit"
        />
        <ButtonLink
          href={`${DS_HOST}/templates/${template.id}/visual_form`}
          label="Visual Form"
        />
        <ButtonLink
          href={`${DS_HOST}/templates/${template.id}/form`}
          label="Web Form"
        />
        <ButtonLink
          href={`${DS_HOST}/templates/${template.id}/schema.json?pretty=1`}
          label="Schema"
        />
      </div>
    </li>
  )
}

export default async function Home() {
  const templates = await getTemplates()

  return (
    <main className="flex flex-col">
      <h2 className="text-2xl font-bold">Templates</h2>
      <div className="flex flex-wrap justify-center">
        <ul className="p-2 flex flex-col gap-2 w-11/12">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </ul>
      </div>
      <div className="p-2">
        <Button>Sign and Agree</Button>
      </div>
    </main>
  )
}

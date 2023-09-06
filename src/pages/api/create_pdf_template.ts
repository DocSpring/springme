import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  predefined_fields_example,
  predefined_fields_sample_data,
  fw_8ben_predefined_fields,
  fw_8ben_sample_data,
} from '../../../public/example_data'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const basePath =
    (process.env.DS_API_HOST || 'https://api.docspring.com') +
    (process.env.DS_API_PATH || '/api/v1')
  const apiTokenId = process.env.DS_API_TOKEN_ID
  const apiTokenSecret = process.env.DS_API_TOKEN_SECRET

  const templateDocument = fs.readFileSync('./public/fw8ben.pdf')
  const templateBlob = new Blob([templateDocument], {
    type: 'application/pdf',
  })

  const form_headers = new Headers()
  form_headers.append(
    'Authorization',
    'Basic ' + btoa(apiTokenId + ':' + apiTokenSecret)
  )

  const form_data = new FormData()
  form_data.append('template[document]', templateBlob)
  form_data.append(
    'template[name]',
    `FW-8BEN Example Template - ${req.query.data_type}`
  )
  if (req.query.data_type === 'example') {
    form_data.append(
      'template[predefined_fields_sample_data]',
      JSON.stringify(fw_8ben_sample_data)
    )
  } else if (req.query.data_type === 'predefined') {
    form_data.append(
      'template[predefined_fields]',
      JSON.stringify(fw_8ben_predefined_fields)
    )
  }

  const requestOptions = {
    method: 'POST',
    headers: form_headers,
    body: form_data,
  }

  try {
    const response = await fetch(basePath + '/templates', requestOptions)

    if (!response.ok) {
      throw new Error(
        'HTTP error, status = ' + response.status + ' ' + response.statusText
      )
    }

    const result = await response.json()
    res.status(200).json(result)
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: JSON.stringify(error) })
    }
  }
}

export default handler

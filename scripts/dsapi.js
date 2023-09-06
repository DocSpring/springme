#!/usr/bin/env node
require('dotenv').config({ path: '.env.local' })
const { spawn } = require('child_process')

DS_API_URL = process.env.DS_API_HOST
DS_API_PATH = process.env.DS_API_PATH
DS_API_TOKEN_ID = process.env.DS_API_TOKEN_ID
DS_API_TOKEN_SECRET = process.env.DS_API_TOKEN_SECRET

const api_headers = {
  Authorization:
    'Basic ' +
    Buffer.from(DS_API_TOKEN_ID + ':' + DS_API_TOKEN_SECRET).toString('base64'),
}

function get_template(
  id,
  param = undefined,
  full = true,
) {
  let less
  if (!id) {
    console.log('tell me what you want with templates')
    return
  } else if (id === 'all') {
    less = spawn('less', [], { stdio: ['pipe', 'inherit', 'inherit'] })
    id = ''
  }
  fetch(`${DS_API_URL}${DS_API_PATH}/templates/${id}?full=${full}`, {
    method: 'GET',
    headers: api_headers,
  })
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      if (less !== undefined && less.stdin !== undefined) {
        less.stdin.write(JSON.stringify(json, null, 2))
        less.stdin.end()
      } else {
        if (param) {
          console.log(json[param])
        } else {
          console.log(json)
        }
      }
    })
    .catch((err) => console.log(err))
}

function add_field_to_template(id, fieldName) {
  if (!id || !fieldName) {
    console.log('tell me what you want with templates')
    return
  }
  fetch(`${DS_API_URL}${DS_API_PATH}/templates/${id}/fields`, {
    method: 'POST',
    headers: api_headers,
    body: JSON.stringify({
      fields: [
        {
          name: fieldName,
          page: 1
        }
      ]
    }),
  })
    .then((res) => {
      console.log(res.ok)
      return res
    })
    .then((json) => {
      console.log(json)
    })
    .catch((err) => console.log(err))
}


switch (process.argv[2]) {
  case 'templates':
    get_template(process.argv[3], process.argv[4])
    break
  case 'add-field':
    add_field_to_template(process.argv[3], process.argv[4])
    break
  default:
    console.log('Whadda want?')
}

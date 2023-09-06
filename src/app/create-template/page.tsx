'use client'
import DocSpring from 'docspring'
import toast, { Toaster } from 'react-hot-toast'

import { Button } from '../../material-tw-react'
import ShowExampleCode from './showExampleCode'

function createTemplates(
  data_type: 'example' | 'predefined' | 'normal' = 'normal'
) {
  fetch(`/api/create_pdf_template?data_type=${data_type}`)
    .then((response) => toast.success('Template created successfully'))
    .catch((error) => toast.error('Error creating template'))
}

export default function CreateTemplateDemo() {
  return (
    <main className="flex flex-col">
      <div className="flex">
        <div className="gap-2 p-5 flex flex-col w-2/5">
          <Button
            className="bg-blue-gray-700 shadow-none hover:shadow-none hover:bg-teal-800"
            onClick={() => createTemplates('example')}
          >
            Sample Data
          </Button>
          <Button
            className="bg-blue-gray-700 shadow-none hover:shadow-none hover:bg-teal-800"
            onClick={() => createTemplates('predefined')}
          >
            Predefined
          </Button>
          <Button
            className="bg-blue-gray-700 shadow-none hover:shadow-none hover:bg-teal-800"
            onClick={() => createTemplates()}
          >
            PDF Template
          </Button>
        </div>
        <div className="width-3/5 p-5">
          <p>
            This is a demonstration of the predefined fields feature for
            DocSpring. The feature is currently in beta and is not yet finished.
          </p>
          <p>
            The SAMPLE DATA button will generate a template using a set of data
            that might be submitted to fill out your form. Predefined field
            types and names are inferred from this object.
          </p>
          <p>
            The PREDEFINED button will generate a template using a array of
            objects. Field types and names are specified in each object using
            the keys <b>name</b>, <b>required</b> and <b>type</b>.
          </p>
          <p>
            The PDF TEMPLATE button will generate a template using a PDF file in
            the existing manner with no predefined fields.
          </p>
        </div>
      </div>
      <div>
        <ShowExampleCode />
      </div>
      <Toaster position="bottom-right" />
    </main>
  )
}

'use client'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {
  fw_8ben_sample_data,
  fw_8ben_predefined_fields,
} from '../../../public/example_data'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@material-tailwind/react'

type AccordionState = {
  sample: number
  predefined: number
}

export default function ShowExampleCode() {
  const [open, setOpen] = useState<AccordionState>({ sample: 0, predefined: 0 })

  const toggleAccordion = (value: number, accordion: keyof AccordionState) => {
    const isOpen = open[accordion] === value ? 0 : value
    setOpen({ ...open, [accordion]: isOpen })
  }

  return (
    <>
      <Accordion open={open.sample === 1}>
        <AccordionHeader
          className="text-teal-50 hover:text-teal-200"
          onClick={() => toggleAccordion(1, 'sample')}
        >
          This is the sample data that is being used to infer predefined fields
          in the above example.
        </AccordionHeader>
        <AccordionBody>
          <SyntaxHighlighter language="json" style={nord}>
            {/* {codeString} */}
            {JSON.stringify(
              { predefined_fields_sample_data: fw_8ben_sample_data },
              null,
              2
            )}
          </SyntaxHighlighter>
        </AccordionBody>
      </Accordion>
      <Accordion open={open.predefined === 1}>
        <AccordionHeader
          className="text-teal-50 hover:text-teal-200"
          onClick={() => toggleAccordion(1, 'predefined')}
        >
          This is the predefined fields that are being passed above when we
          explicitly define the fields.
        </AccordionHeader>
        <AccordionBody>
          <SyntaxHighlighter language="json" style={nord}>
            {/* {codeString} */}
            {JSON.stringify(
              { predefined_fields: fw_8ben_predefined_fields },
              null,
              2
            )}
          </SyntaxHighlighter>
        </AccordionBody>
      </Accordion>
    </>
  )
}

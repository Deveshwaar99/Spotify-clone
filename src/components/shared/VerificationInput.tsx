'use client'

import React, { useRef, useState, ChangeEvent, KeyboardEvent } from 'react'
import Button from './Button'

export interface State {
  code1: string
  code2: string
  code3: string
  code4: string
  code5: string
  code6: string
}

type VerificationCodeInputPros = {
  handleSubmit?: (state: State) => void
}

const VerificationCodeInput: React.FC<VerificationCodeInputPros> = ({ handleSubmit }) => {
  const fieldsRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<State>({
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  })

  // Switch to input fields method
  const inputFocus = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!fieldsRef.current) return
    const elements = fieldsRef.current.children as HTMLCollectionOf<HTMLInputElement>
    const dataIndex = +e.currentTarget.getAttribute('data-index')!
    if (e.key === 'Delete' || e.key === 'Backspace') {
      const next = dataIndex - 1
      if (next > -1) {
        elements[next].focus()
      }
    } else {
      const next = dataIndex + 1
      if (
        next < elements.length &&
        e.currentTarget.value !== ' ' &&
        e.currentTarget.value !== '' &&
        e.key.length === 1
      ) {
        elements[next].focus()
      }
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>, codeNumber: keyof State) => {
    const value = e.target.value
    setState({ ...state, [codeNumber]: value.slice(value.length - 1) })
  }

  return (
    <div className="flex flex-col gap-y-8">
      <label className="text-gray-400">Verification code</label>
      <div ref={fieldsRef} className="mt-2 flex items-center gap-x-2">
        <input
          type="text"
          data-index="0"
          placeholder="0"
          value={state.code1}
          className="h-12 w-12 rounded-lg border border-gray-400 bg-transparent text-center text-2xl text-white outline-none focus:border-white"
          onChange={e => handleChange(e, 'code1')}
          onKeyUp={inputFocus}
        />
        <input
          type="text"
          data-index="1"
          placeholder="0"
          value={state.code2}
          className="h-12 w-12 rounded-lg border border-gray-400 bg-transparent text-center text-2xl text-white outline-none focus:border-white"
          onChange={e => handleChange(e, 'code2')}
          onKeyUp={inputFocus}
        />
        <input
          type="text"
          data-index="2"
          placeholder="0"
          value={state.code3}
          className="h-12 w-12 rounded-lg border border-gray-400 bg-transparent text-center text-2xl text-white outline-none focus:border-white"
          onChange={e => handleChange(e, 'code3')}
          onKeyUp={inputFocus}
        />
        <input
          type="text"
          data-index="3"
          placeholder="0"
          value={state.code4}
          className="h-12 w-12 rounded-lg border border-gray-400 bg-transparent text-center text-2xl text-white outline-none focus:border-white"
          onChange={e => handleChange(e, 'code4')}
          onKeyUp={inputFocus}
        />
        <input
          type="text"
          data-index="4"
          placeholder="0"
          value={state.code5}
          className="h-12 w-12 rounded-lg border border-gray-400 bg-transparent text-center text-2xl text-white outline-none focus:border-white"
          onChange={e => handleChange(e, 'code5')}
          onKeyUp={inputFocus}
        />
        <input
          type="text"
          data-index="5"
          placeholder="0"
          value={state.code6}
          className="h-12 w-12 rounded-lg border border-gray-400 bg-transparent text-center text-2xl text-white outline-none focus:border-white"
          onChange={e => handleChange(e, 'code6')}
          onKeyUp={inputFocus}
        />
      </div>
      {handleSubmit ? <Button onClick={() => handleSubmit(state)}>Submit</Button> : null}
    </div>
  )
}

export default VerificationCodeInput

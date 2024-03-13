'use client'
import { useDebounce } from '@/hooks/useDebounce'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import Input from './Input'

function SearchInput() {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value)

  const router = useRouter()

  useEffect(() => {
    const query = {
      title: debouncedValue,
    }

    const url = queryString.stringifyUrl({
      url: '/search',
      query,
    })

    router.push(url)
  }, [debouncedValue, router])
  return (
    <div>
      <Input
        placeholder="What do you want to listen to?"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}

export default SearchInput

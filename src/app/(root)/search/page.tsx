import SearchContent from '@/app/(root)/search/_components/SearchContent'
import Header from '@/components/shared/Header'
import SearchInput from '@/components/shared/SearchInput'
import { getSongsByTitle } from '@/utils/actions/getSongsByTitle'
import React from 'react'

interface SearchProps {
  searchParams: { title: string }
}

async function SearchPage({ searchParams }: SearchProps) {
  const title = searchParams.title
  const songs = await getSongsByTitle(title)

  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-3xl font-semibold text-white">Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  )
}

export default SearchPage

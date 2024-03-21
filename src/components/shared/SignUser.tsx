'use client'

import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type SignUserProps = {
  type: 'login' | 'signup'
}
interface UserFormData {
  email: string
  password: string
  username: string
}

export function SignUser({ type }: SignUserProps) {
  const supabase = createClient()
  const router = useRouter()

  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    password: '',
    username: '',
  })

  const [revealPassword, setRevealPassword] = useState(false)
  const [disableButton, setDisableButton] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDisableButton(true)

    let { username, email, password } = formData

    if (type === 'signup') {
      try {
      } catch (error: any) {
        setError(error?.message)
        console.error('error signing up:', error)
      }
    }

    if (type === 'login') {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) {
          setError(error?.message)
        }

        if (data) {
          router.push('/')
        }
      } catch (error: any) {
        setError(error?.message)
        console.error('Error in logging in', error)
      }
    }

    setDisableButton(false)
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        {/* <div>
          <label htmlFor="username" className="sr-only">
            Username
          </label>

          <input
            minLength={5}
            maxLength={20}
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            className="w-full rounded-lg border border-gray-200 bg-inherit p-4 pe-12 text-sm text-white accent-white shadow-sm"
            placeholder="Enter username"
          />
        </div> */}

        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>

          <div className="relative">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 bg-inherit p-4 pe-12 text-sm text-white accent-white shadow-sm"
              placeholder="Enter email"
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>

          <div className="relative">
            <input
              type={revealPassword ? 'text' : 'password'}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              minLength={8}
              className="w-full rounded-lg border border-gray-200 bg-inherit p-4 pe-12 text-sm text-white shadow-sm"
              placeholder="Enter password"
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <button type="button" onClick={() => setRevealPassword(prev => !prev)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>
        {error && (
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="mx-1 mt-1 text-xs font-semibold text-red-600">{error}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          {type === 'login' ? (
            <p className="text-sm text-white">
              No account?
              <Link className="underline" href="/auth/sign-up">
                Sign up
              </Link>
            </p>
          ) : (
            <p className="text-sm text-white">
              Already have an account?
              <Link className="underline" href="/auth/login">
                {' '}
                Login
              </Link>
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={disableButton}
          className="text-md inline-block w-full rounded-full bg-[#1ed760] px-5 py-3 font-medium text-black"
        >
          {type === 'signup' ? 'Sign up' : 'Login'}
        </button>
      </form>
    </div>
  )
}

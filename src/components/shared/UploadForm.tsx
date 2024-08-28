'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Button from './Button'
import { toast, useToast } from '../ui/use-toast'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { useUploadModal } from '@/hooks/useUploadModal'
import { useClient } from '@/providers/SupabaseProvider'
import useUser from '@/hooks/useUser'
import { useRouter } from 'next/navigation'
import uniqid from 'uniqid'

const formSchema = z.object({
  author: z.string().min(2, {
    message: 'Author must be at least 2 characters.',
  }),
  title: z.string().min(1, {
    message: 'title must be at least a character.',
  }),
  songFile: z.string().min(1, {
    message: 'song file is required',
  }),
  imageFile: z.string().min(1, {
    message: 'image file is required',
  }),
})

export function UploadForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSongFile, setSelectedSongFile] = useState<File | undefined | null>(null)
  const [selectedImageFile, setSelectedImageFile] = useState<File | undefined | null>(null)

  const uploadModal = useUploadModal()
  const supabaseClient = useClient()

  const { data: userData } = useUser()

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: '',
      title: '',
      songFile: '',
      imageFile: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      if (
        !values.imageFile ||
        !values.songFile ||
        !selectedSongFile ||
        !selectedImageFile ||
        !userData
      ) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Missing fields',
        })
        return
      }
      const uniqueID = uniqid()
      // Upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueID}`, selectedSongFile, {
          cacheControl: '3600',
          upsert: false,
        })
      if (songError) {
        setIsLoading(false)
        return toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Failed song upload',
        })
      }

      // Upload image
      const { data: imageData, error: imageError } = await supabaseClient.storage
        .from('images')
        .upload(`image-${values.title}-${uniqueID}`, selectedImageFile, {
          cacheControl: '3600',
          upsert: false,
        })

      if (imageError) {
        setIsLoading(false)
        return toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Failed image upload',
        })
      }

      // Create record
      const { error: supabaseError } = await supabaseClient.from('songs').insert({
        user_id: userData?.user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path,
      })

      if (supabaseError) {
        return toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: supabaseError.message,
        })
      }
      router.refresh()
      setIsLoading(false)
      toast({
        variant: 'default',
        description: '🎊 Song uploaded',
      })
      form.reset()
      setSelectedSongFile(null)
      setSelectedImageFile(null)
      uploadModal.onClose()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Author" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage className="m-0 p-0 text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Title" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage className="m-0 p-0 text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="songFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SongFile</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    disabled={isLoading}
                    placeholder="Song"
                    accept=".mp3"
                    {...field}
                    onChange={event => {
                      field.onChange(event.target.value)
                      setSelectedSongFile(event.target.files?.[0])
                    }}
                  />
                </FormControl>
                <FormMessage className="m-0 p-0 text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            // control={form.control}
            name="imageFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ImageFile</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    disabled={isLoading}
                    placeholder="Image"
                    accept="image/*"
                    {...field}
                    onChange={event => {
                      field.onChange(event.target.value)
                      setSelectedImageFile(event.target.files?.[0])
                    }}
                  />
                </FormControl>
                <FormMessage className="m-0 p-0 text-red-600" />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  )
}

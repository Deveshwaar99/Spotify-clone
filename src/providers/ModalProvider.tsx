'use client'
import AuthModal from '@/components/shared/AuthModal'
import UploadModal from '@/components/shared/UploadModal'
import React, { useState } from 'react'

const ModalProvider = () => {
  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  )
}

export default ModalProvider

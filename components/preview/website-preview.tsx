'use client'

import { useEffect, useState } from 'react'
import PersonalWebsite from '../templates/personal-website'
import { WebsiteData } from '@/lib/types'

interface WebsitePreviewProps {
  data: WebsiteData
}

export default function WebsitePreview({ data }: WebsitePreviewProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // Prevent hydration issues
  }

  return (
    <div className="w-full h-full overflow-auto bg-white rounded-lg shadow">
      <div className="sticky top-0 z-10 bg-gray-100 p-4 border-b">
        <h2 className="text-lg font-semibold">Preview Mode</h2>
        <p className="text-sm text-gray-500">
          This is how your website will look when deployed
        </p>
      </div>
      <div className="relative">
        <PersonalWebsite data={data} />
      </div>
    </div>
  )
}
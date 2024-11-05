import { NextRequest, NextResponse } from 'next/server'
import { WebsiteData, PreviewResponse } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const data: WebsiteData = await req.json()
    
    // In a real implementation, you might want to:
    // 1. Validate the data
    // 2. Generate a temporary preview URL
    // 3. Store the preview data in a temporary storage
    
    // For now, we'll just return a success response
    // as the preview is handled client-side
    return NextResponse.json({
      success: true,
      previewUrl: `/preview/${data.username}`
    } as PreviewResponse)
  } catch (error) {
    console.error('Preview generation error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to generate preview'
    } as PreviewResponse)
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { WebsiteData, DeployResponse } from '@/lib/types'
import { deployWebsite } from '@/lib/deploy-utils'

export async function POST(req: NextRequest) {
  try {
    const data: WebsiteData = await req.json()

    // Validate username
    if (!data.username?.match(/^[a-z0-9-]+$/)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid username format. Use only lowercase letters, numbers, and hyphens.'
      } as DeployResponse)
    }

    // Validate required fields
    const requiredFields = ['name', 'email', 'username'] as (keyof WebsiteData)[]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({
          success: false,
          error: `${field} is required`
        } as DeployResponse)
      }
    }

    // Deploy the website
    const result = await deployWebsite(data)

    return NextResponse.json(result as DeployResponse)
  } catch (error) {
    console.error('Deployment error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to deploy website'
    } as DeployResponse)
  }
}
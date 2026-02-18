import { NextResponse } from 'next/server'
import { getCachedWebhookData } from '@/app/lib/webhook-cache'

export async function GET() {
  const brief = getCachedWebhookData()
  
  if (!brief) {
    return NextResponse.json(
      { data: null },
      { status: 200 }
    )
  }
  
  return NextResponse.json(
    { data: brief },
    { status: 200 }
  )
}


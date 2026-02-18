import { NextResponse } from 'next/server'
import { getBrief } from '@/app/lib/brief-store'

export async function GET() {
  const brief = getBrief()
  
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


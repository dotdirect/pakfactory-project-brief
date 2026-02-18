import { NextRequest, NextResponse } from 'next/server'
import { storeBrief } from '@/app/lib/brief-store'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Extract required fields from webhook data
    const { fullName, userEmail, productType } = body
    
    // Validate required fields
    if (!fullName || !userEmail || !productType) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: fullName, userEmail, and productType are required' 
        },
        { status: 400 }
      )
    }
    
    // Store the brief data
    storeBrief({
      fullName: String(fullName),
      userEmail: String(userEmail),
      productType: String(productType),
    })
    
    console.log('Brief data stored:', { fullName, userEmail, productType })
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Brief data received and stored',
        data: { fullName, userEmail, productType }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Webhook endpoint is ready' },
    { status: 200 }
  )
}


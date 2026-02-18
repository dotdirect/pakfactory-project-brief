import { NextRequest, NextResponse } from 'next/server'
import { cacheWebhookData } from '@/app/lib/webhook-cache'

// CORS headers for Botpress - allows requests from any origin
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

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
        { 
          status: 400,
          headers: corsHeaders
        }
      )
    }
    
    // Cache the brief data (for serverless POC)
    const briefData = cacheWebhookData({
      fullName: String(fullName),
      userEmail: String(userEmail),
      productType: String(productType),
    })
    
    console.log('Brief data received and cached:', briefData)
    
    // Return success response for Botpress handoff
    // Botpress expects { status: 'received' } to confirm receipt
    return NextResponse.json(
      { 
        status: 'received'
      },
      { 
        status: 200,
        headers: corsHeaders
      }
    )
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Invalid request' 
      },
      { 
        status: 400,
        headers: corsHeaders
      }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Webhook endpoint is ready' },
    { 
      status: 200,
      headers: corsHeaders
    }
  )
}


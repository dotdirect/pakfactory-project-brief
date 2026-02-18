# Botpress WebChat Integration Setup

This POC integrates Botpress WebChat widget with the existing webhook to test payload flow to the BriefDisplay component.

## Setup Instructions

### 1. Get Your Botpress Bot ID

1. Log into your Botpress dashboard
2. Navigate to your bot
3. Copy your Bot ID (usually found in Settings or the bot URL)

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_BOTPRESS_BOT_ID=your-bot-id-here
```

### 3. Configure Botpress Webhook

In your Botpress dashboard:

1. Go to **Actions** → **Webhooks**
2. Add a new webhook with:
   - **URL**: `https://your-domain.vercel.app/api/webhook` (or `http://localhost:3000/api/webhook` for local testing)
   - **Method**: POST
   - **Headers**: (optional, CORS is already handled)
   - **Payload**: Send the following JSON structure:
     ```json
     {
       "fullName": "{{user.fullName}}",
       "userEmail": "{{user.email}}",
       "productType": "{{conversation.productType}}"
     }
     ```

### 4. Test the Flow

1. Start your Next.js app: `npm run dev`
2. Open the app in your browser
3. The Botpress WebChat widget should appear in the left column
4. Have a conversation with the bot
5. When Botpress sends the webhook payload, the right panel (BriefDisplay) should automatically update

## How It Works

```
Botpress Chat Widget → User Conversation → 
Botpress Webhook Action → POST /api/webhook → 
Webhook caches data → BriefDisplay polls and displays
```

## Troubleshooting

- **Widget not loading**: Check that `NEXT_PUBLIC_BOTPRESS_BOT_ID` is set correctly
- **Webhook not firing**: Verify the webhook URL in Botpress dashboard matches your deployment URL
- **BriefDisplay not updating**: Check browser console for errors, verify webhook is receiving data

## Next Steps

Once the POC validates the payload flow, you can:
- Customize the Botpress widget styling
- Add more fields to the brief
- Implement real-time updates (WebSockets/SSE)
- Replace with custom chat UI if needed


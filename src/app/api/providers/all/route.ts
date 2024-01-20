import { NextResponse } from 'next/server'
export const revalidate = false

export async function GET() {
  try {
    const response = await fetch(`${process.env.API_URL}providers/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })
    if (!response.ok) {
      throw new Error(response.statusText || 'Unknown error')
    }
    const data = await response.json()
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
    
  }
}
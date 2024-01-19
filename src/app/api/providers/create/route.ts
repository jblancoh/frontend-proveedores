import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const res = await request.json();
  try {
    const response = await fetch(`${process.env.API_URL}/providers/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(res)
    })
    const data = await response.json()
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
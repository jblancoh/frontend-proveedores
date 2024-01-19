import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const res = await request.json();
  try {
    const response = await fetch(`${process.env.API_URL}providers/${params.id}`, {
      method: 'PUT',
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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const response = await fetch(`${process.env.API_URL}providers/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
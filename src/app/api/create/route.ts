import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const res = await request.json();
  // const body = await request.body.json()
  console.log("🚀 ~ POST ~ res:", res)
  const data = { message: 'Hello from the API!' }
  return NextResponse.json({ data }, { status: 200 });
  
}
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const res = await request.json();
  try {
    let url = `${process.env.API_URL}providers/csvadhoc`;
    Object.keys(res).forEach((key) => {
      if (url.includes('?')) {
        url += `&${key}=${res[key]}`;
      } else {
        url += `?${key}=${res[key]}`;
      }
    })
    const response = await fetch(url, {
      method: 'POST',
    })
    
    if(!response.ok) {
      throw new Error(response.statusText || 'Unknown error')
    }
    return response
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
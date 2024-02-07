import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type')
  try {
    const response = await fetch(`${process.env.API_URL}providers/csv?tipoReporte=${type}`, {
      method: 'GET',
    }) 
    if (!response.ok) {
      throw new Error(`Error en la respuesta del servidor: ${response.status}`);
    }
    
    return response
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await fetch(`${process.env.API_URL}providers/csvadhoc`, {
      method: 'POST',
      body: JSON.stringify(request.body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(`Error en la respuesta del servidor: ${response.status}`);
    }

    return response
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
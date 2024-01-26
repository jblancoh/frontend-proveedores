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
    console.log("🚀 ~ GET ~ error:", error)
    return NextResponse.json({ error }, { status: 500 });
  }
}
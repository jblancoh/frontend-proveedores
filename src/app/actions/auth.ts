'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function handleLogin(sessionData: any) {
  cookies().set('session', sessionData, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
  redirect('/home')
}

export async function handleLogout() {
  cookies().set('session', '', {
    maxAge: 0,
    path: '/',
  })
  redirect('/login')
}
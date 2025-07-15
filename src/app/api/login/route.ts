import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === 'admin' && password === 'password') {
    const token = 'fake-jwt-token';
    const response = NextResponse.json({ message: 'Успешный вход' });
    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    return response;
  }

  return NextResponse.json({ message: 'Неверные данные' }, { status: 401 });
}

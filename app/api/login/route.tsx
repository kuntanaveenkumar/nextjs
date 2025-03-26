import { NextResponse, NextRequest } from 'next/server';

import { getDbConnection } from '../../lib/db';

export async function GET() {
  const pool = await getDbConnection();
  try {
    const result = await pool.request().query('SELECT TOP(10) * FROM data');

    return NextResponse.json(result.recordset);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  //const pool = await getDbConnection();  
  const body = await request.json();

  const email = body.email || '';
  const password = body.password || '';
  console.log(email)
  console.log(password)
  if (email != "" && password != "") {
    return NextResponse.json({ success: true, message: 'Login successful!' });

  }
  else {
    return NextResponse.json({ success: false, message: 'Invalid credentials' });
  }
}

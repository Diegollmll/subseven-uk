import fs from 'fs';
import path from 'path';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Very basic security - using a secret key in URL parameter
  const { searchParams } = new URL(request.url);
  const secretKey = searchParams.get('key');
  
  // Replace 'your-secret-password' with something secure
  if (secretKey !== '666') {
    return new Response('Unauthorized', { status: 401 });
  }
  
  try {
    const filePath = path.join(process.cwd(), 'waitlist-emails.txt');
    
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const emails = content.split('\n')
        .filter(line => line.trim() !== '')
        .map(line => {
          const [timestamp, email] = line.split(',');
          return { timestamp, email };
        });
      
      return new Response(JSON.stringify(emails, null, 2), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ message: 'No waitlist file found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Error reading waitlist file:', error);
    return new Response(JSON.stringify({ error: 'Error reading waitlist file' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
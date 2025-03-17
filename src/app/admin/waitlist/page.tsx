import fs from 'fs';
import path from 'path';

interface WaitlistEntry {
  timestamp: string;
  email: string;
}

export default function AdminWaitlist() {
  // This code runs on the server
  let waitlistData: WaitlistEntry[] = [];
  const waitlistFilePath = path.join(process.cwd(), 'waitlist-emails.txt');
  
  try {
    if (fs.existsSync(waitlistFilePath)) {
      const fileContent = fs.readFileSync(waitlistFilePath, 'utf8');
      waitlistData = fileContent.split('\n')
        .filter(line => line.trim() !== '')
        .map(line => {
          const [timestamp, email] = line.split(',');
          return { timestamp, email };
        });
    }
  } catch (error) {
    console.error('Error reading waitlist file:', error);
  }
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Waitlist Registrations</h1>
      <p className="mb-4">Total registrations: {waitlistData.length}</p>
      
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Timestamp</th>
            <th className="px-4 py-2 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {waitlistData.map((entry, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{entry.timestamp}</td>
              <td className="px-4 py-2 border">{entry.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
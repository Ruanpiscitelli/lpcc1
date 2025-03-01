export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch(`https://api.visitorapi.com/api/?pid=9AIcXi79egjcfAfi2q7D`, {
      headers: {
        'User-Agent': req.headers['user-agent'],
        'Accept': 'application/json',
        'Origin': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao acessar visitorapi:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 
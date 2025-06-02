import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
  path?: string;
  method?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Set content type
    res.setHeader('Content-Type', 'application/json');
    
    // Return the response
    res.status(200).json({ 
      message: 'Hello from API 2',
      path: req.url,
      method: req.method
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

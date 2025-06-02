import { GetServerSideProps } from 'next';
import type { NextApiResponse } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // Check if the request is for the API
  if (req.headers.accept?.includes('application/json')) {
    (res as NextApiResponse).setHeader('Content-Type', 'application/json');
    (res as NextApiResponse).status(200).json({ message: 'Hello from API 2' });
    return { props: {} };
  }

  // Otherwise redirect to the API endpoint
  return {
    redirect: {
      destination: '/api',
      permanent: false,
    },
  };
};

export default function Home() {
  return null;
} 
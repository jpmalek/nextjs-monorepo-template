import { describe, it, expect } from 'vitest';
import { getServerSideProps } from './index.page';

describe('Home page', () => {
  it('should redirect to /api', async () => {
    const result = await getServerSideProps({} as any);
    expect(result).toEqual({
      redirect: {
        destination: '/api',
        permanent: false,
      },
    });
  });
});

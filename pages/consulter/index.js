import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ConsultRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect
    router.push('/consulter/tous');
  }, [router]);

  return null;
};

export default ConsultRedirect;
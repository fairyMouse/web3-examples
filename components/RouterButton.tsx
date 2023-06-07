import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const RouterButton = () => {
  const router = useRouter();

  return (
    <div className="my-4 flex">
      <Button variant="contained">mui按钮</Button>
      <button
        style={{ padding: '8px', background: 'grey', borderRadius: '8px' }}
        onClick={() => router.back()}
      >
        Back
      </button>
      <button
        style={{ padding: '8px', background: 'grey', borderRadius: '8px' }}
        onClick={() => router.push('/')}
        className="ml-2"
      >
        Go Home
      </button>
    </div>
  );
};

export default RouterButton;

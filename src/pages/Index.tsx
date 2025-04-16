import { CipherProvider } from '@/context/CipherContext';
import CipherApp from '@/components/CipherApp';

const Index = () => {
  return (
    <CipherProvider>
      <CipherApp />
    </CipherProvider>
  );
};

export default Index;

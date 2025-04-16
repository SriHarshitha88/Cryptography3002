import { Link } from 'react-router-dom';
import CipherApp from '@/components/CipherApp';
import ThemeToggle from '@/components/ThemeToggle';

export default function Algorithms() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-primary hover:text-primary/80 flex items-center space-x-2">
            <span>←</span>
            <span>Back to Home</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Cipher Implementation</h1>
        <CipherApp />
      </main>
    </div>
  );
} 
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6">
            Cryptique
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8">
            Explore the Art and Science of Classical Cryptography
          </p>
          <Link to="/algorithms">
            <Button size="lg" className="text-lg">
              Explore Ciphers
            </Button>
          </Link>
        </div>
      </section>

      {/* Introduction Panel */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Understanding Cryptography
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">What is Cryptology?</h3>
              <p className="text-muted-foreground">
                Cryptology is the science of secure communication, encompassing both cryptography (the art of secret writing) and cryptanalysis (the art of breaking codes).
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Codes vs. Ciphers</h3>
              <p className="text-muted-foreground">
                While codes replace words or phrases with symbols, ciphers work at the character level, transforming individual letters according to specific rules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Ciphers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Featured Ciphers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Caesar Cipher', desc: 'A substitution cipher that shifts letters by a fixed number' },
              { name: 'Vigenère Cipher', desc: 'A polyalphabetic substitution cipher using a keyword' },
              { name: 'Playfair Cipher', desc: 'A digraph substitution cipher using a 5x5 matrix' },
              { name: 'Rail Fence Cipher', desc: 'A transposition cipher that writes text in a zigzag pattern' },
              { name: 'Affine Cipher', desc: 'A substitution cipher using modular arithmetic' },
              { name: 'Atbash Cipher', desc: 'A simple substitution cipher that reverses the alphabet' },
            ].map((cipher) => (
              <div key={cipher.name} className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{cipher.name}</h3>
                <p className="text-muted-foreground">{cipher.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Principles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Security Principles
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Kerckhoffs's Principle</h3>
              <p className="text-muted-foreground">
                A cryptosystem should be secure even if everything about the system, except the key, is public knowledge.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Shannon's Maxim</h3>
              <p className="text-muted-foreground">
                The enemy knows the system. Security should not depend on the secrecy of the algorithm.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
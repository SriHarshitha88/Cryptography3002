/**
 * Implementation of the Affine Cipher
 * A monoalphabetic substitution cipher that uses the function (ax + b) mod m
 * where:
 * - a and b are the keys
 * - m is the size of the alphabet (26)
 * - a must be coprime with m
 */
export class AffineCipher {
    private static readonly ALPHABET_SIZE = 26;

    /**
     * Calculates the greatest common divisor of two numbers
     */
    private static gcd(a: number, b: number): number {
        return b === 0 ? a : this.gcd(b, a % b);
    }

    /**
     * Calculates the modular multiplicative inverse of a number
     */
    private static modInverse(a: number, m: number): number {
        a = ((a % m) + m) % m;
        for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) {
                return x;
            }
        }
        throw new Error("Modular multiplicative inverse does not exist");
    }

    /**
     * Checks if a number is coprime with the alphabet size
     */
    private static isCoprime(a: number): boolean {
        return this.gcd(a, this.ALPHABET_SIZE) === 1;
    }

    /**
     * Encrypts the given text using Affine cipher
     * @param text The text to encrypt
     * @param a First key (must be coprime with 26)
     * @param b Second key
     * @returns The encrypted text
     */
    static encrypt(text: string, a: number, b: number): string {
        if (!this.isCoprime(a)) {
            throw new Error("First key (a) must be coprime with 26");
        }

        return text.split('').map(char => {
            if (!char.match(/[a-zA-Z]/)) return char;
            
            const base = char.toUpperCase() === char ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            const x = char.charCodeAt(0) - base;
            // E(x) = (ax + b) mod m
            const encryptedCode = ((a * x + b) % this.ALPHABET_SIZE + this.ALPHABET_SIZE) % this.ALPHABET_SIZE;
            return String.fromCharCode(encryptedCode + base);
        }).join('');
    }

    /**
     * Decrypts the given text using Affine cipher
     * @param text The text to decrypt
     * @param a First key (must be coprime with 26)
     * @param b Second key
     * @returns The decrypted text
     */
    static decrypt(text: string, a: number, b: number): string {
        if (!this.isCoprime(a)) {
            throw new Error("First key (a) must be coprime with 26");
        }

        // Calculate modular multiplicative inverse of a
        const aInverse = this.modInverse(a, this.ALPHABET_SIZE);

        return text.split('').map(char => {
            if (!char.match(/[a-zA-Z]/)) return char;
            
            const base = char.toUpperCase() === char ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            const y = char.charCodeAt(0) - base;
            // D(y) = a^(-1)(y - b) mod m
            const decryptedCode = ((aInverse * (y - b)) % this.ALPHABET_SIZE + this.ALPHABET_SIZE) % this.ALPHABET_SIZE;
            return String.fromCharCode(decryptedCode + base);
        }).join('');
    }
}

// Example usage:
/*
const message = "Hello, World!";
const a = 5; // Must be coprime with 26
const b = 8;
const encrypted = AffineCipher.encrypt(message, a, b);
const decrypted = AffineCipher.decrypt(encrypted, a, b);
console.log("Original: ", message);
console.log("Encrypted:", encrypted);
console.log("Decrypted:", decrypted);
*/ 
/**
 * Implementation of the Caesar Cipher
 * A simple letter-shift cipher with a user-specified shift
 */
export class CaesarCipher {
    /**
     * Encrypts the given text using Caesar cipher with specified shift
     * @param text The text to encrypt
     * @param shift The number of positions to shift each letter
     * @returns The encrypted text
     */
    static encrypt(text: string, shift: number): string {
        return text.split('').map(char => {
            if (!char.match(/[a-zA-Z]/)) return char;
            
            const base = char.toUpperCase() === char ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            // Shift letter and wrap around 26 letters
            const shifted = String.fromCharCode((char.charCodeAt(0) - base + shift) % 26 + base);
            return shifted;
        }).join('');
    }

    /**
     * Decrypts the given text using Caesar cipher with specified shift
     * @param text The text to decrypt
     * @param shift The number of positions that were used to shift each letter
     * @returns The decrypted text
     */
    static decrypt(text: string, shift: number): string {
        // Decryption is done by shifting in the opposite direction
        return this.encrypt(text, 26 - (shift % 26));
    }
}

// Example usage:
/*
const message = "Hello, World!";
const shift = 3;
const encrypted = CaesarCipher.encrypt(message, shift);
const decrypted = CaesarCipher.decrypt(encrypted, shift);
console.log("Original: ", message);
console.log("Encrypted:", encrypted);
console.log("Decrypted:", decrypted);
*/ 
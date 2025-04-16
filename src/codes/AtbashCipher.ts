/**
 * Implementation of the Atbash Cipher
 * A substitution cipher that replaces each letter with its complement
 * (A becomes Z, B becomes Y, etc.)
 */
export class AtbashCipher {
    /**
     * Encrypts the given text using Atbash cipher
     * @param text The text to encrypt
     * @returns The encrypted text
     */
    static encrypt(text: string): string {
        return text.split('').map(char => {
            if (!char.match(/[a-zA-Z]/)) return char;
            
            const base = char.toUpperCase() === char ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            // Convert to 0-25 range, subtract from 25 to get complement, convert back to letter
            const complement = String.fromCharCode(25 - (char.charCodeAt(0) - base) + base);
            return complement;
        }).join('');
    }

    /**
     * Decrypts the given text using Atbash cipher
     * @param text The text to decrypt
     * @returns The decrypted text
     */
    static decrypt(text: string): string {
        // Atbash is its own inverse - encryption and decryption are the same
        return this.encrypt(text);
    }
}

// Example usage:
/*
const message = "Hello, World!";
const encrypted = AtbashCipher.encrypt(message);
const decrypted = AtbashCipher.decrypt(encrypted);
console.log("Original: ", message);
console.log("Encrypted:", encrypted);
console.log("Decrypted:", decrypted);
*/ 
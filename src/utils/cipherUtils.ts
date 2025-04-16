/**
 * Cipher Utilities
 * This file contains utility functions for various classical ciphers
 */

// Caesar Cipher
export const caesarCipher = {
  encrypt: (text: string, shift: number): string => {
    if (shift < 0) {
      return caesarCipher.decrypt(text, Math.abs(shift));
    }
    return text
      .split('')
      .map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const offset = isUpperCase ? 65 : 97;
          // Ensure positive shift and handle wrap-around
          const shifted = ((code - offset + shift) % 26 + 26) % 26;
          return String.fromCharCode(shifted + offset);
        }
        return char;
      })
      .join('');
  },
  decrypt: (text: string, shift: number): string => {
    // Decryption is just encryption with negative shift
    return caesarCipher.encrypt(text, 26 - (shift % 26));
  }
};

// Atbash Cipher
export const atbashCipher = {
  transform: (text: string): string => {
    return text
      .split('')
      .map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const offset = isUpperCase ? 65 : 97;
          // Atbash: A -> Z, B -> Y, etc.
          const transformed = 25 - (code - offset);
          return String.fromCharCode(transformed + offset);
        }
        return char;
      })
      .join('');
  },
  encrypt: (text: string): string => {
    return atbashCipher.transform(text);
  },
  decrypt: (text: string): string => {
    return atbashCipher.transform(text); // Atbash is its own inverse
  }
};

// Affine Cipher
export const affineCipher = {
  encrypt: (text: string, a: number, b: number): string => {
    if (!areCoprimes(a, 26)) {
      throw new Error("'a' must be coprime with 26");
    }
    return text
      .split('')
      .map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const offset = isUpperCase ? 65 : 97;
          const x = code - offset;
          // E(x) = (ax + b) mod m
          const encrypted = ((a * x + b) % 26 + 26) % 26;
          return String.fromCharCode(encrypted + offset);
        }
        return char;
      })
      .join('');
  },
  decrypt: (text: string, a: number, b: number): string => {
    if (!areCoprimes(a, 26)) {
      throw new Error("'a' must be coprime with 26");
    }
    const aInverse = modInverse(a, 26);
    if (aInverse === -1) {
      throw new Error("No modular inverse exists for 'a'");
    }
    return text
      .split('')
      .map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const offset = isUpperCase ? 65 : 97;
          const y = code - offset;
          // D(y) = a^(-1)(y - b) mod m
          const decrypted = ((aInverse * (y - b)) % 26 + 26) % 26;
          return String.fromCharCode(decrypted + offset);
        }
        return char;
      })
      .join('');
  }
};

// Vigenère Cipher
export const vigenereCipher = {
  encrypt: (text: string, key: string): string => {
    if (!key.length) return text;
    const normalizedKey = key.toUpperCase().replace(/[^A-Z]/g, '');
    if (!normalizedKey.length) return text;
    
    return text
      .split('')
      .map((char, i) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const offset = isUpperCase ? 65 : 97;
          const keyChar = normalizedKey[i % normalizedKey.length];
          const keyShift = keyChar.charCodeAt(0) - 65;
          // E(x) = (x + k) mod 26
          const encrypted = ((code - offset + keyShift) % 26 + 26) % 26;
          return String.fromCharCode(encrypted + offset);
        }
        return char;
      })
      .join('');
  },
  decrypt: (text: string, key: string): string => {
    if (!key.length) return text;
    const normalizedKey = key.toUpperCase().replace(/[^A-Z]/g, '');
    if (!normalizedKey.length) return text;
    
    return text
      .split('')
      .map((char, i) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const offset = isUpperCase ? 65 : 97;
          const keyChar = normalizedKey[i % normalizedKey.length];
          const keyShift = keyChar.charCodeAt(0) - 65;
          // D(y) = (y - k) mod 26
          const decrypted = ((code - offset - keyShift) % 26 + 26) % 26;
          return String.fromCharCode(decrypted + offset);
        }
        return char;
      })
      .join('');
  }
};

// Autokey Cipher
export const autokeyCipher = {
  encrypt: (text: string, key: string): string => {
    if (!key.length) return text;
    let fullKey = key.toUpperCase();
    
    return text
      .split('')
      .map((char, i) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const offset = isUpperCase ? 65 : 97;
          
          // For autokey, we extend the key using the plaintext
          if (i >= key.length) {
            const prevChar = text[i - key.length];
            fullKey += prevChar.toUpperCase();
          }
          
          const keyChar = fullKey[i];
          const shift = keyChar.charCodeAt(0) - 65;
          
          return String.fromCharCode(((code - offset + shift) % 26) + offset);
        }
        return char;
      })
      .join('');
  },
  decrypt: (text: string, key: string): string => {
    if (!key.length) return text;
    let fullKey = key.toUpperCase();
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = code >= 65 && code <= 90;
        const offset = isUpperCase ? 65 : 97;
        
        const keyChar = fullKey[i];
        const shift = keyChar.charCodeAt(0) - 65;
        
        const decryptedChar = String.fromCharCode(((code - offset - shift + 26) % 26) + offset);
        result += decryptedChar;
        
        // Extend the key with the decrypted character
        if (i >= key.length - 1) {
          fullKey += decryptedChar.toUpperCase();
        }
      } else {
        result += char;
      }
    }
    
    return result;
  }
};

// Gronsfeld Cipher (similar to Vigenère but with numbers)
export const gronsfeldCipher = {
  encrypt: (text: string, key: string): string => {
    if (!key.length || !key.match(/^\d+$/)) return text;
    
    return text
      .split('')
      .map((char, i) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const offset = isUpperCase ? 65 : 97;
          
          const shift = parseInt(key[i % key.length], 10);
          
          return String.fromCharCode(((code - offset + shift) % 26) + offset);
        }
        return char;
      })
      .join('');
  },
  decrypt: (text: string, key: string): string => {
    if (!key.length || !key.match(/^\d+$/)) return text;
    
    return text
      .split('')
      .map((char, i) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const offset = isUpperCase ? 65 : 97;
          
          const shift = parseInt(key[i % key.length], 10);
          
          return String.fromCharCode(((code - offset - shift + 26) % 26) + offset);
        }
        return char;
      })
      .join('');
  }
};

// Beaufort Cipher
export const beaufortCipher = {
  transform: (text: string, key: string): string => {
    if (!key.length) return text;
    
    return text
      .split('')
      .map((char, i) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const offset = isUpperCase ? 65 : 97;
          
          const keyChar = key[i % key.length].toUpperCase();
          const keyCode = keyChar.charCodeAt(0) - 65;
          const textCode = code - offset;
          
          // Beaufort: key - plaintext (mod 26)
          return String.fromCharCode(((keyCode - textCode + 26) % 26) + offset);
        }
        return char;
      })
      .join('');
  }
};

// Autoclave/Running Key Cipher
export const autoclaveCipher = {
  encrypt: (text: string, key: string): string => {
    if (!key.length) return text;
    
    let fullKey = key;
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = code >= 65 && code <= 90;
        const offset = isUpperCase ? 65 : 97;
        
        // Ensure we have a key character for this position
        let keyChar;
        if (i < fullKey.length) {
          keyChar = fullKey[i].toUpperCase();
        } else {
          keyChar = result[i - key.length].toUpperCase();
        }
        
        const shift = keyChar.charCodeAt(0) - 65;
        const encryptedChar = String.fromCharCode(((code - offset + shift) % 26) + offset);
        result += encryptedChar;
      } else {
        result += char;
      }
    }
    
    return result;
  },
  decrypt: (text: string, key: string): string => {
    if (!key.length) return text;
    
    let fullKey = key;
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = code >= 65 && code <= 90;
        const offset = isUpperCase ? 65 : 97;
        
        // Ensure we have a key character for this position
        let keyChar;
        if (i < fullKey.length) {
          keyChar = fullKey[i].toUpperCase();
        } else {
          // For decryption, we extend the key with the ciphertext
          keyChar = text[i - key.length].toUpperCase();
        }
        
        const shift = keyChar.charCodeAt(0) - 65;
        const decryptedChar = String.fromCharCode(((code - offset - shift + 26) % 26) + offset);
        result += decryptedChar;
      } else {
        result += char;
      }
    }
    
    return result;
  }
};

// Hill Cipher (2x2 matrix implementation)
export const hillCipher = {
  encrypt: (text: string, keyMatrix: number[][]): string => {
    // Ensure proper formatting
    text = text.toLowerCase().replace(/[^a-z]/g, '');
    
    // Pad the text if necessary to ensure even length
    if (text.length % 2 !== 0) {
      text += 'x';
    }
    
    let result = '';
    
    for (let i = 0; i < text.length; i += 2) {
      const pair = [
        text.charCodeAt(i) - 97,
        text.charCodeAt(i + 1) - 97
      ];
      
      const encrypted = [
        (keyMatrix[0][0] * pair[0] + keyMatrix[0][1] * pair[1]) % 26,
        (keyMatrix[1][0] * pair[0] + keyMatrix[1][1] * pair[1]) % 26
      ];
      
      result += String.fromCharCode(encrypted[0] + 97);
      result += String.fromCharCode(encrypted[1] + 97);
    }
    
    return result;
  },
  decrypt: (text: string, keyMatrix: number[][]): string => {
    // Calculate the matrix determinant
    const det = (keyMatrix[0][0] * keyMatrix[1][1] - keyMatrix[0][1] * keyMatrix[1][0] + 26) % 26;
    const detInverse = modInverse(det, 26);
    
    if (detInverse === -1) {
      throw new Error("Matrix is not invertible");
    }
    
    // Calculate the adjugate matrix
    const adjugate = [
      [keyMatrix[1][1], -keyMatrix[0][1] + 26],
      [-keyMatrix[1][0] + 26, keyMatrix[0][0]]
    ];
    
    // Calculate the inverse matrix
    const inverse = [
      [(adjugate[0][0] * detInverse) % 26, (adjugate[0][1] * detInverse) % 26],
      [(adjugate[1][0] * detInverse) % 26, (adjugate[1][1] * detInverse) % 26]
    ];
    
    // Decrypt using the inverse matrix
    return hillCipher.encrypt(text, inverse);
  }
};

// Rail Fence Cipher
export const railFenceCipher = {
  encrypt: (text: string, rails: number): string => {
    if (rails < 2) return text;
    
    const fence = Array(rails).fill('').map(() => []);
    let rail = 0;
    let direction = 1;
    
    for (let i = 0; i < text.length; i++) {
      fence[rail].push(text[i]);
      
      rail += direction;
      
      if (rail === 0 || rail === rails - 1) {
        direction *= -1;
      }
    }
    
    return fence.flat().join('');
  },
  decrypt: (text: string, rails: number): string => {
    if (rails < 2) return text;
    
    const fence = Array(rails).fill('').map(() => []);
    const positions = [];
    let rail = 0;
    let direction = 1;
    
    // Determine positions
    for (let i = 0; i < text.length; i++) {
      positions.push(rail);
      
      rail += direction;
      
      if (rail === 0 || rail === rails - 1) {
        direction *= -1;
      }
    }
    
    // Fill the fence
    const indices = Array(rails).fill(0);
    let curPos = 0;
    
    for (let i = 0; i < rails; i++) {
      for (let j = 0; j < text.length; j++) {
        if (positions[j] === i) {
          fence[i].push(text[curPos++]);
        }
      }
    }
    
    // Read the fence
    let result = '';
    rail = 0;
    direction = 1;
    
    for (let i = 0; i < text.length; i++) {
      result += fence[rail][indices[rail]++];
      
      rail += direction;
      
      if (rail === 0 || rail === rails - 1) {
        direction *= -1;
      }
    }
    
    return result;
  }
};

// Route Cipher
export const routeCipher = {
  encrypt: (text: string, key: number, routeType: 'spiral' | 'snake' = 'spiral'): string => {
    // Pad the text if necessary
    const paddedText = text.padEnd(Math.ceil(text.length / key) * key, 'x');
    
    // Create the grid
    const rows = Math.ceil(paddedText.length / key);
    const grid = [];
    
    for (let i = 0; i < rows; i++) {
      grid.push(paddedText.substring(i * key, (i + 1) * key).split(''));
    }
    
    // Create the route
    let result = '';
    
    if (routeType === 'spiral') {
      // Spiral route
      let top = 0, bottom = rows - 1, left = 0, right = key - 1;
      let direction = 0;
      
      while (top <= bottom && left <= right) {
        if (direction === 0) {
          // Move right
          for (let i = left; i <= right; i++) {
            if (grid[top] && grid[top][i]) result += grid[top][i];
          }
          top++;
        } else if (direction === 1) {
          // Move down
          for (let i = top; i <= bottom; i++) {
            if (grid[i] && grid[i][right]) result += grid[i][right];
          }
          right--;
        } else if (direction === 2) {
          // Move left
          for (let i = right; i >= left; i--) {
            if (grid[bottom] && grid[bottom][i]) result += grid[bottom][i];
          }
          bottom--;
        } else if (direction === 3) {
          // Move up
          for (let i = bottom; i >= top; i--) {
            if (grid[i] && grid[i][left]) result += grid[i][left];
          }
          left++;
        }
        
        direction = (direction + 1) % 4;
      }
    } else {
      // Snake route
      for (let i = 0; i < rows; i++) {
        if (i % 2 === 0) {
          // Left to right
          for (let j = 0; j < key; j++) {
            if (grid[i] && grid[i][j]) result += grid[i][j];
          }
        } else {
          // Right to left
          for (let j = key - 1; j >= 0; j--) {
            if (grid[i] && grid[i][j]) result += grid[i][j];
          }
        }
      }
    }
    
    return result;
  },
  decrypt: (text: string, key: number, routeType: 'spiral' | 'snake' = 'spiral'): string => {
    // This is a simplified implementation
    // A full implementation would require knowing the exact dimensions of the original grid
    const rows = Math.ceil(text.length / key);
    const grid = Array(rows).fill('').map(() => Array(key).fill(''));
    let index = 0;
    
    if (routeType === 'spiral') {
      // Spiral route
      let top = 0, bottom = rows - 1, left = 0, right = key - 1;
      let direction = 0;
      
      while (top <= bottom && left <= right && index < text.length) {
        if (direction === 0) {
          // Move right
          for (let i = left; i <= right && index < text.length; i++) {
            grid[top][i] = text[index++];
          }
          top++;
        } else if (direction === 1) {
          // Move down
          for (let i = top; i <= bottom && index < text.length; i++) {
            grid[i][right] = text[index++];
          }
          right--;
        } else if (direction === 2) {
          // Move left
          for (let i = right; i >= left && index < text.length; i--) {
            grid[bottom][i] = text[index++];
          }
          bottom--;
        } else if (direction === 3) {
          // Move up
          for (let i = bottom; i >= top && index < text.length; i--) {
            grid[i][left] = text[index++];
          }
          left++;
        }
        
        direction = (direction + 1) % 4;
      }
    } else {
      // Snake route
      for (let i = 0; i < rows && index < text.length; i++) {
        if (i % 2 === 0) {
          // Left to right
          for (let j = 0; j < key && index < text.length; j++) {
            grid[i][j] = text[index++];
          }
        } else {
          // Right to left
          for (let j = key - 1; j >= 0 && index < text.length; j--) {
            grid[i][j] = text[index++];
          }
        }
      }
    }
    
    // Read the grid row by row
    let result = '';
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < key; j++) {
        if (grid[i][j]) result += grid[i][j];
      }
    }
    
    return result;
  }
};

// Myszkowski Transposition Cipher
export const myszkowskiCipher = {
  encrypt: (text: string, key: string): string => {
    // Create a numerical key by ranking the letters
    const numKey = createNumericalKey(key);
    
    // Create columns based on the key
    const columns: string[][] = Array(key.length).fill(null).map(() => []);
    
    // Fill the columns
    for (let i = 0; i < text.length; i++) {
      columns[i % key.length].push(text[i]);
    }
    
    // Read off the columns according to the numerical key
    let result = '';
    
    for (let i = 1; i <= Math.max(...numKey); i++) {
      // Find all columns with this numerical key value
      const sameKeyColumns = numKey.map((val, idx) => val === i ? idx : -1).filter(idx => idx !== -1);
      
      // Read these columns in the original order
      for (let row = 0; row < Math.ceil(text.length / key.length); row++) {
        for (const col of sameKeyColumns) {
          if (columns[col][row]) {
            result += columns[col][row];
          }
        }
      }
    }
    
    return result;
  },
  decrypt: (text: string, key: string): string => {
    const numKey = createNumericalKey(key);
    const rows = Math.ceil(text.length / key.length);
    const columns: string[][] = Array(key.length).fill(null).map(() => []);
    
    // Calculate column lengths
    const fullRows = text.length % key.length === 0 ? rows : rows - 1;
    let textIndex = 0;
    
    // Fill the columns according to numerical key
    for (let i = 1; i <= Math.max(...numKey); i++) {
      // Find all columns with this numerical key value
      const sameKeyColumns = numKey.map((val, idx) => val === i ? idx : -1).filter(idx => idx !== -1);
      
      // Fill these columns
      for (const col of sameKeyColumns) {
        for (let row = 0; row < fullRows + (col < text.length % key.length ? 1 : 0); row++) {
          if (textIndex < text.length) {
            columns[col][row] = text[textIndex++];
          }
        }
      }
    }
    
    // Read the plaintext
    let result = '';
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < key.length; col++) {
        if (columns[col][row]) {
          result += columns[col][row];
        }
      }
    }
    
    return result;
  }
};

// NGram Operations
export const ngramCipher = {
  // Extract n-grams from text
  extract: (text: string, n: number): string[] => {
    const ngrams = [];
    for (let i = 0; i <= text.length - n; i++) {
      ngrams.push(text.substring(i, i + n));
    }
    return ngrams;
  },
  
  // Count frequency of n-grams
  frequency: (text: string, n: number): Record<string, number> => {
    const ngrams = ngramCipher.extract(text, n);
    return ngrams.reduce((freq: Record<string, number>, ngram) => {
      freq[ngram] = (freq[ngram] || 0) + 1;
      return freq;
    }, {});
  },
  
  // Replace specific n-grams in text
  replace: (text: string, ngramMap: Record<string, string>): string => {
    let result = text;
    for (const [ngram, replacement] of Object.entries(ngramMap)) {
      const regex = new RegExp(ngram, 'g');
      result = result.replace(regex, replacement);
    }
    return result;
  }
};

// Helper functions

// Check if two numbers are coprime
function areCoprimes(a: number, b: number): boolean {
  return gcd(a, b) === 1;
}

// Find greatest common divisor
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

// Find modular inverse
function modInverse(a: number, m: number): number {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  return -1; // Modular inverse doesn't exist
}

// Create a numerical key for Myszkowski cipher
function createNumericalKey(key: string): number[] {
  const uniqueChars = [...new Set(key)].sort();
  return key.split('').map(char => uniqueChars.indexOf(char) + 1);
}

import React, { createContext, useContext, useState } from 'react';
import { 
  caesarCipher, 
  atbashCipher, 
  affineCipher, 
  vigenereCipher, 
  autokeyCipher, 
  gronsfeldCipher, 
  beaufortCipher, 
  autoclaveCipher, 
  hillCipher, 
  railFenceCipher, 
  routeCipher, 
  myszkowskiCipher, 
  ngramCipher 
} from '../utils/cipherUtils';

// Helper functions for validation
const areCoprimes = (a: number, b: number): boolean => {
  const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
  return gcd(a, b) === 1;
};

const isValidMatrix = (matrix: number[][]): boolean => {
  // Check if matrix is 2x2
  if (!matrix || matrix.length !== 2 || matrix[0].length !== 2 || matrix[1].length !== 2) {
    return false;
  }

  // Check if all elements are integers between 0 and 25
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      if (!Number.isInteger(matrix[i][j]) || matrix[i][j] < 0 || matrix[i][j] > 25) {
        return false;
      }
    }
  }

  // Calculate determinant
  const det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  const detMod26 = ((det % 26) + 26) % 26;

  // Check if determinant is non-zero and coprime with 26
  return detMod26 !== 0 && areCoprimes(detMod26, 26);
};

export type CipherType = 
  | 'caesar' 
  | 'atbash'
  | 'affine'
  | 'vigenere'
  | 'autokey'
  | 'gronsfeld'
  | 'beaufort'
  | 'autoclave'
  | 'hill'
  | 'railfence'
  | 'route'
  | 'myszkowski'
  | 'ngram';

export interface CipherSettings {
  shift?: number;
  a?: number;
  b?: number;
  key?: string;
  keyMatrix?: number[][];
  rails?: number;
  columns?: number;
  routeType?: 'spiral' | 'snake';
  n?: number;
  ngramMap?: Record<string, string>;
}

export interface CipherInfo {
  name: string;
  description: string;
  parameterDescriptions: Record<string, string>;
  visualizable: boolean;
}

export const cipherInfo: Record<CipherType, CipherInfo> = {
  caesar: {
    name: 'Caesar Cipher',
    description: 'A substitution cipher where each letter is shifted a fixed number of places in the alphabet.',
    parameterDescriptions: {
      shift: 'Number of positions to shift each letter (1-25)'
    },
    visualizable: true
  },
  atbash: {
    name: 'Atbash Cipher',
    description: 'A substitution cipher where each letter is mapped to its reverse in the alphabet.',
    parameterDescriptions: {},
    visualizable: true
  },
  affine: {
    name: 'Affine Cipher',
    description: 'A substitution cipher where each letter is mapped using the function (ax + b) mod 26.',
    parameterDescriptions: {
      a: 'Coefficient (must be coprime with 26)',
      b: 'Constant term (0-25)'
    },
    visualizable: true
  },
  vigenere: {
    name: 'Vigenère Cipher',
    description: 'A polyalphabetic substitution cipher using a keyword to determine shifts.',
    parameterDescriptions: {
      key: 'Keyword for shifting'
    },
    visualizable: true
  },
  autokey: {
    name: 'Autokey Cipher',
    description: 'Similar to Vigenère, but the key is extended using the plaintext itself.',
    parameterDescriptions: {
      key: 'Initial keyword for shifting'
    },
    visualizable: true
  },
  gronsfeld: {
    name: 'Gronsfeld Cipher',
    description: 'Similar to Vigenère, but using numbers instead of letters for the key.',
    parameterDescriptions: {
      key: 'Numeric key for shifting (e.g., "31415")'
    },
    visualizable: true
  },
  beaufort: {
    name: 'Beaufort Cipher',
    description: 'A variant of Vigenère where the encryption formula is reversed.',
    parameterDescriptions: {
      key: 'Keyword for shifting'
    },
    visualizable: true
  },
  autoclave: {
    name: 'Autoclave Cipher',
    description: 'A cipher where the key is extended using the ciphertext.',
    parameterDescriptions: {
      key: 'Initial keyword for shifting'
    },
    visualizable: true
  },
  hill: {
    name: 'Hill Cipher',
    description: 'A polygraphic substitution cipher based on linear algebra.',
    parameterDescriptions: {
      keyMatrix: 'A 2x2 matrix of integers'
    },
    visualizable: true
  },
  railfence: {
    name: 'Rail Fence Cipher',
    description: 'A transposition cipher that writes text in a zigzag pattern across rails.',
    parameterDescriptions: {
      rails: 'Number of rails (rows)'
    },
    visualizable: true
  },
  route: {
    name: 'Route Cipher',
    description: 'A transposition cipher that arranges text in a grid and reads it in a specific route.',
    parameterDescriptions: {
      columns: 'Number of columns in the grid',
      routeType: 'Route type: spiral or snake'
    },
    visualizable: true
  },
  myszkowski: {
    name: 'Myszkowski Cipher',
    description: 'A transposition cipher using a keyword to determine column order.',
    parameterDescriptions: {
      key: 'Keyword for ordering columns'
    },
    visualizable: true
  },
  ngram: {
    name: 'N-gram Operations',
    description: 'Operations with n-character sequences of text.',
    parameterDescriptions: {
      n: 'Length of each n-gram',
      ngramMap: 'Mapping of n-grams to replacements'
    },
    visualizable: false
  }
};

interface CipherContextType {
  selectedCipher: CipherType;
  setSelectedCipher: React.Dispatch<React.SetStateAction<CipherType>>;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  outputText: string;
  setOutputText: React.Dispatch<React.SetStateAction<string>>;
  settings: CipherSettings;
  setSettings: React.Dispatch<React.SetStateAction<CipherSettings>>;
  operation: 'encrypt' | 'decrypt';
  setOperation: React.Dispatch<React.SetStateAction<'encrypt' | 'decrypt'>>;
  encryptText: () => void;
  decryptText: () => void;
  resetSettings: () => void;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const CipherContext = createContext<CipherContextType | undefined>(undefined);

export const CipherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCipher, setSelectedCipher] = useState<CipherType>('caesar');
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [settings, setSettings] = useState<CipherSettings>({ shift: 3 });
  const [operation, setOperation] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const resetSettings = () => {
    switch (selectedCipher) {
      case 'caesar':
        setSettings({ shift: 3 });
        break;
      case 'atbash':
        setSettings({});
        break;
      case 'affine':
        setSettings({ a: 5, b: 8 });
        break;
      case 'vigenere':
      case 'autokey':
      case 'beaufort':
      case 'autoclave':
      case 'myszkowski':
        setSettings({ key: 'KEY' });
        break;
      case 'gronsfeld':
        setSettings({ key: '12345' });
        break;
      case 'hill':
        setSettings({ keyMatrix: [[2, 1], [3, 4]] });
        break;
      case 'railfence':
        setSettings({ rails: 3 });
        break;
      case 'route':
        setSettings({ columns: 5, routeType: 'spiral' });
        break;
      case 'ngram':
        setSettings({ n: 2, ngramMap: {} });
        break;
      default:
        setSettings({});
    }
  };

  const encryptText = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    // Validate input text - preserve spaces and handle special characters
    const sanitizedInput = inputText.replace(/[^a-zA-Z\s]/g, '');
    if (sanitizedInput !== inputText) {
      setOutputText('Warning: Special characters were removed from input. Only letters and spaces are allowed.');
      return;
    }

    try {
      // Validate settings based on cipher type
      switch (selectedCipher) {
        case 'affine':
          if (!settings.a || !settings.b || !areCoprimes(settings.a, 26)) {
            throw new Error("Invalid Affine cipher settings: 'a' must be coprime with 26 (valid values: 1,3,5,7,9,11,15,17,19,21,23,25)");
          }
          break;
        case 'vigenere':
        case 'autokey':
        case 'beaufort':
        case 'autoclave':
        case 'myszkowski':
          if (!settings.key || !/^[A-Z]+$/.test(settings.key)) {
            throw new Error(`Invalid ${selectedCipher} cipher key: must contain only uppercase letters (A-Z)`);
          }
          break;
        case 'gronsfeld':
          if (!settings.key || !/^\d+$/.test(settings.key)) {
            throw new Error('Invalid Gronsfeld cipher key: must contain only digits (0-9)');
          }
          break;
        case 'hill':
          if (!settings.keyMatrix || !isValidMatrix(settings.keyMatrix)) {
            throw new Error('Invalid Hill cipher matrix: must be a 2x2 matrix of integers (0-25) with determinant coprime to 26');
          }
          break;
        case 'railfence':
          if (!settings.rails || settings.rails < 2) {
            throw new Error('Invalid Rail Fence cipher settings: number of rails must be at least 2');
          }
          break;
        case 'route':
          if (!settings.columns || settings.columns < 2) {
            throw new Error('Invalid Route cipher settings: number of columns must be at least 2');
          }
          break;
      }

      let result = '';
      switch (selectedCipher) {
        case 'caesar':
          result = caesarCipher.encrypt(inputText, settings.shift || 0);
          break;
        case 'atbash':
          result = atbashCipher.transform(inputText);
          break;
        case 'affine':
          result = affineCipher.encrypt(inputText, settings.a || 1, settings.b || 0);
          break;
        case 'vigenere':
          result = vigenereCipher.encrypt(inputText, settings.key || '');
          break;
        case 'autokey':
          result = autokeyCipher.encrypt(inputText, settings.key || '');
          break;
        case 'gronsfeld':
          result = gronsfeldCipher.encrypt(inputText, settings.key || '');
          break;
        case 'beaufort':
          result = beaufortCipher.transform(inputText, settings.key || '');
          break;
        case 'autoclave':
          result = autoclaveCipher.encrypt(inputText, settings.key || '');
          break;
        case 'hill':
          result = hillCipher.encrypt(inputText, settings.keyMatrix || [[1, 0], [0, 1]]);
          break;
        case 'railfence':
          result = railFenceCipher.encrypt(inputText, settings.rails || 2);
          break;
        case 'route':
          result = routeCipher.encrypt(inputText, settings.columns || 2, settings.routeType || 'spiral');
          break;
        case 'myszkowski':
          result = myszkowskiCipher.encrypt(inputText, settings.key || '');
          break;
        case 'ngram':
          // For n-gram, we'll just show the extracted n-grams
          result = ngramCipher.extract(inputText, settings.n || 2).join(', ');
          break;
        default:
          result = inputText;
      }
      setOutputText(result);
    } catch (error) {
      setOutputText(`Error: ${(error as Error).message}`);
    }
  };

  const decryptText = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    // Validate input text - preserve spaces and handle special characters
    const sanitizedInput = inputText.replace(/[^a-zA-Z\s]/g, '');
    if (sanitizedInput !== inputText) {
      setOutputText('Warning: Special characters were removed from input. Only letters and spaces are allowed.');
      return;
    }

    try {
      // Validate settings based on cipher type
      switch (selectedCipher) {
        case 'affine':
          if (!settings.a || !settings.b || !areCoprimes(settings.a, 26)) {
            throw new Error("Invalid Affine cipher settings: 'a' must be coprime with 26 (valid values: 1,3,5,7,9,11,15,17,19,21,23,25)");
          }
          break;
        case 'vigenere':
        case 'autokey':
        case 'beaufort':
        case 'autoclave':
        case 'myszkowski':
          if (!settings.key || !/^[A-Z]+$/.test(settings.key)) {
            throw new Error(`Invalid ${selectedCipher} cipher key: must contain only uppercase letters (A-Z)`);
          }
          break;
        case 'gronsfeld':
          if (!settings.key || !/^\d+$/.test(settings.key)) {
            throw new Error('Invalid Gronsfeld cipher key: must contain only digits (0-9)');
          }
          break;
        case 'hill':
          if (!settings.keyMatrix || !isValidMatrix(settings.keyMatrix)) {
            throw new Error('Invalid Hill cipher matrix: must be a 2x2 matrix of integers (0-25) with determinant coprime to 26');
          }
          break;
        case 'railfence':
          if (!settings.rails || settings.rails < 2) {
            throw new Error('Invalid Rail Fence cipher settings: number of rails must be at least 2');
          }
          break;
        case 'route':
          if (!settings.columns || settings.columns < 2) {
            throw new Error('Invalid Route cipher settings: number of columns must be at least 2');
          }
          break;
      }

      let result = '';
      switch (selectedCipher) {
        case 'caesar':
          result = caesarCipher.decrypt(inputText, settings.shift || 0);
          break;
        case 'atbash':
          result = atbashCipher.transform(inputText);
          break;
        case 'affine':
          result = affineCipher.decrypt(inputText, settings.a || 1, settings.b || 0);
          break;
        case 'vigenere':
          result = vigenereCipher.decrypt(inputText, settings.key || '');
          break;
        case 'autokey':
          result = autokeyCipher.decrypt(inputText, settings.key || '');
          break;
        case 'gronsfeld':
          result = gronsfeldCipher.decrypt(inputText, settings.key || '');
          break;
        case 'beaufort':
          result = beaufortCipher.transform(inputText, settings.key || '');
          break;
        case 'autoclave':
          result = autoclaveCipher.decrypt(inputText, settings.key || '');
          break;
        case 'hill':
          result = hillCipher.decrypt(inputText, settings.keyMatrix || [[1, 0], [0, 1]]);
          break;
        case 'railfence':
          result = railFenceCipher.decrypt(inputText, settings.rails || 2);
          break;
        case 'route':
          result = routeCipher.decrypt(inputText, settings.columns || 2, settings.routeType || 'spiral');
          break;
        case 'myszkowski':
          result = myszkowskiCipher.decrypt(inputText, settings.key || '');
          break;
        case 'ngram':
          // For n-gram, we'll show the frequencies
          const frequencies = ngramCipher.frequency(inputText, settings.n || 2);
          result = Object.entries(frequencies)
            .sort((a, b) => b[1] - a[1])
            .map(([ngram, count]) => `${ngram}: ${count}`)
            .join('\n');
          break;
        default:
          result = inputText;
      }
      setOutputText(result);
    } catch (error) {
      setOutputText(`Error: ${(error as Error).message}`);
    }
  };

  const value = {
    selectedCipher,
    setSelectedCipher,
    inputText,
    setInputText,
    outputText,
    setOutputText,
    settings,
    setSettings,
    operation,
    setOperation,
    encryptText,
    decryptText,
    resetSettings,
    isDarkMode,
    setIsDarkMode
  };

  return <CipherContext.Provider value={value}>{children}</CipherContext.Provider>;
};

export const useCipher = () => {
  const context = useContext(CipherContext);
  if (context === undefined) {
    throw new Error('useCipher must be used within a CipherProvider');
  }
  return context;
};

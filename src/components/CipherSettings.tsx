
import React from 'react';
import { useCipher, CipherType } from '../context/CipherContext';
import { AlertCircle } from 'lucide-react';

const CipherSettings: React.FC = () => {
  const { selectedCipher, settings, setSettings } = useCipher();

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="cipher-card p-4 space-y-4 animate-fade-in">
      <h3 className="text-lg font-medium">Cipher Settings</h3>
      <div className="space-y-4">
        {renderSettings(selectedCipher, settings, updateSetting)}
      </div>
    </div>
  );
};

const renderSettings = (
  selectedCipher: CipherType,
  settings: any,
  updateSetting: (key: string, value: any) => void
) => {
  switch (selectedCipher) {
    case 'caesar':
      return (
        <div>
          <label className="block text-sm font-medium mb-1">Shift Value</label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="25"
              value={settings.shift || 3}
              onChange={(e) => updateSetting('shift', parseInt(e.target.value))}
              className="w-full"
            />
            <span className="w-8 text-center">{settings.shift || 3}</span>
          </div>
        </div>
      );

    case 'atbash':
      return (
        <div className="flex items-center text-sm text-muted-foreground">
          <AlertCircle className="h-4 w-4 mr-2" />
          No settings required for Atbash cipher
        </div>
      );

    case 'affine':
      return (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">Coefficient (a)</label>
            <select
              value={settings.a || 5}
              onChange={(e) => updateSetting('a', parseInt(e.target.value))}
              className="cipher-select w-full"
            >
              {[1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <div className="text-xs text-muted-foreground mt-1">
              Must be coprime with 26
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Constant (b)</label>
            <input
              type="number"
              min="0"
              max="25"
              value={settings.b || 8}
              onChange={(e) => updateSetting('b', parseInt(e.target.value))}
              className="cipher-select w-full"
            />
          </div>
        </>
      );

    case 'vigenere':
    case 'autokey':
    case 'beaufort':
    case 'autoclave':
    case 'myszkowski':
      return (
        <div>
          <label className="block text-sm font-medium mb-1">Key</label>
          <input
            type="text"
            value={settings.key || 'KEY'}
            onChange={(e) => updateSetting('key', e.target.value.toUpperCase())}
            className="cipher-select w-full"
            placeholder="Enter key (letters only)"
          />
        </div>
      );

    case 'gronsfeld':
      return (
        <div>
          <label className="block text-sm font-medium mb-1">Key (numbers only)</label>
          <input
            type="text"
            value={settings.key || '12345'}
            onChange={(e) => updateSetting('key', e.target.value.replace(/[^0-9]/g, ''))}
            className="cipher-select w-full"
            placeholder="Enter key (numbers only)"
          />
        </div>
      );

    case 'hill':
      return (
        <div>
          <label className="block text-sm font-medium mb-1">2x2 Key Matrix</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={(settings.keyMatrix?.[0]?.[0] ?? 2)}
              onChange={(e) => {
                const matrix = [...(settings.keyMatrix || [[2, 1], [3, 4]])];
                matrix[0][0] = parseInt(e.target.value);
                updateSetting('keyMatrix', matrix);
              }}
              className="cipher-select w-full"
            />
            <input
              type="number"
              value={(settings.keyMatrix?.[0]?.[1] ?? 1)}
              onChange={(e) => {
                const matrix = [...(settings.keyMatrix || [[2, 1], [3, 4]])];
                matrix[0][1] = parseInt(e.target.value);
                updateSetting('keyMatrix', matrix);
              }}
              className="cipher-select w-full"
            />
            <input
              type="number"
              value={(settings.keyMatrix?.[1]?.[0] ?? 3)}
              onChange={(e) => {
                const matrix = [...(settings.keyMatrix || [[2, 1], [3, 4]])];
                matrix[1][0] = parseInt(e.target.value);
                updateSetting('keyMatrix', matrix);
              }}
              className="cipher-select w-full"
            />
            <input
              type="number"
              value={(settings.keyMatrix?.[1]?.[1] ?? 4)}
              onChange={(e) => {
                const matrix = [...(settings.keyMatrix || [[2, 1], [3, 4]])];
                matrix[1][1] = parseInt(e.target.value);
                updateSetting('keyMatrix', matrix);
              }}
              className="cipher-select w-full"
            />
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Matrix determinant must be coprime with 26
          </div>
        </div>
      );

    case 'railfence':
      return (
        <div>
          <label className="block text-sm font-medium mb-1">Number of Rails</label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="2"
              max="10"
              value={settings.rails || 3}
              onChange={(e) => updateSetting('rails', parseInt(e.target.value))}
              className="w-full"
            />
            <span className="w-8 text-center">{settings.rails || 3}</span>
          </div>
        </div>
      );

    case 'route':
      return (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">Number of Columns</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="2"
                max="10"
                value={settings.columns || 5}
                onChange={(e) => updateSetting('columns', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="w-8 text-center">{settings.columns || 5}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Route Type</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="routeType"
                  value="spiral"
                  checked={(settings.routeType || 'spiral') === 'spiral'}
                  onChange={() => updateSetting('routeType', 'spiral')}
                  className="mr-2"
                />
                Spiral
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="routeType"
                  value="snake"
                  checked={(settings.routeType || 'spiral') === 'snake'}
                  onChange={() => updateSetting('routeType', 'snake')}
                  className="mr-2"
                />
                Snake
              </label>
            </div>
          </div>
        </>
      );

    case 'ngram':
      return (
        <div>
          <label className="block text-sm font-medium mb-1">N-gram Size</label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="5"
              value={settings.n || 2}
              onChange={(e) => updateSetting('n', parseInt(e.target.value))}
              className="w-full"
            />
            <span className="w-8 text-center">{settings.n || 2}</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default CipherSettings;

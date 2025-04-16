
import React from 'react';
import { useCipher } from '../../context/CipherContext';
import CaesarVisualization from './CaesarVisualization';
import RailFenceVisualization from './RailFenceVisualization';

const CipherVisualization: React.FC = () => {
  const { selectedCipher, inputText } = useCipher();

  if (!inputText) {
    return (
      <div className="p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground">
        Enter text to see visualization
      </div>
    );
  }

  switch (selectedCipher) {
    case 'caesar':
      return <CaesarVisualization />;
    case 'railfence':
      return <RailFenceVisualization />;
    default:
      return (
        <div className="p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground">
          Visualization for {selectedCipher} coming soon
        </div>
      );
  }
};

export default CipherVisualization;


import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  value: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ value, className }) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast({
      title: 'Copied!',
      description: 'The text has been copied to your clipboard.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={onCopy}
      className={`p-1.5 rounded-md bg-background/80 hover:bg-background transition-all ${className}`}
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-500" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-muted-foreground" />
      )}
    </button>
  );
};

export default CopyButton;

'use client'
import { useState } from "react";

export const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>();

  const copy = async (text: string) => {
    if (!navigator.clipboard) {
      setError('Clipboard API not available');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setError(null);
      // Reset success message after 2 seconds
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      setError('Failed to copy');
    }
  };

  return { copy, copiedText, error };
};
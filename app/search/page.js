import React from 'react';
import SearchResultsClient from './SearchResultsClient';

export default function SearchPage() {
  return (
    <React.Suspense fallback={<div className="pt-24 min-h-screen flex items-center justify-center text-on-surface">Loading search results...</div>}>
      <SearchResultsClient />
    </React.Suspense>
  );
}

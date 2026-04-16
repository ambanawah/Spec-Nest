'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Search() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsExpanded(false);
        setSearchQuery('');
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with query
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsExpanded(false);
      setSearchQuery('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsExpanded(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="relative">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="material-symbols-outlined text-[#e2e0fc]/70 hover:text-[#e2e0fc] transition-all scale-95 active:scale-90 p-2 rounded-full hover:bg-[#333348]/50"
          aria-label="Search"
        >
          search
        </button>
      ) : (
        <form onSubmit={handleSearch} className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search products..."
            className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg py-2 pl-10 pr-4 w-64 text-sm text-on-surface focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
          />
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">
            search
          </span>
          <button
            type="button"
            onClick={() => {
              setIsExpanded(false);
              setSearchQuery('');
            }}
            className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-sm hover:text-on-surface transition-colors"
            aria-label="Close search"
          >
            close
          </button>
        </form>
      )}
    </div>
  );
}
"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";

interface SearchableSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
}

export default function SearchableSelect({
  label,
  value,
  options,
  onChange,
  placeholder = "Select an option",
  searchPlaceholder,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input automatically when dropdown opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation (Escape, Enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setSearchQuery("");
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        handleSelect(filteredOptions[0]);
      } else {
        setIsOpen(false);
        setSearchQuery("");
      }
    }
  };

  // Filter options based on typed query
  const filteredOptions = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) {
      return options;
    }
    return options.filter((opt) => opt.toLowerCase().includes(trimmed));
  }, [options, searchQuery]);

  const handleSelect = (option: string) => {
    onChange(option);
    setSearchQuery("");
    setIsOpen(false);
  };

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultOption = options[0];
    onChange(defaultOption);
    setSearchQuery("");
    setIsOpen(false);
  };

  const isCustomSelected = value && value !== options[0];
  const dynamicPlaceholder =
    searchPlaceholder || `Search ${label.toLowerCase()}...`;

  return (
    <div className="relative text-xs" ref={containerRef}>
      <label className="block text-gray-400 text-[11px] font-semibold mb-1">
        {label}
      </label>

      {/* Main Box: When closed, displays selected category/value; when opened, displays 'Search...' right here */}
      <div className="relative flex items-center">
        {isOpen ? (
          // Active Search Input directly in the box when dropdown is open
          <div className="w-full relative flex items-center">
            <span className="absolute left-2.5 text-gray-400 text-xs pointer-events-none">
              🔍
            </span>
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={dynamicPlaceholder}
              className="w-full bg-[#070b14] border border-amber-500 ring-1 ring-amber-500/30 rounded-xl pl-8 pr-12 py-2 text-xs font-medium text-white placeholder-amber-400/70 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-7 text-gray-400 hover:text-white text-xs cursor-pointer px-1"
                title="Clear search"
              >
                ✕
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-2 text-gray-400 hover:text-white cursor-pointer p-0.5"
              tabIndex={-1}
            >
              <svg
                className="w-3.5 h-3.5 text-amber-400 rotate-180 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        ) : (
          // Closed Trigger Button: Displays the chosen category / value
          <button
            type="button"
            onClick={handleTriggerClick}
            aria-haspopup="listbox"
            aria-expanded={false}
            className="w-full bg-[#070b14] border border-gray-700 hover:border-gray-600 rounded-xl pl-3 pr-8 py-2 text-left text-xs font-medium text-gray-200 flex items-center justify-between transition-colors cursor-pointer select-none"
          >
            <span className="truncate">{value || placeholder}</span>
            <div className="absolute right-2.5 flex items-center gap-1">
              {isCustomSelected && (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={handleClear}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleClear(e as unknown as React.MouseEvent);
                    }
                  }}
                  title="Reset to default"
                  className="text-gray-500 hover:text-gray-300 text-xs px-0.5 cursor-pointer"
                >
                  ✕
                </span>
              )}
              <svg
                className="w-3.5 h-3.5 text-gray-400 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>
        )}
      </div>

      {/* Dropdown Options List: Direct items list without any redundant search bar below */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 z-50 bg-[#0b1220] border border-gray-700/90 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-100 min-w-[210px]">
          <div className="max-h-56 overflow-y-auto overflow-x-hidden py-0.5 text-xs divide-y divide-gray-800/40">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt === value;
                return (
                  <button
                    key={opt}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelect(opt);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-amber-500/15 text-amber-400 font-bold"
                        : "text-gray-300 hover:bg-gray-800/70 hover:text-white"
                    }`}
                  >
                    <span className="truncate">{opt}</span>
                    {isSelected && (
                      <span className="text-amber-400 text-xs font-black">✓</span>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-3 text-center text-gray-500 text-[11px]">
                No matching results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

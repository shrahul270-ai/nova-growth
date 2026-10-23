"use client";

import React, { useState, useRef, useEffect } from "react";

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
  searchPlaceholder = "Search...",
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input on open
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleToggle = () => {
    if (!isOpen) {
      setSearchTerm("");
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative text-xs" ref={dropdownRef}>
      <label className="block text-gray-400 text-[11px] font-semibold mb-1">
        {label}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full bg-[#070b14] border ${
          isOpen ? "border-amber-500 ring-1 ring-amber-500/30" : "border-gray-700 hover:border-gray-600"
        } rounded-xl px-2.5 py-2 text-left text-white flex items-center justify-between gap-1.5 transition-colors cursor-pointer select-none`}
      >
        <span className="truncate text-xs font-medium">
          {value || placeholder}
        </span>
        <svg
          className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-amber-400" : ""
          }`}
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

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 z-50 bg-[#0b1220] border border-gray-700/90 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-100 min-w-[200px]">
          {/* Search Box */}
          <div className="px-2 pb-1.5 pt-0.5 border-b border-gray-800/80">
            <div className="relative flex items-center">
              <span className="absolute left-2 text-gray-400 text-xs pointer-events-none">
                🔍
              </span>
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-[#070b14] border border-gray-700/80 rounded-lg pl-7 pr-6 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                onClick={(e) => e.stopPropagation()}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 text-gray-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-52 overflow-y-auto overflow-x-hidden py-1 text-xs divide-y divide-gray-800/40">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt === value;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-amber-500/15 text-amber-400 font-bold"
                        : "text-gray-300 hover:bg-gray-800/60 hover:text-white"
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
                No matching results
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

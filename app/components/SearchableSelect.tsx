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
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync internal input text when external `value` prop changes (e.g. Reset Filters)
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        // If user typed something that matches an option exactly, select it
        const trimmed = inputValue.trim().toLowerCase();
        if (!trimmed) {
          onChange(options[0]);
          setInputValue(options[0]);
        } else {
          const matched = options.find((opt) => opt.toLowerCase() === trimmed);
          if (matched) {
            onChange(matched);
            setInputValue(matched);
          } else {
            // Revert back to the selected value
            setInputValue(value);
          }
        }
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, inputValue, options, value, onChange]);

  // Handle Escape and Enter keyboard controls
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setInputValue(value);
      inputRef.current?.blur();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        handleSelect(filteredOptions[0]);
      } else {
        setIsOpen(false);
        setInputValue(value);
      }
      inputRef.current?.blur();
    } else if (e.key === "ArrowDown") {
      if (!isOpen) {
        setIsOpen(true);
      }
    }
  };

  // Filter options:
  // If user hasn't modified the value (or if empty), show all options
  // If user typed something different from the current selected value, filter by it
  const filteredOptions = useMemo(() => {
    const trimmed = inputValue.trim().toLowerCase();
    if (!trimmed || inputValue === value) {
      return options;
    }
    return options.filter((opt) => opt.toLowerCase().includes(trimmed));
  }, [options, inputValue, value]);

  const handleSelect = (option: string) => {
    onChange(option);
    setInputValue(option);
    setIsOpen(false);
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsOpen(true);
    // Select existing text so typing immediately replaces it
    e.currentTarget.select();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultOption = options[0];
    onChange(defaultOption);
    setInputValue(defaultOption);
    setIsOpen(false);
  };

  const isCustomSelected = value && value !== options[0];

  return (
    <div className="relative text-xs" ref={containerRef}>
      <label className="block text-gray-400 text-[11px] font-semibold mb-1">
        {label}
      </label>

      {/* Main Input Box - Directly typeable and searchable right here */}
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`w-full bg-[#070b14] border ${
            isOpen
              ? "border-amber-500 ring-1 ring-amber-500/30 text-white"
              : "border-gray-700 hover:border-gray-600 text-gray-200"
          } rounded-xl pl-3 pr-8 py-2 text-xs font-medium focus:outline-none transition-colors cursor-text select-text`}
        />

        {/* Action icons on right */}
        <div className="absolute right-2.5 flex items-center gap-1">
          {isCustomSelected && !isOpen && (
            <button
              type="button"
              onClick={handleClear}
              title="Reset to default"
              className="text-gray-500 hover:text-gray-300 text-xs px-0.5 cursor-pointer"
            >
              ✕
            </button>
          )}
          <button
            type="button"
            onClick={handleChevronClick}
            aria-label="Toggle options list"
            tabIndex={-1}
            className="text-gray-400 hover:text-white cursor-pointer p-0.5"
          >
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
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
        </div>
      </div>

      {/* Dropdown Options List - Pure items list without any redundant search bar */}
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

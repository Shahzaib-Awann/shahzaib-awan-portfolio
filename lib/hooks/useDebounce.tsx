"use client";
import { useEffect, useState } from "react";

/**
 * === useDebounce Hook ===
 *
 * Returns a debounced version of a value, updating it only after a specified delay.
 * Useful for delaying actions such as API calls or heavy computations while typing.
 *
 * @template T - Type of the value being debounced
 * @param {T} value - The input value to debounce
 * @param {number} delay - Delay in milliseconds before updating the debounced value
 * @returns {T} - Debounced value that updates after the delay
 *
 * Example usage:
 * ```ts
 * const debouncedSearch = useDebounce<TypeOfValue>(searchTerm, 500);
 * ```
 */
const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);

         // Cleanup timeout if value or delay changes
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
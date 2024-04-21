import { useState } from "react";

// Define the hook with a generic type parameter T to handle any type of stored data
const useLocalStorage = <T>(key: string, initialValue: T) => {
  // State to store the value, initializing from localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(
        "Failed to retrieve the initial value from localStorage",
        error
      );
      return initialValue;
    }
  });

  // Function to set a value to localStorage and update the state
  const setLocalStorage = (value: T): void => {
    try {
      const serializedValue = JSON.stringify(value);
      window.localStorage.setItem(key, serializedValue);
      setStoredValue(value);
    } catch (error) {
      console.error("Failed to set the value in localStorage", error);
    }
  };

  // Function to remove an item from localStorage
  const removeLocalStorage = (): void => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue); // Optionally reset to initial value or undefined
    } catch (error) {
      console.error("Failed to remove the item from localStorage", error);
    }
  };

  // Function to get a value from localStorage
  const getLocalStorage = (): T | null => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error("Failed to get the value from localStorage", error);
      return null;
    }
  };

  return {
    value: storedValue,
    setLocalStorage,
    removeLocalStorage,
    getLocalStorage,
  };
};

export { useLocalStorage };

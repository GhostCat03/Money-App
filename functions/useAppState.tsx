import { useState, useEffect } from "react";
import { Transaction } from "../types/Transaction";
import Error from "next/error";
import { parseCSV } from "./parseCSV";

const LOCAL_STORAGE_KEY = "app-data"

/**
 * a custom hook to store data in local storage
 * @param filePath the path to the default data
 * @returns [appState, setAppState, isLoading, error]
 */
export default function useAppState(filePath?: string) {
  const [appState, setAppState] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>(null)

  // Loads data upon first page rends
  useEffect(() => {
    const lsData = getStoredAppData()

    if (lsData) {
      setAppState(lsData);
      setStoredAppData(lsData)
      setIsLoading(false)
      return;
    }

    if (!filePath) {
      setIsLoading(false)
      setError("There is no local storage and no file path has been provided")
      return 
    }

    // Otherwise populate the data from the csv
    let isValid = true;

    // Gets data from the file when the app is first opened
    fetch(filePath)
      .then(res => {
        if (!res.ok) {
          setError("error reading file")
          console.log(res)
        }
        return res.text()
      })
      .then(text => {
        if (isValid) {
          const parsedData = parseCSV(text)
          setAppState(parsedData)
          setStoredAppData(parsedData)
          setIsLoading(false)
        }
      })
      .catch(err => {
        setIsLoading(false)
        setError(err.message)
      })

    // Cleanup whenever this is meant to be called again
    return () => {
      isValid = false;
    }
  }, []);

  /**
   * gets all the app data stored within local storage 
   * @returns an array of transactions
   */
  function getStoredAppData(): Transaction[] {
    const lsData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!lsData) {
      return null
    }

    // Existing local data
    const naiveData = JSON.parse(lsData) as Transaction[];
    
    // reconstruct the date objects from strings
    const data = naiveData.map((item) => ({
      ...item,
      date: new Date(item.date)
    }))

    return data;
  }

  /**
   * stores the provided array in local storage
   * @param t an array of transactions to set as the stored app data
   */
  function setStoredAppData(t: Transaction[]) {
    if (!t)
      return;

    // Save data whenever changed
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(t))
    setAppState(t)
  }

  return {appState, setStoredAppData, isLoading, error}
}



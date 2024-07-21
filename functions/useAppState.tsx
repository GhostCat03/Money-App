import { useState, useEffect, useCallback } from "react";
import { Transaction } from "../types/Transaction";
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

    // return data if it is already there
    if (lsData) {
      setAppState(lsData);
      setIsLoading(false)
      return;
    }

    // set error if there is no file path
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

  // everytime appState changes we set it in local storage
  useEffect(() => {
    if (!appState) {
      return
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appState))
  }, [appState])

  /**
   * gets all the app data stored within local storage 
   * @returns an array of transactions
   */
  const getStoredAppData = useCallback((): Transaction[] => {
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
  }, []);

  return {appState, setAppState, isLoading, error}
}



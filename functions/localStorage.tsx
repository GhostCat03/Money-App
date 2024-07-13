import { Transaction } from "../types/Transaction";

const LOCAL_STORAGE_KEY = "app-data"

/**
 * gets all the app data stored within local storage 
 * @returns an array of transactions
 */
export function getStoredAppData(): Transaction[] {
  const lsData = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (lsData) {
    // Existing local data
    const naiveData = JSON.parse(lsData) as Transaction[];
    
    // reconstruct the date objects from strings
    const data = naiveData.map((item) => ({
      ...item,
      date: new Date(item.date)
    }))

    return data;
  }
}

/**
 * stores the provided array in local storage
 * @param t an array of transactions to set as the stored app data
 */
export function setStoredAppData(t: Transaction[]) {
  if (!t)
    return;

  // Save data whenever changed
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(t))
}

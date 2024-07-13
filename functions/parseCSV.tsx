import { Transaction } from "../types/Transaction"

export function parseCSV (fileContent: string): Transaction[] {

  /** converts a string to a date object */
  const parseDate = (dateString: string): Date => {
    const splitData = dateString.split('/')
    return new Date(
      parseInt(splitData[2]),
      parseInt(splitData[1]) - 1,
      parseInt(splitData[0])
    )
  }
  
  /** creates a transaction struct from a split csv */
  const createTransaction = (data: string[]): Transaction => ({
    date: parseDate(data[0]),
    account: data[1],
    description: data[2],
    credit: data[3] ? parseFloat(data[3]) : 0,
    debit: data[4] ? parseFloat(data[4]) : 0,
    category: undefined,
  } as Transaction)

  var data: Transaction[] = []
  fileContent.split("\r\n").forEach((line, index) => {
    if (index > 0) {
      data.push(createTransaction(line.split(',')))
    }
  })
  return data
}



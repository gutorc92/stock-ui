import { Stock, User } from '../interfaces'

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: 101, name: 'Alice' },
  { id: 102, name: 'Bob' },
  { id: 103, name: 'Caroline' },
  { id: 104, name: 'Dave' },
]

export const sampleStockData: Stock[] = [
  { id: 101, name: 'Alice', ticket: 'PETR' },
  { id: 102, name: 'Bob', ticket: "VIIA3" },
  { id: 103, name: 'Caroline', ticket: "XPCA11" },
  { id: 104, name: 'Dave', ticket: "BPAN4" },
]

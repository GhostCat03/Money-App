import { useState } from "react";
import { Transaction } from "../types/Transaction";

export default function useAppState() {
  const [appState, setAppState] = useState<Transaction[] | undefined>();

}



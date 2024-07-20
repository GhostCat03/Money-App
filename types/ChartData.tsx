export type ChartData = {
  labels: string[],
  datasets: DataSetData[]
}

export type DataSetData = {
  label: string,
  data: number[],
}
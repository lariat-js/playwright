export type LariatElement<T> = T & {
  (): Promise<T>
  $: string
}

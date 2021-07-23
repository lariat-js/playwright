export interface LariatElement<T> {
  (): Promise<T>
  $: string
}

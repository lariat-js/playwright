export interface Selector<T> {
  (): Promise<T>
  $: string
}

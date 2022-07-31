export const delay = (ms: number) => {
  new Promise<void>((resolve) => setTimeout(resolve, Math.max(0, ms)));
}

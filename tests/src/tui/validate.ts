/**
 * Matches 0% to 100% with a maximum of 6 digits after the decimal point.
 * @example "0%", "0.0%", "0.5%", "10%", "12.5%", "100%", "100.0%"
 * Does not match "1234%", "100.5%", "33.1234567%"
 */
export const lengthInPercentRegEx = /^((?:(?:0|[1-9][0-9]?)(?:\.[0-9]{1,6})?)|(?:100(?:\.[0]{1,6})?))%$/;

export const hasLengthProperty = <T extends Object, P extends string>(props: T, property: P): props is T & { [P in typeof property]: number | string } => {
  if (!(property in props)) {
    return false;
  }
  const prop: any = (props as any)[property];
  if (typeof prop === "number" && prop >= 0 && Number.isInteger(prop)) {
    return true;
  }

  return (typeof prop === "string" && lengthInPercentRegEx.test(prop));
}

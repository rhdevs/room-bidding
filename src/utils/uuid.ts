import { v5 as uuidv5 } from "uuid";

const namespace = "1b671a64-40d5-491e-99b0-da01ff1f3341";

export function generateUUID(
  str1: string,
  str2: number,
  str3: number = 1,
): string {
  const hash = `${str1}${str2}${str3}`;
  return uuidv5(hash, namespace);
}

export function hashandSlice(str: string) {
  return uuidv5(str, namespace).substring(0, 15);
}

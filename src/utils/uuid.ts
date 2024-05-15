import { v5 as uuidv5 } from "uuid";

export function generateUUID(str1: string, str2: number): string {
  const hash = `${str1}${str2}`;
  const namespace = "1b671a64-40d5-491e-99b0-da01ff1f3341"; // Example UUID namespace

  return uuidv5(hash, namespace);
}

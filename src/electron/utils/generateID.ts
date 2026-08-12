import { v7 as uuid } from "uuid";

export function generateID() {
  return uuid().replace(/-/g, "");
}

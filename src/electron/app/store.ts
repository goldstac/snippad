import Store from "electron-store";

const store = new Store();

export function getItem(key: string) {
  return String(store.get(key));
}

export function setItem(key: string, value: string) {
  store.set(key, value);
}

export function removeItem(key: string) {
  store.delete(key);
}

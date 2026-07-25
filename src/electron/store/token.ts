import Store from "electron-store";

const store = new Store();

export function getToken() {
  if (store.has("token")) {
    return store.get("token") as string;
  }
  return null;
}

export function setToken(token: string) {
  store.set("token", token);
}

export function removeToken() {
  store.delete("token");
}

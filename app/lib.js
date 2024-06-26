import * as SecureStore from "expo-secure-store";

export const urlPath = `http://15.185.186.31`;

export async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
  // console.log("saved  " + key + ":" + value);
}

export async function delete_token() {
  await SecureStore.deleteItemAsync("token");
}

export async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  // console.log("get value for" + key + ":" + result);
  return result;
}

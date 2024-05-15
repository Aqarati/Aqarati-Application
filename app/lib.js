import * as SecureStore from "expo-secure-store";

export const urlPath = `http://172.20.10.2:8888`;

export async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
  // console.log("saved  " + key + ":" + value);
}

export async function delete_token(key) {
  await SecureStore.deleteItemAsync(key);
}

export async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  // console.log("get value for" + key + ":" + result);
  return result;
}

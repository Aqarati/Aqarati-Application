import * as SecureStore from "expo-secure-store";

export const urlPath = "http://192.168.100.17:8888";
export async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
  console.log("saved  " + key + ":" + value);
}

export async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  console.log("get value for" + key + ":" + result);

  return result;
}

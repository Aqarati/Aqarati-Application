import * as SecureStore from "expo-secure-store";

<<<<<<< HEAD
export const urlPath = `http://192.168.100.31`;
=======
export const urlPath = `http://192.168.43.87`;
>>>>>>> 4ca907659e6c38b0f6d8afa91a2dbb2e2af70275

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

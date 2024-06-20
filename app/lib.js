import * as SecureStore from "expo-secure-store";

export const urlPath = `http://ec2-16-24-96-25.me-south-1.compute.amazonaws.com`;

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

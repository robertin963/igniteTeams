import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";

import { groupsGetAll } from "./groupsGetAll";


export async function groupRemoveByName(groupName: string){
  try {
    const storedGroups = await groupsGetAll();
    const groupsFiltered = storedGroups.filter(grupo => grupo !== groupName);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groupsFiltered));

    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`);


  } catch (error) {
    throw error;
  }
}
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION } from '@storage/storageConfig';
import { AppError } from '@utils/AppError';
import { groupsGetAll } from './groupsGetAll';


export async function groupCreate(newGroup: string){
  try {

    const storageGroups = await groupsGetAll();

    const groupAlreadExists = storageGroups.includes(newGroup);
    if(groupAlreadExists){
      throw new AppError('Já existe um grupo cadastrado com esse nome');
    }

    const storage = JSON.stringify([...storageGroups, newGroup]);
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    
  } catch (error) {
    throw error;
  }
}
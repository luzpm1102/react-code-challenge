import { addDoc, getDocs, query, where } from 'firebase/firestore';
import { formatData, getCollectionRef } from '.';
import { User } from '../types';

export const getAllUsers = async (): Promise<User[] | string> => {
  const userRef = getCollectionRef('user');
  const userCol = query(userRef);
  try {
    const docs = await getDocs(userCol);
    if (docs.empty) {
      return 'List Empty';
    }
    const usersData = formatData(docs) as User[];
    return usersData;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const getUserId = async (username: string) => {
  const userRef = getCollectionRef('user');
  const userCol = query(userRef, where('username', '==', username));
  try {
    const docs = await getDocs(userCol);
    if (docs.empty) {
      return null;
    }
    return docs.docs[0].id;
  } catch (error) {
    console.error('Error fetching user ID:', error);
    return null;
  }
};

export const addUser = async (username: string): Promise<string | null> => {
  const userRef = getCollectionRef('user');

  try {
    const user = await addDoc(userRef, { username });
    return user.id;
  } catch (error) {
    console.error('Error adding user:', error);
    return null;
  }
};

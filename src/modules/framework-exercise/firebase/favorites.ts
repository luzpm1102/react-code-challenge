import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { formatData, getCollectionRef } from '.';
import { Pokemon } from '../types';
import { addUser, getUserId } from './user';

export const getUserFavorites = async (
  username: string
): Promise<Pokemon[] | null> => {
  const userId = await getUserId(username);
  if (!userId) {
    return null;
  }
  const path = `user/${userId}/favorites`;
  const favoritesRef = getCollectionRef(path);
  try {
    const docs = await getDocs(favoritesRef);
    if (docs.empty) {
      return null;
    }
    return formatData(docs) as Pokemon[];
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    return null;
  }
};

export const addFavoriteForUser = async (
  username: string,
  favorite: Pokemon
) => {
  let userId = await getUserId(username);

  if (!userId) {
    userId = await addUser(username);
  } else {
    const existingFavorites = await getUserFavorites(username);
    const isFavoriteExist =
      existingFavorites &&
      existingFavorites.some((fav) => fav.id === favorite.id);
    if (isFavoriteExist) {
      return 'exist';
    }
  }
  const path = `user/${userId}/favorites`;
  const favoritesRef = getCollectionRef(path);
  try {
    await addDoc(favoritesRef, favorite);
    return true;
  } catch (error) {
    console.error('Error adding favorite for user:', error);
    return false;
  }
};

export const removeFavoriteForUser = async (
  username: string,
  favoriteId: number
) => {
  const userId = await getUserId(username);
  if (!userId) {
    return null;
  }
  const path = `user/${userId}/favorites`;
  const favoritesRef = getCollectionRef(path);

  const favoriteQuery = query(favoritesRef, where('id', '==', favoriteId));
  const favoriteSnapshot = await getDocs(favoriteQuery);

  if (!favoriteSnapshot.empty) {
    const favoriteDoc = favoriteSnapshot.docs[0];
    try {
      await deleteDoc(doc(favoritesRef, favoriteDoc.id));
      return true;
    } catch (error) {
      console.error('Error removing favorite for user:', error);
      return false;
    }
  } else {
    return false;
  }
};

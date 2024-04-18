/**
 * Interface for the 'Favorites' data
 */
export interface FavoritesEntity {
  id: number; // Primary ID
  type: 'movie' | 'tvshow';
  created_at: string;
}

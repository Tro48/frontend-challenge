import { useFavorites } from '../../hooks/useFavorites';
import CatCard from '../CatCard';
import { CatsList } from '../CatsList';
import { NoContent } from '../NoContent';

export const FavoritePage = () => {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  return (
    <>
      {favorites.length === 0 ? (
        <NoContent />
      ) : (
        <CatsList>
          {favorites.map((cat) => (
            <CatCard
              key={cat.id}
              cardId={cat.id}
              src={cat.url}
              isFavorite={isFavorite}
              onAddFavorite={addFavorite}
              onRemoveFavorite={removeFavorite}
            />
          ))}
        </CatsList>
      )}
    </>
  );
};

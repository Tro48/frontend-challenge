import { lazy, useCallback, useEffect, useRef, useState } from 'react';
import { useFavorites, type Cat } from '../../hooks/useFavorites';
import { CatsList } from '../CatsList';
import styles from './CatsPage.module.css';

const CatCard = lazy(() => import('../CatCard'));

const API_KEY = import.meta.env.VITE_CATS_API_KEY;

export const CatsPage = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [cats, setCats] = useState<Cat[]>([]);
  const observerTarget = useRef(null);
  const isFirstRender = useRef(true);
  const imgLimit = 15;

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const fetchCats = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=${imgLimit}&page=${page}&api_key=${API_KEY}`
      );
      if (!response.ok) {
        console.log('noResp');
      }
      const data: Cat[] = await response.json();
      setCats((prev) => [...prev, ...data]);
    } catch (error) {
      console.error('Ошибка при загрузке котиков:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchCats();
      return;
    }
    if (page > 1) fetchCats();
  }, [fetchCats, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && cats.length > 0) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loading, cats.length]);

  return (
    <>
      {cats.length === 0 ? (
        <CatsList>
          {[...Array(imgLimit).keys()].map((i) => (
            <div key={i} className="skeleton"></div>
          ))}
        </CatsList>
      ) : (
        <CatsList>
          {cats.map((cat) => (
            <CatCard
              cardId={cat.id}
              src={cat.url}
              isFavorite={isFavorite}
              onAddFavorite={addFavorite}
              onRemoveFavorite={removeFavorite}
            />
          ))}
        </CatsList>
      )}

      {loading && (
        <p className={styles.loading}>... загружаем еще котиков ...</p>
      )}
      <div ref={observerTarget} style={{ height: '20px' }} />
    </>
  );
};

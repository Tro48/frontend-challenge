import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { Cat } from '../../hooks/useFavorites';
import { CatsList } from '../CatsList';
import styles from './CatsPage.module.css';

const CatCard = lazy(() => import('../CatCard'));

const API_KEY = import.meta.env.VITE_CATS_API_KEY;

export const CatsPage = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [cats, setCats] = useState<Cat[]>([]);
  const observerTarget = useRef(null);

  const fetchCats = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=15&page=${page}&api_key=${API_KEY}`
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
    fetchCats();
  }, [page]);

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
      <CatsList>
        {cats.map((cat) => (
          <Suspense
            key={cat.id}
            fallback={<div className={styles.skeleton}></div>}
          >
            <CatCard id={cat.id} src={cat.url} />
          </Suspense>
        ))}
      </CatsList>

      {loading && (
        <p className={styles.loading}>... загружаем еще котиков ...</p>
      )}

      {!loading && cats.length === 0 && (
        <div className={styles.noContent}>Тут пока ничего нет</div>
      )}

      <div ref={observerTarget} style={{ height: '20px' }} />
    </>
  );
};

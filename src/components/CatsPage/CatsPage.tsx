import { useCallback, useEffect, useRef, useState } from 'react';
import type { Cat } from '../../hooks/useFavorites';
import { CatCard } from '../CatCard';
import { CatsList } from '../CatsList';
import styles from './CatsPage.module.css';

export const CatsPage = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [catsChanks, setCatsChanks] = useState<Cat[][]>([]);
  const observerTarget = useRef(null);
  const fetchCats = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=15&page=${page}`
      );
      if (!response.ok) {
        console.log('noResp');
      }
      const data: Cat[] = await response.json();
      setCatsChanks((prev) => [...prev, [...data]]);
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
        if (entries[0].isIntersecting && !loading && catsChanks.length > 0) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loading, catsChanks.length]);

  return (
    <>
      {catsChanks.length > 0 && (
        <ul className={styles.chanks}>
          {catsChanks.map((cats, index) => (
            <CatsList key={index}>
              {cats.map((cat) => (
                <CatCard key={cat.id} id={cat.id} src={cat.url} />
              ))}
            </CatsList>
          ))}
        </ul>
      )}

      {loading && (
        <CatsList>
          {[...Array(15)].map((_, i) => (
            <CatCard key={`skeleton-${i}`} loading={true} id="" src="" />
          ))}
        </CatsList>
      )}

      {!loading && catsChanks.length === 0 && (
        <div className={styles.noContent}>Тут пока ничего нет</div>
      )}

      <div ref={observerTarget} style={{ height: '20px' }} />
    </>
  );
};

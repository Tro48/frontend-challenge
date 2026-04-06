import { useCallback, useEffect, useRef, useState } from 'react';
import type { Cat } from '../../hooks/useFavorites';
import { CatCard } from '../CatCard';
import { CatsList } from '../CatsList';
import styles from './CatsPage.module.css';

export const CatsPage = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [cats, setCats] = useState<Cat[]>([]);
  const observerTarget = useRef(null);
  // const fetchCats = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       `https://api.thecatapi.com/v1/images/search?limit=15&page=${page}`
  //     );
  //     const data = await response.json();
  //     setCats((prev) => [...prev, ...data]);
  //     console.log(cats);
  //   } catch (error) {
  //     console.error('Ошибка при загрузке котиков:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [page, cats]);

  useEffect(() => {
    // fetchCats();
  }, [page, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loading]);
  return (
    <>
      <CatsList>
        {cats.map((cat) => (
          <CatCard loading={loading} key={cat.id} id={cat.id} src={cat.url} />
        ))}
      </CatsList>
      {loading && (
        <div className={styles.loading}>... загружаем еще котиков ...</div>
      )}
      <div ref={observerTarget} className="observer-target" />
    </>
  );
};

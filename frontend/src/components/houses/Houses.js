import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Navigation, A11y,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Houses.scss';
import { fetchHouses } from '../../Redux/Reducers/houseSlice';


const Houses = () => {
  const dispatch = useDispatch();
  const houses = useSelector((state) => state.houses.houses);
  const status = useSelector((state) => state.houses.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchHouses());
    }
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(fetchHouses());
  }, [dispatch]);

  const isMobile = window.innerWidth <= 768;

  return (
    <section className="house-sec">
      <h2>Find your Dream Casa</h2>
      <h3 className="email">Please select your Dream House</h3>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'succeeded' && (
        <Swiper
          className="house-list"
          modules={[Navigation, A11y]}
          spaceBetween={5}
          slidesPerView={isMobile ? 1 : 3}
          navigation
        >
          {
            houses.map((item) => (
              <SwiperSlide className="list-items" key={item._id}>
                <div className="houses-imgs">
                <Link to={`${item._id}`}><img src={item.imageURL} alt={item.name} /></Link>
                </div>
                <h5 className={styles.name}><Link to={`${item._id}`}>{item.title}</Link></h5>
                <div className="points">....................</div>
                <p className="email">{item.description}</p>
              </SwiperSlide>
            ))
          }
        </Swiper>
      )}
    </section>
  );
};

export default Houses;

import React from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperWrapper from '../Atomic/SwiperWrapper';

export default function HotelContent() {
  return (
    <SwiperWrapper>
      <Swiper
        slidesPerView={4}
        slidesPerGroup={4}
        spaceBetween={4}
        initialSlide={1}
        // slidesPerGroupSkip={5}
        // breakpoints={{
        //   320: {
        //     slidesPerView: 1,
        //   },
        //   375: {
        //     slidesPerView: 1.25,
        //   },
        //   640: {
        //     slidesPerView: 1.5,
        //   },
        //   960: {
        //     slidesPerView: 2.5,
        //   },
        //   1280: {
        //     slidesPerView: 3.5,
        //   },
        //   1600: {
        //     slidesPerView: 4.5,
        //   },
        // }}
        // centeredSlides
        loop
        navigation
        onSlideChange={cProps => {
          console.log(
            'slidePrev: ',
            cProps,
            cProps.activeIndex,
            cProps.realIndex,
          );
          // cProps.navigation.nextEl.addEventListener('click', evet => {
          //   console.log(evet);
          // });
        }}
        modules={[Navigation]}
      >
        {Array.from(Array(100).keys()).map((loca, index) => (
          <SwiperSlide
            key={String(index)}
            style={{
              paddingBottom: 8,
              height: 110,
            }}
          >
            xxxxxxxxxxx {loca}
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperWrapper>
  );
}

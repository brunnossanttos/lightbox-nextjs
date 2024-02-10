"use client";

import Image, { StaticImageData }  from 'next/image';
import Image01 from '@/assets/img-01.webp';
import Image02 from '@/assets/img-02.webp';
import Image03 from '@/assets/img-03.jpeg';
import Image04 from '@/assets/img-04.jpeg';
import Image05 from '@/assets/img-05.jpeg';
import Image06 from '@/assets/img-06.webp';
import Arrow from '@/assets/arrow.svg';
import Close from '@/assets/close.svg';

import { ThumbImage } from '@/components/thumb-image';
import { useState } from 'react';

export default function Home() {
  const [indexCurrent, setIndexCurrent] = useState<number>(0);
  const [dataImageCurrent, setDataImageCurrent] = useState<StaticImageData | null>(null);

  const isOpen = dataImageCurrent !== null;

  const listImages = [
    Image01, Image02, Image03, Image04, Image05, Image06
  ]

  function handleClickOpenImage(index: number) {
    setDataImageCurrent(listImages[index]);
  }

  function handleClickCloseImage() {
    setDataImageCurrent(null);
  }

  function handleNavidate(direction: 'next' | 'previous') {
    let index = direction === 'next' ? indexCurrent + 1 : indexCurrent - 1;

    if (index < 0) {
      index = listImages.length - 1;
    }

    if (index >= listImages.length) {
      index = 0;
    }

    setIndexCurrent(index);
    setDataImageCurrent(listImages[index]);
  }
  
  return (
    <>
      <section className='w-full min-h-screen flex items-start justify-center py-10 px-3 bg-slate-900'>
        <div className='grid grid-cols-3 gap-3'>
          {
            listImages.map((image, index) => (
            <ThumbImage
              key={index}
                srcImage={image}
                onClick={() => handleClickOpenImage(index)}
            />
            ))
          }
        </div>
      </section>
      {
        isOpen && (
            <div className='fixed inset-0 w-full h-full z-30 flex items-center
      justify-center bg-black bg-opacity-50 gap-4'>
            <button className='absolute top-5 right-5 w-10 hover:opacity-50 transition-opacity'
              onClick={() => handleClickCloseImage()}>
          <Image
            src={Close}
            alt='Close'
          />
            </button>
            <button className='w-12 rotate-180 hover:opacity-50 transition-opacity'
              onClick={() => handleNavidate('previous')}
            >
              <Image
                src={Arrow}
                alt='Arrow Previous'
              />
            </button>
            {
              dataImageCurrent &&
              <Image
                src={dataImageCurrent}
                width={400}
                alt='Image'
              />
            }
            <button className='w-12 hover:opacity-50 transition-opacity'
              onClick={() => handleNavidate('next')}
            >
              <Image
                src={Arrow}
                alt='Arrow Next'
              />
            </button>
          </div>
        )
      }

    </>
    
  );
}

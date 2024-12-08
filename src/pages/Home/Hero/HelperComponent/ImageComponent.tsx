import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { useInView } from 'react-intersection-observer';

export const ImageComponent = ({ url = '' }: { url?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      ref={ref}
      className='image-container'
      style={{ position: 'relative', width: '209px', height: '270px' }}
    >
      {!isLoaded && (
        <ContentLoader
          speed={2}
          width={209}
          height={270}
          viewBox='0 0 209 270'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
        >
          <rect x='0' y='0' rx='34' ry='34' width='208' height='269' />
        </ContentLoader>
      )}
      {inView && (
        <img
          src={url}
          alt='Description'
          onLoad={handleImageLoad}
          style={{
            display: isLoaded ? 'block' : 'none',
            width: '100%',
            height: '100%',
            borderRadius: '34px',
          }}
        />
      )}
    </div>
  );
};

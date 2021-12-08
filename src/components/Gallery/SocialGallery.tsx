import React, { useState } from 'react';

import type { GalleryProps } from 'stream-chat-react';

import { SocialModalWrapper } from './SocialModal';

import type { SocialAttachmentType } from '../ChatContainer/ChatContainer';

export const SocialGallery: React.FC<GalleryProps<SocialAttachmentType>> = (props) => {
  const { images } = props;

  const [modalOpen, setModalOpen] = useState(false);

  const formattedArray = () => {
    return images.map((image) => ({
      source: image.image_url || image.thumb_url || '',
    }));
  };

  const renderImages = images.slice(0, 3).map((image, i) => (
    <div
      className='gallery-image'
      key={`gallery-image-${i}`}
      onClick={() => setModalOpen(!modalOpen)}
    >
      <img alt='individual-gallery-element' src={image.image_url || image.thumb_url} />
    </div>
  ));

  return (
    <div className='gallery'>
      {renderImages}
      {images.length > 3 && (
        <div
          className='gallery-placeholder'
          onClick={() => setModalOpen(true)}
          style={{
            backgroundImage: `url(${images[3].image_url})`,
          }}
        >
          <p>+{images.length - 3}</p>
        </div>
      )}
      {modalOpen && <SocialModalWrapper images={formattedArray()} setModalOpen={setModalOpen} />}
    </div>
  );
};

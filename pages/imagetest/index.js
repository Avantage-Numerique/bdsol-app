import React from 'react';
import ImageCropper from '@/src/common/ImageCropper/ImageCropper';
import MainImageDisplay from '@/src/DataTypes/common/layouts/single/defaultSections/MainImageDisplay/MainImageDisplay';

const TestImage = () => {
  return (
    <div className="mt-5" style={{ height: '100vh', display: 'grid', placeContent: 'center' }}>
      <h2>React Image Crop & Compress Demo</h2>
      <ImageCropper />
      {/*             <MainImageDisplay buttonClasses="fs-6" mainImage={currentMainImage ?? undefined} entity={currentModel ?? undefined} setter={updateModelMainImage ?? undefined}/>
       */}{' '}
    </div>
  );
};

export default TestImage;

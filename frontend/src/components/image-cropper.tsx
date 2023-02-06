import React from 'react';

import ReactCropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface IProps {
  image: string;
  onSave: (cropper: Cropper | undefined) => void;
}

const ImageCropper: React.FC<IProps> = ({ image, onSave }) => {
  return (
    <div>
      <ReactCropper
        style={{ height: '400px', width: '100%' }}
        initialAspectRatio={1}
        viewMode={1}
        zoomTo={0.5}
        src={image}
        minCropBoxHeight={30}
        minCropBoxWidth={30}
        guides={true}
        background={true}
        responsive={true}
        checkOrientation={false}
        onInitialized={(instance) => onSave(instance)}
        minContainerHeight={150}
      />
    </div>
  );
};

export default ImageCropper;

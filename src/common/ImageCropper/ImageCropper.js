import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import imageCompression from 'browser-image-compression';

function getCroppedImg(imageSrc, crop, zoom, aspect = 1) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = imageSrc;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const diameter = Math.min(crop.width, crop.height);
            canvas.width = diameter;
            canvas.height = diameter;
            const ctx = canvas.getContext('2d');

            // Draw circle mask
            ctx.beginPath();
            ctx.arc(diameter / 2, diameter / 2, diameter / 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(
                image,
                crop.x,
                crop.y,
                crop.width,
                crop.height,
                0,
                0,
                diameter,
                diameter
            );

            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/jpeg');
        };
        image.onerror = reject;
    });
}

export default function ImageCropper() {
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImageBlob, setCroppedImageBlob] = useState(null);

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageDataUrl = URL.createObjectURL(file);
            setImageSrc(imageDataUrl);
        }
    };

    const showCroppedImage = async () => {
        try {
            const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels, zoom);
            setCroppedImageBlob(croppedBlob);
        } catch (e) {
            console.error(e);
        }
    };

    const saveImage = () => {
        if (!croppedImageBlob) return;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(croppedImageBlob);
        link.download = 'cropped.jpg';
        link.click();
    };

    const saveCompressedImage = async () => {
        if (!croppedImageBlob) return;

        const compressedFile = await imageCompression(croppedImageBlob, {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 500,
            useWebWorker: true,
        });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(compressedFile);
        link.download = 'compressed.jpg';
        link.click();
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {imageSrc && (
                <div style={{ position: 'relative', width: 400, height: 400 }}>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="round"
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                </div>
            )}
            {imageSrc && (
                <div style={{ marginTop: 20 }}>
                    <button onClick={showCroppedImage}>Crop Complete</button>
                    <button onClick={saveImage} disabled={!croppedImageBlob}>
                        Save Cropped
                    </button>
                    <button onClick={saveCompressedImage} disabled={!croppedImageBlob}>
                        Save Compressed
                    </button>
                </div>
            )}
        </div>
    );
}

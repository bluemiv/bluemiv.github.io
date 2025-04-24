'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import Image, { ImageProps } from 'next/image';

interface Props {
  imageProps: ImageProps;
}

export default function PostContentImage({ imageProps }: Props) {
  const [clicked, setClicked] = useState<boolean>(false);
  return (
    <figure className="mb-md">
      <Image
        onClick={() => setClicked(!clicked)}
        width={720}
        height={300}
        {...(imageProps as ImageProps)}
        className="block object-contain w-full h-full max-h-[500px] rounded cursor-pointer"
      />
      {clicked &&
        createPortal(
          <div
            className="animate-fade-in fixed inset-0 z-10 w-[100vw] h-[100vh] bg-black/40 backdrop-blur-sm flex items-center justify-center cursor-pointer"
            onClick={() => setClicked(!clicked)}
          >
            <Image
              onClick={() => setClicked(!clicked)}
              width={1000}
              height={1000}
              {...(imageProps as ImageProps)}
              className="max-w-[98vw] md:max-w-[90vw] max-h-[80vh] object-contain w-full h-full"
            />
          </div>,
          document.body,
        )}
      {imageProps.alt && (
        <figcaption className="mt-sm text-center text-app-sub-text dark:text-app-dark-sub-text italic">
          {imageProps.alt}
        </figcaption>
      )}
    </figure>
  );
}

import Image from "next/image";

type ProjectImageGalleryProps = {
  images: string[];
};

const frameClassName =
  "relative overflow-hidden rounded-card bg-background-dark p-8";

function GalleryImage({
  src,
  aspectClassName,
  sizes,
}: {
  src: string;
  aspectClassName: string;
  sizes: string;
}) {
  return (
    <div className={`${frameClassName} ${aspectClassName}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        className="object-contain"
      />
    </div>
  );
}

export function ProjectImageGallery({ images }: ProjectImageGalleryProps) {
  if (images.length === 0) {
    return null;
  }

  const heroSizes = "(min-width: 1024px) 66vw, 100vw";
  const pairSizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      {images[0] ? (
        <GalleryImage
          src={images[0]}
          aspectClassName="aspect-square"
          sizes={heroSizes}
        />
      ) : null}

      {images[1] || images[2] ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {images[1] ? (
            <GalleryImage
              src={images[1]}
              aspectClassName="aspect-square"
              sizes={pairSizes}
            />
          ) : null}
          {images[2] ? (
            <GalleryImage
              src={images[2]}
              aspectClassName="aspect-square"
              sizes={pairSizes}
            />
          ) : null}
        </div>
      ) : null}

      {images[3] ? (
        <GalleryImage
          src={images[3]}
          aspectClassName="aspect-[1200/590]"
          sizes={heroSizes}
        />
      ) : null}

      {images[4] ? (
        <GalleryImage
          src={images[4]}
          aspectClassName="aspect-square"
          sizes={heroSizes}
        />
      ) : null}
    </div>
  );
}

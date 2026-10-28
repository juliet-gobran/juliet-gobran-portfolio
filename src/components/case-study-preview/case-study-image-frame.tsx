import Image from "next/image";

type CaseStudyImageFrameProps = {
  src: string;
  alt?: string;
  className?: string;
};

export function CaseStudyImageFrame({
  src,
  alt = "",
  className = "",
}: CaseStudyImageFrameProps) {
  return (
    <div
      className={`relative aspect-[800/586] w-full flex-1 overflow-hidden rounded-card border border-border-subtle bg-surface-sunken p-8 ${className}`.trim()}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 55vw, 100vw"
        className="object-contain"
      />
    </div>
  );
}

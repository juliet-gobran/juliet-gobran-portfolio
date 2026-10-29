type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <h2
      className={`font-jura text-case-study-title font-bold leading-[1.15] text-text-primary ${className}`.trim()}
    >
      {children}
    </h2>
  );
}

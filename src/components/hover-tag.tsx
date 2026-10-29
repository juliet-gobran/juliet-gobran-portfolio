type HoverTagProps = {
  children: React.ReactNode;
};

export function HoverTag({ children }: HoverTagProps) {
  return (
    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-95 rounded-pill bg-text-primary px-2 py-1 font-jura text-xs whitespace-nowrap text-background opacity-0 transition-all duration-200 ease-out group-hover:scale-100 group-hover:opacity-100">
      {children}
    </span>
  );
}

import { MarkdownContent } from "@/components/project/markdown-content";

type ProjectExtraContentProps = {
  content: string;
};

export function ProjectExtraContent({ content }: ProjectExtraContentProps) {
  return (
    <div className="rounded-card bg-surface-sunken p-8">
      <MarkdownContent>{content}</MarkdownContent>
    </div>
  );
}

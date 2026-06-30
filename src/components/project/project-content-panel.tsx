import { MarkdownContent } from "@/components/project/markdown-content";

type ProjectContentPanelProps = {
  content: string;
  className?: string;
};

export function ProjectContentPanel({
  content,
  className = "",
}: ProjectContentPanelProps) {
  return (
    <div
      className={`rounded-card bg-background-dark p-4 md:p-8 ${className}`.trim()}
    >
      <MarkdownContent>{content}</MarkdownContent>
    </div>
  );
}

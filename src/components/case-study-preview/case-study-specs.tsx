type CaseStudySpecsProps = {
  role?: string;
  client?: string;
  scope?: string;
  industry?: string;
  completed?: string;
};

export function CaseStudySpecs({
  role,
  client,
  scope,
  industry,
  completed,
}: CaseStudySpecsProps) {
  const rows: { label: string; value?: string }[] = [
    { label: "Role", value: role },
    { label: "Client", value: client },
    { label: "Scope", value: scope },
    { label: "Industry", value: industry },
    { label: "Completed", value: completed },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));

  return (
    <dl className="flex flex-col text-text-primary">
      {rows.map(({ label, value }) => (
        <div
          key={label}
          className="flex items-center gap-4 border-t border-border-subtle px-2 py-4"
        >
          <dt className="w-24 shrink-0 font-jura text-case-study-label font-bold">
            {label}:
          </dt>
          <dd className="flex-1 font-albert-sans text-case-study-label font-light">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

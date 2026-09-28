"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  STATUSES,
  type Application,
  type ApplicationInput,
  type Criteria,
} from "@/lib/the-search/schema";

const EMPTY_CRITERIA: Criteria = {
  titles: "",
  location: "",
  salary: "",
  sources: "",
  notes: "",
};

const fieldClassName =
  "w-full rounded-shell-bottom border border-border-shell bg-transparent px-3 py-2 font-albert-sans text-sm text-text-primary outline-none focus:border-accent-orange";

const labelClassName =
  "font-jura text-sm text-text-primary";

function statusClassName(status: Application["status"]) {
  if (status === "Interview" || status === "Offer") {
    return "text-accent-orange";
  }
  if (status === "Rejected" || status === "Withdrawn") {
    return "text-text-primary/50";
  }
  return "text-text-primary";
}

async function apiFetch<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!response.ok) {
    throw new Error(`Request to ${input} failed: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delayMs: number,
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Args) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callback(...args), delayMs);
    },
    [callback, delayMs],
  );
}

function CriteriaPanel({
  criteria,
  onChange,
  className,
}: {
  criteria: Criteria;
  onChange: (patch: Partial<Criteria>) => void;
  className?: string;
}) {
  const fields: {
    key: keyof Criteria;
    label: string;
    multiline?: boolean;
  }[] = [
    { key: "titles", label: "Target titles", multiline: true },
    { key: "location", label: "Location", multiline: true },
    { key: "salary", label: "Salary floor" },
    { key: "sources", label: "Where to check", multiline: true },
    { key: "notes", label: "Notes", multiline: true },
  ];

  return (
    <section
      className={`flex flex-col gap-4 ${className ?? ""}`}
    >
      <h2 className="font-jura text-xl text-text-primary">What I&apos;m looking for</h2>
      {fields.map(({ key, label, multiline }) => (
        <div key={key} className="flex flex-col gap-1">
          <label className={labelClassName} htmlFor={`criteria-${key}`}>
            {label}
          </label>
          {multiline ? (
            <textarea
              id={`criteria-${key}`}
              className={`${fieldClassName} min-h-20 resize-y bg-background-dark`}
              value={criteria[key]}
              onChange={(event) => onChange({ [key]: event.target.value })}
            />
          ) : (
            <input
              id={`criteria-${key}`}
              className={fieldClassName}
              value={criteria[key]}
              onChange={(event) => onChange({ [key]: event.target.value })}
            />
          )}
        </div>
      ))}
    </section>
  );
}

function Stats({ applications }: { applications: Application[] }) {
  const total = applications.length;
  const active = applications.filter((application) =>
    ["Applied", "Interview", "No response yet"].includes(application.status),
  ).length;
  const rejected = applications.filter(
    (application) => application.status === "Rejected",
  ).length;
  const offers = applications.filter(
    (application) => application.status === "Offer",
  ).length;

  const stats: [string, number][] = [
    ["Logged", total],
    ["Active", active],
    ["Rejected", rejected],
    ["Offers", offers],
  ];

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border-shell bg-border-shell/20 md:grid-cols-4">
      {stats.map(([label, value]) => (
        <div key={label} className="bg-background-dark p-4">
          <span className="block font-jura text-accent-orange text-4xl">{value}</span>
          <span className="font-albert-sans text-sm text-text-primary">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

type SortableKey =
  | "date"
  | "company"
  | "role"
  | "platform"
  | "status"
  | "contact"
  | "contactRole"
  | "lastTouch";

type SortState = { key: SortableKey; dir: "asc" | "desc" };

type Column = {
  key: SortableKey | null;
  label: string;
  type?: "date" | "text" | "status";
  defaultDir?: "asc" | "desc";
};

const COLUMNS: Column[] = [
  { key: "date", label: "Date", type: "date", defaultDir: "desc" },
  { key: "company", label: "Company", type: "text", defaultDir: "asc" },
  { key: "role", label: "Role", type: "text", defaultDir: "asc" },
  { key: "platform", label: "Platform", type: "text", defaultDir: "asc" },
  { key: "status", label: "Status", type: "status", defaultDir: "asc" },
  { key: "contact", label: "Contact", type: "text", defaultDir: "asc" },
  {
    key: "contactRole",
    label: "Contact role",
    type: "text",
    defaultDir: "asc",
  },
  { key: "lastTouch", label: "Last touch", type: "date", defaultDir: "desc" },
  { key: null, label: "Notes / next step" },
  { key: null, label: "" },
];

function compareApplications(
  a: Application,
  b: Application,
  sort: SortState,
): number {
  const { key, dir } = sort;
  const column = COLUMNS.find((c) => c.key === key);

  let result: number;
  if (column?.type === "status") {
    result = STATUSES.indexOf(a.status) - STATUSES.indexOf(b.status);
  } else {
    const aVal = a[key] ?? "";
    const bVal = b[key] ?? "";
    if (column?.type === "date") {
      // empty dates always sort last, regardless of direction
      if (aVal === "" && bVal === "") result = 0;
      else if (aVal === "") result = 1;
      else if (bVal === "") result = -1;
      else result = aVal.localeCompare(bVal);
    } else {
      result = aVal.localeCompare(bVal, undefined, { sensitivity: "base" });
    }
  }

  return dir === "asc" ? result : -result;
}

function ApplicationsTable({
  applications,
  onFieldChange,
  onDelete,
}: {
  applications: Application[];
  onFieldChange: (id: string, patch: ApplicationInput) => void;
  onDelete: (id: string) => void;
}) {
  const [sort, setSort] = useState<SortState>({ key: "date", dir: "desc" });
  const [statusFilter, setStatusFilter] = useState<
    Set<Application["status"]>
  >(new Set());

  const visibleApplications = useMemo(() => {
    const filtered =
      statusFilter.size === 0
        ? applications
        : applications.filter((application) =>
            statusFilter.has(application.status),
          );

    return [...filtered].sort((a, b) => compareApplications(a, b, sort));
  }, [applications, statusFilter, sort]);

  const toggleStatusFilter = useCallback((status: Application["status"]) => {
    setStatusFilter((current) => {
      const next = new Set(current);
      if (next.has(status)) {
        next.delete(status);
      } else {
        next.add(status);
      }
      return next;
    });
  }, []);

  const handleSort = useCallback((column: Column) => {
    const key = column.key;
    if (!key) return;
    setSort((current) =>
      current.key === key
        ? { key, dir: current.dir === "asc" ? "desc" : "asc" }
        : { key, dir: column.defaultDir ?? "asc" },
    );
  }, []);

  if (applications.length === 0) {
    return (
      <div className="rounded-card border border-border-shell p-10 text-center font-albert-sans text-text-primary/70 bg-background-dark">
        Nothing logged yet — add your first application above.
      </div>
    );
  }

  const inputClassName =
    "w-full min-w-0 rounded border border-transparent bg-transparent px-1 py-1 font-albert-sans text-sm text-text-primary outline-none hover:border-border-shell focus:border-accent-orange [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:hidden";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {STATUSES.map((status) => {
          const active = statusFilter.has(status);
          return (
            <button
              key={status}
              type="button"
              onClick={() => toggleStatusFilter(status)}
              className={`rounded-pill border px-3 py-1 font-albert-sans text-xs transition-colors duration-300 ease-in-out ${
                active
                  ? "border-accent-orange bg-accent-orange text-text-on-accent"
                  : "border-border-shell text-text-primary hover:border-accent-orange"
              }`}
            >
              {status}
            </button>
          );
        })}
        {statusFilter.size > 0 && (
          <button
            type="button"
            onClick={() => setStatusFilter(new Set())}
            className="font-albert-sans text-xs text-text-primary/70 underline underline-offset-2 hover:text-accent-orange"
          >
            Clear
          </button>
        )}
      </div>

      <div className="overflow-x-auto rounded-card border border-border-shell">
        <table className="w-full min-w-[920px] table-fixed border-collapse">
          <colgroup>
            <col className="w-[9%]" />
            <col className="w-[13%]" />
            <col className="w-[13%]" />
            <col className="w-[9%]" />
            <col className="w-[10%]" />
            <col className="w-[11%]" />
            <col className="w-[11%]" />
            <col className="w-[9%]" />
            <col className="w-[12%]" />
            <col className="w-[3%]" />
          </colgroup>
          <thead>
            <tr className="bg-border-shell/10 text-left font-jura text-xs text-text-primary">
              {COLUMNS.map((column) => (
                <th
                  key={column.label || "actions"}
                  className={`truncate px-3 py-2 ${column.key ? "cursor-pointer select-none hover:text-accent-orange" : ""}`}
                  onClick={() => handleSort(column)}
                >
                  {column.label}
                  {sort.key === column.key && (
                    <span className="ml-1 text-accent-orange">
                      {sort.dir === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleApplications.length === 0 ? (
              <tr>
                <td
                  colSpan={COLUMNS.length}
                  className="p-10 text-center font-albert-sans text-text-primary/70"
                >
                  No applications match the selected filters.
                </td>
              </tr>
            ) : (
              visibleApplications.map((application) => (
            <tr
              key={application.id}
              className="border-t border-border-shell align-top bg-background-dark"
            >
              <td className="px-3 py-2">
                <input
                  type="date"
                  className={inputClassName}
                  value={application.date}
                  onChange={(event) =>
                    onFieldChange(application.id, { date: event.target.value })
                  }
                />
              </td>
              <td className="px-3 py-2">
                <input
                  className={inputClassName}
                  value={application.company}
                  onChange={(event) =>
                    onFieldChange(application.id, {
                      company: event.target.value,
                    })
                  }
                />
              </td>
              <td className="px-3 py-2">
                <input
                  className={inputClassName}
                  value={application.role}
                  onChange={(event) =>
                    onFieldChange(application.id, { role: event.target.value })
                  }
                />
              </td>
              <td className="px-3 py-2">
                <input
                  className={inputClassName}
                  value={application.platform}
                  onChange={(event) =>
                    onFieldChange(application.id, {
                      platform: event.target.value,
                    })
                  }
                />
              </td>
              <td className="px-3 py-2">
                <select
                  className={`${inputClassName} ${statusClassName(application.status)}`}
                  value={application.status}
                  onChange={(event) =>
                    onFieldChange(application.id, {
                      status: event.target.value as Application["status"],
                    })
                  }
                >
                  {STATUSES.map((status) => (
                    <option
                      key={status}
                      value={status}
                      className="bg-background-dark text-text-primary"
                    >
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-3 py-2">
                <input
                  className={inputClassName}
                  value={application.contact}
                  onChange={(event) =>
                    onFieldChange(application.id, {
                      contact: event.target.value,
                    })
                  }
                />
              </td>
              <td className="px-3 py-2">
                <input
                  className={inputClassName}
                  value={application.contactRole}
                  onChange={(event) =>
                    onFieldChange(application.id, {
                      contactRole: event.target.value,
                    })
                  }
                />
              </td>
              <td className="px-3 py-2">
                <input
                  type="date"
                  className={inputClassName}
                  value={application.lastTouch}
                  onChange={(event) =>
                    onFieldChange(application.id, {
                      lastTouch: event.target.value,
                    })
                  }
                />
              </td>
              <td className="px-3 py-2">
                <input
                  className={inputClassName}
                  value={application.notes}
                  onChange={(event) =>
                    onFieldChange(application.id, { notes: event.target.value })
                  }
                />
              </td>
              <td className="px-3 py-2">
                <button
                  type="button"
                  title="Delete"
                  onClick={() => {
                    if (
                      confirm("Remove this application from the log?")
                    ) {
                      onDelete(application.id);
                    }
                  }}
                  className="text-lg text-text-primary/50 transition-colors duration-300 ease-in-out hover:text-accent-orange"
                >
                  ✕
                </button>
              </td>
            </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SearchTracker() {
  const [criteria, setCriteria] = useState<Criteria>(EMPTY_CRITERIA);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [criteriaData, applicationsData] = await Promise.all([
        apiFetch<Criteria>("/api/the-search/criteria"),
        apiFetch<Application[]>("/api/the-search/applications"),
      ]);

      if (!cancelled) {
        setCriteria(criteriaData);
        setApplications(applicationsData);
        setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const persistCriteria = useDebouncedCallback((patch: Partial<Criteria>) => {
    apiFetch("/api/the-search/criteria", {
      method: "PATCH",
      body: JSON.stringify(patch),
    }).catch((error) => console.error(error));
  }, 500);

  const handleCriteriaChange = useCallback(
    (patch: Partial<Criteria>) => {
      setCriteria((current) => ({ ...current, ...patch }));
      persistCriteria(patch);
    },
    [persistCriteria],
  );

  const persistApplicationField = useDebouncedCallback(
    (id: string, patch: ApplicationInput) => {
      apiFetch(`/api/the-search/applications/${id}`, {
        method: "PATCH",
        body: JSON.stringify(patch),
      }).catch((error) => console.error(error));
    },
    400,
  );

  const handleFieldChange = useCallback(
    (id: string, patch: ApplicationInput) => {
      setApplications((current) =>
        current.map((application) =>
          application.id === id
            ? { ...application, ...patch }
            : application,
        ),
      );
      persistApplicationField(id, patch);
    },
    [persistApplicationField],
  );

  const handleAdd = useCallback(async () => {
    const application = await apiFetch<Application>(
      "/api/the-search/applications",
      {
        method: "POST",
        body: JSON.stringify({
          date: new Date().toISOString().slice(0, 10),
          status: "Applied",
        }),
      },
    );
    setApplications((current) => [application, ...current]);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    setApplications((current) =>
      current.filter((application) => application.id !== id),
    );
    await apiFetch(`/api/the-search/applications/${id}`, {
      method: "DELETE",
    }).catch((error) => console.error(error));
  }, []);

  if (isLoading) {
    return (
      <p className="font-albert-sans text-text-primary/70">Loading...</p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-jura text-3xl">The Search</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px] lg:items-start">
        <CriteriaPanel
          className="order-2"
          criteria={criteria}
          onChange={handleCriteriaChange}
        />

        <div className="order-1 flex flex-col gap-2">
          <Stats applications={applications} />

          <div className="flex flex-wrap items-baseline justify-between gap-3 pt-4">
            <h2 className="font-jura text-2xl">Applications</h2>
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-pill bg-accent-orange px-4 py-2 font-albert-sans text-sm font-medium text-text-on-accent transition-opacity duration-300 ease-in-out hover:opacity-90"
            >
              + Log an application
            </button>
          </div>

          <ApplicationsTable
            applications={applications}
            onFieldChange={handleFieldChange}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

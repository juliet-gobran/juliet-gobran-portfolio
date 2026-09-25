"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
  "font-jura text-sm text-text-primary/70";

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
}: {
  criteria: Criteria;
  onChange: (patch: Partial<Criteria>) => void;
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
    <section className="flex flex-col gap-4 rounded-card border border-border-shell p-6">
      <h2 className="font-jura text-lg">What you&apos;re looking for</h2>
      {fields.map(({ key, label, multiline }) => (
        <div key={key} className="flex flex-col gap-1">
          <label className={labelClassName} htmlFor={`criteria-${key}`}>
            {label}
          </label>
          {multiline ? (
            <textarea
              id={`criteria-${key}`}
              className={`${fieldClassName} min-h-20 resize-y`}
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
          <span className="block font-jura text-2xl">{value}</span>
          <span className="font-albert-sans text-xs text-text-primary/70">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
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
  if (applications.length === 0) {
    return (
      <div className="rounded-card border border-border-shell p-10 text-center font-albert-sans text-text-primary/70">
        Nothing logged yet — add your first application above.
      </div>
    );
  }

  const inputClassName =
    "w-full min-w-0 rounded border border-transparent bg-transparent px-2 py-1 font-albert-sans text-sm text-text-primary outline-none hover:border-border-shell focus:border-accent-orange";

  return (
    <div className="overflow-x-auto rounded-card border border-border-shell">
      <table className="w-full min-w-[920px] border-collapse">
        <thead>
          <tr className="bg-border-shell/10 text-left font-jura text-xs text-text-primary/70">
            {[
              "Date",
              "Company",
              "Role",
              "Platform",
              "Status",
              "Contact",
              "Contact role",
              "Last touch",
              "Notes / next step",
              "",
            ].map((heading) => (
              <th key={heading} className="whitespace-nowrap px-3 py-2">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr
              key={application.id}
              className="border-t border-border-shell align-top"
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
              <td className="min-w-40 px-3 py-2">
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
          ))}
        </tbody>
      </table>
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
        <h1 className="font-jura text-3xl">Role search log</h1>
        <p className="mt-1 font-albert-sans text-text-primary/70">
          Product Designer → Product Manager, Illawarra &amp; Sydney. One
          place to hold what you&apos;re looking for and what&apos;s
          happened since you applied.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr] lg:items-start">
        <CriteriaPanel criteria={criteria} onChange={handleCriteriaChange} />

        <div className="flex flex-col gap-4">
          <Stats applications={applications} />

          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-jura text-xl">Applications</h2>
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

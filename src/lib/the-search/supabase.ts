import "server-only";

import { createClient } from "@supabase/supabase-js";

import type { Application, ApplicationInput, Criteria } from "./schema";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getSupabaseClient() {
  return createClient(
    getEnv("SUPABASE_URL"),
    getEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false } },
  );
}

type ApplicationRow = {
  id: string;
  date: string;
  company: string;
  role: string;
  platform: string;
  status: Application["status"];
  contact: string;
  contact_role: string;
  last_touch: string | null;
  notes: string;
};

function rowToApplication(row: ApplicationRow): Application {
  return {
    id: row.id,
    date: row.date,
    company: row.company,
    role: row.role,
    platform: row.platform,
    status: row.status,
    contact: row.contact,
    contactRole: row.contact_role,
    lastTouch: row.last_touch ?? "",
    notes: row.notes,
  };
}

function applicationInputToRow(input: ApplicationInput) {
  return {
    ...(input.date !== undefined && { date: input.date }),
    ...(input.company !== undefined && { company: input.company }),
    ...(input.role !== undefined && { role: input.role }),
    ...(input.platform !== undefined && { platform: input.platform }),
    ...(input.status !== undefined && { status: input.status }),
    ...(input.contact !== undefined && { contact: input.contact }),
    ...(input.contactRole !== undefined && {
      contact_role: input.contactRole,
    }),
    ...(input.lastTouch !== undefined && {
      last_touch: input.lastTouch || null,
    }),
    ...(input.notes !== undefined && { notes: input.notes }),
  };
}

export async function getCriteria(): Promise<Criteria> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("the_search_criteria")
    .select("titles, location, salary, sources, notes")
    .eq("id", 1)
    .single();

  if (error) {
    throw new Error(`Failed to load criteria: ${error.message}`);
  }

  return data;
}

export async function updateCriteria(
  input: Partial<Criteria>,
): Promise<Criteria> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("the_search_criteria")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", 1)
    .select("titles, location, salary, sources, notes")
    .single();

  if (error) {
    throw new Error(`Failed to update criteria: ${error.message}`);
  }

  return data;
}

export async function listApplications(): Promise<Application[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("the_search_applications")
    .select(
      "id, date, company, role, platform, status, contact, contact_role, last_touch, notes",
    )
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load applications: ${error.message}`);
  }

  return (data as ApplicationRow[]).map(rowToApplication);
}

export async function createApplication(
  input: ApplicationInput,
): Promise<Application> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("the_search_applications")
    .insert(applicationInputToRow(input))
    .select(
      "id, date, company, role, platform, status, contact, contact_role, last_touch, notes",
    )
    .single();

  if (error) {
    throw new Error(`Failed to create application: ${error.message}`);
  }

  return rowToApplication(data as ApplicationRow);
}

export async function updateApplication(
  id: string,
  input: ApplicationInput,
): Promise<Application> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("the_search_applications")
    .update({
      ...applicationInputToRow(input),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select(
      "id, date, company, role, platform, status, contact, contact_role, last_touch, notes",
    )
    .single();

  if (error) {
    throw new Error(`Failed to update application: ${error.message}`);
  }

  return rowToApplication(data as ApplicationRow);
}

export async function deleteApplication(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from("the_search_applications")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to delete application: ${error.message}`);
  }
}

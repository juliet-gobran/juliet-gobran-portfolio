import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  createApplication,
  listApplications,
} from "@/lib/the-search/supabase";
import { applicationInputSchema } from "@/lib/the-search/schema";

export async function GET() {
  const applications = await listApplications();
  return NextResponse.json(applications);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = applicationInputSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.message },
      { status: 400 },
    );
  }

  const application = await createApplication(result.data);
  return NextResponse.json(application, { status: 201 });
}

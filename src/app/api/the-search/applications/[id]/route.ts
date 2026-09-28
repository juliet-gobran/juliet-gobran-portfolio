import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  deleteApplication,
  updateApplication,
} from "@/lib/the-search/supabase";
import { applicationInputSchema } from "@/lib/the-search/schema";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const result = applicationInputSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.message },
      { status: 400 },
    );
  }

  const application = await updateApplication(id, result.data);
  return NextResponse.json(application);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await deleteApplication(id);
  return new NextResponse(null, { status: 204 });
}

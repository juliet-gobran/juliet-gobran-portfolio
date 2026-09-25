import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getCriteria, updateCriteria } from "@/lib/the-search/supabase";
import { criteriaSchema } from "@/lib/the-search/schema";

export async function GET() {
  const criteria = await getCriteria();
  return NextResponse.json(criteria);
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const result = criteriaSchema.partial().safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.message },
      { status: 400 },
    );
  }

  const criteria = await updateCriteria(result.data);
  return NextResponse.json(criteria);
}

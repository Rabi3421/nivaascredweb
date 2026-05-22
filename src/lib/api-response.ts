import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class ApiError extends Error {
  constructor(
    public override message: string,
    public status: number = 400,
    public errors?: Record<string, string>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function successResponse(
  message: string,
  data?: unknown,
  status = 200
): NextResponse {
  return NextResponse.json({ success: true, message, data }, { status });
}

export function createdResponse(message: string, data?: unknown): NextResponse {
  return successResponse(message, data, 201);
}

export function errorResponse(
  message: string,
  status = 400,
  errors?: Record<string, string>
): NextResponse {
  return NextResponse.json({ success: false, message, errors }, { status });
}

export function handleRouteError(error: unknown, context: string): NextResponse {
  if (error instanceof ApiError) {
    return errorResponse(error.message, error.status, error.errors);
  }

  if (error instanceof ZodError) {
    const errors: Record<string, string> = {};
    for (const issue of error.issues) {
      const key = issue.path.join(".") || "_";
      errors[key] = issue.message;
    }
    return errorResponse("Validation failed", 400, errors);
  }

  console.error(`[${context}]`, error);
  return errorResponse("Internal server error", 500);
}

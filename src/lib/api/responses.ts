import { NextResponse } from "next/server";
import type { ApiFailure, ApiSuccess } from "@/types/api";

export function apiSuccess<T>(message: string, data: T, init?: ResponseInit) {
  return NextResponse.json<ApiSuccess<T>>({ success: true, message, data }, init);
}

export function apiError(message: string, status = 400, errors?: Record<string, string>) {
  return NextResponse.json<ApiFailure>({ success: false, message, errors }, { status });
}


import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest } from "next/server";
import type { SurahListData, SurahListEntry } from "@/types/quran";

type ErrorResponse = {
  message: string;
  status: number;
  error: string;
};

type ListResponse = {
  data: SurahListData;
};

export async function GET(request: NextRequest) {
  try {
    const name = request.nextUrl.searchParams.get("name");
    const number = request.nextUrl.searchParams.get("number");

    if (!name || number) {
      const badRequest: ErrorResponse = {
        message: "Failed",
        status: 400,
        error: "name or number, either query is required.",
      };
      return Response.json(badRequest, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "src/data/list.json");
    const fileContent = await readFile(filePath, "utf8");
    const data = JSON.parse(fileContent) as SurahListEntry[];

    const currentSurah = data.find((item) => item.name === name) ?? null;
    const currentIndex = currentSurah ? data.indexOf(currentSurah) : -1;
    const previousSurah = currentIndex > 0 ? data[currentIndex - 1] : null;
    const nextSurah = currentIndex >= 0 && currentIndex < data.length - 1 ? data[currentIndex + 1] : null;

    const response: ListResponse = {
      data: {
        previous: previousSurah,
        current: currentSurah,
        next: nextSurah,
      },
    };

    return Response.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const failedResponse: ErrorResponse = {
      message: "Failed",
      status: 500,
      error: message,
    };
    return Response.json(failedResponse, { status: 500 });
  }
}

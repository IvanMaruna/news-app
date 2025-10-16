import { NewsRequest, NewsResponse } from "../types/newsTypes";

export async function calculateNews(
  payload: NewsRequest
): Promise<NewsResponse> {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(`${apiUrl}/news`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request failed: ${response.status} ${errorText}`);
  }
  const data: NewsResponse = await response.json();
  return data;
}

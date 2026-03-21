// Nobel Prize API Documentation: https://www.nobelprize.org/about/developer-zone-2/

import { fetchData } from "./fetcher.js";

const API_BASE_URL = "https://api.nobelprize.org/2.1";

/**
 * Fetch Nobel Prizes with optional filters
 * @param {Object} filters - Filter options
 * @param {string} filters.year - Year to filter by (optional)
 * @param {string} filters.category - Category code to filter by (optional)
 * @param {number} filters.offset - Pagination offset (default: 0)
 * @param {number} filters.limit - Number of results per page (default: 10)
 * @param {Function} onSuccess - Callback for successful fetch
 * @param {Function} onError - Callback for fetch errors
 */
export function fetchNobelPrizes(filters = {}, onSuccess, onError) {
  const params = new URLSearchParams();

  params.set("offset", filters.offset || 0);
  params.set("limit", filters.limit || 10);
  params.set("sort", "desc");

  if (filters.year && filters.years !== "all") {
    params.set("nobelPrizeYear", filters.year);
  }

  if (filters.category && filters.category !== "all") {
    params.set("nobelPrizeCategory", filters.category);
  }

  const url = `${API_BASE_URL}/nobelPrizes?${params.toString()}`;
  fetchData(url, onSuccess, onError);
}

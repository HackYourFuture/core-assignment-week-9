import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { fetchNobelPrizes } from '../task-2/services.js';

beforeEach(async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve('{}'),
    })
  );
});
afterEach(() => {
  vi.resetAllMocks();
});

describe('fetchNobelPrizes', () => {
  test('Uses the correct base URL', () => {
    const onSuccess = vi.fn();
    const onError = vi.fn();

    fetchNobelPrizes(
      { year: '2020', category: 'phy', offset: 5, limit: 15 },
      onSuccess,
      onError
    );

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.nobelprize.org/2.1')
    );
  });

  test('URL includes the nobelPrizeYear query parameter', () => {
    const onSuccess = vi.fn();
    const onError = vi.fn();

    fetchNobelPrizes(
      { year: '2020', category: 'che', offset: 10, limit: 20 },
      onSuccess,
      onError
    );

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('nobelPrizeYear=2020')
    );
  });

  test('URL includes the nobelPrizeCategory query parameter', () => {
    const onSuccess = vi.fn();
    const onError = vi.fn();

    fetchNobelPrizes(
      { year: '2020', category: 'che', offset: 10, limit: 20 },
      onSuccess,
      onError
    );

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('nobelPrizeCategory=che')
    );
  });

  test('URL includes the offset query parameter', () => {
    const onSuccess = vi.fn();
    const onError = vi.fn();

    fetchNobelPrizes(
      { year: '2020', category: 'che', offset: 10, limit: 20 },
      onSuccess,
      onError
    );

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('offset=10')
    );
  });

  test('URL includes the limit query parameter', () => {
    const onSuccess = vi.fn();
    const onError = vi.fn();

    fetchNobelPrizes(
      { year: '2020', category: 'che', offset: 10, limit: 20 },
      onSuccess,
      onError
    );

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('limit=20')
    );
  });

  test('Omits the nobelPrizeYear when set to "all"', () => {
    const onSuccess = vi.fn();
    const onError = vi.fn();

    fetchNobelPrizes(
      { year: 'all', category: 'che', offset: 0, limit: 10 },
      onSuccess,
      onError
    );

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.nobelprize.org/2.1')
    );

    expect(global.fetch).toHaveBeenCalledWith(
      expect.not.stringContaining('nobelPrizeYear=')
    );
  });

  test('Omits the nobelPrizeCategory when set to "all"', () => {
    const onSuccess = vi.fn();
    const onError = vi.fn();

    fetchNobelPrizes(
      { year: '2020', category: 'all', offset: 0, limit: 10 },
      onSuccess,
      onError
    );

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.nobelprize.org/2.1')
    );

    expect(global.fetch).toHaveBeenCalledWith(
      expect.not.stringContaining('nobelPrizeCategory=')
    );
  });

  test('Includes the sort query parameter set to desc', () => {
    const onSuccess = vi.fn();
    const onError = vi.fn();

    fetchNobelPrizes(
      { year: '2020', category: 'che', offset: 0, limit: 10 },
      onSuccess,
      onError
    );

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('sort=desc')
    );
  });
});

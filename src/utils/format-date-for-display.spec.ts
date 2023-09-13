import { formatDateForDisplay } from './format-date-for-display';

describe('formatDateForDisplay', () => {

  beforeAll(() => {
    jasmine.clock().install();
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  it('should format recent updates as "Updated just now"', () => {
    const now = new Date();
    jasmine.clock().mockDate(now);

    const updatedDate = new Date(now.getTime() - (30 * 1000));
    expect(formatDateForDisplay(updatedDate.toISOString())).toBe('Updated just now');
  });

  it('should format updates within the hour as "Updated x minutes ago"', () => {
    const now = new Date();
    jasmine.clock().mockDate(now);

    const updatedDate = new Date(now.getTime() - (30 * 60 * 1000));
    expect(formatDateForDisplay(updatedDate.toISOString())).toBe('Updated 30 minutes ago');
  });

  it('should format updates within the day as "Updated x hours ago"', () => {
    const now = new Date();
    jasmine.clock().mockDate(now);

    const updatedDate = new Date(now.getTime() - (6 * 60 * 60 * 1000));
    expect(formatDateForDisplay(updatedDate.toISOString())).toBe('Updated 6 hours ago');
  });

  it('should format updates from the previous day as "Updated yesterday"', () => {
    const now = new Date();
    jasmine.clock().mockDate(now);

    const updatedDate = new Date(now.getTime() - (25 * 60 * 60 * 1000));
    expect(formatDateForDisplay(updatedDate.toISOString())).toBe('Updated yesterday');
  });
});


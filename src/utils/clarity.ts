declare global {
  interface Window {
    clarity?: (action: string, ...args: unknown[]) => void;
  }
}

/**
 * Custom Clarity Event Trigger
 * Used to track specific user interactions like CTA clicks, WhatsApp button clicks, and form submissions.
 */
export function trackClarityEvent(eventName: string): void {
  try {
    if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
      window.clarity('event', eventName);
    }
  } catch (err) {
    console.error('Clarity event tracking error:', err);
  }
}

/**
 * Set Custom Tags in Clarity
 */
export function setClarityTag(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
      window.clarity('set', key, value);
    }
  } catch (err) {
    console.error('Clarity tag error:', err);
  }
}

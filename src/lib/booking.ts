/**
 * Booking link for the "Let's talk" CTA in the /agentic operator band.
 *
 * Deliberately the 15-minute event, not the 30: the public link's job is to
 * start a conversation, not finish it. A serious lead will ask for more time
 * on the call, while a shorter slot keeps the booking bar low for everyone
 * else. Longer sessions get scheduled directly once a lead is qualified.
 *
 * Setting this to an empty string disables every booking CTA site-wide, which
 * is the safe way to pull the link without touching component code.
 */
export const CAL_BOOKING_URL: string = 'https://cal.com/zev-uhuru-49mkft/15min';

/** True once a real booking link is configured — gates every booking CTA. */
export const isBookingEnabled = (): boolean => CAL_BOOKING_URL.trim().length > 0;

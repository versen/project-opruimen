// Set PUBLIC_PREVIEW=true when building a review copy (e.g. for the board):
// the build is hidden from search engines, shows a banner, and the Join form
// is switched off so test sign-ups don't reach the real Mailchimp list.
export const isPreview = import.meta.env.PUBLIC_PREVIEW === 'true';

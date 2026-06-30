// Lucide-compatible SVG icon strings — MIT licensed icon paths
// stroke="currentColor" so they inherit color from CSS context

const S = (body, vb = '0 0 24 24') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`

export const ICONS = {
  arrowLeft:    S('<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>'),
  chevronRight: S('<path d="m9 18 6-6-6-6"/>'),
  eye:          S('<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>'),
  eyeOff:       S('<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>'),
  plus:         S('<path d="M5 12h14"/><path d="M12 5v14"/>'),
  x:            S('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'),
  check:        S('<path d="M20 6 9 17l-5-5"/>'),

  // Status-bar icons (compact, 20×20 visual weight at 16px rendered size)
  signal:  S('<path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/>'),
  wifi:    S('<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" x2="12.01" y1="20" y2="20"/>'),
  battery: S('<rect width="16" height="10" x="2" y="7" rx="2" ry="2"/><line x1="22" x2="22" y1="11" y2="13"/><rect x="4" y="9" width="10" height="6" rx="1" fill="currentColor" stroke="none"/>'),
}

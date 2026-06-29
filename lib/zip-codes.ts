/**
 * Allowed delivery zip codes — Indianapolis, Indiana area.
 * Add or remove zip codes to match your exact delivery zone.
 */
export const ALLOWED_ZIP_CODES: string[] = [

  "46204", // Indianapolis (Downtown)
  "46220", // Indianapolis (Broad Ripple)
  "46032", //Carmel
  "46033", //Carmel
  "46074", //Westfield
  "46062", //Westfield
  "46077", //ZionsVille
];

export function isZipAllowed(zip: string): boolean {
  return ALLOWED_ZIP_CODES.includes(zip.trim());
}

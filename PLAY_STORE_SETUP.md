# Play Store Packaging Guide for Gran Servicio

This repository is configured as a PWA and currently deployed at:

- https://gran-servicio.vercel.app/

## What is ready

- `manifest.webmanifest` is available and valid
- `sw.js` and `registerSW.js` are deployed
- PWA icons are available at `/icon-192.png` and `/icon-512.png`
- `vite.config.ts` is aligned with the deployed manifest

## Next steps to publish to Google Play

1. Generate the TWA package
   - Use PWABuilder or Bubblewrap to generate a TWA package.
   - Set the Package ID to something unique such as `app.vercel.gran_servicio.twa`.
   - Use `GranServicio` as the app name and `GranServicio` as the short name.

2. Update `assetlinks.json`
   - The app must be associated with the website using `assetlinks.json`.
   - Place it at `https://gran-servicio.vercel.app/.well-known/assetlinks.json`.
   - The file in `public/assetlinks.json` is a placeholder; replace the SHA256 fingerprint with the actual signing certificate fingerprint from the final APK/AAB.

3. Screenshot and store metadata
   - Provide store screenshots (recommended 1080x1920 or 1440x2960).
   - Add a proper app description, category, and privacy policy.

4. Upload to Google Play
   - Create a Google Play Console developer account.
   - Create a new app and upload the generated AAB.
   - Fill in listing details, content rating, and privacy policy.

## Helpful file locations

- `public/manifest.webmanifest` - web app manifest
- `vite.config.ts` - Vite PWA plugin configuration
- `public/assetlinks.json` - placeholder for app link association

## Important notes

- If you use PWABuilder, do not enable `Include source code` unless you want the full project.
- The final package should be signed with your Play Store release key.
- After upload, verify the Digital Asset Links statement in the Play Console.

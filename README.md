# Home Solar Partners — homesolarpartners.com

A static, single-page site (HTML/CSS/JS, no build step) hosted on Cloudflare Pages.

## Deploying (Cloudflare Pages)
- Framework preset: **None**
- Build command: *(leave empty)*
- Build output directory: **/** (repo root, where `index.html` lives)
- `_headers` sets security headers and asset caching; `404.html` is served automatically for unknown paths.

## Updating styles or scripts
Pages link the stylesheet and script with a version tag, e.g. `styles.css?v=91a3a7f`.
Whenever you change `assets/css/styles.css` or `assets/js/main.js`, change that `?v=` value
in `index.html`, `privacy.html`, `terms.html` and `404.html` so returning visitors get the new file.

## Structure
```
index.html            Main single-page site
privacy.html          Privacy Policy
terms.html            Terms of Use
404.html              Not-found page
assets/css/styles.css
assets/js/main.js     Mobile nav, header shadow, active-section highlight (site works without JS)
assets/fonts/         Self-hosted Montserrat (SIL Open Font License)
assets/img/           Logo, photos, QR codes, social image
favicon.ico / favicon.svg / apple-touch-icon.png / site.webmanifest
robots.txt / sitemap.xml / _headers
```

## Application links (decoded from the provided QR codes)
| Audience   | QR file                                                    | Destination |
|------------|------------------------------------------------------------|-------------|
| Homeowners | `qr-homeowner-sunrun-customer-application.jpg`             | https://sunrun.my.site.com/sunrunPublicAuraSite/s/new-customer?token=1395772061 |
| Businesses | `qr-business-sunrun-referral-partner-application.jpg`      | https://forms.gle/6fprXXziUeoYjQEt7 |

The original QR files are byte-identical copies of the supplied artwork. The page displays
`*-720w.jpg` copies (resized only, verified to decode to the same URLs) for faster loading,
and links to the full-size originals.

If either destination changes, update every link that points to it in `index.html`
(search for `sunrun.my.site.com` or `forms.gle`) **and** replace the matching QR image.

## Still to confirm
- **Contact email:** `info@homesolarpartners.com` is a placeholder (index, privacy, terms).
- **Privacy Policy / Terms of Use** are plain-language starting points, not legal advice — have them reviewed.
- **"Why Sunrun" figures** come from sunrun.com/about-us and investors.sunrun.com (customer count dated August 2024). Recheck periodically.

## Credits
Photography: U.S. Department of Energy (public domain) — "Solar Home in Ozarks" (Douglas Hutchings) and a residential installation photo, via the DOE Flickr account.

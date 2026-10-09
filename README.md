# YousaTools — Free Browser-Based Online Utilities

YousaTools is a modern, fast, and privacy-first web application providing free browser-based digital utilities. All image and file processing is executed 100% client-side inside the user's web browser using native HTML5 Canvas, File, and Blob APIs—meaning images are **never uploaded to any server or cloud database**.

The primary tool in this release is the **Image Compressor**, supporting JPEG, PNG, and WebP optimization with custom quality controls, real-time before-and-after previews, and instant downloads.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Local Development](#local-development)
4. [Deployment to Cloudflare Pages (Free Static Hosting)](#deployment-to-cloudflare-pages-free-static-hosting)
5. [Connecting Custom Domain](#connecting-custom-domain)
6. [Google AdSense Integration Guide (Pre-Launch Checklist)](#google-adsense-integration-guide-pre-launch-checklist)
7. [Contact Form & Webhook Setup](#contact-form--webhook-setup)
8. [Technical SEO & Verification](#technical-seo--verification)

---

## 1. Features

- **In-Browser Image Compression**: Uses native HTML5 Canvas `toBlob` encoding with no external processing APIs or server requirements.
- **Client-Side Privacy**: Zero files are transmitted across the network. Safe for sensitive documents and personal photos.
- **Support for JPEG, PNG, & WebP**:
  - Quality slider from 10% to 100% (default 80%).
  - Real-time format conversion (e.g., converting lossless PNGs to transparent WebP for 60–80% size savings).
  - Handles up to 20 MB per file.
- **Accurate Mathematical Comparisons**: True Blob size calculation, exact byte difference, and calculated percentage savings. Honest warning if compression produces a larger file without false savings claims.
- **Tool Catalog & Instant Search**: Fast client-side search across active and roadmap utilities.
- **Responsive & Accessible**: Keyboard focus indicators, clean typography, mobile-first layouts, and zero annoying popups.
- **Complete Information & Legal Pages**: About Us, Contact Us, Privacy Policy, Terms of Use, and 404 handler.

---

## 2. Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite 6+
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Hosting Target**: Compatible with free static hosting (Cloudflare Pages, Vercel, Netlify, GitHub Pages).

---

## 3. Local Development

To run the application locally on your computer:

```bash
# 1. Install dependencies
npm install

# 2. Start the Vite development server (port 3000)
npm run dev

# 3. Compile and verify production build
npm run build
```

The output directory for static production files is `dist/`.

---

## 4. Deployment to Cloudflare Pages (Free Static Hosting)

YousaTools is 100% static and requires no database, backend server, or API keys. It is built to run on Cloudflare Pages' free tier.

### Step-by-Step Cloudflare Pages Deployment:

1. **Push your code to a GitHub or GitLab repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial release of YousaTools"
   git remote add origin https://github.com/YOUR_USERNAME/yousatools.git
   git push -u origin main
   ```
2. **Log in to Cloudflare**:
   - Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
   - In the sidebar, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. **Select your repository**:
   - Choose the `yousatools` repository from your GitHub account.
4. **Configure Build Settings**:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave blank or default)
5. **Click "Save and Deploy"**:
   - Cloudflare will clone the repository, run `npm run build`, and deploy the site to a free `*.pages.dev` subdomain in under 60 seconds.
6. **SPA Routing**:
   - YousaTools includes a `public/_redirects` file (`/* /index.html 200`) which Cloudflare Pages automatically detects so routes like `/image-compressor`, `/about`, and `/privacy-policy` work seamlessly on direct page refreshes.

*Note on Free Hosting Limits:* Cloudflare Pages free tier includes unlimited bandwidth and 500 builds per month, which is more than enough for high-traffic static utility sites. Custom domains may require an annual domain registration fee.

---

## 5. Connecting Custom Domain

1. In the Cloudflare Pages project overview, click **Custom domains**.
2. Click **Set up a custom domain**.
3. Enter your domain (e.g., `yousatools.com`).
4. If your domain's DNS is managed by Cloudflare, it will automatically add the CNAME record. If managed by an external registrar (Namecheap, GoDaddy, Google Domains/Squarespace), add the CNAME record pointing to your `*.pages.dev` URL.
5. Cloudflare automatically issues and renews a free SSL/TLS certificate.

---

## 6. Google AdSense Integration Guide (Pre-Launch Checklist)

YousaTools includes an AdSense-ready architecture via `src/components/AdSlot.tsx`. To comply with Google AdSense quality and placement guidelines, ads are **disabled by default** and no fake scripts or dummy IDs are included.

Before applying for Google AdSense:

1. **Complete Owner Details in Legal Documents**:
   - Open `src/pages/PrivacyPolicyPage.tsx` and `src/pages/TermsPage.tsx`.
   - Replace placeholder tags `[Website Owner / Organization Name]` and `[Insert Contact Email Here]` with your real entity name and verified email.
2. **Configure Contact Channel**:
   - Add your legitimate support email or webhook in `src/pages/ContactPage.tsx`.
3. **Ensure Genuine Content**:
   - Keep the original technical guides on `src/pages/ImageCompressorPage.tsx` active. Ensure your site does not include duplicate, scraped, or thin placeholder content.
4. **Apply through Official Google AdSense**:
   - Go to [Google AdSense](https://www.google.com/adsense/start/).
   - Add your live custom domain (e.g. `https://yousatools.com`). Subdomains like `*.pages.dev` often face approval challenges; a custom top-level domain (`.com`, `.net`, etc.) is strongly recommended.
   - Insert the verification `<script>` tag provided by AdSense into `index.html`.
5. **Enable Ad Units After Approval**:
   - Once approved, open `src/components/AdSlot.tsx`.
   - Set `ENABLE_ADSENSE = true`.
   - Replace `ADSENSE_CLIENT_ID` with your verified publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`).
   - Assign the `slotId` for each ad placement.
6. **Policy Compliance**:
   - Ensure ad slots maintain generous margins from action buttons (like "Compress Image" and "Download") so users never click ads accidentally.

*Disclaimer:* Google AdSense approval and revenue depend strictly on Google's independent editorial evaluation of your domain. Approval is not guaranteed.

---

## 7. Contact Form & Webhook Setup

Because YousaTools runs client-side without an active email relay, the Contact page currently validates inputs and explains the setup state.

To enable direct email inbox delivery:
- Create a free form endpoint on [Formspree](https://formspree.io) or [Resend](https://resend.com).
- In `src/pages/ContactPage.tsx`, update `handleSubmit` to POST the payload to your form endpoint URL.

---

## 8. Technical SEO & Verification

- **Robots.txt**: Provided at `/public/robots.txt`.
- **XML Sitemap**: Provided at `/public/sitemap.xml` with all implemented routes.
- **Metadata**: Unique page titles and meta descriptions dynamically update per route in `src/context/RouterContext.tsx`.
- **OpenGraph & Twitter Cards**: Configured in `index.html`.
- **Schema.org Structured Data**: Embedded in `index.html` with valid `WebApplication` specifications.

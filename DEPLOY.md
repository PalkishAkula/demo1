# Deploying the demos on Vercel

## 1. Push this repository to GitHub

1. Create a new private GitHub repository, for example `vijayawada-business-sites`.
2. In this folder, run `git init`, `git add .`, `git commit -m "Initial website templates"`, and `git branch -M main`.
3. Add the GitHub repository as `origin`, then run `git push -u origin main`.
4. Keep `.env.local` out of Git. Each Vercel project stores its own environment values.

## 2. Create the three Vercel projects

Create three separate Vercel projects. Each imports the same GitHub repository and uses the default Next.js build settings.

| Vercel project name | Production domain | `NEXT_PUBLIC_SITE_ID` |
| --- | --- | --- |
| `sridevi-dental` | `sridevi-dental.vercel.app` | `sridevi-dental` |
| `krishna-path-labs` | `krishna-path-labs.vercel.app` | `krishna-labs` |
| `local-site-studio` | `local-site-studio.vercel.app` | `portfolio` |

For each project:

1. In Vercel, select **Add New → Project**, import this repository, and set the project name shown above. Vercel assigns the matching `.vercel.app` domain from that project name.
2. Open **Settings → Environment Variables**.
3. Add `NEXT_PUBLIC_SITE_ID` with the value in the table for Production, Preview, and Development.
4. Add `NEXT_PUBLIC_WEB3FORMS_KEY` with the Web3Forms access key for that site. Use a separate key for each real client where possible.
5. Deploy. Confirm the title, primary colour, phone number, and footer match the selected site.

## 2b. Get the enquiry form working (free)

The enquiry form posts to **Web3Forms**. The free tier is 250 submissions a
month, needs no account, no card, and no backend. Every submission is emailed
to the business.

1. Go to https://web3forms.com and enter the business email address.
2. Web3Forms emails an access key that looks like
   `1a2b3c4d-5e6f-7890-abcd-ef1234567890`.
3. Put it in `.env.local` for local work:

   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=1a2b3c4d-5e6f-7890-abcd-ef1234567890
   ```

4. Put the same key in the Vercel project under
   **Settings -> Environment Variables** for Production, Preview and Development,
   then redeploy. Environment variables are read at build time, so a redeploy is
   required.
5. Submit the form once on the live site and confirm the mail arrives. Check the
   spam folder on the first one.

Use a separate key per client so each business gets its own enquiries.

Until a valid key is set, the form does not silently fail. It shows the customer
a **Send on WhatsApp** button with every answer already typed out, plus a call
button, so no enquiry is lost.

## 3. Add a real client domain later

1. Buy the domain in the client’s name and keep the registrar login with the client.
2. In the client’s Vercel project, open **Settings → Domains** and add the domain plus `www` if required.
3. Copy the DNS records Vercel provides into the registrar. Do not delete unrelated mail records.
4. Wait for Vercel to mark the domain as valid, then set the preferred domain as primary.
5. Update that client config’s `siteUrl`, deploy again, and check the canonical URL, sitemap, and Google Search Console property.

## 4. Add a new client

1. Run `node scripts/new-site.mjs` and answer the four prompts, or pass them as flags:

   ```bash
   node scripts/new-site.mjs --name "Sai Dental" --type dental \
     --phone "+91 98765 43210" --address "1st Floor, Kanuru Main Road"
   ```

   This writes `src/config/<site-id>.json`, creates `public/images/<site-id>/`, and registers the site in `src/lib/site.ts`.

2. Replace the generated config copy with the client’s approved content, prices, colours, SEO fields, and `siteUrl`.
3. Add compressed images under `public/images/<site-id>/` and point the config’s image paths at them.
4. Create a fourth Vercel project from this same repository, set its `NEXT_PUBLIC_SITE_ID` and `NEXT_PUBLIC_WEB3FORMS_KEY`, then deploy.

No routing, database, or codebase fork is needed for a standard client.

## 5. Verify each build before you deploy

The two demos ship with generated placeholder artwork. Regenerate it any time with:

```bash
node scripts/generate-images.mjs
```

Then confirm each site renders its own content, theme and metadata:

```bash
NEXT_PUBLIC_SITE_ID=sridevi-dental npm run build && npx next start -p 3111
NEXT_PUBLIC_SITE_ID=krishna-labs   npm run build && npx next start -p 3112
NEXT_PUBLIC_SITE_ID=portfolio      npm run build && npx next start -p 3113
```

For each one, check on a 375px-wide window:

- the title, primary colour, phone number and footer match the selected site;
- the Call and WhatsApp buttons fire, and the WhatsApp message is prefilled;
- the sticky bottom bar is visible and never covers page content;
- pages that belong to another site type return the custom 404, not a blank page.

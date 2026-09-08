# New client checklist

Use this order to keep a standard local-business launch under 45 minutes once the client has supplied approved content.

1. Collect the intake answers: business name, phone, WhatsApp, address, working hours, locality, prices, services, team, reviews, preferred colours, and domain owner email.
2. Collect 8–12 real photos. Compress each to WebP or AVIF, preserve clear filenames, and keep the hero image at least 1600px wide.
3. Run `node scripts/new-site.mjs` and duplicate the nearest dental, diagnostics or gym config.
4. Replace brand, address, phone, WhatsApp, hours, locality references, and every published price.
5. Replace theme colours, logo mark, and the two selected fonts if needed. Check body text stays at 4.5:1 contrast.
6. Replace every image path and alt description under `public/images/<site-id>/`.
7. Update title, description, keywords, `ogImage`, `siteUrl`, and geo coordinates. Keep descriptions below 155 characters.
8. Set `isDemo` to `false`, replace the portfolio disclaimer, and use the client’s Web3Forms key.
9. Buy the domain in the client’s name, then create the Vercel project with `NEXT_PUBLIC_SITE_ID=<site-id>`.
10. Deploy, point DNS from Vercel’s domain screen, and verify the live phone, WhatsApp, map, form, prices, favicon, canonical URL, sitemap, and schema.
11. Submit the domain in Google Search Console and request indexing for the home page and sitemap.
12. Run PageSpeed Insights on mobile. Resolve image sizing, unused scripts, contrast, and tap-target issues until Performance is 90+.

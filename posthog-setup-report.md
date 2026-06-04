<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Cuidemos el Voto campaign site. The following changes were made:

- **`src/components/posthog.astro`** (new): PostHog initialization snippet using `is:inline` to prevent Astro from processing it, with token and host read from environment variables via `define:vars`.
- **`src/layouts/Layout.astro`**: Imported and rendered the `<PostHog />` component inside `<head>`, placing it before the existing Google Analytics tag so both run on every page.
- **`src/pages/index.astro`**: Added an `is:inline` script that attaches click listeners for five campaign events after the DOM is ready.
- **`.env`** (new): Contains `PUBLIC_POSTHOG_PROJECT_TOKEN` and `PUBLIC_POSTHOG_HOST`, both `.gitignore`-covered.

| Event | Description | File |
|---|---|---|
| `donate_cta_clicked` | User clicks the hero "Donar ahora" button or the nav "Donar" link — top of the donation funnel. Property: `location` (`hero` or `nav`). | `src/pages/index.astro` |
| `gofundme_clicked` | User clicks the GoFundMe external link — key conversion signal for international donors who cannot use Colombian bank transfers. | `src/pages/index.astro` |
| `support_form_opened` | User clicks "Abrir formulario" in the Solicitar Apoyo section — a rural collective requesting transportation funding. | `src/pages/index.astro` |
| `transparency_report_opened` | User clicks a transparency document link (first-round PDF, Drive photos, or Google Sheets log). Property: `doc_type` (`google_sheets`, `google_drive`, or `other`), `url`. | `src/pages/index.astro` |
| `contact_instagram_clicked` | User clicks an Instagram contact link. Property: `location` (section id). | `src/pages/index.astro` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](https://us.posthog.com/project/454550/dashboard/1670022)
- [Donation intent over time](https://us.posthog.com/project/454550/insights/dlIKyBLv)
- [GoFundMe clicks over time](https://us.posthog.com/project/454550/insights/ZeiWPkcw)
- [Support form opens over time](https://us.posthog.com/project/454550/insights/8Lr46hjA)
- [Transparency report engagement](https://us.posthog.com/project/454550/insights/PARwt6rv)
- [Campaign engagement overview](https://us.posthog.com/project/454550/insights/kJOMWgtg)

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-astro-static/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>

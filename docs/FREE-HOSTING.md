# Publish PatternLab for free

This repository already contains `index.html` and every required JavaScript/CSS
asset at its root. There is no build step, server, database, paid API, or API key.
If you are using the local delivery, its optional **patternlab-publish.zip** is a
standalone upload bundle. That ZIP is not included in this repository.

## Easiest upload: Cloudflare Pages

1. Create or sign in to a free [Cloudflare account](https://dash.cloudflare.com/).
2. Open **Workers & Pages**, create an application, and choose **Pages → Direct Upload / Drag and drop**. Dashboard wording can vary; follow the Pages upload option.
3. Enter a project name such as `patternlab`. Upload the local **patternlab-publish.zip**, or download this repository with **Code → Download ZIP**, extract it, and upload the extracted folder containing `index.html` and the JS/CSS files.
4. Click **Deploy site / Save and Deploy**. Cloudflare gives you a `pages.dev` address.
5. For later changes, upload the newly generated ZIP as a new deployment of the same project.

Your project name may already be taken; use the address Cloudflare actually returns.
The free Pages plan is more than sufficient for this small static site under its
published limits. A custom domain is optional and may cost money to buy.

Direct Upload accepts a ZIP or asset folder. A Direct Upload project cannot later
be switched to Git integration; automatic Git deployments would require a new project.
See [Cloudflare Direct Upload documentation](https://developers.cloudflare.com/pages/get-started/direct-upload/)
and [free-plan limits](https://developers.cloudflare.com/pages/platform/limits/).

## Alternative: GitHub Pages

1. Create a GitHub account and a **public** repository, for example `patternlab`.
2. If you are already using this repository, the files are ready. For a different
   repository, copy `index.html`, `.nojekyll`, and all root JS/CSS files into its
   root; do not upload only a ZIP or an extra enclosing folder.
3. Open **Settings → Pages**, select **Deploy from a branch**, then **main → /(root)**.
4. Save, wait for deployment, and use the exact site URL shown by GitHub.
5. Update the changed HTML, JavaScript, or CSS files in the same repository when you change the website.

GitHub Pages is free for public repositories on GitHub Free.
See [GitHub Pages creation guide](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

## What happens to your progress and pasted code?

- Hosting makes the website publicly accessible. Every visitor has their own browser-local progress.
- Your pasted Java stays in the page's memory; the coach does not execute or upload it.
- Existing notes/progress on the local file do not automatically move to a hosted origin.
  Export a progress backup from **My progress**, then import it on the published site.
- The coach is a guided static worksheet. It estimates common loops/allocations and
  flags unresolved recursion, helpers, lifetime, library, and syntax assumptions.
  It is not an AI service or a universal complexity prover.
- No online deployment has been performed by this delivery. These instructions let
  you publish using your own account and chosen project.

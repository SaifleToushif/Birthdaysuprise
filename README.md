# Birthday Surprise

A romantic, responsive birthday website built with plain HTML, CSS, and vanilla JavaScript. It has no build step, dependencies, database, or paid services, so it can be hosted directly with GitHub Pages.

## Personalize it

1. **Add photos:** Put your images in `images/`, then edit the four `src` values in `index.html` (`images/photo-1.jpg` through `images/photo-4.jpg`). Keep the `alt` text descriptive.
2. **Change the name and date:** Edit `BIRTHDAY_PERSON_NAME` and `BIRTHDAY_DATE` at the top of `script.js`. Use an ISO date such as `2026-12-25T00:00:00`.
3. **Edit messages:** Change `TYPING_MESSAGE` in `script.js`, the personal letter and surprise message in `index.html`, and the visible final message if desired. Each editable area is marked with an `EDIT HERE` comment.
4. **Edit memories:** In the `Our Memories` section of `index.html`, edit the date, title, description, and optional photo in each `.memory` article. Duplicate an article to add another memory.

## Publish with GitHub Pages

1. Push this repository to GitHub.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and the `/ (root)` folder, then save.
4. Wait for the deployment to finish, then open the Pages URL shown by GitHub.

All website paths are relative, so the site works from a project URL such as `https://your-name.github.io/Birthdaysuprise/`.
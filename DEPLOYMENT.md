# ALHEZ website deployment

## Hosting requirements

- Serve this folder as the document root for `https://alhez.co.tz/`.
- Use PHP 8.1 or later with the cURL extension and HTTPS enabled.
- Configure the host's PHP `mail()` transport for the quote and contact forms.
- Keep `assets/api/assistant.php` and `assets/mail/contact.php` executable as PHP endpoints. Do not expose the PHP source as downloadable text.

## Local preview

VS Code Live Server and other static preview servers do not execute PHP. Use a PHP-capable local server to test the assistant, and make `GROQ_API_KEY` available to that PHP process. For PHP's built-in server, run `php -S 127.0.0.1:8000 -t .` from the project folder and open `http://127.0.0.1:8000/`.

## Server environment

Set these in the hosting control panel or process environment. Do not put secrets in HTML, JavaScript, or this repository.

- `GROQ_API_KEY`: server-side API key used by the ALHEZ assistant. Keep it out of source files and browser code.
- `GROQ_MODEL`: optional model override; defaults to `llama-3.3-70b-versatile`.
- `ALHEZ_FORM_RECIPIENT`: optional form destination; defaults to `contact@alhez.co.tz`.

The assistant sends the latest eight chat turns to the Groq Chat Completions API. The PHP endpoint limits message size, rate-limits each browser session, and keeps the API key on the server. The visible widget tells visitors their messages are processed to generate replies and warns them not to submit sensitive information.

## After deployment

1. Confirm `https://alhez.co.tz/robots.txt` and `https://alhez.co.tz/sitemap.xml` load successfully.
2. Submit the sitemap in Google Search Console and Bing Webmaster Tools.
3. Submit one contact form and one quote form from the live site, then confirm delivery to `contact@alhez.co.tz`.
4. Set `GROQ_API_KEY` on the host, then send a test question in the assistant and confirm it answers from the ALHEZ site facts.
5. Confirm the host enforces HTTPS and that PHP errors are not displayed to visitors.

The source files are prepared for production, but live mail and AI replies cannot be confirmed until the site is deployed with the host's mail transport and Groq API key configured.

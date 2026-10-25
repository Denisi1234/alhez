# ALHEZ website deployment

## Hosting requirements

- Serve this folder as the document root for `https://alhez.co.tz/`.
- Use PHP 8.1 or later with HTTPS enabled.
- Configure the host's PHP `mail()` transport for the quote and contact forms.
- Keep `assets/api/assistant.php` and `assets/mail/contact.php` executable as PHP endpoints. Do not expose the PHP source as downloadable text.

## Local preview

VS Code Live Server and other static preview servers do not execute PHP. Use a PHP-capable local server to test the assistant and forms. For PHP's built-in server, run `php -S 127.0.0.1:8000 -t .` from the project folder and open `http://127.0.0.1:8000/`.

## Server environment

The built-in assistant does not call an external AI provider and needs no API key. The only optional setting is the form recipient; it defaults to `contact@alhez.co.tz`.

- `ALHEZ_FORM_RECIPIENT`: optional form destination; defaults to `contact@alhez.co.tz`.

## Namecheap cPanel upload

1. In Namecheap, open **Hosting List → Go to cPanel**. In cPanel's **Domains** page, confirm the document root for `alhez.co.tz` (usually `public_html` for the primary domain).
2. Back up any files already in that document root. In **File Manager**, upload the latest `alhez-cpanel-upload-chat-hidden.zip` package to the document root and extract it there. Confirm `index.html`, `assets/`, and the other site files are directly in the document root, not inside an extra nested folder.
3. In cPanel's **Select PHP Version**, use PHP 8.1 or newer. The assistant and both forms require PHP execution; a static preview server will not run them.
4. No AI API key or private assistant config file is needed; assistant replies come from built-in ALHEZ FAQ logic.
5. Confirm the domain points to this hosting account, then enable/install SSL in cPanel before using `https://alhez.co.tz`.
6. Ensure PHP mail is enabled. The form uses `contact@alhez.co.tz` as the sender and recipient by default; Namecheap requires the PHP mail sender address to use the hosted domain. Check the cPanel email routing and deliverability settings for the domain if form messages do not arrive.
7. Open the live site and submit a test contact form and quote request; confirm delivery to the intended inbox. Ask the chat assistant about products, delivery, and quote requests to confirm the built-in FAQ replies.

## After deployment

1. Confirm `https://alhez.co.tz/robots.txt` and `https://alhez.co.tz/sitemap.xml` load successfully.
2. Submit the sitemap in Google Search Console and Bing Webmaster Tools.
3. Submit one contact form and one quote form from the live site, then confirm delivery to `contact@alhez.co.tz`.
4. Ask the assistant about products, delivery, and quote requests to confirm its built-in answers.
5. Confirm the host enforces HTTPS and that PHP errors are not displayed to visitors.

The source files are prepared for production, but live form delivery cannot be confirmed until the site is deployed with the host's mail transport.

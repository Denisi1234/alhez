# ALHEZ

Website for ALHEZ Medical Supplies Limited, serving healthcare, laboratory, scientific, veterinary, and education institutions in Tanzania.

## Local development

The site uses PHP for contact forms and the Groq-powered chat assistant. Static preview tools do not execute PHP. Run a PHP-capable server from this folder, for example:

```powershell
php -S 127.0.0.1:8000 -t .
```

Set `GROQ_API_KEY` in the PHP server environment to enable assistant replies. Never add API keys or other credentials to the repository.

See [DEPLOYMENT.md](DEPLOYMENT.md) for hosting requirements and deployment checks.

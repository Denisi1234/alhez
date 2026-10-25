# ALHEZ

Website for ALHEZ Medical Supplies Limited, serving healthcare, laboratory, scientific, veterinary, and education institutions in Tanzania.

## Local development

The site uses PHP for contact forms and its built-in ALHEZ question-and-answer assistant. Static preview tools do not execute PHP. Run a PHP-capable server from this folder, for example:

```powershell
php -S 127.0.0.1:8000 -t .
```

The assistant uses local FAQ logic and does not require an external AI key. Contact forms use PHP `mail()`.

See [DEPLOYMENT.md](DEPLOYMENT.md) for hosting requirements and deployment checks.

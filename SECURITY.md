# Security Policy

## Reporting a vulnerability

Please report security issues in this SDK or the PropRaven API privately to **support@propraven.com** with
"SECURITY" in the subject. Do not open a public GitHub issue for a vulnerability.

We will acknowledge your report, investigate, and keep you informed. Please give us a reasonable amount of time to
address the issue before disclosing it publicly.

## Handling API keys

PropRaven API keys (`pz_...`) and webhook secrets (`whsec_...`) are secrets. Keep them on the server: this SDK refuses
to run in a browser unless explicitly overridden, because the API sends no CORS headers and a key in client-side code
is exposed to anyone who loads the page.

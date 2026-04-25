# 🔐 SECURITY.md

## Security Policy — Cybrexa_01_SecureProfile

> This document outlines the security practices, principles, and considerations applied during the development of this cybersecurity portfolio project.

---

## 🛡️ Supported Versions

| Version | Supported |
|---------|-----------|
| v1.0 (current) | ✅ Active |

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability in this project, please **do not open a public issue**.

Instead, contact me directly:

- 📧 **Email:** muhdnafihhh@gmail.com 
- 🐙 **GitHub:** [@nafih](https://github.com/nafee7h)

I will respond within **48 hours** and aim to resolve confirmed vulnerabilities within **7 days**.

---

## 🔒 Security Measures Implemented

### 1. XSS Prevention (Cross-Site Scripting)
All user inputs from the contact form are sanitized before processing using a custom `sanitize()` function that escapes dangerous HTML characters:

```js
function sanitize(input) {
  return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
```

This prevents malicious scripts like `<script>alert(1)</script>` from being injected or rendered in the DOM.

---

### 2. Input Validation
The contact form performs client-side validation before any data is processed:

- ✅ Empty field check — all fields must be filled
- ✅ Email format check — must contain `@`
- ✅ Input is sanitized after validation passes

> ⚠️ Note: Client-side validation is a UX aid. Server-side validation must be implemented if a backend is added.

---

### 3. No Sensitive Data Exposure
- No API keys, tokens, or credentials are stored in any frontend file
- No `.env` files are committed to version control
- No backend or database is exposed in this static site

---

### 4. Content Security Principles (Awareness)
Although this is a static site without a CSP header configured at the server level, the following principles are followed:

- No use of `eval()` or `innerHTML` with user-controlled data
- External resources (Google Fonts) loaded over HTTPS only
- No third-party tracking scripts included

---

### 5. Dependency-Free Design
This project uses **zero npm packages or external JS libraries** — reducing the attack surface from supply chain vulnerabilities entirely.

---

## 🧪 Security Testing Performed

| Test | Tool Used | Result |
|------|-----------|--------|
| XSS Input Injection | Manual Testing | ✅ Blocked by sanitize() |
| Empty Form Submission | Manual Testing | ✅ Blocked by validation |
| Script Tag Injection | Manual Testing | ✅ Escaped correctly |
| Sensitive File Exposure | Manual Review | ✅ None found |

---

## 📋 Known Limitations

| Limitation | Reason | Mitigation Plan |
|------------|--------|-----------------|
| No server-side validation | Static site only | Add backend validation if server is introduced |
| No CSP headers | No server config yet | Add via `.htaccess` or server headers in future |
| Form doesn't actually send data | No backend | Integrate with EmailJS or a backend API later |

---

## 🎯 OWASP Top 10 — Awareness Checklist

As part of my learning roadmap, I am actively studying the OWASP Top 10. Below is how this project addresses relevant risks:

| OWASP Risk | Status |
|------------|--------|
| A03 - Injection (XSS) | ✅ Sanitized |
| A05 - Security Misconfiguration | ✅ No exposed configs |
| A08 - Software & Data Integrity | ✅ No external JS libs |
| A09 - Logging & Monitoring | ⚠️ Not yet implemented (static site) |

---

## 📚 Security References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
- [MDN — XSS Prevention](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks)

---

## 👤 Author

**Muhammed Nafih AK**
BCA Student | Cybersecurity Enthusiast | Ethical Hacking Learner

> *"Security is not a product, but a process."* — Bruce Schneier

---

![Security](https://img.shields.io/badge/Security-XSS%20Protected-00d4ff?style=flat-square&logo=shield&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-00ffcc?style=flat-square)
![Made By](https://img.shields.io/badge/Made%20by-Nafih%20AK-7b2fff?style=flat-square)
![OWASP](https://img.shields.io/badge/OWASP-Aware-blue?style=flat-square)

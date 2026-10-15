**Subject:** GitHub Pages custom domain HTTPS certificate stuck at "new" state

**Repository:** rankify-ops/cavstruct
**Custom domain:** cavstructprojects.com.au

**Issue:**
The HTTPS certificate for my custom domain has been stuck at `state: "new"` ("This domain was recently added. The certificate request process will begin shortly.") for over 24 hours and has not progressed.

**What I've already verified/tried:**
- DNS is fully correct and propagated (verified via 8.8.8.8 and 1.1.1.1): 4x A records at apex pointing to 185.199.108.153 / .109.153 / .110.153 / .111.153, and `www` CNAME pointing to rankify-ops.github.io.
- No CAA records exist on the domain that could block Let's Encrypt issuance.
- GitHub Pages health check (`/repos/rankify-ops/cavstruct/pages/health`) returns no issues for either the apex or `www` host.
- githubstatus.com shows all systems operational, no active incidents.
- Certificate transparency logs (crt.sh) show no abnormal issuance activity or rate-limit-triggering bursts for this domain — only normal historical renewals from its previous host.
- I removed and re-added the custom domain (PUT with cname null, then re-set) — cert reset to "new" but never progressed further.
- I fully deleted the Pages site (DELETE) and recreated it from scratch (POST) — cert again reset to "new" and has been stuck there since.

**Comparison:** I have several other repos under this same account with custom domains on the same "legacy" Pages build type that issued certificates successfully within minutes (e.g. evosolar.com.au, tintek.com.au, geelongheatpumps.com.au). This domain is the only one exhibiting the stuck behavior, so it does not appear to be a general account-level or build-type issue.

**Ask:** Could you please manually check/re-trigger the Let's Encrypt certificate issuance for cavstructprojects.com.au on this Pages site, or let me know if there's a stuck order on your end blocking it?

Thanks!

import re, sys

src = open('chunks/chunk7.mjs', encoding='utf-8').read()
src += open('chunks/chunk6.mjs', encoding='utf-8').read()

pattern = re.compile(r'`((?:[^`\\]|\\.){40,600})`')
strings = pattern.findall(src)
keys = ['insured', 'quote', 'on time', 'budget', 'residential', 'new build', 'carpentry', 'project', 'deck', 'renovation']
seen = set()
for s in strings:
    try:
        t = s.encode().decode('unicode_escape', errors='ignore')
    except Exception:
        t = s
    tl = t.lower()
    if any(k in tl for k in keys) and not t.startswith('http') and '<' not in t and '{' not in t and 'var(' not in t:
        if t not in seen:
            seen.add(t)
            print('---')
            print(t[:500])

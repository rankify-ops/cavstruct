import re, glob

src = ''
for f in glob.glob('chunks/*.mjs'):
    src += open(f, encoding='utf-8').read()

# Framer text nodes: children:`...` or children:"..."
pat = re.compile(r'children:\s*([`"])((?:(?!\1)[^\\]|\\.){6,800})\1')
seen = set()
out = []
for m in pat.finditer(src):
    t = m.group(2)
    if t in seen or t.startswith('http'):
        continue
    seen.add(t)
    out.append(t)

with open('content-dump.txt', 'w', encoding='utf-8') as fh:
    for t in out:
        fh.write('* ' + t + '\n')
print(len(out), 'strings')

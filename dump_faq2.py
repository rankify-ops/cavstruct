import re, glob

src = ''
for f in glob.glob('chunks/*.mjs'):
    src += open(f, encoding='utf-8').read()

pat = re.compile(r'JFkHxuSbp:`([^`]+)`,layoutId:`[^`]*`,NTK1_iOAR:`([^`]+)`')
seen = set()
out = open('faq-final.md', 'w', encoding='utf-8')
for m in pat.finditer(src):
    q, a = m.group(1), m.group(2)
    if q in seen:
        continue
    seen.add(q)
    out.write('### ' + q + '\n' + a + '\n\n')
out.close()
print(len(seen), 'Q&A pairs')

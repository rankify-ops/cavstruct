import re, glob

src = ''
for f in glob.glob('chunks/*.mjs'):
    src += open(f, encoding='utf-8').read()

out = open('faq-testimonials.txt', 'w', encoding='utf-8')

# Find context around known FAQ answer fragments
anchors = ['fully insured, giving you', 'no-obligation on-site quotes', 'stay on time and on budget',
           'residential homes, renovations', 'take on full new build', 'What types of carpentry']
for a in anchors:
    i = src.find(a)
    if i >= 0:
        out.write('==== anchor: ' + a + ' ====\n')
        out.write(src[max(0, i-800):i+900] + '\n\n')

# Testimonials: search for star/review-ish words
for a in ['testimonial', 'review', 'stars', '⭐']:
    for m in re.finditer(re.escape(a), src, re.IGNORECASE):
        i = m.start()
        snippet = src[max(0, i-100):i+300]
        if 'children' in snippet or 'name' in snippet.lower():
            out.write('---- ' + a + ' @' + str(i) + ' ----\n' + snippet + '\n\n')
        if m.start() > 2_000_000:
            break

out.close()
print('done')

import json

# Ratings strip icons sit on the blue band — recolor dark strokes/fills to white,
# keep the light-blue accent colors (stars etc.) untouched.
def walk(node):
    if isinstance(node, dict):
        for k, v in node.items():
            if k == 'c' and isinstance(v, dict) and isinstance(v.get('k'), list) and len(v['k']) in (3, 4) and all(isinstance(x, (int, float)) for x in v['k']):
                r, g, b = v['k'][0], v['k'][1], v['k'][2]
                if r <= 0.45 and g <= 0.45 and b <= 0.45:  # dark -> white
                    v['k'] = [1, 1, 1] + list(v['k'][3:])
            else:
                walk(v)
    elif isinstance(node, list):
        for item in node:
            walk(item)

for name in ['highly-rated', 'reliable', 'transparent-pricing']:
    path = f'assets/lottie/{name}.json'
    data = json.load(open(path, encoding='utf-8'))
    walk(data)
    out = f'assets/lottie/{name}-white.json'
    json.dump(data, open(out, 'w', encoding='utf-8'), separators=(',', ':'))
    print('wrote', out)

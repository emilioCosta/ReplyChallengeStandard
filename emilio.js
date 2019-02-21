const a = fs.readFileSync('input', 'UTF-8').split('\n').map(x => parseInt(x)).filter(e => e > 0).reduce((a, b) => a + b);
fs.writeFileSync('output', 'UTF-8', a);
export function get(p, o){
  return p.reduce((xs, x) => (xs && (xs[x] || xs[x] == 0 || xs[x] === false)) ? xs[x] : null, o)
}

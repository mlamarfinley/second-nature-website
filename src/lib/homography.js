// Projective mapping: warp a w×h rectangle onto an arbitrary quad.
// Returns a CSS matrix3d() string. Quad points are in px, order:
// top-left, top-right, bottom-right, bottom-left.

function adj(m) {
  return [
    m[4] * m[8] - m[5] * m[7], m[2] * m[7] - m[1] * m[8], m[1] * m[5] - m[2] * m[4],
    m[5] * m[6] - m[3] * m[8], m[0] * m[8] - m[2] * m[6], m[2] * m[3] - m[0] * m[5],
    m[3] * m[7] - m[4] * m[6], m[1] * m[6] - m[0] * m[7], m[0] * m[4] - m[1] * m[3],
  ]
}

function mul(a, b) {
  const c = []
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) {
      let s = 0
      for (let k = 0; k < 3; k++) s += a[3 * i + k] * b[3 * k + j]
      c[3 * i + j] = s
    }
  return c
}

function mulVec(m, v) {
  return [
    m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
    m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
    m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
  ]
}

function basisToPoints(x1, y1, x2, y2, x3, y3, x4, y4) {
  const m = [x1, x2, x3, y1, y2, y3, 1, 1, 1]
  const v = mulVec(adj(m), [x4, y4, 1])
  return mul(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]])
}

export function matrix3dForQuad(w, h, [tl, tr, br, bl]) {
  const s = basisToPoints(0, 0, w, 0, 0, h, w, h)
  const d = basisToPoints(tl[0], tl[1], tr[0], tr[1], bl[0], bl[1], br[0], br[1])
  const t = mul(d, adj(s))
  for (let i = 0; i < 9; i++) t[i] /= t[8]
  return `matrix3d(${t[0]},${t[3]},0,${t[6]},${t[1]},${t[4]},0,${t[7]},0,0,1,0,${t[2]},${t[5]},0,${t[8]})`
}

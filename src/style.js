let xt = '4.0.0';
let ye = 92,
  Ve = 47,
  Ee = 42,
  Qr = 34,
  Xr = 39,
  eo = 58,
  Re = 59,
  oe = 10,
  ve = 32,
  Oe = 9,
  At = 123,
  Ze = 125,
  et = 40,
  Ct = 41,
  to = 91,
  ro = 93,
  $t = 45,
  Qe = 64,
  oo = 33;
function ce(t) {
  t = t.replaceAll(
    `\r
`,
    `
`
  );
  let r = [],
    o = [],
    e = [],
    n = null,
    s = null,
    l = '',
    f = '',
    d;
  for (let c = 0; c < t.length; c++) {
    let p = t.charCodeAt(c);
    if (p === ye) {(l += t.slice(c, c + 2)), (c += 1);}
    else if (p === Ve && t.charCodeAt(c + 1) === Ee) {
      let m = c;
      for (let y = c + 2; y < t.length; y++)
        {if (((d = t.charCodeAt(y)), d === ye)) {y += 1;}
        else if (d === Ee && t.charCodeAt(y + 1) === Ve) {
          c = y + 1;
          break;
        }}
      let h = t.slice(m, c + 1);
      h.charCodeAt(2) === oo && o.push(Ke(h.slice(2, -2)));
    } else if (p === Xr || p === Qr) {
      let m = c;
      for (let h = c + 1; h < t.length; h++)
        {if (((d = t.charCodeAt(h)), d === ye)) {h += 1;}
        else if (d === p) {
          c = h;
          break;
        } else {
          if (d === Re && t.charCodeAt(h + 1) === oe)
            {throw new Error(`Unterminated string: ${t.slice(m, h + 1) + String.fromCharCode(p)}`);}
          if (d === oe) {throw new Error(`Unterminated string: ${t.slice(m, h) + String.fromCharCode(p)}`);}
        }}
      l += t.slice(m, c + 1);
    } else {
      if ((p === ve || p === oe || p === Oe) && (d = t.charCodeAt(c + 1)) && (d === ve || d === oe || d === Oe))
        {continue;}
      if (p === oe) {
        if (l.length === 0) {continue;}
        (d = l.charCodeAt(l.length - 1)), d !== ve && d !== oe && d !== Oe && (l += ' ');
      } else if (p === $t && t.charCodeAt(c + 1) === $t && l.length === 0) {
        let m = '',
          h = c,
          y = -1;
        for (let b = c + 2; b < t.length; b++)
          {if (((d = t.charCodeAt(b)), d === ye)) {b += 1;}
          else if (d === Ve && t.charCodeAt(b + 1) === Ee) {
            for (let x = b + 2; x < t.length; x++)
              {if (((d = t.charCodeAt(x)), d === ye)) {x += 1;}
              else if (d === Ee && t.charCodeAt(x + 1) === Ve) {
                b = x + 1;
                break;
              }}
          } else if (y === -1 && d === eo) {y = l.length + b - h;}
          else if (d === Re && m.length === 0) {
            (l += t.slice(h, b)), (c = b);
            break;
          } else if (d === et) {m += ')';}
          else if (d === to) {m += ']';}
          else if (d === At) {m += '}';}
          else if ((d === Ze || t.length - 1 === b) && m.length === 0) {
            (c = b - 1), (l += t.slice(h, b));
            break;
          } else {(d === Ct || d === ro || d === Ze) && m.length > 0 && t[b] === m[m.length - 1] && (m = m.slice(0, -1));}}
        let v = Xe(l, y);
        n ? n.nodes.push(v) : r.push(v), (l = '');
      } else if (p === Re && l.charCodeAt(0) === Qe) {(s = ke(l)), n ? n.nodes.push(s) : r.push(s), (l = ''), (s = null);}
      else if (p === Re && f[f.length - 1] !== ')') {
        let m = Xe(l);
        n ? n.nodes.push(m) : r.push(m), (l = '');
      } else if (p === At && f[f.length - 1] !== ')')
        {(f += '}'), (s = L(l.trim())), n && n.nodes.push(s), e.push(n), (n = s), (l = ''), (s = null);}
      else if (p === Ze && f[f.length - 1] !== ')') {
        if (f === '') {throw new Error('Missing opening {');}
        if (((f = f.slice(0, -1)), l.length > 0))
          {if (l.charCodeAt(0) === Qe) {(s = ke(l)), n ? n.nodes.push(s) : r.push(s), (l = ''), (s = null);}
          else {
            let h = l.indexOf(':');
            n && n.nodes.push(Xe(l, h));
          }}
        let m = e.pop() ?? null;
        m === null && n && r.push(n), (n = m), (l = ''), (s = null);
      } else if (p === et) {(f += ')'), (l += '(');}
      else if (p === Ct) {
        if (f[f.length - 1] !== ')') {throw new Error('Missing opening (');}
        (f = f.slice(0, -1)), (l += ')');
      } else {
        if (l.length === 0 && (p === ve || p === oe || p === Oe)) {continue;}
        l += String.fromCharCode(p);
      }
    }
  }
  if ((l.charCodeAt(0) === Qe && r.push(ke(l)), f.length > 0 && n)) {
    if (n.kind === 'rule') {throw new Error(`Missing closing } at ${n.selector}`);}
    if (n.kind === 'at-rule') {throw new Error(`Missing closing } at ${n.name} ${n.params}`);}
  }
  return o.length > 0 ? o.concat(r) : r;
}
function ke(t, r = []) {
  for (let o = 5; o < t.length; o++) {
    let e = t.charCodeAt(o);
    if (e === ve || e === et) {
      let n = t.slice(0, o).trim(),
        s = t.slice(o).trim();
      return P(n, s, r);
    }
  }
  return P(t.trim(), '', r);
}
function Xe(t, r = t.indexOf(':')) {
  let o = t.indexOf('!important', r + 1);
  return a(t.slice(0, r).trim(), t.slice(r + 1, o === -1 ? t.length : o).trim(), o !== -1);
}
let no = 64;
function U(t, r = []) {
  return { kind: 'rule', selector: t, nodes: r };
}
function P(t, r = '', o = []) {
  return { kind: 'at-rule', name: t, params: r, nodes: o };
}
function L(t, r = []) {
  return t.charCodeAt(0) === no ? ke(t, r) : U(t, r);
}
function a(t, r, o = !1) {
  return { kind: 'declaration', property: t, value: r, important: o };
}
function Ke(t) {
  return { kind: 'comment', value: t };
}
function ne(t, r) {
  return { kind: 'context', context: t, nodes: r };
}
function D(t) {
  return { kind: 'at-root', nodes: t };
}
function _(t, r, o = [], e = {}) {
  for (let n = 0; n < t.length; n++) {
    let s = t[n],
      l = o[o.length - 1] ?? null;
    if (s.kind === 'context') {
      if (_(s.nodes, r, o, { ...e, ...s.context }) === 2) {return 2;}
      continue;
    }
    o.push(s);
    let f =
      r(s, {
        parent: l,
        context: e,
        path: o,
        replaceWith(d) {
          Array.isArray(d)
            ? d.length === 0
              ? t.splice(n, 1)
              : d.length === 1
              ? (t[n] = d[0])
              : t.splice(n, 1, ...d)
            : (t[n] = d),
            n--;
        },
      }) ?? 0;
    if ((o.pop(), f === 2)) {return 2;}
    if (f !== 1 && (s.kind === 'rule' || s.kind === 'at-rule')) {
      o.push(s);
      let d = _(s.nodes, r, o, e);
      if ((o.pop(), d === 2)) {return 2;}
    }
  }
}
function ze(t, r, o = [], e = {}) {
  for (let n = 0; n < t.length; n++) {
    let s = t[n],
      l = o[o.length - 1] ?? null;
    if (s.kind === 'rule' || s.kind === 'at-rule') {o.push(s), ze(s.nodes, r, o, e), o.pop();}
    else if (s.kind === 'context') {
      ze(s.nodes, r, o, { ...e, ...s.context });
      continue;
    }
    o.push(s),
      r(s, {
        parent: l,
        context: e,
        path: o,
        replaceWith(f) {
          Array.isArray(f)
            ? f.length === 0
              ? t.splice(n, 1)
              : f.length === 1
              ? (t[n] = f[0])
              : t.splice(n, 1, ...f)
            : (t[n] = f),
            (n += f.length - 1);
        },
      }),
      o.pop();
  }
}
function ie(t) {
  let r = [],
    o = new Set();
  function e(s, l, f = 0) {
    if (s.kind === 'declaration') {
      if (s.property === '--tw-sort' || s.value === void 0 || s.value === null) {return;}
      l.push(s);
    } else if (s.kind === 'rule')
      {if (s.selector === '&')
        {for (let d of s.nodes) {
          let c = [];
          e(d, c, f + 1), l.push(...c);
        }}
      else {
        let d = { ...s, nodes: [] };
        for (let c of s.nodes) {e(c, d.nodes, f + 1);}
        l.push(d);
      }}
    else if (s.kind === 'at-rule' && s.name === '@property' && f === 0) {
      if (o.has(s.params)) {return;}
      o.add(s.params);
      let d = { ...s, nodes: [] };
      for (let c of s.nodes) {e(c, d.nodes, f + 1);}
      l.push(d);
    } else if (s.kind === 'at-rule') {
      let d = { ...s, nodes: [] };
      for (let c of s.nodes) {e(c, d.nodes, f + 1);}
      l.push(d);
    } else if (s.kind === 'at-root')
      {for (let d of s.nodes) {
        let c = [];
        e(d, c, 0);
        for (let p of c) {r.push(p);}
      }}
    else if (s.kind === 'context') {
      if (s.context.reference) {return;}
      for (let d of s.nodes) {e(d, l, f);}
    } else {s.kind === 'comment' && l.push(s);}
  }
  let n = [];
  for (let s of t) {e(s, n, 0);}
  return n.concat(r);
}
function Y(t) {
  function r(e, n = 0) {
    let s = '',
      l = '  '.repeat(n);
    if (e.kind === 'declaration')
      {s += `${l}${e.property}: ${e.value}${e.important ? ' !important' : ''};
`;}
    else if (e.kind === 'rule') {
      s += `${l}${e.selector} {
`;
      for (let f of e.nodes) {s += r(f, n + 1);}
      s += `${l}}
`;
    } else if (e.kind === 'at-rule') {
      if (e.nodes.length === 0)
        {return `${l}${e.name} ${e.params};
`;}
      s += `${l}${e.name}${e.params ? ` ${e.params} ` : ' '}{
`;
      for (let f of e.nodes) {s += r(f, n + 1);}
      s += `${l}}
`;
    } else if (e.kind === 'comment')
      {s += `${l}/*${e.value}*/
`;}
    else if (e.kind === 'context' || e.kind === 'at-root') {return '';}
    return s;
  }
  let o = '';
  for (let e of t) {
    let n = r(e);
    n !== '' && (o += n);
  }
  return o;
}
function rt(t) {
  return { kind: 'word', value: t };
}
function io(t, r) {
  return { kind: 'function', value: t, nodes: r };
}
function lo(t) {
  return { kind: 'separator', value: t };
}
function fe(t, r, o = null) {
  for (let e = 0; e < t.length; e++) {
    let n = t[e],
      s =
        r(n, {
          parent: o,
          replaceWith(l) {
            Array.isArray(l)
              ? l.length === 0
                ? t.splice(e, 1)
                : l.length === 1
                ? (t[e] = l[0])
                : t.splice(e, 1, ...l)
              : (t[e] = l),
              e--;
          },
        }) ?? 0;
    if (s === 2) {return 2;}
    if (s !== 1 && n.kind === 'function' && fe(n.nodes, r, n) === 2) {return 2;}
  }
}
function H(t) {
  let r = '';
  for (let o of t)
    {switch (o.kind) {
      case 'word':
      case 'separator': {
        r += o.value;
        break;
      }
      case 'function':
        r += o.value + '(' + H(o.nodes) + ')';
    }}
  return r;
}
let ao = 92,
  so = 41,
  Nt = 58,
  St = 44,
  uo = 34,
  Tt = 61,
  Vt = 62,
  Et = 60,
  Rt = 10,
  co = 40,
  fo = 39,
  Ot = 47,
  Kt = 32,
  zt = 9;
function M(t) {
  t = t.replaceAll(
    `\r
`,
    `
`
  );
  let r = [],
    o = [],
    e = null,
    n = '',
    s;
  for (let l = 0; l < t.length; l++) {
    let f = t.charCodeAt(l);
    switch (f) {
      case Nt:
      case St:
      case Tt:
      case Vt:
      case Et:
      case Rt:
      case Ot:
      case Kt:
      case zt: {
        if (n.length > 0) {
          let m = rt(n);
          e ? e.nodes.push(m) : r.push(m), (n = '');
        }
        let d = l,
          c = l + 1;
        for (
          ;
          c < t.length &&
          ((s = t.charCodeAt(c)),
          !(s !== Nt && s !== St && s !== Tt && s !== Vt && s !== Et && s !== Rt && s !== Ot && s !== Kt && s !== zt));
          c++
        ){;}
        l = c - 1;
        let p = lo(t.slice(d, c));
        e ? e.nodes.push(p) : r.push(p);
        break;
      }
      case fo:
      case uo: {
        let d = l;
        for (let c = l + 1; c < t.length; c++)
          {if (((s = t.charCodeAt(c)), s === ao)) {c += 1;}
          else if (s === f) {
            l = c;
            break;
          }}
        n += t.slice(d, l + 1);
        break;
      }
      case co: {
        let d = io(n, []);
        (n = ''), e ? e.nodes.push(d) : r.push(d), o.push(d), (e = d);
        break;
      }
      case so: {
        let d = o.pop();
        if (n.length > 0) {
          let c = rt(n);
          d.nodes.push(c), (n = '');
        }
        o.length > 0 ? (e = o[o.length - 1]) : (e = null);
        break;
      }
      default:
        n += String.fromCharCode(f);
    }
  }
  return n.length > 0 && r.push(rt(n)), r;
}
let ot = [
    'calc',
    'min',
    'max',
    'clamp',
    'mod',
    'rem',
    'sin',
    'cos',
    'tan',
    'asin',
    'acos',
    'atan',
    'atan2',
    'pow',
    'sqrt',
    'hypot',
    'log',
    'exp',
    'round',
  ],
  _e = ['anchor-size'],
  Pt = new RegExp(`(${_e.join('|')})\\(`, 'g');
function we(t) {
  return t.indexOf('(') !== -1 && ot.some((r) => t.includes(`${r}(`));
}
function _t(t) {
  if (!ot.some((n) => t.includes(n))) {return t;}
  let r = !1;
  _e.some((n) => t.includes(n)) &&
    ((Pt.lastIndex = 0), (t = t.replace(Pt, (n, s) => ((r = !0), `$${_e.indexOf(s)}$(`))));
  let o = '',
    e = [];
  for (let n = 0; n < t.length; n++) {
    let s = t[n];
    if (s === '(') {
      o += s;
      let l = n;
      for (let d = n - 1; d >= 0; d--) {
        let c = t.charCodeAt(d);
        if (c >= 48 && c <= 57) {l = d;}
        else if (c >= 97 && c <= 122) {l = d;}
        else {break;}
      }
      let f = t.slice(l, n);
      if (ot.includes(f)) {
        e.unshift(!0);
        continue;
      } else if (e[0] && f === '') {
        e.unshift(!0);
        continue;
      }
      e.unshift(!1);
      continue;
    } else if (s === ')') {(o += s), e.shift();}
    else if (s === ',' && e[0]) {
      o += ', ';
      continue;
    } else {
      if (s === ' ' && e[0] && o[o.length - 1] === ' ') {continue;}
      if ((s === '+' || s === '*' || s === '/' || s === '-') && e[0]) {
        let l = o.trimEnd(),
          f = l[l.length - 1];
        if (f === '+' || f === '*' || f === '/' || f === '-') {
          o += s;
          continue;
        } else if (f === '(' || f === ',') {
          o += s;
          continue;
        } else {t[n - 1] === ' ' ? (o += `${s} `) : (o += ` ${s} `);}
      } else if (e[0] && t.startsWith('to-zero', n)) {
        let l = n;
        (n += 7), (o += t.slice(l, n + 1));
      } else {o += s;}
    }
  }
  return r ? o.replace(/\$(\d+)\$/g, (n, s) => _e[s] ?? n) : o;
}
function ee(t) {
  if (t.indexOf('(') === -1) {return xe(t);}
  let r = M(t);
  return nt(r), (t = H(r)), (t = _t(t)), t;
}
function xe(t) {
  let r = '';
  for (let o = 0; o < t.length; o++) {
    let e = t[o];
    e === '\\' && t[o + 1] === '_' ? ((r += '_'), (o += 1)) : e === '_' ? (r += ' ') : (r += e);
  }
  return r;
}
function nt(t) {
  for (let r of t)
    {switch (r.kind) {
      case 'function': {
        if (r.value === 'url' || r.value.endsWith('_url')) {
          r.value = xe(r.value);
          break;
        }
        if (r.value === 'var' || r.value.endsWith('_var') || r.value === 'theme' || r.value.endsWith('_theme')) {
          r.value = xe(r.value);
          for (let o = 0; o < r.nodes.length; o++) {(o == 0 && r.nodes[o].kind === 'word') || nt([r.nodes[o]]);}
          break;
        }
        (r.value = xe(r.value)), nt(r.nodes);
        break;
      }
      case 'separator':
      case 'word': {
        r.value = xe(r.value);
        break;
      }
      default:
        po(r);
    }}
}
function po(t) {
  throw new Error(`Unexpected value: ${t}`);
}
let De = new Uint8Array(256);
function K(t, r) {
  let o = 0,
    e = [],
    n = 0,
    s = t.length,
    l = r.charCodeAt(0);
  for (let f = 0; f < s; f++) {
    let d = t.charCodeAt(f);
    if (o === 0 && d === l) {
      e.push(t.slice(n, f)), (n = f + 1);
      continue;
    }
    switch (d) {
      case 92:
        f += 1;
        break;
      case 39:
      case 34:
        for (; ++f < s; ) {
          let c = t.charCodeAt(f);
          if (c === 92) {
            f += 1;
            continue;
          }
          if (c === d) {break;}
        }
        break;
      case 40:
        (De[o] = 41), o++;
        break;
      case 91:
        (De[o] = 93), o++;
        break;
      case 123:
        (De[o] = 125), o++;
        break;
      case 93:
      case 125:
      case 41:
        o > 0 && d === De[o - 1] && o--;
        break;
    }
  }
  return e.push(t.slice(n)), e;
}
let mo = 58,
  Dt = 45,
  Ut = 97,
  jt = 122;
function* Ft(t, r) {
  let o = K(t, ':');
  if (r.theme.prefix) {
    if (o.length === 1 || o[0] !== r.theme.prefix) {return null;}
    o.shift();
  }
  let e = o.pop(),
    n = [];
  for (let m = o.length - 1; m >= 0; --m) {
    let h = r.parseVariant(o[m]);
    if (h === null) {return;}
    n.push(h);
  }
  let s = !1;
  e[e.length - 1] === '!' ? ((s = !0), (e = e.slice(0, -1))) : e[0] === '!' && ((s = !0), (e = e.slice(1))),
    r.utilities.has(e, 'static') &&
      !e.includes('[') &&
      (yield { kind: 'static', root: e, variants: n, important: s, raw: t });
  let [l, f = null, d] = K(e, '/');
  if (d) {return;}
  let c = f === null ? null : it(f);
  if (f !== null && c === null) {return;}
  if (l[0] === '[') {
    if (l[l.length - 1] !== ']') {return;}
    let m = l.charCodeAt(1);
    if (m !== Dt && !(m >= Ut && m <= jt)) {return;}
    l = l.slice(1, -1);
    let h = l.indexOf(':');
    if (h === -1 || h === 0 || h === l.length - 1) {return;}
    let y = l.slice(0, h),
      v = ee(l.slice(h + 1));
    yield { kind: 'arbitrary', property: y, value: v, modifier: c, variants: n, important: s, raw: t };
    return;
  }
  let p;
  if (l[l.length - 1] === ']') {
    let m = l.indexOf('-[');
    if (m === -1) {return;}
    let h = l.slice(0, m);
    if (!r.utilities.has(h, 'functional')) {return;}
    let y = l.slice(m + 1);
    p = [[h, y]];
  } else if (l[l.length - 1] === ')') {
    let m = l.indexOf('-(');
    if (m === -1) {return;}
    let h = l.slice(0, m);
    if (!r.utilities.has(h, 'functional')) {return;}
    let y = l.slice(m + 2, -1),
      v = K(y, ':'),
      b = null;
    if ((v.length === 2 && ((b = v[0]), (y = v[1])), y[0] !== '-' && y[1] !== '-')) {return;}
    p = [[h, b === null ? `[var(${y})]` : `[${b}:var(${y})]`]];
  } else {p = Lt(l, (m) => r.utilities.has(m, 'functional'));}
  for (let [m, h] of p) {
    let y = { kind: 'functional', root: m, modifier: c, value: null, variants: n, important: s, raw: t };
    if (h === null) {
      yield y;
      continue;
    }
    {
      let v = h.indexOf('[');
      if (v !== -1) {
        if (h[h.length - 1] !== ']') {return;}
        let x = ee(h.slice(v + 1, -1)),
          S = '';
        for (let V = 0; V < x.length; V++) {
          let R = x.charCodeAt(V);
          if (R === mo) {
            (S = x.slice(0, V)), (x = x.slice(V + 1));
            break;
          }
          if (!(R === Dt || (R >= Ut && R <= jt))) {break;}
        }
        if (x.length === 0 || x.trim().length === 0) {continue;}
        y.value = { kind: 'arbitrary', dataType: S || null, value: x };
      } else {
        let x = f === null || y.modifier?.kind === 'arbitrary' ? null : `${h}/${f}`;
        y.value = { kind: 'named', value: h, fraction: x };
      }
    }
    yield y;
  }
}
function it(t) {
  if (t[0] === '[' && t[t.length - 1] === ']') {
    let r = ee(t.slice(1, -1));
    return r.length === 0 || r.trim().length === 0 ? null : { kind: 'arbitrary', value: r };
  }
  if (t[0] === '(' && t[t.length - 1] === ')') {
    let r = ee(t.slice(1, -1));
    return r.length === 0 || r.trim().length === 0 ? null : { kind: 'arbitrary', value: `var(${r})` };
  }
  return { kind: 'named', value: t };
}
function It(t, r) {
  if (t[0] === '[' && t[t.length - 1] === ']') {
    if (t[1] === '@' && t.includes('&')) {return null;}
    let o = ee(t.slice(1, -1));
    if (o.length === 0 || o.trim().length === 0) {return null;}
    let e = o[0] === '>' || o[0] === '+' || o[0] === '~';
    return (
      !e && o[0] !== '@' && !o.includes('&') && (o = `&:is(${o})`), { kind: 'arbitrary', selector: o, relative: e }
    );
  }
  {
    let [o, e = null, n] = K(t, '/');
    if (n) {return null;}
    let s = Lt(o, (l) => r.variants.has(l));
    for (let [l, f] of s)
      {switch (r.variants.kind(l)) {
        case 'static':
          return f !== null || e !== null ? null : { kind: 'static', root: l };
        case 'functional': {
          let d = e === null ? null : it(e);
          if (e !== null && d === null) {return null;}
          if (f === null) {return { kind: 'functional', root: l, modifier: d, value: null };}
          if (f[f.length - 1] === ']') {
            if (f[0] !== '[') {continue;}
            let c = ee(f.slice(1, -1));
            return c.length === 0 || c.trim().length === 0
              ? null
              : { kind: 'functional', root: l, modifier: d, value: { kind: 'arbitrary', value: c } };
          }
          if (f[f.length - 1] === ')') {
            if (f[0] !== '(') {continue;}
            let c = ee(f.slice(1, -1));
            return c.length === 0 || c.trim().length === 0
              ? null
              : { kind: 'functional', root: l, modifier: d, value: { kind: 'arbitrary', value: `var(${c})` } };
          }
          return { kind: 'functional', root: l, modifier: d, value: { kind: 'named', value: f } };
        }
        case 'compound': {
          if (f === null) {return null;}
          let d = r.parseVariant(f);
          if (d === null || !r.variants.compoundsWith(l, d)) {return null;}
          let c = e === null ? null : it(e);
          return e !== null && c === null ? null : { kind: 'compound', root: l, modifier: c, variant: d };
        }
      }}
  }
  return null;
}
function* Lt(t, r) {
  r(t) && (yield [t, null]);
  let o = t.lastIndexOf('-');
  if (o === -1) {
    t[0] === '@' && r('@') && (yield ['@', t.slice(1)]);
    return;
  }
  do {
    let e = t.slice(0, o);
    if (r(e)) {
      let n = [e, t.slice(o + 1)];
      if (n[1] === '') {break;}
      yield n;
    }
    o = t.lastIndexOf('-', o - 1);
  } while (o > 0);
}
function le(t, r, o) {
  if (t === r) {return 0;}
  let e = t.indexOf('('),
    n = r.indexOf('('),
    s = e === -1 ? t.replace(/[\d.]+/g, '') : t.slice(0, e),
    l = n === -1 ? r.replace(/[\d.]+/g, '') : r.slice(0, n),
    f = (s === l ? 0 : s < l ? -1 : 1) || (o === 'asc' ? parseInt(t) - parseInt(r) : parseInt(r) - parseInt(t));
  return Number.isNaN(f) ? (t < r ? -1 : 1) : f;
}
let I = class extends Map {
  constructor(o) {
    super();
    this.factory = o;
  }
  get(o) {
    let e = super.get(o);
    return e === void 0 && ((e = this.factory(o, this)), this.set(o, e)), e;
  }
};
let go = new Set([
    'black',
    'silver',
    'gray',
    'white',
    'maroon',
    'red',
    'purple',
    'fuchsia',
    'green',
    'lime',
    'olive',
    'yellow',
    'navy',
    'blue',
    'teal',
    'aqua',
    'aliceblue',
    'antiquewhite',
    'aqua',
    'aquamarine',
    'azure',
    'beige',
    'bisque',
    'black',
    'blanchedalmond',
    'blue',
    'blueviolet',
    'brown',
    'burlywood',
    'cadetblue',
    'chartreuse',
    'chocolate',
    'coral',
    'cornflowerblue',
    'cornsilk',
    'crimson',
    'cyan',
    'darkblue',
    'darkcyan',
    'darkgoldenrod',
    'darkgray',
    'darkgreen',
    'darkgrey',
    'darkkhaki',
    'darkmagenta',
    'darkolivegreen',
    'darkorange',
    'darkorchid',
    'darkred',
    'darksalmon',
    'darkseagreen',
    'darkslateblue',
    'darkslategray',
    'darkslategrey',
    'darkturquoise',
    'darkviolet',
    'deeppink',
    'deepskyblue',
    'dimgray',
    'dimgrey',
    'dodgerblue',
    'firebrick',
    'floralwhite',
    'forestgreen',
    'fuchsia',
    'gainsboro',
    'ghostwhite',
    'gold',
    'goldenrod',
    'gray',
    'green',
    'greenyellow',
    'grey',
    'honeydew',
    'hotpink',
    'indianred',
    'indigo',
    'ivory',
    'khaki',
    'lavender',
    'lavenderblush',
    'lawngreen',
    'lemonchiffon',
    'lightblue',
    'lightcoral',
    'lightcyan',
    'lightgoldenrodyellow',
    'lightgray',
    'lightgreen',
    'lightgrey',
    'lightpink',
    'lightsalmon',
    'lightseagreen',
    'lightskyblue',
    'lightslategray',
    'lightslategrey',
    'lightsteelblue',
    'lightyellow',
    'lime',
    'limegreen',
    'linen',
    'magenta',
    'maroon',
    'mediumaquamarine',
    'mediumblue',
    'mediumorchid',
    'mediumpurple',
    'mediumseagreen',
    'mediumslateblue',
    'mediumspringgreen',
    'mediumturquoise',
    'mediumvioletred',
    'midnightblue',
    'mintcream',
    'mistyrose',
    'moccasin',
    'navajowhite',
    'navy',
    'oldlace',
    'olive',
    'olivedrab',
    'orange',
    'orangered',
    'orchid',
    'palegoldenrod',
    'palegreen',
    'paleturquoise',
    'palevioletred',
    'papayawhip',
    'peachpuff',
    'peru',
    'pink',
    'plum',
    'powderblue',
    'purple',
    'rebeccapurple',
    'red',
    'rosybrown',
    'royalblue',
    'saddlebrown',
    'salmon',
    'sandybrown',
    'seagreen',
    'seashell',
    'sienna',
    'silver',
    'skyblue',
    'slateblue',
    'slategray',
    'slategrey',
    'snow',
    'springgreen',
    'steelblue',
    'tan',
    'teal',
    'thistle',
    'tomato',
    'turquoise',
    'violet',
    'wheat',
    'white',
    'whitesmoke',
    'yellow',
    'yellowgreen',
    'transparent',
    'currentcolor',
    'canvas',
    'canvastext',
    'linktext',
    'visitedtext',
    'activetext',
    'buttonface',
    'buttontext',
    'buttonborder',
    'field',
    'fieldtext',
    'highlight',
    'highlighttext',
    'selecteditem',
    'selecteditemtext',
    'mark',
    'marktext',
    'graytext',
    'accentcolor',
    'accentcolortext',
  ]),
  ho = /^(rgba?|hsla?|hwb|color|(ok)?(lab|lch)|light-dark|color-mix)\(/i;
function Mt(t) {
  return t.charCodeAt(0) === 35 || ho.test(t) || go.has(t.toLowerCase());
}
let bo = {
  color: Mt,
  length: at,
  percentage: lt,
  ratio: Ro,
  number: To,
  integer: N,
  url: Wt,
  position: zo,
  'bg-size': Po,
  'line-width': vo,
  image: xo,
  'family-name': Co,
  'generic-name': Ao,
  'absolute-size': $o,
  'relative-size': No,
  angle: Uo,
  vector: Fo,
};
function F(t, r) {
  if (t.startsWith('var(')) {return null;}
  for (let o of r) {if (bo[o]?.(t)) {return o;}}
  return null;
}
let yo = /^url\(.*\)$/;
function Wt(t) {
  return yo.test(t);
}
function vo(t) {
  return t === 'thin' || t === 'medium' || t === 'thick';
}
let ko = /^(?:element|image|cross-fade|image-set)\(/,
  wo = /^(repeating-)?(conic|linear|radial)-gradient\(/;
function xo(t) {
  let r = 0;
  for (let o of K(t, ','))
    {if (!o.startsWith('var(')) {
      if (Wt(o)) {
        r += 1;
        continue;
      }
      if (wo.test(o)) {
        r += 1;
        continue;
      }
      if (ko.test(o)) {
        r += 1;
        continue;
      }
      return !1;
    }}
  return r > 0;
}
function Ao(t) {
  return (
    t === 'serif' ||
    t === 'sans-serif' ||
    t === 'monospace' ||
    t === 'cursive' ||
    t === 'fantasy' ||
    t === 'system-ui' ||
    t === 'ui-serif' ||
    t === 'ui-sans-serif' ||
    t === 'ui-monospace' ||
    t === 'ui-rounded' ||
    t === 'math' ||
    t === 'emoji' ||
    t === 'fangsong'
  );
}
function Co(t) {
  let r = 0;
  for (let o of K(t, ',')) {
    let e = o.charCodeAt(0);
    if (e >= 48 && e <= 57) {return !1;}
    o.startsWith('var(') || (r += 1);
  }
  return r > 0;
}
function $o(t) {
  return (
    t === 'xx-small' ||
    t === 'x-small' ||
    t === 'small' ||
    t === 'medium' ||
    t === 'large' ||
    t === 'x-large' ||
    t === 'xx-large' ||
    t === 'xxx-large'
  );
}
function No(t) {
  return t === 'larger' || t === 'smaller';
}
let X = /[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/,
  So = new RegExp(`^${X.source}$`);
function To(t) {
  return So.test(t) || we(t);
}
let Vo = new RegExp(`^${X.source}%$`);
function lt(t) {
  return Vo.test(t) || we(t);
}
let Eo = new RegExp(`^${X.source}s*/s*${X.source}$`);
function Ro(t) {
  return Eo.test(t) || we(t);
}
let Oo = [
    'cm',
    'mm',
    'Q',
    'in',
    'pc',
    'pt',
    'px',
    'em',
    'ex',
    'ch',
    'rem',
    'lh',
    'rlh',
    'vw',
    'vh',
    'vmin',
    'vmax',
    'vb',
    'vi',
    'svw',
    'svh',
    'lvw',
    'lvh',
    'dvw',
    'dvh',
    'cqw',
    'cqh',
    'cqi',
    'cqb',
    'cqmin',
    'cqmax',
  ],
  Ko = new RegExp(`^${X.source}(${Oo.join('|')})$`);
function at(t) {
  return Ko.test(t) || we(t);
}
function zo(t) {
  let r = 0;
  for (let o of K(t, ' ')) {
    if (o === 'center' || o === 'top' || o === 'right' || o === 'bottom' || o === 'left') {
      r += 1;
      continue;
    }
    if (!o.startsWith('var(')) {
      if (at(o) || lt(o)) {
        r += 1;
        continue;
      }
      return !1;
    }
  }
  return r > 0;
}
function Po(t) {
  let r = 0;
  for (let o of K(t, ',')) {
    if (o === 'cover' || o === 'contain') {
      r += 1;
      continue;
    }
    let e = K(o, ' ');
    if (e.length !== 1 && e.length !== 2) {return !1;}
    if (e.every((n) => n === 'auto' || at(n) || lt(n))) {
      r += 1;
      continue;
    }
  }
  return r > 0;
}
let _o = ['deg', 'rad', 'grad', 'turn'],
  Do = new RegExp(`^${X.source}(${_o.join('|')})$`);
function Uo(t) {
  return Do.test(t);
}
let jo = new RegExp(`^${X.source} +${X.source} +${X.source}$`);
function Fo(t) {
  return jo.test(t);
}
function N(t) {
  let r = Number(t);
  return Number.isInteger(r) && r >= 0 && String(r) === String(t);
}
function de(t) {
  return Bt(t, 0.25);
}
function Ue(t) {
  return Bt(t, 0.25);
}
function Bt(t, r) {
  let o = Number(t);
  return o >= 0 && o % r === 0 && String(o) === String(t);
}
let Io = new Set(['inset', 'inherit', 'initial', 'revert', 'unset']),
  qt = /^-?(\d+|\.\d+)(.*?)$/g;
function ae(t, r) {
  return K(t, ',')
    .map((e) => {
      e = e.trim();
      let n = K(e, ' ').filter((c) => c.trim() !== ''),
        s = null,
        l = null,
        f = null;
      for (let c of n)
        {Io.has(c) ||
          (qt.test(c) ? (l === null ? (l = c) : f === null && (f = c), (qt.lastIndex = 0)) : s === null && (s = c));}
      if (l === null || f === null) {return e;}
      let d = r(s ?? 'currentcolor');
      return s !== null ? e.replace(s, d) : `${e} ${d}`;
    })
    .join(', ');
}
let Lo = /^-?[a-z][a-zA-Z0-9/%._-]*$/,
  Mo = /^-?[a-z][a-zA-Z0-9/%._-]*-\*$/,
  st = class {
    utilities = new I(() => []);
    completions = new Map();
    static(r, o) {
      this.utilities.get(r).push({ kind: 'static', compileFn: o });
    }
    functional(r, o, e) {
      this.utilities.get(r).push({ kind: 'functional', compileFn: o, options: e });
    }
    has(r, o) {
      return this.utilities.has(r) && this.utilities.get(r).some((e) => e.kind === o);
    }
    get(r) {
      return this.utilities.has(r) ? this.utilities.get(r) : [];
    }
    getCompletions(r) {
      return this.completions.get(r)?.() ?? [];
    }
    suggest(r, o) {
      this.completions.set(r, o);
    }
    keys(r) {
      let o = [];
      for (let [e, n] of this.utilities.entries())
        {for (let s of n)
          {if (s.kind === r) {
            o.push(e);
            break;
          }}}
      return o;
    }
  };
function $(t, r, o) {
  return P('@property', t, [
    a('syntax', o ? `"${o}"` : '"*"'),
    a('inherits', 'false'),
    ...(r ? [a('initial-value', r)] : []),
  ]);
}
function J(t, r) {
  if (r === null) {return t;}
  let o = Number(r);
  return Number.isNaN(o) || (r = `${o * 100}%`), `color-mix(in oklab, ${t} ${r}, transparent)`;
}
function W(t, r, o) {
  if (!r) {return t;}
  if (r.kind === 'arbitrary') {return J(t, r.value);}
  let e = o.resolve(r.value, ['--opacity']);
  return e ? J(t, e) : Ue(r.value) ? J(t, `${r.value}%`) : null;
}
function G(t, r, o) {
  let e = null;
  switch (t.value.value) {
    case 'inherit': {
      e = 'inherit';
      break;
    }
    case 'transparent': {
      e = 'transparent';
      break;
    }
    case 'current': {
      e = 'currentColor';
      break;
    }
    default: {
      e = r.resolve(t.value.value, o);
      break;
    }
  }
  return e ? W(e, t.modifier, r) : null;
}
function Gt(t) {
  let r = new st();
  function o(i, u) {
    function* g(w) {
      for (let k of t.keysInNamespaces(w)) {yield k.replaceAll('_', '.');}
    }
    r.suggest(i, () => {
      let w = [];
      for (let k of u()) {
        if (typeof k === 'string') {
          w.push({ values: [k], modifiers: [] });
          continue;
        }
        let T = [...(k.values ?? []), ...g(k.valueThemeKeys ?? [])],
          O = [...(k.modifiers ?? []), ...g(k.modifierThemeKeys ?? [])];
        k.hasDefaultValue && T.unshift(null), w.push({ supportsNegative: k.supportsNegative, values: T, modifiers: O });
      }
      return w;
    });
  }
  function e(i, u) {
    r.static(i, () => u.map((g) => (typeof g === 'function' ? g() : a(g[0], g[1]))));
  }
  function n(i, u) {
    function g({ negative: w }) {
      return (k) => {
        let T = null;
        if (k.value)
          {if (k.value.kind === 'arbitrary') {
            if (k.modifier) {return;}
            T = k.value.value;
          } else {
            if (
              ((T = t.resolve(k.value.fraction ?? k.value.value, u.themeKeys ?? [])),
              T === null && u.supportsFractions && k.value.fraction)
            ) {
              let [O, C] = K(k.value.fraction, '/');
              if (!N(O) || !N(C)) {return;}
              T = `calc(${k.value.fraction} * 100%)`;
            }
            if (T === null && w && u.handleNegativeBareValue) {
              if (((T = u.handleNegativeBareValue(k.value)), !T?.includes('/') && k.modifier)) {return;}
              if (T !== null) {return u.handle(T);}
            }
            if (T === null && u.handleBareValue && ((T = u.handleBareValue(k.value)), !T?.includes('/') && k.modifier))
              {return;}
          }}
        else {
          if (k.modifier) {return;}
          T = u.defaultValue !== void 0 ? u.defaultValue : t.resolve(null, u.themeKeys ?? []);
        }
        if (T !== null) {return u.handle(w ? `calc(${T} * -1)` : T);}
      };
    }
    u.supportsNegative && r.functional(`-${i}`, g({ negative: !0 })),
      r.functional(i, g({ negative: !1 })),
      o(i, () => [
        {
          supportsNegative: u.supportsNegative,
          valueThemeKeys: u.themeKeys ?? [],
          hasDefaultValue: u.defaultValue !== void 0 && u.defaultValue !== null,
        },
      ]);
  }
  function s(i, u) {
    r.functional(i, (g) => {
      if (!g.value) {return;}
      let w = null;
      if (
        (g.value.kind === 'arbitrary' ? ((w = g.value.value), (w = W(w, g.modifier, t))) : (w = G(g, t, u.themeKeys)),
        w !== null)
      )
        {return u.handle(w);}
    }),
      o(i, () => [
        {
          values: ['current', 'inherit', 'transparent'],
          valueThemeKeys: u.themeKeys,
          modifiers: Array.from({ length: 21 }, (g, w) => `${w * 5}`),
        },
      ]);
  }
  function l(i, u, g, { supportsNegative: w = !1, supportsFractions: k = !1 } = {}) {
    w && r.static(`-${i}-px`, () => g('-1px')),
      r.static(`${i}-px`, () => g('1px')),
      n(i, {
        themeKeys: u,
        supportsFractions: k,
        supportsNegative: w,
        defaultValue: null,
        handleBareValue: ({ value: T }) => {
          let O = t.resolve(null, ['--spacing']);
          return !O || !de(T) ? null : `calc(${O} * ${T})`;
        },
        handleNegativeBareValue: ({ value: T }) => {
          let O = t.resolve(null, ['--spacing']);
          return !O || !de(T) ? null : `calc(${O} * -${T})`;
        },
        handle: g,
      }),
      o(i, () => [
        {
          values: [
            '0',
            '0.5',
            '1',
            '1.5',
            '2',
            '2.5',
            '3',
            '3.5',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '14',
            '16',
            '20',
            '24',
            '28',
            '32',
            '36',
            '40',
            '44',
            '48',
            '52',
            '56',
            '60',
            '64',
            '72',
            '80',
            '96',
          ],
          supportsNegative: w,
          valueThemeKeys: u,
        },
      ]);
  }
  e('sr-only', [
    ['position', 'absolute'],
    ['width', '1px'],
    ['height', '1px'],
    ['padding', '0'],
    ['margin', '-1px'],
    ['overflow', 'hidden'],
    ['clip', 'rect(0, 0, 0, 0)'],
    ['white-space', 'nowrap'],
    ['border-width', '0'],
  ]),
    e('not-sr-only', [
      ['position', 'static'],
      ['width', 'auto'],
      ['height', 'auto'],
      ['padding', '0'],
      ['margin', '0'],
      ['overflow', 'visible'],
      ['clip', 'auto'],
      ['white-space', 'normal'],
    ]),
    e('pointer-events-none', [['pointer-events', 'none']]),
    e('pointer-events-auto', [['pointer-events', 'auto']]),
    e('visible', [['visibility', 'visible']]),
    e('invisible', [['visibility', 'hidden']]),
    e('collapse', [['visibility', 'collapse']]),
    e('static', [['position', 'static']]),
    e('fixed', [['position', 'fixed']]),
    e('absolute', [['position', 'absolute']]),
    e('relative', [['position', 'relative']]),
    e('sticky', [['position', 'sticky']]);
  for (let [i, u] of [
    ['inset', 'inset'],
    ['inset-x', 'inset-inline'],
    ['inset-y', 'inset-block'],
    ['start', 'inset-inline-start'],
    ['end', 'inset-inline-end'],
    ['top', 'top'],
    ['right', 'right'],
    ['bottom', 'bottom'],
    ['left', 'left'],
  ])
    {e(`${i}-auto`, [[u, 'auto']]),
      e(`${i}-full`, [[u, '100%']]),
      e(`-${i}-full`, [[u, '-100%']]),
      l(i, ['--inset', '--spacing'], (g) => [a(u, g)], { supportsNegative: !0, supportsFractions: !0 });}
  e('isolate', [['isolation', 'isolate']]),
    e('isolation-auto', [['isolation', 'auto']]),
    e('z-auto', [['z-index', 'auto']]),
    n('z', {
      supportsNegative: !0,
      handleBareValue: ({ value: i }) => (N(i) ? i : null),
      themeKeys: ['--z-index'],
      handle: (i) => [a('z-index', i)],
    }),
    o('z', () => [
      { supportsNegative: !0, values: ['0', '10', '20', '30', '40', '50'], valueThemeKeys: ['--z-index'] },
    ]),
    e('order-first', [['order', 'calc(-infinity)']]),
    e('order-last', [['order', 'calc(infinity)']]),
    e('order-none', [['order', '0']]),
    n('order', {
      supportsNegative: !0,
      handleBareValue: ({ value: i }) => (N(i) ? i : null),
      themeKeys: ['--order'],
      handle: (i) => [a('order', i)],
    }),
    o('order', () => [
      { supportsNegative: !0, values: Array.from({ length: 12 }, (i, u) => `${u + 1}`), valueThemeKeys: ['--order'] },
    ]),
    e('col-auto', [['grid-column', 'auto']]),
    n('col', { themeKeys: ['--grid-column'], handle: (i) => [a('grid-column', i)] }),
    e('col-span-full', [['grid-column', '1 / -1']]),
    n('col-span', {
      handleBareValue: ({ value: i }) => (N(i) ? i : null),
      handle: (i) => [a('grid-column', `span ${i} / span ${i}`)],
    }),
    e('col-start-auto', [['grid-column-start', 'auto']]),
    n('col-start', {
      supportsNegative: !0,
      handleBareValue: ({ value: i }) => (N(i) ? i : null),
      themeKeys: ['--grid-column-start'],
      handle: (i) => [a('grid-column-start', i)],
    }),
    e('col-end-auto', [['grid-column-end', 'auto']]),
    n('col-end', {
      supportsNegative: !0,
      handleBareValue: ({ value: i }) => (N(i) ? i : null),
      themeKeys: ['--grid-column-end'],
      handle: (i) => [a('grid-column-end', i)],
    }),
    o('col-span', () => [{ values: Array.from({ length: 12 }, (i, u) => `${u + 1}`), valueThemeKeys: [] }]),
    o('col-start', () => [
      {
        supportsNegative: !0,
        values: Array.from({ length: 13 }, (i, u) => `${u + 1}`),
        valueThemeKeys: ['--grid-column-start'],
      },
    ]),
    o('col-end', () => [
      {
        supportsNegative: !0,
        values: Array.from({ length: 13 }, (i, u) => `${u + 1}`),
        valueThemeKeys: ['--grid-column-end'],
      },
    ]),
    e('row-auto', [['grid-row', 'auto']]),
    n('row', { themeKeys: ['--grid-row'], handle: (i) => [a('grid-row', i)] }),
    e('row-span-full', [['grid-row', '1 / -1']]),
    n('row-span', {
      themeKeys: [],
      handleBareValue: ({ value: i }) => (N(i) ? i : null),
      handle: (i) => [a('grid-row', `span ${i} / span ${i}`)],
    }),
    e('row-start-auto', [['grid-row-start', 'auto']]),
    n('row-start', {
      supportsNegative: !0,
      handleBareValue: ({ value: i }) => (N(i) ? i : null),
      themeKeys: ['--grid-row-start'],
      handle: (i) => [a('grid-row-start', i)],
    }),
    e('row-end-auto', [['grid-row-end', 'auto']]),
    n('row-end', {
      supportsNegative: !0,
      handleBareValue: ({ value: i }) => (N(i) ? i : null),
      themeKeys: ['--grid-row-end'],
      handle: (i) => [a('grid-row-end', i)],
    }),
    o('row-span', () => [{ values: Array.from({ length: 12 }, (i, u) => `${u + 1}`), valueThemeKeys: [] }]),
    o('row-start', () => [
      {
        supportsNegative: !0,
        values: Array.from({ length: 13 }, (i, u) => `${u + 1}`),
        valueThemeKeys: ['--grid-row-start'],
      },
    ]),
    o('row-end', () => [
      {
        supportsNegative: !0,
        values: Array.from({ length: 13 }, (i, u) => `${u + 1}`),
        valueThemeKeys: ['--grid-row-end'],
      },
    ]),
    e('float-start', [['float', 'inline-start']]),
    e('float-end', [['float', 'inline-end']]),
    e('float-right', [['float', 'right']]),
    e('float-left', [['float', 'left']]),
    e('float-none', [['float', 'none']]),
    e('clear-start', [['clear', 'inline-start']]),
    e('clear-end', [['clear', 'inline-end']]),
    e('clear-right', [['clear', 'right']]),
    e('clear-left', [['clear', 'left']]),
    e('clear-both', [['clear', 'both']]),
    e('clear-none', [['clear', 'none']]);
  for (let [i, u] of [
    ['m', 'margin'],
    ['mx', 'margin-inline'],
    ['my', 'margin-block'],
    ['ms', 'margin-inline-start'],
    ['me', 'margin-inline-end'],
    ['mt', 'margin-top'],
    ['mr', 'margin-right'],
    ['mb', 'margin-bottom'],
    ['ml', 'margin-left'],
  ])
    {e(`${i}-auto`, [[u, 'auto']]), l(i, ['--margin', '--spacing'], (g) => [a(u, g)], { supportsNegative: !0 });}
  e('box-border', [['box-sizing', 'border-box']]),
    e('box-content', [['box-sizing', 'content-box']]),
    e('line-clamp-none', [
      ['overflow', 'visible'],
      ['display', 'block'],
      ['-webkit-box-orient', 'horizontal'],
      ['-webkit-line-clamp', 'unset'],
    ]),
    n('line-clamp', {
      themeKeys: ['--line-clamp'],
      handleBareValue: ({ value: i }) => (N(i) ? i : null),
      handle: (i) => [
        a('overflow', 'hidden'),
        a('display', '-webkit-box'),
        a('-webkit-box-orient', 'vertical'),
        a('-webkit-line-clamp', i),
      ],
    }),
    o('line-clamp', () => [{ values: ['1', '2', '3', '4', '5', '6'], valueThemeKeys: ['--line-clamp'] }]),
    e('block', [['display', 'block']]),
    e('inline-block', [['display', 'inline-block']]),
    e('inline', [['display', 'inline']]),
    e('hidden', [['display', 'none']]),
    e('inline-flex', [['display', 'inline-flex']]),
    e('table', [['display', 'table']]),
    e('inline-table', [['display', 'inline-table']]),
    e('table-caption', [['display', 'table-caption']]),
    e('table-cell', [['display', 'table-cell']]),
    e('table-column', [['display', 'table-column']]),
    e('table-column-group', [['display', 'table-column-group']]),
    e('table-footer-group', [['display', 'table-footer-group']]),
    e('table-header-group', [['display', 'table-header-group']]),
    e('table-row-group', [['display', 'table-row-group']]),
    e('table-row', [['display', 'table-row']]),
    e('flow-root', [['display', 'flow-root']]),
    e('flex', [['display', 'flex']]),
    e('grid', [['display', 'grid']]),
    e('inline-grid', [['display', 'inline-grid']]),
    e('contents', [['display', 'contents']]),
    e('list-item', [['display', 'list-item']]),
    e('field-sizing-content', [['field-sizing', 'content']]),
    e('field-sizing-fixed', [['field-sizing', 'fixed']]),
    e('aspect-auto', [['aspect-ratio', 'auto']]),
    e('aspect-square', [['aspect-ratio', '1 / 1']]),
    n('aspect', {
      themeKeys: ['--aspect'],
      handleBareValue: ({ fraction: i }) => {
        if (i === null) {return null;}
        let [u, g] = K(i, '/');
        return !N(u) || !N(g) ? null : i;
      },
      handle: (i) => [a('aspect-ratio', i)],
    });
  for (let [i, u] of [
    ['auto', 'auto'],
    ['full', '100%'],
    ['svw', '100svw'],
    ['lvw', '100lvw'],
    ['dvw', '100dvw'],
    ['svh', '100svh'],
    ['lvh', '100lvh'],
    ['dvh', '100dvh'],
    ['min', 'min-content'],
    ['max', 'max-content'],
    ['fit', 'fit-content'],
  ])
    {e(`size-${i}`, [
      ['--tw-sort', 'size'],
      ['width', u],
      ['height', u],
    ]),
      e(`w-${i}`, [['width', u]]),
      e(`min-w-${i}`, [['min-width', u]]),
      e(`max-w-${i}`, [['max-width', u]]),
      e(`h-${i}`, [['height', u]]),
      e(`min-h-${i}`, [['min-height', u]]),
      e(`max-h-${i}`, [['max-height', u]]);}
  e('w-screen', [['width', '100vw']]),
    e('min-w-screen', [['min-width', '100vw']]),
    e('max-w-screen', [['max-width', '100vw']]),
    e('h-screen', [['height', '100vh']]),
    e('min-h-screen', [['min-height', '100vh']]),
    e('max-h-screen', [['max-height', '100vh']]),
    e('min-w-none', [['min-width', 'none']]),
    e('max-w-none', [['max-width', 'none']]),
    e('min-h-none', [['min-height', 'none']]),
    e('max-h-none', [['max-height', 'none']]),
    l('size', ['--size', '--spacing'], (i) => [a('--tw-sort', 'size'), a('width', i), a('height', i)], {
      supportsFractions: !0,
    });
  for (let [i, u, g] of [
    ['w', ['--width', '--spacing', '--container'], 'width'],
    ['min-w', ['--min-width', '--spacing', '--container'], 'min-width'],
    ['max-w', ['--max-width', '--spacing', '--container'], 'max-width'],
    ['h', ['--height', '--spacing'], 'height'],
    ['min-h', ['--min-height', '--height', '--spacing'], 'min-height'],
    ['max-h', ['--max-height', '--height', '--spacing'], 'max-height'],
  ])
    {l(i, u, (w) => [a(g, w)], { supportsFractions: !0 });}
  r.static('container', () => {
    let i = [...t.namespace('--breakpoint').values()];
    i.sort((g, w) => le(g, w, 'asc'));
    let u = [a('--tw-sort', '--tw-container-component'), a('width', '100%')];
    for (let g of i) {u.push(P('@media', `(width >= ${g})`, [a('max-width', g)]));}
    return u;
  }),
    e('flex-auto', [['flex', 'auto']]),
    e('flex-initial', [['flex', '0 auto']]),
    e('flex-none', [['flex', 'none']]),
    r.functional('flex', (i) => {
      if (i.value) {
        if (i.value.kind === 'arbitrary') {return i.modifier ? void 0 : [a('flex', i.value.value)];}
        if (i.value.fraction) {
          let [u, g] = K(i.value.fraction, '/');
          return !N(u) || !N(g) ? void 0 : [a('flex', `calc(${i.value.fraction} * 100%)`)];
        }
        if (N(i.value.value)) {return i.modifier ? void 0 : [a('flex', i.value.value)];}
      }
    }),
    n('shrink', {
      defaultValue: '1',
      handleBareValue: ({ value: i }) => (N(i) ? i : null),
      handle: (i) => [a('flex-shrink', i)],
    }),
    n('grow', {
      defaultValue: '1',
      handleBareValue: ({ value: i }) => (N(i) ? i : null),
      handle: (i) => [a('flex-grow', i)],
    }),
    o('shrink', () => [{ values: ['0'], valueThemeKeys: [], hasDefaultValue: !0 }]),
    o('grow', () => [{ values: ['0'], valueThemeKeys: [], hasDefaultValue: !0 }]),
    e('basis-auto', [['flex-basis', 'auto']]),
    e('basis-full', [['flex-basis', '100%']]),
    l('basis', ['--flex-basis', '--spacing', '--container'], (i) => [a('flex-basis', i)], { supportsFractions: !0 }),
    e('table-auto', [['table-layout', 'auto']]),
    e('table-fixed', [['table-layout', 'fixed']]),
    e('caption-top', [['caption-side', 'top']]),
    e('caption-bottom', [['caption-side', 'bottom']]),
    e('border-collapse', [['border-collapse', 'collapse']]),
    e('border-separate', [['border-collapse', 'separate']]);
  let f = () => D([$('--tw-border-spacing-x', '0', '<length>'), $('--tw-border-spacing-y', '0', '<length>')]);
  l('border-spacing', ['--border-spacing', '--spacing'], (i) => [
    f(),
    a('--tw-border-spacing-x', i),
    a('--tw-border-spacing-y', i),
    a('border-spacing', 'var(--tw-border-spacing-x) var(--tw-border-spacing-y)'),
  ]),
    l('border-spacing-x', ['--border-spacing', '--spacing'], (i) => [
      f(),
      a('--tw-border-spacing-x', i),
      a('border-spacing', 'var(--tw-border-spacing-x) var(--tw-border-spacing-y)'),
    ]),
    l('border-spacing-y', ['--border-spacing', '--spacing'], (i) => [
      f(),
      a('--tw-border-spacing-y', i),
      a('border-spacing', 'var(--tw-border-spacing-x) var(--tw-border-spacing-y)'),
    ]),
    e('origin-center', [['transform-origin', 'center']]),
    e('origin-top', [['transform-origin', 'top']]),
    e('origin-top-right', [['transform-origin', 'top right']]),
    e('origin-right', [['transform-origin', 'right']]),
    e('origin-bottom-right', [['transform-origin', 'bottom right']]),
    e('origin-bottom', [['transform-origin', 'bottom']]),
    e('origin-bottom-left', [['transform-origin', 'bottom left']]),
    e('origin-left', [['transform-origin', 'left']]),
    e('origin-top-left', [['transform-origin', 'top left']]),
    n('origin', { themeKeys: ['--transform-origin'], handle: (i) => [a('transform-origin', i)] }),
    e('perspective-origin-center', [['perspective-origin', 'center']]),
    e('perspective-origin-top', [['perspective-origin', 'top']]),
    e('perspective-origin-top-right', [['perspective-origin', 'top right']]),
    e('perspective-origin-right', [['perspective-origin', 'right']]),
    e('perspective-origin-bottom-right', [['perspective-origin', 'bottom right']]),
    e('perspective-origin-bottom', [['perspective-origin', 'bottom']]),
    e('perspective-origin-bottom-left', [['perspective-origin', 'bottom left']]),
    e('perspective-origin-left', [['perspective-origin', 'left']]),
    e('perspective-origin-top-left', [['perspective-origin', 'top left']]),
    n('perspective-origin', { themeKeys: ['--perspective-origin'], handle: (i) => [a('perspective-origin', i)] }),
    e('perspective-none', [['perspective', 'none']]),
    n('perspective', { themeKeys: ['--perspective'], handle: (i) => [a('perspective', i)] });
  let d = () => D([$('--tw-translate-x', '0'), $('--tw-translate-y', '0'), $('--tw-translate-z', '0')]);
  e('translate-none', [['translate', 'none']]),
    e('-translate-full', [
      d,
      ['--tw-translate-x', '-100%'],
      ['--tw-translate-y', '-100%'],
      ['translate', 'var(--tw-translate-x) var(--tw-translate-y)'],
    ]),
    e('translate-full', [
      d,
      ['--tw-translate-x', '100%'],
      ['--tw-translate-y', '100%'],
      ['translate', 'var(--tw-translate-x) var(--tw-translate-y)'],
    ]),
    l(
      'translate',
      ['--translate', '--spacing'],
      (i) => [
        d(),
        a('--tw-translate-x', i),
        a('--tw-translate-y', i),
        a('translate', 'var(--tw-translate-x) var(--tw-translate-y)'),
      ],
      { supportsNegative: !0, supportsFractions: !0 }
    );
  for (let i of ['x', 'y'])
    {e(`-translate-${i}-full`, [
      d,
      [`--tw-translate-${i}`, '-100%'],
      ['translate', 'var(--tw-translate-x) var(--tw-translate-y)'],
    ]),
      e(`translate-${i}-full`, [
        d,
        [`--tw-translate-${i}`, '100%'],
        ['translate', 'var(--tw-translate-x) var(--tw-translate-y)'],
      ]),
      l(
        `translate-${i}`,
        ['--translate', '--spacing'],
        (u) => [d(), a(`--tw-translate-${i}`, u), a('translate', 'var(--tw-translate-x) var(--tw-translate-y)')],
        { supportsNegative: !0, supportsFractions: !0 }
      );}
  l(
    'translate-z',
    ['--translate', '--spacing'],
    (i) => [
      d(),
      a('--tw-translate-z', i),
      a('translate', 'var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z)'),
    ],
    { supportsNegative: !0 }
  ),
    e('-translate-z-px', [
      d,
      ['--tw-translate-z', '-1px'],
      ['translate', 'var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z)'],
    ]),
    e('translate-z-px', [
      d,
      ['--tw-translate-z', '1px'],
      ['translate', 'var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z)'],
    ]),
    e('translate-3d', [d, ['translate', 'var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z)']]);
  let c = () => D([$('--tw-scale-x', '1'), $('--tw-scale-y', '1'), $('--tw-scale-z', '1')]);
  e('scale-none', [['scale', 'none']]);
  function p({ negative: i }) {
    return (u) => {
      if (!u.value || u.modifier) {return;}
      let g;
      return u.value.kind === 'arbitrary'
        ? ((g = u.value.value), [a('scale', g)])
        : ((g = t.resolve(u.value.value, ['--scale'])),
          !g && N(u.value.value) && (g = `${u.value.value}%`),
          g
            ? ((g = i ? `calc(${g} * -1)` : g),
              [
                c(),
                a('--tw-scale-x', g),
                a('--tw-scale-y', g),
                a('--tw-scale-z', g),
                a('scale', 'var(--tw-scale-x) var(--tw-scale-y)'),
              ])
            : void 0);
    };
  }
  r.functional('-scale', p({ negative: !0 })),
    r.functional('scale', p({ negative: !1 })),
    o('scale', () => [
      {
        supportsNegative: !0,
        values: ['0', '50', '75', '90', '95', '100', '105', '110', '125', '150', '200'],
        valueThemeKeys: ['--scale'],
      },
    ]);
  for (let i of ['x', 'y', 'z'])
    {n(`scale-${i}`, {
      supportsNegative: !0,
      themeKeys: ['--scale'],
      handleBareValue: ({ value: u }) => (N(u) ? `${u}%` : null),
      handle: (u) => [
        c(),
        a(`--tw-scale-${i}`, u),
        a('scale', `var(--tw-scale-x) var(--tw-scale-y)${i === 'z' ? ' var(--tw-scale-z)' : ''}`),
      ],
    }),
      o(`scale-${i}`, () => [
        {
          supportsNegative: !0,
          values: ['0', '50', '75', '90', '95', '100', '105', '110', '125', '150', '200'],
          valueThemeKeys: ['--scale'],
        },
      ]);}
  e('scale-3d', [c, ['scale', 'var(--tw-scale-x) var(--tw-scale-y) var(--tw-scale-z)']]),
    e('rotate-none', [['rotate', 'none']]);
  function m({ negative: i }) {
    return (u) => {
      if (!u.value || u.modifier) {return;}
      let g;
      if (u.value.kind === 'arbitrary') {
        g = u.value.value;
        let w = u.value.dataType ?? F(g, ['angle', 'vector']);
        if (w === 'vector') {return [a('rotate', `${g} var(--tw-rotate)`)];}
        if (w !== 'angle') {return [a('rotate', g)];}
      } else if (
        ((g = t.resolve(u.value.value, ['--rotate'])), !g && N(u.value.value) && (g = `${u.value.value}deg`), !g)
      )
        {return;}
      return [a('rotate', i ? `calc(${g} * -1)` : g)];
    };
  }
  r.functional('-rotate', m({ negative: !0 })),
    r.functional('rotate', m({ negative: !1 })),
    o('rotate', () => [
      {
        supportsNegative: !0,
        values: ['0', '1', '2', '3', '6', '12', '45', '90', '180'],
        valueThemeKeys: ['--rotate'],
      },
    ]);
  {
    let i = [
        'var(--tw-rotate-x)',
        'var(--tw-rotate-y)',
        'var(--tw-rotate-z)',
        'var(--tw-skew-x)',
        'var(--tw-skew-y)',
      ].join(' '),
      u = () =>
        D([
          $('--tw-rotate-x', 'rotateX(0)'),
          $('--tw-rotate-y', 'rotateY(0)'),
          $('--tw-rotate-z', 'rotateZ(0)'),
          $('--tw-skew-x', 'skewX(0)'),
          $('--tw-skew-y', 'skewY(0)'),
        ]);
    for (let g of ['x', 'y', 'z'])
      {n(`rotate-${g}`, {
        supportsNegative: !0,
        themeKeys: ['--rotate'],
        handleBareValue: ({ value: w }) => (N(w) ? `${w}deg` : null),
        handle: (w) => [u(), a(`--tw-rotate-${g}`, `rotate${g.toUpperCase()}(${w})`), a('transform', i)],
      }),
        o(`rotate-${g}`, () => [
          {
            supportsNegative: !0,
            values: ['0', '1', '2', '3', '6', '12', '45', '90', '180'],
            valueThemeKeys: ['--rotate'],
          },
        ]);}
    n('skew', {
      supportsNegative: !0,
      themeKeys: ['--skew'],
      handleBareValue: ({ value: g }) => (N(g) ? `${g}deg` : null),
      handle: (g) => [u(), a('--tw-skew-x', `skewX(${g})`), a('--tw-skew-y', `skewY(${g})`), a('transform', i)],
    }),
      n('skew-x', {
        supportsNegative: !0,
        themeKeys: ['--skew'],
        handleBareValue: ({ value: g }) => (N(g) ? `${g}deg` : null),
        handle: (g) => [u(), a('--tw-skew-x', `skewX(${g})`), a('transform', i)],
      }),
      n('skew-y', {
        supportsNegative: !0,
        themeKeys: ['--skew'],
        handleBareValue: ({ value: g }) => (N(g) ? `${g}deg` : null),
        handle: (g) => [u(), a('--tw-skew-y', `skewY(${g})`), a('transform', i)],
      }),
      o('skew', () => [{ supportsNegative: !0, values: ['0', '1', '2', '3', '6', '12'], valueThemeKeys: ['--skew'] }]),
      o('skew-x', () => [
        { supportsNegative: !0, values: ['0', '1', '2', '3', '6', '12'], valueThemeKeys: ['--skew'] },
      ]),
      o('skew-y', () => [
        { supportsNegative: !0, values: ['0', '1', '2', '3', '6', '12'], valueThemeKeys: ['--skew'] },
      ]),
      r.functional('transform', (g) => {
        if (g.modifier) {return;}
        let w = null;
        if ((g.value ? g.value.kind === 'arbitrary' && (w = g.value.value) : (w = i), w !== null))
          {return [u(), a('transform', w)];}
      }),
      o('transform', () => [{ hasDefaultValue: !0 }]),
      e('transform-cpu', [['transform', i]]),
      e('transform-gpu', [['transform', `translateZ(0) ${i}`]]),
      e('transform-none', [['transform', 'none']]);
  }
  e('transform-flat', [['transform-style', 'flat']]),
    e('transform-3d', [['transform-style', 'preserve-3d']]),
    e('transform-content', [['transform-box', 'content-box']]),
    e('transform-border', [['transform-box', 'border-box']]),
    e('transform-fill', [['transform-box', 'fill-box']]),
    e('transform-stroke', [['transform-box', 'stroke-box']]),
    e('transform-view', [['transform-box', 'view-box']]),
    e('backface-visible', [['backface-visibility', 'visible']]),
    e('backface-hidden', [['backface-visibility', 'hidden']]);
  for (let i of [
    'auto',
    'default',
    'pointer',
    'wait',
    'text',
    'move',
    'help',
    'not-allowed',
    'none',
    'context-menu',
    'progress',
    'cell',
    'crosshair',
    'vertical-text',
    'alias',
    'copy',
    'no-drop',
    'grab',
    'grabbing',
    'all-scroll',
    'col-resize',
    'row-resize',
    'n-resize',
    'e-resize',
    's-resize',
    'w-resize',
    'ne-resize',
    'nw-resize',
    'se-resize',
    'sw-resize',
    'ew-resize',
    'ns-resize',
    'nesw-resize',
    'nwse-resize',
    'zoom-in',
    'zoom-out',
  ])
    {e(`cursor-${i}`, [['cursor', i]]);}
  n('cursor', { themeKeys: ['--cursor'], handle: (i) => [a('cursor', i)] });
  for (let i of ['auto', 'none', 'manipulation']) {e(`touch-${i}`, [['touch-action', i]]);}
  let h = () => D([$('--tw-pan-x'), $('--tw-pan-y'), $('--tw-pinch-zoom')]);
  for (let i of ['x', 'left', 'right'])
    {e(`touch-pan-${i}`, [
      h,
      ['--tw-pan-x', `pan-${i}`],
      ['touch-action', 'var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)'],
    ]);}
  for (let i of ['y', 'up', 'down'])
    {e(`touch-pan-${i}`, [
      h,
      ['--tw-pan-y', `pan-${i}`],
      ['touch-action', 'var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)'],
    ]);}
  e('touch-pinch-zoom', [
    h,
    ['--tw-pinch-zoom', 'pinch-zoom'],
    ['touch-action', 'var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)'],
  ]);
  for (let i of ['none', 'text', 'all', 'auto'])
    {e(`select-${i}`, [
      ['-webkit-user-select', i],
      ['user-select', i],
    ]);}
  e('resize-none', [['resize', 'none']]),
    e('resize-x', [['resize', 'horizontal']]),
    e('resize-y', [['resize', 'vertical']]),
    e('resize', [['resize', 'both']]),
    e('snap-none', [['scroll-snap-type', 'none']]);
  let y = () => D([$('--tw-scroll-snap-strictness', 'proximity', '*')]);
  for (let i of ['x', 'y', 'both']) {e(`snap-${i}`, [y, ['scroll-snap-type', `${i} var(--tw-scroll-snap-strictness)`]]);}
  e('snap-mandatory', [y, ['--tw-scroll-snap-strictness', 'mandatory']]),
    e('snap-proximity', [y, ['--tw-scroll-snap-strictness', 'proximity']]),
    e('snap-align-none', [['scroll-snap-align', 'none']]),
    e('snap-start', [['scroll-snap-align', 'start']]),
    e('snap-end', [['scroll-snap-align', 'end']]),
    e('snap-center', [['scroll-snap-align', 'center']]),
    e('snap-normal', [['scroll-snap-stop', 'normal']]),
    e('snap-always', [['scroll-snap-stop', 'always']]);
  for (let [i, u] of [
    ['scroll-m', 'scroll-margin'],
    ['scroll-mx', 'scroll-margin-inline'],
    ['scroll-my', 'scroll-margin-block'],
    ['scroll-ms', 'scroll-margin-inline-start'],
    ['scroll-me', 'scroll-margin-inline-end'],
    ['scroll-mt', 'scroll-margin-top'],
    ['scroll-mr', 'scroll-margin-right'],
    ['scroll-mb', 'scroll-margin-bottom'],
    ['scroll-ml', 'scroll-margin-left'],
  ])
    {l(i, ['--scroll-margin', '--spacing'], (g) => [a(u, g)], { supportsNegative: !0 });}
  for (let [i, u] of [
    ['scroll-p', 'scroll-padding'],
    ['scroll-px', 'scroll-padding-inline'],
    ['scroll-py', 'scroll-padding-block'],
    ['scroll-ps', 'scroll-padding-inline-start'],
    ['scroll-pe', 'scroll-padding-inline-end'],
    ['scroll-pt', 'scroll-padding-top'],
    ['scroll-pr', 'scroll-padding-right'],
    ['scroll-pb', 'scroll-padding-bottom'],
    ['scroll-pl', 'scroll-padding-left'],
  ])
    {l(i, ['--scroll-padding', '--spacing'], (g) => [a(u, g)]);}
  e('list-inside', [['list-style-position', 'inside']]),
    e('list-outside', [['list-style-position', 'outside']]),
    e('list-none', [['list-style-type', 'none']]),
    e('list-disc', [['list-style-type', 'disc']]),
    e('list-decimal', [['list-style-type', 'decimal']]),
    n('list', { themeKeys: ['--list-style-type'], handle: (i) => [a('list-style-type', i)] }),
    e('list-image-none', [['list-style-image', 'none']]),
    n('list-image', { themeKeys: ['--list-style-image'], handle: (i) => [a('list-style-image', i)] }),
    e('appearance-none', [['appearance', 'none']]),
    e('appearance-auto', [['appearance', 'auto']]),
    e('scheme-normal', [['color-scheme', 'normal']]),
    e('scheme-dark', [['color-scheme', 'dark']]),
    e('scheme-light', [['color-scheme', 'light']]),
    e('scheme-light-dark', [['color-scheme', 'light dark']]),
    e('scheme-only-dark', [['color-scheme', 'only dark']]),
    e('scheme-only-light', [['color-scheme', 'only light']]),
    e('columns-auto', [['columns', 'auto']]),
    n('columns', {
      themeKeys: ['--columns', '--container'],
      handleBareValue: ({ value: i }) => (N(i) ? i : null),
      handle: (i) => [a('columns', i)],
    }),
    o('columns', () => [
      { values: Array.from({ length: 12 }, (i, u) => `${u + 1}`), valueThemeKeys: ['--columns', '--container'] },
    ]);
  for (let i of ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'])
    {e(`break-before-${i}`, [['break-before', i]]);}
  for (let i of ['auto', 'avoid', 'avoid-page', 'avoid-column']) {e(`break-inside-${i}`, [['break-inside', i]]);}
  for (let i of ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'])
    {e(`break-after-${i}`, [['break-after', i]]);}
  e('grid-flow-row', [['grid-auto-flow', 'row']]),
    e('grid-flow-col', [['grid-auto-flow', 'column']]),
    e('grid-flow-dense', [['grid-auto-flow', 'dense']]),
    e('grid-flow-row-dense', [['grid-auto-flow', 'row dense']]),
    e('grid-flow-col-dense', [['grid-auto-flow', 'column dense']]),
    e('auto-cols-auto', [['grid-auto-columns', 'auto']]),
    e('auto-cols-min', [['grid-auto-columns', 'min-content']]),
    e('auto-cols-max', [['grid-auto-columns', 'max-content']]),
    e('auto-cols-fr', [['grid-auto-columns', 'minmax(0, 1fr)']]),
    n('auto-cols', { themeKeys: ['--grid-auto-columns'], handle: (i) => [a('grid-auto-columns', i)] }),
    e('auto-rows-auto', [['grid-auto-rows', 'auto']]),
    e('auto-rows-min', [['grid-auto-rows', 'min-content']]),
    e('auto-rows-max', [['grid-auto-rows', 'max-content']]),
    e('auto-rows-fr', [['grid-auto-rows', 'minmax(0, 1fr)']]),
    n('auto-rows', { themeKeys: ['--grid-auto-rows'], handle: (i) => [a('grid-auto-rows', i)] }),
    e('grid-cols-none', [['grid-template-columns', 'none']]),
    e('grid-cols-subgrid', [['grid-template-columns', 'subgrid']]),
    n('grid-cols', {
      themeKeys: ['--grid-template-columns'],
      handleBareValue: ({ value: i }) => (N(i) ? `repeat(${i}, minmax(0, 1fr))` : null),
      handle: (i) => [a('grid-template-columns', i)],
    }),
    e('grid-rows-none', [['grid-template-rows', 'none']]),
    e('grid-rows-subgrid', [['grid-template-rows', 'subgrid']]),
    n('grid-rows', {
      themeKeys: ['--grid-template-rows'],
      handleBareValue: ({ value: i }) => (N(i) ? `repeat(${i}, minmax(0, 1fr))` : null),
      handle: (i) => [a('grid-template-rows', i)],
    }),
    o('grid-cols', () => [
      { values: Array.from({ length: 12 }, (i, u) => `${u + 1}`), valueThemeKeys: ['--grid-template-columns'] },
    ]),
    o('grid-rows', () => [
      { values: Array.from({ length: 12 }, (i, u) => `${u + 1}`), valueThemeKeys: ['--grid-template-rows'] },
    ]),
    e('flex-row', [['flex-direction', 'row']]),
    e('flex-row-reverse', [['flex-direction', 'row-reverse']]),
    e('flex-col', [['flex-direction', 'column']]),
    e('flex-col-reverse', [['flex-direction', 'column-reverse']]),
    e('flex-wrap', [['flex-wrap', 'wrap']]),
    e('flex-nowrap', [['flex-wrap', 'nowrap']]),
    e('flex-wrap-reverse', [['flex-wrap', 'wrap-reverse']]),
    e('place-content-center', [['place-content', 'center']]),
    e('place-content-start', [['place-content', 'start']]),
    e('place-content-end', [['place-content', 'end']]),
    e('place-content-between', [['place-content', 'space-between']]),
    e('place-content-around', [['place-content', 'space-around']]),
    e('place-content-evenly', [['place-content', 'space-evenly']]),
    e('place-content-baseline', [['place-content', 'baseline']]),
    e('place-content-stretch', [['place-content', 'stretch']]),
    e('place-items-center', [['place-items', 'center']]),
    e('place-items-start', [['place-items', 'start']]),
    e('place-items-end', [['place-items', 'end']]),
    e('place-items-baseline', [['place-items', 'baseline']]),
    e('place-items-stretch', [['place-items', 'stretch']]),
    e('content-normal', [['align-content', 'normal']]),
    e('content-center', [['align-content', 'center']]),
    e('content-start', [['align-content', 'flex-start']]),
    e('content-end', [['align-content', 'flex-end']]),
    e('content-between', [['align-content', 'space-between']]),
    e('content-around', [['align-content', 'space-around']]),
    e('content-evenly', [['align-content', 'space-evenly']]),
    e('content-baseline', [['align-content', 'baseline']]),
    e('content-stretch', [['align-content', 'stretch']]),
    e('items-center', [['align-items', 'center']]),
    e('items-start', [['align-items', 'flex-start']]),
    e('items-end', [['align-items', 'flex-end']]),
    e('items-baseline', [['align-items', 'baseline']]),
    e('items-stretch', [['align-items', 'stretch']]),
    e('justify-normal', [['justify-content', 'normal']]),
    e('justify-center', [['justify-content', 'center']]),
    e('justify-start', [['justify-content', 'flex-start']]),
    e('justify-end', [['justify-content', 'flex-end']]),
    e('justify-between', [['justify-content', 'space-between']]),
    e('justify-around', [['justify-content', 'space-around']]),
    e('justify-evenly', [['justify-content', 'space-evenly']]),
    e('justify-baseline', [['justify-content', 'baseline']]),
    e('justify-stretch', [['justify-content', 'stretch']]),
    e('justify-items-normal', [['justify-items', 'normal']]),
    e('justify-items-center', [['justify-items', 'center']]),
    e('justify-items-start', [['justify-items', 'start']]),
    e('justify-items-end', [['justify-items', 'end']]),
    e('justify-items-stretch', [['justify-items', 'stretch']]),
    l('gap', ['--gap', '--spacing'], (i) => [a('gap', i)]),
    l('gap-x', ['--gap', '--spacing'], (i) => [a('column-gap', i)]),
    l('gap-y', ['--gap', '--spacing'], (i) => [a('row-gap', i)]),
    l(
      'space-x',
      ['--space', '--spacing'],
      (i) => [
        D([$('--tw-space-x-reverse', '0')]),
        U(':where(& > :not(:last-child))', [
          a('--tw-sort', 'row-gap'),
          a('--tw-space-x-reverse', '0'),
          a('margin-inline-start', `calc(${i} * var(--tw-space-x-reverse))`),
          a('margin-inline-end', `calc(${i} * calc(1 - var(--tw-space-x-reverse)))`),
        ]),
      ],
      { supportsNegative: !0 }
    ),
    l(
      'space-y',
      ['--space', '--spacing'],
      (i) => [
        D([$('--tw-space-y-reverse', '0')]),
        U(':where(& > :not(:last-child))', [
          a('--tw-sort', 'column-gap'),
          a('--tw-space-y-reverse', '0'),
          a('margin-block-start', `calc(${i} * var(--tw-space-y-reverse))`),
          a('margin-block-end', `calc(${i} * calc(1 - var(--tw-space-y-reverse)))`),
        ]),
      ],
      { supportsNegative: !0 }
    ),
    e('space-x-reverse', [
      () => D([$('--tw-space-x-reverse', '0')]),
      () => U(':where(& > :not(:last-child))', [a('--tw-sort', 'row-gap'), a('--tw-space-x-reverse', '1')]),
    ]),
    e('space-y-reverse', [
      () => D([$('--tw-space-y-reverse', '0')]),
      () => U(':where(& > :not(:last-child))', [a('--tw-sort', 'column-gap'), a('--tw-space-y-reverse', '1')]),
    ]),
    e('accent-auto', [['accent-color', 'auto']]),
    s('accent', { themeKeys: ['--accent-color', '--color'], handle: (i) => [a('accent-color', i)] }),
    s('caret', { themeKeys: ['--caret-color', '--color'], handle: (i) => [a('caret-color', i)] }),
    s('divide', {
      themeKeys: ['--divide-color', '--color'],
      handle: (i) => [U(':where(& > :not(:last-child))', [a('--tw-sort', 'divide-color'), a('border-color', i)])],
    }),
    e('place-self-auto', [['place-self', 'auto']]),
    e('place-self-start', [['place-self', 'start']]),
    e('place-self-end', [['place-self', 'end']]),
    e('place-self-center', [['place-self', 'center']]),
    e('place-self-stretch', [['place-self', 'stretch']]),
    e('self-auto', [['align-self', 'auto']]),
    e('self-start', [['align-self', 'flex-start']]),
    e('self-end', [['align-self', 'flex-end']]),
    e('self-center', [['align-self', 'center']]),
    e('self-stretch', [['align-self', 'stretch']]),
    e('self-baseline', [['align-self', 'baseline']]),
    e('justify-self-auto', [['justify-self', 'auto']]),
    e('justify-self-start', [['justify-self', 'flex-start']]),
    e('justify-self-end', [['justify-self', 'flex-end']]),
    e('justify-self-center', [['justify-self', 'center']]),
    e('justify-self-stretch', [['justify-self', 'stretch']]);
  for (let i of ['auto', 'hidden', 'clip', 'visible', 'scroll'])
    {e(`overflow-${i}`, [['overflow', i]]),
      e(`overflow-x-${i}`, [['overflow-x', i]]),
      e(`overflow-y-${i}`, [['overflow-y', i]]);}
  for (let i of ['auto', 'contain', 'none'])
    {e(`overscroll-${i}`, [['overscroll-behavior', i]]),
      e(`overscroll-x-${i}`, [['overscroll-behavior-x', i]]),
      e(`overscroll-y-${i}`, [['overscroll-behavior-y', i]]);}
  e('scroll-auto', [['scroll-behavior', 'auto']]),
    e('scroll-smooth', [['scroll-behavior', 'smooth']]),
    e('truncate', [
      ['overflow', 'hidden'],
      ['text-overflow', 'ellipsis'],
      ['white-space', 'nowrap'],
    ]),
    e('text-ellipsis', [['text-overflow', 'ellipsis']]),
    e('text-clip', [['text-overflow', 'clip']]),
    e('hyphens-none', [
      ['-webkit-hyphens', 'none'],
      ['hyphens', 'none'],
    ]),
    e('hyphens-manual', [
      ['-webkit-hyphens', 'manual'],
      ['hyphens', 'manual'],
    ]),
    e('hyphens-auto', [
      ['-webkit-hyphens', 'auto'],
      ['hyphens', 'auto'],
    ]),
    e('whitespace-normal', [['white-space', 'normal']]),
    e('whitespace-nowrap', [['white-space', 'nowrap']]),
    e('whitespace-pre', [['white-space', 'pre']]),
    e('whitespace-pre-line', [['white-space', 'pre-line']]),
    e('whitespace-pre-wrap', [['white-space', 'pre-wrap']]),
    e('whitespace-break-spaces', [['white-space', 'break-spaces']]),
    e('text-wrap', [['text-wrap', 'wrap']]),
    e('text-nowrap', [['text-wrap', 'nowrap']]),
    e('text-balance', [['text-wrap', 'balance']]),
    e('text-pretty', [['text-wrap', 'pretty']]),
    e('break-normal', [
      ['overflow-wrap', 'normal'],
      ['word-break', 'normal'],
    ]),
    e('break-words', [['overflow-wrap', 'break-word']]),
    e('break-all', [['word-break', 'break-all']]),
    e('break-keep', [['word-break', 'keep-all']]);
  for (let [i, u] of [
    ['rounded', ['border-radius']],
    ['rounded-s', ['border-start-start-radius', 'border-end-start-radius']],
    ['rounded-e', ['border-start-end-radius', 'border-end-end-radius']],
    ['rounded-t', ['border-top-left-radius', 'border-top-right-radius']],
    ['rounded-r', ['border-top-right-radius', 'border-bottom-right-radius']],
    ['rounded-b', ['border-bottom-right-radius', 'border-bottom-left-radius']],
    ['rounded-l', ['border-top-left-radius', 'border-bottom-left-radius']],
    ['rounded-ss', ['border-start-start-radius']],
    ['rounded-se', ['border-start-end-radius']],
    ['rounded-ee', ['border-end-end-radius']],
    ['rounded-es', ['border-end-start-radius']],
    ['rounded-tl', ['border-top-left-radius']],
    ['rounded-tr', ['border-top-right-radius']],
    ['rounded-br', ['border-bottom-right-radius']],
    ['rounded-bl', ['border-bottom-left-radius']],
  ])
    {e(
      `${i}-none`,
      u.map((g) => [g, '0'])
    ),
      e(
        `${i}-full`,
        u.map((g) => [g, 'calc(infinity * 1px)'])
      ),
      n(i, { themeKeys: ['--radius'], handle: (g) => u.map((w) => a(w, g)) });}
  e('border-solid', [
    ['--tw-border-style', 'solid'],
    ['border-style', 'solid'],
  ]),
    e('border-dashed', [
      ['--tw-border-style', 'dashed'],
      ['border-style', 'dashed'],
    ]),
    e('border-dotted', [
      ['--tw-border-style', 'dotted'],
      ['border-style', 'dotted'],
    ]),
    e('border-double', [
      ['--tw-border-style', 'double'],
      ['border-style', 'double'],
    ]),
    e('border-hidden', [
      ['--tw-border-style', 'hidden'],
      ['border-style', 'hidden'],
    ]),
    e('border-none', [
      ['--tw-border-style', 'none'],
      ['border-style', 'none'],
    ]);
  {
    let u = function (g, w) {
      r.functional(g, (k) => {
        if (!k.value) {
          if (k.modifier) {return;}
          let T = t.get(['--default-border-width']) ?? '1px',
            O = w.width(T);
          return O ? [i(), ...O] : void 0;
        }
        if (k.value.kind === 'arbitrary') {
          let T = k.value.value;
          switch (k.value.dataType ?? F(T, ['color', 'line-width', 'length'])) {
            case 'line-width':
            case 'length': {
              if (k.modifier) {return;}
              let C = w.width(T);
              return C ? [i(), ...C] : void 0;
            }
            default:
              return (T = W(T, k.modifier, t)), T === null ? void 0 : w.color(T);
          }
        }
        {
          let T = G(k, t, ['--border-color', '--color']);
          if (T) {return w.color(T);}
        }
        {
          if (k.modifier) {return;}
          let T = t.resolve(k.value.value, ['--border-width']);
          if (T) {
            let O = w.width(T);
            return O ? [i(), ...O] : void 0;
          }
          if (N(k.value.value)) {
            let O = w.width(`${k.value.value}px`);
            return O ? [i(), ...O] : void 0;
          }
        }
      }),
        o(g, () => [
          {
            values: ['current', 'inherit', 'transparent'],
            valueThemeKeys: ['--border-color', '--color'],
            modifiers: Array.from({ length: 21 }, (k, T) => `${T * 5}`),
            hasDefaultValue: !0,
          },
          { values: ['0', '2', '4', '8'], valueThemeKeys: ['--border-width'] },
        ]);
    };
    let x = u;
    let i = () => D([$('--tw-border-style', 'solid')]);
    u('border', {
      width: (g) => [a('border-style', 'var(--tw-border-style)'), a('border-width', g)],
      color: (g) => [a('border-color', g)],
    }),
      u('border-x', {
        width: (g) => [a('border-inline-style', 'var(--tw-border-style)'), a('border-inline-width', g)],
        color: (g) => [a('border-inline-color', g)],
      }),
      u('border-y', {
        width: (g) => [a('border-block-style', 'var(--tw-border-style)'), a('border-block-width', g)],
        color: (g) => [a('border-block-color', g)],
      }),
      u('border-s', {
        width: (g) => [a('border-inline-start-style', 'var(--tw-border-style)'), a('border-inline-start-width', g)],
        color: (g) => [a('border-inline-start-color', g)],
      }),
      u('border-e', {
        width: (g) => [a('border-inline-end-style', 'var(--tw-border-style)'), a('border-inline-end-width', g)],
        color: (g) => [a('border-inline-end-color', g)],
      }),
      u('border-t', {
        width: (g) => [a('border-top-style', 'var(--tw-border-style)'), a('border-top-width', g)],
        color: (g) => [a('border-top-color', g)],
      }),
      u('border-r', {
        width: (g) => [a('border-right-style', 'var(--tw-border-style)'), a('border-right-width', g)],
        color: (g) => [a('border-right-color', g)],
      }),
      u('border-b', {
        width: (g) => [a('border-bottom-style', 'var(--tw-border-style)'), a('border-bottom-width', g)],
        color: (g) => [a('border-bottom-color', g)],
      }),
      u('border-l', {
        width: (g) => [a('border-left-style', 'var(--tw-border-style)'), a('border-left-width', g)],
        color: (g) => [a('border-left-color', g)],
      }),
      n('divide-x', {
        defaultValue: t.get(['--default-border-width']) ?? '1px',
        themeKeys: ['--divide-width', '--border-width'],
        handleBareValue: ({ value: g }) => (N(g) ? `${g}px` : null),
        handle: (g) => [
          D([$('--tw-divide-x-reverse', '0')]),
          U(':where(& > :not(:last-child))', [
            a('--tw-sort', 'divide-x-width'),
            i(),
            a('--tw-divide-x-reverse', '0'),
            a('border-inline-style', 'var(--tw-border-style)'),
            a('border-inline-start-width', `calc(${g} * var(--tw-divide-x-reverse))`),
            a('border-inline-end-width', `calc(${g} * calc(1 - var(--tw-divide-x-reverse)))`),
          ]),
        ],
      }),
      n('divide-y', {
        defaultValue: t.get(['--default-border-width']) ?? '1px',
        themeKeys: ['--divide-width', '--border-width'],
        handleBareValue: ({ value: g }) => (N(g) ? `${g}px` : null),
        handle: (g) => [
          D([$('--tw-divide-y-reverse', '0')]),
          U(':where(& > :not(:last-child))', [
            a('--tw-sort', 'divide-y-width'),
            i(),
            a('--tw-divide-y-reverse', '0'),
            a('border-bottom-style', 'var(--tw-border-style)'),
            a('border-top-style', 'var(--tw-border-style)'),
            a('border-top-width', `calc(${g} * var(--tw-divide-y-reverse))`),
            a('border-bottom-width', `calc(${g} * calc(1 - var(--tw-divide-y-reverse)))`),
          ]),
        ],
      }),
      o('divide-x', () => [
        { values: ['0', '2', '4', '8'], valueThemeKeys: ['--divide-width', '--border-width'], hasDefaultValue: !0 },
      ]),
      o('divide-y', () => [
        { values: ['0', '2', '4', '8'], valueThemeKeys: ['--divide-width', '--border-width'], hasDefaultValue: !0 },
      ]),
      e('divide-x-reverse', [
        () => D([$('--tw-divide-x-reverse', '0')]),
        () => U(':where(& > :not(:last-child))', [a('--tw-divide-x-reverse', '1')]),
      ]),
      e('divide-y-reverse', [
        () => D([$('--tw-divide-y-reverse', '0')]),
        () => U(':where(& > :not(:last-child))', [a('--tw-divide-y-reverse', '1')]),
      ]);
    for (let g of ['solid', 'dashed', 'dotted', 'double', 'none'])
      {e(`divide-${g}`, [
        () =>
          U(':where(& > :not(:last-child))', [
            a('--tw-sort', 'divide-style'),
            a('--tw-border-style', g),
            a('border-style', g),
          ]),
      ]);}
  }
  e('bg-auto', [['background-size', 'auto']]),
    e('bg-cover', [['background-size', 'cover']]),
    e('bg-contain', [['background-size', 'contain']]),
    e('bg-fixed', [['background-attachment', 'fixed']]),
    e('bg-local', [['background-attachment', 'local']]),
    e('bg-scroll', [['background-attachment', 'scroll']]),
    e('bg-center', [['background-position', 'center']]),
    e('bg-top', [['background-position', 'top']]),
    e('bg-right-top', [['background-position', 'right top']]),
    e('bg-right', [['background-position', 'right']]),
    e('bg-right-bottom', [['background-position', 'right bottom']]),
    e('bg-bottom', [['background-position', 'bottom']]),
    e('bg-left-bottom', [['background-position', 'left bottom']]),
    e('bg-left', [['background-position', 'left']]),
    e('bg-left-top', [['background-position', 'left top']]),
    e('bg-repeat', [['background-repeat', 'repeat']]),
    e('bg-no-repeat', [['background-repeat', 'no-repeat']]),
    e('bg-repeat-x', [['background-repeat', 'repeat-x']]),
    e('bg-repeat-y', [['background-repeat', 'repeat-y']]),
    e('bg-repeat-round', [['background-repeat', 'round']]),
    e('bg-repeat-space', [['background-repeat', 'space']]),
    e('bg-none', [['background-image', 'none']]);
  {
    let g = function (T) {
        let O = 'in oklab';
        if (T?.kind === 'named')
          {switch (T.value) {
            case 'longer':
            case 'shorter':
            case 'increasing':
            case 'decreasing':
              O = `in oklch ${T.value} hue`;
              break;
            default:
              O = `in ${T.value}`;
          }}
        else {T?.kind === 'arbitrary' && (O = T.value);}
        return O;
      },
      w = function ({ negative: T }) {
        return (O) => {
          if (!O.value) {return;}
          if (O.value.kind === 'arbitrary') {
            if (O.modifier) {return;}
            let j = O.value.value;
            switch (O.value.dataType ?? F(j, ['angle'])) {
              case 'angle':
                return (
                  (j = T ? `calc(${j} * -1)` : `${j}`),
                  [
                    a('--tw-gradient-position', `${j},`),
                    a('background-image', `linear-gradient(var(--tw-gradient-stops,${j}))`),
                  ]
                );
              default:
                return T
                  ? void 0
                  : [
                      a('--tw-gradient-position', `${j},`),
                      a('background-image', `linear-gradient(var(--tw-gradient-stops,${j}))`),
                    ];
            }
          }
          let C = O.value.value;
          if (!T && u.has(C)) {C = u.get(C);}
          else if (N(C)) {C = T ? `calc(${C}deg * -1)` : `${C}deg`;}
          else {return;}
          let A = g(O.modifier);
          return [
            a('--tw-gradient-position', `${C} ${A},`),
            a('background-image', 'linear-gradient(var(--tw-gradient-stops))'),
          ];
        };
      },
      k = function ({ negative: T }) {
        return (O) => {
          if (O.value?.kind === 'arbitrary') {
            if (O.modifier) {return;}
            let j = O.value.value;
            return [
              a('--tw-gradient-position', `${j},`),
              a('background-image', `conic-gradient(var(--tw-gradient-stops,${j}))`),
            ];
          }
          let C = g(O.modifier);
          if (!O.value)
            {return [
              a('--tw-gradient-position', `${C},`),
              a('background-image', 'conic-gradient(var(--tw-gradient-stops))'),
            ];}
          let A = O.value.value;
          if (N(A))
            {return (
              (A = T ? `calc(${A} * -1)` : `${A}deg`),
              [
                a('--tw-gradient-position', `from ${A} ${C},`),
                a('background-image', 'conic-gradient(var(--tw-gradient-stops))'),
              ]
            );}
        };
      };
    let S = g,
      V = w,
      R = k;
    let i = ['oklab', 'oklch', 'srgb', 'hsl', 'longer', 'shorter', 'increasing', 'decreasing'],
      u = new Map([
        ['to-t', 'to top'],
        ['to-tr', 'to top right'],
        ['to-r', 'to right'],
        ['to-br', 'to bottom right'],
        ['to-b', 'to bottom'],
        ['to-bl', 'to bottom left'],
        ['to-l', 'to left'],
        ['to-tl', 'to top left'],
      ]);
    r.functional('-bg-linear', w({ negative: !0 })),
      r.functional('bg-linear', w({ negative: !1 })),
      o('bg-linear', () => [
        { values: [...u.keys()], modifiers: i },
        {
          values: ['0', '30', '60', '90', '120', '150', '180', '210', '240', '270', '300', '330'],
          supportsNegative: !0,
          modifiers: i,
        },
      ]),
      r.functional('-bg-conic', k({ negative: !0 })),
      r.functional('bg-conic', k({ negative: !1 })),
      o('bg-conic', () => [
        { hasDefaultValue: !0, modifiers: i },
        {
          values: ['0', '30', '60', '90', '120', '150', '180', '210', '240', '270', '300', '330'],
          supportsNegative: !0,
          modifiers: i,
        },
      ]),
      r.functional('bg-radial', (T) => {
        if (!T.value) {
          let O = g(T.modifier);
          return [
            a('--tw-gradient-position', `${O},`),
            a('background-image', 'radial-gradient(var(--tw-gradient-stops))'),
          ];
        }
        if (T.value.kind === 'arbitrary') {
          if (T.modifier) {return;}
          let O = T.value.value;
          return [
            a('--tw-gradient-position', `${O},`),
            a('background-image', `radial-gradient(var(--tw-gradient-stops,${O}))`),
          ];
        }
      }),
      o('bg-radial', () => [{ hasDefaultValue: !0, modifiers: i }]);
  }
  r.functional('bg', (i) => {
    if (i.value) {
      if (i.value.kind === 'arbitrary') {
        let u = i.value.value;
        switch (i.value.dataType ?? F(u, ['image', 'color', 'percentage', 'position', 'bg-size', 'length', 'url'])) {
          case 'percentage':
          case 'position':
            return i.modifier ? void 0 : [a('background-position', u)];
          case 'bg-size':
          case 'length':
          case 'size':
            return i.modifier ? void 0 : [a('background-size', u)];
          case 'image':
          case 'url':
            return i.modifier ? void 0 : [a('background-image', u)];
          default:
            return (u = W(u, i.modifier, t)), u === null ? void 0 : [a('background-color', u)];
        }
      }
      {
        let u = G(i, t, ['--background-color', '--color']);
        if (u) {return [a('background-color', u)];}
      }
      {
        if (i.modifier) {return;}
        let u = t.resolve(i.value.value, ['--background-image']);
        if (u) {return [a('background-image', u)];}
      }
    }
  }),
    o('bg', () => [
      {
        values: ['current', 'inherit', 'transparent'],
        valueThemeKeys: ['--background-color', '--color'],
        modifiers: Array.from({ length: 21 }, (i, u) => `${u * 5}`),
      },
      { values: [], valueThemeKeys: ['--background-image'] },
    ]);
  let v = () =>
    D([
      $('--tw-gradient-position'),
      $('--tw-gradient-from', '#0000', '<color>'),
      $('--tw-gradient-via', '#0000', '<color>'),
      $('--tw-gradient-to', '#0000', '<color>'),
      $('--tw-gradient-stops'),
      $('--tw-gradient-via-stops'),
      $('--tw-gradient-from-position', '0%', '<length-percentage>'),
      $('--tw-gradient-via-position', '50%', '<length-percentage>'),
      $('--tw-gradient-to-position', '100%', '<length-percentage>'),
    ]);
  function b(i, u) {
    r.functional(i, (g) => {
      if (g.value) {
        if (g.value.kind === 'arbitrary') {
          let w = g.value.value;
          switch (g.value.dataType ?? F(w, ['color', 'length', 'percentage'])) {
            case 'length':
            case 'percentage':
              return g.modifier ? void 0 : u.position(w);
            default:
              return (w = W(w, g.modifier, t)), w === null ? void 0 : u.color(w);
          }
        }
        {
          let w = G(g, t, ['--background-color', '--color']);
          if (w) {return u.color(w);}
        }
        {
          if (g.modifier) {return;}
          let w = t.resolve(g.value.value, ['--gradient-color-stop-positions']);
          if (w) {return u.position(w);}
          if (g.value.value[g.value.value.length - 1] === '%' && N(g.value.value.slice(0, -1)))
            {return u.position(g.value.value);}
        }
      }
    }),
      o(i, () => [
        {
          values: ['current', 'inherit', 'transparent'],
          valueThemeKeys: ['--background-color', '--color'],
          modifiers: Array.from({ length: 21 }, (g, w) => `${w * 5}`),
        },
        {
          values: Array.from({ length: 21 }, (g, w) => `${w * 5}%`),
          valueThemeKeys: ['--gradient-color-stop-positions'],
        },
      ]);
  }
  b('from', {
    color: (i) => [
      v(),
      a('--tw-sort', '--tw-gradient-from'),
      a('--tw-gradient-from', i),
      a(
        '--tw-gradient-stops',
        'var(--tw-gradient-via-stops, var(--tw-gradient-position,) var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))'
      ),
    ],
    position: (i) => [v(), a('--tw-gradient-from-position', i)],
  }),
    e('via-none', [['--tw-gradient-via-stops', 'initial']]),
    b('via', {
      color: (i) => [
        v(),
        a('--tw-sort', '--tw-gradient-via'),
        a('--tw-gradient-via', i),
        a(
          '--tw-gradient-via-stops',
          'var(--tw-gradient-position,) var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position)'
        ),
        a('--tw-gradient-stops', 'var(--tw-gradient-via-stops)'),
      ],
      position: (i) => [v(), a('--tw-gradient-via-position', i)],
    }),
    b('to', {
      color: (i) => [
        v(),
        a('--tw-sort', '--tw-gradient-to'),
        a('--tw-gradient-to', i),
        a(
          '--tw-gradient-stops',
          'var(--tw-gradient-via-stops, var(--tw-gradient-position,) var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))'
        ),
      ],
      position: (i) => [v(), a('--tw-gradient-to-position', i)],
    }),
    e('box-decoration-slice', [
      ['-webkit-box-decoration-break', 'slice'],
      ['box-decoration-break', 'slice'],
    ]),
    e('box-decoration-clone', [
      ['-webkit-box-decoration-break', 'clone'],
      ['box-decoration-break', 'clone'],
    ]),
    e('bg-clip-text', [['background-clip', 'text']]),
    e('bg-clip-border', [['background-clip', 'border-box']]),
    e('bg-clip-padding', [['background-clip', 'padding-box']]),
    e('bg-clip-content', [['background-clip', 'content-box']]),
    e('bg-origin-border', [['background-origin', 'border-box']]),
    e('bg-origin-padding', [['background-origin', 'padding-box']]),
    e('bg-origin-content', [['background-origin', 'content-box']]);
  for (let i of [
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
  ])
    {e(`bg-blend-${i}`, [['background-blend-mode', i]]), e(`mix-blend-${i}`, [['mix-blend-mode', i]]);}
  e('mix-blend-plus-darker', [['mix-blend-mode', 'plus-darker']]),
    e('mix-blend-plus-lighter', [['mix-blend-mode', 'plus-lighter']]),
    e('fill-none', [['fill', 'none']]),
    r.functional('fill', (i) => {
      if (!i.value) {return;}
      if (i.value.kind === 'arbitrary') {
        let g = W(i.value.value, i.modifier, t);
        return g === null ? void 0 : [a('fill', g)];
      }
      let u = G(i, t, ['--fill', '--color']);
      if (u) {return [a('fill', u)];}
    }),
    o('fill', () => [
      {
        values: ['current', 'inherit', 'transparent'],
        valueThemeKeys: ['--fill', '--color'],
        modifiers: Array.from({ length: 21 }, (i, u) => `${u * 5}`),
      },
    ]),
    e('stroke-none', [['stroke', 'none']]),
    r.functional('stroke', (i) => {
      if (i.value) {
        if (i.value.kind === 'arbitrary') {
          let u = i.value.value;
          switch (i.value.dataType ?? F(u, ['color', 'number', 'length', 'percentage'])) {
            case 'number':
            case 'length':
            case 'percentage':
              return i.modifier ? void 0 : [a('stroke-width', u)];
            default:
              return (u = W(i.value.value, i.modifier, t)), u === null ? void 0 : [a('stroke', u)];
          }
        }
        {
          let u = G(i, t, ['--stroke', '--color']);
          if (u) {return [a('stroke', u)];}
        }
        {
          let u = t.resolve(i.value.value, ['--stroke-width']);
          if (u) {return [a('stroke-width', u)];}
          if (N(i.value.value)) {return [a('stroke-width', i.value.value)];}
        }
      }
    }),
    o('stroke', () => [
      {
        values: ['current', 'inherit', 'transparent'],
        valueThemeKeys: ['--stroke', '--color'],
        modifiers: Array.from({ length: 21 }, (i, u) => `${u * 5}`),
      },
      { values: ['0', '1', '2', '3'], valueThemeKeys: ['--stroke-width'] },
    ]),
    e('object-contain', [['object-fit', 'contain']]),
    e('object-cover', [['object-fit', 'cover']]),
    e('object-fill', [['object-fit', 'fill']]),
    e('object-none', [['object-fit', 'none']]),
    e('object-scale-down', [['object-fit', 'scale-down']]),
    e('object-bottom', [['object-position', 'bottom']]),
    e('object-center', [['object-position', 'center']]),
    e('object-left', [['object-position', 'left']]),
    e('object-left-bottom', [['object-position', 'left bottom']]),
    e('object-left-top', [['object-position', 'left top']]),
    e('object-right', [['object-position', 'right']]),
    e('object-right-bottom', [['object-position', 'right bottom']]),
    e('object-right-top', [['object-position', 'right top']]),
    e('object-top', [['object-position', 'top']]),
    n('object', { themeKeys: ['--object-position'], handle: (i) => [a('object-position', i)] });
  for (let [i, u] of [
    ['p', 'padding'],
    ['px', 'padding-inline'],
    ['py', 'padding-block'],
    ['ps', 'padding-inline-start'],
    ['pe', 'padding-inline-end'],
    ['pt', 'padding-top'],
    ['pr', 'padding-right'],
    ['pb', 'padding-bottom'],
    ['pl', 'padding-left'],
  ])
    {l(i, ['--padding', '--spacing'], (g) => [a(u, g)]);}
  e('text-left', [['text-align', 'left']]),
    e('text-center', [['text-align', 'center']]),
    e('text-right', [['text-align', 'right']]),
    e('text-justify', [['text-align', 'justify']]),
    e('text-start', [['text-align', 'start']]),
    e('text-end', [['text-align', 'end']]),
    l('indent', ['--text-indent', '--spacing'], (i) => [a('text-indent', i)], { supportsNegative: !0 }),
    e('align-baseline', [['vertical-align', 'baseline']]),
    e('align-top', [['vertical-align', 'top']]),
    e('align-middle', [['vertical-align', 'middle']]),
    e('align-bottom', [['vertical-align', 'bottom']]),
    e('align-text-top', [['vertical-align', 'text-top']]),
    e('align-text-bottom', [['vertical-align', 'text-bottom']]),
    e('align-sub', [['vertical-align', 'sub']]),
    e('align-super', [['vertical-align', 'super']]),
    n('align', { themeKeys: [], handle: (i) => [a('vertical-align', i)] }),
    r.functional('font', (i) => {
      if (!(!i.value || i.modifier)) {
        if (i.value.kind === 'arbitrary') {
          let u = i.value.value;
          switch (i.value.dataType ?? F(u, ['number', 'generic-name', 'family-name'])) {
            case 'generic-name':
            case 'family-name':
              return [a('font-family', u)];
            default:
              return [D([$('--tw-font-weight')]), a('--tw-font-weight', u), a('font-weight', u)];
          }
        }
        {
          let u = t.resolveWith(i.value.value, ['--font'], ['--font-feature-settings', '--font-variation-settings']);
          if (u) {
            let [g, w = {}] = u;
            return [
              a('font-family', g),
              a('font-feature-settings', w['--font-feature-settings']),
              a('font-variation-settings', w['--font-variation-settings']),
            ];
          }
        }
        {
          let u = t.resolve(i.value.value, ['--font-weight']);
          if (u) {return [D([$('--tw-font-weight')]), a('--tw-font-weight', u), a('font-weight', u)];}
        }
      }
    }),
    o('font', () => [
      { values: [], valueThemeKeys: ['--font'] },
      {
        values: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
        valueThemeKeys: ['--font-weight'],
      },
    ]),
    e('uppercase', [['text-transform', 'uppercase']]),
    e('lowercase', [['text-transform', 'lowercase']]),
    e('capitalize', [['text-transform', 'capitalize']]),
    e('normal-case', [['text-transform', 'none']]),
    e('italic', [['font-style', 'italic']]),
    e('not-italic', [['font-style', 'normal']]),
    e('underline', [['text-decoration-line', 'underline']]),
    e('overline', [['text-decoration-line', 'overline']]),
    e('line-through', [['text-decoration-line', 'line-through']]),
    e('no-underline', [['text-decoration-line', 'none']]),
    e('font-stretch-normal', [['font-stretch', 'normal']]),
    e('font-stretch-ultra-condensed', [['font-stretch', 'ultra-condensed']]),
    e('font-stretch-extra-condensed', [['font-stretch', 'extra-condensed']]),
    e('font-stretch-condensed', [['font-stretch', 'condensed']]),
    e('font-stretch-semi-condensed', [['font-stretch', 'semi-condensed']]),
    e('font-stretch-semi-expanded', [['font-stretch', 'semi-expanded']]),
    e('font-stretch-expanded', [['font-stretch', 'expanded']]),
    e('font-stretch-extra-expanded', [['font-stretch', 'extra-expanded']]),
    e('font-stretch-ultra-expanded', [['font-stretch', 'ultra-expanded']]),
    n('font-stretch', {
      handleBareValue: ({ value: i }) => {
        if (!i.endsWith('%')) {return null;}
        let u = Number(i.slice(0, -1));
        return !N(u) || Number.isNaN(u) || u < 50 || u > 200 ? null : i;
      },
      handle: (i) => [a('font-stretch', i)],
    }),
    o('font-stretch', () => [{ values: ['50%', '75%', '90%', '95%', '100%', '105%', '110%', '125%', '150%', '200%'] }]),
    s('placeholder', {
      themeKeys: ['--background-color', '--color'],
      handle: (i) => [U('&::placeholder', [a('--tw-sort', 'placeholder-color'), a('color', i)])],
    }),
    e('decoration-solid', [['text-decoration-style', 'solid']]),
    e('decoration-double', [['text-decoration-style', 'double']]),
    e('decoration-dotted', [['text-decoration-style', 'dotted']]),
    e('decoration-dashed', [['text-decoration-style', 'dashed']]),
    e('decoration-wavy', [['text-decoration-style', 'wavy']]),
    e('decoration-auto', [['text-decoration-thickness', 'auto']]),
    e('decoration-from-font', [['text-decoration-thickness', 'from-font']]),
    r.functional('decoration', (i) => {
      if (i.value) {
        if (i.value.kind === 'arbitrary') {
          let u = i.value.value;
          switch (i.value.dataType ?? F(u, ['color', 'length', 'percentage'])) {
            case 'length':
            case 'percentage':
              return i.modifier ? void 0 : [a('text-decoration-thickness', u)];
            default:
              return (u = W(u, i.modifier, t)), u === null ? void 0 : [a('text-decoration-color', u)];
          }
        }
        {
          let u = t.resolve(i.value.value, ['--text-decoration-thickness']);
          if (u) {return i.modifier ? void 0 : [a('text-decoration-thickness', u)];}
          if (N(i.value.value)) {return i.modifier ? void 0 : [a('text-decoration-thickness', `${i.value.value}px`)];}
        }
        {
          let u = G(i, t, ['--text-decoration-color', '--color']);
          if (u) {return [a('text-decoration-color', u)];}
        }
      }
    }),
    o('decoration', () => [
      {
        values: ['current', 'inherit', 'transparent'],
        valueThemeKeys: ['--text-decoration-color', '--color'],
        modifiers: Array.from({ length: 21 }, (i, u) => `${u * 5}`),
      },
      { values: ['0', '1', '2'], valueThemeKeys: ['--text-decoration-thickness'] },
    ]),
    e('animate-none', [['animation', 'none']]),
    n('animate', { themeKeys: ['--animate'], handle: (i) => [a('animation', i)] });
  {
    let i = [
        'var(--tw-blur,)',
        'var(--tw-brightness,)',
        'var(--tw-contrast,)',
        'var(--tw-grayscale,)',
        'var(--tw-hue-rotate,)',
        'var(--tw-invert,)',
        'var(--tw-saturate,)',
        'var(--tw-sepia,)',
        'var(--tw-drop-shadow,)',
      ].join(' '),
      u = [
        'var(--tw-backdrop-blur,)',
        'var(--tw-backdrop-brightness,)',
        'var(--tw-backdrop-contrast,)',
        'var(--tw-backdrop-grayscale,)',
        'var(--tw-backdrop-hue-rotate,)',
        'var(--tw-backdrop-invert,)',
        'var(--tw-backdrop-opacity,)',
        'var(--tw-backdrop-saturate,)',
        'var(--tw-backdrop-sepia,)',
      ].join(' '),
      g = () =>
        D([
          $('--tw-blur'),
          $('--tw-brightness'),
          $('--tw-contrast'),
          $('--tw-grayscale'),
          $('--tw-hue-rotate'),
          $('--tw-invert'),
          $('--tw-opacity'),
          $('--tw-saturate'),
          $('--tw-sepia'),
        ]),
      w = () =>
        D([
          $('--tw-backdrop-blur'),
          $('--tw-backdrop-brightness'),
          $('--tw-backdrop-contrast'),
          $('--tw-backdrop-grayscale'),
          $('--tw-backdrop-hue-rotate'),
          $('--tw-backdrop-invert'),
          $('--tw-backdrop-opacity'),
          $('--tw-backdrop-saturate'),
          $('--tw-backdrop-sepia'),
        ]);
    r.functional('filter', (k) => {
      if (!k.modifier) {
        if (k.value === null) {return [g(), a('filter', i)];}
        if (k.value.kind === 'arbitrary') {return [a('filter', k.value.value)];}
        switch (k.value.value) {
          case 'none':
            return [a('filter', 'none')];
        }
      }
    }),
      r.functional('backdrop-filter', (k) => {
        if (!k.modifier) {
          if (k.value === null) {return [w(), a('-webkit-backdrop-filter', u), a('backdrop-filter', u)];}
          if (k.value.kind === 'arbitrary')
            {return [a('-webkit-backdrop-filter', k.value.value), a('backdrop-filter', k.value.value)];}
          switch (k.value.value) {
            case 'none':
              return [a('-webkit-backdrop-filter', 'none'), a('backdrop-filter', 'none')];
          }
        }
      }),
      n('blur', { themeKeys: ['--blur'], handle: (k) => [g(), a('--tw-blur', `blur(${k})`), a('filter', i)] }),
      e('blur-none', [g, ['--tw-blur', ' '], ['filter', i]]),
      n('backdrop-blur', {
        themeKeys: ['--backdrop-blur', '--blur'],
        handle: (k) => [
          w(),
          a('--tw-backdrop-blur', `blur(${k})`),
          a('-webkit-backdrop-filter', u),
          a('backdrop-filter', u),
        ],
      }),
      e('backdrop-blur-none', [w, ['--tw-backdrop-blur', ' '], ['-webkit-backdrop-filter', u], ['backdrop-filter', u]]),
      n('brightness', {
        themeKeys: ['--brightness'],
        handleBareValue: ({ value: k }) => (N(k) ? `${k}%` : null),
        handle: (k) => [g(), a('--tw-brightness', `brightness(${k})`), a('filter', i)],
      }),
      n('backdrop-brightness', {
        themeKeys: ['--backdrop-brightness', '--brightness'],
        handleBareValue: ({ value: k }) => (N(k) ? `${k}%` : null),
        handle: (k) => [
          w(),
          a('--tw-backdrop-brightness', `brightness(${k})`),
          a('-webkit-backdrop-filter', u),
          a('backdrop-filter', u),
        ],
      }),
      o('brightness', () => [
        {
          values: ['0', '50', '75', '90', '95', '100', '105', '110', '125', '150', '200'],
          valueThemeKeys: ['--brightness'],
        },
      ]),
      o('backdrop-brightness', () => [
        {
          values: ['0', '50', '75', '90', '95', '100', '105', '110', '125', '150', '200'],
          valueThemeKeys: ['--backdrop-brightness', '--brightness'],
        },
      ]),
      n('contrast', {
        themeKeys: ['--contrast'],
        handleBareValue: ({ value: k }) => (N(k) ? `${k}%` : null),
        handle: (k) => [g(), a('--tw-contrast', `contrast(${k})`), a('filter', i)],
      }),
      n('backdrop-contrast', {
        themeKeys: ['--backdrop-contrast', '--contrast'],
        handleBareValue: ({ value: k }) => (N(k) ? `${k}%` : null),
        handle: (k) => [
          w(),
          a('--tw-backdrop-contrast', `contrast(${k})`),
          a('-webkit-backdrop-filter', u),
          a('backdrop-filter', u),
        ],
      }),
      o('contrast', () => [{ values: ['0', '50', '75', '100', '125', '150', '200'], valueThemeKeys: ['--contrast'] }]),
      o('backdrop-contrast', () => [
        {
          values: ['0', '50', '75', '100', '125', '150', '200'],
          valueThemeKeys: ['--backdrop-contrast', '--contrast'],
        },
      ]),
      n('grayscale', {
        themeKeys: ['--grayscale'],
        handleBareValue: ({ value: k }) => (N(k) ? `${k}%` : null),
        defaultValue: '100%',
        handle: (k) => [g(), a('--tw-grayscale', `grayscale(${k})`), a('filter', i)],
      }),
      n('backdrop-grayscale', {
        themeKeys: ['--backdrop-grayscale', '--grayscale'],
        handleBareValue: ({ value: k }) => (N(k) ? `${k}%` : null),
        defaultValue: '100%',
        handle: (k) => [
          w(),
          a('--tw-backdrop-grayscale', `grayscale(${k})`),
          a('-webkit-backdrop-filter', u),
          a('backdrop-filter', u),
        ],
      }),
      o('grayscale', () => [
        { values: ['0', '25', '50', '75', '100'], valueThemeKeys: ['--grayscale'], hasDefaultValue: !0 },
      ]),
      o('backdrop-grayscale', () => [
        {
          values: ['0', '25', '50', '75', '100'],
          valueThemeKeys: ['--backdrop-grayscale', '--grayscale'],
          hasDefaultValue: !0,
        },
      ]),
      n('hue-rotate', {
        supportsNegative: !0,
        themeKeys: ['--hue-rotate'],
        handleBareValue: ({ value: k }) => (N(k) ? `${k}deg` : null),
        handle: (k) => [g(), a('--tw-hue-rotate', `hue-rotate(${k})`), a('filter', i)],
      }),
      n('backdrop-hue-rotate', {
        supportsNegative: !0,
        themeKeys: ['--backdrop-hue-rotate', '--hue-rotate'],
        handleBareValue: ({ value: k }) => (N(k) ? `${k}deg` : null),
        handle: (k) => [
          w(),
          a('--tw-backdrop-hue-rotate', `hue-rotate(${k})`),
          a('-webkit-backdrop-filter', u),
          a('backdrop-filter', u),
        ],
      }),
      o('hue-rotate', () => [{ values: ['0', '15', '30', '60', '90', '180'], valueThemeKeys: ['--hue-rotate'] }]),
      o('backdrop-hue-rotate', () => [
        { values: ['0', '15', '30', '60', '90', '180'], valueThemeKeys: ['--backdrop-hue-rotate', '--hue-rotate'] },
      ]),
      n('invert', {
        themeKeys: ['--invert'],
        handleBareValue: ({ value: k }) => (N(k) ? `${k}%` : null),
        defaultValue: '100%',
        handle: (k) => [g(), a('--tw-invert', `invert(${k})`), a('filter', i)],
      }),
      n('backdrop-invert', {
        themeKeys: ['--backdrop-invert', '--invert'],
        handleBareValue: ({ value: k }) => (N(k) ? `${k}%` : null),
        defaultValue: '100%',
        handle: (k) => [
          w(),
          a('--tw-backdrop-invert', `invert(${k})`),
          a('-webkit-backdrop-filter', u),
          a('backdrop-filter', u),
        ],
      }),
      o('invert', () => [
        { values: ['0', '25', '50', '75', '100'], valueThemeKeys: ['--invert'], hasDefaultValue: !0 },
      ]),
      o('backdrop-invert', () => [
        {
          values: ['0', '25', '50', '75', '100'],
          valueThemeKeys: ['--backdrop-invert', '--invert'],
          hasDefaultValue: !0,
        },
      ]),
      n('saturate', {
        themeKeys: ['--saturate'],
        handleBareValue: ({ value: k }) => (N(k) ? `${k}%` : null),
        handle: (k) => [g(), a('--tw-saturate', `saturate(${k})`), a('filter', i)],
      }),
      n('backdrop-saturate', {
        themeKeys: ['--backdrop-saturate', '--saturate'],
        handleBareValue: ({ value: k }) => (N(k) ? `${k}%` : null),
        handle: (k) => [
          w(),
          a('--tw-backdrop-saturate', `saturate(${k})`),
          a('-webkit-backdrop-filter', u),
          a('backdrop-filter', u),
        ],
      }),
      o('saturate', () => [{ values: ['0', '50', '100', '150', '200'], valueThemeKeys: ['--saturate'] }]),
      o('backdrop-saturate', () => [
        { values: ['0', '50', '100', '150', '200'], valueThemeKeys: ['--backdrop-saturate', '--saturate'] },
      ]),
      n('sepia', {
        themeKeys: ['--sepia'],
        handleBareValue: ({ value: k }) => (N(k) ? `${k}%` : null),
        defaultValue: '100%',
        handle: (k) => [g(), a('--tw-sepia', `sepia(${k})`), a('filter', i)],
      }),
      n('backdrop-sepia', {
        themeKeys: ['--backdrop-sepia', '--sepia'],
        handleBareValue: ({ value: k }) => (N(k) ? `${k}%` : null),
        defaultValue: '100%',
        handle: (k) => [
          w(),
          a('--tw-backdrop-sepia', `sepia(${k})`),
          a('-webkit-backdrop-filter', u),
          a('backdrop-filter', u),
        ],
      }),
      o('sepia', () => [{ values: ['0', '50', '100'], valueThemeKeys: ['--sepia'], hasDefaultValue: !0 }]),
      o('backdrop-sepia', () => [
        { values: ['0', '50', '100'], valueThemeKeys: ['--backdrop-sepia', '--sepia'], hasDefaultValue: !0 },
      ]),
      e('drop-shadow-none', [g, ['--tw-drop-shadow', ' '], ['filter', i]]),
      n('drop-shadow', {
        themeKeys: ['--drop-shadow'],
        handle: (k) => [
          g(),
          a(
            '--tw-drop-shadow',
            K(k, ',')
              .map((T) => `drop-shadow(${T})`)
              .join(' ')
          ),
          a('filter', i),
        ],
      }),
      n('backdrop-opacity', {
        themeKeys: ['--backdrop-opacity', '--opacity'],
        handleBareValue: ({ value: k }) => (Ue(k) ? `${k}%` : null),
        handle: (k) => [
          w(),
          a('--tw-backdrop-opacity', `opacity(${k})`),
          a('-webkit-backdrop-filter', u),
          a('backdrop-filter', u),
        ],
      }),
      o('backdrop-opacity', () => [
        {
          values: Array.from({ length: 21 }, (k, T) => `${T * 5}`),
          valueThemeKeys: ['--backdrop-opacity', '--opacity'],
        },
      ]);
  }
  {
    let i = `var(--tw-ease, ${t.resolve(null, ['--default-transition-timing-function']) ?? 'ease'})`,
      u = `var(--tw-duration, ${t.resolve(null, ['--default-transition-duration']) ?? '0s'})`;
    e('transition-none', [['transition-property', 'none']]),
      e('transition-all', [
        ['transition-property', 'all'],
        ['transition-timing-function', i],
        ['transition-duration', u],
      ]),
      e('transition-colors', [
        [
          'transition-property',
          'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to',
        ],
        ['transition-timing-function', i],
        ['transition-duration', u],
      ]),
      e('transition-opacity', [
        ['transition-property', 'opacity'],
        ['transition-timing-function', i],
        ['transition-duration', u],
      ]),
      e('transition-shadow', [
        ['transition-property', 'box-shadow'],
        ['transition-timing-function', i],
        ['transition-duration', u],
      ]),
      e('transition-transform', [
        ['transition-property', 'transform, translate, scale, rotate'],
        ['transition-timing-function', i],
        ['transition-duration', u],
      ]),
      n('transition', {
        defaultValue:
          'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter',
        themeKeys: ['--transition-property'],
        handle: (g) => [a('transition-property', g), a('transition-timing-function', i), a('transition-duration', u)],
      }),
      e('transition-discrete', [['transition-behavior', 'allow-discrete']]),
      e('transition-normal', [['transition-behavior', 'normal']]),
      n('delay', {
        handleBareValue: ({ value: g }) => (N(g) ? `${g}ms` : null),
        themeKeys: ['--transition-delay'],
        handle: (g) => [a('transition-delay', g)],
      });
    {
      let g = () => D([$('--tw-duration')]);
      e('duration-initial', [g, ['--tw-duration', 'initial']]),
        r.functional('duration', (w) => {
          if (w.modifier || !w.value) {return;}
          let k = null;
          if (
            (w.value.kind === 'arbitrary'
              ? (k = w.value.value)
              : ((k = t.resolve(w.value.fraction ?? w.value.value, ['--transition-duration'])),
                k === null && N(w.value.value) && (k = `${w.value.value}ms`)),
            k !== null)
          )
            {return [g(), a('--tw-duration', k), a('transition-duration', k)];}
        });
    }
    o('delay', () => [
      { values: ['75', '100', '150', '200', '300', '500', '700', '1000'], valueThemeKeys: ['--transition-delay'] },
    ]),
      o('duration', () => [
        { values: ['75', '100', '150', '200', '300', '500', '700', '1000'], valueThemeKeys: ['--transition-duration'] },
      ]);
  }
  {
    let i = () => D([$('--tw-ease')]);
    e('ease-initial', [i, ['--tw-ease', 'initial']]),
      e('ease-linear', [i, ['--tw-ease', 'linear'], ['transition-timing-function', 'linear']]),
      n('ease', { themeKeys: ['--ease'], handle: (u) => [i(), a('--tw-ease', u), a('transition-timing-function', u)] });
  }
  e('will-change-auto', [['will-change', 'auto']]),
    e('will-change-scroll', [['will-change', 'scroll-position']]),
    e('will-change-contents', [['will-change', 'contents']]),
    e('will-change-transform', [['will-change', 'transform']]),
    n('will-change', { themeKeys: [], handle: (i) => [a('will-change', i)] }),
    e('content-none', [
      ['--tw-content', 'none'],
      ['content', 'none'],
    ]),
    n('content', {
      themeKeys: [],
      handle: (i) => [D([$('--tw-content', '""')]), a('--tw-content', i), a('content', 'var(--tw-content)')],
    });
  {
    let i = 'var(--tw-contain-size,) var(--tw-contain-layout,) var(--tw-contain-paint,) var(--tw-contain-style,)',
      u = () => D([$('--tw-contain-size'), $('--tw-contain-layout'), $('--tw-contain-paint'), $('--tw-contain-style')]);
    e('contain-none', [['contain', 'none']]),
      e('contain-content', [['contain', 'content']]),
      e('contain-strict', [['contain', 'strict']]),
      e('contain-size', [u, ['--tw-contain-size', 'size'], ['contain', i]]),
      e('contain-inline-size', [u, ['--tw-contain-size', 'inline-size'], ['contain', i]]),
      e('contain-layout', [u, ['--tw-contain-layout', 'layout'], ['contain', i]]),
      e('contain-paint', [u, ['--tw-contain-paint', 'paint'], ['contain', i]]),
      e('contain-style', [u, ['--tw-contain-style', 'style'], ['contain', i]]),
      n('contain', { themeKeys: [], handle: (g) => [a('contain', g)] });
  }
  e('forced-color-adjust-none', [['forced-color-adjust', 'none']]),
    e('forced-color-adjust-auto', [['forced-color-adjust', 'auto']]),
    e('leading-none', [() => D([$('--tw-leading')]), ['--tw-leading', '1'], ['line-height', '1']]),
    l('leading', ['--leading', '--spacing'], (i) => [
      D([$('--tw-leading')]),
      a('--tw-leading', i),
      a('line-height', i),
    ]),
    n('tracking', {
      supportsNegative: !0,
      themeKeys: ['--tracking'],
      handle: (i) => [D([$('--tw-tracking')]), a('--tw-tracking', i), a('letter-spacing', i)],
    }),
    e('antialiased', [
      ['-webkit-font-smoothing', 'antialiased'],
      ['-moz-osx-font-smoothing', 'grayscale'],
    ]),
    e('subpixel-antialiased', [
      ['-webkit-font-smoothing', 'auto'],
      ['-moz-osx-font-smoothing', 'auto'],
    ]);
  {
    let i =
        'var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)',
      u = () =>
        D([
          $('--tw-ordinal'),
          $('--tw-slashed-zero'),
          $('--tw-numeric-figure'),
          $('--tw-numeric-spacing'),
          $('--tw-numeric-fraction'),
        ]);
    e('normal-nums', [['font-variant-numeric', 'normal']]),
      e('ordinal', [u, ['--tw-ordinal', 'ordinal'], ['font-variant-numeric', i]]),
      e('slashed-zero', [u, ['--tw-slashed-zero', 'slashed-zero'], ['font-variant-numeric', i]]),
      e('lining-nums', [u, ['--tw-numeric-figure', 'lining-nums'], ['font-variant-numeric', i]]),
      e('oldstyle-nums', [u, ['--tw-numeric-figure', 'oldstyle-nums'], ['font-variant-numeric', i]]),
      e('proportional-nums', [u, ['--tw-numeric-spacing', 'proportional-nums'], ['font-variant-numeric', i]]),
      e('tabular-nums', [u, ['--tw-numeric-spacing', 'tabular-nums'], ['font-variant-numeric', i]]),
      e('diagonal-fractions', [u, ['--tw-numeric-fraction', 'diagonal-fractions'], ['font-variant-numeric', i]]),
      e('stacked-fractions', [u, ['--tw-numeric-fraction', 'stacked-fractions'], ['font-variant-numeric', i]]);
  }
  {
    let i = () => D([$('--tw-outline-style', 'solid')]);
    r.static('outline-hidden', () => [
      a('outline-style', 'none'),
      P('@media', '(forced-colors: active)', [a('outline', '2px solid transparent'), a('outline-offset', '2px')]),
    ]),
      e('outline-none', [
        ['--tw-outline-style', 'none'],
        ['outline-style', 'none'],
      ]),
      e('outline-solid', [
        ['--tw-outline-style', 'solid'],
        ['outline-style', 'solid'],
      ]),
      e('outline-dashed', [
        ['--tw-outline-style', 'dashed'],
        ['outline-style', 'dashed'],
      ]),
      e('outline-dotted', [
        ['--tw-outline-style', 'dotted'],
        ['outline-style', 'dotted'],
      ]),
      e('outline-double', [
        ['--tw-outline-style', 'double'],
        ['outline-style', 'double'],
      ]),
      r.functional('outline', (u) => {
        if (u.value === null)
          {return u.modifier ? void 0 : [i(), a('outline-style', 'var(--tw-outline-style)'), a('outline-width', '1px')];}
        if (u.value.kind === 'arbitrary') {
          let g = u.value.value;
          switch (u.value.dataType ?? F(g, ['color', 'length', 'number', 'percentage'])) {
            case 'length':
            case 'number':
            case 'percentage':
              return u.modifier ? void 0 : [i(), a('outline-style', 'var(--tw-outline-style)'), a('outline-width', g)];
            default:
              return (g = W(g, u.modifier, t)), g === null ? void 0 : [a('outline-color', g)];
          }
        }
        {
          let g = G(u, t, ['--outline-color', '--color']);
          if (g) {return [a('outline-color', g)];}
        }
        {
          if (u.modifier) {return;}
          let g = t.resolve(u.value.value, ['--outline-width']);
          if (g) {return [i(), a('outline-style', 'var(--tw-outline-style)'), a('outline-width', g)];}
          if (N(u.value.value))
            {return [i(), a('outline-style', 'var(--tw-outline-style)'), a('outline-width', `${u.value.value}px`)];}
        }
      }),
      o('outline', () => [
        {
          values: ['current', 'inherit', 'transparent'],
          valueThemeKeys: ['--outline-color', '--color'],
          modifiers: Array.from({ length: 21 }, (u, g) => `${g * 5}`),
          hasDefaultValue: !0,
        },
        { values: ['0', '1', '2', '4', '8'], valueThemeKeys: ['--outline-width'] },
      ]),
      n('outline-offset', {
        supportsNegative: !0,
        themeKeys: ['--outline-offset'],
        handleBareValue: ({ value: u }) => (N(u) ? `${u}px` : null),
        handle: (u) => [a('outline-offset', u)],
      }),
      o('outline-offset', () => [
        { supportsNegative: !0, values: ['0', '1', '2', '4', '8'], valueThemeKeys: ['--outline-offset'] },
      ]);
  }
  n('opacity', {
    themeKeys: ['--opacity'],
    handleBareValue: ({ value: i }) => (Ue(i) ? `${i}%` : null),
    handle: (i) => [a('opacity', i)],
  }),
    o('opacity', () => [{ values: Array.from({ length: 21 }, (i, u) => `${u * 5}`), valueThemeKeys: ['--opacity'] }]),
    e('underline-offset-auto', [['text-underline-offset', 'auto']]),
    n('underline-offset', {
      supportsNegative: !0,
      themeKeys: ['--text-underline-offset'],
      handleBareValue: ({ value: i }) => (N(i) ? `${i}px` : null),
      handle: (i) => [a('text-underline-offset', i)],
    }),
    o('underline-offset', () => [
      { supportsNegative: !0, values: ['0', '1', '2', '4', '8'], valueThemeKeys: ['--text-underline-offset'] },
    ]),
    r.functional('text', (i) => {
      if (i.value) {
        if (i.value.kind === 'arbitrary') {
          let u = i.value.value;
          switch (i.value.dataType ?? F(u, ['color', 'length', 'percentage', 'absolute-size', 'relative-size'])) {
            case 'size':
            case 'length':
            case 'percentage':
            case 'absolute-size':
            case 'relative-size': {
              if (i.modifier) {
                let w = i.modifier.kind === 'arbitrary' ? i.modifier.value : t.resolve(i.modifier.value, ['--leading']);
                if (!w && de(i.modifier.value)) {
                  let k = t.resolve(null, ['--spacing']);
                  if (!k) {return null;}
                  w = `calc(${k} * ${i.modifier.value})`;
                }
                if (w) {return [a('font-size', u), a('line-height', w)];}
              }
              return [a('font-size', u)];
            }
            default:
              return (u = W(u, i.modifier, t)), u === null ? void 0 : [a('color', u)];
          }
        }
        {
          let u = G(i, t, ['--text-color', '--color']);
          if (u) {return [a('color', u)];}
        }
        {
          let u = t.resolveWith(i.value.value, ['--text'], ['--line-height', '--letter-spacing', '--font-weight']);
          if (u) {
            let [g, w = {}] = Array.isArray(u) ? u : [u];
            if (i.modifier) {
              let k = i.modifier.kind === 'arbitrary' ? i.modifier.value : t.resolve(i.modifier.value, ['--leading']);
              if (!k && de(i.modifier.value)) {
                let O = t.resolve(null, ['--spacing']);
                if (!O) {return null;}
                k = `calc(${O} * ${i.modifier.value})`;
              }
              let T = [a('font-size', g)];
              return k && T.push(a('line-height', k)), T;
            }
            return typeof w === 'string'
              ? [a('font-size', g), a('line-height', w)]
              : [
                  a('font-size', g),
                  a('line-height', w['--line-height'] ? `var(--tw-leading, ${w['--line-height']})` : void 0),
                  a('letter-spacing', w['--letter-spacing'] ? `var(--tw-tracking, ${w['--letter-spacing']})` : void 0),
                  a('font-weight', w['--font-weight'] ? `var(--tw-font-weight, ${w['--font-weight']})` : void 0),
                ];
          }
        }
      }
    }),
    o('text', () => [
      {
        values: ['current', 'inherit', 'transparent'],
        valueThemeKeys: ['--text-color', '--color'],
        modifiers: Array.from({ length: 21 }, (i, u) => `${u * 5}`),
      },
      { values: [], valueThemeKeys: ['--text'], modifiers: [], modifierThemeKeys: ['--leading'] },
    ]);
  {
    let k = function (C) {
        return `var(--tw-ring-inset,) 0 0 0 calc(${C} + var(--tw-ring-offset-width)) var(--tw-ring-color, ${w})`;
      },
      T = function (C) {
        return `inset 0 0 0 ${C} var(--tw-inset-ring-color, currentColor)`;
      };
    let E = k,
      z = T;
    let i = [
        'var(--tw-inset-shadow)',
        'var(--tw-inset-ring-shadow)',
        'var(--tw-ring-offset-shadow)',
        'var(--tw-ring-shadow)',
        'var(--tw-shadow)',
      ].join(', '),
      u = '0 0 #0000',
      g = () =>
        D([
          $('--tw-shadow', u),
          $('--tw-shadow-color'),
          $('--tw-inset-shadow', u),
          $('--tw-inset-shadow-color'),
          $('--tw-ring-color'),
          $('--tw-ring-shadow', u),
          $('--tw-inset-ring-color'),
          $('--tw-inset-ring-shadow', u),
          $('--tw-ring-inset'),
          $('--tw-ring-offset-width', '0px', '<length>'),
          $('--tw-ring-offset-color', '#fff'),
          $('--tw-ring-offset-shadow', u),
        ]);
    e('shadow-initial', [g, ['--tw-shadow-color', 'initial']]),
      r.functional('shadow', (C) => {
        if (!C.value) {
          let A = t.get(['--shadow']);
          return A === null
            ? void 0
            : [
                g(),
                a(
                  '--tw-shadow',
                  ae(A, (j) => `var(--tw-shadow-color, ${j})`)
                ),
                a('box-shadow', i),
              ];
        }
        if (C.value.kind === 'arbitrary') {
          let A = C.value.value;
          switch (C.value.dataType ?? F(A, ['color'])) {
            case 'color':
              return (A = W(A, C.modifier, t)), A === null ? void 0 : [g(), a('--tw-shadow-color', A)];
            default:
              return [
                g(),
                a(
                  '--tw-shadow',
                  ae(A, (Te) => `var(--tw-shadow-color, ${Te})`)
                ),
                a('box-shadow', i),
              ];
          }
        }
        switch (C.value.value) {
          case 'none':
            return C.modifier ? void 0 : [g(), a('--tw-shadow', u), a('box-shadow', i)];
        }
        {
          let A = t.get([`--shadow-${C.value.value}`]);
          if (A)
            {return C.modifier
              ? void 0
              : [
                  g(),
                  a(
                    '--tw-shadow',
                    ae(A, (j) => `var(--tw-shadow-color, ${j})`)
                  ),
                  a('box-shadow', i),
                ];}
        }
        {
          let A = G(C, t, ['--box-shadow-color', '--color']);
          if (A) {return [g(), a('--tw-shadow-color', A)];}
        }
      }),
      o('shadow', () => [
        {
          values: ['current', 'inherit', 'transparent'],
          valueThemeKeys: ['--box-shadow-color', '--color'],
          modifiers: Array.from({ length: 21 }, (C, A) => `${A * 5}`),
        },
        { values: ['none'], valueThemeKeys: ['--shadow'], hasDefaultValue: !0 },
      ]),
      e('inset-shadow-initial', [g, ['--tw-inset-shadow-color', 'initial']]),
      r.functional('inset-shadow', (C) => {
        if (!C.value) {
          let A = t.get(['--inset-shadow']);
          return A === null
            ? void 0
            : [
                g(),
                a(
                  '--tw-inset-shadow',
                  ae(A, (j) => `var(--tw-inset-shadow-color, ${j})`)
                ),
                a('box-shadow', i),
              ];
        }
        if (C.value.kind === 'arbitrary') {
          let A = C.value.value;
          switch (C.value.dataType ?? F(A, ['color'])) {
            case 'color':
              return (A = W(A, C.modifier, t)), A === null ? void 0 : [g(), a('--tw-inset-shadow-color', A)];
            default:
              return [
                g(),
                a('--tw-inset-shadow', `inset ${ae(A, (Te) => `var(--tw-inset-shadow-color, ${Te})`)}`),
                a('box-shadow', i),
              ];
          }
        }
        switch (C.value.value) {
          case 'none':
            return C.modifier ? void 0 : [g(), a('--tw-inset-shadow', u), a('box-shadow', i)];
        }
        {
          let A = t.get([`--inset-shadow-${C.value.value}`]);
          if (A)
            {return C.modifier
              ? void 0
              : [
                  g(),
                  a(
                    '--tw-inset-shadow',
                    ae(A, (j) => `var(--tw-inset-shadow-color, ${j})`)
                  ),
                  a('box-shadow', i),
                ];}
        }
        {
          let A = G(C, t, ['--box-shadow-color', '--color']);
          if (A) {return [g(), a('--tw-inset-shadow-color', A)];}
        }
      }),
      o('inset-shadow', () => [
        {
          values: ['current', 'inherit', 'transparent'],
          valueThemeKeys: ['--box-shadow-color', '--color'],
          modifiers: Array.from({ length: 21 }, (C, A) => `${A * 5}`),
        },
        { values: [], valueThemeKeys: ['--inset-shadow'], hasDefaultValue: !0 },
      ]),
      e('ring-inset', [g, ['--tw-ring-inset', 'inset']]);
    let w = t.get(['--default-ring-color']) ?? 'currentColor';
    r.functional('ring', (C) => {
      if (!C.value) {
        if (C.modifier) {return;}
        let A = t.get(['--default-ring-width']) ?? '1px';
        return [g(), a('--tw-ring-shadow', k(A)), a('box-shadow', i)];
      }
      if (C.value.kind === 'arbitrary') {
        let A = C.value.value;
        switch (C.value.dataType ?? F(A, ['color', 'length'])) {
          case 'length':
            return C.modifier ? void 0 : [g(), a('--tw-ring-shadow', k(A)), a('box-shadow', i)];
          default:
            return (A = W(A, C.modifier, t)), A === null ? void 0 : [a('--tw-ring-color', A)];
        }
      }
      {
        let A = G(C, t, ['--ring-color', '--color']);
        if (A) {return [a('--tw-ring-color', A)];}
      }
      {
        if (C.modifier) {return;}
        let A = t.resolve(C.value.value, ['--ring-width']);
        if ((A === null && N(C.value.value) && (A = `${C.value.value}px`), A))
          {return [g(), a('--tw-ring-shadow', k(A)), a('box-shadow', i)];}
      }
    }),
      o('ring', () => [
        {
          values: ['current', 'inherit', 'transparent'],
          valueThemeKeys: ['--ring-color', '--color'],
          modifiers: Array.from({ length: 21 }, (C, A) => `${A * 5}`),
        },
        { values: ['0', '1', '2', '4', '8'], valueThemeKeys: ['--ring-width'], hasDefaultValue: !0 },
      ]),
      r.functional('inset-ring', (C) => {
        if (!C.value) {return C.modifier ? void 0 : [g(), a('--tw-inset-ring-shadow', T('1px')), a('box-shadow', i)];}
        if (C.value.kind === 'arbitrary') {
          let A = C.value.value;
          switch (C.value.dataType ?? F(A, ['color', 'length'])) {
            case 'length':
              return C.modifier ? void 0 : [g(), a('--tw-inset-ring-shadow', T(A)), a('box-shadow', i)];
            default:
              return (A = W(A, C.modifier, t)), A === null ? void 0 : [a('--tw-inset-ring-color', A)];
          }
        }
        {
          let A = G(C, t, ['--ring-color', '--color']);
          if (A) {return [a('--tw-inset-ring-color', A)];}
        }
        {
          if (C.modifier) {return;}
          let A = t.resolve(C.value.value, ['--ring-width']);
          if ((A === null && N(C.value.value) && (A = `${C.value.value}px`), A))
            {return [g(), a('--tw-inset-ring-shadow', T(A)), a('box-shadow', i)];}
        }
      }),
      o('inset-ring', () => [
        {
          values: ['current', 'inherit', 'transparent'],
          valueThemeKeys: ['--ring-color', '--color'],
          modifiers: Array.from({ length: 21 }, (C, A) => `${A * 5}`),
        },
        { values: ['0', '1', '2', '4', '8'], valueThemeKeys: ['--ring-width'], hasDefaultValue: !0 },
      ]);
    let O = 'var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)';
    r.functional('ring-offset', (C) => {
      if (C.value) {
        if (C.value.kind === 'arbitrary') {
          let A = C.value.value;
          switch (C.value.dataType ?? F(A, ['color', 'length'])) {
            case 'length':
              return C.modifier ? void 0 : [a('--tw-ring-offset-width', A), a('--tw-ring-offset-shadow', O)];
            default:
              return (A = W(A, C.modifier, t)), A === null ? void 0 : [a('--tw-ring-offset-color', A)];
          }
        }
        {
          let A = t.resolve(C.value.value, ['--ring-offset-width']);
          if (A) {return C.modifier ? void 0 : [a('--tw-ring-offset-width', A), a('--tw-ring-offset-shadow', O)];}
          if (N(C.value.value))
            {return C.modifier
              ? void 0
              : [a('--tw-ring-offset-width', `${C.value.value}px`), a('--tw-ring-offset-shadow', O)];}
        }
        {
          let A = G(C, t, ['--ring-offset-color', '--color']);
          if (A) {return [a('--tw-ring-offset-color', A)];}
        }
      }
    });
  }
  return (
    o('ring-offset', () => [
      {
        values: ['current', 'inherit', 'transparent'],
        valueThemeKeys: ['--ring-offset-color', '--color'],
        modifiers: Array.from({ length: 21 }, (i, u) => `${u * 5}`),
      },
      { values: ['0', '1', '2', '4', '8'], valueThemeKeys: ['--ring-offset-width'] },
    ]),
    r.functional('@container', (i) => {
      let u = null;
      if (
        (i.value === null
          ? (u = 'inline-size')
          : i.value.kind === 'arbitrary'
          ? (u = i.value.value)
          : i.value.kind === 'named' && i.value.value === 'normal' && (u = 'normal'),
        u !== null)
      )
        {return i.modifier ? [a('container-type', u), a('container-name', i.modifier.value)] : [a('container-type', u)];}
    }),
    o('@container', () => [{ values: ['normal'], valueThemeKeys: [], hasDefaultValue: !0 }]),
    r
  );
}
function Yt(t) {
  let r = t.params;
  return Mo.test(r)
    ? (o) => {
        let e = new Set(),
          n = new Set();
        _(t.nodes, (s) => {
          if (
            s.kind !== 'declaration' ||
            !s.value ||
            (!s.value.includes('--value(') && !s.value.includes('--modifier('))
          )
            {return;}
          let l = M(s.value);
          fe(l, (f) => {
            if (f.kind !== 'function' || (f.value !== '--value' && f.value !== '--modifier')) {return;}
            let d = K(H(f.nodes), ',');
            for (let [c, p] of d.entries())
              {(p = p.replace(/\\\*/g, '*')),
                (p = p.replace(/--(.*?)\s--(.*?)/g, '--$1-*--$2')),
                (p = p.replace(/\s+/g, '')),
                (p = p.replace(/(-\*){2,}/g, '-*')),
                p[0] === '-' && p[1] === '-' && !p.includes('-*') && (p += '-*'),
                (d[c] = p);}
            f.nodes = M(d.join(','));
            for (let c of f.nodes)
              {if (c.kind === 'word' && c.value[0] === '-' && c.value[1] === '-') {
                let p = c.value.replace(/-\*.*$/g, '');
                f.value === '--value' ? e.add(p) : f.value === '--modifier' && n.add(p);
              }}
          }),
            (s.value = H(l));
        }),
          o.utilities.functional(r.slice(0, -2), (s) => {
            let l = structuredClone(t),
              f = s.value,
              d = s.modifier;
            if (f === null) {return;}
            let c = !1,
              p = !1,
              m = !1,
              h = !1,
              y = new Map(),
              v = !1;
            if (
              (_([l], (b, { parent: x, replaceWith: S }) => {
                if ((x?.kind !== 'rule' && x?.kind !== 'at-rule') || b.kind !== 'declaration' || !b.value) {return;}
                let V = M(b.value);
                (fe(V, (E, { replaceWith: z }) => {
                  if (E.kind === 'function') {
                    if (E.value === '--value') {
                      c = !0;
                      let i = Ht(f, E, o);
                      return i ? ((p = !0), i.ratio ? (v = !0) : y.set(b, x), z(i.nodes), 1) : ((c ||= !1), S([]), 2);
                    } else if (E.value === '--modifier') {
                      if (d === null) {return S([]), 1;}
                      m = !0;
                      let i = Ht(d, E, o);
                      return i ? ((h = !0), z(i.nodes), 1) : ((m ||= !1), S([]), 2);
                    }
                  }
                }) ?? 0) === 0 && (b.value = H(V));
              }),
              (c && !p) || (m && !h) || (v && h) || (d && !v && !h))
            )
              {return null;}
            if (v)
              {for (let [b, x] of y) {
                let S = x.nodes.indexOf(b);
                S !== -1 && x.nodes.splice(S, 1);
              }}
            return l.nodes;
          }),
          o.utilities.suggest(r.slice(0, -2), () => [
            {
              values: o.theme.keysInNamespaces(e).map((s) => s.replaceAll('_', '.')),
              modifiers: o.theme.keysInNamespaces(n).map((s) => s.replaceAll('_', '.')),
            },
          ]);
      }
    : Lo.test(r)
    ? (o) => {
        o.utilities.static(r, () => structuredClone(t.nodes));
      }
    : null;
}
function Ht(t, r, o) {
  for (let e of r.nodes)
    {if (t.kind === 'named' && e.kind === 'word' && e.value[0] === '-' && e.value[1] === '-') {
      let n = e.value;
      if (n.endsWith('-*')) {
        n = n.slice(0, -2);
        let s = o.theme.resolve(t.value, [n]);
        if (s) {return { nodes: M(s) };}
      } else {
        let s = n.split('-*');
        if (s.length <= 1) {continue;}
        let l = [s.shift()],
          f = o.theme.resolveWith(t.value, l, s);
        if (f) {
          let [, d = {}] = f;
          {
            let c = d[s.pop()];
            if (c) {return { nodes: M(c) };}
          }
        }
      }
    } else if (t.kind === 'named' && e.kind === 'word') {
      if (e.value !== 'number' && e.value !== 'integer' && e.value !== 'ratio' && e.value !== 'percentage') {continue;}
      let n = e.value === 'ratio' && 'fraction' in t ? t.fraction : t.value;
      if (!n) {continue;}
      let s = F(n, [e.value]);
      if (s === null) {continue;}
      if (s === 'ratio') {
        let [l, f] = K(n, '/');
        if (!N(l) || !N(f)) {continue;}
      } else {
        if (s === 'number' && !de(n)) {continue;}
        if (s === 'percentage' && !N(n.slice(0, -1))) {continue;}
      }
      return { nodes: M(n), ratio: s === 'ratio' };
    } else if (
      t.kind === 'arbitrary' &&
      e.kind === 'word' &&
      e.value[0] === '[' &&
      e.value[e.value.length - 1] === ']'
    ) {
      let n = e.value.slice(1, -1);
      if (n === '*') {return { nodes: M(t.value) };}
      if ('dataType' in t && t.dataType && t.dataType !== n) {continue;}
      if ('dataType' in t && t.dataType) {return { nodes: M(t.value) };}
      if (F(t.value, [n]) !== null) {return { nodes: M(t.value) };}
    }}
}
let ut = { '--alpha': Wo, '--spacing': Bo, '--theme': qo, theme: Qt };
function Wo(t, r, ...o) {
  let [e, n] = K(r, '/').map((s) => s.trim());
  if (!e || !n)
    {throw new Error(
      `The --alpha(\u2026) function requires a color and an alpha value, e.g.: \`--alpha(${e || 'var(--my-color)'} / ${
        n || '50%'
      })\``
    );}
  if (o.length > 0)
    {throw new Error(
      `The --alpha(\u2026) function only accepts one argument, e.g.: \`--alpha(${e || 'var(--my-color)'} / ${
        n || '50%'
      })\``
    );}
  return J(e, n);
}
function Bo(t, r, ...o) {
  if (!r) {throw new Error('The --spacing(\u2026) function requires an argument, but received none.');}
  if (o.length > 0)
    {throw new Error(`The --spacing(\u2026) function only accepts a single argument, but received ${o.length + 1}.`);}
  let e = t.theme.resolve(null, ['--spacing']);
  if (!e)
    {throw new Error(
      'The --spacing(\u2026) function requires that the `--spacing` theme variable exists, but it was not found.'
    );}
  return `calc(${e} * ${r})`;
}
function qo(t, r, ...o) {
  if (!r.startsWith('--'))
    {throw new Error('The --theme(\u2026) function can only be used with CSS variables from your theme.');}
  return Qt(t, r, ...o);
}
function Qt(t, r, ...o) {
  r = Ho(r);
  let e = t.resolveThemeValue(r);
  if (!e && o.length > 0) {return o.join(', ');}
  if (!e)
    {throw new Error(
      `Could not resolve value for theme function: \`theme(${r})\`. Consider checking if the path is correct or provide a fallback value to silence this error.`
    );}
  return e;
}
let Jt = new RegExp(
  Object.keys(ut)
    .map((t) => `${t}\\(`)
    .join('|')
);
function pe(t, r) {
  let o = 0;
  return (
    _(t, (e) => {
      if (e.kind === 'declaration' && e.value && Jt.test(e.value)) {
        (o |= 8), (e.value = Zt(e.value, r));
        return;
      }
      e.kind === 'at-rule' &&
        (e.name === '@media' || e.name === '@custom-media' || e.name === '@container' || e.name === '@supports') &&
        Jt.test(e.params) &&
        ((o |= 8), (e.params = Zt(e.params, r)));
    }),
    o
  );
}
function Zt(t, r) {
  let o = M(t);
  return (
    fe(o, (e, { replaceWith: n }) => {
      if (e.kind === 'function' && e.value in ut) {
        let s = K(H(e.nodes).trim(), ',').map((f) => f.trim()),
          l = ut[e.value](r, ...s);
        return n(M(l));
      }
    }),
    H(o)
  );
}
function Ho(t) {
  if (t[0] !== "'" && t[0] !== '"') {return t;}
  let r = '',
    o = t[0];
  for (let e = 1; e < t.length - 1; e++) {
    let n = t[e],
      s = t[e + 1];
    n === '\\' && (s === o || s === '\\') ? ((r += s), e++) : (r += n);
  }
  return r;
}
function Xt(t) {
  let r = [];
  for (let o of t.utilities.keys('static')) {r.push([o, { modifiers: [] }]);}
  for (let o of t.utilities.keys('functional')) {
    let e = t.utilities.getCompletions(o);
    for (let n of e)
      {for (let s of n.values) {
        let l = s === null ? o : `${o}-${s}`;
        r.push([l, { modifiers: n.modifiers }]), n.supportsNegative && r.push([`-${l}`, { modifiers: n.modifiers }]);
      }}
  }
  return r.sort((o, e) => (o[0] === e[0] ? 0 : o[0] < e[0] ? -1 : 1)), r;
}
function er(t) {
  let r = [];
  for (let [e, n] of t.variants.entries()) {
    let l = function ({ value: f, modifier: d } = {}) {
      let c = e;
      f && (c += `-${f}`), d && (c += `/${d}`);
      let p = t.parseVariant(c);
      if (!p) {return [];}
      let m = U('.__placeholder__', []);
      if (me(m, p, t.variants) === null) {return [];}
      let h = [];
      return (
        ze(m.nodes, (y, { path: v }) => {
          if ((y.kind !== 'rule' && y.kind !== 'at-rule') || y.nodes.length > 0) {return;}
          v.sort((S, V) => {
            let R = S.kind === 'at-rule',
              E = V.kind === 'at-rule';
            return R && !E ? -1 : !R && E ? 1 : 0;
          });
          let b = v.flatMap((S) =>
              S.kind === 'rule'
                ? S.selector === '&'
                  ? []
                  : [S.selector]
                : S.kind === 'at-rule'
                ? [`${S.name} ${S.params}`]
                : []
            ),
            x = '';
          for (let S = b.length - 1; S >= 0; S--) {x = x === '' ? b[S] : `${b[S]} { ${x} }`;}
          h.push(x);
        }),
        h
      );
    };
    let o = l;
    if (n.kind === 'arbitrary') {continue;}
    let s = t.variants.getCompletions(e);
    switch (n.kind) {
      case 'static': {
        r.push({ name: e, values: s, isArbitrary: !1, hasDash: !0, selectors: l });
        break;
      }
      case 'functional': {
        r.push({ name: e, values: s, isArbitrary: !0, hasDash: !0, selectors: l });
        break;
      }
      case 'compound': {
        r.push({ name: e, values: s, isArbitrary: !0, hasDash: !0, selectors: l });
        break;
      }
    }
  }
  return r;
}
function tr(t, r) {
  let { astNodes: o, nodeSorting: e } = te(Array.from(r), t),
    n = new Map(r.map((l) => [l, null])),
    s = 0n;
  for (let l of o) {
    let f = e.get(l)?.candidate;
    f && n.set(f, n.get(f) ?? s++);
  }
  return r.map((l) => [l, n.get(l) ?? null]);
}
let je = /^@?[a-zA-Z0-9_-]*$/;
let ft = class {
  compareFns = new Map();
  variants = new Map();
  completions = new Map();
  groupOrder = null;
  lastOrder = 0;
  static(r, o, { compounds: e, order: n } = {}) {
    this.set(r, { kind: 'static', applyFn: o, compoundsWith: 0, compounds: e ?? 2, order: n });
  }
  fromAst(r, o) {
    let e = [];
    _(o, (n) => {
      n.kind === 'rule'
        ? e.push(n.selector)
        : n.kind === 'at-rule' && n.name !== '@slot' && e.push(`${n.name} ${n.params}`);
    }),
      this.static(
        r,
        (n) => {
          let s = structuredClone(o);
          dt(s, n.nodes), (n.nodes = s);
        },
        { compounds: se(e) }
      );
  }
  functional(r, o, { compounds: e, order: n } = {}) {
    this.set(r, { kind: 'functional', applyFn: o, compoundsWith: 0, compounds: e ?? 2, order: n });
  }
  compound(r, o, e, { compounds: n, order: s } = {}) {
    this.set(r, { kind: 'compound', applyFn: e, compoundsWith: o, compounds: n ?? 2, order: s });
  }
  group(r, o) {
    (this.groupOrder = this.nextOrder()), o && this.compareFns.set(this.groupOrder, o), r(), (this.groupOrder = null);
  }
  has(r) {
    return this.variants.has(r);
  }
  get(r) {
    return this.variants.get(r);
  }
  kind(r) {
    return this.variants.get(r)?.kind;
  }
  compoundsWith(r, o) {
    let e = this.variants.get(r),
      n =
        typeof o === 'string'
          ? this.variants.get(o)
          : o.kind === 'arbitrary'
          ? { compounds: se([o.selector]) }
          : this.variants.get(o.root);
    return !(
      !e ||
      !n ||
      e.kind !== 'compound' ||
      n.compounds === 0 ||
      e.compoundsWith === 0 ||
      !(e.compoundsWith & n.compounds)
    );
  }
  suggest(r, o) {
    this.completions.set(r, o);
  }
  getCompletions(r) {
    return this.completions.get(r)?.() ?? [];
  }
  compare(r, o) {
    if (r === o) {return 0;}
    if (r === null) {return -1;}
    if (o === null) {return 1;}
    if (r.kind === 'arbitrary' && o.kind === 'arbitrary') {return r.selector < o.selector ? -1 : 1;}
    if (r.kind === 'arbitrary') {return 1;}
    if (o.kind === 'arbitrary') {return -1;}
    let e = this.variants.get(r.root).order,
      n = this.variants.get(o.root).order,
      s = e - n;
    if (s !== 0) {return s;}
    if (r.kind === 'compound' && o.kind === 'compound') {
      let c = this.compare(r.variant, o.variant);
      return c !== 0
        ? c
        : r.modifier && o.modifier
        ? r.modifier.value < o.modifier.value
          ? -1
          : 1
        : r.modifier
        ? 1
        : o.modifier
        ? -1
        : 0;
    }
    let l = this.compareFns.get(e);
    if (l !== void 0) {return l(r, o);}
    if (r.root !== o.root) {return r.root < o.root ? -1 : 1;}
    let f = r.value,
      d = o.value;
    return f === null
      ? -1
      : d === null || (f.kind === 'arbitrary' && d.kind !== 'arbitrary')
      ? 1
      : (f.kind !== 'arbitrary' && d.kind === 'arbitrary') || f.value < d.value
      ? -1
      : 1;
  }
  keys() {
    return this.variants.keys();
  }
  entries() {
    return this.variants.entries();
  }
  set(r, { kind: o, applyFn: e, compounds: n, compoundsWith: s, order: l }) {
    let f = this.variants.get(r);
    f
      ? Object.assign(f, { kind: o, applyFn: e, compounds: n })
      : (l === void 0 && ((this.lastOrder = this.nextOrder()), (l = this.lastOrder)),
        this.variants.set(r, { kind: o, applyFn: e, order: l, compoundsWith: s, compounds: n }));
  }
  nextOrder() {
    return this.groupOrder ?? this.lastOrder + 1;
  }
};
function se(t) {
  let r = 0;
  for (let o of t) {
    if (o[0] === '@') {
      if (!o.startsWith('@media') && !o.startsWith('@supports') && !o.startsWith('@container')) {return 0;}
      r |= 1;
      continue;
    }
    if (o.includes('::')) {return 0;}
    r |= 2;
  }
  return r;
}
function or(t) {
  let r = new ft();
  function o(c, p, { compounds: m } = {}) {
    (m = m ?? se(p)),
      r.static(
        c,
        (h) => {
          h.nodes = p.map((y) => L(y, h.nodes));
        },
        { compounds: m }
      );
  }
  r.static('force', () => {}, { compounds: 0 }),
    o('*', [':is(& > *)'], { compounds: 0 }),
    o('**', [':is(& *)'], { compounds: 0 });
  function e(c, p) {
    return p.map((m) => {
      m = m.trim();
      let h = K(m, ' ');
      return h[0] === 'not'
        ? h.slice(1).join(' ')
        : c === '@container'
        ? h[0][0] === '('
          ? `not ${m}`
          : h[1] === 'not'
          ? `${h[0]} ${h.slice(2).join(' ')}`
          : `${h[0]} not ${h.slice(1).join(' ')}`
        : `not ${m}`;
    });
  }
  let n = ['@media', '@supports', '@container'];
  function s(c) {
    for (let p of n) {
      if (p !== c.name) {continue;}
      let m = K(c.params, ',');
      return m.length > 1 ? null : ((m = e(c.name, m)), P(c.name, m.join(', ')));
    }
    return null;
  }
  function l(c) {
    return c.includes('::')
      ? null
      : `&:not(${K(c, ',')
          .map(
            (m) => (m.startsWith('&:is(') && m.endsWith(')') && (m = m.slice(5, -1)), (m = m.replaceAll('&', '*')), m)
          )
          .join(', ')})`;
  }
  r.compound('not', 3, (c, p) => {
    if ((p.variant.kind === 'arbitrary' && p.variant.relative) || p.modifier) {return null;}
    let m = !1;
    if (
      (_([c], (h, { path: y }) => {
        if (h.kind !== 'rule' && h.kind !== 'at-rule') {return 0;}
        if (h.nodes.length > 0) {return 0;}
        let v = [],
          b = [];
        for (let S of y) {S.kind === 'at-rule' ? v.push(S) : S.kind === 'rule' && b.push(S);}
        if (v.length > 1) {return 2;}
        if (b.length > 1) {return 2;}
        let x = [];
        for (let S of b) {
          let V = l(S.selector);
          if (!V) {return (m = !1), 2;}
          x.push(U(V, []));
        }
        for (let S of v) {
          let V = s(S);
          if (!V) {return (m = !1), 2;}
          x.push(V);
        }
        return Object.assign(c, U('&', x)), (m = !0), 1;
      }),
      c.kind === 'rule' && c.selector === '&' && c.nodes.length === 1 && Object.assign(c, c.nodes[0]),
      !m)
    )
      {return null;}
  }),
    r.suggest('not', () => Array.from(r.keys()).filter((c) => r.compoundsWith('not', c))),
    r.compound('group', 2, (c, p) => {
      if (p.variant.kind === 'arbitrary' && p.variant.relative) {return null;}
      let m = p.modifier
          ? `:where(.${t.prefix ? `${t.prefix}\\:` : ''}group\\/${p.modifier.value})`
          : `:where(.${t.prefix ? `${t.prefix}\\:` : ''}group)`,
        h = !1;
      if (
        (_([c], (y, { path: v }) => {
          if (y.kind !== 'rule') {return 0;}
          for (let x of v.slice(0, -1)) {if (x.kind === 'rule') {return (h = !1), 2;}}
          let b = y.selector.replaceAll('&', m);
          K(b, ',').length > 1 && (b = `:is(${b})`), (y.selector = `&:is(${b} *)`), (h = !0);
        }),
        !h)
      )
        {return null;}
    }),
    r.suggest('group', () => Array.from(r.keys()).filter((c) => r.compoundsWith('group', c))),
    r.compound('peer', 2, (c, p) => {
      if (p.variant.kind === 'arbitrary' && p.variant.relative) {return null;}
      let m = p.modifier
          ? `:where(.${t.prefix ? `${t.prefix}\\:` : ''}peer\\/${p.modifier.value})`
          : `:where(.${t.prefix ? `${t.prefix}\\:` : ''}peer)`,
        h = !1;
      if (
        (_([c], (y, { path: v }) => {
          if (y.kind !== 'rule') {return 0;}
          for (let x of v.slice(0, -1)) {if (x.kind === 'rule') {return (h = !1), 2;}}
          let b = y.selector.replaceAll('&', m);
          K(b, ',').length > 1 && (b = `:is(${b})`), (y.selector = `&:is(${b} ~ *)`), (h = !0);
        }),
        !h)
      )
        {return null;}
    }),
    r.suggest('peer', () => Array.from(r.keys()).filter((c) => r.compoundsWith('peer', c))),
    o('first-letter', ['&::first-letter']),
    o('first-line', ['&::first-line']),
    o('marker', ['& *::marker', '&::marker']),
    o('selection', ['& *::selection', '&::selection']),
    o('file', ['&::file-selector-button']),
    o('placeholder', ['&::placeholder']),
    o('backdrop', ['&::backdrop']);
  {
    let c = function () {
      return D([
        P('@property', '--tw-content', [a('syntax', '"*"'), a('initial-value', '""'), a('inherits', 'false')]),
      ]);
    };
    let f = c;
    r.static(
      'before',
      (p) => {
        p.nodes = [U('&::before', [c(), a('content', 'var(--tw-content)'), ...p.nodes])];
      },
      { compounds: 0 }
    ),
      r.static(
        'after',
        (p) => {
          p.nodes = [U('&::after', [c(), a('content', 'var(--tw-content)'), ...p.nodes])];
        },
        { compounds: 0 }
      );
  }
  o('first', ['&:first-child']),
    o('last', ['&:last-child']),
    o('only', ['&:only-child']),
    o('odd', ['&:nth-child(odd)']),
    o('even', ['&:nth-child(even)']),
    o('first-of-type', ['&:first-of-type']),
    o('last-of-type', ['&:last-of-type']),
    o('only-of-type', ['&:only-of-type']),
    o('visited', ['&:visited']),
    o('target', ['&:target']),
    o('open', ['&:is([open], :popover-open)']),
    o('default', ['&:default']),
    o('checked', ['&:checked']),
    o('indeterminate', ['&:indeterminate']),
    o('placeholder-shown', ['&:placeholder-shown']),
    o('autofill', ['&:autofill']),
    o('optional', ['&:optional']),
    o('required', ['&:required']),
    o('valid', ['&:valid']),
    o('invalid', ['&:invalid']),
    o('in-range', ['&:in-range']),
    o('out-of-range', ['&:out-of-range']),
    o('read-only', ['&:read-only']),
    o('empty', ['&:empty']),
    o('focus-within', ['&:focus-within']),
    r.static('hover', (c) => {
      c.nodes = [U('&:hover', [P('@media', '(hover: hover)', c.nodes)])];
    }),
    o('focus', ['&:focus']),
    o('focus-visible', ['&:focus-visible']),
    o('active', ['&:active']),
    o('enabled', ['&:enabled']),
    o('disabled', ['&:disabled']),
    o('inert', ['&:is([inert], [inert] *)']),
    r.compound('in', 2, (c, p) => {
      if (p.modifier) {return null;}
      let m = !1;
      if (
        (_([c], (h, { path: y }) => {
          if (h.kind !== 'rule') {return 0;}
          for (let v of y.slice(0, -1)) {if (v.kind === 'rule') {return (m = !1), 2;}}
          (h.selector = `:where(${h.selector.replaceAll('&', '*')}) &`), (m = !0);
        }),
        !m)
      )
        {return null;}
    }),
    r.suggest('in', () => Array.from(r.keys()).filter((c) => r.compoundsWith('in', c))),
    r.compound('has', 2, (c, p) => {
      if (p.modifier) {return null;}
      let m = !1;
      if (
        (_([c], (h, { path: y }) => {
          if (h.kind !== 'rule') {return 0;}
          for (let v of y.slice(0, -1)) {if (v.kind === 'rule') {return (m = !1), 2;}}
          (h.selector = `&:has(${h.selector.replaceAll('&', '*')})`), (m = !0);
        }),
        !m)
      )
        {return null;}
    }),
    r.suggest('has', () => Array.from(r.keys()).filter((c) => r.compoundsWith('has', c))),
    r.functional('aria', (c, p) => {
      if (!p.value || p.modifier) {return null;}
      p.value.kind === 'arbitrary'
        ? (c.nodes = [U(`&[aria-${rr(p.value.value)}]`, c.nodes)])
        : (c.nodes = [U(`&[aria-${p.value.value}="true"]`, c.nodes)]);
    }),
    r.suggest('aria', () => [
      'busy',
      'checked',
      'disabled',
      'expanded',
      'hidden',
      'pressed',
      'readonly',
      'required',
      'selected',
    ]),
    r.functional('data', (c, p) => {
      if (!p.value || p.modifier) {return null;}
      c.nodes = [U(`&[data-${rr(p.value.value)}]`, c.nodes)];
    }),
    r.functional('nth', (c, p) => {
      if (!p.value || p.modifier || (p.value.kind === 'named' && !N(p.value.value))) {return null;}
      c.nodes = [U(`&:nth-child(${p.value.value})`, c.nodes)];
    }),
    r.functional('nth-last', (c, p) => {
      if (!p.value || p.modifier || (p.value.kind === 'named' && !N(p.value.value))) {return null;}
      c.nodes = [U(`&:nth-last-child(${p.value.value})`, c.nodes)];
    }),
    r.functional('nth-of-type', (c, p) => {
      if (!p.value || p.modifier || (p.value.kind === 'named' && !N(p.value.value))) {return null;}
      c.nodes = [U(`&:nth-of-type(${p.value.value})`, c.nodes)];
    }),
    r.functional('nth-last-of-type', (c, p) => {
      if (!p.value || p.modifier || (p.value.kind === 'named' && !N(p.value.value))) {return null;}
      c.nodes = [U(`&:nth-last-of-type(${p.value.value})`, c.nodes)];
    }),
    r.functional(
      'supports',
      (c, p) => {
        if (!p.value || p.modifier) {return null;}
        let m = p.value.value;
        if (m === null) {return null;}
        if (/^[\w-]*\s*\(/.test(m)) {
          let h = m.replace(/\b(and|or|not)\b/g, ' $1 ');
          c.nodes = [P('@supports', h, c.nodes)];
          return;
        }
        m.includes(':') || (m = `${m}: var(--tw)`),
          (m[0] !== '(' || m[m.length - 1] !== ')') && (m = `(${m})`),
          (c.nodes = [P('@supports', m, c.nodes)]);
      },
      { compounds: 1 }
    ),
    o('motion-safe', ['@media (prefers-reduced-motion: no-preference)']),
    o('motion-reduce', ['@media (prefers-reduced-motion: reduce)']),
    o('contrast-more', ['@media (prefers-contrast: more)']),
    o('contrast-less', ['@media (prefers-contrast: less)']);
  {
    let c = function (p, m, h, y) {
      if (p === m) {return 0;}
      let v = y.get(p);
      if (v === null) {return h === 'asc' ? -1 : 1;}
      let b = y.get(m);
      return b === null ? (h === 'asc' ? 1 : -1) : le(v, b, h);
    };
    let d = c;
    {
      let p = t.namespace('--breakpoint'),
        m = new I((h) => {
          switch (h.kind) {
            case 'static':
              return t.resolveValue(h.root, ['--breakpoint']) ?? null;
            case 'functional': {
              if (!h.value || h.modifier) {return null;}
              let y = null;
              return (
                h.value.kind === 'arbitrary'
                  ? (y = h.value.value)
                  : h.value.kind === 'named' && (y = t.resolveValue(h.value.value, ['--breakpoint'])),
                !y || y.includes('var(') ? null : y
              );
            }
            case 'arbitrary':
            case 'compound':
              return null;
          }
        });
      r.group(
        () => {
          r.functional(
            'max',
            (h, y) => {
              if (y.modifier) {return null;}
              let v = m.get(y);
              if (v === null) {return null;}
              h.nodes = [P('@media', `(width < ${v})`, h.nodes)];
            },
            { compounds: 1 }
          );
        },
        (h, y) => c(h, y, 'desc', m)
      ),
        r.suggest('max', () => Array.from(p.keys()).filter((h) => h !== null)),
        r.group(
          () => {
            for (let [h, y] of t.namespace('--breakpoint'))
              {h !== null &&
                r.static(
                  h,
                  (v) => {
                    v.nodes = [P('@media', `(width >= ${y})`, v.nodes)];
                  },
                  { compounds: 1 }
                );}
            r.functional(
              'min',
              (h, y) => {
                if (y.modifier) {return null;}
                let v = m.get(y);
                if (v === null) {return null;}
                h.nodes = [P('@media', `(width >= ${v})`, h.nodes)];
              },
              { compounds: 1 }
            );
          },
          (h, y) => c(h, y, 'asc', m)
        ),
        r.suggest('min', () => Array.from(p.keys()).filter((h) => h !== null));
    }
    {
      let p = t.namespace('--container'),
        m = new I((h) => {
          switch (h.kind) {
            case 'functional': {
              if (h.value === null) {return null;}
              let y = null;
              return (
                h.value.kind === 'arbitrary'
                  ? (y = h.value.value)
                  : h.value.kind === 'named' && (y = t.resolveValue(h.value.value, ['--container'])),
                !y || y.includes('var(') ? null : y
              );
            }
            case 'static':
            case 'arbitrary':
            case 'compound':
              return null;
          }
        });
      r.group(
        () => {
          r.functional(
            '@max',
            (h, y) => {
              let v = m.get(y);
              if (v === null) {return null;}
              h.nodes = [
                P('@container', y.modifier ? `${y.modifier.value} (width < ${v})` : `(width < ${v})`, h.nodes),
              ];
            },
            { compounds: 1 }
          );
        },
        (h, y) => c(h, y, 'desc', m)
      ),
        r.suggest('@max', () => Array.from(p.keys()).filter((h) => h !== null)),
        r.group(
          () => {
            r.functional(
              '@',
              (h, y) => {
                let v = m.get(y);
                if (v === null) {return null;}
                h.nodes = [
                  P('@container', y.modifier ? `${y.modifier.value} (width >= ${v})` : `(width >= ${v})`, h.nodes),
                ];
              },
              { compounds: 1 }
            ),
              r.functional(
                '@min',
                (h, y) => {
                  let v = m.get(y);
                  if (v === null) {return null;}
                  h.nodes = [
                    P('@container', y.modifier ? `${y.modifier.value} (width >= ${v})` : `(width >= ${v})`, h.nodes),
                  ];
                },
                { compounds: 1 }
              );
          },
          (h, y) => c(h, y, 'asc', m)
        ),
        r.suggest('@min', () => Array.from(p.keys()).filter((h) => h !== null));
    }
  }
  return (
    o('portrait', ['@media (orientation: portrait)']),
    o('landscape', ['@media (orientation: landscape)']),
    o('ltr', ['&:where(:dir(ltr), [dir="ltr"], [dir="ltr"] *)']),
    o('rtl', ['&:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)']),
    o('dark', ['@media (prefers-color-scheme: dark)']),
    o('starting', ['@starting-style']),
    o('print', ['@media print']),
    o('forced-colors', ['@media (forced-colors: active)']),
    r
  );
}
function rr(t) {
  if (t.includes('=')) {
    let [r, ...o] = K(t, '='),
      e = o.join('=').trim();
    if (e[0] === "'" || e[0] === '"') {return t;}
    if (e.length > 1) {
      let n = e[e.length - 1];
      if (e[e.length - 2] === ' ' && (n === 'i' || n === 'I' || n === 's' || n === 'S'))
        {return `${r}="${e.slice(0, -2)}" ${n}`;}
    }
    return `${r}="${e}"`;
  }
  return t;
}
function dt(t, r) {
  _(t, (o, { replaceWith: e }) => {
    if (o.kind === 'at-rule' && o.name === '@slot') {e(r);}
    else if (o.kind === 'at-rule' && (o.name === '@keyframes' || o.name === '@property'))
      {return Object.assign(o, D([P(o.name, o.params, o.nodes)])), 1;}
  });
}
function nr(t) {
  let r = Gt(t),
    o = or(t),
    e = new I((f) => It(f, l)),
    n = new I((f) => Array.from(Ft(f, l))),
    s = new I((f) => ir(f, l)),
    l = {
      theme: t,
      utilities: r,
      variants: o,
      invalidCandidates: new Set(),
      important: !1,
      candidatesToCss(f) {
        let d = [];
        for (let c of f) {
          let p = !1,
            { astNodes: m } = te([c], this, {
              onInvalidCandidate() {
                p = !0;
              },
            });
          (m = ie(m)), m.length === 0 || p ? d.push(null) : d.push(Y(m));
        }
        return d;
      },
      getClassOrder(f) {
        return tr(this, f);
      },
      getClassList() {
        return Xt(this);
      },
      getVariants() {
        return er(this);
      },
      parseCandidate(f) {
        return n.get(f);
      },
      parseVariant(f) {
        return e.get(f);
      },
      compileAstNodes(f) {
        return s.get(f);
      },
      getVariantOrder() {
        let f = Array.from(e.values());
        f.sort((m, h) => this.variants.compare(m, h));
        let d = new Map(),
          c,
          p = 0;
        for (let m of f) {m !== null && (c !== void 0 && this.variants.compare(c, m) !== 0 && p++, d.set(m, p), (c = m));}
        return d;
      },
      resolveThemeValue(f) {
        let d = f.lastIndexOf('/'),
          c = null;
        d !== -1 && ((c = f.slice(d + 1).trim()), (f = f.slice(0, d).trim()));
        let p = t.get([f]) ?? void 0;
        return c && p ? J(p, c) : p;
      },
    };
  return l;
}
let pt = [
  'container-type',
  'pointer-events',
  'visibility',
  'position',
  'inset',
  'inset-inline',
  'inset-block',
  'inset-inline-start',
  'inset-inline-end',
  'top',
  'right',
  'bottom',
  'left',
  'isolation',
  'z-index',
  'order',
  'grid-column',
  'grid-column-start',
  'grid-column-end',
  'grid-row',
  'grid-row-start',
  'grid-row-end',
  'float',
  'clear',
  '--tw-container-component',
  'margin',
  'margin-inline',
  'margin-block',
  'margin-inline-start',
  'margin-inline-end',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'box-sizing',
  'display',
  'field-sizing',
  'aspect-ratio',
  'height',
  'max-height',
  'min-height',
  'width',
  'max-width',
  'min-width',
  'flex',
  'flex-shrink',
  'flex-grow',
  'flex-basis',
  'table-layout',
  'caption-side',
  'border-collapse',
  'border-spacing',
  'transform-origin',
  'translate',
  '--tw-translate-x',
  '--tw-translate-y',
  'scale',
  '--tw-scale-x',
  '--tw-scale-y',
  '--tw-scale-z',
  'rotate',
  '--tw-rotate-x',
  '--tw-rotate-y',
  '--tw-rotate-z',
  '--tw-skew-x',
  '--tw-skew-y',
  'transform',
  'animation',
  'cursor',
  'touch-action',
  '--tw-pan-x',
  '--tw-pan-y',
  '--tw-pinch-zoom',
  'resize',
  'scroll-snap-type',
  '--tw-scroll-snap-strictness',
  'scroll-snap-align',
  'scroll-snap-stop',
  'scroll-margin',
  'scroll-margin-inline',
  'scroll-margin-block',
  'scroll-margin-inline-start',
  'scroll-margin-inline-end',
  'scroll-margin-top',
  'scroll-margin-right',
  'scroll-margin-bottom',
  'scroll-margin-left',
  'scroll-padding',
  'scroll-padding-inline',
  'scroll-padding-block',
  'scroll-padding-inline-start',
  'scroll-padding-inline-end',
  'scroll-padding-top',
  'scroll-padding-right',
  'scroll-padding-bottom',
  'scroll-padding-left',
  'list-style-position',
  'list-style-type',
  'list-style-image',
  'appearance',
  'columns',
  'break-before',
  'break-inside',
  'break-after',
  'grid-auto-columns',
  'grid-auto-flow',
  'grid-auto-rows',
  'grid-template-columns',
  'grid-template-rows',
  'flex-direction',
  'flex-wrap',
  'place-content',
  'place-items',
  'align-content',
  'align-items',
  'justify-content',
  'justify-items',
  'gap',
  'column-gap',
  'row-gap',
  '--tw-space-x-reverse',
  '--tw-space-y-reverse',
  'divide-x-width',
  'divide-y-width',
  '--tw-divide-y-reverse',
  'divide-style',
  'divide-color',
  'place-self',
  'align-self',
  'justify-self',
  'overflow',
  'overflow-x',
  'overflow-y',
  'overscroll-behavior',
  'overscroll-behavior-x',
  'overscroll-behavior-y',
  'scroll-behavior',
  'border-radius',
  'border-start-radius',
  'border-end-radius',
  'border-top-radius',
  'border-right-radius',
  'border-bottom-radius',
  'border-left-radius',
  'border-start-start-radius',
  'border-start-end-radius',
  'border-end-end-radius',
  'border-end-start-radius',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-bottom-right-radius',
  'border-bottom-left-radius',
  'border-width',
  'border-inline-width',
  'border-block-width',
  'border-inline-start-width',
  'border-inline-end-width',
  'border-top-width',
  'border-right-width',
  'border-bottom-width',
  'border-left-width',
  'border-style',
  'border-inline-style',
  'border-block-style',
  'border-inline-start-style',
  'border-inline-end-style',
  'border-top-style',
  'border-right-style',
  'border-bottom-style',
  'border-left-style',
  'border-color',
  'border-inline-color',
  'border-block-color',
  'border-inline-start-color',
  'border-inline-end-color',
  'border-top-color',
  'border-right-color',
  'border-bottom-color',
  'border-left-color',
  'background-color',
  'background-image',
  '--tw-gradient-position',
  '--tw-gradient-stops',
  '--tw-gradient-via-stops',
  '--tw-gradient-from',
  '--tw-gradient-from-position',
  '--tw-gradient-via',
  '--tw-gradient-via-position',
  '--tw-gradient-to',
  '--tw-gradient-to-position',
  'box-decoration-break',
  'background-size',
  'background-attachment',
  'background-clip',
  'background-position',
  'background-repeat',
  'background-origin',
  'fill',
  'stroke',
  'stroke-width',
  'object-fit',
  'object-position',
  'padding',
  'padding-inline',
  'padding-block',
  'padding-inline-start',
  'padding-inline-end',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'text-align',
  'text-indent',
  'vertical-align',
  'font-family',
  'font-size',
  'line-height',
  'font-weight',
  'letter-spacing',
  'text-wrap',
  'overflow-wrap',
  'word-break',
  'text-overflow',
  'hyphens',
  'white-space',
  'color',
  'text-transform',
  'font-style',
  'font-stretch',
  'font-variant-numeric',
  'text-decoration-line',
  'text-decoration-color',
  'text-decoration-style',
  'text-decoration-thickness',
  'text-underline-offset',
  '-webkit-font-smoothing',
  'placeholder-color',
  'caret-color',
  'accent-color',
  'color-scheme',
  'opacity',
  'background-blend-mode',
  'mix-blend-mode',
  'box-shadow',
  '--tw-shadow',
  '--tw-shadow-color',
  '--tw-ring-shadow',
  '--tw-ring-color',
  '--tw-inset-shadow',
  '--tw-inset-shadow-color',
  '--tw-inset-ring-shadow',
  '--tw-inset-ring-color',
  '--tw-ring-offset-width',
  '--tw-ring-offset-color',
  'outline',
  'outline-width',
  'outline-offset',
  'outline-color',
  '--tw-blur',
  '--tw-brightness',
  '--tw-contrast',
  '--tw-drop-shadow',
  '--tw-grayscale',
  '--tw-hue-rotate',
  '--tw-invert',
  '--tw-saturate',
  '--tw-sepia',
  'filter',
  '--tw-backdrop-blur',
  '--tw-backdrop-brightness',
  '--tw-backdrop-contrast',
  '--tw-backdrop-grayscale',
  '--tw-backdrop-hue-rotate',
  '--tw-backdrop-invert',
  '--tw-backdrop-opacity',
  '--tw-backdrop-saturate',
  '--tw-backdrop-sepia',
  'backdrop-filter',
  'transition-property',
  'transition-behavior',
  'transition-delay',
  'transition-duration',
  'transition-timing-function',
  'will-change',
  'contain',
  'content',
  'forced-color-adjust',
];
function lr(t, r) {
  let o = t.length,
    e = r.length,
    n = o < e ? o : e;
  for (let s = 0; s < n; s++) {
    let l = t.charCodeAt(s),
      f = r.charCodeAt(s);
    if (l !== f) {
      if (l >= 48 && l <= 57 && f >= 48 && f <= 57) {
        let d = s,
          c = s + 1,
          p = s,
          m = s + 1;
        for (l = t.charCodeAt(c); l >= 48 && l <= 57; ) {l = t.charCodeAt(++c);}
        for (f = r.charCodeAt(m); f >= 48 && f <= 57; ) {f = r.charCodeAt(++m);}
        let h = t.slice(d, c),
          y = r.slice(p, m);
        return Number(h) - Number(y) || (h < y ? -1 : 1);
      }
      return l - f;
    }
  }
  return t.length - r.length;
}
function ge(t) {
  if (arguments.length == 0) {throw new TypeError('`CSS.escape` requires an argument.');}
  let r = String(t),
    o = r.length,
    e = -1,
    n,
    s = '',
    l = r.charCodeAt(0);
  if (o == 1 && l == 45) {return '\\' + r;}
  for (; ++e < o; ) {
    if (((n = r.charCodeAt(e)), n == 0)) {
      s += '\uFFFD';
      continue;
    }
    if (
      (n >= 1 && n <= 31) ||
      n == 127 ||
      (e == 0 && n >= 48 && n <= 57) ||
      (e == 1 && n >= 48 && n <= 57 && l == 45)
    ) {
      s += '\\' + n.toString(16) + ' ';
      continue;
    }
    if (n >= 128 || n == 45 || n == 95 || (n >= 48 && n <= 57) || (n >= 65 && n <= 90) || (n >= 97 && n <= 122)) {
      s += r.charAt(e);
      continue;
    }
    s += '\\' + r.charAt(e);
  }
  return s;
}
function ar(t) {
  return t.replace(/\\([\dA-Fa-f]{1,6}[\t\n\f\r ]?|[\S\s])/g, (r) =>
    r.length > 2 ? String.fromCodePoint(Number.parseInt(r.slice(1).trim(), 16)) : r[1]
  );
}
function te(t, r, { onInvalidCandidate: o } = {}) {
  let e = new Map(),
    n = [],
    s = new Map();
  for (let f of t) {
    if (r.invalidCandidates.has(f)) {
      o?.(f);
      continue;
    }
    let d = r.parseCandidate(f);
    if (d.length === 0) {
      o?.(f);
      continue;
    }
    s.set(f, d);
  }
  let l = r.getVariantOrder();
  for (let [f, d] of s) {
    let c = !1;
    for (let p of d) {
      let m = r.compileAstNodes(p);
      if (m.length !== 0) {
        try {
          pe(
            m.map(({ node: h }) => h),
            r
          );
        } catch {
          continue;
        }
        c = !0;
        for (let { node: h, propertySort: y } of m) {
          let v = 0n;
          for (let b of p.variants) {v |= 1n << BigInt(l.get(b));}
          e.set(h, { properties: y, variants: v, candidate: f }), n.push(h);
        }
      }
    }
    c || o?.(f);
  }
  return (
    n.sort((f, d) => {
      let c = e.get(f),
        p = e.get(d);
      if (c.variants - p.variants !== 0n) {return Number(c.variants - p.variants);}
      let m = 0;
      for (; c.properties.length < m && p.properties.length < m && c.properties[m] === p.properties[m]; ) {m += 1;}
      return (
        (c.properties[m] ?? 1 / 0) - (p.properties[m] ?? 1 / 0) ||
        p.properties.length - c.properties.length ||
        lr(c.candidate, p.candidate)
      );
    }),
    { astNodes: n, nodeSorting: e }
  );
}
function ir(t, r) {
  let o = Go(t, r);
  if (o.length === 0) {return [];}
  let e = [],
    n = `.${ge(t.raw)}`;
  for (let s of o) {
    let l = Yo(s);
    (t.important || r.important) && ur(s);
    let f = { kind: 'rule', selector: n, nodes: s };
    for (let d of t.variants) {if (me(f, d, r.variants) === null) {return [];}}
    e.push({ node: f, propertySort: l });
  }
  return e;
}
function me(t, r, o, e = 0) {
  if (r.kind === 'arbitrary') {
    if (r.relative && e === 0) {return null;}
    t.nodes = [L(r.selector, t.nodes)];
    return;
  }
  let { applyFn: n } = o.get(r.root);
  if (r.kind === 'compound') {
    let l = P('@slot');
    if (me(l, r.variant, o, e + 1) === null || (r.root === 'not' && l.nodes.length > 1)) {return null;}
    for (let d of l.nodes) {if ((d.kind !== 'rule' && d.kind !== 'at-rule') || n(d, r) === null) {return null;}}
    _(l.nodes, (d) => {
      if ((d.kind === 'rule' || d.kind === 'at-rule') && d.nodes.length <= 0) {return (d.nodes = t.nodes), 1;}
    }),
      (t.nodes = l.nodes);
    return;
  }
  if (n(t, r) === null) {return null;}
}
function sr(t) {
  let r = t.options?.types ?? [];
  return r.length > 1 && r.includes('any');
}
function Go(t, r) {
  if (t.kind === 'arbitrary') {
    let l = t.value;
    return t.modifier && (l = W(l, t.modifier, r.theme)), l === null ? [] : [[a(t.property, l)]];
  }
  let o = r.utilities.get(t.root) ?? [],
    e = [],
    n = o.filter((l) => !sr(l));
  for (let l of n) {
    if (l.kind !== t.kind) {continue;}
    let f = l.compileFn(t);
    if (f !== void 0) {
      if (f === null) {return e;}
      e.push(f);
    }
  }
  if (e.length > 0) {return e;}
  let s = o.filter((l) => sr(l));
  for (let l of s) {
    if (l.kind !== t.kind) {continue;}
    let f = l.compileFn(t);
    if (f !== void 0) {
      if (f === null) {return e;}
      e.push(f);
    }
  }
  return e;
}
function ur(t) {
  for (let r of t)
    {r.kind !== 'at-root' &&
      (r.kind === 'declaration' ? (r.important = !0) : (r.kind === 'rule' || r.kind === 'at-rule') && ur(r.nodes));}
}
function Yo(t) {
  let r = new Set(),
    o = t.slice();
  for (; o.length > 0; ) {
    let e = o.shift();
    if (e.kind === 'declaration') {
      if (e.property === '--tw-sort') {
        let s = pt.indexOf(e.value ?? '');
        if (s !== -1) {
          r.add(s);
          break;
        }
      }
      let n = pt.indexOf(e.property);
      n !== -1 && r.add(n);
    } else if (e.kind === 'rule' || e.kind === 'at-rule') {for (let n of e.nodes) {o.push(n);}}
  }
  return Array.from(r).sort((e, n) => e - n);
}
function Ce(t, r) {
  let o = 0,
    e = L('&', t),
    n = new Set(),
    s = new I(() => new Set()),
    l = new I(() => new Set());
  _([e], (m, { parent: h }) => {
    if (m.kind === 'at-rule') {
      if (m.name === '@keyframes')
        {return (
          _(m.nodes, (y) => {
            if (y.kind === 'at-rule' && y.name === '@apply')
              {throw new Error('You cannot use `@apply` inside `@keyframes`.');}
          }),
          1
        );}
      if (m.name === '@utility') {
        let y = m.params.replace(/-\*$/, '');
        l.get(y).add(m),
          _(m.nodes, (v) => {
            if (!(v.kind !== 'at-rule' || v.name !== '@apply')) {
              n.add(m);
              for (let b of cr(v, r)) {s.get(m).add(b);}
            }
          });
        return;
      }
      if (m.name === '@apply') {
        if (h === null) {return;}
        (o |= 1), n.add(h);
        for (let y of cr(m, r)) {s.get(h).add(y);}
      }
    }
  });
  let f = new Set(),
    d = [],
    c = new Set();
  function p(m, h = []) {
    if (!f.has(m)) {
      if (c.has(m)) {
        let y = h[(h.indexOf(m) + 1) % h.length];
        throw (
          (m.kind === 'at-rule' &&
            m.name === '@utility' &&
            y.kind === 'at-rule' &&
            y.name === '@utility' &&
            _(m.nodes, (v) => {
              if (v.kind !== 'at-rule' || v.name !== '@apply') {return;}
              let b = v.params.split(/\s+/g);
              for (let x of b)
                {for (let S of r.parseCandidate(x))
                  {switch (S.kind) {
                    case 'arbitrary':
                      break;
                    case 'static':
                    case 'functional':
                      if (y.params.replace(/-\*$/, '') === S.root)
                        {throw new Error(
                          `You cannot \`@apply\` the \`${x}\` utility here because it creates a circular dependency.`
                        );}
                      break;
                    default:
                  }}}
            }),
          new Error(`Circular dependency detected:

${Y([m])}
Relies on:

${Y([y])}`))
        );
      }
      c.add(m);
      for (let y of s.get(m)) {for (let v of l.get(y)) {h.push(m), p(v, h), h.pop();}}
      f.add(m), c.delete(m), d.push(m);
    }
  }
  for (let m of n) {p(m);}
  return (
    _(d, (m, { replaceWith: h }) => {
      if (m.kind !== 'at-rule' || m.name !== '@apply') {return;}
      let y = m.params.split(/\s+/g);
      {
        let v = te(y, r, {
            onInvalidCandidate: (x) => {
              throw new Error(`Cannot apply unknown utility class: ${x}`);
            },
          }).astNodes,
          b = [];
        for (let x of v)
          {if (x.kind === 'rule') {for (let S of x.nodes) {b.push(S);}}
          else {b.push(x);}}
        h(b);
      }
    }),
    o
  );
}
function* cr(t, r) {
  for (let o of t.params.split(/\s+/g))
    {for (let e of r.parseCandidate(o))
      {switch (e.kind) {
        case 'arbitrary':
          break;
        case 'static':
        case 'functional':
          yield e.root;
          break;
        default:
      }}}
}
async function mt(t, r, o, e = 0) {
  let n = 0,
    s = [];
  return (
    _(t, (l, { replaceWith: f }) => {
      if (l.kind === 'at-rule' && (l.name === '@import' || l.name === '@reference')) {
        let d = Jo(M(l.params));
        if (d === null) {return;}
        l.name === '@reference' && (d.media = 'reference'), (n |= 2);
        let { uri: c, layer: p, media: m, supports: h } = d;
        if (c.startsWith('data:') || c.startsWith('http://') || c.startsWith('https://')) {return;}
        let y = ne({}, []);
        return (
          s.push(
            (async () => {
              if (e > 100) {throw new Error(`Exceeded maximum recursion depth while resolving \`${c}\` in \`${r}\`)`);}
              let v = await o(c, r),
                b = ce(v.content);
              await mt(b, v.base, o, e + 1), (y.nodes = Zo([ne({ base: v.base }, b)], p, m, h));
            })()
          ),
          f(y),
          1
        );
      }
    }),
    s.length > 0 && (await Promise.all(s)),
    n
  );
}
function Jo(t) {
  let r,
    o = null,
    e = null,
    n = null;
  for (let s = 0; s < t.length; s++) {
    let l = t[s];
    if (l.kind !== 'separator') {
      if (l.kind === 'word' && !r) {
        if (!l.value || (l.value[0] !== '"' && l.value[0] !== "'")) {return null;}
        r = l.value.slice(1, -1);
        continue;
      }
      if ((l.kind === 'function' && l.value.toLowerCase() === 'url') || !r) {return null;}
      if ((l.kind === 'word' || l.kind === 'function') && l.value.toLowerCase() === 'layer') {
        if (o) {return null;}
        if (n) {throw new Error('`layer(\u2026)` in an `@import` should come before any other functions or conditions');}
        'nodes' in l ? (o = H(l.nodes)) : (o = '');
        continue;
      }
      if (l.kind === 'function' && l.value.toLowerCase() === 'supports') {
        if (n) {return null;}
        n = H(l.nodes);
        continue;
      }
      e = H(t.slice(s));
      break;
    }
  }
  return r ? { uri: r, layer: o, media: e, supports: n } : null;
}
function Zo(t, r, o, e) {
  let n = t;
  return (
    r !== null && (n = [P('@layer', r, n)]),
    o !== null && (n = [P('@media', o, n)]),
    e !== null && (n = [P('@supports', e[0] === '(' ? e : `(${e})`, n)]),
    n
  );
}
let dr = new Map([
  ['--font', ['--font-weight', '--font-size']],
  ['--inset', ['--inset-shadow', '--inset-ring']],
  [
    '--text',
    [
      '--text-color',
      '--text-underline-offset',
      '--text-indent',
      '--text-decoration-thickness',
      '--text-decoration-color',
    ],
  ],
]);
function fr(t, r) {
  return (dr.get(r) ?? []).some((o) => t === o || t.startsWith(`${o}-`));
}
let Fe = class {
  constructor(r = new Map(), o = new Set([])) {
    this.values = r;
    this.keyframes = o;
  }
  prefix = null;
  add(r, o, e = 0) {
    if ((r.endsWith('\\*') && (r = r.slice(0, -2) + '*'), r.endsWith('-*'))) {
      if (o !== 'initial') {throw new Error(`Invalid theme value \`${o}\` for namespace \`${r}\``);}
      r === '--*' ? this.values.clear() : this.clearNamespace(r.slice(0, -2), 0);
    }
    if (e & 4) {
      let n = this.values.get(r);
      if (n && !(n.options & 4)) {return;}
    }
    o === 'initial' ? this.values.delete(r) : this.values.set(r, { value: o, options: e });
  }
  keysInNamespaces(r) {
    let o = [];
    for (let e of r) {
      let n = `${e}-`;
      for (let s of this.values.keys())
        {s.startsWith(n) && s.indexOf('--', 2) === -1 && (fr(s, e) || o.push(s.slice(n.length)));}
    }
    return o;
  }
  get(r) {
    for (let o of r) {
      let e = this.values.get(o);
      if (e) {return e.value;}
    }
    return null;
  }
  hasDefault(r) {
    return (this.getOptions(r) & 4) === 4;
  }
  getOptions(r) {
    return this.values.get(r)?.options ?? 0;
  }
  entries() {
    return this.prefix ? Array.from(this.values, (r) => ((r[0] = this.#r(r[0])), r)) : this.values.entries();
  }
  #r(r) {
    return this.prefix ? `--${this.prefix}-${r.slice(2)}` : r;
  }
  clearNamespace(r, o) {
    let e = dr.get(r) ?? [];
    e: for (let n of this.values.keys())
      {if (n.startsWith(r)) {
        if (o !== 0 && (this.getOptions(n) & o) !== o) {continue;}
        for (let s of e) {if (n.startsWith(s)) {continue e;}}
        this.values.delete(n);
      }}
  }
  #e(r, o) {
    for (let e of o) {
      let n = r !== null ? ge(`${e}-${r.replaceAll('.', '_')}`) : e;
      if (this.values.has(n) && !fr(n, e)) {return n;}
    }
    return null;
  }
  #t(r) {
    return this.values.has(r) ? `var(${this.#r(r)})` : null;
  }
  resolve(r, o) {
    let e = this.#e(r, o);
    if (!e) {return null;}
    let n = this.values.get(e);
    return n.options & 1 ? n.value : this.#t(e);
  }
  resolveValue(r, o) {
    let e = this.#e(r, o);
    return e ? this.values.get(e).value : null;
  }
  resolveWith(r, o, e = []) {
    let n = this.#e(r, o);
    if (!n) {return null;}
    let s = {};
    for (let f of e) {
      let d = `${n}${f}`,
        c = this.values.get(d);
      c && (c.options & 1 ? (s[f] = c.value) : (s[f] = this.#t(d)));
    }
    let l = this.values.get(n);
    return l.options & 1 ? [l.value, s] : [this.#t(n), s];
  }
  namespace(r) {
    let o = new Map(),
      e = `${r}-`;
    for (let [n, s] of this.values)
      {n === r
        ? o.set(null, s.value)
        : n.startsWith(`${e}-`)
        ? o.set(n.slice(r.length), s.value)
        : n.startsWith(e) && o.set(n.slice(e.length), s.value);}
    return o;
  }
  addKeyframes(r) {
    this.keyframes.add(r);
  }
  getKeyframes() {
    return Array.from(this.keyframes);
  }
};
function he(t, r = null) {
  return Array.isArray(t) && t.length === 2 && typeof t[1] === 'object' && typeof t[1] !== null
    ? r
      ? t[1][r] ?? null
      : t[0]
    : Array.isArray(t) && r === null
    ? t.join(', ')
    : typeof t === 'string' && r === null
    ? t
    : null;
}
function mr(t, { theme: r }, o) {
  for (let e of o) {
    let n = Ie([e]);
    n && t.theme.clearNamespace(`--${n}`, 4);
  }
  for (let [e, n] of Qo(r)) {
    if (typeof n !== 'string' && typeof n !== 'number') {continue;}
    if (
      (typeof n === 'string' && (n = n.replace(/<alpha-value>/g, '1')),
      e[0] === 'opacity' && (typeof n === 'number' || typeof n === 'string'))
    ) {
      let l = typeof n === 'string' ? parseFloat(n) : n;
      l >= 0 && l <= 1 && (n = l * 100 + '%');
    }
    let s = Ie(e);
    s && t.theme.add(`--${ge(s)}`, '' + n, 7);
  }
  if (Object.hasOwn(r, 'fontFamily')) {
    let e = 5;
    {
      let n = he(r.fontFamily.sans);
      n &&
        t.theme.hasDefault('--font-sans') &&
        (t.theme.add('--default-font-family', n, e),
        t.theme.add('--default-font-feature-settings', he(r.fontFamily.sans, 'fontFeatureSettings') ?? 'normal', e),
        t.theme.add(
          '--default-font-variation-settings',
          he(r.fontFamily.sans, 'fontVariationSettings') ?? 'normal',
          e
        ));
    }
    {
      let n = he(r.fontFamily.mono);
      n &&
        t.theme.hasDefault('--font-mono') &&
        (t.theme.add('--default-mono-font-family', n, e),
        t.theme.add(
          '--default-mono-font-feature-settings',
          he(r.fontFamily.mono, 'fontFeatureSettings') ?? 'normal',
          e
        ),
        t.theme.add(
          '--default-mono-font-variation-settings',
          he(r.fontFamily.mono, 'fontVariationSettings') ?? 'normal',
          e
        ));
    }
  }
  return r;
}
function Qo(t) {
  let r = [];
  return (
    gr(t, [], (o, e) => {
      if (en(o)) {return r.push([e, o]), 1;}
      if (tn(o)) {
        r.push([e, o[0]]);
        for (let n of Reflect.ownKeys(o[1])) {r.push([[...e, `-${n}`], o[1][n]]);}
        return 1;
      }
      if (Array.isArray(o) && o.every((n) => typeof n === 'string')) {return r.push([e, o.join(', ')]), 1;}
    }),
    r
  );
}
let Xo = /^[a-zA-Z0-9-_%/\.]+$/;
function Ie(t) {
  if (t[0] === 'container') {return null;}
  (t = structuredClone(t)),
    t[0] === 'animation' && (t[0] = 'animate'),
    t[0] === 'aspectRatio' && (t[0] = 'aspect'),
    t[0] === 'borderRadius' && (t[0] = 'radius'),
    t[0] === 'boxShadow' && (t[0] = 'shadow'),
    t[0] === 'colors' && (t[0] = 'color'),
    t[0] === 'fontFamily' && (t[0] = 'font'),
    t[0] === 'fontSize' && (t[0] = 'text'),
    t[0] === 'letterSpacing' && (t[0] = 'tracking'),
    t[0] === 'lineHeight' && (t[0] = 'leading'),
    t[0] === 'maxWidth' && (t[0] = 'container'),
    t[0] === 'screens' && (t[0] = 'breakpoint'),
    t[0] === 'transitionTimingFunction' && (t[0] = 'ease');
  for (let r of t) {if (!Xo.test(r)) {return null;}}
  return t
    .map((r, o, e) => (r === '1' && o !== e.length - 1 ? '' : r))
    .map((r) => r.replaceAll('.', '_').replace(/([a-z])([A-Z])/g, (o, e, n) => `${e}-${n.toLowerCase()}`))
    .filter((r, o) => r !== 'DEFAULT' || o !== t.length - 1)
    .join('-');
}
function en(t) {
  return typeof t === 'number' || typeof t === 'string';
}
function tn(t) {
  if (
    !Array.isArray(t) ||
    t.length !== 2 ||
    (typeof t[0] !== 'string' && typeof t[0] !== 'number') ||
    t[1] === void 0 ||
    t[1] === null ||
    typeof t[1] !== 'object'
  )
    {return !1;}
  for (let r of Reflect.ownKeys(t[1]))
    {if (typeof r !== 'string' || (typeof t[1][r] !== 'string' && typeof t[1][r] !== 'number')) {return !1;}}
  return !0;
}
function gr(t, r = [], o) {
  for (let e of Reflect.ownKeys(t)) {
    let n = t[e];
    if (n == null) {continue;}
    let s = [...r, e],
      l = o(n, s) ?? 0;
    if (l !== 1) {
      if (l === 2) {return 2;}
      if (!(!Array.isArray(n) && typeof n !== 'object') && gr(n, s, o) === 2) {return 2;}
    }
  }
}
function Le(t) {
  let r = [];
  for (let o of K(t, '.')) {
    if (!o.includes('[')) {
      r.push(o);
      continue;
    }
    let e = 0;
    for (;;) {
      let n = o.indexOf('[', e),
        s = o.indexOf(']', n);
      if (n === -1 || s === -1) {break;}
      n > e && r.push(o.slice(e, n)), r.push(o.slice(n + 1, s)), (e = s + 1);
    }
    e <= o.length - 1 && r.push(o.slice(e));
  }
  return r;
}
function be(t) {
  if (Object.prototype.toString.call(t) !== '[object Object]') {return !1;}
  let r = Object.getPrototypeOf(t);
  return r === null || Object.getPrototypeOf(r) === null;
}
function $e(t, r, o, e = []) {
  for (let n of r)
    {if (n != null)
      {for (let s of Reflect.ownKeys(n)) {
        e.push(s);
        let l = o(t[s], n[s], e);
        l !== void 0 ? (t[s] = l) : !be(t[s]) || !be(n[s]) ? (t[s] = n[s]) : (t[s] = $e({}, [t[s], n[s]], o, e)),
          e.pop();
      }}}
  return t;
}
function Me(t, r, o) {
  return function (n, s) {
    let l = n.lastIndexOf('/'),
      f = null;
    l !== -1 && ((f = n.slice(l + 1).trim()), (n = n.slice(0, l).trim()));
    let d = (() => {
      let c = Le(n),
        [p, m] = rn(t.theme, c),
        h = o(hr(r() ?? {}, c) ?? null);
      if ((typeof h === 'string' && (h = h.replace('<alpha-value>', '1')), typeof p !== 'object'))
        {return typeof m !== 'object' && m & 4 ? h ?? p : p;}
      if (h !== null && typeof h === 'object' && !Array.isArray(h)) {
        let y = $e({}, [h], (v, b) => b);
        if (p === null && Object.hasOwn(h, '__CSS_VALUES__')) {
          let v = {};
          for (let b in h.__CSS_VALUES__) {(v[b] = h[b]), delete y[b];}
          p = v;
        }
        for (let v in p)
          {v !== '__CSS_VALUES__' &&
            ((h?.__CSS_VALUES__?.[v] & 4 && hr(y, v.split('-')) !== void 0) || (y[ar(v)] = p[v]));}
        return y;
      }
      if (Array.isArray(p) && Array.isArray(m) && Array.isArray(h)) {
        let y = p[0],
          v = p[1];
        m[0] & 4 && (y = h[0] ?? y);
        for (let b of Object.keys(v)) {m[1][b] & 4 && (v[b] = h[1][b] ?? v[b]);}
        return [y, v];
      }
      return p ?? h;
    })();
    return f && typeof d === 'string' && (d = J(d, f)), d ?? s;
  };
}
function rn(t, r) {
  if (r.length === 1 && r[0].startsWith('--')) {return [t.get([r[0]]), t.getOptions(r[0])];}
  let o = Ie(r),
    e = new Map(),
    n = new I(() => new Map()),
    s = t.namespace(`--${o}`);
  if (s.size === 0) {return [null, 0];}
  let l = new Map();
  for (let [p, m] of s) {
    if (!p || !p.includes('--')) {
      e.set(p, m), l.set(p, t.getOptions(p ? `--${o}-${p}` : `--${o}`));
      continue;
    }
    let h = p.indexOf('--'),
      y = p.slice(0, h),
      v = p.slice(h + 2);
    (v = v.replace(/-([a-z])/g, (b, x) => x.toUpperCase())),
      n.get(y === '' ? null : y).set(v, [m, t.getOptions(`--${o}${p}`)]);
  }
  let f = t.getOptions(`--${o}`);
  for (let [p, m] of n) {
    let h = e.get(p);
    if (typeof h !== 'string') {continue;}
    let y = {},
      v = {};
    for (let [b, [x, S]] of m) {(y[b] = x), (v[b] = S);}
    e.set(p, [h, y]), l.set(p, [f, v]);
  }
  let d = {},
    c = {};
  for (let [p, m] of e) {br(d, [p ?? 'DEFAULT'], m);}
  for (let [p, m] of l) {br(c, [p ?? 'DEFAULT'], m);}
  return r[r.length - 1] === 'DEFAULT'
    ? [d?.DEFAULT ?? null, c.DEFAULT ?? 0]
    : 'DEFAULT' in d && Object.keys(d).length === 1
    ? [d.DEFAULT, c.DEFAULT ?? 0]
    : ((d.__CSS_VALUES__ = c), [d, c]);
}
function hr(t, r) {
  for (let o = 0; o < r.length; ++o) {
    let e = r[o];
    if (t[e] === void 0) {
      if (r[o + 1] === void 0) {return;}
      r[o + 1] = `${e}-${r[o + 1]}`;
      continue;
    }
    t = t[e];
  }
  return t;
}
function br(t, r, o) {
  for (let e of r.slice(0, -1)) {t[e] === void 0 && (t[e] = {}), (t = t[e]);}
  t[r[r.length - 1]] = o;
}
function on(t) {
  return { kind: 'combinator', value: t };
}
function nn(t, r) {
  return { kind: 'function', value: t, nodes: r };
}
function Ne(t) {
  return { kind: 'selector', value: t };
}
function ln(t) {
  return { kind: 'separator', value: t };
}
function an(t) {
  return { kind: 'value', value: t };
}
function We(t, r, o = null) {
  for (let e = 0; e < t.length; e++) {
    let n = t[e],
      s =
        r(n, {
          parent: o,
          replaceWith(l) {
            Array.isArray(l)
              ? l.length === 0
                ? t.splice(e, 1)
                : l.length === 1
                ? (t[e] = l[0])
                : t.splice(e, 1, ...l)
              : (t[e] = l),
              e--;
          },
        }) ?? 0;
    if (s === 2) {return 2;}
    if (s !== 1 && n.kind === 'function' && We(n.nodes, r, n) === 2) {return 2;}
  }
}
function Be(t) {
  let r = '';
  for (let o of t)
    {switch (o.kind) {
      case 'combinator':
      case 'selector':
      case 'separator':
      case 'value': {
        r += o.value;
        break;
      }
      case 'function':
        r += o.value + '(' + Be(o.nodes) + ')';
    }}
  return r;
}
let yr = 92,
  sn = 93,
  vr = 41,
  un = 58,
  kr = 44,
  cn = 34,
  fn = 46,
  wr = 62,
  xr = 10,
  dn = 35,
  Ar = 91,
  Cr = 40,
  $r = 43,
  pn = 39,
  Nr = 32,
  Sr = 9,
  Tr = 126;
function gt(t) {
  t = t.replaceAll(
    `\r
`,
    `
`
  );
  let r = [],
    o = [],
    e = null,
    n = '',
    s;
  for (let l = 0; l < t.length; l++) {
    let f = t.charCodeAt(l);
    switch (f) {
      case kr:
      case wr:
      case xr:
      case Nr:
      case $r:
      case Sr:
      case Tr: {
        if (n.length > 0) {
          let h = Ne(n);
          e ? e.nodes.push(h) : r.push(h), (n = '');
        }
        let d = l,
          c = l + 1;
        for (
          ;
          c < t.length &&
          ((s = t.charCodeAt(c)), !(s !== kr && s !== wr && s !== xr && s !== Nr && s !== $r && s !== Sr && s !== Tr));
          c++
        ){;}
        l = c - 1;
        let p = t.slice(d, c),
          m = p.trim() === ',' ? ln(p) : on(p);
        e ? e.nodes.push(m) : r.push(m);
        break;
      }
      case Cr: {
        let d = nn(n, []);
        if (((n = ''), d.value !== ':not' && d.value !== ':where' && d.value !== ':has' && d.value !== ':is')) {
          let c = l + 1,
            p = 0;
          for (let h = l + 1; h < t.length; h++) {
            if (((s = t.charCodeAt(h)), s === Cr)) {
              p++;
              continue;
            }
            if (s === vr) {
              if (p === 0) {
                l = h;
                break;
              }
              p--;
            }
          }
          let m = l;
          d.nodes.push(an(t.slice(c, m))), (n = ''), (l = m), r.push(d);
          break;
        }
        e ? e.nodes.push(d) : r.push(d), o.push(d), (e = d);
        break;
      }
      case vr: {
        let d = o.pop();
        if (n.length > 0) {
          let c = Ne(n);
          d.nodes.push(c), (n = '');
        }
        o.length > 0 ? (e = o[o.length - 1]) : (e = null);
        break;
      }
      case fn:
      case un:
      case dn: {
        if (n.length > 0) {
          let d = Ne(n);
          e ? e.nodes.push(d) : r.push(d);
        }
        n = String.fromCharCode(f);
        break;
      }
      case Ar: {
        if (n.length > 0) {
          let p = Ne(n);
          e ? e.nodes.push(p) : r.push(p);
        }
        n = '';
        let d = l,
          c = 0;
        for (let p = l + 1; p < t.length; p++) {
          if (((s = t.charCodeAt(p)), s === Ar)) {
            c++;
            continue;
          }
          if (s === sn) {
            if (c === 0) {
              l = p;
              break;
            }
            c--;
          }
        }
        n += t.slice(d, l + 1);
        break;
      }
      case pn:
      case cn: {
        let d = l;
        for (let c = l + 1; c < t.length; c++)
          {if (((s = t.charCodeAt(c)), s === yr)) {c += 1;}
          else if (s === f) {
            l = c;
            break;
          }}
        n += t.slice(d, l + 1);
        break;
      }
      case yr: {
        let d = t.charCodeAt(l + 1);
        (n += String.fromCharCode(f) + String.fromCharCode(d)), (l += 1);
        break;
      }
      default:
        n += String.fromCharCode(f);
    }
  }
  return n.length > 0 && r.push(Ne(n)), r;
}
let Vr = /^[a-z@][a-zA-Z0-9/%._-]*$/;
function ht({ designSystem: t, ast: r, resolvedConfig: o, featuresRef: e, referenceMode: n }) {
  let s = {
    addBase(l) {
      if (n) {return;}
      let f = Q(l);
      (e.current |= pe(f, t)), r.push(P('@layer', 'base', f));
    },
    addVariant(l, f) {
      if (!je.test(l))
        {throw new Error(
          `\`addVariant('${l}')\` defines an invalid variant name. Variants should only contain alphanumeric, dashes or underscore characters.`
        );}
      typeof f === 'string' || Array.isArray(f)
        ? t.variants.static(
            l,
            (d) => {
              d.nodes = Er(f, d.nodes);
            },
            { compounds: se(typeof f === 'string' ? [f] : f) }
          )
        : typeof f === 'object' && t.variants.fromAst(l, Q(f));
    },
    matchVariant(l, f, d) {
      function c(m, h, y) {
        let v = f(m, { modifier: h?.value ?? null });
        return Er(v, y);
      }
      let p = Object.keys(d?.values ?? {});
      t.variants.group(
        () => {
          t.variants.functional(l, (m, h) => {
            if (!h.value) {
              if (d?.values && 'DEFAULT' in d.values) {
                m.nodes = c(d.values.DEFAULT, h.modifier, m.nodes);
                return;
              }
              return null;
            }
            if (h.value.kind === 'arbitrary') {m.nodes = c(h.value.value, h.modifier, m.nodes);}
            else if (h.value.kind === 'named' && d?.values) {
              let y = d.values[h.value.value];
              if (typeof y !== 'string') {return;}
              m.nodes = c(y, h.modifier, m.nodes);
            }
          });
        },
        (m, h) => {
          if (m.kind !== 'functional' || h.kind !== 'functional') {return 0;}
          let y = m.value ? m.value.value : 'DEFAULT',
            v = h.value ? h.value.value : 'DEFAULT',
            b = d?.values?.[y] ?? y,
            x = d?.values?.[v] ?? v;
          if (d && typeof d.sort === 'function')
            {return d.sort(
              { value: b, modifier: m.modifier?.value ?? null },
              { value: x, modifier: h.modifier?.value ?? null }
            );}
          let S = p.indexOf(y),
            V = p.indexOf(v);
          return (S = S === -1 ? p.length : S), (V = V === -1 ? p.length : V), S !== V ? S - V : b < x ? -1 : 1;
        }
      );
    },
    addUtilities(l) {
      l = Array.isArray(l) ? l : [l];
      let f = l.flatMap((c) => Object.entries(c));
      f = f.flatMap(([c, p]) => K(c, ',').map((m) => [m.trim(), p]));
      let d = new I(() => []);
      for (let [c, p] of f) {
        if (c.startsWith('@keyframes ')) {
          n || r.push(L(c, Q(p)));
          continue;
        }
        let m = gt(c),
          h = !1;
        if (
          (We(m, (y) => {
            if (y.kind === 'selector' && y.value[0] === '.' && Vr.test(y.value.slice(1))) {
              let v = y.value;
              y.value = '&';
              let b = Be(m),
                x = v.slice(1),
                S = b === '&' ? Q(p) : [L(b, Q(p))];
              d.get(x).push(...S), (h = !0), (y.value = v);
              return;
            }
            if (y.kind === 'function' && y.value === ':not') {return 1;}
          }),
          !h)
        )
          {throw new Error(
            `\`addUtilities({ '${c}' : \u2026 })\` defines an invalid utility selector. Utilities must be a single class name and start with a lowercase letter, eg. \`.scrollbar-none\`.`
          );}
      }
      for (let [c, p] of d)
        {t.theme.prefix &&
          _(p, (m) => {
            if (m.kind === 'rule') {
              let h = gt(m.selector);
              We(h, (y) => {
                y.kind === 'selector' && y.value[0] === '.' && (y.value = `.${t.theme.prefix}\\:${y.value.slice(1)}`);
              }),
                (m.selector = Be(h));
            }
          }),
          t.utilities.static(c, () => {
            let m = structuredClone(p);
            return (e.current |= Ce(m, t)), m;
          });}
    },
    matchUtilities(l, f) {
      let d = f?.type ? (Array.isArray(f?.type) ? f.type : [f.type]) : ['any'];
      for (let [p, m] of Object.entries(l)) {
        let h = function ({ negative: y }) {
          return (v) => {
            if (
              v.value?.kind === 'arbitrary' &&
              d.length > 0 &&
              !d.includes('any') &&
              ((v.value.dataType && !d.includes(v.value.dataType)) || (!v.value.dataType && !F(v.value.value, d)))
            )
              {return;}
            let b = d.includes('color'),
              x = null,
              S = !1;
            {
              let E = f?.values ?? {};
              b && (E = Object.assign({ inherit: 'inherit', transparent: 'transparent', current: 'currentColor' }, E)),
                v.value
                  ? v.value.kind === 'arbitrary'
                    ? (x = v.value.value)
                    : v.value.fraction && E[v.value.fraction]
                    ? ((x = E[v.value.fraction]), (S = !0))
                    : E[v.value.value]
                    ? (x = E[v.value.value])
                    : E.__BARE_VALUE__ &&
                      ((x = E.__BARE_VALUE__(v.value) ?? null),
                      (S = (v.value.fraction !== null && x?.includes('/')) ?? !1))
                  : (x = E.DEFAULT ?? null);
            }
            if (x === null) {return;}
            let V;
            {
              let E = f?.modifiers ?? null;
              v.modifier
                ? E === 'any' || v.modifier.kind === 'arbitrary'
                  ? (V = v.modifier.value)
                  : E?.[v.modifier.value]
                  ? (V = E[v.modifier.value])
                  : b && !Number.isNaN(Number(v.modifier.value))
                  ? (V = `${v.modifier.value}%`)
                  : (V = null)
                : (V = null);
            }
            if (v.modifier && V === null && !S) {return v.value?.kind === 'arbitrary' ? null : void 0;}
            b && V !== null && (x = J(x, V)), y && (x = `calc(${x} * -1)`);
            let R = Q(m(x, { modifier: V }));
            return (e.current |= Ce(R, t)), R;
          };
        };
        let c = h;
        if (!Vr.test(p))
          {throw new Error(
            `\`matchUtilities({ '${p}' : \u2026 })\` defines an invalid utility name. Utilities should be alphanumeric and start with a lowercase letter, eg. \`scrollbar\`.`
          );}
        f?.supportsNegativeValues && t.utilities.functional(`-${p}`, h({ negative: !0 }), { types: d }),
          t.utilities.functional(p, h({ negative: !1 }), { types: d }),
          t.utilities.suggest(p, () => {
            let y = f?.values ?? {},
              v = new Set(Object.keys(y));
            v.delete('__BARE_VALUE__'), v.has('DEFAULT') && (v.delete('DEFAULT'), v.add(null));
            let b = f?.modifiers ?? {},
              x = b === 'any' ? [] : Object.keys(b);
            return [{ supportsNegative: f?.supportsNegativeValues ?? !1, values: Array.from(v), modifiers: x }];
          });
      }
    },
    addComponents(l, f) {
      this.addUtilities(l, f);
    },
    matchComponents(l, f) {
      this.matchUtilities(l, f);
    },
    theme: Me(
      t,
      () => o.theme ?? {},
      (l) => l
    ),
    prefix(l) {
      return l;
    },
    config(l, f) {
      let d = o;
      if (!l) {return d;}
      let c = Le(l);
      for (let p = 0; p < c.length; ++p) {
        let m = c[p];
        if (d[m] === void 0) {return f;}
        d = d[m];
      }
      return d ?? f;
    },
  };
  return (s.addComponents = s.addComponents.bind(s)), (s.matchComponents = s.matchComponents.bind(s)), s;
}
function Q(t) {
  let r = [];
  t = Array.isArray(t) ? t : [t];
  let o = t.flatMap((e) => Object.entries(e));
  for (let [e, n] of o)
    {if (typeof n !== 'object')
      {!e.startsWith('--') && n === '@slot'
        ? r.push(L(e, [P('@slot')]))
        : ((e = e.replace(/([A-Z])/g, '-$1').toLowerCase()), r.push(a(e, String(n))));}
    else if (Array.isArray(n)) {for (let s of n) {typeof s === 'string' ? r.push(a(e, s)) : r.push(L(e, Q(s)));}}
    else {n !== null && r.push(L(e, Q(n)));}}
  return r;
}
function Er(t, r) {
  return (typeof t === 'string' ? [t] : t).flatMap((e) => {
    if (e.trim().endsWith('}')) {
      let n = e.replace('}', '{@slot}}'),
        s = ce(n);
      return dt(s, r), s;
    } else {return L(e, r);}
  });
}
function Rr(t, r, o) {
  for (let e of gn(r)) {t.theme.addKeyframes(e);}
}
function gn(t) {
  let r = [];
  if ('keyframes' in t.theme) {for (let [o, e] of Object.entries(t.theme.keyframes)) {r.push(P('@keyframes', o, Q(e)));}}
  return r;
}
let qe = {
  inherit: 'inherit',
  current: 'currentColor',
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  slate: {
    50: 'oklch(0.984 0.003 247.858)',
    100: 'oklch(0.968 0.007 247.896)',
    200: 'oklch(0.929 0.013 255.508)',
    300: 'oklch(0.869 0.022 252.894)',
    400: 'oklch(0.704 0.04 256.788)',
    500: 'oklch(0.554 0.046 257.417)',
    600: 'oklch(0.446 0.043 257.281)',
    700: 'oklch(0.372 0.044 257.287)',
    800: 'oklch(0.279 0.041 260.031)',
    900: 'oklch(0.208 0.042 265.755)',
    950: 'oklch(0.129 0.042 264.695)',
  },
  gray: {
    50: 'oklch(0.985 0.002 247.839)',
    100: 'oklch(0.967 0.003 264.542)',
    200: 'oklch(0.928 0.006 264.531)',
    300: 'oklch(0.872 0.01 258.338)',
    400: 'oklch(0.707 0.022 261.325)',
    500: 'oklch(0.551 0.027 264.364)',
    600: 'oklch(0.446 0.03 256.802)',
    700: 'oklch(0.373 0.034 259.733)',
    800: 'oklch(0.278 0.033 256.848)',
    900: 'oklch(0.21 0.034 264.665)',
    950: 'oklch(0.13 0.028 261.692)',
  },
  zinc: {
    50: 'oklch(0.985 0 0)',
    100: 'oklch(0.967 0.001 286.375)',
    200: 'oklch(0.92 0.004 286.32)',
    300: 'oklch(0.871 0.006 286.286)',
    400: 'oklch(0.705 0.015 286.067)',
    500: 'oklch(0.552 0.016 285.938)',
    600: 'oklch(0.442 0.017 285.786)',
    700: 'oklch(0.37 0.013 285.805)',
    800: 'oklch(0.274 0.006 286.033)',
    900: 'oklch(0.21 0.006 285.885)',
    950: 'oklch(0.141 0.005 285.823)',
  },
  neutral: {
    50: 'oklch(0.985 0 0)',
    100: 'oklch(0.97 0 0)',
    200: 'oklch(0.922 0 0)',
    300: 'oklch(0.87 0 0)',
    400: 'oklch(0.708 0 0)',
    500: 'oklch(0.556 0 0)',
    600: 'oklch(0.439 0 0)',
    700: 'oklch(0.371 0 0)',
    800: 'oklch(0.269 0 0)',
    900: 'oklch(0.205 0 0)',
    950: 'oklch(0.145 0 0)',
  },
  stone: {
    50: 'oklch(0.985 0.001 106.423)',
    100: 'oklch(0.97 0.001 106.424)',
    200: 'oklch(0.923 0.003 48.717)',
    300: 'oklch(0.869 0.005 56.366)',
    400: 'oklch(0.709 0.01 56.259)',
    500: 'oklch(0.553 0.013 58.071)',
    600: 'oklch(0.444 0.011 73.639)',
    700: 'oklch(0.374 0.01 67.558)',
    800: 'oklch(0.268 0.007 34.298)',
    900: 'oklch(0.216 0.006 56.043)',
    950: 'oklch(0.147 0.004 49.25)',
  },
  red: {
    50: 'oklch(0.971 0.013 17.38)',
    100: 'oklch(0.936 0.032 17.717)',
    200: 'oklch(0.885 0.062 18.334)',
    300: 'oklch(0.808 0.114 19.571)',
    400: 'oklch(0.704 0.191 22.216)',
    500: 'oklch(0.637 0.237 25.331)',
    600: 'oklch(0.577 0.245 27.325)',
    700: 'oklch(0.505 0.213 27.518)',
    800: 'oklch(0.444 0.177 26.899)',
    900: 'oklch(0.396 0.141 25.723)',
    950: 'oklch(0.258 0.092 26.042)',
  },
  orange: {
    50: 'oklch(0.98 0.016 73.684)',
    100: 'oklch(0.954 0.038 75.164)',
    200: 'oklch(0.901 0.076 70.697)',
    300: 'oklch(0.837 0.128 66.29)',
    400: 'oklch(0.75 0.183 55.934)',
    500: 'oklch(0.705 0.213 47.604)',
    600: 'oklch(0.646 0.222 41.116)',
    700: 'oklch(0.553 0.195 38.402)',
    800: 'oklch(0.47 0.157 37.304)',
    900: 'oklch(0.408 0.123 38.172)',
    950: 'oklch(0.266 0.079 36.259)',
  },
  amber: {
    50: 'oklch(0.987 0.022 95.277)',
    100: 'oklch(0.962 0.059 95.617)',
    200: 'oklch(0.924 0.12 95.746)',
    300: 'oklch(0.879 0.169 91.605)',
    400: 'oklch(0.828 0.189 84.429)',
    500: 'oklch(0.769 0.188 70.08)',
    600: 'oklch(0.666 0.179 58.318)',
    700: 'oklch(0.555 0.163 48.998)',
    800: 'oklch(0.473 0.137 46.201)',
    900: 'oklch(0.414 0.112 45.904)',
    950: 'oklch(0.279 0.077 45.635)',
  },
  yellow: {
    50: 'oklch(0.987 0.026 102.212)',
    100: 'oklch(0.973 0.071 103.193)',
    200: 'oklch(0.945 0.129 101.54)',
    300: 'oklch(0.905 0.182 98.111)',
    400: 'oklch(0.852 0.199 91.936)',
    500: 'oklch(0.795 0.184 86.047)',
    600: 'oklch(0.681 0.162 75.834)',
    700: 'oklch(0.554 0.135 66.442)',
    800: 'oklch(0.476 0.114 61.907)',
    900: 'oklch(0.421 0.095 57.708)',
    950: 'oklch(0.286 0.066 53.813)',
  },
  lime: {
    50: 'oklch(0.986 0.031 120.757)',
    100: 'oklch(0.967 0.067 122.328)',
    200: 'oklch(0.938 0.127 124.321)',
    300: 'oklch(0.897 0.196 126.665)',
    400: 'oklch(0.841 0.238 128.85)',
    500: 'oklch(0.768 0.233 130.85)',
    600: 'oklch(0.648 0.2 131.684)',
    700: 'oklch(0.532 0.157 131.589)',
    800: 'oklch(0.453 0.124 130.933)',
    900: 'oklch(0.405 0.101 131.063)',
    950: 'oklch(0.274 0.072 132.109)',
  },
  green: {
    50: 'oklch(0.982 0.018 155.826)',
    100: 'oklch(0.962 0.044 156.743)',
    200: 'oklch(0.925 0.084 155.995)',
    300: 'oklch(0.871 0.15 154.449)',
    400: 'oklch(0.792 0.209 151.711)',
    500: 'oklch(0.723 0.219 149.579)',
    600: 'oklch(0.627 0.194 149.214)',
    700: 'oklch(0.527 0.154 150.069)',
    800: 'oklch(0.448 0.119 151.328)',
    900: 'oklch(0.393 0.095 152.535)',
    950: 'oklch(0.266 0.065 152.934)',
  },
  emerald: {
    50: 'oklch(0.979 0.021 166.113)',
    100: 'oklch(0.95 0.052 163.051)',
    200: 'oklch(0.905 0.093 164.15)',
    300: 'oklch(0.845 0.143 164.978)',
    400: 'oklch(0.765 0.177 163.223)',
    500: 'oklch(0.696 0.17 162.48)',
    600: 'oklch(0.596 0.145 163.225)',
    700: 'oklch(0.508 0.118 165.612)',
    800: 'oklch(0.432 0.095 166.913)',
    900: 'oklch(0.378 0.077 168.94)',
    950: 'oklch(0.262 0.051 172.552)',
  },
  teal: {
    50: 'oklch(0.984 0.014 180.72)',
    100: 'oklch(0.953 0.051 180.801)',
    200: 'oklch(0.91 0.096 180.426)',
    300: 'oklch(0.855 0.138 181.071)',
    400: 'oklch(0.777 0.152 181.912)',
    500: 'oklch(0.704 0.14 182.503)',
    600: 'oklch(0.6 0.118 184.704)',
    700: 'oklch(0.511 0.096 186.391)',
    800: 'oklch(0.437 0.078 188.216)',
    900: 'oklch(0.386 0.063 188.416)',
    950: 'oklch(0.277 0.046 192.524)',
  },
  cyan: {
    50: 'oklch(0.984 0.019 200.873)',
    100: 'oklch(0.956 0.045 203.388)',
    200: 'oklch(0.917 0.08 205.041)',
    300: 'oklch(0.865 0.127 207.078)',
    400: 'oklch(0.789 0.154 211.53)',
    500: 'oklch(0.715 0.143 215.221)',
    600: 'oklch(0.609 0.126 221.723)',
    700: 'oklch(0.52 0.105 223.128)',
    800: 'oklch(0.45 0.085 224.283)',
    900: 'oklch(0.398 0.07 227.392)',
    950: 'oklch(0.302 0.056 229.695)',
  },
  sky: {
    50: 'oklch(0.977 0.013 236.62)',
    100: 'oklch(0.951 0.026 236.824)',
    200: 'oklch(0.901 0.058 230.902)',
    300: 'oklch(0.828 0.111 230.318)',
    400: 'oklch(0.746 0.16 232.661)',
    500: 'oklch(0.685 0.169 237.323)',
    600: 'oklch(0.588 0.158 241.966)',
    700: 'oklch(0.5 0.134 242.749)',
    800: 'oklch(0.443 0.11 240.79)',
    900: 'oklch(0.391 0.09 240.876)',
    950: 'oklch(0.293 0.066 243.157)',
  },
  blue: {
    50: 'oklch(0.97 0.014 254.604)',
    100: 'oklch(0.932 0.032 255.585)',
    200: 'oklch(0.882 0.059 254.128)',
    300: 'oklch(0.809 0.105 251.813)',
    400: 'oklch(0.707 0.165 254.624)',
    500: 'oklch(0.623 0.214 259.815)',
    600: 'oklch(0.546 0.245 262.881)',
    700: 'oklch(0.488 0.243 264.376)',
    800: 'oklch(0.424 0.199 265.638)',
    900: 'oklch(0.379 0.146 265.522)',
    950: 'oklch(0.282 0.091 267.935)',
  },
  indigo: {
    50: 'oklch(0.962 0.018 272.314)',
    100: 'oklch(0.93 0.034 272.788)',
    200: 'oklch(0.87 0.065 274.039)',
    300: 'oklch(0.785 0.115 274.713)',
    400: 'oklch(0.673 0.182 276.935)',
    500: 'oklch(0.585 0.233 277.117)',
    600: 'oklch(0.511 0.262 276.966)',
    700: 'oklch(0.457 0.24 277.023)',
    800: 'oklch(0.398 0.195 277.366)',
    900: 'oklch(0.359 0.144 278.697)',
    950: 'oklch(0.257 0.09 281.288)',
  },
  violet: {
    50: 'oklch(0.969 0.016 293.756)',
    100: 'oklch(0.943 0.029 294.588)',
    200: 'oklch(0.894 0.057 293.283)',
    300: 'oklch(0.811 0.111 293.571)',
    400: 'oklch(0.702 0.183 293.541)',
    500: 'oklch(0.606 0.25 292.717)',
    600: 'oklch(0.541 0.281 293.009)',
    700: 'oklch(0.491 0.27 292.581)',
    800: 'oklch(0.432 0.232 292.759)',
    900: 'oklch(0.38 0.189 293.745)',
    950: 'oklch(0.283 0.141 291.089)',
  },
  purple: {
    50: 'oklch(0.977 0.014 308.299)',
    100: 'oklch(0.946 0.033 307.174)',
    200: 'oklch(0.902 0.063 306.703)',
    300: 'oklch(0.827 0.119 306.383)',
    400: 'oklch(0.714 0.203 305.504)',
    500: 'oklch(0.627 0.265 303.9)',
    600: 'oklch(0.558 0.288 302.321)',
    700: 'oklch(0.496 0.265 301.924)',
    800: 'oklch(0.438 0.218 303.724)',
    900: 'oklch(0.381 0.176 304.987)',
    950: 'oklch(0.291 0.149 302.717)',
  },
  fuchsia: {
    50: 'oklch(0.977 0.017 320.058)',
    100: 'oklch(0.952 0.037 318.852)',
    200: 'oklch(0.903 0.076 319.62)',
    300: 'oklch(0.833 0.145 321.434)',
    400: 'oklch(0.74 0.238 322.16)',
    500: 'oklch(0.667 0.295 322.15)',
    600: 'oklch(0.591 0.293 322.896)',
    700: 'oklch(0.518 0.253 323.949)',
    800: 'oklch(0.452 0.211 324.591)',
    900: 'oklch(0.401 0.17 325.612)',
    950: 'oklch(0.293 0.136 325.661)',
  },
  pink: {
    50: 'oklch(0.971 0.014 343.198)',
    100: 'oklch(0.948 0.028 342.258)',
    200: 'oklch(0.899 0.061 343.231)',
    300: 'oklch(0.823 0.12 346.018)',
    400: 'oklch(0.718 0.202 349.761)',
    500: 'oklch(0.656 0.241 354.308)',
    600: 'oklch(0.592 0.249 0.584)',
    700: 'oklch(0.525 0.223 3.958)',
    800: 'oklch(0.459 0.187 3.815)',
    900: 'oklch(0.408 0.153 2.432)',
    950: 'oklch(0.284 0.109 3.907)',
  },
  rose: {
    50: 'oklch(0.969 0.015 12.422)',
    100: 'oklch(0.941 0.03 12.58)',
    200: 'oklch(0.892 0.058 10.001)',
    300: 'oklch(0.81 0.117 11.638)',
    400: 'oklch(0.712 0.194 13.428)',
    500: 'oklch(0.645 0.246 16.439)',
    600: 'oklch(0.586 0.253 17.585)',
    700: 'oklch(0.514 0.222 16.935)',
    800: 'oklch(0.455 0.188 13.697)',
    900: 'oklch(0.41 0.159 10.272)',
    950: 'oklch(0.271 0.105 12.094)',
  },
};
function ue(t) {
  return { __BARE_VALUE__: t };
}
let Z = ue((t) => {
    if (N(t.value)) {return t.value;}
  }),
  q = ue((t) => {
    if (N(t.value)) {return `${t.value}%`;}
  }),
  re = ue((t) => {
    if (N(t.value)) {return `${t.value}px`;}
  }),
  Or = ue((t) => {
    if (N(t.value)) {return `${t.value}ms`;}
  }),
  He = ue((t) => {
    if (N(t.value)) {return `${t.value}deg`;}
  }),
  hn = ue((t) => {
    if (t.fraction === null) {return;}
    let [r, o] = K(t.fraction, '/');
    if (!(!N(r) || !N(o))) {return t.fraction;}
  }),
  Kr = ue((t) => {
    if (N(Number(t.value))) {return `repeat(${t.value}, minmax(0, 1fr))`;}
  }),
  zr = {
    accentColor: ({ theme: t }) => t('colors'),
    animation: {
      none: 'none',
      spin: 'spin 1s linear infinite',
      ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      bounce: 'bounce 1s infinite',
    },
    aria: {
      busy: 'busy="true"',
      checked: 'checked="true"',
      disabled: 'disabled="true"',
      expanded: 'expanded="true"',
      hidden: 'hidden="true"',
      pressed: 'pressed="true"',
      readonly: 'readonly="true"',
      required: 'required="true"',
      selected: 'selected="true"',
    },
    aspectRatio: { auto: 'auto', square: '1 / 1', video: '16 / 9', ...hn },
    backdropBlur: ({ theme: t }) => t('blur'),
    backdropBrightness: ({ theme: t }) => ({ ...t('brightness'), ...q }),
    backdropContrast: ({ theme: t }) => ({ ...t('contrast'), ...q }),
    backdropGrayscale: ({ theme: t }) => ({ ...t('grayscale'), ...q }),
    backdropHueRotate: ({ theme: t }) => ({ ...t('hueRotate'), ...He }),
    backdropInvert: ({ theme: t }) => ({ ...t('invert'), ...q }),
    backdropOpacity: ({ theme: t }) => ({ ...t('opacity'), ...q }),
    backdropSaturate: ({ theme: t }) => ({ ...t('saturate'), ...q }),
    backdropSepia: ({ theme: t }) => ({ ...t('sepia'), ...q }),
    backgroundColor: ({ theme: t }) => t('colors'),
    backgroundImage: {
      none: 'none',
      'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
      'gradient-to-tr': 'linear-gradient(to top right, var(--tw-gradient-stops))',
      'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
      'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      'gradient-to-bl': 'linear-gradient(to bottom left, var(--tw-gradient-stops))',
      'gradient-to-l': 'linear-gradient(to left, var(--tw-gradient-stops))',
      'gradient-to-tl': 'linear-gradient(to top left, var(--tw-gradient-stops))',
    },
    backgroundOpacity: ({ theme: t }) => t('opacity'),
    backgroundPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },
    backgroundSize: { auto: 'auto', cover: 'cover', contain: 'contain' },
    blur: {
      0: '0',
      none: '',
      sm: '4px',
      DEFAULT: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      '2xl': '40px',
      '3xl': '64px',
    },
    borderColor: ({ theme: t }) => ({ DEFAULT: 'currentColor', ...t('colors') }),
    borderOpacity: ({ theme: t }) => t('opacity'),
    borderRadius: {
      none: '0px',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },
    borderSpacing: ({ theme: t }) => t('spacing'),
    borderWidth: { DEFAULT: '1px', 0: '0px', 2: '2px', 4: '4px', 8: '8px', ...re },
    boxShadow: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      none: 'none',
    },
    boxShadowColor: ({ theme: t }) => t('colors'),
    brightness: {
      0: '0',
      50: '.5',
      75: '.75',
      90: '.9',
      95: '.95',
      100: '1',
      105: '1.05',
      110: '1.1',
      125: '1.25',
      150: '1.5',
      200: '2',
      ...q,
    },
    caretColor: ({ theme: t }) => t('colors'),
    colors: () => ({ ...qe }),
    columns: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      '3xs': '16rem',
      '2xs': '18rem',
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      '7xl': '80rem',
      ...Z,
    },
    container: {},
    content: { none: 'none' },
    contrast: { 0: '0', 50: '.5', 75: '.75', 100: '1', 125: '1.25', 150: '1.5', 200: '2', ...q },
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      help: 'help',
      'not-allowed': 'not-allowed',
      none: 'none',
      'context-menu': 'context-menu',
      progress: 'progress',
      cell: 'cell',
      crosshair: 'crosshair',
      'vertical-text': 'vertical-text',
      alias: 'alias',
      copy: 'copy',
      'no-drop': 'no-drop',
      grab: 'grab',
      grabbing: 'grabbing',
      'all-scroll': 'all-scroll',
      'col-resize': 'col-resize',
      'row-resize': 'row-resize',
      'n-resize': 'n-resize',
      'e-resize': 'e-resize',
      's-resize': 's-resize',
      'w-resize': 'w-resize',
      'ne-resize': 'ne-resize',
      'nw-resize': 'nw-resize',
      'se-resize': 'se-resize',
      'sw-resize': 'sw-resize',
      'ew-resize': 'ew-resize',
      'ns-resize': 'ns-resize',
      'nesw-resize': 'nesw-resize',
      'nwse-resize': 'nwse-resize',
      'zoom-in': 'zoom-in',
      'zoom-out': 'zoom-out',
    },
    divideColor: ({ theme: t }) => t('borderColor'),
    divideOpacity: ({ theme: t }) => t('borderOpacity'),
    divideWidth: ({ theme: t }) => ({ ...t('borderWidth'), ...re }),
    dropShadow: {
      sm: '0 1px 1px rgb(0 0 0 / 0.05)',
      DEFAULT: ['0 1px 2px rgb(0 0 0 / 0.1)', '0 1px 1px rgb(0 0 0 / 0.06)'],
      md: ['0 4px 3px rgb(0 0 0 / 0.07)', '0 2px 2px rgb(0 0 0 / 0.06)'],
      lg: ['0 10px 8px rgb(0 0 0 / 0.04)', '0 4px 3px rgb(0 0 0 / 0.1)'],
      xl: ['0 20px 13px rgb(0 0 0 / 0.03)', '0 8px 5px rgb(0 0 0 / 0.08)'],
      '2xl': '0 25px 25px rgb(0 0 0 / 0.15)',
      none: '0 0 #0000',
    },
    fill: ({ theme: t }) => t('colors'),
    flex: { 1: '1 1 0%', auto: '1 1 auto', initial: '0 1 auto', none: 'none' },
    flexBasis: ({ theme: t }) => ({
      auto: 'auto',
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      full: '100%',
      ...t('spacing'),
    }),
    flexGrow: { 0: '0', DEFAULT: '1', ...Z },
    flexShrink: { 0: '0', DEFAULT: '1', ...Z },
    fontFamily: {
      sans: [
        'ui-sans-serif',
        'system-ui',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    gap: ({ theme: t }) => t('spacing'),
    gradientColorStops: ({ theme: t }) => t('colors'),
    gradientColorStopPositions: {
      '0%': '0%',
      '5%': '5%',
      '10%': '10%',
      '15%': '15%',
      '20%': '20%',
      '25%': '25%',
      '30%': '30%',
      '35%': '35%',
      '40%': '40%',
      '45%': '45%',
      '50%': '50%',
      '55%': '55%',
      '60%': '60%',
      '65%': '65%',
      '70%': '70%',
      '75%': '75%',
      '80%': '80%',
      '85%': '85%',
      '90%': '90%',
      '95%': '95%',
      '100%': '100%',
      ...q,
    },
    grayscale: { 0: '0', DEFAULT: '100%', ...q },
    gridAutoColumns: { auto: 'auto', min: 'min-content', max: 'max-content', fr: 'minmax(0, 1fr)' },
    gridAutoRows: { auto: 'auto', min: 'min-content', max: 'max-content', fr: 'minmax(0, 1fr)' },
    gridColumn: {
      auto: 'auto',
      'span-1': 'span 1 / span 1',
      'span-2': 'span 2 / span 2',
      'span-3': 'span 3 / span 3',
      'span-4': 'span 4 / span 4',
      'span-5': 'span 5 / span 5',
      'span-6': 'span 6 / span 6',
      'span-7': 'span 7 / span 7',
      'span-8': 'span 8 / span 8',
      'span-9': 'span 9 / span 9',
      'span-10': 'span 10 / span 10',
      'span-11': 'span 11 / span 11',
      'span-12': 'span 12 / span 12',
      'span-full': '1 / -1',
    },
    gridColumnEnd: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
      ...Z,
    },
    gridColumnStart: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
      ...Z,
    },
    gridRow: {
      auto: 'auto',
      'span-1': 'span 1 / span 1',
      'span-2': 'span 2 / span 2',
      'span-3': 'span 3 / span 3',
      'span-4': 'span 4 / span 4',
      'span-5': 'span 5 / span 5',
      'span-6': 'span 6 / span 6',
      'span-7': 'span 7 / span 7',
      'span-8': 'span 8 / span 8',
      'span-9': 'span 9 / span 9',
      'span-10': 'span 10 / span 10',
      'span-11': 'span 11 / span 11',
      'span-12': 'span 12 / span 12',
      'span-full': '1 / -1',
    },
    gridRowEnd: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
      ...Z,
    },
    gridRowStart: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
      ...Z,
    },
    gridTemplateColumns: {
      none: 'none',
      subgrid: 'subgrid',
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      5: 'repeat(5, minmax(0, 1fr))',
      6: 'repeat(6, minmax(0, 1fr))',
      7: 'repeat(7, minmax(0, 1fr))',
      8: 'repeat(8, minmax(0, 1fr))',
      9: 'repeat(9, minmax(0, 1fr))',
      10: 'repeat(10, minmax(0, 1fr))',
      11: 'repeat(11, minmax(0, 1fr))',
      12: 'repeat(12, minmax(0, 1fr))',
      ...Kr,
    },
    gridTemplateRows: {
      none: 'none',
      subgrid: 'subgrid',
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      5: 'repeat(5, minmax(0, 1fr))',
      6: 'repeat(6, minmax(0, 1fr))',
      7: 'repeat(7, minmax(0, 1fr))',
      8: 'repeat(8, minmax(0, 1fr))',
      9: 'repeat(9, minmax(0, 1fr))',
      10: 'repeat(10, minmax(0, 1fr))',
      11: 'repeat(11, minmax(0, 1fr))',
      12: 'repeat(12, minmax(0, 1fr))',
      ...Kr,
    },
    height: ({ theme: t }) => ({
      auto: 'auto',
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      full: '100%',
      screen: '100vh',
      svh: '100svh',
      lvh: '100lvh',
      dvh: '100dvh',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      ...t('spacing'),
    }),
    hueRotate: { 0: '0deg', 15: '15deg', 30: '30deg', 60: '60deg', 90: '90deg', 180: '180deg', ...He },
    inset: ({ theme: t }) => ({
      auto: 'auto',
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      full: '100%',
      ...t('spacing'),
    }),
    invert: { 0: '0', DEFAULT: '100%', ...q },
    keyframes: {
      spin: { to: { transform: 'rotate(360deg)' } },
      ping: { '75%, 100%': { transform: 'scale(2)', opacity: '0' } },
      pulse: { '50%': { opacity: '.5' } },
      bounce: {
        '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
        '50%': { transform: 'none', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
      },
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
      3: '.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
    },
    listStyleType: { none: 'none', disc: 'disc', decimal: 'decimal' },
    listStyleImage: { none: 'none' },
    margin: ({ theme: t }) => ({ auto: 'auto', ...t('spacing') }),
    lineClamp: { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', ...Z },
    maxHeight: ({ theme: t }) => ({
      none: 'none',
      full: '100%',
      screen: '100vh',
      svh: '100svh',
      lvh: '100lvh',
      dvh: '100dvh',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      ...t('spacing'),
    }),
    maxWidth: ({ theme: t }) => ({
      none: 'none',
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      '7xl': '80rem',
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      prose: '65ch',
      ...t('spacing'),
    }),
    minHeight: ({ theme: t }) => ({
      full: '100%',
      screen: '100vh',
      svh: '100svh',
      lvh: '100lvh',
      dvh: '100dvh',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      ...t('spacing'),
    }),
    minWidth: ({ theme: t }) => ({
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      ...t('spacing'),
    }),
    objectPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },
    opacity: {
      0: '0',
      5: '0.05',
      10: '0.1',
      15: '0.15',
      20: '0.2',
      25: '0.25',
      30: '0.3',
      35: '0.35',
      40: '0.4',
      45: '0.45',
      50: '0.5',
      55: '0.55',
      60: '0.6',
      65: '0.65',
      70: '0.7',
      75: '0.75',
      80: '0.8',
      85: '0.85',
      90: '0.9',
      95: '0.95',
      100: '1',
      ...q,
    },
    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      ...Z,
    },
    outlineColor: ({ theme: t }) => t('colors'),
    outlineOffset: { 0: '0px', 1: '1px', 2: '2px', 4: '4px', 8: '8px', ...re },
    outlineWidth: { 0: '0px', 1: '1px', 2: '2px', 4: '4px', 8: '8px', ...re },
    padding: ({ theme: t }) => t('spacing'),
    placeholderColor: ({ theme: t }) => t('colors'),
    placeholderOpacity: ({ theme: t }) => t('opacity'),
    ringColor: ({ theme: t }) => ({ DEFAULT: 'currentColor', ...t('colors') }),
    ringOffsetColor: ({ theme: t }) => t('colors'),
    ringOffsetWidth: { 0: '0px', 1: '1px', 2: '2px', 4: '4px', 8: '8px', ...re },
    ringOpacity: ({ theme: t }) => ({ DEFAULT: '0.5', ...t('opacity') }),
    ringWidth: { DEFAULT: '3px', 0: '0px', 1: '1px', 2: '2px', 4: '4px', 8: '8px', ...re },
    rotate: {
      0: '0deg',
      1: '1deg',
      2: '2deg',
      3: '3deg',
      6: '6deg',
      12: '12deg',
      45: '45deg',
      90: '90deg',
      180: '180deg',
      ...He,
    },
    saturate: { 0: '0', 50: '.5', 100: '1', 150: '1.5', 200: '2', ...q },
    scale: {
      0: '0',
      50: '.5',
      75: '.75',
      90: '.9',
      95: '.95',
      100: '1',
      105: '1.05',
      110: '1.1',
      125: '1.25',
      150: '1.5',
      ...q,
    },
    screens: { sm: '40rem', md: '48rem', lg: '64rem', xl: '80rem', '2xl': '96rem' },
    scrollMargin: ({ theme: t }) => t('spacing'),
    scrollPadding: ({ theme: t }) => t('spacing'),
    sepia: { 0: '0', DEFAULT: '100%', ...q },
    skew: { 0: '0deg', 1: '1deg', 2: '2deg', 3: '3deg', 6: '6deg', 12: '12deg', ...He },
    space: ({ theme: t }) => t('spacing'),
    spacing: {
      px: '1px',
      0: '0px',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
    },
    stroke: ({ theme: t }) => ({ none: 'none', ...t('colors') }),
    strokeWidth: { 0: '0', 1: '1', 2: '2', ...Z },
    supports: {},
    data: {},
    textColor: ({ theme: t }) => t('colors'),
    textDecorationColor: ({ theme: t }) => t('colors'),
    textDecorationThickness: {
      auto: 'auto',
      'from-font': 'from-font',
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
      ...re,
    },
    textIndent: ({ theme: t }) => t('spacing'),
    textOpacity: ({ theme: t }) => t('opacity'),
    textUnderlineOffset: { auto: 'auto', 0: '0px', 1: '1px', 2: '2px', 4: '4px', 8: '8px', ...re },
    transformOrigin: {
      center: 'center',
      top: 'top',
      'top-right': 'top right',
      right: 'right',
      'bottom-right': 'bottom right',
      bottom: 'bottom',
      'bottom-left': 'bottom left',
      left: 'left',
      'top-left': 'top left',
    },
    transitionDelay: {
      0: '0s',
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1e3: '1000ms',
      ...Or,
    },
    transitionDuration: {
      DEFAULT: '150ms',
      0: '0s',
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1e3: '1000ms',
      ...Or,
    },
    transitionProperty: {
      none: 'none',
      all: 'all',
      DEFAULT:
        'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
      colors: 'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke',
      opacity: 'opacity',
      shadow: 'box-shadow',
      transform: 'transform',
    },
    transitionTimingFunction: {
      DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    translate: ({ theme: t }) => ({
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      full: '100%',
      ...t('spacing'),
    }),
    size: ({ theme: t }) => ({
      auto: 'auto',
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      ...t('spacing'),
    }),
    width: ({ theme: t }) => ({
      auto: 'auto',
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      full: '100%',
      screen: '100vw',
      svw: '100svw',
      lvw: '100lvw',
      dvw: '100dvw',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      ...t('spacing'),
    }),
    willChange: { auto: 'auto', scroll: 'scroll-position', contents: 'contents', transform: 'transform' },
    zIndex: { auto: 'auto', 0: '0', 10: '10', 20: '20', 30: '30', 40: '40', 50: '50', ...Z },
  };
function Pr(t) {
  return {
    theme: {
      ...zr,
      colors: ({ theme: r }) => r('color', {}),
      extend: {
        fontSize: ({ theme: r }) => ({ ...r('text', {}) }),
        boxShadow: ({ theme: r }) => ({ ...r('shadow', {}) }),
        animation: ({ theme: r }) => ({ ...r('animate', {}) }),
        aspectRatio: ({ theme: r }) => ({ ...r('aspect', {}) }),
        borderRadius: ({ theme: r }) => ({ ...r('radius', {}) }),
        screens: ({ theme: r }) => ({ ...r('breakpoint', {}) }),
        letterSpacing: ({ theme: r }) => ({ ...r('tracking', {}) }),
        lineHeight: ({ theme: r }) => ({ ...r('leading', {}) }),
        transitionDuration: { DEFAULT: t.get(['--default-transition-duration']) ?? null },
        transitionTimingFunction: { DEFAULT: t.get(['--default-transition-timing-function']) ?? null },
        maxWidth: ({ theme: r }) => ({ ...r('container', {}) }),
      },
    },
  };
}
let bn = {
  blocklist: [],
  future: {},
  prefix: '',
  important: !1,
  darkMode: null,
  theme: {},
  plugins: [],
  content: { files: [] },
};
function yt(t, r) {
  let o = {
    design: t,
    configs: [],
    plugins: [],
    content: { files: [] },
    theme: {},
    extend: {},
    result: structuredClone(bn),
  };
  for (let n of r) {bt(o, n);}
  for (let n of o.configs)
    {'darkMode' in n && n.darkMode !== void 0 && (o.result.darkMode = n.darkMode ?? null),
      'prefix' in n && n.prefix !== void 0 && (o.result.prefix = n.prefix ?? ''),
      'blocklist' in n && n.blocklist !== void 0 && (o.result.blocklist = n.blocklist ?? []),
      'important' in n && n.important !== void 0 && (o.result.important = n.important ?? !1);}
  let e = vn(o);
  return {
    resolvedConfig: { ...o.result, content: o.content, theme: o.theme, plugins: o.plugins },
    replacedThemeKeys: e,
  };
}
function yn(t, r) {
  if (Array.isArray(t) && be(t[0])) {return t.concat(r);}
  if (Array.isArray(r) && be(r[0]) && be(t)) {return [t, ...r];}
  if (Array.isArray(r)) {return r;}
}
function bt(t, { config: r, base: o, path: e, reference: n }) {
  let s = [];
  for (let d of r.plugins ?? [])
    {'__isOptionsFunction' in d
      ? s.push({ ...d(), reference: n })
      : 'handler' in d
      ? s.push({ ...d, reference: n })
      : s.push({ handler: d, reference: n });}
  if (Array.isArray(r.presets) && r.presets.length === 0)
    {throw new Error(
      'Error in the config file/plugin/preset. An empty preset (`preset: []`) is not currently supported.'
    );}
  for (let d of r.presets ?? []) {bt(t, { path: e, base: o, config: d, reference: n });}
  for (let d of s)
    {t.plugins.push(d), d.config && bt(t, { path: e, base: o, config: d.config, reference: !!d.reference });}
  let l = r.content ?? [],
    f = Array.isArray(l) ? l : l.files;
  for (let d of f) {t.content.files.push(typeof d === 'object' ? d : { base: o, pattern: d });}
  t.configs.push(r);
}
function vn(t) {
  let r = new Set(),
    o = Me(t.design, () => t.theme, n),
    e = Object.assign(o, { theme: o, colors: qe });
  function n(s) {
    return typeof s === 'function' ? s(e) ?? null : s ?? null;
  }
  for (let s of t.configs) {
    let l = s.theme ?? {},
      f = l.extend ?? {};
    for (let d in l) {d !== 'extend' && r.add(d);}
    Object.assign(t.theme, l);
    for (let d in f) {(t.extend[d] ??= []), t.extend[d].push(f[d]);}
  }
  delete t.theme.extend;
  for (let s in t.extend) {
    let l = [t.theme[s], ...t.extend[s]];
    t.theme[s] = () => {
      let f = l.map(n);
      return $e({}, f, yn);
    };
  }
  for (let s in t.theme) {t.theme[s] = n(t.theme[s]);}
  if (t.theme.screens && typeof t.theme.screens === 'object')
    {for (let s of Object.keys(t.theme.screens)) {
      let l = t.theme.screens[s];
      l && typeof l === 'object' && ('raw' in l || 'max' in l || ('min' in l && (t.theme.screens[s] = l.min)));
    }}
  return r;
}
function _r(t, r) {
  let o = t.theme.container || {};
  if (typeof o !== 'object' || o === null) {return;}
  let e = kn(o, r);
  e.length !== 0 && r.utilities.static('container', () => structuredClone(e));
}
function kn({ center: t, padding: r, screens: o }, e) {
  let n = [],
    s = null;
  if (
    (t && n.push(a('margin-inline', 'auto')),
    (typeof r === 'string' || (typeof r === 'object' && r !== null && 'DEFAULT' in r)) &&
      n.push(a('padding-inline', typeof r === 'string' ? r : r.DEFAULT)),
    typeof o === 'object' && o !== null)
  ) {
    s = new Map();
    let l = Array.from(e.theme.namespace('--breakpoint').entries());
    if ((l.sort((f, d) => le(f[1], d[1], 'asc')), l.length > 0)) {
      let [f] = l[0];
      n.push(P('@media', `(width >= --theme(--breakpoint-${f}))`, [a('max-width', 'none')]));
    }
    for (let [f, d] of Object.entries(o)) {
      if (typeof d === 'object')
        {if ('min' in d) {d = d.min;}
        else {continue;}}
      s.set(f, P('@media', `(width >= ${d})`, [a('max-width', d)]));
    }
  }
  if (typeof r === 'object' && r !== null) {
    let l = Object.entries(r)
      .filter(([f]) => f !== 'DEFAULT')
      .map(([f, d]) => [f, e.theme.resolveValue(f, ['--breakpoint']), d])
      .filter(Boolean);
    l.sort((f, d) => le(f[1], d[1], 'asc'));
    for (let [f, , d] of l)
      {if (s && s.has(f)) {s.get(f).nodes.push(a('padding-inline', d));}
      else {
        if (s) {continue;}
        n.push(P('@media', `(width >= theme(--breakpoint-${f}))`, [a('padding-inline', d)]));
      }}
  }
  if (s) {for (let [, l] of s) {n.push(l);}}
  return n;
}
function Dr({ addVariant: t, config: r }) {
  let o = r('darkMode', null),
    [e, n = '.dark'] = Array.isArray(o) ? o : [o];
  if (e === 'variant') {
    let s;
    if ((Array.isArray(n) || typeof n === 'function' ? (s = n) : typeof n === 'string' && (s = [n]), Array.isArray(s)))
      {for (let l of s)
        {l === '.dark'
          ? ((e = !1),
            console.warn(
              'When using `variant` for `darkMode`, you must provide a selector.\nExample: `darkMode: ["variant", ".your-selector &"]`'
            ))
          : l.includes('&') ||
            ((e = !1),
            console.warn(
              'When using `variant` for `darkMode`, your selector must contain `&`.\nExample `darkMode: ["variant", ".your-selector &"]`'
            ));}}
    n = s;
  }
  e === null ||
    (e === 'selector'
      ? t('dark', `&:where(${n}, ${n} *)`)
      : e === 'media'
      ? t('dark', '@media (prefers-color-scheme: dark)')
      : e === 'variant'
      ? t('dark', n)
      : e === 'class' && t('dark', `&:is(${n} *)`));
}
function Ur(t) {
  for (let [r, o] of [
    ['t', 'top'],
    ['tr', 'top right'],
    ['r', 'right'],
    ['br', 'bottom right'],
    ['b', 'bottom'],
    ['bl', 'bottom left'],
    ['l', 'left'],
    ['tl', 'top left'],
  ])
    {t.utilities.static(`bg-gradient-to-${r}`, () => [
      a('--tw-gradient-position', `to ${o} in oklab,`),
      a('background-image', 'linear-gradient(var(--tw-gradient-stops))'),
    ]);}
  t.utilities.functional('max-w-screen', (r) => {
    if (!r.value || r.value.kind === 'arbitrary') {return;}
    let o = t.theme.resolve(r.value.value, ['--breakpoint']);
    if (o) {return [a('max-width', o)];}
  }),
    t.utilities.static('overflow-ellipsis', () => [a('text-overflow', 'ellipsis')]),
    t.utilities.static('decoration-slice', () => [
      a('-webkit-box-decoration-break', 'slice'),
      a('box-decoration-break', 'slice'),
    ]),
    t.utilities.static('decoration-clone', () => [
      a('-webkit-box-decoration-break', 'clone'),
      a('box-decoration-break', 'clone'),
    ]),
    t.utilities.functional('flex-shrink', (r) => {
      if (!r.modifier) {
        if (!r.value) {return [a('flex-shrink', '1')];}
        if (r.value.kind === 'arbitrary') {return [a('flex-shrink', r.value.value)];}
        if (N(r.value.value)) {return [a('flex-shrink', r.value.value)];}
      }
    }),
    t.utilities.functional('flex-grow', (r) => {
      if (!r.modifier) {
        if (!r.value) {return [a('flex-grow', '1')];}
        if (r.value.kind === 'arbitrary') {return [a('flex-grow', r.value.value)];}
        if (N(r.value.value)) {return [a('flex-grow', r.value.value)];}
      }
    });
}
function jr(t, r) {
  let o = t.theme.screens || {},
    e = r.variants.get('min')?.order ?? 0,
    n = [];
  for (let [l, f] of Object.entries(o)) {
    let h = function (y) {
      r.variants.static(
        l,
        (v) => {
          v.nodes = [P('@media', m, v.nodes)];
        },
        { order: y }
      );
    };
    let s = h;
    let d = r.variants.get(l),
      c = r.theme.resolveValue(l, ['--breakpoint']);
    if (d && c && !r.theme.hasDefault(`--breakpoint-${l}`)) {continue;}
    let p = !0;
    typeof f === 'string' && (p = !1);
    let m = wn(f);
    p ? n.push(h) : h(e);
  }
  if (n.length !== 0) {
    for (let [, l] of r.variants.variants) {l.order > e && (l.order += n.length);}
    r.variants.compareFns = new Map(
      Array.from(r.variants.compareFns).map(([l, f]) => (l > e && (l += n.length), [l, f]))
    );
    for (let [l, f] of n.entries()) {f(e + l + 1);}
  }
}
function wn(t) {
  return (Array.isArray(t) ? t : [t])
    .map((o) => (typeof o === 'string' ? { min: o } : o && typeof o === 'object' ? o : null))
    .map((o) => {
      if (o === null) {return null;}
      if ('raw' in o) {return o.raw;}
      let e = '';
      return (
        o.max !== void 0 && (e += `${o.max} >= `), (e += 'width'), o.min !== void 0 && (e += ` >= ${o.min}`), `(${e})`
      );
    })
    .filter(Boolean)
    .join(', ');
}
function Fr(t, r) {
  let o = t.theme.aria || {},
    e = t.theme.supports || {},
    n = t.theme.data || {};
  if (Object.keys(o).length > 0) {
    let s = r.variants.get('aria'),
      l = s?.applyFn,
      f = s?.compounds;
    r.variants.functional(
      'aria',
      (d, c) => {
        let p = c.value;
        return p && p.kind === 'named' && p.value in o
          ? l?.(d, { ...c, value: { kind: 'arbitrary', value: o[p.value] } })
          : l?.(d, c);
      },
      { compounds: f }
    );
  }
  if (Object.keys(e).length > 0) {
    let s = r.variants.get('supports'),
      l = s?.applyFn,
      f = s?.compounds;
    r.variants.functional(
      'supports',
      (d, c) => {
        let p = c.value;
        return p && p.kind === 'named' && p.value in e
          ? l?.(d, { ...c, value: { kind: 'arbitrary', value: e[p.value] } })
          : l?.(d, c);
      },
      { compounds: f }
    );
  }
  if (Object.keys(n).length > 0) {
    let s = r.variants.get('data'),
      l = s?.applyFn,
      f = s?.compounds;
    r.variants.functional(
      'data',
      (d, c) => {
        let p = c.value;
        return p && p.kind === 'named' && p.value in n
          ? l?.(d, { ...c, value: { kind: 'arbitrary', value: n[p.value] } })
          : l?.(d, c);
      },
      { compounds: f }
    );
  }
}
let xn = /^[a-z]+$/;
async function Lr({ designSystem: t, base: r, ast: o, loadModule: e, globs: n }) {
  let s = 0,
    l = [],
    f = [];
  _(o, (m, { parent: h, replaceWith: y, context: v }) => {
    if (m.kind === 'at-rule') {
      if (m.name === '@plugin') {
        if (h !== null) {throw new Error('`@plugin` cannot be nested.');}
        let b = m.params.slice(1, -1);
        if (b.length === 0) {throw new Error('`@plugin` must have a path.');}
        let x = {};
        for (let S of m.nodes ?? []) {
          if (S.kind !== 'declaration')
            {throw new Error(`Unexpected \`@plugin\` option:

${Y([S])}

\`@plugin\` options must be a flat list of declarations.`);}
          if (S.value === void 0) {continue;}
          let V = S.value,
            R = K(V, ',').map((E) => {
              if (((E = E.trim()), E === 'null')) {return null;}
              if (E === 'true') {return !0;}
              if (E === 'false') {return !1;}
              if (Number.isNaN(Number(E))) {
                if ((E[0] === '"' && E[E.length - 1] === '"') || (E[0] === "'" && E[E.length - 1] === "'"))
                  {return E.slice(1, -1);}
                if (E[0] === '{' && E[E.length - 1] === '}')
                  {throw new Error(`Unexpected \`@plugin\` option: Value of declaration \`${Y([
                    S,
                  ]).trim()}\` is not supported.

Using an object as a plugin option is currently only supported in JavaScript configuration files.`);}
              } else {return Number(E);}
              return E;
            });
          x[S.property] = R.length === 1 ? R[0] : R;
        }
        l.push([{ id: b, base: v.base, reference: !!v.reference }, Object.keys(x).length > 0 ? x : null]),
          y([]),
          (s |= 4);
        return;
      }
      if (m.name === '@config') {
        if (m.nodes.length > 0) {throw new Error('`@config` cannot have a body.');}
        if (h !== null) {throw new Error('`@config` cannot be nested.');}
        f.push({ id: m.params.slice(1, -1), base: v.base, reference: !!v.reference }), y([]), (s |= 4);
        return;
      }
    }
  }),
    Ur(t);
  let d = t.resolveThemeValue;
  if (
    ((t.resolveThemeValue = function (h) {
      return h.startsWith('--')
        ? d(h)
        : ((s |= Ir({ designSystem: t, base: r, ast: o, globs: n, configs: [], pluginDetails: [] })),
          t.resolveThemeValue(h));
    }),
    !l.length && !f.length)
  )
    {return 0;}
  let [c, p] = await Promise.all([
    Promise.all(
      f.map(async ({ id: m, base: h, reference: y }) => {
        let v = await e(m, h, 'config');
        return { path: m, base: v.base, config: v.module, reference: y };
      })
    ),
    Promise.all(
      l.map(async ([{ id: m, base: h, reference: y }, v]) => {
        let b = await e(m, h, 'plugin');
        return { path: m, base: b.base, plugin: b.module, options: v, reference: y };
      })
    ),
  ]);
  return (s |= Ir({ designSystem: t, base: r, ast: o, globs: n, configs: c, pluginDetails: p })), s;
}
function Ir({ designSystem: t, base: r, ast: o, globs: e, configs: n, pluginDetails: s }) {
  let l = 0,
    d = [
      ...s.map((b) => {
        if (!b.options) {return { config: { plugins: [b.plugin] }, base: b.base, reference: b.reference };}
        if ('__isOptionsFunction' in b.plugin)
          {return { config: { plugins: [b.plugin(b.options)] }, base: b.base, reference: b.reference };}
        throw new Error(`The plugin "${b.path}" does not accept options`);
      }),
      ...n,
    ],
    { resolvedConfig: c } = yt(t, [
      { config: Pr(t.theme), base: r, reference: !0 },
      ...d,
      { config: { plugins: [Dr] }, base: r, reference: !0 },
    ]),
    { resolvedConfig: p, replacedThemeKeys: m } = yt(t, d);
  t.resolveThemeValue = function (x, S) {
    let V = y.theme(x, S);
    if (Array.isArray(V) && V.length === 2) {return V[0];}
    if (Array.isArray(V)) {return V.join(', ');}
    if (typeof V === 'string') {return V;}
  };
  let h = {
      designSystem: t,
      ast: o,
      resolvedConfig: c,
      featuresRef: {
        set current(b) {
          l |= b;
        },
      },
    },
    y = ht({ ...h, referenceMode: !1 }),
    v;
  for (let { handler: b, reference: x } of c.plugins) {x ? ((v ||= ht({ ...h, referenceMode: !0 })), b(v)) : b(y);}
  if ((mr(t, p, m), Rr(t, p, m), Fr(p, t), jr(p, t), _r(p, t), !t.theme.prefix && c.prefix)) {
    if (
      (c.prefix.endsWith('-') &&
        ((c.prefix = c.prefix.slice(0, -1)),
        console.warn(
          `The prefix "${c.prefix}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only and is written as a variant before all utilities. We have fixed up the prefix for you. Remove the trailing \`-\` to silence this warning.`
        )),
      !xn.test(c.prefix))
    )
      {throw new Error(`The prefix "${c.prefix}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only.`);}
    t.theme.prefix = c.prefix;
  }
  if ((!t.important && c.important === !0 && (t.important = !0), typeof c.important === 'string')) {
    let b = c.important;
    _(o, (x, { replaceWith: S, parent: V }) => {
      if (x.kind === 'at-rule' && !(x.name !== '@tailwind' || x.params !== 'utilities'))
        {return V?.kind === 'rule' && V.selector === b ? 2 : (S(U(b, [x])), 2);}
    });
  }
  for (let b of c.blocklist) {t.invalidCandidates.add(b);}
  for (let b of c.content.files) {
    if ('raw' in b)
      {throw new Error(`Error in the config file/plugin/preset. The \`content\` key contains a \`raw\` entry:

${JSON.stringify(b, null, 2)}

This feature is not currently supported.`);}
    e.push(b);
  }
  return l;
}
let An = /^[a-z]+$/;
function Cn() {
  throw new Error('No `loadModule` function provided to `compile`');
}
function $n() {
  throw new Error('No `loadStylesheet` function provided to `compile`');
}
function Nn(t) {
  let r = 0,
    o = null;
  for (let e of K(t, ' '))
    {e === 'reference'
      ? (r |= 2)
      : e === 'inline'
      ? (r |= 1)
      : e === 'default'
      ? (r |= 4)
      : e.startsWith('prefix(') && e.endsWith(')') && (o = e.slice(7, -1));}
  return [r, o];
}
async function Sn(t, { base: r = '', loadModule: o = Cn, loadStylesheet: e = $n } = {}) {
  let n = 0;
  (t = [ne({ base: r }, t)]), (n |= await mt(t, r, e));
  let s = null,
    l = new Fe(),
    f = [],
    d = [],
    c = null,
    p = null,
    m = [],
    h = [],
    y = null;
  _(t, (b, { parent: x, replaceWith: S, context: V }) => {
    if (b.kind === 'at-rule') {
      if (b.name === '@tailwind' && (b.params === 'utilities' || b.params.startsWith('utilities'))) {
        if (p !== null) {
          S([]);
          return;
        }
        let R = K(b.params, ' ');
        for (let E of R)
          {if (E.startsWith('source(')) {
            let z = E.slice(7, -1);
            if (z === 'none') {
              y = z;
              continue;
            }
            if (
              (z[0] === '"' && z[z.length - 1] !== '"') ||
              (z[0] === "'" && z[z.length - 1] !== "'") ||
              (z[0] !== "'" && z[0] !== '"')
            )
              {throw new Error('`source(\u2026)` paths must be quoted.');}
            y = { base: V.sourceBase ?? V.base, pattern: z.slice(1, -1) };
          }}
        (p = b), (n |= 16);
      }
      if (b.name === '@utility') {
        if (x !== null) {throw new Error('`@utility` cannot be nested.');}
        if (b.nodes.length === 0)
          {throw new Error(`\`@utility ${b.params}\` is empty. Utilities should include at least one property.`);}
        let R = Yt(b);
        if (R === null)
          {throw new Error(
            `\`@utility ${b.params}\` defines an invalid utility name. Utilities should be alphanumeric and start with a lowercase letter.`
          );}
        d.push(R);
      }
      if (b.name === '@source') {
        if (b.nodes.length > 0) {throw new Error('`@source` cannot have a body.');}
        if (x !== null) {throw new Error('`@source` cannot be nested.');}
        let R = b.params;
        if (
          (R[0] === '"' && R[R.length - 1] !== '"') ||
          (R[0] === "'" && R[R.length - 1] !== "'") ||
          (R[0] !== "'" && R[0] !== '"')
        )
          {throw new Error('`@source` paths must be quoted.');}
        h.push({ base: V.base, pattern: R.slice(1, -1) }), S([]);
        return;
      }
      if (
        (b.name === '@variant' &&
          (x === null
            ? b.nodes.length === 0
              ? (b.name = '@custom-variant')
              : _(b.nodes, (R) => {
                  if (R.kind === 'at-rule' && R.name === '@slot') {return (b.name = '@custom-variant'), 2;}
                })
            : m.push(b)),
        b.name === '@custom-variant')
      ) {
        if (x !== null) {throw new Error('`@custom-variant` cannot be nested.');}
        S([]);
        let [R, E] = K(b.params, ' ');
        if (!je.test(R))
          {throw new Error(
            `\`@custom-variant ${R}\` defines an invalid variant name. Variants should only contain alphanumeric, dashes or underscore characters.`
          );}
        if (b.nodes.length > 0 && E)
          {throw new Error(`\`@custom-variant ${R}\` cannot have both a selector and a body.`);}
        if (b.nodes.length === 0) {
          if (!E) {throw new Error(`\`@custom-variant ${R}\` has no selector or body.`);}
          let z = K(E.slice(1, -1), ','),
            i = [],
            u = [];
          for (let g of z) {(g = g.trim()), g[0] === '@' ? i.push(g) : u.push(g);}
          f.push((g) => {
            g.variants.static(
              R,
              (w) => {
                let k = [];
                u.length > 0 && k.push(U(u.join(', '), w.nodes));
                for (let T of i) {k.push(L(T, w.nodes));}
                w.nodes = k;
              },
              { compounds: se([...u, ...i]) }
            );
          });
          return;
        } else {
          f.push((z) => {
            z.variants.fromAst(R, b.nodes);
          });
          return;
        }
      }
      if (b.name === '@media') {
        let R = K(b.params, ' '),
          E = [];
        for (let z of R)
          {if (z.startsWith('source(')) {
            let i = z.slice(7, -1);
            _(b.nodes, (u, { replaceWith: g }) => {
              if (u.kind === 'at-rule' && u.name === '@tailwind' && u.params === 'utilities')
                {return (u.params += ` source(${i})`), g([ne({ sourceBase: V.base }, [u])]), 2;}
            });
          } else if (z.startsWith('theme(')) {
            let i = z.slice(6, -1);
            _(b.nodes, (u) => {
              if (u.kind !== 'at-rule')
                {throw new Error(
                  'Files imported with `@import "\u2026" theme(\u2026)` must only contain `@theme` blocks.'
                );}
              if (u.name === '@theme') {return (u.params += ' ' + i), 1;}
            });
          } else if (z.startsWith('prefix(')) {
            let i = z.slice(7, -1);
            _(b.nodes, (u) => {
              if (u.kind === 'at-rule' && u.name === '@theme') {return (u.params += ` prefix(${i})`), 1;}
            });
          } else
            {z === 'important' ? (s = !0) : z === 'reference' ? (b.nodes = [ne({ reference: !0 }, b.nodes)]) : E.push(z);}}
        return E.length > 0 ? (b.params = E.join(' ')) : R.length > 0 && S(b.nodes), 1;
      }
      if (b.name === '@theme') {
        let [R, E] = Nn(b.params);
        if ((V.reference && (R |= 2), E)) {
          if (!An.test(E))
            {throw new Error(`The prefix "${E}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only.`);}
          l.prefix = E;
        }
        return (
          _(b.nodes, (z, { replaceWith: i }) => {
            if (z.kind === 'at-rule' && z.name === '@keyframes') {return l.addKeyframes(z), i([]), 1;}
            if (z.kind === 'comment') {return;}
            if (z.kind === 'declaration' && z.property.startsWith('--')) {
              l.add(z.property, z.value ?? '', R);
              return;
            }
            let u = Y([P(b.name, b.params, [z])])
              .split(
                `
`
              )
              .map((g, w, k) => `${w === 0 || w >= k.length - 2 ? ' ' : '>'} ${g}`).join(`
`);
            throw new Error(`\`@theme\` blocks must only contain custom properties or \`@keyframes\`.

${u}`);
          }),
          !c && !(R & 2) ? ((c = U(':root', b.nodes)), S([c])) : S([]),
          1
        );
      }
    }
  });
  let v = nr(l);
  s && (v.important = s), (n |= await Lr({ designSystem: v, base: r, ast: t, loadModule: o, globs: h }));
  for (let b of f) {b(v);}
  for (let b of d) {b(v);}
  if (c) {
    let b = [];
    for (let [S, V] of l.entries()) {V.options & 2 || b.push(a(S, V.value));}
    let x = l.getKeyframes();
    if (x.length > 0) {
      let S = [...l.namespace('--animate').values()].flatMap((V) => V.split(' '));
      for (let V of x) {
        let R = V.params;
        S.includes(R) && b.push(D([V]));
      }
    }
    c.nodes = b;
  }
  if (p) {
    let b = p;
    (b.kind = 'context'), (b.context = {});
  }
  if (m.length > 0) {
    for (let b of m) {
      let x = U('&', b.nodes),
        S = b.params,
        V = v.parseVariant(S);
      if (V === null) {throw new Error(`Cannot use \`@variant\` with unknown variant: ${S}`);}
      if (me(x, V, v.variants) === null) {throw new Error(`Cannot use \`@variant\` with variant: ${S}`);}
      Object.assign(b, x);
    }
    n |= 32;
  }
  return (
    (n |= pe(t, v)),
    (n |= Ce(t, v)),
    _(t, (b, { replaceWith: x }) => {
      if (b.kind === 'at-rule') {return b.name === '@utility' && x([]), 1;}
    }),
    { designSystem: v, ast: t, globs: h, root: y, utilitiesNode: p, features: n }
  );
}
async function Tn(t, r = {}) {
  let { designSystem: o, ast: e, globs: n, root: s, utilitiesNode: l, features: f } = await Sn(t, r);
  e.unshift(Ke(`! tailwindcss v${xt} | MIT License | https://tailwindcss.com `));
  function d(h) {
    o.invalidCandidates.add(h);
  }
  let c = new Set(),
    p = null,
    m = 0;
  return {
    globs: n,
    root: s,
    features: f,
    build(h) {
      if (f === 0) {return t;}
      if (!l) {return (p ??= ie(e)), p;}
      let y = !1,
        v = c.size;
      for (let x of h) {o.invalidCandidates.has(x) || (c.add(x), (y ||= c.size !== v));}
      if (!y) {return (p ??= ie(e)), p;}
      let b = te(c, o, { onInvalidCandidate: d }).astNodes;
      return m === b.length ? ((p ??= ie(e)), p) : ((m = b.length), (l.nodes = b), (p = ie(e)), p);
    },
  };
}
async function Mr(t, r = {}) {
  let o = ce(t),
    e = await Tn(o, r),
    n = o,
    s = t;
  return {
    ...e,
    build(l) {
      let f = e.build(l);
      return f === n || ((s = Y(f)), (n = f)), s;
    },
  };
}
let Wr = `@layer theme, base, components, utilities;

@import './theme.css' layer(theme);
@import './preflight.css' layer(base);
@import './utilities.css' layer(utilities);
`;
let Br = `/*
  1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
  2. Remove default margins and padding
  3. Reset all borders.
*/

*,
::after,
::before,
::backdrop,
::file-selector-button {
  box-sizing: border-box; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 2 */
  border: 0 solid; /* 3 */
}

/*
  1. Use a consistent sensible line-height in all browsers.
  2. Prevent adjustments of font size after orientation changes in iOS.
  3. Use a more readable tab size.
  4. Use the user's configured \`sans\` font-family by default.
  5. Use the user's configured \`sans\` font-feature-settings by default.
  6. Use the user's configured \`sans\` font-variation-settings by default.
  7. Disable tap highlights on iOS.
*/

html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  tab-size: 4; /* 3 */
  font-family: var(
    --default-font-family,
    ui-sans-serif,
    system-ui,
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji'
  ); /* 4 */
  font-feature-settings: var(--default-font-feature-settings, normal); /* 5 */
  font-variation-settings: var(--default-font-variation-settings, normal); /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
  Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body {
  line-height: inherit;
}

/*
  1. Add the correct height in Firefox.
  2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
  3. Reset the default border style to a 1px solid border.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
  Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
  text-decoration: underline dotted;
}

/*
  Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
  Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  -webkit-text-decoration: inherit;
  text-decoration: inherit;
}

/*
  Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
  1. Use the user's configured \`mono\` font-family by default.
  2. Use the user's configured \`mono\` font-feature-settings by default.
  3. Use the user's configured \`mono\` font-variation-settings by default.
  4. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: var(
    --default-mono-font-family,
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    'Liberation Mono',
    'Courier New',
    monospace
  ); /* 4 */
  font-feature-settings: var(--default-mono-font-feature-settings, normal); /* 5 */
  font-variation-settings: var(--default-mono-font-variation-settings, normal); /* 6 */
  font-size: 1em; /* 4 */
}

/*
  Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
  Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
  1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
  2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
  3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
  Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
  Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
  Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
  Make lists unstyled by default.
*/

ol,
ul,
menu {
  list-style: none;
}

/*
  1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
  2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
      This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
  Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/*
  1. Inherit font styles in all browsers.
  2. Remove border radius in all browsers.
  3. Remove background color in all browsers.
  4. Ensure consistent opacity for disabled states in all browsers.
*/

button,
input,
select,
optgroup,
textarea,
::file-selector-button {
  font: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  border-radius: 0; /* 2 */
  background-color: transparent; /* 3 */
  opacity: 1; /* 4 */
}

/*
  Restore default font weight.
*/

:where(select:is([multiple], [size])) optgroup {
  font-weight: bolder;
}

/*
  Restore indentation.
*/

:where(select:is([multiple], [size])) optgroup option {
  padding-inline-start: 20px;
}

/*
  Restore space after button.
*/

::file-selector-button {
  margin-inline-end: 4px;
}

/*
  1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
  2. Set the default placeholder color to a semi-transparent version of the current text color.
*/

::placeholder {
  opacity: 1; /* 1 */
  color: color-mix(in oklab, currentColor 50%, transparent); /* 2 */
}

/*
  Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
  Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
  1. Ensure date/time inputs have the same height when empty in iOS Safari.
  2. Ensure text alignment can be changed on date/time inputs in iOS Safari.
*/

::-webkit-date-and-time-value {
  min-height: 1lh; /* 1 */
  text-align: inherit; /* 2 */
}

/*
  Prevent height from changing on date/time inputs in macOS Safari when the input is set to \`display: block\`.
*/

::-webkit-datetime-edit {
  display: inline-flex;
}

/*
  Remove excess padding from pseudo-elements in date/time inputs to ensure consistent height across browsers.
*/

::-webkit-datetime-edit-fields-wrapper {
  padding: 0;
}

::-webkit-datetime-edit,
::-webkit-datetime-edit-year-field,
::-webkit-datetime-edit-month-field,
::-webkit-datetime-edit-day-field,
::-webkit-datetime-edit-hour-field,
::-webkit-datetime-edit-minute-field,
::-webkit-datetime-edit-second-field,
::-webkit-datetime-edit-millisecond-field,
::-webkit-datetime-edit-meridiem-field {
  padding-block: 0;
}

/*
  Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
  Correct the inability to style the border radius in iOS Safari.
*/

button,
input:where([type='button'], [type='reset'], [type='submit']),
::file-selector-button {
  appearance: button;
}

/*
  Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
  Make elements with the HTML hidden attribute stay hidden by default.
*/

[hidden]:where(:not([hidden='until-found'])) {
  display: none !important;
}
`;
let qr = `@theme default {
  --font-sans: ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;

  --color-red-50: oklch(0.971 0.013 17.38);
  --color-red-100: oklch(0.936 0.032 17.717);
  --color-red-200: oklch(0.885 0.062 18.334);
  --color-red-300: oklch(0.808 0.114 19.571);
  --color-red-400: oklch(0.704 0.191 22.216);
  --color-red-500: oklch(0.637 0.237 25.331);
  --color-red-600: oklch(0.577 0.245 27.325);
  --color-red-700: oklch(0.505 0.213 27.518);
  --color-red-800: oklch(0.444 0.177 26.899);
  --color-red-900: oklch(0.396 0.141 25.723);
  --color-red-950: oklch(0.258 0.092 26.042);

  --color-orange-50: oklch(0.98 0.016 73.684);
  --color-orange-100: oklch(0.954 0.038 75.164);
  --color-orange-200: oklch(0.901 0.076 70.697);
  --color-orange-300: oklch(0.837 0.128 66.29);
  --color-orange-400: oklch(0.75 0.183 55.934);
  --color-orange-500: oklch(0.705 0.213 47.604);
  --color-orange-600: oklch(0.646 0.222 41.116);
  --color-orange-700: oklch(0.553 0.195 38.402);
  --color-orange-800: oklch(0.47 0.157 37.304);
  --color-orange-900: oklch(0.408 0.123 38.172);
  --color-orange-950: oklch(0.266 0.079 36.259);

  --color-amber-50: oklch(0.987 0.022 95.277);
  --color-amber-100: oklch(0.962 0.059 95.617);
  --color-amber-200: oklch(0.924 0.12 95.746);
  --color-amber-300: oklch(0.879 0.169 91.605);
  --color-amber-400: oklch(0.828 0.189 84.429);
  --color-amber-500: oklch(0.769 0.188 70.08);
  --color-amber-600: oklch(0.666 0.179 58.318);
  --color-amber-700: oklch(0.555 0.163 48.998);
  --color-amber-800: oklch(0.473 0.137 46.201);
  --color-amber-900: oklch(0.414 0.112 45.904);
  --color-amber-950: oklch(0.279 0.077 45.635);

  --color-yellow-50: oklch(0.987 0.026 102.212);
  --color-yellow-100: oklch(0.973 0.071 103.193);
  --color-yellow-200: oklch(0.945 0.129 101.54);
  --color-yellow-300: oklch(0.905 0.182 98.111);
  --color-yellow-400: oklch(0.852 0.199 91.936);
  --color-yellow-500: oklch(0.795 0.184 86.047);
  --color-yellow-600: oklch(0.681 0.162 75.834);
  --color-yellow-700: oklch(0.554 0.135 66.442);
  --color-yellow-800: oklch(0.476 0.114 61.907);
  --color-yellow-900: oklch(0.421 0.095 57.708);
  --color-yellow-950: oklch(0.286 0.066 53.813);

  --color-lime-50: oklch(0.986 0.031 120.757);
  --color-lime-100: oklch(0.967 0.067 122.328);
  --color-lime-200: oklch(0.938 0.127 124.321);
  --color-lime-300: oklch(0.897 0.196 126.665);
  --color-lime-400: oklch(0.841 0.238 128.85);
  --color-lime-500: oklch(0.768 0.233 130.85);
  --color-lime-600: oklch(0.648 0.2 131.684);
  --color-lime-700: oklch(0.532 0.157 131.589);
  --color-lime-800: oklch(0.453 0.124 130.933);
  --color-lime-900: oklch(0.405 0.101 131.063);
  --color-lime-950: oklch(0.274 0.072 132.109);

  --color-green-50: oklch(0.982 0.018 155.826);
  --color-green-100: oklch(0.962 0.044 156.743);
  --color-green-200: oklch(0.925 0.084 155.995);
  --color-green-300: oklch(0.871 0.15 154.449);
  --color-green-400: oklch(0.792 0.209 151.711);
  --color-green-500: oklch(0.723 0.219 149.579);
  --color-green-600: oklch(0.627 0.194 149.214);
  --color-green-700: oklch(0.527 0.154 150.069);
  --color-green-800: oklch(0.448 0.119 151.328);
  --color-green-900: oklch(0.393 0.095 152.535);
  --color-green-950: oklch(0.266 0.065 152.934);

  --color-emerald-50: oklch(0.979 0.021 166.113);
  --color-emerald-100: oklch(0.95 0.052 163.051);
  --color-emerald-200: oklch(0.905 0.093 164.15);
  --color-emerald-300: oklch(0.845 0.143 164.978);
  --color-emerald-400: oklch(0.765 0.177 163.223);
  --color-emerald-500: oklch(0.696 0.17 162.48);
  --color-emerald-600: oklch(0.596 0.145 163.225);
  --color-emerald-700: oklch(0.508 0.118 165.612);
  --color-emerald-800: oklch(0.432 0.095 166.913);
  --color-emerald-900: oklch(0.378 0.077 168.94);
  --color-emerald-950: oklch(0.262 0.051 172.552);

  --color-teal-50: oklch(0.984 0.014 180.72);
  --color-teal-100: oklch(0.953 0.051 180.801);
  --color-teal-200: oklch(0.91 0.096 180.426);
  --color-teal-300: oklch(0.855 0.138 181.071);
  --color-teal-400: oklch(0.777 0.152 181.912);
  --color-teal-500: oklch(0.704 0.14 182.503);
  --color-teal-600: oklch(0.6 0.118 184.704);
  --color-teal-700: oklch(0.511 0.096 186.391);
  --color-teal-800: oklch(0.437 0.078 188.216);
  --color-teal-900: oklch(0.386 0.063 188.416);
  --color-teal-950: oklch(0.277 0.046 192.524);

  --color-cyan-50: oklch(0.984 0.019 200.873);
  --color-cyan-100: oklch(0.956 0.045 203.388);
  --color-cyan-200: oklch(0.917 0.08 205.041);
  --color-cyan-300: oklch(0.865 0.127 207.078);
  --color-cyan-400: oklch(0.789 0.154 211.53);
  --color-cyan-500: oklch(0.715 0.143 215.221);
  --color-cyan-600: oklch(0.609 0.126 221.723);
  --color-cyan-700: oklch(0.52 0.105 223.128);
  --color-cyan-800: oklch(0.45 0.085 224.283);
  --color-cyan-900: oklch(0.398 0.07 227.392);
  --color-cyan-950: oklch(0.302 0.056 229.695);

  --color-sky-50: oklch(0.977 0.013 236.62);
  --color-sky-100: oklch(0.951 0.026 236.824);
  --color-sky-200: oklch(0.901 0.058 230.902);
  --color-sky-300: oklch(0.828 0.111 230.318);
  --color-sky-400: oklch(0.746 0.16 232.661);
  --color-sky-500: oklch(0.685 0.169 237.323);
  --color-sky-600: oklch(0.588 0.158 241.966);
  --color-sky-700: oklch(0.5 0.134 242.749);
  --color-sky-800: oklch(0.443 0.11 240.79);
  --color-sky-900: oklch(0.391 0.09 240.876);
  --color-sky-950: oklch(0.293 0.066 243.157);

  --color-blue-50: oklch(0.97 0.014 254.604);
  --color-blue-100: oklch(0.932 0.032 255.585);
  --color-blue-200: oklch(0.882 0.059 254.128);
  --color-blue-300: oklch(0.809 0.105 251.813);
  --color-blue-400: oklch(0.707 0.165 254.624);
  --color-blue-500: oklch(0.623 0.214 259.815);
  --color-blue-600: oklch(0.546 0.245 262.881);
  --color-blue-700: oklch(0.488 0.243 264.376);
  --color-blue-800: oklch(0.424 0.199 265.638);
  --color-blue-900: oklch(0.379 0.146 265.522);
  --color-blue-950: oklch(0.282 0.091 267.935);

  --color-indigo-50: oklch(0.962 0.018 272.314);
  --color-indigo-100: oklch(0.93 0.034 272.788);
  --color-indigo-200: oklch(0.87 0.065 274.039);
  --color-indigo-300: oklch(0.785 0.115 274.713);
  --color-indigo-400: oklch(0.673 0.182 276.935);
  --color-indigo-500: oklch(0.585 0.233 277.117);
  --color-indigo-600: oklch(0.511 0.262 276.966);
  --color-indigo-700: oklch(0.457 0.24 277.023);
  --color-indigo-800: oklch(0.398 0.195 277.366);
  --color-indigo-900: oklch(0.359 0.144 278.697);
  --color-indigo-950: oklch(0.257 0.09 281.288);

  --color-violet-50: oklch(0.969 0.016 293.756);
  --color-violet-100: oklch(0.943 0.029 294.588);
  --color-violet-200: oklch(0.894 0.057 293.283);
  --color-violet-300: oklch(0.811 0.111 293.571);
  --color-violet-400: oklch(0.702 0.183 293.541);
  --color-violet-500: oklch(0.606 0.25 292.717);
  --color-violet-600: oklch(0.541 0.281 293.009);
  --color-violet-700: oklch(0.491 0.27 292.581);
  --color-violet-800: oklch(0.432 0.232 292.759);
  --color-violet-900: oklch(0.38 0.189 293.745);
  --color-violet-950: oklch(0.283 0.141 291.089);

  --color-purple-50: oklch(0.977 0.014 308.299);
  --color-purple-100: oklch(0.946 0.033 307.174);
  --color-purple-200: oklch(0.902 0.063 306.703);
  --color-purple-300: oklch(0.827 0.119 306.383);
  --color-purple-400: oklch(0.714 0.203 305.504);
  --color-purple-500: oklch(0.627 0.265 303.9);
  --color-purple-600: oklch(0.558 0.288 302.321);
  --color-purple-700: oklch(0.496 0.265 301.924);
  --color-purple-800: oklch(0.438 0.218 303.724);
  --color-purple-900: oklch(0.381 0.176 304.987);
  --color-purple-950: oklch(0.291 0.149 302.717);

  --color-fuchsia-50: oklch(0.977 0.017 320.058);
  --color-fuchsia-100: oklch(0.952 0.037 318.852);
  --color-fuchsia-200: oklch(0.903 0.076 319.62);
  --color-fuchsia-300: oklch(0.833 0.145 321.434);
  --color-fuchsia-400: oklch(0.74 0.238 322.16);
  --color-fuchsia-500: oklch(0.667 0.295 322.15);
  --color-fuchsia-600: oklch(0.591 0.293 322.896);
  --color-fuchsia-700: oklch(0.518 0.253 323.949);
  --color-fuchsia-800: oklch(0.452 0.211 324.591);
  --color-fuchsia-900: oklch(0.401 0.17 325.612);
  --color-fuchsia-950: oklch(0.293 0.136 325.661);

  --color-pink-50: oklch(0.971 0.014 343.198);
  --color-pink-100: oklch(0.948 0.028 342.258);
  --color-pink-200: oklch(0.899 0.061 343.231);
  --color-pink-300: oklch(0.823 0.12 346.018);
  --color-pink-400: oklch(0.718 0.202 349.761);
  --color-pink-500: oklch(0.656 0.241 354.308);
  --color-pink-600: oklch(0.592 0.249 0.584);
  --color-pink-700: oklch(0.525 0.223 3.958);
  --color-pink-800: oklch(0.459 0.187 3.815);
  --color-pink-900: oklch(0.408 0.153 2.432);
  --color-pink-950: oklch(0.284 0.109 3.907);

  --color-rose-50: oklch(0.969 0.015 12.422);
  --color-rose-100: oklch(0.941 0.03 12.58);
  --color-rose-200: oklch(0.892 0.058 10.001);
  --color-rose-300: oklch(0.81 0.117 11.638);
  --color-rose-400: oklch(0.712 0.194 13.428);
  --color-rose-500: oklch(0.645 0.246 16.439);
  --color-rose-600: oklch(0.586 0.253 17.585);
  --color-rose-700: oklch(0.514 0.222 16.935);
  --color-rose-800: oklch(0.455 0.188 13.697);
  --color-rose-900: oklch(0.41 0.159 10.272);
  --color-rose-950: oklch(0.271 0.105 12.094);

  --color-slate-50: oklch(0.984 0.003 247.858);
  --color-slate-100: oklch(0.968 0.007 247.896);
  --color-slate-200: oklch(0.929 0.013 255.508);
  --color-slate-300: oklch(0.869 0.022 252.894);
  --color-slate-400: oklch(0.704 0.04 256.788);
  --color-slate-500: oklch(0.554 0.046 257.417);
  --color-slate-600: oklch(0.446 0.043 257.281);
  --color-slate-700: oklch(0.372 0.044 257.287);
  --color-slate-800: oklch(0.279 0.041 260.031);
  --color-slate-900: oklch(0.208 0.042 265.755);
  --color-slate-950: oklch(0.129 0.042 264.695);

  --color-gray-50: oklch(0.985 0.002 247.839);
  --color-gray-100: oklch(0.967 0.003 264.542);
  --color-gray-200: oklch(0.928 0.006 264.531);
  --color-gray-300: oklch(0.872 0.01 258.338);
  --color-gray-400: oklch(0.707 0.022 261.325);
  --color-gray-500: oklch(0.551 0.027 264.364);
  --color-gray-600: oklch(0.446 0.03 256.802);
  --color-gray-700: oklch(0.373 0.034 259.733);
  --color-gray-800: oklch(0.278 0.033 256.848);
  --color-gray-900: oklch(0.21 0.034 264.665);
  --color-gray-950: oklch(0.13 0.028 261.692);

  --color-zinc-50: oklch(0.985 0 0);
  --color-zinc-100: oklch(0.967 0.001 286.375);
  --color-zinc-200: oklch(0.92 0.004 286.32);
  --color-zinc-300: oklch(0.871 0.006 286.286);
  --color-zinc-400: oklch(0.705 0.015 286.067);
  --color-zinc-500: oklch(0.552 0.016 285.938);
  --color-zinc-600: oklch(0.442 0.017 285.786);
  --color-zinc-700: oklch(0.37 0.013 285.805);
  --color-zinc-800: oklch(0.274 0.006 286.033);
  --color-zinc-900: oklch(0.21 0.006 285.885);
  --color-zinc-950: oklch(0.141 0.005 285.823);

  --color-neutral-50: oklch(0.985 0 0);
  --color-neutral-100: oklch(0.97 0 0);
  --color-neutral-200: oklch(0.922 0 0);
  --color-neutral-300: oklch(0.87 0 0);
  --color-neutral-400: oklch(0.708 0 0);
  --color-neutral-500: oklch(0.556 0 0);
  --color-neutral-600: oklch(0.439 0 0);
  --color-neutral-700: oklch(0.371 0 0);
  --color-neutral-800: oklch(0.269 0 0);
  --color-neutral-900: oklch(0.205 0 0);
  --color-neutral-950: oklch(0.145 0 0);

  --color-stone-50: oklch(0.985 0.001 106.423);
  --color-stone-100: oklch(0.97 0.001 106.424);
  --color-stone-200: oklch(0.923 0.003 48.717);
  --color-stone-300: oklch(0.869 0.005 56.366);
  --color-stone-400: oklch(0.709 0.01 56.259);
  --color-stone-500: oklch(0.553 0.013 58.071);
  --color-stone-600: oklch(0.444 0.011 73.639);
  --color-stone-700: oklch(0.374 0.01 67.558);
  --color-stone-800: oklch(0.268 0.007 34.298);
  --color-stone-900: oklch(0.216 0.006 56.043);
  --color-stone-950: oklch(0.147 0.004 49.25);

  --color-black: #000;
  --color-white: #fff;

  --spacing: 0.25rem;

  --breakpoint-sm: 40rem;
  --breakpoint-md: 48rem;
  --breakpoint-lg: 64rem;
  --breakpoint-xl: 80rem;
  --breakpoint-2xl: 96rem;

  --container-3xs: 16rem;
  --container-2xs: 18rem;
  --container-xs: 20rem;
  --container-sm: 24rem;
  --container-md: 28rem;
  --container-lg: 32rem;
  --container-xl: 36rem;
  --container-2xl: 42rem;
  --container-3xl: 48rem;
  --container-4xl: 56rem;
  --container-5xl: 64rem;
  --container-6xl: 72rem;
  --container-7xl: 80rem;

  --text-xs: 0.75rem;
  --text-xs--line-height: calc(1 / 0.75);
  --text-sm: 0.875rem;
  --text-sm--line-height: calc(1.25 / 0.875);
  --text-base: 1rem;
  --text-base--line-height: calc(1.5 / 1);
  --text-lg: 1.125rem;
  --text-lg--line-height: calc(1.75 / 1.125);
  --text-xl: 1.25rem;
  --text-xl--line-height: calc(1.75 / 1.25);
  --text-2xl: 1.5rem;
  --text-2xl--line-height: calc(2 / 1.5);
  --text-3xl: 1.875rem;
  --text-3xl--line-height: calc(2.25 / 1.875);
  --text-4xl: 2.25rem;
  --text-4xl--line-height: calc(2.5 / 2.25);
  --text-5xl: 3rem;
  --text-5xl--line-height: 1;
  --text-6xl: 3.75rem;
  --text-6xl--line-height: 1;
  --text-7xl: 4.5rem;
  --text-7xl--line-height: 1;
  --text-8xl: 6rem;
  --text-8xl--line-height: 1;
  --text-9xl: 8rem;
  --text-9xl--line-height: 1;

  --font-weight-thin: 100;
  --font-weight-extralight: 200;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --font-weight-black: 900;

  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;

  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  --radius-xs: 0.125rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-4xl: 2rem;

  --shadow-2xs: 0 1px rgb(0 0 0 / 0.05);
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  --inset-shadow-2xs: inset 0 1px rgb(0 0 0 / 0.05);
  --inset-shadow-xs: inset 0 1px 1px rgb(0 0 0 / 0.05);
  --inset-shadow-sm: inset 0 2px 4px rgb(0 0 0 / 0.05);

  --drop-shadow-xs: 0 1px 1px rgb(0 0 0 / 0.05);
  --drop-shadow-sm: 0 1px 2px rgb(0 0 0 / 0.15);
  --drop-shadow-md: 0 3px 3px rgb(0 0 0 / 0.12);
  --drop-shadow-lg: 0 4px 4px rgb(0 0 0 / 0.15);
  --drop-shadow-xl: 0 9px 7px rgb(0 0 0 / 0.1);
  --drop-shadow-2xl: 0 25px 25px rgb(0 0 0 / 0.15);

  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  --animate-spin: spin 1s linear infinite;
  --animate-ping: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  --animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  --animate-bounce: bounce 1s infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes ping {
    75%,
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  @keyframes pulse {
    50% {
      opacity: 0.5;
    }
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }

    50% {
      transform: none;
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }

  --blur-xs: 4px;
  --blur-sm: 8px;
  --blur-md: 12px;
  --blur-lg: 16px;
  --blur-xl: 24px;
  --blur-2xl: 40px;
  --blur-3xl: 64px;

  --perspective-dramatic: 100px;
  --perspective-near: 300px;
  --perspective-normal: 500px;
  --perspective-midrange: 800px;
  --perspective-distant: 1200px;

  --aspect-video: 16 / 9;

  --default-transition-duration: 150ms;
  --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  --default-font-family: var(--font-sans);
  --default-font-feature-settings: var(--font-sans--font-feature-settings);
  --default-font-variation-settings: var(--font-sans--font-variation-settings);
  --default-mono-font-family: var(--font-mono);
  --default-mono-font-feature-settings: var(--font-mono--font-feature-settings);
  --default-mono-font-variation-settings: var(--font-mono--font-variation-settings);
}

/* Deprecated */
@theme default inline reference {
  --blur: 8px;
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  --drop-shadow: 0 1px 2px rgb(0 0 0 / 0.1), 0 1px 1px rgb(0 0 0 / 0.06);
  --radius: 0.25rem;
  --max-width-prose: 65ch;
}
`;
let Hr = `@tailwind utilities;
`;
let Se = { index: Wr, preflight: Br, theme: qr, utilities: Hr };
let Ge = class {
  start(r) {
    performance.mark(`${r} (start)`);
  }
  end(r, o) {
    performance.mark(`${r} (end)`), performance.measure(r, { start: `${r} (start)`, end: `${r} (end)`, detail: o });
  }
  hit(r, o) {
    performance.mark(r, { detail: o });
  }
  error(r) {
    throw (performance.mark('(error)', { detail: { error: `${r}` } }), r);
  }
};
console.warn(
  'The browser build of Tailwind CSS should not be used in production. To use Tailwind CSS in production, use the Tailwind CLI, Vite plugin, or PostCSS plugin: https://tailwindcss.com/docs/installation'
);
let Yr = 'text/tailwindcss',
  Ye,
  kt = new Set(),
  vt = '',
  wt = document.createElement('style'),
  Gr = Promise.resolve(),
  Pn = 1,
  B = new Ge();
async function _n() {
  B.start('Create compiler'), B.start('Reading Stylesheets');
  let t = document.querySelectorAll(`style[type="${Yr}"]`),
    r = '';
  for (let o of t)
    {Jr(o),
      (r +=
        o.textContent +
        `
`);}
  if (
    (r.includes('@import') || (r = `@import "tailwindcss";${r}`),
    B.end('Reading Stylesheets', { size: r.length, changed: vt !== r }),
    vt !== r)
  ) {
    (vt = r), B.start('Compile CSS');
    try {
      Ye = await Mr(r, { base: '/', loadStylesheet: Dn, loadModule: Un });
    } finally {
      B.end('Compile CSS'), B.end('Create compiler');
    }
    kt.clear();
  }
}
async function Dn(t, r) {
  function o() {
    if (t === 'tailwindcss') {return { base: r, content: Se.index };}
    if (t === 'tailwindcss/preflight' || t === 'tailwindcss/preflight.css' || t === './preflight.css')
      {return { base: r, content: Se.preflight };}
    if (t === 'tailwindcss/theme' || t === 'tailwindcss/theme.css' || t === './theme.css')
      {return { base: r, content: Se.theme };}
    if (t === 'tailwindcss/utilities' || t === 'tailwindcss/utilities.css' || t === './utilities.css')
      {return { base: r, content: Se.utilities };}
    throw new Error(`The browser build does not support @import for "${t}"`);
  }
  try {
    let e = o();
    return B.hit('Loaded stylesheet', { id: t, base: r, size: e.content.length }), e;
  } catch (e) {
    throw (B.hit('Failed to load stylesheet', { id: t, base: r, error: e.message ?? e }), e);
  }
}
async function Un() {
  throw new Error('The browser build does not support plugins or config files.');
}
async function jn(t) {
  if (!Ye) {return;}
  let r = new Set();
  B.start('Collect classes');
  for (let o of document.querySelectorAll('[class]')) {for (let e of o.classList) {kt.has(e) || (kt.add(e), r.add(e));}}
  B.end('Collect classes', { count: r.size }),
    !(r.size === 0 && t === 'incremental') &&
      (B.start('Build utilities'), (wt.textContent = Ye.build(Array.from(r))), B.end('Build utilities'));
}
function Je(t) {
  async function r() {
    if (!Ye && t !== 'full') {return;}
    let o = Pn++;
    B.start(`Build #${o} (${t})`),
      t === 'full' && (await _n()),
      B.start('Build'),
      await jn(t),
      B.end('Build'),
      B.end(`Build #${o} (${t})`);
  }
  Gr = Gr.then(r).catch((o) => B.error(o));
}
let Fn = new MutationObserver(() => Je('full'));
function Jr(t) {
  Fn.observe(t, { attributes: !0, attributeFilter: ['type'], characterData: !0, subtree: !0, childList: !0 });
}
new MutationObserver((t) => {
  let r = 0,
    o = 0;
  for (let e of t) {
    for (let n of e.addedNodes)
      {n.nodeType === Node.ELEMENT_NODE && n.tagName === 'STYLE' && n.getAttribute('type') === Yr && (Jr(n), r++);}
    for (let n of e.addedNodes) {n.nodeType === 1 && n !== wt && o++;}
    e.type === 'attributes' && o++;
  }
  if (r > 0) {return Je('full');}
  if (o > 0) {return Je('incremental');}
}).observe(document.documentElement, { attributes: !0, attributeFilter: ['class'], childList: !0, subtree: !0 });
Je('full');
document.head.append(wt);

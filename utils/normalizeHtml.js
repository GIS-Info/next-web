// 平衡 HTML 片段中的标签，供 v-html 使用。
// 数据库里的富文本可能存在未闭合或错位闭合的标签（例如 <strong> 跨段落未闭合），
// 浏览器解析时会按 HTML5 规则"修复"，导致 DOM 和 SSR 输出不一致，触发
// hydration mismatch 并退化为整页客户端重渲染。这里用同一份代码在服务端和
// 客户端把片段先补齐闭合，浏览器就无需修复，两端结构保持一致。

const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
])

// 打开这些块级标签时，未闭合的 <p> 会被浏览器自动结束，这里提前补上 </p>
const CLOSES_P = new Set([
  'address', 'article', 'aside', 'blockquote', 'div', 'dl', 'fieldset',
  'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'header', 'hr', 'main', 'nav', 'ol', 'p', 'pre', 'section', 'table', 'ul',
])

const TAG_RE = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>/g

export function normalizeHtml(html) {
  if (!html || typeof html !== 'string') return html

  const out = []
  const stack = []
  let last = 0
  let match

  TAG_RE.lastIndex = 0
  while ((match = TAG_RE.exec(html)) !== null) {
    const [raw, closing, name, , selfClosing] = match
    const tag = name.toLowerCase()

    out.push(html.slice(last, match.index))
    last = match.index + raw.length

    if (!closing) {
      if (CLOSES_P.has(tag)) {
        // 模拟浏览器行为：块级元素会结束仍然打开的 <p>
        const pIndex = stack.lastIndexOf('p')
        if (pIndex !== -1) {
          for (let i = stack.length - 1; i >= pIndex; i--) {
            out.push(`</${stack[i]}>`)
          }
          stack.length = pIndex
        }
      }
      // 连续的 <li> 互相自动闭合
      if (tag === 'li' && stack[stack.length - 1] === 'li') {
        out.push('</li>')
        stack.pop()
      }
      out.push(raw)
      if (!VOID_TAGS.has(tag) && !selfClosing) {
        stack.push(tag)
      }
    } else {
      const index = stack.lastIndexOf(tag)
      if (index === -1) {
        // 多余的闭合标签：直接丢弃
        continue
      }
      // 把中间没闭合的标签一并补上
      for (let i = stack.length - 1; i >= index; i--) {
        out.push(`</${stack[i]}>`)
      }
      stack.length = index
    }
  }

  out.push(html.slice(last))
  // 结尾处补齐所有未闭合标签
  for (let i = stack.length - 1; i >= 0; i--) {
    out.push(`</${stack[i]}>`)
  }
  return out.join('')
}

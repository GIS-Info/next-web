// GIStory markdown 同域代理
// raw.githubusercontent.com / api.github.com 在国内无法直连，
// 由服务端代为抓取并缓存，前端只请求 /gistory-api/*。
const axios = require('axios')

const REPO = 'Pengyu-gis/markdown_repo'
const BRANCH = 'main'
const LIST_URL = `https://api.github.com/repos/${REPO}/contents/?ref=${BRANCH}`
const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/`

// 内容更新不频繁，内存缓存 10 分钟，同时避免触发 GitHub 未认证接口的频率限制（60 次/小时）
const CACHE_TTL = 10 * 60 * 1000
const cache = new Map()

async function fetchWithCache(key, fetcher) {
  const hit = cache.get(key)
  if (hit && Date.now() - hit.ts < CACHE_TTL) {
    return hit.value
  }
  try {
    const value = await fetcher()
    cache.set(key, { ts: Date.now(), value })
    return value
  } catch (err) {
    // 上游抓取失败时退回过期缓存，避免列表页整体挂掉
    if (hit) return hit.value
    throw err
  }
}

function send(res, status, type, body) {
  res.statusCode = status
  res.setHeader('Content-Type', type)
  if (status === 200) {
    res.setHeader('Cache-Control', 'public, max-age=300')
  }
  res.end(body)
}

module.exports = async function (req, res) {
  const path = decodeURIComponent((req.url || '').split('?')[0])

  try {
    if (path === '/list') {
      const list = await fetchWithCache('list', async () => {
        const r = await axios.get(LIST_URL, { timeout: 15000 })
        return r.data
          .filter((f) => f.type === 'file')
          .map((f) => ({ name: f.name, path: f.path }))
      })
      send(res, 200, 'application/json; charset=utf-8', JSON.stringify(list))
      return
    }

    if (path.startsWith('/raw/')) {
      const filePath = path.slice('/raw/'.length)
      if (!filePath || filePath.includes('..')) {
        send(res, 400, 'text/plain; charset=utf-8', 'Bad request')
        return
      }
      const file = await fetchWithCache(`raw:${filePath}`, async () => {
        const r = await axios.get(RAW_BASE + encodeURI(filePath), {
          timeout: 15000,
          responseType: 'arraybuffer',
        })
        return {
          type: r.headers['content-type'] || 'text/plain; charset=utf-8',
          body: Buffer.from(r.data),
        }
      })
      send(res, 200, file.type, file.body)
      return
    }

    send(res, 404, 'text/plain; charset=utf-8', 'Not found')
  } catch (err) {
    const status = err.response?.status === 404 ? 404 : 502
    send(res, status, 'text/plain; charset=utf-8', 'Upstream fetch failed')
  }
}

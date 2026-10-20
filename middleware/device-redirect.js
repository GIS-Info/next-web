// 在服务端根据 UA 判断设备并跳转，避免先加载整页再用 JS 跳转造成的二次加载与闪烁
const MOBILE_UA = /Mobi|Android|iPhone/i

// 编辑/管理功能没有移动端版本，手机访问时直接使用桌面页，避免跳到不存在的 /mobile 路由
const DESKTOP_ONLY = ['/addPost', '/manage']

export default function ({ req, route, redirect }) {
  const ua = process.server
    ? (req && req.headers['user-agent']) || ''
    : navigator.userAgent || ''

  const isMobile = MOBILE_UA.test(ua)
  const path = route.path
  const onMobilePath = path === '/mobile' || path.startsWith('/mobile/')
  const isDesktopOnly = DESKTOP_ONLY.some(
    (p) => path === p || path.startsWith(p + '/')
  )

  if (isMobile && !onMobilePath && !isDesktopOnly) {
    const target = path === '/' ? '/mobile' : `/mobile${path}`
    return redirect({ path: target, query: route.query })
  }

  if (!isMobile && onMobilePath) {
    const target = path.replace(/^\/mobile/, '') || '/'
    return redirect({ path: target, query: route.query })
  }
}

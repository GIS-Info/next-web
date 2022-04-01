//  判断用户是否是移动端
export const isMobile = () => {
  return /Mobi|Android|iPhone/i.test(navigator.userAgent);
}

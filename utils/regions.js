// 招生筛选用的「大洲 → 国家」静态数据，中英双语。
// value 统一使用英文国家/大洲名（与院校库的 Co_Continent_EN / C_Country_EN 及
// 帖子的 country_en 保持一致），label 按语言切换显示。
// 大洲 value 与 /api/schools?continent= 接口取值一致：Asia / Europe / North America ...
export const REGIONS = [
  {
    value: 'Asia',
    zh: '亚洲',
    en: 'Asia',
    countries: [
      { value: 'China', zh: '中国', en: 'China' },
      { value: 'Hong Kong', zh: '中国香港', en: 'Hong Kong' },
      { value: 'Japan', zh: '日本', en: 'Japan' },
      { value: 'South Korea', zh: '韩国', en: 'South Korea' },
      { value: 'Singapore', zh: '新加坡', en: 'Singapore' },
      { value: 'India', zh: '印度', en: 'India' },
      { value: 'Israel', zh: '以色列', en: 'Israel' },
      { value: 'Saudi Arabia', zh: '沙特阿拉伯', en: 'Saudi Arabia' },
      { value: 'United Arab Emirates', zh: '阿联酋', en: 'United Arab Emirates' },
      { value: 'Malaysia', zh: '马来西亚', en: 'Malaysia' },
      { value: 'Thailand', zh: '泰国', en: 'Thailand' },
      { value: 'Indonesia', zh: '印度尼西亚', en: 'Indonesia' },
      { value: 'Turkey', zh: '土耳其', en: 'Turkey' },
    ],
  },
  {
    value: 'Europe',
    zh: '欧洲',
    en: 'Europe',
    countries: [
      { value: 'United Kingdom', zh: '英国', en: 'United Kingdom' },
      { value: 'Germany', zh: '德国', en: 'Germany' },
      { value: 'France', zh: '法国', en: 'France' },
      { value: 'Netherlands', zh: '荷兰', en: 'Netherlands' },
      { value: 'Switzerland', zh: '瑞士', en: 'Switzerland' },
      { value: 'Sweden', zh: '瑞典', en: 'Sweden' },
      { value: 'Italy', zh: '意大利', en: 'Italy' },
      { value: 'Spain', zh: '西班牙', en: 'Spain' },
      { value: 'Belgium', zh: '比利时', en: 'Belgium' },
      { value: 'Austria', zh: '奥地利', en: 'Austria' },
      { value: 'Denmark', zh: '丹麦', en: 'Denmark' },
      { value: 'Norway', zh: '挪威', en: 'Norway' },
      { value: 'Finland', zh: '芬兰', en: 'Finland' },
      { value: 'Ireland', zh: '爱尔兰', en: 'Ireland' },
      { value: 'Portugal', zh: '葡萄牙', en: 'Portugal' },
      { value: 'Poland', zh: '波兰', en: 'Poland' },
      { value: 'Greece', zh: '希腊', en: 'Greece' },
    ],
  },
  {
    value: 'North America',
    zh: '北美洲',
    en: 'North America',
    countries: [
      { value: 'United States', zh: '美国', en: 'United States' },
      { value: 'Canada', zh: '加拿大', en: 'Canada' },
      { value: 'Mexico', zh: '墨西哥', en: 'Mexico' },
    ],
  },
  {
    value: 'South America',
    zh: '南美洲',
    en: 'South America',
    countries: [
      { value: 'Brazil', zh: '巴西', en: 'Brazil' },
      { value: 'Argentina', zh: '阿根廷', en: 'Argentina' },
      { value: 'Chile', zh: '智利', en: 'Chile' },
      { value: 'Colombia', zh: '哥伦比亚', en: 'Colombia' },
    ],
  },
  {
    value: 'Oceania',
    zh: '大洋洲',
    en: 'Oceania',
    countries: [
      { value: 'Australia', zh: '澳大利亚', en: 'Australia' },
      { value: 'New Zealand', zh: '新西兰', en: 'New Zealand' },
    ],
  },
  {
    value: 'Africa',
    zh: '非洲',
    en: 'Africa',
    countries: [
      { value: 'South Africa', zh: '南非', en: 'South Africa' },
      { value: 'Egypt', zh: '埃及', en: 'Egypt' },
      { value: 'Kenya', zh: '肯尼亚', en: 'Kenya' },
      { value: 'Nigeria', zh: '尼日利亚', en: 'Nigeria' },
      { value: 'Morocco', zh: '摩洛哥', en: 'Morocco' },
    ],
  },
]

// 国家（英文规范名）→ 大洲，用于按大洲筛选时反查
export const COUNTRY_TO_CONTINENT = REGIONS.reduce((map, continent) => {
  continent.countries.forEach((country) => {
    map[country.value] = continent.value
  })
  return map
}, {})

// 把 key 统一成：小写、去点、多空格合一，便于匹配
const canonKey = (s) =>
  String(s || '')
    .trim()
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/\s+/g, ' ')

// 常见别名 → 规范国家名（帖子里的 country_en 是管理员手填的自由文本）
const COUNTRY_ALIASES = {
  usa: 'United States',
  us: 'United States',
  'u s a': 'United States',
  america: 'United States',
  'united states of america': 'United States',
  'the united states': 'United States',
  uk: 'United Kingdom',
  england: 'United Kingdom',
  britain: 'United Kingdom',
  'great britain': 'United Kingdom',
  scotland: 'United Kingdom',
  wales: 'United Kingdom',
  uae: 'United Arab Emirates',
  korea: 'South Korea',
  'republic of korea': 'South Korea',
  holland: 'Netherlands',
  'the netherlands': 'Netherlands',
  hk: 'Hong Kong',
  hongkong: 'Hong Kong',
  'hong kong sar': 'Hong Kong',
  prc: 'China',
  'mainland china': 'China',
  "people's republic of china": 'China',
  nz: 'New Zealand',
}

// 规范名的小写索引，用于大小写不敏感的直接匹配
const CANONICAL_BY_KEY = Object.keys(COUNTRY_TO_CONTINENT).reduce((map, name) => {
  map[canonKey(name)] = name
  return map
}, {})

// 把自由文本国家名归一化到规范英文名；无法识别时原样返回（去除首尾空格）
export function normalizeCountry(raw) {
  if (!raw) return ''
  const key = canonKey(raw)
  return COUNTRY_ALIASES[key] || CANONICAL_BY_KEY[key] || String(raw).trim()
}

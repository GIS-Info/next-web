<template>
  <div class="main">
    <!-- ===================== HERO ===================== -->
    <header class="hero">
      <map-background class="hero__bg" />

      <div class="hero__inner" :class="letterSpacingClass">
        <h1 class="hero__heading">{{ t.heroHeading }}</h1>
        <p class="hero__description">{{ t.heroDescription }}</p>

        <nav class="cta-group" :aria-label="t.heroNavLabel">
          <component
            :is="cta.external ? 'a' : 'nuxt-link'"
            v-for="cta in t.ctas"
            :key="cta.label"
            class="cta-btn"
            :class="'cta-btn--' + (cta.variant || 'outline')"
            v-bind="
              cta.external
                ? { href: cta.to, target: '_blank', rel: 'noopener' }
                : { to: cta.to }
            "
          >
            {{ cta.label }}
          </component>
        </nav>
      </div>

      <div class="hero__utility">
        <a
          class="utility-btn"
          href="https://mailchi.mp/da300ab42ac5/gisphere"
          target="_blank"
          rel="noopener"
        >
          {{ t.subscribe }}
        </a>

        <nuxt-link class="utility-btn" to="/white-book">
          {{ t.whiteBook }}
        </nuxt-link>

        <!-- Contact: works on touch (click) and desktop (hover + focus) -->
        <div
          class="contact"
          @mouseenter="showContactCard = true"
          @mouseleave="showContactCard = false"
          @focusin="showContactCard = true"
          @focusout="onContactBlur"
        >
          <button
            type="button"
            class="utility-btn utility-btn--solid"
            :aria-expanded="String(showContactCard)"
            @click="showContactCard = !showContactCard"
          >
            {{ t.contact }}
          </button>

          <transition name="trans-content">
            <div v-if="showContactCard" class="contact__card">
              <a class="contact__row" href="mailto:contact@gisphere.info">
                contact@gisphere.info
              </a>
              <p class="contact__row">{{ t.community }}</p>
              <div class="contact__qr">
                <img :src="t.qrSrc" :alt="t.qrAlt" />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </header>

    <!-- ===================== ABOUT + MISSION ===================== -->
    <section class="section">
      <div class="container">
        <h2 class="section__title">{{ t.aboutTitle }}</h2>
        <div class="prose">
          <p>{{ t.projectIntro }}</p>
          <p v-for="(para, i) in t.mission" :key="'m' + i">{{ para }}</p>
          <div class="leadership">
            <h3 class="leadership__title">{{ t.leadershipTitle }}</h3>
            <ul class="leaders">
              <li v-for="leader in t.leaders" :key="leader.name">
                <b>{{ leader.name }}</b> ({{ leader.years }})
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== CORE INITIATIVES ===================== -->
    <!-- Moved above the longer narrative: these are the actionable links. -->
    <section class="section section--tint">
      <div class="container">
        <h2 class="section__title">{{ t.initiativesTitle }}</h2>
        <p class="section__lede">{{ t.initiativesLede }}</p>

        <ul class="cards">
          <li v-for="(card, i) in t.initiatives" :key="card.title">
            <component
              :is="card.external ? 'a' : 'nuxt-link'"
              class="card art-host"
              v-bind="
                card.external
                  ? { href: card.to, target: '_blank', rel: 'noopener' }
                  : { to: card.to }
              "
            >
              <div class="card__art">
                <initiative-art :kind="card.art" />
              </div>
              <div class="card__body">
                <span class="card__tag">
                  <span class="card__index">0{{ i + 1 }}</span>
                  {{ card.tag }}
                </span>
                <h3 class="card__title">{{ card.title }}</h3>
                <p class="card__desc">{{ card.desc }}</p>
                <span class="card__cta">
                  {{ card.external ? t.ctaExternal : t.ctaExplore }}
                  <svg
                    class="card__cta-icon"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path v-if="card.external" d="M5 11L11 5M6 5h5v5" />
                    <path v-else d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                  <span v-if="card.external" class="sr-only">
                    {{ t.opensNewTab }}
                  </span>
                </span>
              </div>
            </component>
          </li>
        </ul>
      </div>
    </section>

    <!-- ===================== JOURNEY ===================== -->
    <section class="section">
      <div class="container">
        <h2 class="section__title">{{ t.journeyTitle }}</h2>
        <div class="prose">
          <p v-for="(para, i) in t.journey" :key="'j' + i">{{ para }}</p>
        </div>
      </div>
    </section>

    <!-- ===================== SPONSORS ===================== -->
    <section class="section section--tint">
      <div class="container">
        <h2 class="section__title">{{ t.sponsorsTitle }}</h2>

        <p class="section__lede">{{ t.sponsorsLede }}</p>

        <ul class="sponsors">
          <li v-for="s in t.sponsors" :key="s.name">
            <a
              class="sponsor"
              :href="s.url"
              target="_blank"
              rel="noopener sponsored"
              :aria-label="s.name + ' — ' + t.opensNewTab"
            >
              <span class="sponsor__logo">
                <img :src="s.logo" :alt="s.name" loading="lazy" />
              </span>
              <span v-if="s.note" class="sponsor__note">{{ s.note }}</span>
              <span class="sponsor__visit" aria-hidden="true">
                {{ t.visitSite }} &#8599;
              </span>
            </a>
          </li>
          <li>
            <a class="sponsor sponsor--join" :href="t.becomeSponsor.url">
              <span class="sponsor__plus" aria-hidden="true">+</span>
              <b>{{ t.becomeSponsor.name }}</b>
              <span class="sponsor__note">{{ t.becomeSponsor.note }}</span>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <bottom-bar />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ProjectIntro } from '~/utils/ProjectIntro'

// Non-reactive copy table. Add a language by adding a key — the template
// never branches on `lang` again.
const COPY = {
  zh: {
    heroHeading: '时空桥接无限可能',
    heroDescription: '致力于分享世界各地 GIS 相关领域教育信息',
    heroNavLabel: '主要入口',
    ctas: [
      { label: '招生信息', to: '/postList?type=academic', variant: 'primary' },
      { label: '院校指南', to: '/school' },
      // DELIBERATE: ZH visitors go to the WeChat account, EN visitors go to
      // /gistory. WeChat is the primary channel for the CN audience, so this
      // pair is meant to differ — do not "fix" it to match.
      {
        label: 'GIScience访谈',
        to: 'https://mp.weixin.qq.com/mp/homepage?__biz=Mzg3OTUyMjk3OQ==&hid=5&sn=3587fb68bd6892591c79b32606a286bf&scene=18',
        external: true,
      },
      // Adjust this wording to match your nav bar's ZH label.
      { label: '提交信息更新', to: '/suggestion', variant: 'accent' },
    ],
    subscribe: '订阅邮箱',
    whiteBook: 'GISphere 留学指南 · 大数据报告白皮书',
    contact: '联系我们 / 加入我们',
    community: '加入微信社区',
    qrSrc: require('~/components/BottomBar/imgs/wechat-qrcode.png'),
    qrAlt: 'GISphere 微信社区二维码',

    aboutTitle: '项目介绍与使命',
    leadershipTitle: '历年 Chair / Co-Chair',
    leaders: [
      { name: 'Yuhao Kang', years: '19-23' },
      { name: 'Bing Zhou', years: '23-24' },
      { name: 'Yikang Wang', years: '21-26' },
      { name: 'Yanbing Chen', years: '24-now' },
      { name: 'Sigao Li', years: '26-now' },
    ],
    projectIntro: ProjectIntro[0],
    mission: [
      'GISphere 致力于在全球范围内普及地理信息科学（GIS）教育。我们由一群具有前瞻性思维的中国学生和学者于 2019 年创立，通过促进信息的开放获取、培养学术合作以及连接研究与产业，我们的平台努力打破 GIS 教育中的各种障碍。',
      '我们相信知识应该自由共享，通过提供一个集中的 GIS 相关资源、学术机会和专业网络的平台，我们旨在赋能全球的学生、研究人员和专业人士。我们的最终目标是培育一个充满活力、包容性强且创新的 GIS 社区，推动学术界和产业界的共同进步。',
    ],

    initiativesTitle: '核心平台',
    initiativesLede: '点击任一平台，开始探索。',
    ctaExplore: '进入',
    ctaExternal: '前往',
    opensNewTab: '（在新标签页打开）',
    initiatives: [
      {
        title: 'GISphere Guide',
        tag: '院校数据库',
        art: 'guide',
        desc: '我们的旗舰数据库，提供全球 80 多个国家的 GIS 和地理机构及研究生项目的综合信息。',
        to: '/school',
      },
      {
        title: 'GISalon',
        tag: '圆桌视频',
        art: 'salon',
        desc: '一系列引人入胜的圆桌讨论，为学生提供关于研究生学习经验、学术路径和职业发展的宝贵见解。',
        to: 'https://space.bilibili.com/1043870260',
        external: true,
      },
      {
        title: 'GISource',
        tag: '招生与招聘',
        art: 'source',
        desc: '全球新闻服务，提供 GIS 相关硕士和博士项目招生及学术/行业招聘机会的最新信息。',
        to: '/postList?type=academic',
      },
      {
        title: 'GIStory',
        tag: '人物访谈',
        art: 'story',
        desc: '与塑造 GIScience 未来的地理学者、科学家和从业者对话，分享他们的故事与研究历程。',
        to: '/gistory',
      },
    ],

    journeyTitle: '我们的旅程',
    journey: [
      'GISphere 最初是一个专注于用中文发布 GIS 相关文章和社交媒体内容的平台，专为寻求地理空间教育的中国学生设计。随着时间的推移，我们已经突破了语言和地域的界限，发展成为一个连接不同背景的学者、教育者和专业人士的全球性倡议。',
      '随着 GISphere 的不断发展，我们将继续致力于通过扩展资源、促进合作和使 GIS 知识在全球范围内更加普及，来丰富 GIS 教育生态系统。',
    ],

    sponsorsTitle: '赞助商',
    sponsorsLede: '感谢以下伙伴对 GISphere 的支持。',
    visitSite: '访问官网',
    sponsors: [
      {
        name: 'Maptable',
        note: '新一代空间数据协同工具',
        url: 'https://maptable.com',
        logo: '/maptable_logo.png',
      },
      {
        name: 'GIS-Vision',
        url: 'https://mp.weixin.qq.com/s/LPq-pXcoLwVkEQ5bcnT46g',
        logo: '/vision_logo.png',
      },
      {
        name: 'ElevenLabs',
        note: 'AI 语音与音频平台',
        url: 'https://try.elevenlabs.io/GISphere',
        logo: '/elevenlabs-logo-black.png',
      },
    ],
    becomeSponsor: {
      name: '成为赞助商？',
      note: '联系 contact@gisphere.info',
      url: 'mailto:contact@gisphere.info',
    },

    metaDescription:
      'GISphere 分享全球 GIS 与地理信息科学的招生信息、院校指南与学术资源。',
  },

  en: {
    heroHeading: 'Where GeoSpatial Thinking Shines',
    heroDescription: 'Empower GIScience and Geography education for the future',
    heroNavLabel: 'Primary sections',
    ctas: [
      {
        label: 'Academic Recruiting',
        to: '/postList?type=academic',
        variant: 'primary',
      },
      { label: 'GISphere Guide', to: '/school' },
      // Counterpart to the ZH WeChat link above — intentionally a different
      // destination, not a copy of it.
      { label: 'GIStory Interview', to: '/gistory' },
      { label: 'Suggest Edit', to: '/suggestion', variant: 'accent' },
    ],
    subscribe: 'Subscribe to Email',
    whiteBook: 'GISphere Global Admission Annual Review',
    contact: 'Contact Us / Join Us',
    community: 'Join our WhatsApp',
    qrSrc: '/WhatsApp.png', // files in /static are served from the root
    qrAlt: 'GISphere WhatsApp community QR code',

    aboutTitle: 'About Us',
    leadershipTitle: 'Chairs and Co-Chairs',
    leaders: [
      { name: 'Yuhao Kang', years: '19-23' },
      { name: 'Bing Zhou', years: '23-24' },
      { name: 'Yikang Wang', years: '21-26' },
      { name: 'Yanbing Chen', years: '24-now' },
      { name: 'Sigao Li', years: '26-now' },
    ],
    projectIntro: ProjectIntro[1],
    mission: [
      'At GISphere, we are committed to democratizing access to Geographic Information Science (GIS) education worldwide. Established in 2019 by a group of forward-thinking Chinese students and scholars, our platform strives to break barriers in GIS education by promoting open access to information, fostering academic collaboration, and bridging the gap between research and industry.',
      'We believe that knowledge should be freely shared, and by providing a centralized hub for GIS-related resources, academic opportunities, and professional networking, we aim to empower students, researchers, and professionals across the globe. Our ultimate goal is to cultivate a dynamic, inclusive, and innovative GIS community that drives progress in both academia and industry.',
    ],

    initiativesTitle: 'Core Initiatives',
    initiativesLede:
      'Pick a starting point — each card opens a GISphere platform.',
    ctaExplore: 'Explore',
    ctaExternal: 'Watch',
    opensNewTab: '(opens in a new tab)',
    initiatives: [
      {
        title: 'GISphere Guide',
        tag: 'Program database',
        art: 'guide',
        desc: 'Our flagship database, covering GIS and Geography institutions and graduate programs across more than 80 countries.',
        to: '/school',
      },
      {
        title: 'GISalon',
        tag: 'Video roundtables',
        art: 'salon',
        desc: 'Roundtable discussions offering students insight into graduate study, academic pathways, and career development.',
        to: 'https://www.youtube.com/@gisphere',
        external: true,
      },
      {
        title: 'GISource',
        tag: 'Admissions & jobs',
        art: 'source',
        desc: "Up-to-date listings for GIS master's and doctoral admissions, plus academic and industry openings worldwide.",
        to: '/postList?type=academic',
      },
      {
        title: 'GIStory',
        tag: 'Interview series',
        art: 'story',
        desc: 'Conversations with geographers, scientists, and practitioners shaping the future of GIScience.',
        to: '/gistory',
      },
    ],

    journeyTitle: 'Our Journey',
    journey: [
      'GISphere started as a platform publishing GIS-related articles and social media content in Chinese, designed to support Chinese students seeking accessible geospatial education. Over time we have grown beyond linguistic and regional boundaries, evolving into a global initiative that connects scholars, educators, and professionals across diverse backgrounds.',
      'As GISphere continues to grow, we remain dedicated to enriching the GIS education ecosystem by expanding resources, facilitating collaborations, and making GIS knowledge more accessible worldwide.',
    ],

    sponsorsTitle: 'Sponsors',
    sponsorsLede: 'Thank you to the partners who make GISphere possible.',
    visitSite: 'Visit site',
    sponsors: [
      {
        name: 'Maptable',
        note: 'Next-Generation Spatial Data Analytics Platform',
        url: 'https://maptable.com',
        logo: '/maptable_logo.png',
      },
      {
        name: 'GIS-Vision',
        url: 'https://mp.weixin.qq.com/s/LPq-pXcoLwVkEQ5bcnT46g',
        logo: '/vision_logo.png',
      },
      {
        name: 'ElevenLabs',
        note: 'AI Voice & Audio Platform',
        url: 'https://try.elevenlabs.io/GISphere',
        logo: '/elevenlabs-logo-black.png',
      },
    ],
    becomeSponsor: {
      name: 'Become Our Sponsor?',
      note: 'mail to contact@gisphere.info',
      url: 'mailto:contact@gisphere.info',
    },

    metaDescription:
      'GISphere shares GIS and Geography admissions news, a global program guide, and academic resources.',
  },
}

export default {
  name: 'IndexPage',
  data() {
    return {
      showContactCard: false,
    }
  },
  head() {
    return {
      title: 'GISphere',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.t.metaDescription,
        },
        { hid: 'og:title', property: 'og:title', content: 'GISphere' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.t.metaDescription,
        },
      ],
      htmlAttrs: { lang: this.lang === 'zh' ? 'zh-CN' : 'en' },
    }
  },
  computed: {
    ...mapState({ lang: 'language' }),
    t() {
      return COPY[this.lang] || COPY.en
    },
    letterSpacingClass() {
      return this.lang === 'zh' ? 'is-zh' : 'is-en'
    },
  },
  methods: {
    onContactBlur(e) {
      // Only close when focus leaves the whole contact group.
      if (!e.currentTarget.contains(e.relatedTarget)) {
        this.showContactCard = false
      }
    },
  },
}
</script>

<style scoped>
/* ---------- tokens ---------- */
.main {
  --brand: #2c3aaa;
  --brand-ink: #1e2a80;
  --accent: #6b7280;
  --accent-ink: #4b515e;
  --ink: #1f1f20;
  --ink-soft: #444;
  --tint: #f6f7fc;
  --line: #e3e5f0;
  --radius: 12px;
  /* Height of the site nav bar above the hero. Measure yours and adjust —
     this is the one value the hero's vertical fit depends on. */
  --nav-h: 56px;
  /* Grows with the viewport instead of stopping dead at 1200px. */
  --page-max: clamp(1040px, 86vw, 1520px);
  --gutter: clamp(20px, 5vw, 72px);
  width: 100%;
}

/* ---------- hero ---------- */
.hero {
  position: relative;
  min-height: calc(100vh - var(--nav-h));
  min-height: calc(100svh - var(--nav-h));
  display: flex;
  flex-direction: column;
}
.hero__bg {
  position: absolute;
  inset: 0;
}
.hero__inner {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: var(--page-max);
  margin: 0 auto;
  padding: clamp(40px, 7vh, 76px) var(--gutter) 24px;
}
.hero__heading {
  margin: 0;
  font-weight: 800;
  /* Fluid instead of transform:scale() — stays sharp, reflows properly. */
  font-size: clamp(2rem, 4.6vw, 3.25rem);
  line-height: 1.16;
  color: #fff;
  /* No overlay now, so the type carries its own contrast. Three tight
     layers instead of the original four 80px blurs: same halo, less paint. */
  text-shadow: 0 1px 2px rgba(20, 23, 42, 0.55), 0 0 18px rgba(20, 23, 42, 0.75),
    0 0 44px rgba(20, 23, 42, 0.55);
  max-width: 18ch;
}
.hero__description {
  margin: 16px 0 0;
  font-size: clamp(1.1rem, 1.7vw, 1.35rem);
  font-weight: 600;
  color: #fff;
  text-shadow: 0 1px 2px rgba(20, 23, 42, 0.78), 0 0 10px rgba(20, 23, 42, 0.82);
  /* narrower measure + balanced breaks: no lone "future" on line 2 */
  max-width: 34ch;
  text-wrap: balance;
}
.is-zh {
  letter-spacing: 2px;
}
.is-en {
  letter-spacing: 0.5px;
}
@media (min-width: 900px) {
  .is-en .hero__heading {
    max-width: none;
    white-space: nowrap;
  }
}

/* ---------- CTAs ---------- */
.cta-group {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 36px;
}
.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 190px;
  min-height: 50px;
  padding: 0 22px;
  font-family: 'Montserrat', sans-serif;
  font-size: 17px;
  font-weight: 500;
  letter-spacing: normal;
  border-radius: 6px;
  border: 2px solid var(--brand);
  text-decoration: none;
  transition: transform 120ms ease, background-color 120ms ease,
    color 120ms ease, border-color 120ms ease;
}
.cta-btn--primary {
  background-color: var(--brand);
  color: #fff;
}
.cta-btn--outline {
  background-color: #fff;
  color: var(--brand);
}
/* Contribution ask: a solid neutral so it reads as a different kind of
   action from the three destinations, without adding a second brand hue. */
.cta-btn--accent {
  background-color: var(--accent);
  border-color: var(--accent);
  color: #fff;
  font-weight: 600;
}
.cta-btn--accent:hover {
  background-color: var(--accent-ink);
  border-color: var(--accent-ink);
  color: #fff;
}
.cta-btn:hover {
  transform: translateY(-1px);
  background-color: var(--brand-ink);
  border-color: var(--brand-ink);
  color: #fff;
}

/* ---------- utility row (was position:absolute, overflowed on mobile) ---------- */
.hero__utility {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 12px;
  width: 100%;
  max-width: var(--page-max);
  margin: 0 auto;
  padding: 0 var(--gutter) clamp(24px, 4vh, 48px);
}
.utility-btn {
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  padding: 0 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  border-radius: 999px;
  border: 2px solid var(--brand);
  background-color: rgba(255, 255, 255, 0.85);
  color: var(--brand);
  text-decoration: none;
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease;
}
.utility-btn:hover,
.utility-btn:focus-visible {
  background-color: var(--brand);
  color: #fff;
}
.utility-btn--solid {
  border-color: transparent;
  background-color: rgba(255, 255, 255, 0.92);
}

/* ---------- contact popover ---------- */
.contact {
  position: relative;
}
.contact__card {
  position: absolute;
  right: 0;
  bottom: calc(100% + 12px);
  width: 200px;
}
.contact__row {
  display: block;
  margin: 0 0 6px;
  padding: 0 12px;
  background-color: #fff;
  border-radius: 999px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 13px;
  color: var(--ink);
  text-decoration: none;
  /* email must stay selectable/copyable */
  user-select: text;
}
a.contact__row:hover {
  color: var(--brand);
}
.contact__qr {
  background-color: #fff;
  border-radius: 16px;
  padding: 14px;
}
.contact__qr img {
  display: block;
  width: 100%;
  height: auto;
}
.trans-content-enter-active,
.trans-content-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.trans-content-enter,
.trans-content-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}

/* ---------- sections ---------- */
.section {
  padding: clamp(48px, 7vw, 84px) 0;
}
.section--tint {
  background-color: var(--tint);
}
.container {
  /* replaces the fixed 151.5px side margins */
  width: 100%;
  max-width: min(var(--page-max), 1240px);
  margin: 0 auto;
  padding: 0 var(--gutter);
}
.section__title {
  margin: 0 0 32px;
  text-align: center;
  font-size: clamp(1.6rem, 3.2vw, 2.35rem);
  font-weight: 700;
  color: var(--brand);
}
.section__title::after {
  content: '';
  display: block;
  width: 56px;
  height: 2px;
  margin: 16px auto 0;
  background-color: var(--brand);
}
.prose {
  max-width: 70ch;
  margin: 0 auto;
  color: var(--ink-soft);
  /* grows on large displays so the measure fills more of the column */
  font-size: clamp(16px, 1.05vw, 19px);
  line-height: 1.75;
}
.prose p + p {
  margin-top: 16px;
}

.leadership {
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
}
.leadership__title {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 600;
  color: var(--brand);
}
.leaders {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 15px;
}
.leaders li {
  white-space: nowrap;
}
.leaders b {
  font-weight: 600;
}

/* ---------- section lede ---------- */
.section__lede {
  max-width: 60ch;
  margin: -12px auto 36px;
  text-align: center;
  color: var(--ink-soft);
  font-size: clamp(15px, 1vw, 17px);
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* ---------- initiative cards ---------- */
.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin: 0;
  padding: 0;
  list-style: none;
}
@media (min-width: 620px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1100px) {
  .cards {
    grid-template-columns: repeat(4, 1fr);
  }
}
.card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(30, 42, 128, 0.06);
  text-decoration: none;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
.card:hover,
.card:focus-visible {
  transform: translateY(-6px);
  border-color: var(--brand);
  box-shadow: 0 14px 30px rgba(44, 58, 170, 0.16);
}
.card__art {
  box-sizing: border-box;
  position: relative;
  aspect-ratio: 2 / 1;
  padding: 14px 16px;
  background: linear-gradient(160deg, #f3f5ff 0%, #e6eafb 100%);
  border-bottom: 1px solid var(--line);
}
/* faint graticule behind every illustration ties the set together */
.card__art::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      rgba(44, 58, 170, 0.06) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(44, 58, 170, 0.06) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
}
.card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px 22px 22px;
}
.card__tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--accent);
}
.card__index {
  color: var(--brand);
  font-variant-numeric: tabular-nums;
}
.card__title {
  margin: 0 0 10px;
  font-size: 21px;
  font-weight: 700;
  color: var(--brand);
}
.card__desc {
  flex: 1;
  margin: 0 0 18px;
  font-size: 15px;
  line-height: 1.6;
  color: var(--ink-soft);
}
.card__cta {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  background: var(--tint);
  color: var(--brand);
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.25s ease, color 0.25s ease;
}
.card__cta-icon {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.25s ease;
}
.card:hover .card__cta,
.card:focus-visible .card__cta {
  background: var(--brand);
  color: #fff;
}
.card:hover .card__cta-icon,
.card:focus-visible .card__cta-icon {
  transform: translateX(3px);
}

/* ---------- sponsors ---------- */
.sponsors {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.sponsor {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 100%;
  min-height: 150px;
  padding: 24px 20px 34px;
  background-color: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  text-align: center;
  color: var(--ink);
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease,
    border-color 0.25s ease;
}
.sponsor__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  width: 100%;
}
.sponsor__logo img {
  display: block;
  max-width: min(72%, 180px);
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.25s ease;
}
.sponsor__note {
  font-size: 13px;
  line-height: 1.4;
  color: var(--ink-soft);
}
.sponsor__visit {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  font-size: 12px;
  font-weight: 600;
  color: var(--brand);
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.sponsor:hover,
.sponsor:focus-visible {
  transform: translateY(-4px);
  border-color: var(--brand);
  box-shadow: 0 10px 22px rgba(44, 58, 170, 0.12);
}
.sponsor:hover .sponsor__logo img,
.sponsor:focus-visible .sponsor__logo img {
  transform: scale(1.05);
}
.sponsor:hover .sponsor__visit,
.sponsor:focus-visible .sponsor__visit {
  opacity: 1;
  transform: none;
}
/* touch screens have no hover: keep the affordance visible */
@media (hover: none) {
  .sponsor__visit {
    opacity: 1;
    transform: none;
  }
}
.sponsor--join {
  gap: 6px;
  padding-bottom: 24px;
  background: transparent;
  border: 1.5px dashed #b9bfe0;
  color: var(--brand);
}
.sponsor__plus {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--brand);
  color: #fff;
  font-size: 22px;
  line-height: 1;
}

/* ---------- a11y / motion floor ---------- */
/* Double ring: dark core stays visible on the light hero and white cards,
   pale halo keeps it visible on the indigo and gray fills. */
:focus-visible {
  outline: 3px solid #1f2233;
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.95);
}
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}

/* ---------- mobile ---------- */
@media (max-width: 768px) {
  .cta-group {
    flex-direction: column;
    align-items: stretch;
  }
  .cta-btn {
    width: 100%;
    min-width: 0;
  }
  .hero__utility {
    justify-content: flex-start;
  }
  .utility-btn {
    flex: 1 1 100%;
    justify-content: center;
    text-align: center;
  }
  .contact {
    flex: 1 1 100%;
  }
  .contact .utility-btn {
    width: 100%;
  }
  .contact__card {
    right: auto;
    left: 0;
  }
}
</style>

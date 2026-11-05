<template>
  <!-- Decorative illustration for a Core Initiatives card. Purely visual:
       the card's own title/description carry the meaning, so it is hidden
       from assistive tech. Hover/focus animations are driven by the parent
       `.art-host` element (the card link). -->
  <svg
    class="art"
    :class="'art--' + kind"
    viewBox="0 0 240 120"
    aria-hidden="true"
    focusable="false"
  >
    <!-- ============ GISphere Guide: globe with program pins ============ -->
    <g v-if="kind === 'guide'">
      <g class="globe">
        <circle cx="120" cy="60" r="42" class="fill-soft stroke-main" />
        <ellipse cx="120" cy="60" rx="18" ry="42" class="stroke-faint" />
        <ellipse cx="120" cy="60" rx="34" ry="42" class="stroke-faint" />
        <line x1="78" y1="60" x2="162" y2="60" class="stroke-faint" />
        <path d="M84 40 H156 M84 80 H156" class="stroke-faint" />
        <!-- land masses -->
        <path
          d="M98 38c8-4 16 0 18 6s-4 10-10 10-12 4-14-2 0-12 6-14z"
          class="fill-land"
        />
        <path
          d="M128 64c6-2 14 2 16 8s-4 12-10 12-8-6-9-10 0-8 3-10z"
          class="fill-land"
        />
      </g>
      <g class="pins">
        <g class="pin pin--1" transform="translate(104 46)">
          <circle r="7" class="pulse" />
          <circle r="3.5" class="dot" />
        </g>
        <g class="pin pin--2" transform="translate(136 72)">
          <circle r="7" class="pulse" />
          <circle r="3.5" class="dot" />
        </g>
        <g class="pin pin--3" transform="translate(146 44)">
          <circle r="7" class="pulse" />
          <circle r="3.5" class="dot" />
        </g>
      </g>
      <!-- stat chip -->
      <g transform="translate(172 22)">
        <g class="chip">
          <rect width="52" height="22" rx="11" class="fill-main" />
          <text x="26" y="15" text-anchor="middle" class="chip-text">80+</text>
        </g>
      </g>
    </g>

    <!-- ============ GISalon: roundtable video ============ -->
    <g v-else-if="kind === 'salon'">
      <rect
        x="54"
        y="18"
        width="132"
        height="84"
        rx="10"
        class="fill-soft stroke-main"
      />
      <g class="speakers">
        <g class="speaker speaker--1">
          <circle cx="84" cy="52" r="10" class="fill-main" />
          <path d="M68 84c2-10 9-16 16-16s14 6 16 16z" class="fill-main" />
        </g>
        <g class="speaker speaker--2">
          <circle cx="120" cy="48" r="11" class="fill-accent" />
          <path d="M102 84c2-11 10-18 18-18s16 7 18 18z" class="fill-accent" />
        </g>
        <g class="speaker speaker--3">
          <circle cx="156" cy="52" r="10" class="fill-main" />
          <path d="M140 84c2-10 9-16 16-16s14 6 16 16z" class="fill-main" />
        </g>
      </g>
      <rect x="54" y="84" width="132" height="18" class="fill-main-soft" />
      <g class="bubble bubble--l">
        <rect
          x="18"
          y="20"
          width="34"
          height="20"
          rx="8"
          class="fill-white stroke-main"
        />
        <path d="M36 40l6 8 2-8" class="fill-white stroke-main" />
        <circle cx="28" cy="30" r="2" class="fill-main" />
        <circle cx="35" cy="30" r="2" class="fill-main" />
        <circle cx="42" cy="30" r="2" class="fill-main" />
      </g>
      <g class="bubble bubble--r">
        <rect
          x="190"
          y="30"
          width="34"
          height="20"
          rx="8"
          class="fill-white stroke-main"
        />
        <path d="M200 50l-2 8 8-8" class="fill-white stroke-main" />
        <path d="M198 40h18" class="stroke-main" />
      </g>
      <g class="play">
        <circle cx="120" cy="93" r="7" class="play-ring" />
        <path d="M115 88l10 5-10 5z" class="fill-white" />
      </g>
    </g>

    <!-- ============ GISource: live listings feed ============ -->
    <g v-else-if="kind === 'source'">
      <g class="row row--3">
        <rect
          x="52"
          y="78"
          width="136"
          height="24"
          rx="6"
          class="fill-white stroke-faint-solid"
        />
        <rect
          x="62"
          y="87"
          width="10"
          height="6"
          rx="3"
          class="fill-main-soft"
        />
        <rect x="80" y="87" width="70" height="6" rx="3" class="fill-faint" />
      </g>
      <g class="row row--2">
        <rect
          x="52"
          y="48"
          width="136"
          height="24"
          rx="6"
          class="fill-white stroke-faint-solid"
        />
        <rect
          x="62"
          y="57"
          width="10"
          height="6"
          rx="3"
          class="fill-main-soft"
        />
        <rect x="80" y="57" width="88" height="6" rx="3" class="fill-faint" />
      </g>
      <g class="row row--1">
        <rect
          x="52"
          y="18"
          width="136"
          height="24"
          rx="6"
          class="fill-white stroke-main"
        />
        <rect x="62" y="27" width="10" height="6" rx="3" class="fill-main" />
        <rect
          x="80"
          y="27"
          width="60"
          height="6"
          rx="3"
          class="fill-main-soft"
        />
        <g class="new-badge">
          <rect
            x="150"
            y="23"
            width="30"
            height="14"
            rx="7"
            class="fill-accent"
          />
          <text x="165" y="33" text-anchor="middle" class="badge-text">
            NEW
          </text>
        </g>
      </g>
      <!-- radar / broadcast arcs -->
      <g class="signal" transform="translate(30 60)">
        <circle r="4" class="fill-main" />
        <path d="M8 -8a11 11 0 0 1 0 16" class="stroke-main arc arc--1" />
        <path d="M13 -14a19 19 0 0 1 0 28" class="stroke-main arc arc--2" />
      </g>
      <g class="signal" transform="translate(210 60) scale(-1 1)">
        <circle r="4" class="fill-main" />
        <path d="M8 -8a11 11 0 0 1 0 16" class="stroke-main arc arc--1" />
        <path d="M13 -14a19 19 0 0 1 0 28" class="stroke-main arc arc--2" />
      </g>
    </g>

    <!-- ============ GIStory: a journey told as a path ============ -->
    <g v-else-if="kind === 'story'">
      <path
        d="M24 92 C60 92 64 40 100 40 S140 88 176 76 S210 34 220 28"
        class="trail-base"
      />
      <path
        d="M24 92 C60 92 64 40 100 40 S140 88 176 76 S210 34 220 28"
        class="trail"
        pathLength="100"
      />
      <g transform="translate(24 92)">
        <g class="milestone m--1">
          <circle r="6" class="fill-white stroke-main" />
        </g>
      </g>
      <g transform="translate(100 40)">
        <g class="milestone m--2">
          <circle r="6" class="fill-white stroke-main" />
        </g>
      </g>
      <g transform="translate(176 76)">
        <g class="milestone m--3">
          <circle r="6" class="fill-white stroke-main" />
        </g>
      </g>
      <g transform="translate(220 28)">
        <g class="milestone m--4 flag">
          <path d="M0 0v-20" class="stroke-main" />
          <path d="M0 -20h14l-4 5 4 5H0z" class="fill-accent" />
          <circle r="4" class="fill-main" />
        </g>
      </g>
      <!-- quote card -->
      <g transform="translate(108 70)">
        <g class="quote">
          <rect width="52" height="34" rx="8" class="fill-white stroke-main" />
          <text x="10" y="24" class="quote-mark">&#8220;</text>
          <rect
            x="24"
            y="11"
            width="20"
            height="4"
            rx="2"
            class="fill-main-soft"
          />
          <rect x="24" y="19" width="14" height="4" rx="2" class="fill-faint" />
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'InitiativeArt',
  props: {
    kind: {
      type: String,
      required: true,
      validator: (v) => ['guide', 'salon', 'source', 'story'].includes(v),
    },
  },
}
</script>

<style scoped>
.art {
  --main: #2c3aaa;
  --main-soft: #c9cff2;
  --soft: #eef0fb;
  --faint: #dfe2f1;
  --accent: #f2a541;
  --land: #b8c0ee;
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* ---------- paint helpers ---------- */
.fill-main {
  fill: var(--main);
}
.fill-main-soft {
  fill: var(--main-soft);
}
.fill-soft {
  fill: var(--soft);
}
.fill-faint {
  fill: var(--faint);
}
.fill-accent {
  fill: var(--accent);
}
.fill-land {
  fill: var(--land);
}
.fill-white {
  fill: #fff;
}
.stroke-main {
  stroke: var(--main);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.stroke-main:not([class*='fill-']) {
  fill: none;
}
.stroke-faint {
  fill: none;
  stroke: var(--main-soft);
  stroke-width: 1.2;
}
.stroke-faint-solid {
  stroke: var(--faint);
  stroke-width: 1.5;
}
.chip-text,
.badge-text {
  fill: #fff;
  font: 700 12px/1 'Montserrat', system-ui, sans-serif;
}
.badge-text {
  font-size: 8px;
  letter-spacing: 0.5px;
}
.quote-mark {
  fill: var(--main);
  font: 700 26px/1 Georgia, serif;
}

/* Everything that moves transforms around its own box. */
.art * {
  transform-box: fill-box;
  transform-origin: center;
}

/* ================= idle cues (signal "this is alive / clickable") ======= */
.pulse {
  fill: var(--accent);
  opacity: 0.35;
  animation: art-pulse 2.4s ease-out infinite;
}
.pin--2 .pulse {
  animation-delay: 0.8s;
}
.pin--3 .pulse {
  animation-delay: 1.6s;
}
.dot {
  fill: var(--accent);
  stroke: #fff;
  stroke-width: 1.5;
}

.new-badge {
  animation: art-blink 2.6s ease-in-out infinite;
}

.arc {
  opacity: 0.25;
  animation: art-arc 2.2s ease-in-out infinite;
}
.arc--2 {
  animation-delay: 0.3s;
}

.trail-base {
  fill: none;
  stroke: var(--faint);
  stroke-width: 3;
  stroke-dasharray: 2 6;
  stroke-linecap: round;
}
.trail {
  fill: none;
  stroke: var(--main);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 100;
  stroke-dashoffset: 62;
  transition: stroke-dashoffset 0.9s ease;
}

/* ================= hover / focus on the host card ================= */
.globe,
.chip,
.speaker,
.bubble,
.row,
.milestone,
.quote {
  transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease;
}

/* Guide: globe turns slightly, chip pops */
.art-host:hover .globe,
.art-host:focus-visible .globe {
  transform: rotate(-12deg) scale(1.04);
}
.art-host:hover .chip,
.art-host:focus-visible .chip {
  transform: translateY(-4px) scale(1.08);
}

/* Salon: speakers take turns, bubbles float */
.art-host:hover .speaker--2,
.art-host:focus-visible .speaker--2 {
  transform: translateY(-4px);
}
.art-host:hover .bubble--l,
.art-host:focus-visible .bubble--l {
  transform: translate(-3px, -4px) rotate(-4deg);
}
.art-host:hover .bubble--r,
.art-host:focus-visible .bubble--r {
  transform: translate(3px, -4px) rotate(4deg);
}
.play-ring {
  fill: none;
  stroke: #fff;
  stroke-width: 2;
  opacity: 0;
}
.art-host:hover .play-ring,
.art-host:focus-visible .play-ring {
  animation: art-ring 1.2s ease-out infinite;
}

/* Source: rows fan out like a fresh feed */
.art-host:hover .row--1,
.art-host:focus-visible .row--1 {
  transform: translateY(-4px);
}
.art-host:hover .row--3,
.art-host:focus-visible .row--3 {
  transform: translateY(4px);
  opacity: 0.7;
}
.art-host:hover .arc,
.art-host:focus-visible .arc {
  animation-duration: 1s;
}

/* Story: the path draws itself to the flag */
.art-host:hover .trail,
.art-host:focus-visible .trail {
  stroke-dashoffset: 0;
}
.art-host:hover .m--2,
.art-host:focus-visible .m--2 {
  transform: scale(1.25);
}
.art-host:hover .flag,
.art-host:focus-visible .flag {
  transform: translateY(-6px);
}
.art-host:hover .quote,
.art-host:focus-visible .quote {
  transform: translateY(-6px);
}

@keyframes art-pulse {
  0% {
    transform: scale(0.6);
    opacity: 0.55;
  }
  100% {
    transform: scale(2.2);
    opacity: 0;
  }
}
@keyframes art-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.55;
  }
}
@keyframes art-arc {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.9;
  }
}
@keyframes art-ring {
  0% {
    transform: scale(0.9);
    opacity: 0.9;
  }
  100% {
    transform: scale(2.4);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .art *,
  .art-host:hover .art *,
  .art-host:focus-visible .art * {
    animation: none !important;
    transition: none !important;
  }
}
</style>

<template>
  <client-only>
    <div ref="editorEl" class="quill-editor"></div>
  </client-only>
</template>
<script>
// quill 的 JS 只在客户端 mounted 时动态引入，避免 SSR 阶段访问 document 报错；
// 同时保证 quill 只打进用到本组件的编辑页 chunk，不进首页。
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  props: {
    content: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      quill: null,
    }
  },
  async mounted() {
    const Quill = (await import('quill/dist/quill.js')).default
    this.quill = new Quill(this.$refs.editorEl, {
      theme: 'snow',
      modules: {
        toolbar: {
          container: ['bold', 'italic', 'link', 'image', 'video'],
          handlers: {
            image: () => {
              const range = this.quill.getSelection()
              const value = prompt('please copy paste the image url here.')
              if (value) {
                this.quill.insertEmbed(range.index, 'image', value)
              }
            },
          },
        },
      },
    })
    if (this.content) {
      this.quill.root.innerHTML = this.content
    }
    this.quill.on('text-change', () => {
      this.$emit('update:content', this.quill.root.innerHTML)
    })
  },
  watch: {
    content(val) {
      if (this.quill && val !== this.quill.root.innerHTML) {
        this.quill.root.innerHTML = val || ''
      }
    },
  },
  beforeDestroy() {
    this.quill = null
  },
}
</script>
<style scoped>
.quill-editor {
  height: 500px;
}
</style>

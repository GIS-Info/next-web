<template>
  <div
    v-quill:myQuillEditor="editorOption" 
    class="quill-editor"
    :content="content"
    @change="onEditorChange($event)">
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: String,
      default: () => '',
    }
  },
  data() {
    return {
      editorOption: {
            modules: {
                toolbar: {
                  container: ["background", "bold", "color", "italic", "link", "image", "video"],
                  handlers: {
                    image: () => {
                      const range = this.myQuillEditor.getSelection();
                      const value = prompt("please copy paste the image url here.");
                      if (value) {
                          this.myQuillEditor.insertEmbed(range.index, "image", value);
                      }
                    }
                  }
                }
            }
        }
    }
  },
  methods: {
    onEditorChange({ editor, html, text }) {
        console.log("editor change!", editor, html, text);
        if (html || html === "") {
            this.$emit('update:content', html)
        }
    }
  }
}
</script>
<style scoped>
  .quill-editor {
    height: 500px;
  }
</style>

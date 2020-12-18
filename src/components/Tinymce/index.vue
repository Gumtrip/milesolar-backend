<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" :upload-config="uploadConfig" @successCBK="imageSuccessCBK" />
    </div>
  </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import editorImage from './components/EditorImage'
import plugins from './plugins'
import toolbar from './toolbar'

// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one

import './tinymce_5.5.1/langs/zh_CN.js'
import './tinymce_5.5.1/plugins/advlist/plugin.min.js' // 高级列表
import './tinymce_5.5.1/plugins/anchor/plugin.min.js' // 锚点
import './tinymce_5.5.1/plugins/autolink/plugin.min.js' // 自动链接
import './tinymce_5.5.1/plugins/autoresize/plugin.min.js' // 编辑器高度自适应,注：plugins里引入此插件时，Init里设置的height将失效
import './tinymce_5.5.1/plugins/autosave/plugin.min.js' // 自动存稿
import './tinymce_5.5.1/plugins/charmap/plugin.min.js' // 特殊字符
import './tinymce_5.5.1/plugins/code/plugin.min.js' // 编辑源码
import './tinymce_5.5.1/plugins/codesample/plugin.min.js' // 代码示例
import './tinymce_5.5.1/plugins/directionality/plugin.min.js' // 文字方向
import './tinymce_5.5.1/plugins/emoticons/plugin.min.js' // 表情
import './tinymce_5.5.1/plugins/fullpage/plugin.min.js' // 文档属性
import './tinymce_5.5.1/plugins/fullscreen/plugin.min.js' // 全屏
import './tinymce_5.5.1/plugins/help/plugin.min.js' // 帮助
import './tinymce_5.5.1/plugins/hr/plugin.min.js' // 水平分割线
import './tinymce_5.5.1/plugins/image/plugin.min.js' // 插入编辑图片
import './tinymce_5.5.1/plugins/importcss/plugin.min.js' // 引入css
import './tinymce_5.5.1/plugins/insertdatetime/plugin.min.js' // 插入日期时间
import './tinymce_5.5.1/plugins/link/plugin.min.js' // 超链接
import './tinymce_5.5.1/plugins/lists/plugin.min.js' // 列表插件
import './tinymce_5.5.1/plugins/media/plugin.min.js' // 插入编辑媒体
import './tinymce_5.5.1/plugins/nonbreaking/plugin.min.js' // 插入不间断空格
import './tinymce_5.5.1/plugins/pagebreak/plugin.min.js' // 插入分页符
import './tinymce_5.5.1/plugins/paste/plugin.min.js' // 粘贴插件
import './tinymce_5.5.1/plugins/preview/plugin.min.js'// 预览
import './tinymce_5.5.1/plugins/print/plugin.min.js'// 打印
import './tinymce_5.5.1/plugins/quickbars/plugin.min.js' // 快速工具栏
import './tinymce_5.5.1/plugins/save/plugin.min.js' // 保存
import './tinymce_5.5.1/plugins/searchreplace/plugin.min.js' // 查找替换
import './tinymce_5.5.1/plugins/tabfocus/plugin.min.js' // 切入切出，按tab键切出编辑器，切入页面其他输入框中
import './tinymce_5.5.1/plugins/table/plugin.min.js' // 表格
import './tinymce_5.5.1/plugins/template/plugin.min.js' // 内容模板
import './tinymce_5.5.1/plugins/textcolor/plugin.min.js' // 文字颜色
import './tinymce_5.5.1/plugins/textpattern/plugin.min.js' // 快速排版
import './tinymce_5.5.1/plugins/toc/plugin.min.js' // 目录生成器
import './tinymce_5.5.1/plugins/visualblocks/plugin.min.js' // 显示元素范围
import './tinymce_5.5.1/plugins/visualchars/plugin.min.js' // 显示不可见字符
import './tinymce_5.5.1/plugins/wordcount/plugin.min.js' // 字数统计
// import './tinymce_5.5.1/plugins/powerpaste/plugin.min.js' // 这个插件用不用正版用不了，暂时放弃
export default {
  name: 'Tinymce',
  components: { editorImage },
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    },
    uploadConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN',
        'es': 'es_MX',
        'ja': 'ja'
      }
    }
  },
  computed: {
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    init() {
      this.initTinymce()
    },
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: this.languageTypeList['zh'],
        convert_urls: false, // 不转换地址
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        fontsize_formats: '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px', // 字体大小
        font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;', // 字体样式
        lineheight_formats: '0.5 0.8 1 1.2 1.5 1.75 2 2.5 3 4 5', // 行高配置，也可配置成"12px 14px 16px 20px"这种形式
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        branding: false,
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        }
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = _this.$store.getters.token;
        //   getToken(token).then(response => {
        //     const url = response.data.qiniu_url;
        //     const formData = new FormData();
        //     formData.append('token', response.data.qiniu_token);
        //     formData.append('key', response.data.qiniu_key);
        //     formData.append('file', blobInfo.blob(), url);
        //     upload(formData).then(() => {
        //       success(url);
        //       progress(100);
        //     })
        //   }).catch(err => {
        //     failure('出现未知问题，刷新页面，或者联系程序员')
        //     console.log(err);
        //   });
        // },
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    async imageSuccessCBK(arr) {
      const _this = this
      arr.forEach(v => {
        const img = v.response.full_path
        window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${img}" >`)
      })
    }
  }
}
</script>

<style scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 1*/
  z-index: 2005;
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>

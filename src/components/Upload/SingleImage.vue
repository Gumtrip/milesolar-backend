<template>
  <div class="upload-container">
    <el-upload
      :multiple="false"
      :show-file-list="false"
      :on-success="handleImageSuccess"
      :on-error="handleImageError"
      :before-upload="beforeUpload"
      name="images"
      class="image-uploader"
      drag
      :action="uploadUrl"
      :data="uploadConfig.data"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
    </el-upload>
    <div class="image-preview">
      <div v-show="imageUrl.length>1" class="image-preview-wrapper">
        <img :src="imageUrl">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { errorMessage } from '@/utils/api-handle'
import { Message } from 'element-ui'

export default {
  name: 'SingleImageUpload',
  props: {
    value: {
      type: String,
      default: ''
    },
    uploadConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tempUrl: '',
      uploadUrl: process.env.VUE_APP_BASE_API + 'admin/images'
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  methods: {
    rmImage() {
      this.emitInput('')
    },
    emitInput(val) {
      this.$emit('input', val)
    },
    handleImageSuccess(res, file) {
      this.emitInput(res.full_path)
    },
    beforeUpload(file) {
      const isImage = file.type === 'image/jpeg' || 'image/png' || 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isImage) {
        this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isImage && isLt2M
    },
    handleImageError(err, file, fileList) {
      const errorMsg = errorMessage(JSON.parse(err.message))
      Message({
        message: errorMsg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "~@/styles/mixin.scss";
    .upload-container {
        width: 100%;
        position: relative;
        @include clearfix;
        .image-uploader {
            width: 60%;
            float: left;
        }
        .image-preview {
            width: 200px;
            height: 200px;
            position: relative;
            border: 1px dashed #d9d9d9;
            float: left;
            margin-left: 50px;
            .image-preview-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .image-preview-action {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                cursor: default;
                text-align: center;
                color: #fff;
                opacity: 0;
                font-size: 20px;
                background-color: rgba(0, 0, 0, .5);
                transition: opacity .3s;
                cursor: pointer;
                text-align: center;
                line-height: 200px;
                .el-icon-delete {
                    font-size: 36px;
                }
            }
            &:hover {
                .image-preview-action {
                    opacity: 1;
                }
            }
        }
    }

</style>

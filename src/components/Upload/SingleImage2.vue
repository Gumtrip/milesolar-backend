<template>
  <div class="upload-container">
    <div class="upload-wrapper">
      <el-upload
        :multiple="true"
        :show-file-list="false"
        :on-success="handleImageSuccess"
        :on-error="handleImageError"
        :before-upload="beforeUpload"
        name="image"
        class="image-uploader"
        :action="uploadUrl"
        :data="uploadConfig.data"
      >
        <i class="el-icon-plus" />
      </el-upload>
    </div>
    <div v-show="value.length>0" class="image-preview">
      <div v-for="(img,key) in value" :key="key" class="image-preview-wrapper">
        <img :src="imageUrl(img)">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage(img)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { errorMessage } from '@/utils/api-handle'
import { Message } from 'element-ui'

export default {
  name: 'SingleImageUpload2',
  props: {
    value: {
      type: Array,
      default: () => function() { return [] }
    },
    uploadConfig: {
      type: Object,
      default: () => { return [] },
      required: false
    }
  },
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + 'admin/image'
    }
  },
  computed: {

  },
  watch: {
  },

  methods: {
    rmImage(img) {
      const index = this.value.indexOf(img)
      this.value.splice(index, 1)
      this.emitInput(this.value)
    },
    emitInput(val) {
      this.$emit('input', val)
    },
    handleImageSuccess(res, file) {
      this.value.push(res.path)
      this.emitInput(this.value)
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
    },
    imageUrl(path) {
      return process.env.VUE_APP_URL + path
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
    .upload-wrapper {float: left;width: 10%;margin: 0;
      .image-uploader {
        width: 150px;
        height: 150px;
        border: 1px dashed #d9d9d9;
        border-radius: 5px;
        .el-icon-plus{line-height: 150px;width: 150px;height: 150px}
      }
    }

    .image-preview {
      width: 90%;
      @include clearfix;
      float: left;
      .image-preview-wrapper {
        position: relative;
        border: 1px dashed #d9d9d9;
        width: 150px;
        height: 150px;
        display: inline-block;
        border-radius: 5px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
        .image-preview-action {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          text-align: center;
          color: #fff;
          opacity: 0;
          font-size: 20px;
          background-color: rgba(0, 0, 0, .5);
          transition: opacity .3s;
          cursor: pointer;
          line-height: 150px;
          .el-icon-delete {
            font-size: 30px;
          }
        }
        &:hover {
          .image-preview-action {
            opacity: 1;
          }
        }
      }

    }
  }

</style>

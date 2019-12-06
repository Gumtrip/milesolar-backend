<template>
  <div class="">
    <el-upload
      :multiple="true"
      list-type="picture-card"
      :on-success="handleImageSuccess"
      :on-error="handleImageError"
      :before-upload="beforeUpload"
      :on-preview="handlePictureCardPreview"
      name="image"
      class="image-uploader"
      :action="uploadUrl"
      :data="uploadConfig.data"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
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
      default: () => function() {
        return []
      }
    },
    uploadConfig: {
      type: Object,
      default: () => { return [] },
      required: false
    }
  },
  data() {
    return {
      tempUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      uploadUrl: process.env.VUE_APP_BASE_API + 'admin/image'
    }
  },
  computed: {
    imageUrl() {
      return this.value ? process.env.VUE_APP_URL + this.value : ''
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
      this.emitInput(res.path)
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
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

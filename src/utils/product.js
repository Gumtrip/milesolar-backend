import _ from 'lodash'

export function propertyTree(properties, cates) {
  const tree = _.groupBy(properties, 'property_category_id')// 将属性根据分类分组
  const cateData = []
  cates.forEach((cate, key) => {
    const children = tree[cate.id]
    if (children) {
      cateData.push({
        id: cate.id,
        title: cate.title,
        children: tree[cate.id]
      })
    }
  })
  return cateData
}


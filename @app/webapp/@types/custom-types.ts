export type BlockPropsNode = {
  children: any[]
  markDefs: any[]
  style: string
  _key: string
  _type: 'block'
}

export type ImagePropsNode = {
  _type: 'image'
  alt: string
  asset: {
    _ref: string
    _type: string
  }
}

export type BlockProps = {
  children: any[]
  isInline?: any
  node: BlockPropsNode
  options: any
}

export type ImageProps = {
  children: any[]
  isInline?: any
  node: ImagePropsNode
  options: any
}

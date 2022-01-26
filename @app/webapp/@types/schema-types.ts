export type Comment = {
  _id: string
  publishedAt: string
  author: string
  body: string
  isApproved: boolean
}

export type Post = {
  _id: string
  title: string
  subtitle: string
  slug: any
  body: any[]
  publishedAt: string
  comments: Comment[]
}

export type Song = {
  _id: string
  title: string
  writer: string
  producer: string
  yearWritten: number
  yearRecorded: number
  asset: {
    url: string
  }
}
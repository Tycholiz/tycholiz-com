export type Comment = {
  _id: string
  _createdAt: string
  author: string
  body: string
  isApproved: boolean
  reply: Reply
}

export type Reply = {
  _id: string
  publishedAt: string
  body: string
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
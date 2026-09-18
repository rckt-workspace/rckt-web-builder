export type PostStatus = "draft" | "published" | "archived";

export interface BlogAuthor {
  name: string;
  role: string;
}

export interface BlogSeo {
  title: string;
  description: string;
  canonical: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Markdown */
  content: string;
  coverImage: string;
  coverImageAlt: string;
  author: BlogAuthor;
  /** Category slug, matches BlogCategory.slug */
  category: string;
  tags: string[];
  status: PostStatus;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  seo: BlogSeo;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

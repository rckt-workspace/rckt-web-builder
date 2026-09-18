import postsSeed from "@/data/blog/posts.json";
import categoriesSeed from "@/data/blog/categories.json";
import type { BlogCategory, BlogPost } from "@/types/blog";

/**
 * Data access layer for the blog.
 *
 * Today: JSON seed + a temporary localStorage override layer (admin edits).
 * Tomorrow: swap JsonBlogRepository for a SupabaseBlogRepository implementing
 * the same interface — no UI change required.
 */
export interface BlogRepository {
  getAllPosts(): BlogPost[];
  getPublishedPosts(): BlogPost[];
  getPostBySlug(slug: string): BlogPost | undefined;
  getPostsByCategory(categorySlug: string): BlogPost[];
  searchPosts(query: string, categorySlug?: string): BlogPost[];
  getRelatedPosts(post: BlogPost, limit?: number): BlogPost[];
  getCategories(): BlogCategory[];
  savePost(post: BlogPost): void;
  deletePost(id: string): void;
  exportAll(): BlogPost[];
  resetLocal(): void;
  hasLocalChanges(): boolean;
}

const STORAGE_KEY = "rckt:blog:posts:v1";

const seedPosts = postsSeed as BlogPost[];
const categories = categoriesSeed as BlogCategory[];

function byDateDesc(a: BlogPost, b: BlogPost) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readStored(): BlogPost[] | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as BlogPost[]) : null;
  } catch {
    return null;
  }
}

function writeStored(posts: BlogPost[]) {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    window.dispatchEvent(new CustomEvent("rckt:blog:changed"));
  } catch {
    /* storage full or unavailable — keep the session working with seed data */
  }
}

class JsonBlogRepository implements BlogRepository {
  private all(): BlogPost[] {
    return (readStored() ?? seedPosts).slice();
  }

  getAllPosts(): BlogPost[] {
    return this.all().sort(byDateDesc);
  }

  getPublishedPosts(): BlogPost[] {
    return this.getAllPosts().filter((p) => p.status === "published");
  }

  getPostBySlug(slug: string): BlogPost | undefined {
    return this.getAllPosts().find((p) => p.slug === slug);
  }

  getPostsByCategory(categorySlug: string): BlogPost[] {
    if (!categorySlug || categorySlug === "all") return this.getPublishedPosts();
    return this.getPublishedPosts().filter((p) => p.category === categorySlug);
  }

  searchPosts(query: string, categorySlug = "all"): BlogPost[] {
    const base = this.getPostsByCategory(categorySlug);
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter((p) => {
      const haystack = [p.title, p.excerpt, p.category, ...p.tags].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }

  getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
    const others = this.getPublishedPosts().filter((p) => p.id !== post.id);
    const scored = others.map((p) => {
      const sameCategory = p.category === post.category ? 3 : 0;
      const sharedTags = p.tags.filter((t) => post.tags.includes(t)).length;
      return { post: p, score: sameCategory + sharedTags };
    });
    return scored
      .sort((a, b) => b.score - a.score || byDateDesc(a.post, b.post))
      .slice(0, limit)
      .map((s) => s.post);
  }

  getCategories(): BlogCategory[] {
    return categories;
  }

  savePost(post: BlogPost): void {
    const all = this.all();
    const idx = all.findIndex((p) => p.id === post.id);
    if (idx >= 0) all[idx] = post;
    else all.unshift(post);
    writeStored(all);
  }

  deletePost(id: string): void {
    writeStored(this.all().filter((p) => p.id !== id));
  }

  exportAll(): BlogPost[] {
    return this.getAllPosts();
  }

  resetLocal(): void {
    if (!canUseStorage()) return;
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("rckt:blog:changed"));
  }

  hasLocalChanges(): boolean {
    return readStored() !== null;
  }
}

export const blogRepository: BlogRepository = new JsonBlogRepository();

export const BLOG_CHANGED_EVENT = "rckt:blog:changed";

export function categoryName(slug: string): string {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

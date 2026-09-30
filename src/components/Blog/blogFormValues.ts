export type BlogFormValues = {
  title: string;
  image: string;
  excerpt: string;
  description: string;
  tags: string[];
  published: boolean;
};

export const emptyBlog: BlogFormValues = {
  title: "",
  image: "",
  excerpt: "",
  description: "",
  tags: [],
  published: true,
};

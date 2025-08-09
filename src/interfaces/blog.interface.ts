export interface BlogType {
  _id: string;
  title: string;
  description: string;
  slug: string;
}

export interface BlogCardProps {
  item: BlogType;
}

export interface Book {
  // wishlist: any;
  id: string;
  name: string;
  author:string;
  category: string;
  image: string;
  alt?: string;
  likes?: boolean;
  inLibrary?: boolean;
  progress?: 'to-read' | 'in-progress' | 'finished';
  notes?: string;
}

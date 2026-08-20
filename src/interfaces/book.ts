export type BookGenre = 'Yazılım & Bilim' | 'Roman & Edebiyat' | 'Tarih & Felsefe' | 'Kişisel Gelişim' | 'Diğer';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: BookGenre;
  totalPages: number;
  currentPage: number;
  rating: number;
  note?: string;
  status: 'Okunacak' | 'Okunuyor' | 'Bitti';
  updatedAt: string;
}
import { useState, useEffect } from 'react';
import type { Book } from './interfaces/book';
import { BookStats } from './components/BookStats';
import { BookForm } from './components/BookForm';
import { BookList } from './components/BookList';

const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    genre: 'Yazılım & Bilim',
    totalPages: 464,
    currentPage: 180,
    rating: 5,
    note: 'Fonksiyonlar küçük olmalı ve sadece tek bir iş yapmalı.',
    status: 'Okunuyor',
    updatedAt: '20.08.2026',
  },
  {
    id: '2',
    title: 'Cesur Yeni Dünya',
    author: 'Aldous Huxley',
    genre: 'Roman & Edebiyat',
    totalPages: 272,
    currentPage: 272,
    rating: 4,
    note: 'Distopik kurgusu ve toplumsal eleştirisi oldukça etkileyiciydi.',
    status: 'Bitti',
    updatedAt: '18.08.2026',
  },
  {
    id: '3',
    title: 'Kendime Düşünceler',
    author: 'Marcus Aurelius',
    genre: 'Tarih & Felsefe',
    totalPages: 168,
    currentPage: 0,
    rating: 5,
    note: 'Stoacı felsefeyi kavramak için temel başucu eseri.',
    status: 'Okunacak',
    updatedAt: '15.08.2026',
  },
];

function App() {
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('books_library_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.length > 0 ? parsed : INITIAL_BOOKS;
      } catch {
        return INITIAL_BOOKS;
      }
    }
    return INITIAL_BOOKS;
  });

  useEffect(() => {
    localStorage.setItem('books_library_data', JSON.stringify(books));
  }, [books]);

  const handleAddBook = (newBook: Book) => {
    setBooks((prev) => [newBook, ...prev]);
  };

  const handleDeleteBook = (id: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const handleUpdateProgress = (id: string, currentPage: number) => {
    setBooks((prev) =>
      prev.map((book) => {
        if (book.id === id) {
          const updatedPage = Math.min(book.totalPages, Math.max(0, currentPage));
          const updatedStatus = updatedPage >= book.totalPages ? 'Bitti' : (updatedPage > 0 ? 'Okunuyor' : book.status);
          return { ...book, currentPage: updatedPage, status: updatedStatus };
        }
        return book;
      })
    );
  };

  const handleToggleStatus = (id: string, status: Book['status']) => {
    setBooks((prev) =>
      prev.map((book) => {
        if (book.id === id) {
          const currentPage = status === 'Bitti' ? book.totalPages : (status === 'Okunacak' ? 0 : book.currentPage);
          return { ...book, status, currentPage };
        }
        return book;
      })
    );
  };

  const handleUpdateRating = (id: string, rating: number) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, rating } : book))
    );
  };

  const handleResetToDefault = () => {
    setBooks(INITIAL_BOOKS);
    localStorage.setItem('books_library_data', JSON.stringify(INITIAL_BOOKS));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-6">
          <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Kişisel Okuma Kütüphanesi
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-500 tracking-tight">
            BOOK TRACKER & LIBRARY
          </h1>
          <p className="text-slate-400 mt-2 text-sm max-w-xl mx-auto">
            Okuma hedeflerini belirle, sayfalarını güncelle, puanla ve kütüphaneni yönet.
          </p>

          <div className="mt-4">
            <button
              onClick={handleResetToDefault}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg transition"
            >
              🔄 Varsayılan Verileri Geri Yükle (Sıfırla)
            </button>
          </div>
        </header>

        <BookStats books={books} />
        <BookForm onAddBook={handleAddBook} />
        <BookList 
          books={books} 
          onDeleteBook={handleDeleteBook} 
          onUpdateProgress={handleUpdateProgress}
          onToggleStatus={handleToggleStatus}
          onUpdateRating={handleUpdateRating}
        />
      </div>
    </div>
  );
}

export default App;
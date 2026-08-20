import React, { useState } from 'react';
import type { Book, BookGenre } from '../interfaces/book';

interface Props {
  onAddBook: (book: Book) => void;
}

export const BookForm: React.FC<Props> = ({ onAddBook }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState<BookGenre>('Yazılım & Bilim');
  const [totalPages, setTotalPages] = useState<number | ''>('');
  const [currentPage, setCurrentPage] = useState<number | ''>('');
  const [rating] = useState<number>(5);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<Book['status']>('Okunacak');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !totalPages) return;

    const newBook: Book = {
      id: crypto.randomUUID(),
      title,
      author,
      genre,
      totalPages: Number(totalPages),
      currentPage: Number(currentPage) || 0,
      rating,
      note,
      status,
      updatedAt: new Date().toLocaleDateString('tr-TR'),
    };

    onAddBook(newBook);
    setTitle('');
    setAuthor('');
    setTotalPages('');
    setCurrentPage('');
    setNote('');
    setStatus('Okunacak');
    setIsOpen(false);
  };

  return (
    <div className="mb-8">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-200"
        >
          + Yeni Kitap Ekle
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-xl text-white">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-700">
            <h2 className="text-lg font-bold text-cyan-400">Yeni Kitap Kaydı</h2>
            <button 
              type="button" 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white text-sm"
            >
              Kapat
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Kitap Adı</label>
              <input 
                type="text" 
                placeholder="örn: Clean Code"
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Yazar</label>
              <input 
                type="text" 
                placeholder="örn: Robert C. Martin"
                value={author} 
                onChange={(e) => setAuthor(e.target.value)} 
                required 
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Kategori / Tür</label>
              <select 
                value={genre} 
                onChange={(e) => setGenre(e.target.value as BookGenre)}
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm focus:border-indigo-500 focus:outline-none"
              >
                <option value="Yazılım & Bilim">Yazılım & Bilim</option>
                <option value="Roman & Edebiyat">Roman & Edebiyat</option>
                <option value="Tarih & Felsefe">Tarih & Felsefe</option>
                <option value="Kişisel Gelişim">Kişisel Gelişim</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Toplam Sayfa</label>
              <input 
                type="number" 
                placeholder="464"
                value={totalPages} 
                onChange={(e) => setTotalPages(e.target.value === '' ? '' : Number(e.target.value))} 
                required 
                min="1"
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Şu Anki Sayfa</label>
              <input 
                type="number" 
                placeholder="0"
                value={currentPage} 
                onChange={(e) => setCurrentPage(e.target.value === '' ? '' : Number(e.target.value))} 
                min="0"
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Durum</label>
              <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value as Book['status'])}
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm focus:border-indigo-500 focus:outline-none"
              >
                <option value="Okunacak">Okunacak</option>
                <option value="Okunuyor">Okunuyor</option>
                <option value="Bitti">Bitti</option>
              </select>
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Kişisel Not veya Alıntı (Opsiyonel)</label>
              <input 
                type="text" 
                placeholder="örn: Fonksiyonlar küçük olmalı ve tek bir iş yapmalı."
                value={note} 
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm font-medium transition"
            >
              İptal
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold transition shadow-md"
            >
              Kitabı Kaydet
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
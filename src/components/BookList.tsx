import React, { useState } from 'react';
import type { Book } from '../interfaces/book';

interface Props {
  books: Book[];
  onDeleteBook: (id: string) => void;
  onUpdateProgress: (id: string, currentPage: number) => void;
  onToggleStatus: (id: string, status: Book['status']) => void;
  onUpdateRating: (id: string, rating: number) => void;
}

export const BookList: React.FC<Props> = ({ 
  books, 
  onDeleteBook, 
  onUpdateProgress, 
  onToggleStatus,
  onUpdateRating 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Tümü' | Book['status']>('Tümü');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPage, setEditPage] = useState<number>(0);

  const filteredBooks = books.filter((book) => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tümü' || book.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
        <input 
          type="text" 
          placeholder="Kitap, yazar veya türe göre ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-72 p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
        />

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1">
          {(['Tümü', 'Okunacak', 'Okunuyor', 'Bitti'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                statusFilter === filter 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12 bg-slate-800/40 border border-dashed border-slate-700 rounded-2xl">
          <p className="text-slate-400 text-sm">Kriterlere uygun kitap bulunamadı.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => {
            const progress = Math.min(100, Math.round((book.currentPage / book.totalPages) * 100)) || 0;

            return (
              <div 
                key={book.id} 
                className="bg-slate-800/90 border border-slate-700 hover:border-slate-600 transition rounded-2xl p-5 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-700 text-cyan-300 border border-slate-600">
                      {book.genre}
                    </span>
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                      book.status === 'Bitti' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      book.status === 'Okunuyor' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-slate-600/30 text-slate-300 border border-slate-600'
                    }`}>
                      {book.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-white leading-snug">{book.title}</h3>
                  <p className="text-slate-400 text-xs mb-3">Yazar: <span className="text-slate-300 font-medium">{book.author}</span></p>

                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => onUpdateRating(book.id, star)}
                        className={`text-sm transition ${star <= book.rating ? 'text-amber-400' : 'text-slate-600'}`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="text-xs text-slate-400 ml-1">({book.rating}/5)</span>
                  </div>

                  {book.note && (
                    <p className="text-xs italic bg-slate-900/60 text-slate-300 p-2.5 rounded-lg border border-slate-800 mb-4">
                      "{book.note}"
                    </p>
                  )}

                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>{book.currentPage} / {book.totalPages} sf.</span>
                      <span className="font-semibold text-cyan-400">%{progress}</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-300" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-700/80 pt-3 flex flex-col gap-2.5">
                  {editingId === book.id ? (
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        value={editPage} 
                        onChange={(e) => setEditPage(Number(e.target.value))}
                        max={book.totalPages}
                        min="0"
                        className="w-full p-1.5 rounded bg-slate-900 border border-slate-600 text-white text-xs"
                      />
                      <button 
                        onClick={() => {
                          onUpdateProgress(book.id, editPage);
                          setEditingId(null);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-3 py-1.5 rounded font-medium"
                      >
                        Kaydet
                      </button>
                      <button 
                        onClick={() => setEditingId(null)}
                        className="bg-slate-700 text-white text-xs px-2 py-1.5 rounded"
                      >
                        İptal
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => {
                          setEditingId(book.id);
                          setEditPage(book.currentPage);
                        }}
                        className="text-xs text-indigo-400 hover:text-indigo-300 underline"
                      >
                        Sayfa Güncelle
                      </button>

                      <select 
                        value={book.status} 
                        onChange={(e) => onToggleStatus(book.id, e.target.value as Book['status'])}
                        className="bg-slate-900 text-xs text-slate-200 border border-slate-700 rounded px-2 py-1 focus:outline-none"
                      >
                        <option value="Okunacak">Okunacak</option>
                        <option value="Okunuyor">Okunuyor</option>
                        <option value="Bitti">Bitti</option>
                      </select>
                    </div>
                  )}

                  <button 
                    onClick={() => onDeleteBook(book.id)}
                    className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs py-1.5 rounded-lg transition font-medium"
                  >
                    Kitabı Listeden Sil
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
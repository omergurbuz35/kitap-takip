import type { Book } from '../interfaces/book';

interface Props {
  books: Book[];
}

export function BookStats({ books }: Props) {
  const totalBooks = books.length;
  const completedBooks = books.filter((b) => b.status === 'Bitti').length;
  const currentlyReading = books.filter((b) => b.status === 'Okunuyor').length;
  const totalPagesRead = books.reduce((acc, b) => acc + (b.currentPage || 0), 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Kütüphane</p>
        <p className="text-2xl font-bold text-white mt-1">
          {totalBooks} <span className="text-xs font-normal text-slate-400">Kitap</span>
        </p>
      </div>
      <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Okunan Sayfa</p>
        <p className="text-2xl font-bold text-indigo-400 mt-1">
          {totalPagesRead.toLocaleString()} <span className="text-xs font-normal text-slate-400">sf.</span>
        </p>
      </div>
      <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Şu An Okunan</p>
        <p className="text-2xl font-bold text-amber-400 mt-1">
          {currentlyReading} <span className="text-xs font-normal text-slate-400">Kitap</span>
        </p>
      </div>
      <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Tamamlanan</p>
        <p className="text-2xl font-bold text-emerald-400 mt-1">
          {completedBooks} <span className="text-xs font-normal text-slate-400">Kitap</span>
        </p>
      </div>
    </div>
  );
}
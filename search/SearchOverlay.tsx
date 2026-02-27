import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, BookOpen } from 'lucide-react';
import { RaceIcon } from '@/components/common/RaceIcon';
import { books, rooms } from '@/data/mockData';

interface SearchOverlayProps {
  onClose: () => void;
}

type SearchTab = 'books' | 'authors' | 'users' | 'rooms';

export function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<SearchTab>('books');

  const tabs: { id: SearchTab; label: string }[] = [
    { id: 'books', label: 'Books' },
    { id: 'authors', label: 'Authors' },
    { id: 'users', label: 'Users' },
    { id: 'rooms', label: 'Rooms' },
  ];

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase())
  );

  const filteredRooms = rooms.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Baebles..."
            autoFocus
            className="w-full h-12 pl-10 pr-4 bg-muted rounded-xl font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-body whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4">
        {query.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="font-body">Start typing to search...</p>
          </div>
        ) : activeTab === 'books' ? (
          <div className="space-y-3">
            {filteredBooks.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No books found</p>
            ) : (
              filteredBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={onClose}
                  className="flex gap-3 p-3 bg-card rounded-xl border border-border cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-16 bg-muted rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-foreground truncate">{book.title}</h4>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : activeTab === 'rooms' ? (
          <div className="space-y-3">
            {filteredRooms.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No rooms found</p>
            ) : (
              filteredRooms.map((room) => (
                <div
                  key={room.id}
                  onClick={onClose}
                  className="flex gap-3 p-3 bg-card rounded-xl border border-border cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-xl">
                    {room.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-foreground">#{room.name}</h4>
                    <p className="text-sm text-muted-foreground truncate">{room.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">Coming soon...</p>
        )}
      </div>
    </motion.div>
  );
}

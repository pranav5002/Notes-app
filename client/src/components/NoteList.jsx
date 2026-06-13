import { useState } from "react"; 

function NoteList({ notes, onNoteClick, onDelete, activeNoteId }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notes.filter((note) => {
    const query = searchQuery.toLowerCase();
    return (
      note.id.toString().includes(query) || 
      note.title.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-700">Your Notes</h3>

      <div className="relative mb-2">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 text-sm">
          🔍
        </span>
        <input
          type="text"
          placeholder="Search by ID or title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-gray-400 hover:text-gray-600"
          >
            Clear
          </button>
        )}
      </div>

      {filteredNotes.length === 0 ? (
        <p className="text-gray-500 bg-gray-100 p-4 rounded-lg text-center text-sm">
          {notes.length === 0 
            ? "No notes yet. Create one above!" 
            : "No matching notes found."}
        </p>
      ) : (
        <div className="space-y-3">
          {filteredNotes.map((note) => {
            const isLong = note.content.length > 60;
            const previewText = isLong
              ? `${note.content.substring(0, 60)}...`
              : note.content;

            return (
              <div
                key={note.id}
                onClick={() => onNoteClick(note)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative group ${
                  activeNoteId === note.id
                    ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <div className="pr-12">
                  <span className="text-xs font-mono font-semibold text-blue-600 block mb-0.5">
                    ID: {note.id}
                  </span>
                  <h4 className="font-semibold text-gray-800 mb-1 truncate">
                    {note.title}
                  </h4>
                  <p className="text-sm text-gray-600 break-words">
                    {previewText}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(note.id);
                  }}
                  className="absolute right-3 top-3 text-gray-400 hover:text-red-600 p-1 rounded transition-colors"
                  title="Delete note"
                >
                  delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default NoteList;
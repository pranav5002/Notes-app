function NoteList({ notes, onNoteClick, onDelete, activeNoteId }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-700">Your Notes</h3>

      {notes.length === 0 ? (
        <p className="text-gray-500 bg-gray-100 p-4 rounded-lg text-center">
          No notes yet. Create one above!
        </p>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => {
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
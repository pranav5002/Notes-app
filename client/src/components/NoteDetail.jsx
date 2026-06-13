function NoteDetail({ note, onEditTrigger }) {
  if (!note) {
    return (
      <div className="h-64 flex flex--col items-center justify-center border-2 border-gray-200 rounded-xl bg-white p-6 text-center text-gray-400">
        <span className="text-4xl mb-2">📝</span>
        <p>Click a note from the list to view its full content.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <div className="flex justify-between items-start border-b border-gray-100 pb-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 break-words">
            {note.title}
          </h2>
          <span className="text-xs text-gray-400 font-mono block mt-1">
            Created:{note.createdAt}
          </span>
        </div>

        <button
          onClick={() => onEditTrigger(note)}
          className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium py-1.5 px-4 rounded-lg transition-colors shadow-sm"
        >
          Edit Note
        </button>
      </div>
      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
        {note.content}
      </div>
    </div>
  );
}

export default NoteDetail;
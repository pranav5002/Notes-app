import { useState, useEffect } from "react";

const NoteForm = ({ onSave, editNote, onCancelEdit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editNote]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim())
      return alert("Please fill out all the fields");

    onSave({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4"
    >
      <h3 className="text-lg font-bold text-gray-700">
        {editNote ? "Edit Note" : " Create New Note"}
      </h3>

      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Write your note contet here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="4"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors "
        >
          {editNote ? "Update Note" : "Add Note"}
        </button>
        {editNote && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;
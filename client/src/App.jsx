import { useState, useEffect } from "react";
import axios from "axios";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import NoteDetail from "./components/NoteDetail";

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedNote, setSelectedNote] = useState(null);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const API_URL = "http://localhost:5000/api/notes";

  const fetchNotes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setNotes(response.data);
    } catch (err) {
      setError(
        `Failed to fetch records: ${err.response?.data?.error || err.message}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeNotes = async () => {
      await fetchNotes();
    };

    initializeNotes();
  }, []);

  const handleSaveNote = async ({ title, content }) => {
    setError(null);
    try {
      if (noteToEdit) {
        const response = await axios.put(`${API_URL}/${noteToEdit.id}`, {
          title,
          content,
        });

        setNotes(
          notes.map((note) =>
            note.id === noteToEdit.id ? response.data : note,
          ),
        );

        if (selectedNote?.id === noteToEdit.id) {
          setSelectedNote(response.data);
        }
        setNoteToEdit(null);
      } else {
        const response = await axios.post(API_URL, { title, content });
        setNotes([response.data, ...notes]);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const handleDeleteNote = async (id) => {
    setError(null);
    try {
      await axios.delete(`${API_URL}/${id}`);

      setNotes(notes.filter((note) => note.id !== id));

      if (selectedNote?.id === id) setSelectedNote(null);
      if (noteToEdit?.id === id) setNoteToEdit(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b border-slate-200 pb-5">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My Notes App
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Your digital mind, organized. Capture thoughts instantly and sync
            them seamlessly.
          </p>
        </header>

        {isLoading && (
          <div className="mb-6 p-4 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl flex items-center gap-2 animate-pulse font-medium">
            ⏳ Synchronizing data streams with Axios...
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-medium">
            ⚠️ Network Failure: {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <NoteForm
              onSave={handleSaveNote}
              editNote={noteToEdit}
              onCancelEdit={() => setNoteToEdit(null)}
            />
            <NoteList
              notes={notes}
              onNoteClick={setSelectedNote}
              onDelete={handleDeleteNote}
              activeNoteId={selectedNote?.id}
            />
          </div>
          <div className="lg:col-span-7 lg:sticky lg:top-8">
            <NoteDetail
              note={selectedNote}
              onEditTrigger={(note) => setNoteToEdit(note)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
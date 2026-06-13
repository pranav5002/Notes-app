const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let notes = [
  {
    id: 1,
    title: "Server is connected",
    content:
      "This note is created to confirm that the server is up and running. You can create, edit, and delete notes as you like!",
    createdAt: "2026-06-12",
  },
];

// return all notes
app.get("/api/notes", (req, res) => {
  res.status(200).json(notes);
});

// return a single note by id
app.get("/api/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  const note = notes.find((n) => n.id === noteId);

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }
  res.status(200).json(note);
});

// create a new note
app.post("/api/notes", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  const nextId = notes.length > 0 
    ? Math.max(...notes.map(n => n.id)) + 1 
    : 1;
  const newNote = {
    id: nextId,
    title: title,
    content: content,
    createdAt: new Date().toISOString().split("T")[0],
  };
  notes.unshift(newNote);
  res.status(201).json(newNote);
});

// update a note's title and content
app.put("/api/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  const { title, content } = req.body;

  const noteIndex = notes.findIndex((n) => n.id === noteId);

  if (noteIndex === -1) {
    return res.status(404).json({ error: "Note not found" });
  }

  notes[noteIndex] = {
    ...notes[noteIndex],
    title: title !== undefined ? title : notes[noteIndex].title,
    content: content !== undefined ? content : notes[noteIndex].content,
  };
  res.status(200).json(notes[noteIndex]);
});

// delete a note by id
app.delete("/api/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  const noteExists = notes.some((n) => n.id === noteId);

  if (!noteExists) {
    return res.status(404).json({ error: "Note not found" });
  }

  notes = notes.filter((n) => n.id !== noteId);
  res.status(200).json({ message: "Note deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
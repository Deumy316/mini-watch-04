import { useEffect, useState } from "react";

import LoginForm from "./components/LoginForm";
import EventList from "./components/EventList";
import NoteList from "./components/NoteList";
import NoteDetail from "./components/NoteDetail";
import NoteForm from "./components/NoteForm";
import DeleteConfirm from "./components/DeleteConfirm";

import { getAuthMe, login, logout } from "./api/auth";
import { getEvents } from "./api/events";

import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} from "./api/notes";

export default function App() {
  const [user, setUser] = useState(null);
  const [csrfToken, setCsrfToken] = useState("");
  const [error, setError] = useState("");

  const [events, setEvents] = useState([]);
  const [eventError, setEventError] = useState("");

  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteMode, setNoteMode] = useState("view");
  const [noteError, setNoteError] = useState("");

  useEffect(() => {
    async function initializeAuth() {
      try {
        const data = await getAuthMe();

        setUser(data.user);
        setCsrfToken(data.csrf_token);
      } catch (err) {
        setError(err.message);
      }
    }

    initializeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      loadEvents();
      loadNotes();
    }
  }, [user]);

  async function handleLogin(username, password) {
    setError("");

    try {
      const data = await login(username, password, csrfToken);

      setUser(data.user);
      setCsrfToken(data.csrf_token);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleLogout() {
    setError("");

    try {
      const data = await logout(csrfToken);

      setUser(null);
      setEvents([]);
      setNotes([]);
      setSelectedNote(null);
      setNoteMode("view");
      setCsrfToken(data.csrf_token);
    } catch (err) {
      setError(err.message);
    }
  }

  async function loadEvents() {
    setEventError("");

    try {
      const data = await getEvents();
      setEvents(data.events);
    } catch (err) {
      setEventError(err.message);
    }
  }

  async function loadNotes() {
    setNoteError("");

    try {
      const data = await getNotes();
      setNotes(data.notes);
    } catch (err) {
      setNoteError(err.message);
    }
  }

  async function handleSelectNote(noteId) {
    setNoteError("");

    try {
      const data = await getNote(noteId);

      setSelectedNote(data.note);
      setNoteMode("view");
    } catch (err) {
      setNoteError(err.message);
    }
  }

  function handleCreateStart() {
    setNoteError("");
    setNoteMode("create");
  }

  function handleEditStart() {
    if (!selectedNote) {
      return;
    }

    setNoteError("");
    setNoteMode("edit");
  }

  function handleDeleteStart() {
    if (!selectedNote) {
      return;
    }

    setNoteError("");
    setNoteMode("delete");
  }

  function handleCancel() {
    setNoteError("");
    setNoteMode("view");
  }

  async function handleCreate(title, body) {
    setNoteError("");

    try {
      const data = await createNote(
        title,
        body,
        csrfToken
      );

      await loadNotes();

      setSelectedNote(data.note);
      setNoteMode("view");
    } catch (err) {
      setNoteError(err.message);
    }
  }

  async function handleUpdate(title, body) {
    if (!selectedNote) {
      return;
    }

    setNoteError("");

    try {
      const data = await updateNote(
        selectedNote.id,
        title,
        body,
        csrfToken
      );

      await loadNotes();

      setSelectedNote(data.note);
      setNoteMode("view");
    } catch (err) {
      setNoteError(err.message);
    }
  }

  async function handleDeleteConfirm() {
    if (!selectedNote) {
      return;
    }

    setNoteError("");

    try {
      await deleteNote(
        selectedNote.id,
        csrfToken
      );

      setSelectedNote(null);
      setNoteMode("view");

      await loadNotes();
    } catch (err) {
      setNoteError(err.message);
    }
  }

  if (!user) {
    return (
      <main className="login-shell">
        <LoginForm
          onLogin={handleLogin}
          error={error}
        />
      </main>
    );
  }

  return (
    <main>
      <header>
        <h1>감시 대시보드</h1>

        <p>
          로그인 사용자:
          {" "}
          <strong>{user.username}</strong>
        </p>

        <button
          type="button"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </header>

      <EventList
        events={events}
        error={eventError}
        onRefresh={loadEvents}
      />

      <NoteList
        notes={notes}
        onSelect={handleSelectNote}
        onCreate={handleCreateStart}
        onRefresh={loadNotes}
      />

      {noteMode === "view" && (
        <NoteDetail
          note={selectedNote}
          onEdit={handleEditStart}
          onDelete={handleDeleteStart}
        />
      )}

      {noteMode === "create" && (
        <NoteForm
          mode="create"
          initialNote={null}
          onSave={handleCreate}
          onCancel={handleCancel}
          error={noteError}
        />
      )}

      {noteMode === "edit" && (
        <NoteForm
          mode="edit"
          initialNote={selectedNote}
          onSave={handleUpdate}
          onCancel={handleCancel}
          error={noteError}
        />
      )}

      {noteMode === "delete" && (
        <DeleteConfirm
          note={selectedNote}
          onConfirm={handleDeleteConfirm}
          onCancel={handleCancel}
          error={noteError}
        />
      )}

      {noteMode === "view" && noteError && (
        <p className="error-message">{noteError}</p>
      )}
    </main>
  );
}
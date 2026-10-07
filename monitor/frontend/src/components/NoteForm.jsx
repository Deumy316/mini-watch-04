import { useEffect, useState } from "react";

export default function NoteForm({
    mode,
    initialNote,
    onSave,
    onCancel,
    error,
}) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        if (mode === "edit" && initialNote) {
            setTitle(initialNote.title);
            setBody(initialNote.body);
        } else {
            setTitle("");
            setBody("");
        }
    }, [mode, initialNote]);

    async function handleSubmit(event) {
        event.preventDefault();
        await onSave(title, body);
    }

    return (
        <section className="panel">
            <h2>{mode === "edit" ? "메모 수정" : "새 메모 작성"}</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        제목
                        <input
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        내용
                        <textarea
                            value={body}
                            onChange={(event) => setBody(event.target.value)}
                        />
                    </label>
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit">저장</button>

                <button type="button" onClick={onCancel}>
                    취소
                </button>
            </form>
        </section>
    );
}
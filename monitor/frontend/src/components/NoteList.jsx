export default function NoteList({
    notes,
    onSelect,
    onCreate,
    onRefresh,
}) {
    return (
        <section className="panel">
            <h2>관찰 메모</h2>

            <div>
                <button type="button" onClick={onCreate}>
                    새 메모 작성
                </button>

                <button type="button" onClick={onRefresh}>
                    메모 새로고침
                </button>
            </div>

            {notes.length === 0 ? (
                <p>저장된 메모가 없습니다.</p>
            ) : (
                <ul>
                    {notes.map((note) => (
                        <li key={note.id}>
                            <button
                                type="button"
                                onClick={() => onSelect(note.id)}
                            >
                                #{note.id} {note.title}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
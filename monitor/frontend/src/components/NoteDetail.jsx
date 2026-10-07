export default function NoteDetail({
    note,
    onEdit,
    onDelete,
}) {
    if (!note) {
        return (
            <section className="panel">
                <h2>메모 상세</h2>
                <p>확인할 메모를 선택해 주세요.</p>
            </section>
        );
    }

    return (
        <section className="panel">
            <h2>메모 상세</h2>

            <p>
                <strong>번호:</strong> {note.id}
            </p>

            <p>
                <strong>제목:</strong> {note.title}
            </p>

            <p>
                <strong>내용:</strong>
            </p>

            <p>{note.body}</p>

            <button type="button" onClick={onEdit}>
                수정
            </button>

            <button type="button" onClick={onDelete}>
                삭제
            </button>
        </section>
    );
}
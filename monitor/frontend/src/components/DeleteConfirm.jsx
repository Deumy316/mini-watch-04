export default function DeleteConfirm({
    note,
    onConfirm,
    onCancel,
    error,
}) {
    if (!note) {
        return null;
    }

    return (
        <section className="panel">
            <h2>메모 삭제 확인</h2>

            <p>
                <strong>{note.title}</strong> 메모를 삭제하시겠습니까?
            </p>

            <p>삭제 후에는 목록에서 제거됩니다.</p>

            {error && <p className="error-message">{error}</p>}

            <button type="button" onClick={onConfirm}>
                삭제 확정
            </button>

            <button type="button" onClick={onCancel}>
                취소
            </button>
        </section>
    );
}
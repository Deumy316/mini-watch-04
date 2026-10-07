export default function EventList({ events, error, onRefresh }) {
    return (
        <section className="panel">
            <div>
                <h2>요청 기록</h2>

                <button type="button" onClick={onRefresh}>
                    요청 기록 새로고침
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            {!error && events.length === 0 && (
                <p>저장된 요청 기록이 없습니다.</p>
            )}

            {events.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>메서드</th>
                            <th>경로</th>
                            <th>상태 코드</th>
                            <th>종류</th>
                            <th>시간</th>
                        </tr>
                    </thead>

                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td>{event.id}</td>
                                <td>{event.method}</td>
                                <td>{event.path}</td>
                                <td>{event.status_code}</td>
                                <td>{event.event_type}</td>
                                <td>{event.occurred_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}
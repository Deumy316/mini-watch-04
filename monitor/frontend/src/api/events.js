async function readJson(response) {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "요청 기록을 불러오지 못했습니다.");
    }

    return data;
}

export async function getEvents() {
    const response = await fetch("/api/events", {
        method: "GET",
        credentials: "include",
    });

    return readJson(response);
}
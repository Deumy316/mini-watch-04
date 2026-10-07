async function readJson(response) {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "메모 요청을 처리하지 못했습니다.");
    }

    return data;
}

export async function getNotes() {
    const response = await fetch("/api/notes", {
        method: "GET",
        credentials: "include",
    });

    return readJson(response);
}

export async function getNote(noteId) {
    const response = await fetch(`/api/notes/${noteId}`, {
        method: "GET",
        credentials: "include",
    });

    return readJson(response);
}

export async function createNote(title, body, csrfToken) {
    const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({
            title: title,
            body: body,
        }),
    });

    return readJson(response);
}

export async function updateNote(noteId, title, body, csrfToken) {
    const response = await fetch(`/api/notes/${noteId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({
            title: title,
            body: body,
        }),
    });

    return readJson(response);
}

export async function deleteNote(noteId, csrfToken) {
    const response = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
        headers: {
            "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
    });

    return readJson(response);
}
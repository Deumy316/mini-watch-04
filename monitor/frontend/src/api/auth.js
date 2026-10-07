async function readJson(response) {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "요청 처리 중 오류가 발생했습니다.");
    }

    return data;
}

export async function getAuthMe() {
    const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
    });

    return readJson(response);
}

export async function login(username, password, csrfToken) {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });

    return readJson(response);
}

export async function logout(csrfToken) {
    const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
            "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
    });

    return readJson(response);
}
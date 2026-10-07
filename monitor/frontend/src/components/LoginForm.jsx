import { useState } from "react";

export default function LoginForm({ onLogin, error }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        await onLogin(username, password);
    }

    return (
        <section className="panel">
            <h1>감시 서비스 로그인</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        아이디
                        <input
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        비밀번호
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </label>
                </div>

                <button type="submit">로그인</button>
            </form>

            {error && <p className="error-message">{error}</p>}
        </section>
    );
}
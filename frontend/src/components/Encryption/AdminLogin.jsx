import React, { useState, useEffect } from 'react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [statusText, setStatusText] = useState('AETHER_OS v1.0.0 // SECURE GATEWAY');
    const [isBlinking, setIsBlinking] = useState(true);

    // Blinking cursor effect for the terminal vibe
    useEffect(() => {
        const interval = setInterval(() => {
            setIsBlinking((prev) => !prev);
        }, 500);
        return () => clearInterval(interval);
    }, []);
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

const handleLogin = async (e) => {
    e.preventDefault();
    setStatusText('AUTHENTICATING_PROTOCOL_INITIATED...');

    try {
        // 🚨 FIXED: Now uses the dynamic environment variable
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // CRUCIAL: This ensures the passport session cookie is saved to your browser
            credentials: 'include', 
            body: JSON.stringify({ username, password }),
        });

            const data = await response.json();

            if (response.ok) {
                setStatusText('ACCESS_GRANTED. REDIRECTING...');
                // Redirect to your admin dashboard after a brief delay for effect
                setTimeout(() => {
                    window.location.href = '/admin/dashboard'; 
                }, 1000);
            } else {
                setStatusText(`ERR_ACCESS_DENIED: ${data.error || 'INVALID_CREDENTIALS'}`);
            }
        } catch (err) {
            setStatusText('ERR_CONNECTION_REFUSED: BACKEND_UNREACHABLE');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.terminal}>
                <div style={styles.header}>
                    <span>{statusText}</span>
                    <span style={{ opacity: isBlinking ? 1 : 0 }}>_</span>
                </div>
                
                <form onSubmit={handleLogin} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.prompt}>root@aether:~$</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                            autoComplete="off"
                            spellCheck="false"
                            required
                        />
                    </div>
                    
                    <div style={styles.inputGroup}>
                        <label style={styles.prompt}>password:****</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <button type="submit" style={styles.button}>
                        [ EXECUTE_LOGIN ]
                    </button>
                </form>
            </div>
        </div>
    );
};

// Brutalist UI Styles directly in JS for easy copy-pasting
const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: '"Fira Code", "Courier New", Courier, monospace',
        color: '#FFFFFF',
    },
    terminal: {
        width: '100%',
        maxWidth: '600px',
        border: '1px solid #333',
        padding: '30px',
        backgroundColor: '#050505',
    },
    header: {
        fontSize: '14px',
        letterSpacing: '1px',
        marginBottom: '40px',
        textTransform: 'uppercase',
        borderBottom: '1px solid #333',
        paddingBottom: '10px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    prompt: {
        fontSize: '14px',
        color: '#888',
    },
    input: {
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '1px solid #555',
        color: '#FFF',
        fontFamily: 'inherit',
        fontSize: '16px',
        padding: '5px 0',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    button: {
        marginTop: '20px',
        backgroundColor: '#FFFFFF',
        color: '#000000',
        border: 'none',
        padding: '12px 20px',
        fontFamily: 'inherit',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        textAlign: 'left',
        textTransform: 'uppercase',
        transition: 'background-color 0.2s, color 0.2s',
    }
};

export default AdminLogin;
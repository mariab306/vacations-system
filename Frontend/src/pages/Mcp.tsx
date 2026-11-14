import { useState } from 'react';
import { askMcpQuestion, type McpResponse } from '../services/mcpService';

export function Mcp() {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState<McpResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!question.trim()) return;
        
        setLoading(true);
        setError('');
        setResponse(null);
        
        try {
            const result = await askMcpQuestion(question);
            setResponse(result);
        } catch (err: any) {
            setError(err.message || 'Failed to process question');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Database Assistant (MCP Communication)</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Ask a question about database vacations:</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="e.g., What is the average vacation price?"
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing Query...' : 'Ask Database'}
                </button>
            </form>
            
            {error && <p>{error}</p>}
            
            {response && (
                <div>
                    <h2>Answer</h2>
                    <p>{response.answer}</p>
                </div>
            )}
        </div>
    );
}
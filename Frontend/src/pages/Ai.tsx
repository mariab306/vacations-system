import { useState } from 'react';
import { fetchRecommendation } from '../services/aiService';

export function Ai() {
    const [destination, setDestination] = useState('');
    const [recommendation, setRecommendation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!destination.trim()) return;
        
        setLoading(true);
        setError('');
        setRecommendation('');
        
        try {
            const result = await fetchRecommendation(destination);
            setRecommendation(result);
        } catch (err: any) {
            setError(err.message || 'Failed to get recommendation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>AI Vacation Recommendations</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Enter Destination: </label>
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="e.g., Tokyo, Rome, Hawaii"
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
                </button>
            </form>
            
            {error && <p>{error}</p>}
            
            {recommendation && (
                <div>
                    <h2>Recommendations for {destination}</h2>
                    <pre>{recommendation}</pre>
                </div>
            )}
        </div>
    );
}
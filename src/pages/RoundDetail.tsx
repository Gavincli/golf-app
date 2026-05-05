import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { insertScores } from '../services/scoreService';

const RoundDetail = () => {
    const { id } = useParams();

    const [scores, setScores] = useState(
        Array.from({ length: 9}, (_, i) => ({
            hole_number: i + 1,
            par: 4,
            strokes: '',
            putts: '',
        }))
    );

    const handleSubmit = async () => {
        try {
            // convert strings to numbers safely
            const cleanedScores = scores.map((s) => ({
                ...s,
                strokes: Number(s.strokes || 0),
                putts: Number(s.putts || 0),
            }));

            await insertScores(id!, cleanedScores);

            alert('Scores saved!');
        } catch (err) {
            console.error('Error saving scores: ', err);
            alert('Error saving scores');
        }
    }
    
    return (
        <div>
            <h1>Round {id}</h1>

            {scores.map((hole, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <h3>Hole {hole.hole_number}</h3>

                    <label>Strokes: </label>
                    <input 
                    type="number"
                    placeholder="0"
                    value={hole.strokes}
                    onChange={(e) => {
                        const updated = [...scores];
                        updated[index].strokes = e.target.value;
                        setScores(updated);
                    }}
                    />

                    <label style={{ marginLeft: '10px' }}>Putts: </label>
                    <input
                    type="number"
                    placeholder="0"
                    value={hole.putts}
                    onChange={(e) => {
                        const updated = [...scores];
                        updated[index].putts = e.target.value;
                        setScores(updated);
                    }}
                    />

                    </div>
            ))}

            <button onClick={handleSubmit}>Save Scores</button>
        </div>
    );
};

export default RoundDetail;
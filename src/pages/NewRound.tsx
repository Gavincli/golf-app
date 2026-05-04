import { createRound } from '../services/roundService';
import { insertScores } from '../services/scoreService';

const NewRound = () => {
    const handleClick = async () => {
        try {
            // 1. Create round
            const round = await createRound();

            // 2. Create mock scores (3 holes for test)
            const scores = [
                { hole_number: 1, par: 4, strokes: 5, putts: 2 },
                { hole_number: 2, par: 3, strokes: 3, putts: 1 },
                { hole_number: 3, par: 5, strokes: 6, putts: 2 },
            ];

            // 3. Insert scores
            const result = await insertScores(round.id, scores);

            console.log('Scores inserted:', result);
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <div>
            <h1>New Round Page</h1>
            <button onClick={handleClick}>Test Full Round Insert</button>
        </div>
    );
};

export default NewRound;
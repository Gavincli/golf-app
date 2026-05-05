import { createRound } from '../services/roundService';
import { useNavigate } from 'react-router-dom';

const NewRound = () => {
    const navigate = useNavigate();

    const handleCreateRound = async () => {
        const round = await createRound();

        navigate(`/round/${round.id}`);
    };

    return (
        <div>
            <h1>Start New Round</h1>
            <button onClick={handleCreateRound}>
                Create Round
            </button>
        </div>
    );

};

export default NewRound;
import { createRound } from '../services/roundService';

const NewRound = () => {
    const handleClick = async () => {
        try {
            const result = await createRound();
            console.log('Round created:', result);
        } catch (error) {
            console.error('Error creating round:', error);
        }
    };

    return (
    <div>
        <h1>New Round Page</h1>
        <button onClick={handleClick}>Create Round</button>
    </div>
    );
};

export default NewRound;
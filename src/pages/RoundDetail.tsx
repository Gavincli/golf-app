import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { insertScores } from '../services/scoreService';
import './RoundDetail.css';

const RoundDetail = () => {
    const { id } = useParams();

    const [scores, setScores] = useState<
        Array<{
            hole_number: number;
            par: number | '';
            yardage: string;
            strokes: string;
            putts: string;
            tee_club: string;
            fairway_hit: boolean;
            bunker: boolean;
            penalty_strokes: string;
        }>
    >(
        Array.from({ length: 9 }, (_, i) => ({
            hole_number: i + 1,
            par: 4,
            yardage: '',
            strokes: '',
            putts: '',
            tee_club: '',
            fairway_hit: false,
            bunker: false,
            penalty_strokes: '',
        }))
    );

    const handleSubmit = async () => {
        try {
            // convert strings to numbers safely
            const cleanedScores = scores.map((s) => ({
                ...s,
                par: Number(s.par || 0),
                strokes: Number(s.strokes || 0),
                putts: Number(s.putts || 0),
                yardage: Number(s.yardage || 0),
                penalty_strokes: Number(s.penalty_strokes || 0),
                tee_club: s.tee_club || '',
                fairway_hit: s.fairway_hit,
                bunker: s.bunker,
            }));

            const hasInvalidScores = cleanedScores.some(
                (s) =>
                    s.par < 3 ||
                    s.par > 6 ||
                    s.strokes < 1 ||
                    s.strokes > 15 ||
                    s.putts < 0 ||
                    s.putts > 10 ||
                    s.penalty_strokes < 0 ||
                    s.penalty_strokes > 10
            );

            if (hasInvalidScores) {
                alert('Please enter valid score values.');
                return;
            }
            await insertScores(id!, cleanedScores);

            alert('Scores saved!');
        } catch (err) {
            console.error('Error saving scores: ', err);
            alert('Error saving scores');
        }
    }

    const updateField = (index: number, field: string, value: any) => {
        const updated = [...scores];
        updated[index] = {
            ...updated[index],
            [field]: value,
        };
        setScores(updated);
        
    };

    const totalPar = scores.reduce(
        (sum, hole) => sum + Number(hole.par || 0),
        0
    );

    const totalStrokes = scores.reduce(
        (sum, hole) => sum + Number(hole.strokes || 0),
        0
    );

    const totalPutts = scores.reduce(
        (sum, hole) => sum + Number(hole.putts || 0),
        0
    );

    //const scoreToPar = totalStrokes - totalPar; //replace to only apply overall score for finished holes
    const scoreToPar = scores.reduce ((total, hole) => {
        if (!hole.strokes) return total;

        return (
            total + 
            Number(hole.strokes) - 
            Number(hole.par || 0)
        );
    }, 0);

    return (
        <div className="rdPage">
            <div className="rdHeader">
                <h1 className="rdTitle">Round {id}</h1>
                <p className="rdSubtitle">Enter your scores per hole, then save when you’re done.</p>
            </div>

            <div className="rdCard">
                <div className="rdTableWrap" role="region" aria-label="Scorecard" tabIndex={0}>
                    <table className="rdTable">
                        <thead>
                    <tr>
                        <th>Hole</th>
                        <th>Par</th>
                        <th>Yds</th>
                        <th>Strokes</th>
                        <th>Putts</th>
                        <th>Club</th>
                        <th>Fairway</th>
                        <th>Bunker</th>
                        <th>Penalty Shots</th>
                    </tr>
                        </thead>

                        <tbody>
                            {scores.map((hole, index) => (
                                <tr key={index}>
                                    <td className="rdCellNumber">{hole.hole_number}</td>

                                    <td>
                                        <input
                                            className="rdInput"
                                            type="number"
                                            value={hole.par}
                                            min={3}
                                            max={6}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                updateField(index, 'par', val === '' ? '' : Number(val));
                                            }}
                                        />
                                    </td>

                                    <td>
                                        <input
                                            className="rdInput"
                                            type="number"
                                            min={1}
                                            max={800}
                                            placeholder="0"
                                            value={hole.yardage}
                                            onChange={(e) => updateField(index, 'yardage', e.target.value)}
                                        />
                                    </td>

                                    <td>
                                        <input
                                            className="rdInput"
                                            type="number"
                                            min={1}
                                            max={15}                              
                                            placeholder="0"
                                            value={hole.strokes}
                                            onChange={(e) => updateField(index, 'strokes', e.target.value)}
                                        />
                                    </td>

                                    <td>
                                        <input
                                            className="rdInput"
                                            type="number"
                                            min={0}
                                            max={10}
                                            placeholder="0"
                                            value={hole.putts}
                                            onChange={(e) => updateField(index, 'putts', e.target.value)}
                                        />
                                    </td>

                                    <td>
                                        <input
                                            className="rdInput rdInputText"
                                            type="text"
                                            value={hole.tee_club}
                                            onChange={(e) => updateField(index, 'tee_club', e.target.value)}
                                        />
                                    </td>

                                    <td className="rdCellCheck">
                                        <input
                                            className="rdCheck"
                                            type="checkbox"
                                            checked={hole.fairway_hit}
                                            onChange={(e) => updateField(index, 'fairway_hit', e.target.checked)}
                                        />
                                    </td>

                                    <td className="rdCellCheck">
                                        <input
                                            className="rdCheck"
                                            type="checkbox"
                                            checked={hole.bunker}
                                            onChange={(e) => updateField(index, 'bunker', e.target.checked)}
                                        />
                                    </td>

                                    <td>
                                        <input
                                            className="rdInput"
                                            type="number"
                                            min={0}
                                            max={10}
                                            placeholder="0"
                                            value={hole.penalty_strokes}
                                            onChange={(e) => updateField(index, 'penalty_strokes', e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="rdTotals">
                <div>Total Par: {totalPar}</div>
                <div>Total Strokes: {totalStrokes}</div>
                <div>Total Putts: {totalPutts}</div>
                <div>
                    Score: {' '}
                    {scoreToPar === 0
                    ? 'E'
                    : scoreToPar > 0
                    ? `+${scoreToPar}`
                    : scoreToPar}
                </div>
            </div>

            <div className="rdSaveBar">
                <button className="rdSaveButton" onClick={handleSubmit} disabled={!id}>
                    Save Scores
                </button>
            </div>
        </div>
    );
};

export default RoundDetail;
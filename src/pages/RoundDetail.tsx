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
                strokes: Number(s.strokes || 0),
                putts: Number(s.putts || 0),
                yardage: Number(s.yardage || 0),
                penalty_strokes: Number(s.penalty_strokes || 0),
                tee_club: s.tee_club || '',
                fairway_hit: s.fairway_hit,
                bunker: s.bunker,
            }));

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
                                            placeholder="0"
                                            value={hole.yardage}
                                            onChange={(e) => updateField(index, 'yardage', e.target.value)}
                                        />
                                    </td>

                                    <td>
                                        <input
                                            className="rdInput"
                                            type="number"
                                            placeholder="0"
                                            value={hole.strokes}
                                            onChange={(e) => updateField(index, 'strokes', e.target.value)}
                                        />
                                    </td>

                                    <td>
                                        <input
                                            className="rdInput"
                                            type="number"
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

            <div className="rdSaveBar">
                <button className="rdSaveButton" onClick={handleSubmit} disabled={!id}>
                    Save Scores
                </button>
            </div>
        </div>
    );
};

export default RoundDetail;
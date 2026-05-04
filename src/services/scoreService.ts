import { supabase } from './supabaseClient';

type ScoreInput = {
    hole_number: number;
    par: number;
    strokes: number;
    putts: number;
    tee_club?: string;
    fairway_hit?: boolean;
    bunker?: boolean;
    penalty_strokes?: number;
    yardage?: number;
};

export const insertScores = async (
    roundId: string,
    scores: ScoreInput[]
) => {
    const payload = scores.map((s) => ({
        round_id: roundId,
        hole_number: s.hole_number,
        par: s.par,
        strokes: s.strokes,
        putts: s.putts,
        tee_club: s.tee_club ?? null,
        fairway_hit: s.fairway_hit ?? null,
        bunker: s.bunker ?? null,
        penalty_strokes: s.penalty_strokes ?? 0,
        yardage: s.yardage ?? null,
    }));

    const { data, error} = await supabase
    .from('scores')
    .insert(payload)
    .select();

    if (error) {
        console.error('Supabase error (scores):', error);
        throw error;
    }

    return data;
};
import { supabase } from './supabaseClient';

export const createRound = async () => {
    const { data, error } = await supabase
    .from('rounds')
    .insert({
        played_date: '2026-05-02',
        course_name: 'Test Course',
        holes_played: 18,
        start_hole: 1,
        tee_time: '10:00'
    })
    .select()
    .single();

    if (error) {
        console.error('Supabase error:', error);
        throw error;
    }

    return data;
}
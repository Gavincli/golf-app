# 🏌️ Golf App TODO

## 🟢 MVP (Current Focus)

### Core Flow

* [x] Create round
* [x] Navigate to `/round/:id`
* [x] Generate dynamic holes (9/18, start hole logic)
* [x] Input strokes + putts
* [ ] Save scores to database

---

### UI Improvements (Immediate Next)

* [ ] Add par input per hole
* [ ] Use `holes_played` + `start_hole` from database (not hardcoded)
* [ ] Improve layout (grid/table instead of vertical stack)
* [ ] Update the helper text above the input table on `RoundDetail.tsx`

---

## 🟡 Phase 1.5 — Quality of Life

* [ ] Edit existing rounds
* [ ] Prevent duplicate score inserts (or handle gracefully)
* [ ] Add basic validation (no negative strokes, required fields, etc.)

---

## 🔵 Phase 2 — Course System

* [ ] Create `courses` table
* [ ] Create `course_holes` table
* [ ] Auto-fill par + yardage when selecting a course
* [ ] Add course selection dropdown in round creation

---

## 🟣 Phase 3 — Players / Social

* [ ] Create `players` table
* [ ] Create `round_players` join table
* [ ] Track who played in each round

---

## 🔴 Phase 4 — Analytics / Dashboard

* [ ] Calculate GIR %
* [ ] Calculate average score
* [ ] Track trends over time
* [ ] Build graphs (Tableau or in-app)

---

## 🧠 Notes / Future Ideas

* [ ] Allow copying previous round setup
* [ ] Add tee box-based defaults (par 3 vs standard courses)
* [ ] Consider authentication (`user_id` on rounds)


## Command for clearing data (before deployment)
* TRUNCATE TABLE scores, rounds RESTART IDENTITY CASCADE;
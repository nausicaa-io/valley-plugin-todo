//! The order of a task list. Every comparison mirrors `src/model/sort.ts` and `src/model/sections.ts`; the sorts
//! are stable, so tasks that compare equal keep the order they were handed in, as `Array.prototype.sort` does.

use std::cmp::Ordering;

/// Numbers per task, in this order.
pub const COLUMNS: usize = 9;
pub const SECTIONS: usize = 5;

/// One task's sort keys. Dates are digit-ordered numbers, so comparing them equals comparing the stored strings.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Row {
    /// `-1` without a due date, else `yyyymmdd * 10000 + (1 + hhmm)` (the time part is 0 for a date alone).
    pub due: f64,
    /// `0` without a start time, else `1 + hhmm`.
    pub start: f64,
    /// 0 normal, 1 low, 2 medium, 3 high.
    pub priority: f64,
    pub flagged: f64,
    pub completed: f64,
    pub created: f64,
    pub updated: f64,
    /// When the task was completed; only the completion orders read it.
    pub stamp: f64,
    /// The title's place in the collation order; titles that collate equal share one value.
    pub name: f64,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Mode {
    Name,
    Priority,
    Flagged,
    Due,
    Created,
    Updated,
    /// Overdue, Today, Upcoming, Someday, Completed, each in its own order.
    Sections,
    /// Newest completion first, then by title.
    Completion,
    /// Newest completion first; equal times keep their order.
    Stamp,
}

impl Mode {
    #[must_use]
    pub fn from_code(code: u32) -> Option<Self> {
        Some(match code {
            0 => Self::Name,
            1 => Self::Priority,
            2 => Self::Flagged,
            3 => Self::Due,
            4 => Self::Created,
            5 => Self::Updated,
            6 => Self::Sections,
            7 => Self::Completion,
            8 => Self::Stamp,
            _ => return None,
        })
    }
}

/// Rows from `COLUMNS` numbers each; `None` when a number is not finite or the slice is not whole rows.
#[must_use]
pub fn rows(values: &[f64]) -> Option<Vec<Row>> {
    if !values.len().is_multiple_of(COLUMNS) || values.iter().any(|value| !value.is_finite()) {
        return None;
    }
    Some(
        values
            .chunks_exact(COLUMNS)
            .map(|row| Row {
                due: row[0],
                start: row[1],
                priority: row[2],
                flagged: row[3],
                completed: row[4],
                created: row[5],
                updated: row[6],
                stamp: row[7],
                name: row[8],
            })
            .collect(),
    )
}

fn number(a: f64, b: f64) -> Ordering {
    a.partial_cmp(&b).unwrap_or(Ordering::Equal)
}

fn by_name(a: &Row, b: &Row) -> Ordering {
    number(a.name, b.name)
}

fn by_priority_then_name(a: &Row, b: &Row) -> Ordering {
    number(b.priority, a.priority).then_with(|| by_name(a, b))
}

/// Timed tasks in start order before untimed ones, then priority and title.
fn by_start_then_priority(a: &Row, b: &Row) -> Ordering {
    match (a.start > 0.0, b.start > 0.0) {
        (true, true) => number(a.start, b.start).then_with(|| by_priority_then_name(a, b)),
        (true, false) => Ordering::Less,
        (false, true) => Ordering::Greater,
        (false, false) => by_priority_then_name(a, b),
    }
}

/// Tasks without a due date first, then by date in `dates` order, then start time.
fn by_due(a: &Row, b: &Row, dates: fn(f64, f64) -> Ordering) -> Ordering {
    match (a.due < 0.0, b.due < 0.0) {
        (true, true) => by_start_then_priority(a, b),
        (true, false) => Ordering::Less,
        (false, true) => Ordering::Greater,
        (false, false) => dates(a.due, b.due).then_with(|| by_start_then_priority(a, b)),
    }
}

fn ascending(mode: Mode, a: &Row, b: &Row) -> Ordering {
    match mode {
        Mode::Name => by_name(a, b),
        Mode::Priority => number(b.priority, a.priority).then_with(|| by_start_then_priority(a, b)),
        Mode::Flagged => number(b.flagged, a.flagged).then_with(|| by_start_then_priority(a, b)),
        Mode::Due => by_due(a, b, number),
        Mode::Created => number(a.created, b.created).then_with(|| by_name(a, b)),
        Mode::Updated => number(a.updated, b.updated).then_with(|| by_name(a, b)),
        Mode::Completion => number(b.stamp, a.stamp).then_with(|| by_name(a, b)),
        Mode::Stamp => number(b.stamp, a.stamp),
        Mode::Sections => Ordering::Equal,
    }
}

fn sorted(
    rows: &[Row],
    mut indices: Vec<u32>,
    compare: impl Fn(&Row, &Row) -> Ordering,
) -> Vec<u32> {
    indices.sort_by(|&a, &b| compare(&rows[a as usize], &rows[b as usize]));
    indices
}

// Days and flags are whole numbers, so comparing them exactly is safe.
#[allow(clippy::float_cmp)]
fn sections(rows: &[Row], today: f64) -> (Vec<u32>, [u32; SECTIONS]) {
    let mut buckets: [Vec<u32>; SECTIONS] = Default::default();
    for (index, row) in (0_u32..).zip(rows) {
        let day = (row.due / 10000.0).floor();
        let bucket = if row.completed != 0.0 {
            4
        } else if row.due < 0.0 {
            3
        } else if day < today {
            0
        } else if day == today {
            1
        } else {
            2
        };
        buckets[bucket].push(index);
    }
    let by_date =
        |a: &Row, b: &Row| number(a.due, b.due).then_with(|| by_start_then_priority(a, b));
    let [overdue, today_rows, upcoming, someday, completed] = buckets;
    let ordered = [
        sorted(rows, overdue, by_date),
        sorted(rows, today_rows, by_start_then_priority),
        sorted(rows, upcoming, by_date),
        sorted(rows, someday, by_priority_then_name),
        sorted(rows, completed, |a, b| {
            number(b.updated, a.updated).then_with(|| by_name(a, b))
        }),
    ];
    let counts = ordered
        .each_ref()
        .map(|bucket| u32::try_from(bucket.len()).unwrap_or(u32::MAX));
    (ordered.concat(), counts)
}

/// The positions of `rows` in display order and, for `Mode::Sections`, how many fall in each section.
#[must_use]
pub fn order(
    rows: &[Row],
    mode: Mode,
    descending: bool,
    today: f64,
) -> (Vec<u32>, [u32; SECTIONS]) {
    if mode == Mode::Sections {
        return sections(rows, today);
    }
    let indices: Vec<u32> = (0_u32..).take(rows.len()).collect();
    let ordered = match (mode, descending) {
        // Newest date first, but tasks without a date stay first and same-day tasks keep their start order.
        (Mode::Due, true) => sorted(rows, indices, |a, b| by_due(a, b, |x, y| number(y, x))),
        (_, true) => sorted(rows, indices, |a, b| ascending(mode, a, b).reverse()),
        (_, false) => sorted(rows, indices, |a, b| ascending(mode, a, b)),
    };
    (ordered, [0; SECTIONS])
}

#[cfg(test)]
mod tests {
    use super::*;

    fn row(due: f64, start: f64, priority: f64, name: f64) -> Row {
        Row {
            due,
            start,
            priority,
            flagged: 0.0,
            completed: 0.0,
            created: 0.0,
            updated: 0.0,
            stamp: 0.0,
            name,
        }
    }

    #[test]
    fn due_puts_undated_first_then_dates_then_start_times() {
        let rows = [
            row(202_605_020_000.0, 0.0, 0.0, 1.0),
            row(-1.0, 0.0, 0.0, 2.0),
            row(202_605_010_000.0, 0.0, 3.0, 3.0),
            row(202_605_010_000.0, 901.0, 0.0, 4.0),
        ];
        assert_eq!(order(&rows, Mode::Due, false, 0.0).0, [1, 3, 2, 0]);
        assert_eq!(order(&rows, Mode::Due, true, 0.0).0, [1, 0, 3, 2]);
    }

    #[test]
    fn equal_rows_keep_their_order_in_both_directions() {
        let rows = [
            row(-1.0, 0.0, 1.0, 5.0),
            row(-1.0, 0.0, 1.0, 5.0),
            row(-1.0, 0.0, 3.0, 5.0),
        ];
        assert_eq!(order(&rows, Mode::Priority, false, 0.0).0, [2, 0, 1]);
        assert_eq!(order(&rows, Mode::Priority, true, 0.0).0, [0, 1, 2]);
    }

    #[test]
    fn sections_split_by_today_and_count_each() {
        let mut done = row(202_605_010_000.0, 0.0, 0.0, 1.0);
        done.completed = 1.0;
        let rows = [
            row(202_605_030_000.0, 0.0, 0.0, 1.0),
            row(-1.0, 0.0, 0.0, 2.0),
            done,
            row(202_605_020_931.0, 0.0, 0.0, 3.0),
            row(202_605_010_000.0, 0.0, 0.0, 4.0),
        ];
        let (ordered, counts) = order(&rows, Mode::Sections, false, 20_260_502.0);
        assert_eq!(ordered, [4, 3, 0, 1, 2]);
        assert_eq!(counts, [1, 1, 1, 1, 1]);
    }

    #[test]
    fn rejects_numbers_that_are_not_finite_and_partial_rows() {
        assert!(rows(&[0.0; COLUMNS]).is_some());
        assert!(rows(&[0.0; COLUMNS + 1]).is_none());
        let mut values = [0.0; COLUMNS];
        values[3] = f64::NAN;
        assert!(rows(&values).is_none());
    }
}

//! To-Do's list-order kernel. JavaScript writes nine numbers per task into the buffer `order_rows` returns (see
//! `order::Row`), then calls `order_run(tasks, mode, descending, today)`. `order_output` then holds each task's
//! position in display order as `u32`s and `order_sections` the five section sizes of the sectioned order. A run
//! over numbers that are not finite fails, and the caller sorts in TypeScript. The Valley ABI exports are present
//! because the host requires them of every module; `valley_call` answers no method.

#[forbid(unsafe_code)]
pub mod order;

use std::cell::RefCell;

use order::{COLUMNS, Mode, SECTIONS};
use valley_plugin_abi::{ABI_VERSION, Status, encode_response, pack_region};

#[derive(Default)]
struct State {
    rows: Vec<f64>,
    output: Vec<u32>,
    sections: [u32; SECTIONS],
}

thread_local! {
    static STATE: RefCell<State> = RefCell::new(State::default());
}

fn address<T>(values: &[T]) -> u32 {
    u32::try_from(values.as_ptr() as usize).unwrap_or(0)
}

/// The input buffer for `tasks` rows of `COLUMNS` numbers (its address changes when it grows).
#[unsafe(no_mangle)]
pub extern "C" fn order_rows(tasks: u32) -> u32 {
    STATE.with(|state| {
        let rows = &mut state.borrow_mut().rows;
        rows.resize((tasks as usize).saturating_mul(COLUMNS), 0.0);
        address(rows)
    })
}

/// Orders the first `tasks` rows; 1 when the results are ready, 0 when the input cannot be ordered here.
#[unsafe(no_mangle)]
pub extern "C" fn order_run(tasks: u32, mode: u32, descending: u32, today: f64) -> u32 {
    STATE.with(|state| {
        let state = &mut *state.borrow_mut();
        state.output.clear();
        state.sections = [0; SECTIONS];
        let Some(mode) = Mode::from_code(mode) else {
            return 0;
        };
        let Some(values) = (tasks as usize)
            .checked_mul(COLUMNS)
            .and_then(|len| state.rows.get(..len))
        else {
            return 0;
        };
        let Some(rows) = order::rows(values) else {
            return 0;
        };
        if !today.is_finite() {
            return 0;
        }
        let (output, sections) = order::order(&rows, mode, descending != 0, today);
        state.output = output;
        state.sections = sections;
        1
    })
}

#[unsafe(no_mangle)]
pub extern "C" fn order_output() -> u32 {
    STATE.with(|state| address(&state.borrow().output))
}

#[unsafe(no_mangle)]
pub extern "C" fn order_sections() -> u32 {
    STATE.with(|state| address(&state.borrow().sections))
}

/// Releases the buffers, so one very long list does not pin its peak memory.
#[unsafe(no_mangle)]
pub extern "C" fn order_reset() {
    STATE.with(|state| *state.borrow_mut() = State::default());
}

fn leak(bytes: Vec<u8>) -> u64 {
    let boxed = bytes.into_boxed_slice();
    let len = u32::try_from(boxed.len()).unwrap_or(0);
    let ptr = Box::into_raw(boxed).cast::<u8>() as usize;
    pack_region(u32::try_from(ptr).unwrap_or(0), len)
}

#[unsafe(no_mangle)]
pub extern "C" fn valley_abi_version() -> u32 {
    ABI_VERSION
}

#[unsafe(no_mangle)]
pub extern "C" fn valley_alloc(len: u32) -> u32 {
    let ptr = Box::into_raw(vec![0_u8; len as usize].into_boxed_slice()).cast::<u8>() as usize;
    u32::try_from(ptr).unwrap_or(0)
}

#[unsafe(no_mangle)]
pub extern "C" fn valley_free(ptr: u32, len: u32) {
    if ptr == 0 {
        return;
    }
    // SAFETY: `ptr`/`len` describe a boxed slice this module leaked from `valley_alloc` or a response frame; the host
    // frees each region exactly once.
    drop(unsafe {
        Box::from_raw(std::ptr::slice_from_raw_parts_mut(
            ptr as usize as *mut u8,
            len as usize,
        ))
    });
}

/// The frame-dispatched entry: the kernel is driven through its direct exports, so every method is unknown.
#[unsafe(no_mangle)]
pub extern "C" fn valley_call(_ptr: u32, _len: u32) -> u64 {
    leak(encode_response(
        Status::Error,
        b"todo order has no framed methods; call the order_* exports",
    ))
}

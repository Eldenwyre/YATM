// Main Rust file

use num_cpus;
use neon::prelude::*;

extern crate serde;
extern crate serde_json;

#[macro_use]
extern crate serde_derive;

mod json_io;

// Test function, returns the number of threads on the machine
// as a JsResult<JsNumber>
fn thread_count(mut cx: FunctionContext) -> JsResult<JsNumber> {
    Ok(cx.number(num_cpus::get() as f64))
}

// Export the function so it can be exported in index.js
// or something like that
register_module!(mut cx, {
    cx.export_function("threadCount", thread_count)
});

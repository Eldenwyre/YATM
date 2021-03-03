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

#[derive(Serialize, Deserialize)]
struct PlaceHolder {
    
    name: String,
    age: u8, 
}

// Export the function so it can be exported in index.json_io
// Simply add another cx.export_function line for each function
// you want to export
register_module!(mut cx, {
    cx.export_function("threadCount", thread_count)?;
    Ok(())
});

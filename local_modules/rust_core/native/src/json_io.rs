/* Example Usage:
 *
 *  #[derive(Serialize, Deserialize)]
 *  struct PlaceHolder {
 *      
 *      name: String,
 *      age: u8, 
 *  }
 *
 * fn main() {
 *   let file_name = String::from("src/saves/test.json");
 *   let new_file_name = String::from("src/saves/new_test.json");
 *
 *
 *   let mut p: PlaceHolder = readJsonFile(file_name);
 *
 *   p.name = "Not Alex".to_string();
 *
 *   let ser = serde_json::to_string(&p).unwrap();
 *   println!("PlaceHolder Object: {}", ser);
 *
 *   writeJsonFile(new_file_name, p);
 *
 *   let p_vec: Vec<PlaceHolder> = readJsonFile("src/saves/json-array-test.json".to_string());
 *
 *   let ser_vec = serde_json::to_string(&p_vec).unwrap();
 *   println!("PlaceHolder Object Vector: {}", ser_vec);
 *
 *   writeJsonFile("src/saves/new-json-arrary-test.json".to_string(), p_vec);
 * }
 */

// Disable snake case warnings
#![allow(non_snake_case)]

use std::fs;

extern crate serde;
extern crate serde_json;

/*
 * fn: readJsonFile
 * Desc: Read from a JSON file, and unwrap into an Object
 *       Function is made generic to be used with different Objects
 * params: f_name: String -> Name of the file to ready from
 * return: t: T -> Object of generic type T, this allows the function
 *                 to be used for all types of objects, etc. Task, Vec<Task>, etc
 *
 * NOTE
 * T needs to be restricted to DeserializeOwned, rather than just Deserialize
 * This is due to a lifetime thing, see below resources
 * https://doc.rust-lang.org/book/ch10-02-traits.html
 * https://stackoverflow.com/questions/54851996/rust-and-serde-deserializing-using-generics
 * https://stackoverflow.com/questions/43554679/lifetime-error-when-creating-a-function-that-returns-a-value-implementing-serde/43564347#43564347
 */
pub fn readJsonFile<T: serde::de::DeserializeOwned>(f_name: &str) -> T {

    let json_str = fs::read_to_string(f_name.to_string()).expect("Unable to read file");
    let t: T = serde_json::from_str(&json_str).expect("Unable to parse!");
    
    return t;
}

/*
 * fn: writeJsonFile
 * Des: Take an Object and write it as JSON to the specified file
 *      Function is made generic to work with writing different Objects, ex 
 *      Task, Vec<Task>, etc.
 * params: f_name: String -> name of the file to write the specified Object to
 *         t: T -> The Object to write to the specified file
 *            This is made generic to work with multiple different types of Objects
 * return: Nothing
 * NOTE
 * Need to restrict T to Serialize, similar reasons as the above function
 */
pub fn writeJsonFile<T: serde::Serialize>(f_name: &str, t: T) {

    let ser = serde_json::to_string(&t).unwrap();
    fs::write(f_name.to_string(), ser).expect("Unable to open file");
    
    return;
}

#[test]
fn testerThing() {
    use crate::task;
    use crate::skill;

    extern crate chrono;

    let t = task::Task::new("Task Title", 
                            "Task Desc", 
                            chrono::NaiveDate::from_ymd(2000,2,7).and_hms(0,0,0), 
                            100, 
                            vec![]);

    writeJsonFile("src/saves/task.json", &t);

    let new_t: task::Task = readJsonFile("src/saves/task.json");

    // TODO: Define == operator for task/skill structs
    assert_eq!(t.get_title(), new_t.get_title());
    assert_eq!(t.get_description(), new_t.get_description());
    assert_eq!(t.get_date(), new_t.get_date());
    assert_eq!(t.get_reward(), new_t.get_reward());
    assert_eq!(t.get_subtasks(), new_t.get_subtasks());

    let rt = task::RepeatableTask::new_w_task(t.clone(),
                                       5,
                                       5
    );

    let s = skill::Skill::new("Skill Title",
                              "Skill Desc",
                              100,
                              vec![rt]);

    writeJsonFile("src/saves/skill.json", &s);

    let new_s: skill::Skill = readJsonFile("src/saves/skill.json");

    assert_eq!(s.get_title(), new_s.get_title());
    assert_eq!(s.get_description(), new_s.get_description());
    assert_eq!(s.get_xp(), new_s.get_xp());
    assert_eq!(s.get_tasks()[0].get_title(), new_s.get_tasks()[0].get_title());
    assert_eq!(s.get_tasks()[0].get_title(), new_s.get_tasks()[0].get_title());
    assert_eq!(s.get_tasks()[0].get_description(), new_s.get_tasks()[0].get_description());
    assert_eq!(s.get_tasks()[0].get_date(),        new_s.get_tasks()[0].get_date());
    assert_eq!(s.get_tasks()[0].get_reward(),      new_s.get_tasks()[0].get_reward());
    assert_eq!(s.get_tasks()[0].get_subtasks(),    new_s.get_tasks()[0].get_subtasks());
}

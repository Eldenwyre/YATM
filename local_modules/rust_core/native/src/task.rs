extern crate chrono;
use chrono::{NaiveDateTime};

pub struct Task {
    title: String, // Task title
    description: String, // Task description
    date: chrono::NaiveDateTime, // Due date of the task, 
                            // TODO devise system for special cases (ie Infinitely repeatable)
    reward: i32, // TODO potentially change to a more advanced system later, primative placeholder
    subtasks: Vec<String> // TODO potentially change to having a subtasks struct 
                         //     that limits chaining but allows for descriptions or rewards
}

// Constructor
impl Task {
    pub fn new(title: &str, description: &str, date: chrono::NaiveDateTime, reward: i32, subtasks: Vec<String>) -> Self {
        Self {title: title.to_string(), description: description.to_string(), date: date, reward: reward, subtasks: subtasks}
    }
}


// Accessor functions
impl Task {
    // get_title: Returns title of Task
    pub fn get_title(&self) -> &String { &self.title }

    // get_description(): Returns description of Task
    pub fn get_description(&self) -> &String { &self.description }

    // get_date(): Returns date of Task
    pub fn get_date(&self) -> NaiveDateTime { self.date }
    
    // get_reward(): Returns reward of Task
    // NOTE If changing type of reward, need to update return type
    pub fn get_reward(&self) -> i32 { self.reward } 

    // get_subtasks(): Returns subtasks of Task
    // NOTE If changing type of subtasks, need to update return type
    pub fn get_subtasks(&self) -> &Vec<String> { &self.subtasks } 
}

// Mutator functions
impl Task {
    // set_title: Sets title of Task
    pub fn set_title(&mut self, title: &str) { self.title = title.to_string() }

    // set_description: Sets description of Task
    pub fn set_description(&mut self, description: &str) { self.description = description.to_string() }

    // set_date: Sets date of Task
    pub fn set_date(&mut self, date: NaiveDateTime) { self.date = date }

    // set_reward: Sets reward of Task
    pub fn set_reward(&mut self, reward: i32) { self.reward = reward }

    // set_subtasks(): Sets subtasks of Task
    pub fn set_subtasks(&mut self, vec: Vec<String>) { self.subtasks = vec.to_vec(); }
}


//Unit tests for basic tasks
#[cfg(test)]
mod tests {
    use super::*;
    use chrono::{ NaiveDate };

    #[test]
    fn test_task_new() {
        let title = "TITLE";
        let description = "DESCRIPTION";
        let date = NaiveDate::from_ymd(2000,01,17).and_hms(0,0,0);
        let reward = 50;
        let subtasks = vec!["1".to_string(),"2".to_string(),"3333".to_string()];

        let task = Task::new(title,description,date,reward,subtasks);
        assert_eq!(task.get_title().to_string(), "TITLE".to_string());
        assert_eq!(task.get_description().to_string(),"DESCRIPTION".to_string());
        assert_eq!(task.get_date(),NaiveDate::from_ymd(2000,01,17).and_hms(0,0,0));
        assert_eq!(task.get_reward(),50);
        assert_eq!(task.get_subtasks().to_vec(), vec!["1".to_string(),"2".to_string(),"3333".to_string()]);
    }

    #[test]
    fn test_task_set() {
        let title = "TITLE";
        let description = "DESCRIPTION";
        let date = NaiveDate::from_ymd(2000,01,17).and_hms(0,0,0);
        let reward = 50;
        let subtasks = vec!["1".to_string(),"2".to_string(),"3333".to_string()];

        let mut task = Task::new(title,description,date,reward,subtasks);

        task.set_title("CHANGED_TITLE");
        task.set_description("CHANGED_DESC");
        task.set_date(NaiveDate::from_ymd(1999,1,1).and_hms(1,1,1));
        task.set_reward(200);
        task.set_subtasks(vec!["orangutan".to_string(),"b".to_string()]);

        assert_eq!(task.get_title().to_string(), "CHANGED_TITLE".to_string());
        assert_eq!(task.get_description().to_string(),"CHANGED_DESC".to_string());
        assert_eq!(task.get_date(),NaiveDate::from_ymd(1999,1,1).and_hms(1,1,1));
        assert_eq!(task.get_reward(),200);
        assert_eq!(task.get_subtasks().to_vec(), vec!["orangutan".to_string(),"b".to_string()]);
    }
}
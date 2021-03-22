extern crate chrono;
use chrono::{Duration, NaiveDateTime};

// (Basic) Task Struct
#[derive(Clone)]
pub struct Task {
    title: String, // Task title
    description: String, // Task description
    date: chrono::NaiveDateTime, // Due date of the task, 
                            // TODO devise system for special cases (ie Infinitely repeatable)
    reward: i32, // TODO potentially change to a more advanced system later, primative placeholder
    subtasks: Vec<String> // TODO potentially change to having a subtasks struct 
                         //     that limits chaining but allows for descriptions or rewards
}

// Constructor for Task
//REVIEW: May need to change subtasks vec to subtasks.clone() ?
impl Task {
    pub fn new(title: &str, description: &str, date: chrono::NaiveDateTime, reward: i32, subtasks: Vec<String>) -> Self {
        Self {title: title.to_string(), description: description.to_string(), date: date, reward: reward, subtasks: subtasks}
    }
}

// Accessor functions for Task
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

// Mutator functions for Task
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
mod task_tests {
    use super::*;
    use chrono::{ NaiveDate };

    #[test]
    fn test_new() {
        let title = "TITLE";
        let description = "DESCRIPTION";
        let date = NaiveDate::from_ymd(2000,01,17).and_hms(0,0,0);
        let reward = 50;
        let subtasks = vec!["1".to_string(),"2".to_string(),"3333".to_string()];

        let task = Task::new(title,description,date,reward,subtasks);
        assert_eq!(task.get_title().clone(), "TITLE".to_string());
        assert_eq!(task.get_description().clone(),"DESCRIPTION".to_string());
        assert_eq!(task.get_date(),NaiveDate::from_ymd(2000,01,17).and_hms(0,0,0));
        assert_eq!(task.get_reward(),50);
        assert_eq!(task.get_subtasks().clone(), vec!["1".to_string(),"2".to_string(),"3333".to_string()]);
    }

    #[test]
    fn test_set() {
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

        assert_eq!(task.get_title().clone(), "CHANGED_TITLE".to_string());
        assert_eq!(task.get_description().clone(),"CHANGED_DESC".to_string());
        assert_eq!(task.get_date(),NaiveDate::from_ymd(1999,1,1).and_hms(1,1,1));
        assert_eq!(task.get_reward(),200);
        assert_eq!(task.get_subtasks().clone(), vec!["orangutan".to_string(),"b".to_string()]);
    }
}


// RepeatableTask Struct
#[derive(Clone)]
pub struct RepeatableTask {
    task: Task, // Task data
    repeat_increment: i32, // Number of days between each repeat. 0 for present at all times, 1 for daily, 7 for weekly
    repeats: i32 // Number of times task can be repeated. -1 for infinitely repeatable
}

// Constructor(s) for RepeatableTask
impl RepeatableTask {
    // NOTE: THIS SHOULD NOT BE USED WITH AN EXISTING Task UNLESS USED WITH Task::clone()
    //          Otherwise there may run into an issue with borrowing/ownership (Not good, fatal crash)
    /////Example: 
    /////       let rt = RepeatableTask::new_w_task(task.clone(), 50, 50) //Note task is a Task defined earlier
    // !!!USE WITH CAUTION!!!
    pub fn new_w_task(task_clone: Task, repeat_increment: i32, repeats: i32) -> Self {
        Self {task: task_clone, repeat_increment: repeat_increment, repeats: repeats}
    }

    //Creates new RepeatableTask with given values
    pub fn new(title: &str, description: &str, date: chrono::NaiveDateTime, reward: i32, subtasks: Vec<String>, repeat_increment: i32, repeats: i32) -> Self { 
        Self {task: Task::new(title, description, date, reward, subtasks), repeat_increment: repeat_increment, repeats: repeats }
    }
}

// Accessor functions for RepeatableTask
impl RepeatableTask {
    // get_title: Return the title of RepeatableTask
    pub fn get_title(&self) -> &String { &self.task.get_title() }

    // get_description(): Returns description of RepeatableTask
    pub fn get_description(&self) -> &String { &self.task.get_description() }

    // get_date(): Returns date of RepeatableTask
    pub fn get_date(&self) -> NaiveDateTime { self.task.get_date() }
    
    // get_reward(): Returns reward of RepeatableTask
    // NOTE If changing type of reward, need to update return type
    pub fn get_reward(&self) -> i32 { self.task.get_reward() } 

    // get_subtasks(): Returns subtasks of RepeatableTask
    // NOTE If changing type of subtasks, need to update return type
    pub fn get_subtasks(&self) -> &Vec<String> { &self.task.get_subtasks() } 

    // get_repeat_increment(): Returns repeat increment of RepeatableTask
    pub fn get_repeat_increment(&self) -> i32 { self.repeat_increment }

    // get_repeats(): Returns the number of repeats available, -1 if infinitely repeatable
    pub fn get_repeats(&self) -> i32 { self.repeats }
}

//Mutator functions for RepeatableTask
impl RepeatableTask {
    // set_title: Sets title of RepeatableTask
    pub fn set_title(&mut self, title: &str) { self.task.set_title(title) }

    // set_description: Sets description of RepeatableTask
    pub fn set_description(&mut self, description: &str) { self.task.set_description(description) }

    // set_date: Sets date of RepeatableTask
    pub fn set_date(&mut self, date: NaiveDateTime) { self.task.set_date(date)}

    // set_reward: Sets reward of RepeatableTask
    pub fn set_reward(&mut self, reward: i32) { self.task.set_reward(reward) }

    // set_subtasks(): Sets subtasks of RepeatableTask
    pub fn set_subtasks(&mut self, vec: Vec<String>) { self.task.set_subtasks(vec) }

    // set_repeat_increment: Sets repeat_increment of RepeatableTask
    pub fn set_repeat_increment(&mut self, repeat_increment: i32) { self.repeat_increment = repeat_increment }

    // set_repeats: Sets number of remaining repeats
    pub fn set_repeats(&mut self, repeats: i32) { self.repeats = repeats }
}

//More functions for RepeatableTask
impl RepeatableTask {
    //complete_task: Advances Self to next state, adjusts date by repeat increment days and reduces repeats by 1
    // Returns value of repeats
    pub fn complete_task(&mut self) {
        self.set_date(self.get_date() + Duration::days(self.repeat_increment.into()));
        if self.get_repeats() > 0 {
            self.set_repeats(self.get_repeats() - 1);
        }
        self.get_repeats();
    }
}


//Unit tests for RepeatableTasks
#[cfg(test)]
mod repeatabletask_tests {
    use super::*;
    use chrono::{ NaiveDate };

    #[test]
    fn test_new() {
        let title = "TITLE";
        let description = "DESCRIPTION";
        let date = NaiveDate::from_ymd(2000,01,17).and_hms(0,0,0);
        let reward = 50;
        let subtasks = vec!["1".to_string(),"2".to_string(),"3333".to_string()];
        let repeat_increment = 7;
        let repeats = 10;
        let task = RepeatableTask::new(title,description,date,reward,subtasks,repeat_increment,repeats);
        
        assert_eq!(task.get_title().clone(), "TITLE".to_string());
        assert_eq!(task.get_description().clone(),"DESCRIPTION".to_string());
        assert_eq!(task.get_date(),NaiveDate::from_ymd(2000,01,17).and_hms(0,0,0));
        assert_eq!(task.get_reward(),50);
        assert_eq!(task.get_subtasks().clone(), vec!["1".to_string(),"2".to_string(),"3333".to_string()]);
        assert_eq!(task.get_repeat_increment(), repeat_increment);
        assert_eq!(task.get_repeats(), repeats)
    }

    #[test]
    fn test_new_w_task() {
        let title = "TITLE";
        let description = "DESCRIPTION";
        let date = NaiveDate::from_ymd(2000,01,17).and_hms(0,0,0);
        let reward = 50;
        let subtasks = vec!["1".to_string(),"2".to_string(),"3333".to_string()];
        let repeat_increment = 7;
        let repeats = 10;
        let t = Task::new(title,description,date,reward,subtasks);
        let task = RepeatableTask::new_w_task(t,repeat_increment,repeats);
        assert_eq!(task.get_title().clone(), "TITLE".to_string());
        assert_eq!(task.get_description().clone(),"DESCRIPTION".to_string());
        assert_eq!(task.get_date(),NaiveDate::from_ymd(2000,01,17).and_hms(0,0,0));
        assert_eq!(task.get_reward(),50);
        assert_eq!(task.get_subtasks().clone(), vec!["1".to_string(),"2".to_string(),"3333".to_string()]);
        assert_eq!(task.get_repeat_increment(), repeat_increment);
        assert_eq!(task.get_repeats(), repeats)
    }

    #[test]
    fn test_set() {
        let title = "TITLE";
        let description = "DESCRIPTION";
        let date = NaiveDate::from_ymd(2000,01,17).and_hms(0,0,0);
        let reward = 50;
        let subtasks = vec!["1".to_string(),"2".to_string(),"3333".to_string()];
        let repeat_increment = 7;
        let repeats = 10;
        let mut task = RepeatableTask::new(title,description,date,reward,subtasks,repeat_increment,repeats);

        task.set_title("CHANGED_TITLE");
        task.set_description("CHANGED_DESC");
        task.set_date(NaiveDate::from_ymd(1999,1,1).and_hms(1,1,1));
        task.set_reward(200);
        task.set_subtasks(vec!["orangutan".to_string(),"b".to_string()]);
        task.set_repeat_increment(50);
        task.set_repeats(0);

        assert_eq!(task.get_title().clone(), "CHANGED_TITLE".to_string());
        assert_eq!(task.get_description().clone(),"CHANGED_DESC".to_string());
        assert_eq!(task.get_date(),NaiveDate::from_ymd(1999,1,1).and_hms(1,1,1));
        assert_eq!(task.get_reward(),200);
        assert_eq!(task.get_subtasks().clone(), vec!["orangutan".to_string(),"b".to_string()]);
        assert_eq!(task.get_repeat_increment(), 50);
        assert_eq!(task.get_repeats(), 0)
    }

    #[test]
    fn test_set_w_task() {
        let title = "TITLE";
        let description = "DESCRIPTION";
        let date = NaiveDate::from_ymd(2000,01,17).and_hms(0,0,0);
        let reward = 50;
        let subtasks = vec!["1".to_string(),"2".to_string(),"3333".to_string()];
        let repeat_increment = 7;
        let repeats = 10;
        let mut t = Task::new(title,description,date,reward,subtasks);
        let mut task = RepeatableTask::new_w_task(t.clone(),repeat_increment,repeats);

        task.set_title("CHANGED_TITLE");
        task.set_description("CHANGED_DESC");
        task.set_date(NaiveDate::from_ymd(1999,1,1).and_hms(1,1,1));
        task.set_reward(200);
        task.set_subtasks(vec!["orangutan".to_string(),"b".to_string()]);
        task.set_repeat_increment(50);
        task.set_repeats(0);

        t.set_title("t_CHANGED_TITLE");
        t.set_description("t_CHANGED_DESC");
        t.set_date(NaiveDate::from_ymd(1976,5,3).and_hms(3,2,1));
        t.set_reward(1);
        t.set_subtasks(vec!["monke".to_string(),"ape".to_string(),"chimp".to_string()]);
        //RepeatableTask Checks
        assert_eq!(task.get_title().clone(), "CHANGED_TITLE".to_string());
        assert_eq!(task.get_description().clone(),"CHANGED_DESC".to_string());
        assert_eq!(task.get_date(),NaiveDate::from_ymd(1999,1,1).and_hms(1,1,1));
        assert_eq!(task.get_reward(),200);
        assert_eq!(task.get_subtasks().clone(), vec!["orangutan".to_string(),"b".to_string()]);
        assert_eq!(task.get_repeat_increment(), 50);
        assert_eq!(task.get_repeats(), 0);
        //Task Checks
        assert_eq!(t.get_title().clone(), "t_CHANGED_TITLE".to_string());
        assert_eq!(t.get_description().clone(),"t_CHANGED_DESC".to_string());
        assert_eq!(t.get_date(),NaiveDate::from_ymd(1976,5,3).and_hms(3,2,1));
        assert_eq!(t.get_reward(),1);
        assert_eq!(t.get_subtasks().clone(), vec!["monke".to_string(),"ape".to_string(),"chimp".to_string()]);
    }

    #[test]
    fn test_complete_task() {
        //Test with task based creation
        let title = "TITLE";
        let description = "DESCRIPTION";
        let date = NaiveDate::from_ymd(2000,01,17).and_hms(1,2,3);
        let reward = 50;
        let subtasks = vec!["1".to_string(),"2".to_string(),"3333".to_string()];
        let repeat_increment = 7;
        let repeats = 10;
        let t = Task::new(title,description,date,reward,subtasks.clone());
        let mut task = RepeatableTask::new_w_task(t.clone(),repeat_increment,repeats);
        task.complete_task();
        assert_eq!(task.get_date(),NaiveDate::from_ymd(2000,01,24).and_hms(1,2,3));
        assert_eq!(task.get_repeats(),repeats-1);
        //Test with value based creation
        let repeat_increment_t2 = 366;
        let mut task2 = RepeatableTask::new(title,description,date,reward,subtasks,repeat_increment_t2,-1);
        task2.complete_task();
        assert_eq!(task2.get_date(),NaiveDate::from_ymd(2001,01,17).and_hms(1,2,3));
        assert_eq!(task2.get_repeats(),-1);
    }
}
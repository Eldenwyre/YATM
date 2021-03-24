use crate::task::{Task, RepeatableTask};

// Skill Struct
#[derive(Clone, serde_derive::Serialize, serde_derive::Deserialize)]
pub struct Skill {
    title: String, // Skill Title
    description: String, // Skill Description
    experience: i64, // Skill Experience
    tasks: Vec<RepeatableTask>, // RepeatableTasks for skill
}

// Constructor for skill
impl Skill {
    pub fn new(title: &str, description: &str, experience: i64, tasks: Vec<RepeatableTask>) -> Self {
        Self { title: title.to_string(), description: description.to_string(), experience: experience, tasks: tasks }
    }
}

// Accessor Functions for Skill
impl Skill {
    // get_title: Returns title of Skill
    pub fn get_title(&self) -> &String { &self.title }

    // get_description(): Returns description of Skill
    pub fn get_description(&self) -> &String { &self.description }
    
    // get_xp(): Returns xp of Skill
    pub fn get_xp(&self) -> i64 { self.experience } 

    // get_tasks(): Returns tasks of Skill
    pub fn get_tasks(&self) -> &Vec<RepeatableTask> { &self.tasks } 

    // get_level(): Returns the level based on the xp of the skill
    pub fn get_level(&self) -> i32 {
        let xp_min = 21.0; //Min XP needed for level 1
        let xp_max = 150409.0; //Min XP needed for Max level
        let xp = self.get_xp() as f32; //Current XP of skill

        if xp < xp_min { return 0 };
        if xp > xp_max { return 250 };
        
        let mut level = 1.00 + f32::powf(xp, 0.49) - xp.powf(0.38) - xp.powf(0.07624);
        
        level as i32
    }
}

// Mutator Functions for Skill
impl Skill {
    // set_title: Sets title of Skill
    pub fn set_title(&mut self, title: &str) { self.title = title.to_string() }

    // set_description: Sets description of Skill
    pub fn set_description(&mut self, description: &str) { self.description = description.to_string() }

    // set_xp(): Sets xp of Skill
    pub fn set_xp(&mut self, xp: i64) { self.experience = xp }

    // set_subtasks(): Sets subtasks of Skill
    pub fn set_tasks(&mut self, vec: Vec<RepeatableTask>) { self.tasks = vec.to_vec(); }
}



//Unit Tests for Skills
#[cfg(test)]
mod skill_tests{
    use super::*;
    use chrono::{NaiveDate};

    #[test]
    fn test_new() {
        let title = "SKILL";
        let description = "This is a skill";
        let xp = 1000;
        let tasks = vec![RepeatableTask::new("T1","T1Desc",NaiveDate::from_ymd(2000,01,17).and_hms(0,0,0),50,vec!["1".to_string(),"2".to_string(),"3333".to_string()],5,10),
                        RepeatableTask::new("T2","T2Desc",NaiveDate::from_ymd(2020,02,12).and_hms(1,1,1),520,vec!["11111".to_string(),"2".to_string(),"3".to_string()],10,15)];
        let skill = Skill::new(title,description,xp,tasks);

        //Easy checks
        assert_eq!(skill.get_title().clone(),title);
        assert_eq!(skill.get_description().clone(),description);
        assert_eq!(skill.get_xp(), xp);
        //Checking Tasks...yuck
        assert_eq!(skill.get_tasks()[0].get_title().clone(), "T1");
        assert_eq!(skill.get_tasks()[0].get_description().clone(), "T1Desc");
        assert_eq!(skill.get_tasks()[0].get_date(), NaiveDate::from_ymd(2000,01,17).and_hms(0,0,0));
        assert_eq!(skill.get_tasks()[0].get_reward(), 50);
        assert_eq!(skill.get_tasks()[0].get_subtasks().clone(), vec!["1".to_string(),"2".to_string(),"3333".to_string()]);
        assert_eq!(skill.get_tasks()[0].get_repeat_increment(), 5);
        assert_eq!(skill.get_tasks()[0].get_repeats(), 10);
        assert_eq!(skill.get_tasks()[1].get_title().clone(), "T2");
        assert_eq!(skill.get_tasks()[1].get_description().clone(), "T2Desc");
        assert_eq!(skill.get_tasks()[1].get_date(), NaiveDate::from_ymd(2020,02,12).and_hms(1,1,1));
        assert_eq!(skill.get_tasks()[1].get_reward(), 520);
        assert_eq!(skill.get_tasks()[1].get_subtasks().clone(), vec!["11111".to_string(),"2".to_string(),"3".to_string()]);
        assert_eq!(skill.get_tasks()[1].get_repeat_increment(), 10);
        assert_eq!(skill.get_tasks()[1].get_repeats(), 15);
    }

    #[test]
    fn test_set() {
        let title = "Original";
        let description = "Original";
        let xp = 10000;
        let tasks : Vec<RepeatableTask> = Vec::new();
        let mut skill = Skill::new(title,description,xp,tasks);

        skill.set_title("Title");
        skill.set_description("Description");
        skill.set_xp(15);
        skill.set_tasks(vec![RepeatableTask::new("T1","T1Desc",NaiveDate::from_ymd(2000,01,17).and_hms(0,0,0),50,vec!["1".to_string(),"2".to_string(),"3333".to_string()],5,10)]);

        //Easy checks
        assert_eq!(skill.get_title().clone(),"Title");
        assert_eq!(skill.get_description().clone(),"Description");
        assert_eq!(skill.get_xp(), 15);
        //Checking Tasks...yuck
        assert_eq!(skill.get_tasks()[0].get_title().clone(), "T1");
        assert_eq!(skill.get_tasks()[0].get_description().clone(), "T1Desc");
        assert_eq!(skill.get_tasks()[0].get_date(), NaiveDate::from_ymd(2000,01,17).and_hms(0,0,0));
        assert_eq!(skill.get_tasks()[0].get_reward(), 50);
        assert_eq!(skill.get_tasks()[0].get_subtasks().clone(), vec!["1".to_string(),"2".to_string(),"3333".to_string()]);
        assert_eq!(skill.get_tasks()[0].get_repeat_increment(), 5);
        assert_eq!(skill.get_tasks()[0].get_repeats(), 10);
    }

    #[test]
    fn test_level(){
        let mut skill = Skill::new("Skill","DescSkill",1,Vec::new());
        assert_eq!(skill.get_level(), 0);
        skill.set_xp(250000);
        assert_eq!(skill.get_level(),250);
        skill.set_xp(25);
        assert_eq!(skill.get_level(),1);
    }
}

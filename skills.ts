import { Character } from './datastructures/char.js';
import { getData, characterFromObj } from './json_io.js';

var data = getData();
var character = characterFromObj(data);

window.onload = () => {
  var maximum = 150000; //Value to reach the max level
  for (var i = 0; i < character.skills.length; i++) {
    var skill = character.skills[i];

    var Skill = document.createElement('div');
    var img = document.createElement('img');
    var Name = document.createElement('h3');
    var Level = document.createElement('h1');
    var XP = document.createElement('progress')
    
    Skill.className = 'skillTab';
    img.src = "images/Skill.png"
    Name.className = 'skillName';
    Name.innerHTML = skill.title;
    XP.className = 'Xp';
    XP.max = maximum;
    XP.value = skill.experience;
    Level.className = 'skillLevel';
    Level.innerHTML = Math.trunc(getLevel(skill.experience)).toString();
    Skill.appendChild(img);
    Skill.appendChild(Name);
    Skill.appendChild(Level);
    Skill.appendChild(XP);
    document.getElementsByTagName('body')[0].appendChild(Skill);
  }
}

//Calculates level based on XP of skill
function getLevel(experience): number {
  //XP_MIN is 21 for level 1
  if (experience < 21) { 
      return 0; 
  }
  //XP_MAX is 150409 for level 2500
  else if (experience > 150000) { 
      return 250; 
  }
  //Else use level curve
  else {
      return 1 + Math.pow(experience,0.49) - Math.pow(experience,0.38) - Math.pow(experience,0.07624);
  }
}
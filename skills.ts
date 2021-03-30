import { Character } from './datastructures/char.js';
import { getData, characterFromObj } from './json_io.js';

var data = getData();
var character = characterFromObj(data);

window.onload = () => {
  var maximum = 100; //Value to reach the next level
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
    Level.innerHTML = Math.trunc(character.getLevel()).toString();
    Skill.appendChild(img);
    Skill.appendChild(Name);
    Skill.appendChild(Level);
    Skill.appendChild(XP);
    document.getElementsByTagName('body')[0].appendChild(Skill);
  }
}

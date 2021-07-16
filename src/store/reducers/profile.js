const st = {
  name: '',
  alias_name: '',
  splash_uri: '',
  splash_intro: '',
  userID: 'manas22@gmail.com',
  tech_skills: {
    intro: '',
    skills: [],
  },
  tech_products: {
    intro: '',
    products: [],
  },
  projects: [],
  career_path: [],
};
export default function profileReducer(state = st, actions = {type:'default'}) {
  console.log('ProfileReducer', actions);
  switch(actions.type) {
    case 'default':
      return state;
    case 'SET_PROFILE':
      // groupBySKills
      const groupedSkill = groupBySkillsHelper(actions.payload?.tech_skills?.skills)
      actions.payload.tech_skills.skills =  groupedSkill;
      const nwState = { ...state, ...actions.payload };
      console.log(nwState);
      return  nwState;
    default:
      return state;
  }
}

function groupBySkillsHelper(skills) {
  const skillMap = skills.reduce((map, current) => {
    if (!map.has(current.groupBy)) {
      map.set(current.groupBy, [current])
    } else {
      map.get(current.groupBy).push(current);
    }
    return map;
  }, new Map());
  return Array.from(skillMap).sort((a, b) => (a[1].length > b[1].length ? -1: 1))
}
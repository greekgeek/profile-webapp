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
  projects: {
    intro: '',
    history: [],
  },
  career_path: {
    intro: '',
    path: [],
  },
  education_path: {
    intro: '',
    path: [],
  },
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
      const project_payload = {
        projects: {}
      };
      console.log(actions.payload?.project_intro)
      project_payload.projects.history = actions.payload?.projects ?? [];
      project_payload.projects.intro = actions.payload?.project_intro ?? '';
      const nwState = { ...state, ...actions.payload, ...project_payload};
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
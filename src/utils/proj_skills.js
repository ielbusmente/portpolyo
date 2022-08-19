import { db } from "./firebase"

export async function add_project_skill({ name, skill_type }) {
  await db.skills
    .add({ name, skill_type })
    .then(() => console.log(`Skill added.`))
    .catch(e => console.error(`Failed to add skill. ${e}`))
}

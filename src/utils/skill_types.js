import { db } from "./firebase"

export async function add_skill_type({ name }) {
  await db.skill_types
    .add({ name })
    .then(() => console.log(`Skill type added.`))
    .catch(e => console.error(`Failed to add skill type. ${e}`))
}

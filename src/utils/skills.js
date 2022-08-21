import { db } from "./firebase"

export async function add_skill(data) {
  await db.skills
    .add(data)
    .then(() => console.log(`Skill added.`))
    .catch(e => console.error(`Failed to add skill. ${e}`))
}

export async function update_skill(data) {
  const doc = db.skills.doc(data._id)
  const skill_from_db = await doc.get()
  if (skill_from_db.exists) {
    await doc
      .update(data)
      .then(() => console.log(`Skill updated.`))
      .catch(e => console.error(`Failed to update skill. ${e}`))
  } else console.error(`Skill does not exist`)
}
export async function delete_skill(id) {
  await db.skills
    .doc(id)
    .delete()
    .then(() => console.log(`Skill deleted.`))
    .catch(e => console.error(`Failed to delete Skill. ${e}`))
}

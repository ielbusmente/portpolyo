import { db } from "./firebase"

export async function add_skill_type({ name }) {
  await db.skill_types
    .add({ name })
    .then(() => console.log(`Skill type added.`))
    .catch(e => console.error(`Failed to add skill type. ${e}`))
}
export async function update_skill_type(id, { name }) {
  const doc = db.skill_types.doc(id)
  const skill_type_from_db = await doc.get()
  if (skill_type_from_db.exists) {
    await doc
      .update({ name })
      .then(() => console.log(`Skill type updated.`))
      .catch(e => console.error(`Failed to update skill type. ${e}`))
  } else console.error(`Skill Type does not exist`)
}
export async function delete_skill_type(id) {
  await db.skill_types
    .doc(id)
    .delete()
    .then(() => console.log(`Skill type deleted.`))
    .catch(e => console.error(`Failed to delete skill type. ${e}`))
}

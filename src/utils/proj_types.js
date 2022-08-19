import { db } from "./firebase"

export async function add_proj_type({ name }) {
  await db.proj_types
    .add({ name })
    .then(() => console.log(`Project type added.`))
    .catch(e => console.error(`Failed to add project type. ${e}`))
}
export async function update_proj_type(id, { name }) {
  const doc = db.proj_types.doc(id)
  const proj_type_from_db = await doc.get()
  if (proj_type_from_db.exists) {
    await doc
      .update({ name })
      .then(() => console.log(`Project type updated.`))
      .catch(e => console.error(`Failed to update project type. ${e}`))
  } else console.error(`Project Type does not exist`)
}
export async function delete_proj_type(id) {
  await db.proj_types
    .doc(id)
    .delete()
    .then(() => console.log(`Project type deleted.`))
    .catch(e => console.error(`Failed to delete project type. ${e}`))
}

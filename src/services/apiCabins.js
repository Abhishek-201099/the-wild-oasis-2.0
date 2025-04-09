import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log("getCabins() error : ", error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);

  // Create the ImagePath to be inserted in 'Image' field of new cabin.
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Create/Edit cabin
  let query = supabase.from("cabins");

  // Create Cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // Edit Cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log("createCabin error  : ", error);
    throw new Error("Cabin could not be created");
  }

  // Returning data if hasImagePath is true
  // As it is referncing the same image path in storage so no need to upload it again
  if (hasImagePath) return data;

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the created cabin if there's a storage error for the image.
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log("Storage Error :", storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log("deleteCabins error : ", error);
    throw new Error("Cabin could not be deleted");
  }
}

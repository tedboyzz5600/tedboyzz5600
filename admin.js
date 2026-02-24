async function loadAdmin() {
  const { data, error } = await supabaseClient
    .from("listings")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const box = document.getElementById("adminList");
  box.innerHTML = "";

  data.forEach(l => {
    box.innerHTML += `
      <article class="product-card">
        <img src="${l.image}" class="product-card__image">
        <h3>${l.name}</h3>
        <p>$${l.price}</p>
        <button class="admin-btn" onclick="deleteListing(${l.id})">Delete</button>
      </article>
    `;
  });
}

async function addListing() {
  const name = document.getElementById("name").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const description = document.getElementById("desc").value.trim();
  const fileInput = document.getElementById("imageFile");
  const file = fileInput.files[0];

  if (!name || isNaN(price) || !file) {
    alert("Fill all fields and choose image");
    return;
  }

  const fileName = `${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabaseClient
    .storage
    .from("product-images")
    .upload(`products/${fileName}`, file)
  if (uploadError) {
    console.error(uploadError);
    alert("Upload failed");
    return;
  }

  const { data } = supabaseClient
    .storage
    .from("product-images")
    .getPublicUrl(`products/${fileName}`)
  const imageUrl = data.publicUrl;

  const { error } = await supabaseClient.from("listings").insert([
    { name, price, description, image: imageUrl }
  ]);

  if (error) {
    console.error(error);
    alert("Save failed");
    return;
  }

  loadAdmin();
}

async function deleteListing(id) {
  await supabaseClient.from("listings").delete().eq("id", id);
  loadAdmin();
}

document.addEventListener("DOMContentLoaded", loadAdmin);
async function renderListings() {
  const { data, error } = await supabaseClient
    .from("listings")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Load error:", error);
    return;
  }

  const container = document.querySelector(".products");
  container.innerHTML = "";

  data.forEach(item => {
    container.innerHTML += `
      <article class="product-card">
        <img src="${item.image}" class="product-card__image">
        <h3 class="product-card__name">${item.name}</h3>
        <p class="product-card__price">$${item.price}</p>
        <p class="product-card__description">${item.description}</p>
      </article>
    `;
  });
}

renderListings();
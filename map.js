document.addEventListener("DOMContentLoaded", function () {
  let productsData;

  fetch("https://fakestoreapi.com/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((responseData) => {
      productsData = responseData;
      displayProducts(productsData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  function displayProducts(data) {
    let productContainer = document.querySelector(".product-grid");
    productContainer.innerHTML = "";

    data.forEach((value) => {
      let productElement = document.createElement("div");
      productElement.className = "product-card";
      let productHtml = `
          <div class="image-container">
              <img src="${value.image}" alt="img" class="product-image">
          </div>
          <div class="content-container">
              <a href="#" class="title">${value.title}</a>
              <a href="#" class="rating">${value.rating.rate}</a>
          </div>
          <p class="price-tag">Price: ${value.price} Rs</p>
          <button>BUY NOW</button>
      `;
      productElement.innerHTML = productHtml;
      productContainer.append(productElement);
    });
  }

  function filterItems(category) {
    if (category === "all") {
      displayProducts(productsData);
    } else {
      const filteredData = productsData.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      displayProducts(filteredData);
    }
  }

  document
    .getElementById("category-select")
    .addEventListener("change", function () {
      const selectedCategory = this.value;
      filterItems(selectedCategory);
    });
});

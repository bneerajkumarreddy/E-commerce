// renderer.js (example)

const { ipcRenderer } = require("electron");

ipcRenderer.send("get-products");

ipcRenderer.on("products", (event, products) => {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Category: ${product.category}</p>
        `;
    productList.appendChild(productElement);
  });
});

const warning = document.querySelector("h2");
const inpMin = document.querySelector("#min");
const inpMax = document.querySelector("#max");
const buttonSearch = document.querySelector("#search");
const products = document.querySelector(".product_list__container");
/////
let data = [];
const renderData = (dataProduct) => {
    data = [...dataProduct];
    products.innerHTML = "";
    data.forEach((el) => {
        const div = document.createElement("div");
        div.className = "container__one__product";
        const img = document.createElement("img");
        img.src = el.image;
        div.append(img);
        const p = document.createElement("p");
        p.innerText = el.price;
        div.append(p);
        products.append(div);
    });
};
/////
const getProductFakeStore = fetch("https://fakestoreapi.com/products");
getProductFakeStore
    .then((response) => response.json())
    .then((resp) => renderData(resp));
//////
buttonSearch.addEventListener("click", () => {
    if (inpMax.value.trim() && inpMin.value.trim()) {
        const min = inpMin.value;
        const max = inpMax.value;
        const filterData = data
            .filter((el) => el.price >= +min && el.price <= +max)
            .sort((a, b) => a.price - b.price);
        renderData(filterData);
        warning.innerText = "";
    } else {
        warning.innerText =
            "Введите минимальную и максимальную стоимость товара";
    }
});

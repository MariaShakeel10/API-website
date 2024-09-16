let categoriesData;
async function getCategoriesData() {
    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories');
        categoriesData = await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function displayCategories() {
    if (!categoriesData) {
        await getCategoriesData();
    }

    main.innerHTML = '';
    for (const key in categoriesData) {
        let allProductsBrand = categoriesData[key];
        for (const key1 in categoriesData[key]) {
            let allProducts = categoriesData[key][key1];

            main.innerHTML += `<div class="card text-center" style="width: 18rem;">
              <img src="${allProducts.image}" id="${allProducts.id}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${allProducts.name}</h5>
                <p class="card-text">Price:$</p>
                <div id=""></div>
                <a href="#" class="btn btn-primary">Add To Cart</a>
              </div>
            </div>`
        }
    }
}

async function populateBrandDropdown() {
    if (!categoriesData) {
        await getCategoriesData();
    }

    const brandSelect = document.getElementById('brand');
    brandSelect.innerHTML = '';
    for (let brand in categoriesData) {
        let option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
    }
}

async function populateItemDropdown() {
    if (!categoriesData) {
        await getCategoriesData();
    }

    const brandSelect = document.getElementById('brand').value;
    const itemSelect = document.getElementById('item');
    itemSelect.innerHTML = '<option value="" selected disabled>Select Item</option>'; // Reset items
    if (brandSelect) {
        for (let item in categoriesData[brandSelect]) {
            let option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            itemSelect.appendChild(option);
        }
    }
}

async function search() {
    const brand = document.getElementById('brand').value;
    const item = document.getElementById('item').value;
    const mainSection = document.getElementById('main');
    const secondSection = document.getElementById('second');
    let banner = document.getElementById("carouselExampleInterval")
    banner.innerHTML = '';
    mainSection.innerHTML = ''; // Clear previous results
    secondSection.innerHTML = ''; // Clear previous results

    if (brand && item) {
        if (!categoriesData) {
            await getCategoriesData();
        }

        const product = categoriesData[brand][item];
        const productCard = createProductCard(product.image, product.name);
        mainSection.appendChild(productCard);
    }
}

function createProductCard(image, name) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.width = '18rem';

    const imgElement = document.createElement('img');
    imgElement.src = image;
    imgElement.className = 'card-img-top';
    imgElement.alt = name;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = name;

    const cardBtn = document.createElement('button')
    cardBtn.className = "btn btn-primary"
    cardBtn.innerText = "Add to cart"

    cardBody.appendChild(cardTitle);
    card.appendChild(imgElement);
    card.appendChild(cardBody);

    return card;
}

window.onload = async function () {
    await populateBrandDropdown();
    await displayCategories();
}
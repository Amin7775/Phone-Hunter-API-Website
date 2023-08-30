

console.log("Connected to phone.js");
const loadPhone = async (searchText) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);

  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
    // step 1. get container 
    const phoneContainer = document.getElementById('phone-container')

    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';
  phones.forEach((phone) => {
    console.log(phone);
    // 2 . Create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-96 bg-gray-100 shadow-xl p-2 lg:p-4`;

    // 3. Set inner HTML
    phoneCard.innerHTML = `
        <figure>
        <img src="${phone.image}" alt="Shoes" />
        </figure>

        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>

            <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
            </div>

        </div>
        `;

        // 4. AppendChild
        phoneContainer.appendChild(phoneCard)
  });
};

// Handle Search Btn

const handleSearch  = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);
    searchField.value = '';
}


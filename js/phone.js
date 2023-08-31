

console.log("Connected to phone.js");
const loadPhone = async (searchText= '13', isShowALL) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);

  const data = await res.json();
  const phones = data.data;
  displayPhones(phones , isShowALL);

};

const displayPhones = (phones , isShowALL) => {
    // step 1. get container 
    const phoneContainer = document.getElementById('phone-container')

    toggleLoadingSpinner();
    // display show all button if there is more than 10 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 9 && !isShowALL){
      showAllContainer.classList.remove('hidden');
      phones = phones.slice(0,9)
    }else{
      showAllContainer.classList.add('hidden');
    }
    // console.log("isShowAll", isShowALL);
    // Limit number of cards shown if not show all
  

    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';
  phones.forEach((phone) => {
    // console.log(phone);
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

            <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>

        </div>
        `;

        // 4. AppendChild
        phoneContainer.appendChild(phoneCard)
  });
};
// Handle Show Details
const handleShowDetails = async (id) =>{
  // console.log('Clicked on ', id);

  // load individual data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  
  // console.log(data)
  const phone = data.data;

  
  showPhoneDetails(phone)
}

// show phone details
const showPhoneDetails = (phone) =>{
  console.log(phone)

  const phoneName = document.getElementById('phone-name');
  phoneName.innerText = phone.name;

  const showDetailsContainer = document.getElementById('show-details-container');
  showDetailsContainer.innerHTML=`
  <img src="${phone.image}" />
  <p><b>Brand</b> : ${phone?.brand}<p/>
  <p><b>Storage</b> : ${phone?.mainFeatures?.storage}<p/>
  <p><b>Display Size</b> : ${phone?.mainFeatures?.displaySize
  }<p/>
  <p><b>Chipset</b> : ${phone?.mainFeatures?.chipSet}<p/>
  <p><b>Realese Date</b> : ${phone?.releaseDate}<p/>
  `
  // show the modal
  show_details_modal.showModal();
}


// Handle Search Btn

const handleSearch  = (isShowALL) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowALL);
    // searchField.value = '';
}

const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner= document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }else{
    loadingSpinner.classList.add('hidden');
  }
}

// handle show all
const handleShowAll = () => {
  // const showAll=document.getElementById('show-all');
  handleSearch(true);
}

loadPhone();
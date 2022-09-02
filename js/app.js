const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    const res = await fetch(url);
    const data = await res.json();

    displayPhones(data.data , dataLimit);

}

const displayPhones = (phones, dataLimit) => {

    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    // display 10 phones only
    const showAll = document.getElementById('show-all');
    // display no phone
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    const noPhone = document.getElementById('no-found-messege');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none')
    }
    // display All phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-into additional content. This content is a little bit longer.</p>
                <button onclick = "loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal"  data-bs-target="#phoneDetailsModal">Show Details</button>

            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);

    })

    // stop loader
    toggleSpiner(false);
}
const processSearch = (dataLimit) => {
    // start loader
    toggleSpiner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
}

// handle search btn click
document.getElementById('btn-search').addEventListener('click', function(){
    // start loader
    processSearch(10);
});

//search input field enter key handeler
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(10);
    }
})

const toggleSpiner = isLoadeing => {
    const loaderSection = document.getElementById('loader');
    if(isLoadeing){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}


// not the best way to show allll
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})


// load phone details
const loadPhoneDetails =async (id )=>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <img src="${phone.image}">
        <p>Relase Date: ${phone.releaseDate ? phone.releaseDate : 'No Relase Date Found'}</p>
        <p>Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : 'No Relase Date Found'}</p>
        <p>Display: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No Relase Date Found'}</p>
        
    `;
}
//loadPhone();
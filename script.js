
const loadAllCategoryBtn = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json()
    displayCategoryBtn(data.categories);
}

const loadPetsByCategory = async (category) => {
    removeActiveClass()
    addActiveClasses(category)
    loadingSpinner(true)
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    const data = await res.json()
    setTimeout(() => {
        displayAllPets(data.data);
        storedPetsData = data.data
        loadingSpinner(false)
    }, 200)
}

const loadAllPets = async () => {



    loadingSpinner(true)
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json()
    setTimeout(() => {
        displayAllPets(data.pets);
        storedPetsData = data.pets
        loadingSpinner(false)
    }, 200)
}


const displayAllPets = (data) => {

    const cardContainer = document.getElementById('card-container')

    if (data.length == 0) {
        cardContainer.classList.remove('grid')
        cardContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center mx-auto">
        <img src="./images/error.webp" alt="">
        <h1>Not Available This Category Content.</h1>
    </div>
        `;
    } else {
        cardContainer.classList.add('grid')
    }

    data.forEach(card => {
        const div = document.createElement('div')
        div.classList.add('p-5', 'rounded-lg', 'border')
        div.innerHTML = `
          <img class="h-36 w-full rounded-xl" src=${card.image} alt="">
           <p class="font-bold">Name:${card.pet_name}</p>
           <p class="font-bold">Breed:${card.breed ? card.breed : 'Not Available'}</p>
           <p class="font-bold">Vaccinated:${card.vaccinated_status}</p>
           <p class="font-bold">Gender:${card.gender}</p>
           <p class="font-bold">Price:${card.price}</p>
           <p class="font-bold">Date of birth:${card.date_of_birth ? card.date_of_birth : 'Not Available'}</p>
           <p class="font-bold">Category:${card.category}</p>
           <div class="flex justify-between overflow-hidden mt-5">
           <button onclick="adoptModal(this)" class="border">Adopt</button>
           <button onclick="like('${card.image}')" class="border h-fit">Like</button>
           <button class="border">Details</button>
            </div>
        `
        cardContainer.appendChild(div)
    })
}

const displayCategoryBtn = (data) => {
    const btnContainer = document.getElementById('btn-container')

    data.forEach(btn => {
        const div = document.createElement('div')
        div.innerHTML = `
        <button id="${btn.category}" onClick="loadPetsByCategory('${btn.category}')" class="category-btn flex btn gap-6 font-bold lg:gap-10">
            <img class="w-100 h-full" src=${btn.category_icon} alt="">
            <p>${btn.category}</p>
        </button>
        `
        btnContainer.appendChild(div)
    });
}

const adoptModal = (event) => {
    let count = 3;
    const countContainer = document.getElementById('countdown-container')
    countContainer.innerText = count;
    const interval = setInterval(() => {
        count--
        if (count !== 0) countContainer.innerHTML = count
        my_modal_1.showModal()
        if (count < 1) {
            clearInterval(interval)
            my_modal_1.close()
        }
    }, 1000)

}

loadAllCategoryBtn()
loadAllPets()
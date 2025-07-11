// 1. fetch button category
// 2. fetch all card
// 3. fetch by category with category buttons
// 4. fetch sorted data


let storedPetsData = [];

const loadingSpinner = (show) => {
    const spinner = document.getElementById('loader')
    if (show) {
        spinner.classList.remove('hidden')
        document.getElementById('card-container').innerHTML = '';
    } else {
        spinner.classList.add('hidden')
    }
}

const removeActiveClass = () => {
    const allButtons = document.querySelectorAll('.category-btn')

    for (btn of allButtons) {
        btn.classList.remove(
            'bg-emerald-100',
            'rounded-full',
            'border-teal-800',
            'border-2',
        )
    }
}

const addActiveClasses = (category) => {
    const activeButtons = document.getElementById(`${category}`)
    activeButtons.classList.add(
        'bg-emerald-100',
        'rounded-full',
        'border-teal-800',
        'border-2',
    )
}

const sort = () => {
    loadingSpinner(true)
    const sortedData = storedPetsData.sort((a, b) => b.price - a.price)
    setTimeout(() => {
        displayAllPets(sortedData);
        loadingSpinner(false)
    }, 200)
}

const like = (imgUrl) => {
    console.log(imgUrl);
    const imgContainer = document.getElementById('liked-container')
    const div = document.createElement('div')
    div.innerHTML = `<img class="border rounded-xl p-2" src=${imgUrl} alt="">`
    imgContainer.appendChild(div)
}
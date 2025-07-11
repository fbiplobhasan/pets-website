// 1. fetch button category
// 2. fetch all card
// 3. fetch by category with category buttons
// 4. fetch sorted data


let storedPetsData = [];

const loadingSpinner = (show) => {
    const spinner = document.getElementById('loader')
    if (show) {
        spinner.classList.remove('hidden')
        const cardContainer = document.getElementById('card-container').innerHTML = '';
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
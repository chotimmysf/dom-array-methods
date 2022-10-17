const addUser = document.getElementById('addUser');
const doubleMoney = document.getElementById('doubleMoney');
const halfMoney = document.getElementById('halfMoney');
const showMillionaires = document.getElementById('showMillionaires');
const sortByRichestBtn = document.getElementById('sortByRichest');
const calculateWealthButton = document.getElementById('calculateWealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user & add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        wealth: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

// Add new object to data array
function addData(obj) {
    data.push(obj);

    updateDOM();
};

// Update DOM
function updateDOM(providedData = data) {
    // Clear main div
    main.innerHTML = '<h2><strong>Person<strong>Wealth</h2>';

    providedData.forEach(person => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${person.name}</strong> ${formatWealth(person.wealth)}`;
        main.appendChild(element);
    });
}

// Format number as money
function formatWealth(number) {
    return('$' +
    (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    );
}

// Double everyone's money
function moneyDouble() {
    data = data.map((user) => {
        return {...user, wealth: user.wealth * 2};
    });

    updateDOM();
}

// Half everyone's money
function moneyHalf() {
    data = data.map((user) => {
        return{...user, wealth: user.wealth / 2};
    });

    updateDOM();
}

// Sort users by richness
function sortByRichest() {
    data.sort((a, b) => b.wealth - a.wealth);

    updateDOM();
}

// Display only millionaires
function filterByMillionaires() {
    data = data.filter(person => person.wealth > 1000000);

    updateDOM();
}

// Calculate wealth of everyone shown
function calculateTotalWealth() {
    const totalWealth = data.reduce((acc, person) => (acc += person.wealth), 0);

    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3 id='wealthElement'>Total Wealth: ${formatWealth(totalWealth)}</h3>`;

    var wealthElementExists = document.getElementById('wealthElement');
    if(wealthElementExists) {
        return;
    } else {
     main.appendChild(wealthElement);
    }
}

// Event Listeners for Buttons
addUser.addEventListener('click', getRandomUser);
doubleMoney.addEventListener('click', moneyDouble);
halfMoney.addEventListener('click',moneyHalf);
sortByRichestBtn.addEventListener('click', sortByRichest);
showMillionaires.addEventListener('click', filterByMillionaires);
calculateWealthButton.addEventListener('click', calculateTotalWealth);
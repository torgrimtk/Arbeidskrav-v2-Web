const warriorsData = [
    { id: 0, name: "Aragorn", image: "warrior-2.jpg", price: 1000 },
    { id: 1, name: "Legolas", image: "warrior-2.jpg", price: 800 },
    { id: 2, name: "Gimli", image: "warrior-2.jpg", price: 800 },
    { id: 3, name: "Boromir", image: "warrior-2.jpg", price: 700 },
    { id: 4, name: "Gandalf", image: "warrior-2.jpg", price: 1500 },
    { id: 5, name: "Frodo", image: "warrior-2.jpg", price: 400 },
    { id: 6, name: "Sam", image: "warrior-2.jpg", price: 300 },
    { id: 7, name: "Pippin", image: "warrior-2.jpg", price: 350 }
];

const animalsData = [
    { id: 0, name: "Horse", image: "horse.png" },
    { id: 1, name: "Elephant", image: "elephant.png" },
    { id: 2, name: "Horse", image: "horse.png" },
    { id: 3, name: "Elephant", image: "elephant.png" }
];

const machinesData = [
    { id: 0, name: "Catapult", image: "catapult.png" },
    { id: 1, name: "Catapult", image: "catapult.png" },
    { id: 2, name: "Catapult", image: "catapult.png" },
    { id: 3, name: "Catapult", image: "catapult.png" }
];

const basketItems = document.getElementById("basket-items");
const shopSection = document.getElementById("main-container");

let currentGold = parseInt(localStorage.getItem("gold")) || 0;
let currentIron = parseInt(localStorage.getItem("iron")) || 0;
let currentWood = parseInt(localStorage.getItem("wood")) || 0;

//document.getElementById("gold-display").textContent = `Current gold: ${currentGold}g`;
document.getElementById("currentGold").textContent = `${currentGold}g`;
document.getElementById("currentIron").textContent = `${currentIron}`;
document.getElementById("currentWood").textContent = `${currentWood}`;
const purchasedItems = {};

const createArmy = (title, items, className) => {
    return `
        <article class="${className}">
            <h3>${title}</h3>
            <div class="grid-category-columns">
            ${items.map(item => `

              <div class="${className === 'warriors' ? 'warrior-box' : className === 'animals' ? 'animal-box' : 'war-machine-box'}">

                <img class="${className}-img" src="images/${item.image}" alt="${item.name}">

                <button class="buy-btn" data-id="${item.id}" data-price="${item.price}">Buy ${item.name}. Price: ${item.price}g</button>

                <button class="refund-btn" data-id="${item.id}" data-price="${item.price}" disabled>Refund ${item.name}</button>

              </div>  

            `).join('')}
        </article>
    `;
};

shopSection.addEventListener("click", (e) => {
    if (e.target.classList.contains("buy-btn")) {
        const price = parseInt(e.target.getAttribute("data-price"));
        const refundButton = e.target.nextElementSibling;
        const itemId = e.target.getAttribute("data-id");
        const itemName = e.target.textContent.split(" ")[1]; //Dette henter item name

        if (currentGold >= price) {
            currentGold -= price;
            document.getElementById("currentGold").textContent = `Current gold: ${currentGold}`;
            
            purchasedItems[itemId] = (purchasedItems[itemId] || 0) + 1; //!!!!!??????
            
            const li = document.createElement("li");
            li.textContent = itemName; 
            basketItems.appendChild(li); //Appendchild fester det valgte itemet til basketcase

            refundButton.disabled = false;
            
        } else {
            alert(`You do not have enough gold.`);
        }

    }   if (e.target.classList.contains("refund-btn")) {
        const price = parseInt(e.target.getAttribute("data-price"));
        const buyButton = e.target.previousElementSibling;
        const itemId = buyButton.getAttribute("data-id");
        const itemName = buyButton.textContent.split(" ")[1];

        if (purchasedItems[itemId] > 0) {
            currentGold += price;
            document.getElementById("currentGold").textContent = `Current gold: ${currentGold}`;

            purchasedItems[itemId]--;
            
            const liItems = basketItems.querySelectorAll("li");
            for (let li of liItems) {
                if (li.textContent === itemName) {
                    li.remove()
                    break;
                }
            }
            if (purchasedItems[itemId] === 0) {
                e.target.disabled = true;
            }
        } 
    }
    

        });



shopSection.innerHTML = `
    <div class="grid-category-row">
    ${createArmy('Warriors', warriorsData, 'warriors')}
    </div>

    <div class="grid-category-row">
    ${createArmy('Animals', animalsData, 'animals')}
    </div>

    <div class="grid-category-row">
    ${createArmy('War Machines', machinesData, 'war-machines')}
    </div>
`;

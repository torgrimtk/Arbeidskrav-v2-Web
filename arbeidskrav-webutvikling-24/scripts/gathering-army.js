const warriorsData = [
    { id: 0, name: "Aragorn", image: "warrior-2.jpg", price: 1000 },
    { id: 1, name: "Legolas", image:"warrior-2.jpg", price: 800 },
    { id: 2, name: "Gimli", image:"warrior-2.jpg", price: 800 },
    { id: 3, name: "Boromir", image:"warrior-2.jpg", price: 700 },
    { id: 4, name: "Gandalf", image:"warrior-2.jpg", price: 1500 },
    { id: 5, name: "Frodo", image:"warrior-2.jpg", price: 400 },
    { id: 6, name: "Sam", image:"warrior-2.jpg", price: 300 },
    { id: 7, name: "Pippin", image:"warrior-2.jpg", price: 350 }
];

const animalsData = [
    {
        id: 0,
        name: "Horse",
        image: "horse.png"
    },
    {
        id: 1,
        name: "Elephant",
        image: "elephant.png"
    }
];
const machinesData = [
    {
        id: 0,
        name: "Catapult",
        image: "catapult.png"
    }
]

const shopSection = document.getElementById("army-shop");

const createArmy = (title, items, className) => {
    return `
        <article class="${className}">
            <h3>${title}</h3>
            ${items.map(item => `
              <div>
                <img class="${className}-img" src="images/${item.image}" alt="${item.name}">
                <button class="buy-btn" data-id="${item.id}" data-price="${item.price}">Buy ${item.name}? Price: ${item.price}g</button> 
                <button class="refund-btn" data-id="${item.id}" data-price="${item.price}" disabled>Refund ${item.name}</button>
              </div>  
            `).join('')}
        </article>
    `;
}; 


let currentGold = 10000; 
document.getElementById("gold-display").textContent = `Current gold: ${currentGold}g`;

shopSection.addEventListener("click", (e) => {
    if (e.target.classList.contains("buy-btn")) {
        const price = parseInt(e.target.getAttribute("data-price"));
        const refundButton = e.target.nextElementSibling; 

        if (currentGold >= price) {
            currentGold -= price;
            document.getElementById("gold-display").textContent = `Current gold: ${currentGold}`;
            alert(`You bought ${e.target.textContent.split(' ')[1]} for ${price}g`);

            refundButton.disabled = false; 
        } else {
            alert(`You do not have enough gold.`);
        }
    }

    if (e.target.classList.contains("refund-btn")) {
        const price = parseInt(e.target.getAttribute("data-price"));
        const buyButton = e.target.previousElementSibling; 

        currentGold += price; 
        document.getElementById("gold-display").textContent = `Current gold: ${currentGold}`;
        alert(`You refunded ${buyButton.textContent.split(' ')[1]} and received ${price}g back`);

        e.target.disabled = true; 
        
    }
});

shopSection.innerHTML = `
    <div class="grid-category-row">
    ${createArmy('Warriors', warriorsData, 'warriors')}
    </div>

    <div class="grid-category-row">
    ${createArmy('Animals', animalsData, 'animals')}
    <div/>

    <div class="grid-category-row">
    ${createArmy('War Machines', machinesData, 'war-machines')}
    </div>
`;

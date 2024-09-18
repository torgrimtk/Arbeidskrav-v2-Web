const warriorsData = [
    {
        id: 0,
        name: "Snake",
        image: "warrior-1.jpg"
    },
    {
        id: 1,
        name: "Giant",
        image:"warrior-2.jpg"
    }
];
const animalsData = [
    {
        id: 0,
        name: "Horse",
        image: "horse.png"
    }
];
const machinesData = [
    {
        id: 0,
        name: "catapult",
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
                <button>Buy ${item.name}</button>
              </div>  
            `).join('')}
        </article>
    `;
}; 

shopSection.innerHTML = `
    ${createArmy('Warriors', warriorsData, 'warriors')}
    ${createArmy('Animals', animalsData, 'animals')}
    ${createArmy('War Machines', machinesData, 'war-machines')}
`;

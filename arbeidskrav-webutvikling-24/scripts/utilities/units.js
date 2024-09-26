const ArmyModule = (() =>{
    const warriorsData = [
        { id: 0, name: "Berserker", image: "warrior-2.jpg", price: 1000 },
        { id: 1, name: "Shieldmaiden", image: "warrior-1.jpg", price: 800 },
        { id: 2, name: "Colossus", image: "warrior-3.jpg", price: 800 },
        { id: 3, name: "Warrior", image: "warrior-4.jpg", price: 700 },
        { id: 4, name: "Rogue", image: "warrior-5.jpg", price: 1500 },
        { id: 5, name: "Druid", image: "warrior-6.jpg", price: 400 },
        { id: 6, name: "Warlock", image: "warrior-1.jpg", price: 300 },
        { id: 7, name: "Healer", image: "warrior-2.jpg", price: 350 }
    ];
    
    const animalsData = [
        { id: 0, name: "Horse", image: "horse.png", price:350},
        { id: 1, name: "Elephant", image: "elephant.png", price:400},
        { id: 2, name: "Horse", image: "horse.png", price:350},
        { id: 3, name: "Elephant", image: "elephant.png", price:400}
    ];
    
    const machinesData = [
        { id: 0, name: "Catapult", image: "catapult.png", price: 1200, woodCost: 400, ironCost: 100 },
        { id: 1, name: "Cannon", image: "cannon.png", price: 1200, woodCost: 100, ironCost: 300 },
        { id: 2, name: "Catapult", image: "catapult.png", price: 700, woodCost: 400, ironCost: 100 },
        { id: 3, name: "Cannon", image: "cannon.png", price: 800, woodCost: 100, ironCost: 300 }
    ];

    const getAll = () => {
        return {
            warriors: warriorsData,
            animals: animalsData,
            machines: machinesData
        }
    }
    return{
        getAll
    }
})();

export default ArmyModule;
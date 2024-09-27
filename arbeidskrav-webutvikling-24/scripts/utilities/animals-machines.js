const AnimalsMachinesModule = (() => {
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

    const getAnimalsMachines = () => {
        return {
            animals: animalsData,
            machines: machinesData
        }
    }
    return{
        getAnimalsMachines
    }

})();

export default AnimalsMachinesModule;
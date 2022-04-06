// The rabbit appears in a random hole within
// the array, each time you check the array at
// any index the rabbit moves to a random
// adjascent hole.

// Rules: You must call Rabbit.leap() AFTER every
// time you make a guess/iteration!

// Rabbit.array returns the current array
// Rabbit.leap() makes the bunny move
// Rabbit.example() will print an example 
// of how the rabbit moves
// Array.length is 50

// Example recursion code
// const rabbit = new Rabbit();
// const myFunction = (index, arr) => {
//     if (arr[index] === "🐇") return console.log('Found the rabbit!');
//     rabbit.leap();
//     do something

//     return myFunction(index, arr);
// }
// myFunction(rabbit.array, 0);

class Rabbit {
    array;
    #index;
    #iters;
    constructor() {
        this.#init(50);
    };

    #init(items) {
        // Create empty array
        this.array = new Array(items).fill(0);
        // First random index for the rabbit
        this.#index = Math.floor(Math.random() * this.array.length);
        // This is used just to be safe incase someone creates an infinite loop...
        this.#iters = 0;
        // Set our cute rabbit
        this.array[this.#index] = "🐇";
    };

    #checkIterations() {
        if (this.#iters === 5000) throw new Error(`
    Fail-safe: Reached ${this.#iters} iterations. Did you create an infinite loop?`);
        this.#iters += 1;
    };

    #setNextIndex() {
        const rnd = Math.random();

        // If the rabbit is at the beginning it must leap forward
        if (this.#index === 0) return this.#index += 1;
        // If the rabbit is at the end it must leap backwards
        if (this.#index === this.array.length - 1) return this.#index -= 1;
        if (rnd <= 0.5) return this.#index -= 1;
        if (rnd > 0.5) return this.#index += 1;
    };

    leap() {
        // Check for infinite loop
        this.#checkIterations();
        // Remove rabbit from old index
        this.array[this.#index] = 0;
        this.#setNextIndex();
        // Set rabbit to new index
        this.array[this.#index] = "🐇";
    };

    example() {
        // Change to a smaller array
        this.#init(10);
        for (let i = 0; i < 10; i += 1) {
            this.leap();
            console.log(this.array);
        }
        // Change back to a bigger array
        this.#init(50);
    };
};

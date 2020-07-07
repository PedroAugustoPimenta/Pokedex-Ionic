export interface Pokemon {
    avg_spawns: number,
    candy: string,
    egg: string,
    height: string,
    id: number,
    img: string,
    multipliers: [{}],
    name: string,
    next_evolution: [{
        num: string,
        name: string
    }],
    num: string,
    prev_evolution: {
        num: string,
        name: string
    }
    spawn_chance: number,
    spawn_time: string,
    type: [
        string
    ],
    weaknesses: [{}],
    weight: string
}
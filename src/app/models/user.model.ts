import { WorkOut } from "./workout.model";

export class User {
    id: number;
    name: string;
    workouts: WorkOut[];

    constructor(id: number, name: string, workouts: WorkOut[]) {
        this.id = id;
        this.name = name;
        this.workouts = workouts;
    }

}


import { api } from "~/utils/api";
import { WorkoutCard } from "./WorkoutCard";

export function WorkoutList() {
    const { data } = api.workouts.getAll.useQuery();

    return (
        <div>
            {data?.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
            ))}
        </div>
    );
}

export default WorkoutList;
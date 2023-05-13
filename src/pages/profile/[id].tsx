import { useRouter } from "next/router";
import { useState } from "react";
import WorkoutForm from "~/components/WorkoutForm";
import { api } from "~/utils/api";

function ProfileWorkoutIdPage() {
    const router = useRouter();
    const id = router.query.id;
    if (!id || typeof id != "string") { router.back(); return; }
    const { data } = api.workouts.getWholeWorkout.useQuery({ id });
    console.log(data)

    function exitWorkoutView() {
        router.back();
    }

    if (!data) return <div>Error</div>;

    return (
        <WorkoutForm workout={data} exitWorkoutView={exitWorkoutView} />
    );
}

export default ProfileWorkoutIdPage;
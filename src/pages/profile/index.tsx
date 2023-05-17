import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import Button from "~/components/Button";
import Navbar, { ActivePage } from "~/components/Navbar";
import { PageTitle } from "~/components/Title";
import WorkoutChangeCard from "~/components/workout/WorkoutChangeCard";
import WorkoutForm from "~/components/workout/WorkoutForm";
import { api } from "~/utils/api";

function ProfilePage() {
    const { user } = useUser();
    const [newExerciseView, setNewExerciseView] = useState(false);
    const { data } = api.workouts.getAll.useQuery();

    function handleNewExerciseCLick() {
        setNewExerciseView(true);
    }

    function handleExitNewWorkoutView() {
        setNewExerciseView(false);
    }

    return (
        <>
            <Navbar activePage={ActivePage.Profile} />
            <PageTitle>This is the Profile page.</PageTitle>
            <div className='flex'>
                <p>Welcome {user?.username}</p>
            </div>
            <div>
                {newExerciseView ?
                    <WorkoutForm exitWorkoutView={handleExitNewWorkoutView} />
                    :
                    <div>
                        <div className='flex'>
                            <Button className='justify-center mx-auto' onCLick={handleNewExerciseCLick}>New Workout</Button>
                        </div>
                        {data?.map(workout => (
                            <WorkoutChangeCard key={workout.id} id={workout.id} />
                        ))}
                    </div>
                }

            </div>
        </>
    );
}

export default ProfilePage;
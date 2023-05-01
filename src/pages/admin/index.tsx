import HLink from "~/components/Link";
import Navbar, { ActivePage } from "~/components/Navbar";
import { PageTitle } from "~/components/Title";

function AdminPage() {
    return (
        <div>
            <Navbar activePage={ActivePage.Admin} />
            <PageTitle>Admin</PageTitle>
            <div className="flex">
                <div className="flex mx-2">
                    <HLink to="admin/exercises">Exercises</HLink>
                </div>
                <div className="flex mx-2">
                    <HLink to="admin/muscles">Muscles</HLink>
                </div>
            </div>
            {/* <Routes>
                <Route index path="/exercises" element={<ExerciseList />} />
                <Route path="/exercises/:id" element={<ExerciseSummary />} />
                <Route path="/exercises/new" element={<NewExercise />} />
                <Route path="/muscles" element={<MuscleList />} />
                <Route path="/muscles/new" element={<NewMuscle />} />
            </Routes> */}
        </div>
    );
}

export default AdminPage;
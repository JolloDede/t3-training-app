import { useRouter } from "next/router";
import { useState } from "react";
import Button, { RedButton } from "~/components/Button";
import { api } from "~/utils/api";

function NewMusclePage() {
    const [name, setName] = useState("New Muscle");
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();
    const ctx = api.useContext();

    const { mutate } = api.muscles.create.useMutation({
        onSuccess: () => {
            void ctx.muscles.getAll.invalidate();
            router.back();
        },
        onError: (e) => {
            const errorMessage = e.data?.zodError?.fieldErrors.content;
            if (errorMessage && errorMessage[0]) {
                setErrorMsg(errorMessage[0]);
            } else {
                setErrorMsg("Failed to post! Please try again later.");
            }
        },
    })

    async function handleSaveClick() {
        mutate({ name });
    }

    return (
        <div className="border rounded-lg p-4">
            <p className="flex text-red-600">{errorMsg}</p>
            <form onSubmit={e => e.preventDefault()}>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            if (name !== "") {
                                mutate({ name });
                            }
                        }
                    }}
                    className="text-3xl font-bold hover:border rounded-lg"
                />
                <div className="mt-4">
                    <Button onCLick={handleSaveClick}>Save</Button>
                    <RedButton onCLick={() => router.back()}>Cancle</RedButton>
                </div>
            </form>
        </div>
    );
}

export default NewMusclePage;
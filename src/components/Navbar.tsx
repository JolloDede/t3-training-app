import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { string } from "zod";

export enum ActivePage {
    Home,
    Profile,
    Admin,
    Social
}

interface Props {
    activePage: ActivePage
}

function Navbar({ activePage }: Props) {
    const tabsClassname = "bg-white text-blue-500 hover:text-blue-800 px-4 py-2 mr-2";
    const activeTabClassname = " border-l border-t border-r rounded-t -mb-px";
    const homeClassname = activePage == ActivePage.Home ? tabsClassname + activeTabClassname : tabsClassname;
    const profileClassname = activePage == ActivePage.Profile ? tabsClassname + activeTabClassname : tabsClassname;
    const AdminClassname = activePage == ActivePage.Admin ? tabsClassname + activeTabClassname : tabsClassname;
    const socialClassname = activePage == ActivePage.Social ? tabsClassname + activeTabClassname : tabsClassname;
    const [role, setRole] = useState("");
    const { isSignedIn, user } = useUser();

    useEffect(() => {
        if (isSignedIn) {
            if (user.publicMetadata.role && user.publicMetadata.role == "admin") {
                setRole(user.publicMetadata.role);
            }else {
                setRole("user");
            }
        }
    }, [])

    return (
        <nav className='flex py-6'>
            <div className='flex w-full border-b'>
                <Link href={"/"} className={homeClassname}>
                    Home
                </Link>
                <Link href={"/profile"} className={profileClassname}>
                    Profile
                </Link>
                <Link href={"/social"} className={socialClassname}>
                    Social
                </Link>
                {role == "admin" ? <Link href={"/admin"} className={AdminClassname} >Admin</Link> : ""}
            </div>
            <div className='flex self-end'>
                {/* <SyncButton>Sync</SyncButton> */}
                {/* <button onClick={handleLogoutClick} className='bg-white text-blue-500 hover:text-blue-800 px-4 py-2 mx-2 border rounded'>Logout</button> */}
                <div className='bg-white text-blue-500 hover:text-blue-800 px-4 py-2 mx-2 border rounded'>
                    <UserButton />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
import { SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

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
    let tabsClassname = "bg-white text-blue-500 hover:text-blue-800 px-4 py-2 mr-2";
    let activeTabClassname = " border-l border-t border-r rounded-t -mb-px";
    let homeClassname = activePage == ActivePage.Home ? tabsClassname + activeTabClassname : tabsClassname;
    let profileClassname = activePage == ActivePage.Profile ? tabsClassname + activeTabClassname : tabsClassname;
    let AdminClassname = activePage == ActivePage.Admin ? tabsClassname + activeTabClassname : tabsClassname;
    let socialClassname = activePage == ActivePage.Social ? tabsClassname + activeTabClassname : tabsClassname;

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
                {/* {auth?.user.group == Group.Admin ? <Link href={"/admin"} className={AdminClassname} >Admin</Link> : ""} */}
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
import {Link} from "react-router-dom";
import {auth} from "../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth";

export const Navbar = () => {

    const [user] = useAuthState(auth);
    const signUserOut = async () => {
        await signOut(auth);
    }

    return (
        <div className="navbar">
            <div className="links">
                <Link to={"/"}>Home</Link>
                {!user ? (<Link to={"/login"}>Login</Link>) :
                    (<Link to={"/createpost"}>Create Post</Link>)}
            </div>
            <div className="user">

                <span>{user?.displayName}</span>
                {user?.photoURL && (
                    <>
                        <img src={user?.photoURL} alt="profile" width="50" height="50"/>
                        <button onClick={signUserOut}>Sign Out</button>
                    </>
                )}
            </div>
        </div>
    );
};
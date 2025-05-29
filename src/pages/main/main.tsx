import {getDocs, collection} from "firebase/firestore";
import {auth, db} from "../../config/firebase";
import {useEffect, useState} from "react";
import {Post} from "./post";
import {useAuthState} from "react-firebase-hooks/auth";

export interface Post {
    title: string;
    description: string;
    username: string;
    userId: string;
    id: string;
}

export const Main = () => {

    const [postsList, setPostsList] = useState<Post[] | null>(null);
    const postsRef = collection(db, "posts");
    const [user] = useAuthState(auth);

    const getPosts = async () => {
        try {
            if (!user) return;
            const data = await getDocs(postsRef);
            setPostsList(
                data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            {postsList?.map((post) => (
                <Post post={post} key={post.id}/>
            ))}
        </div>
    );
};
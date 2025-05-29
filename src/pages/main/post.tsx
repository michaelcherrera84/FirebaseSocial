import {Post as IPost} from "./main";
import {addDoc, getDocs, deleteDoc, collection, query, where, doc} from "firebase/firestore";
import {auth, db} from "../../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";

interface Props {
    post: IPost;
}

interface Like {
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {

    const {post} = props;
    const [user] = useAuthState(auth);
    const [likes, setLikes] = useState<Like[] | null>(null);
    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id})));
    };

    const addLike = async () => {

        try {
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id,
            });

            if (user) {
                setLikes((prev) => prev ? [...prev, {userId: user?.uid, likeId: newDoc.id}] : [{
                    userId: user?.uid,
                    likeId: newDoc.id
                }]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const removeLike = async () => {
        try {
            const likeToRemoveQuery = query(
                likesRef,
                where("postId", "==", post.id),
                where("userId", "==", user?.uid),
            );
            const likeToRemoveData = await getDocs(likeToRemoveQuery);
            const likeId = likeToRemoveData.docs[0].id;
            const likeToRemove = doc(db, "likes", likeId);
            await deleteDoc(likeToRemove);

            if (user) {
                setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const hasLiked = likes?.find((like) => like.userId === user?.uid);

    useEffect(() => {
        getLikes();
    }, [])

    return (
        <div className="post">
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="description">
                <p>{post.description}</p>
            </div>
            <div className="username">
                <p>@{post.username}</p>
                <button className="like_button" onClick={hasLiked ? removeLike : addLike}>
                    &#128077; &nbsp;
                    {(likes != null && likes.length > 0) ? (<span>({likes.length})</span>) : ""}
                </button>
            </div>
        </div>
    );
}
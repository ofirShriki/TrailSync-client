import type React from "react";
import PostList from "../../components/PostList/PostList";
import { posts } from "../../constants/staticInfo";

const Home: React.FC = () => (
	<PostList posts={[...posts, ...posts, ...posts]} />
);

export default Home;

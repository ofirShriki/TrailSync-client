import type React from "react";
import PostList from "../PostList/PostList";
import { posts } from "../../constants/staticInfo";

const Home: React.FC = () => {
	return (
		<div>
			<PostList posts={[...posts, ...posts, ...posts]} />
		</div>
	);
};

export default Home;

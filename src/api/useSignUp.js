import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../AccountContext/accountContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ name, email, password, phone, image }) => {
		const success = handleInputErrors({ name, email, password, phone, image });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("http://localhost:4000/users/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, password, phone, image }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
            console.log(data);
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ name, email, password, phone, image }) {
	if (!name || !email || !password || !phone || !image) {
		toast.error("Please fill in all fields");
		return false;
	}


	// if (password.length < 6) {
	// 	toast.error("Password must be at least 6 characters");
	// 	return false;
	// }

	return true;
}
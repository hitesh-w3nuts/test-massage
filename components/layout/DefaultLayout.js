import Header from "./Header";
import Footer from "./Footer";
import { Provider } from "react-redux";
import store from "../../store/store";
import { useEffect } from "react";
export default function DefaultLayout({ children }) {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [])
	return (
		<>
			<Provider store={store}>
				<Header />
				<main>{children}</main>
				<Footer />
			</Provider>
		</>
	);
}

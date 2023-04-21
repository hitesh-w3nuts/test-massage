import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

const Custom404 = () => {
	useEffect(() => {
		setTimeout(()=> {
			document.body.classList.add("loaded");	
		}, 1500)
	})
	return(
	<>
		<Head>
			<title>404 Page Not Found</title>
		</Head>

		<section class="error-404 not-found">
			<div class="container">
					<div class="page-title">
						<h1><span>Oops!</span> That page can’t be found.</h1>
					</div>
					<div class="page-content">
						<p>It looks like nothing was found at this location.</p>
						<div class="btnbox"><Link href="/">Back to home</Link></div>
					</div>
			</div>
		</section>

	</>
	)
};

export default Custom404;

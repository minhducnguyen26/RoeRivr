import "./PageCount.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePageNumberContext } from "../../providers/Provider";

function PageCount() {
	let [pageNumber, setPageNumber] = usePageNumberContext();

	if (typeof pageNumber !== "number") {
		pageNumber = parseInt(pageNumber);
	}

	const [pageSearch, setPageSearch] = useState(0);
	const handleChange = (e) => {
		setPageSearch(e.target.value);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			setPageNumber(e.target.value);
		}
	};

	return (
		<div className="PageCount">
			<div className="PageSearch">
				<input type="text" placeholder="Search" onChange={handleChange} onKeyPress={handleKeyPress} />
				<Link to={`/${pageSearch}`} className="SearchButton" onClick={() => setPageNumber(pageSearch)}>
					<i className="las la-search"></i>
				</Link>
			</div>

			{pageNumber === 1 && (
				<>
					<Link to={`/${pageNumber}`} className="CurrentPage" onClick={() => setPageNumber(pageNumber)}>
						{pageNumber}
					</Link>
					<Link to={`/${pageNumber + 1}`} className="SinglePageNumberWrapper" onClick={() => setPageNumber(pageNumber + 1)}>
						{pageNumber + 1}
					</Link>
					<Link to={`/${pageNumber + 2}`} className="SinglePageNumberWrapper" onClick={() => setPageNumber(pageNumber + 2)}>
						{pageNumber + 2}
					</Link>
					<Link to={`/${pageNumber + 3}`} className="SinglePageNumberWrapper" onClick={() => setPageNumber(pageNumber + 3)}>
						{pageNumber + 3}
					</Link>
				</>
			)}

			{pageNumber === 2 && (
				<>
					<Link to={`/${pageNumber - 1}`} className="SinglePageNumberWrapper" onClick={() => setPageNumber(pageNumber - 1)}>
						{pageNumber - 1}
					</Link>
					<Link to={`/${pageNumber}`} className="CurrentPage" onClick={() => setPageNumber(pageNumber)}>
						{pageNumber}
					</Link>
					<Link to={`/${pageNumber + 1}`} className="SinglePageNumberWrapper" onClick={() => setPageNumber(pageNumber + 1)}>
						{pageNumber + 1}
					</Link>
					<Link to={`/${pageNumber + 2}`} className="SinglePageNumberWrapper" onClick={() => setPageNumber(pageNumber + 2)}>
						{pageNumber + 2}
					</Link>
				</>
			)}

			{pageNumber > 2 && pageNumber < 400 && (
				<>
					<Link to={`/`} className="SinglePageNumberWrapper" onClick={() => setPageNumber(1)}>
						1
					</Link>
					<div className="DotsWrapper">...</div>
					<Link to={`/${pageNumber - 1}`} className="SinglePageNumberWrapper" onClick={() => setPageNumber(pageNumber - 1)}>
						{pageNumber - 1}
					</Link>
					<Link to={`/${pageNumber}`} className="CurrentPage" onClick={() => setPageNumber(pageNumber)}>
						{pageNumber}
					</Link>
					<Link to={`/${pageNumber + 1}`} className="SinglePageNumberWrapper" onClick={() => setPageNumber(pageNumber + 1)}>
						{pageNumber + 1}
					</Link>
				</>
			)}

			{pageNumber === 400 && (
				<>
					<Link to={`/`} className="SinglePageNumberWrapper" onClick={() => setPageNumber(1)}>
						1
					</Link>
					<div className="DotsWrapper">...</div>
					<Link to={`/${pageNumber - 1}`} className="SinglePageNumberWrapper" onClick={() => setPageNumber(pageNumber - 1)}>
						{pageNumber - 1}
					</Link>
					<Link to={`/${pageNumber}`} className="CurrentPage" onClick={() => setPageNumber(pageNumber)}>
						{pageNumber}
					</Link>
					<Link to={`/${pageNumber + 1}`} className="SinglePageNumberWrapper" onClick={() => setPageNumber(pageNumber + 1)}>
						{pageNumber + 1}
					</Link>
				</>
			)}

			{pageNumber === 401 && (
				<>
					<Link to={`/`} className="SinglePageNumberWrapper" onClick={() => setPageNumber(1)}>
						1
					</Link>
					<div className="DotsWrapper">...</div>
					<Link to={`/${pageNumber - 2}`} className="SinglePageNumberWrapper" onClick={() => setPageNumber(pageNumber - 2)}>
						{pageNumber - 2}
					</Link>
					<Link to={`/${pageNumber - 1}`} className="SinglePageNumberWrapper" onClick={() => setPageNumber(pageNumber - 1)}>
						{pageNumber - 1}
					</Link>
					<Link to={`/${pageNumber}`} className="CurrentPage" onClick={() => setPageNumber(pageNumber)}>
						{pageNumber}
					</Link>
				</>
			)}

			{pageNumber < 399 && <div className="DotsWrapper">...</div>}

			{pageNumber < 400 && (
				<Link to={`/401`} className="SinglePageNumberWrapper" onClick={() => setPageNumber(401)}>
					401
				</Link>
			)}
		</div>
	);
}

export default PageCount;

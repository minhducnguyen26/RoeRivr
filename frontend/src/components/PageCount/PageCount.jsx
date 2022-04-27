import "./PageCount.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePageNumberContext } from "../../providers/Provider";

function PageCount() {
	const context = usePageNumberContext();
	let pageNumber = context[0];
	if (typeof pageNumber !== "number") {
		pageNumber = parseInt(pageNumber);
	}

	const setPageNumber = context[1];

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
				<div className="SearchButton" onClick={() => setPageNumber(pageSearch)}>
					<i className="las la-search"></i>
				</div>
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

			{pageNumber > 2 && pageNumber < 401 && (
				<>
					<Link to={`/`} className="SinglePageNumberWrapper" onClick={() => setPageNumber(1)}>
						1
					</Link>
					<div className="DotsWrapper">...</div>
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

			{pageNumber < 401 && (
				<>
					<div className="DotsWrapper">...</div>
					<Link to={`/401`} className="SinglePageNumberWrapper" onClick={() => setPageNumber(401)}>
						401
					</Link>
				</>
			)}
		</div>
	);
}

export default PageCount;

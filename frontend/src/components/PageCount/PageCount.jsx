import "./PageCount.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentPageNumberContext, useTotalPageNumbersContext } from "../../providers/Provider";

function PageCount() {
	let [currentPageNumber, setCurrentPageNumber] = useCurrentPageNumberContext();

	if (typeof currentPageNumber !== "number") {
		currentPageNumber = parseInt(currentPageNumber);
	}

	const [pageSearch, setPageSearch] = useState(0);
	const handleChange = (e) => {
		setPageSearch(e.target.value);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			setCurrentPageNumber(e.target.value);
		}
	};

	const totalPageNumbers = useTotalPageNumbersContext();

	return (
		<div className="PageCount">
			<div className="PageSearch">
				<input type="text" placeholder="Search" onChange={handleChange} onKeyPress={handleKeyPress} />
				<Link to={`/${pageSearch}`} className="SearchButton" onClick={() => setCurrentPageNumber(pageSearch)}>
					<i className="las la-search"></i>
				</Link>
			</div>

			{currentPageNumber === 1 && (
				<>
					<Link to={`/${currentPageNumber}`} className="CurrentPage" onClick={() => setCurrentPageNumber(currentPageNumber)}>
						{currentPageNumber}
					</Link>
					<Link to={`/${currentPageNumber + 1}`} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 1)}>
						{currentPageNumber + 1}
					</Link>
					<Link to={`/${currentPageNumber + 2}`} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 2)}>
						{currentPageNumber + 2}
					</Link>
					<Link to={`/${currentPageNumber + 3}`} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 3)}>
						{currentPageNumber + 3}
					</Link>
				</>
			)}

			{currentPageNumber === 2 && (
				<>
					<Link to={`/${currentPageNumber - 1}`} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber - 1)}>
						{currentPageNumber - 1}
					</Link>
					<Link to={`/${currentPageNumber}`} className="CurrentPage" onClick={() => setCurrentPageNumber(currentPageNumber)}>
						{currentPageNumber}
					</Link>
					<Link to={`/${currentPageNumber + 1}`} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 1)}>
						{currentPageNumber + 1}
					</Link>
					<Link to={`/${currentPageNumber + 2}`} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 2)}>
						{currentPageNumber + 2}
					</Link>
				</>
			)}

			{currentPageNumber > 2 && currentPageNumber < 400 && (
				<>
					<Link to={`/`} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(1)}>
						1
					</Link>
					<div className="DotsWrapper">...</div>
					<Link to={`/${currentPageNumber - 1}`} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber - 1)}>
						{currentPageNumber - 1}
					</Link>
					<Link to={`/${currentPageNumber}`} className="CurrentPage" onClick={() => setCurrentPageNumber(currentPageNumber)}>
						{currentPageNumber}
					</Link>
					<Link to={`/${currentPageNumber + 1}`} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 1)}>
						{currentPageNumber + 1}
					</Link>
				</>
			)}

			{currentPageNumber === 400 && (
				<>
					<Link to={`/`} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(1)}>
						1
					</Link>
					<div className="DotsWrapper">...</div>
					<Link to={`/${currentPageNumber - 1}`} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber - 1)}>
						{currentPageNumber - 1}
					</Link>
					<Link to={`/${currentPageNumber}`} className="CurrentPage" onClick={() => setCurrentPageNumber(currentPageNumber)}>
						{currentPageNumber}
					</Link>
					<Link to={`/${currentPageNumber + 1}`} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 1)}>
						{currentPageNumber + 1}
					</Link>
				</>
			)}

			{currentPageNumber === 401 && (
				<>
					<Link to={`/`} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(1)}>
						1
					</Link>
					<div className="DotsWrapper">...</div>
					<Link to={`/${currentPageNumber - 2}`} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber - 2)}>
						{currentPageNumber - 2}
					</Link>
					<Link to={`/${currentPageNumber - 1}`} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber - 1)}>
						{currentPageNumber - 1}
					</Link>
					<Link to={`/${currentPageNumber}`} className="CurrentPage" onClick={() => setCurrentPageNumber(currentPageNumber)}>
						{currentPageNumber}
					</Link>
				</>
			)}

			{currentPageNumber < 399 && <div className="DotsWrapper">...</div>}

			{currentPageNumber < 400 && (
				<Link to={`/401`} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(401)}>
					401
				</Link>
			)}
		</div>
	);
}

export default PageCount;

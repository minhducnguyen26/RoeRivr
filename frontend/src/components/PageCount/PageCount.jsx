import "./PageCount.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentPageNumberContext, useTableNameContext, useTotalPageNumbersContext, useSelectedCategoryContext } from "../../providers/Provider";

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

	const tableName = useTableNameContext()[0];
	const selectedCategory = useSelectedCategoryContext();

	const totalPageNumbersContext = useTotalPageNumbersContext();
	const totalPageNumbers = totalPageNumbersContext[0];
	const lastPage = totalPageNumbersContext[0];

	const handleLinkPath = (pageNumber) => {
		const path = tableName === "products" ? "" : `/categories/${selectedCategory}`;
		return `${path}/${pageNumber}`;
	};

	if (totalPageNumbers === 1) {
		return null;
	}

	if (totalPageNumbers === 3) {
		return (
			<div className="PageCount">
				{currentPageNumber === 1 && (
					<>
						<Link to={handleLinkPath(currentPageNumber)} className="CurrentPage" onClick={() => setCurrentPageNumber(currentPageNumber)}>
							{currentPageNumber}
						</Link>
						<Link to={handleLinkPath(currentPageNumber + 1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 1)}>
							{currentPageNumber + 1}
						</Link>
						<Link to={handleLinkPath(currentPageNumber + 2)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 2)}>
							{currentPageNumber + 2}
						</Link>
					</>
				)}

				{currentPageNumber === 2 && (
					<>
						<Link to={handleLinkPath(currentPageNumber - 1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber - 1)}>
							{currentPageNumber - 1}
						</Link>
						<Link to={handleLinkPath(currentPageNumber)} className="CurrentPage" onClick={() => setCurrentPageNumber(currentPageNumber)}>
							{currentPageNumber}
						</Link>
						<Link to={handleLinkPath(currentPageNumber + 1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 1)}>
							{currentPageNumber + 1}
						</Link>
					</>
				)}

				{currentPageNumber === 3 && (
					<>
						<Link to={handleLinkPath(currentPageNumber - 2)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber - 2)}>
							{currentPageNumber - 2}
						</Link>
						<Link to={handleLinkPath(currentPageNumber - 1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber - 1)}>
							{currentPageNumber - 1}
						</Link>
						<Link to={handleLinkPath(currentPageNumber)} className="CurrentPage" onClick={() => setCurrentPageNumber(currentPageNumber)}>
							{currentPageNumber}
						</Link>
					</>
				)}
			</div>
		);
	}

	if (totalPageNumbers === 4) {
		return (
			<div className="PageCount">
				{currentPageNumber === 1 && (
					<>
						<Link to={handleLinkPath(currentPageNumber)} className="CurrentPage" onClick={() => setCurrentPageNumber(currentPageNumber)}>
							{currentPageNumber}
						</Link>
						<Link to={handleLinkPath(currentPageNumber + 1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 1)}>
							{currentPageNumber + 1}
						</Link>
						<Link to={handleLinkPath(currentPageNumber + 2)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 2)}>
							{currentPageNumber + 2}
						</Link>
						<Link to={handleLinkPath(currentPageNumber + 3)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 3)}>
							{currentPageNumber + 3}
						</Link>
					</>
				)}

				{currentPageNumber === 2 && (
					<>
						<Link to={handleLinkPath(currentPageNumber - 1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber - 1)}>
							{currentPageNumber - 1}
						</Link>
						<Link to={handleLinkPath(currentPageNumber)} className="CurrentPage" onClick={() => setCurrentPageNumber(currentPageNumber)}>
							{currentPageNumber}
						</Link>
						<Link to={handleLinkPath(currentPageNumber + 1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 1)}>
							{currentPageNumber + 1}
						</Link>
						<Link to={handleLinkPath(currentPageNumber + 2)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 2)}>
							{currentPageNumber + 2}
						</Link>
					</>
				)}

				{currentPageNumber === 3 && (
					<>
						<Link to={handleLinkPath(currentPageNumber - 2)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber - 2)}>
							{currentPageNumber - 2}
						</Link>
						<Link to={handleLinkPath(currentPageNumber - 1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber - 1)}>
							{currentPageNumber - 1}
						</Link>
						<Link to={handleLinkPath(currentPageNumber)} className="CurrentPage" onClick={() => setCurrentPageNumber(currentPageNumber)}>
							{currentPageNumber}
						</Link>
						<Link to={handleLinkPath(currentPageNumber + 1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 1)}>
							{currentPageNumber + 1}
						</Link>
					</>
				)}

				{currentPageNumber === 4 && (
					<>
						<Link to={handleLinkPath(currentPageNumber - 3)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber - 3)}>
							{currentPageNumber - 3}
						</Link>
						<Link to={handleLinkPath(currentPageNumber - 2)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber - 2)}>
							{currentPageNumber - 2}
						</Link>
						<Link to={handleLinkPath(currentPageNumber - 1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber - 1)}>
							{currentPageNumber - 1}
						</Link>
						<Link to={handleLinkPath(currentPageNumber)} className="CurrentPage" onClick={() => setCurrentPageNumber(currentPageNumber)}>
							{currentPageNumber}
						</Link>
					</>
				)}
			</div>
		);
	}

	return (
		<div className="PageCount">
			<div className="PageSearch">
				<input type="text" placeholder="Search" onChange={handleChange} onKeyPress={handleKeyPress} />
				<Link to={handleLinkPath(pageSearch)} className="SearchButton" onClick={() => setCurrentPageNumber(pageSearch)}>
					<i className="las la-search"></i>
				</Link>
			</div>

			{currentPageNumber === 1 && (
				<>
					<Link to={handleLinkPath(currentPageNumber)} className="CurrentPage" onClick={() => setCurrentPageNumber(currentPageNumber)}>
						{currentPageNumber}
					</Link>
					<Link to={handleLinkPath(currentPageNumber + 1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 1)}>
						{currentPageNumber + 1}
					</Link>
					<Link to={handleLinkPath(currentPageNumber + 2)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 2)}>
						{currentPageNumber + 2}
					</Link>
					<Link to={handleLinkPath(currentPageNumber + 3)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 3)}>
						{currentPageNumber + 3}
					</Link>
				</>
			)}

			{currentPageNumber === 2 && (
				<>
					<Link to={handleLinkPath(currentPageNumber - 1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber - 1)}>
						{currentPageNumber - 1}
					</Link>
					<Link to={handleLinkPath(currentPageNumber)} className="CurrentPage" onClick={() => setCurrentPageNumber(currentPageNumber)}>
						{currentPageNumber}
					</Link>
					<Link to={handleLinkPath(currentPageNumber + 1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 1)}>
						{currentPageNumber + 1}
					</Link>
					<Link to={handleLinkPath(currentPageNumber + 2)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 2)}>
						{currentPageNumber + 2}
					</Link>
				</>
			)}

			{currentPageNumber > 2 && currentPageNumber < lastPage - 1 && (
				<>
					<Link to={handleLinkPath(1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(1)}>
						1
					</Link>
					<div className="DotsWrapper">...</div>
					<Link to={handleLinkPath(currentPageNumber - 1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber - 1)}>
						{currentPageNumber - 1}
					</Link>
					<Link to={handleLinkPath(currentPageNumber)} className="CurrentPage" onClick={() => setCurrentPageNumber(currentPageNumber)}>
						{currentPageNumber}
					</Link>
					<Link to={handleLinkPath(currentPageNumber + 1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 1)}>
						{currentPageNumber + 1}
					</Link>
				</>
			)}

			{currentPageNumber === lastPage - 1 && (
				<>
					<Link to={handleLinkPath(1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(1)}>
						1
					</Link>
					<div className="DotsWrapper">...</div>
					<Link to={handleLinkPath(currentPageNumber - 1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber - 1)}>
						{currentPageNumber - 1}
					</Link>
					<Link to={handleLinkPath(currentPageNumber)} className="CurrentPage" onClick={() => setCurrentPageNumber(currentPageNumber)}>
						{currentPageNumber}
					</Link>
					<Link to={handleLinkPath(currentPageNumber + 1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber + 1)}>
						{currentPageNumber + 1}
					</Link>
				</>
			)}

			{currentPageNumber === lastPage && (
				<>
					<Link to={handleLinkPath(1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(1)}>
						1
					</Link>
					<div className="DotsWrapper">...</div>
					<Link to={handleLinkPath(currentPageNumber - 2)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber - 2)}>
						{currentPageNumber - 2}
					</Link>
					<Link to={handleLinkPath(currentPageNumber - 1)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(currentPageNumber - 1)}>
						{currentPageNumber - 1}
					</Link>
					<Link to={handleLinkPath(currentPageNumber)} className="CurrentPage" onClick={() => setCurrentPageNumber(currentPageNumber)}>
						{currentPageNumber}
					</Link>
				</>
			)}

			{currentPageNumber < lastPage - 2 && <div className="DotsWrapper">...</div>}

			{currentPageNumber < lastPage - 1 && (
				<Link to={handleLinkPath(lastPage)} className="SinglePageNumberWrapper" onClick={() => setCurrentPageNumber(lastPage)}>
					{lastPage}
				</Link>
			)}
		</div>
	);
}

export default PageCount;

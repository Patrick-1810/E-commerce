import React, { useEffect, useState } from "react";

//Style
import "./slideUpModal.css";
import { Link } from "react-router-dom";
import ProductContainer from "../ProductContainer";

const SlideUpModal = ({ page, isOpen, onValueReturn, filteredProducts }) => {
	const [open, setOpen] = useState(isOpen);
	const [sortby, setSortby] = useState("");
	const [firstTimeSort, setFirstTimeSort] = useState(false);
	const [animateModal, setAnimateModal] = useState("container-slide-up");

	useEffect(() => {
		if (!firstTimeSort) {
			setFirstTimeSort(true);
		} else {
			setOpen(true);
		}
	}, [isOpen]);

	// useEffect(() => {
	// 	const handleReturnValue = () => {
	// 		onValueReturn(sortby);
	// 	};
	// 	handleReturnValue();
	// }, [sortby]);

	function handleModalState() {
		setAnimateModal("container-slide-up animate-modal-close");

		setTimeout(() => {
			setOpen(false);
			setAnimateModal("container-slide-up");
		}, 250);
	}

	return (
		<div className="page-wrapper-slide-modal">
			{open && (
				<div
					onClick={() => handleModalState()}
					className="modal-brackground"
				></div>
			)}
			{open && (
				<div className={animateModal}>
					{page == "result" && (
						<div className="container-sortby-modal">
							<p>Sort By</p>
							<hr />
							<form className="form-sortby">
								<label>
									<input
										type="radio"
										name="sortOption"
										value="popularity"
										onChange={(e) => setSortby(e.target.value)}
									/>
									<div className="input-radio">
										<span></span>
									</div>
									Popularity
								</label>
								<label>
									<input
										type="radio"
										name="sortOption"
										value="latest"
										onChange={(e) => setSortby(e.target.value)}
									/>
									<div className="input-radio">
										<span></span>
									</div>
									Latest Products
								</label>
								<label>
									<input
										type="radio"
										name="sortOption"
										value="priceLowToHigh"
										onChange={(e) => setSortby(e.target.value)}
									/>
									<div className="input-radio">
										<span></span>
									</div>
									Price - Low to High
								</label>
								<label>
									<input
										type="radio"
										name="sortOption"
										value="priceHighToLow"
										onChange={(e) => setSortby(e.target.value)}
									/>
									<div className="input-radio">
										<span></span>
									</div>
									Price - High to Low
								</label>
								<label>
									<input
										type="radio"
										name="sortOption"
										value="discount"
										onChange={(e) => setSortby(e.target.value)}
									/>
									<div className="input-radio">
										<span></span>
									</div>
									Discount
								</label>
							</form>
						</div>
					)}
					{page == "Also Like" && (
						<div className="container-also-like-data-modal">
							<h1>You may also like</h1>
							<hr />
							<div className="box-products-data">
								{filteredProducts.map((product) => (
									<Link to={`/product/${product.id}`} key={product.id}>
										<ProductContainer product={product} />
									</Link>
								))}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default SlideUpModal;

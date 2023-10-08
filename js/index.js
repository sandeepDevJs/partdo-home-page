//grab elements
var mobileNavBtn = document.querySelector(".mobile-nav-btn");
var closeMobileNavBtn = document.getElementById("close-nav-btn");
var mobileNav = document.querySelector(".mobile-nav");
var featuredList = document.getElementById("featured-product-list");
var featuredActionBtns = document.querySelectorAll(
	".featured-list-container .featured-actions button"
);

//listeners
mobileNavBtn.addEventListener("click", (e) => {
	toggleNav(true);
});

closeMobileNavBtn.addEventListener("click", (e) => {
	toggleNav(false);
});

featuredActionBtns.forEach((v) => {
	const isPrev = v.id.includes("prev");

	v.addEventListener("click", (e) => {
		featuredList.scrollBy(isPrev ? -250 : 250, 0);
	});
});

//feed data to UIs
feedFeaturedProductList();

//util funtions
function toggleNav(bool = false) {
	if (bool) {
		mobileNav.style.width = "250px";
	} else {
		mobileNav.style.width = "0px";
	}
}

async function getFeaturedProducts(params) {
	const res = await fetch("/featured.json");
	const data = await res.json();

	return data;
}

async function setFeaturedProductList(data = []) {
	let productHtmlString = "";

	for (const product of data) {
		productHtmlString += `<div class="product flex flex-col gap-1">
					<div class="product-header">
						<button>
							<i class="fa-regular fa-heart"></i>
						</button>

						<img src="/imgs/${product.product_image}" />
						<div class="image-dots">
							<span>
								<i class="fa-solid fa-circle text-muted"></i>
							</span>
							<span>
								<i class="fa-solid fa-circle text-muted"></i>
							</span>
							<span>
								<i class="fa-solid fa-circle"></i>
							</span>
						</div>
					</div>
					<div class="product-body flex flex-col gap-1">
						<p class="product-title">
							${product.title}
						</p>
						<div class="flex items-center gap-1">
							<div class="stars">
								<i class="fa-solid fa-star ${
									product.avg_rating >= 1 ? "text-rating-color" : "text-muted"
								}"></i>
								<i class="fa-solid fa-star ${
									product.avg_rating >= 2 ? "text-rating-color" : "text-muted"
								}"></i>
								<i class="fa-solid fa-star ${
									product.avg_rating >= 3 ? "text-rating-color" : "text-muted"
								}"></i>
								<i class="fa-solid fa-star ${
									product.avg_rating >= 4 ? "text-rating-color" : "text-muted"
								}"></i>
								<i class="fa-solid fa-star ${
									product.avg_rating >= 5 ? "text-rating-color" : "text-muted"
								}"></i>
							</div>
							<p class="review bold">${product.reviews.length} review</p>
						</div>
						<div class="price-cart flex">
							<div>
								${
									product.is_discount
										? `<p class="prduct-price-s">
									            <s class="text-muted">$${product.price_original}</s>
								            </p>`
										: ""
								}
								<p class="product-price ${product.is_discount ? `text-red` : ""}">$${
			product.selling_price
		}</p>
							</div>
							<button>
								<i class="fa-solid fa-cart-shopping"></i>
							</button>
						</div>
						<p class="stock text-green items-center gap-1 ${
							product.in_stock ? "text-green" : "text-red"
						}">
							<i class="fa-solid fa-box-open"></i> <span> ${
								product.in_stock ? "" : "Not"
							} In Stock</span>
						</p>
					</div>
				</div>`;
	}

	featuredList.innerHTML = productHtmlString;
}

async function feedFeaturedProductList() {
	const data = await getFeaturedProducts();

	await setFeaturedProductList(data);
}

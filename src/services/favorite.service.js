const key = 'fav-products';

const addProductToFav = (id) => {
    let arr = [...getFavProducts(), id];
    localStorage.setItem(key, JSON.stringify(arr));
}

const removeProductFromFav = (id) => {
    let arr = getFavProducts();
    arr = arr.filter(i => i !== id);
    localStorage.setItem(key, JSON.stringify(arr));
}

const toggleFavProduct = (id) => {
    if (isFavProduct(id)) {
        removeProductFromFav(id);
    } else {
        addProductToFav(id);
    }
}

const getFavProducts = () => {
    if (!localStorage.getItem(key)) {
        return [];
    }
    return JSON.parse(localStorage.getItem(key));
}

const isFavProduct = (id) => {
    return getFavProducts().includes(id);
}

export { addProductToFav, removeProductFromFav, toggleFavProduct, getFavProducts, isFavProduct };

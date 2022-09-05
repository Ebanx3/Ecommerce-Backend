const productsDTO = (product: any) => {
    return {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        urlImage: product.urlImage,
        categoryId: product.categoryId
    }
}

export default productsDTO;
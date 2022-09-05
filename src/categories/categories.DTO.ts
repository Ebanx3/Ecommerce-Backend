
const categoriesDTO = (category: any) => {
    return  {
        id : category._id,
        name: category.name,
    };
};

export default categoriesDTO ;
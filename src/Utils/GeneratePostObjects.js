export const getFoodAndDrinksObject = (product, category) => {
    let retVal = {};
    let foodAndDrinks = {};
    if (product.ID)
        foodAndDrinks["ID"] = product.ID;
    if (product.name)
        foodAndDrinks["name"] = product.name;
    if (product.allergies)
        foodAndDrinks["allergicIngs"] = product.allergies;
    if (product.price)
        foodAndDrinks["price"] = product.price;
    if (product.inStock !== undefined || product.inStock !== null)
        foodAndDrinks["inStock"] = product.inStock;
    if (product.isDeleted !== undefined || product.isDeleted !== null)
        foodAndDrinks["isDeleted"] = product.isDeleted;
    if (product.imageURL)
        foodAndDrinks["imageURL"] = product.imageURL;
    if (product.tags)
        foodAndDrinks["tags"] = product.tags;

    if (category === "foodMenu") {
        let food = {};
        if (product.ID)
            food["ID"] = product.ID;
        if (product.description)
            food["description"] = product.description;
        if (product.poosibleChanges)
            food["poosibleChanges"] = product.poosibleChanges;

        foodAndDrinks["Food"] = food;
    }
    else if (category === "drinksMenu") {
        let drink = {};
        if (product.ID)
            drink["ID"] = product.ID;
        if (product.category)
            drink["category"] = product.category;

        foodAndDrinks["Drink"] = drink;
    }
    else {
        let alcohol = {};
        if (product.ID)
            alcohol["ID"] = product.ID;
        if (product.alcoholPercent)
            alcohol["alcoholPercent"] = product.alcoholPercent;
        if (product.category)
            alcohol["category"] = product.category;

        foodAndDrinks["Alcohol"] = alcohol;
    }

    retVal["Food_And_Drinks"] = foodAndDrinks;

    return retVal;
};

export const getHotelActivitiesObject = (product) => {

    let retVal = {};
    let activity = {};
    let activityHotel = {};

    if (product.placeID)
        activity["placeID"] = product.placeID;
    activityHotel["placeID"] = product.placeID;
    if (product.name)
        activity["name"] = product.name;
    if (product.description)
        activity["description"] = product.description;
    if (product.imageURL)
        activity["imageURL"] = product.imageURL;

    if (product.HallNum)
        activityHotel["HallNum"] = product.HallNum;
    if (product.tags)
        activityHotel["tags"] = product.tags;
    if (product.isDeleted !== undefined || product.isDeleted !== null)
        activityHotel["isDeleted"] = product.isDeleted;

    activity["Activity_hotel"] = activityHotel;
    retVal["Activity"] = activity;

    return retVal;
};

export const getHotelFacilityObject = (product) => {
    let retVal = {};
    let facility = {};

    if (product.facilityID)
        facility["facilityID"] = product.facilityID;
    if (product.name)
        facility["name"] = product.name;
    if (product.description)
        facility["description"] = product.description;
    if (product.contactNumber)
        facility["contactNumber"] = product.contactNumber;
    if (product.imageURL)
        facility["imageURL"] = product.imageURL;
    if (product.type)
        facility["type"] = facility.type;
    if (product.openingHours)
        facility["openingHours"] = product.openingHours;
    if (product.isDeleted !== undefined || product.isDeleted !== null)
        facility["isDeleted"] = product.isDeleted;

    retVal["Facility"] = facility;

    return retVal;
};

export const getTherapyObject = (product) => {
    let retVal = {};
    let therapy = {};

    if (product.therapyID)
        therapy["therapyID"] = product.therapyID;
    if (product.name)
        therapy["name"] = product.name;
    if (product.description)
        therapy["description"] = product.description
    if (product.minDuration)
        therapy["minDuration"] = product.minDuration;
    if (product.basePrice)
        therapy["basePrice"] = product.basePrice;
    if (product.tags)
        therapy["tags"] = product.tags;
    if (product.priceForAdditional15)
        therapy["priceForAdditional15"] = product.priceForAdditional15;
    if (product.imageURL)
        therapy["imageURL"] = product.imageURL;
    if (product.isDeleted !== undefined || product.isDeleted !== null)
        therapy["isDeleted"] = product.isDeleted;

    retVal["Therapy"] = therapy;

    return retVal;
};

export const getAdditionalItemObject = (product) => {
    let retVal = {};
    let additionalItem = {};

    if (product.ID)
        additionalItem["ID"] = product.ID;
    if (product.name)
        additionalItem["name"] = product.name;
    if (product.price)
        additionalItem["price"] = product.price;
    if (product.inStock !== undefined || product.inStock !== null)
        additionalItem["inStock"] = product.inStock;
    if (product.isDeleted !== undefined || product.isDeleted !== null)
        additionalItem["isDeleted"] = product.isDeleted;
    if (product.imageURL)
        additionalItem["imageURL"] = product.imageURL;
    if (product.tags)
        additionalItem["tags"] = product.tags;
    if (product.description)
        additionalItem["description"] = product.description;

    retVal["Additional_Items"] = additionalItem;

    return retVal;
};
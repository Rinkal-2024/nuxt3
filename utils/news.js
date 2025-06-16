import NEWS_SUBCATEGORIES from "~/constants/newsSubcategories";

/**
 * Finds related vendor category based on news subcategory slug.
 * @param {string} newsSubcategorySlug
 * @return {Object} relatedVendorCategory
 */
export const getRelatedVendorCategory = function(newsSubcategorySlug) {
    const subcategoryKey = Object.keys(NEWS_SUBCATEGORIES).find(subcategory => NEWS_SUBCATEGORIES[subcategory].subcategorySlug === newsSubcategorySlug)
    return NEWS_SUBCATEGORIES[subcategoryKey]
}

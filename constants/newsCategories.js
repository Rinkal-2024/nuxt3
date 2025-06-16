import NEWS_SUBCATEGORIES from "./newsSubcategories";

export const NEWS_CATEGORIES = {
    PLANNING_AND_DESIGN: {
        name: "Planning & Design",
        title: "Wedding Planning & Design Ideas",
        categorySlug: "planning-design",
        introduction: 'Inside Weddings shares the latest wedding trends, wedding etiquette tips, elegant ceremony and reception decorations, wedding playlists, gift ideas, and more!',
        description: '',
        subCategories: [
            NEWS_SUBCATEGORIES.CAKES_DESSERTS,
            NEWS_SUBCATEGORIES.CATERING,
            NEWS_SUBCATEGORIES.CEREMONY_TRADITIONS,
            NEWS_SUBCATEGORIES.ENGAGEMENTS_PROPOSALS,
            NEWS_SUBCATEGORIES.ENTERTAINMENT,
            NEWS_SUBCATEGORIES.ETIQUETTE_2,
            NEWS_SUBCATEGORIES.FAVORS_GIFTS,
            NEWS_SUBCATEGORIES.FLORAL_DESIGN,
            NEWS_SUBCATEGORIES.INDUSTRY_EVENTS,
            NEWS_SUBCATEGORIES.INVITATIONS_MORE,
            NEWS_SUBCATEGORIES.LEGAL,
            NEWS_SUBCATEGORIES.LOCATIONS_VENUES,
            NEWS_SUBCATEGORIES.PHOTOGRAPHY_VIDEOGRAPHY,
            NEWS_SUBCATEGORIES.RECEPTION,
            NEWS_SUBCATEGORIES.RELATIONSHIP_ADVICE,
            NEWS_SUBCATEGORIES.SHOWERS_PARTIES,
            NEWS_SUBCATEGORIES.THEMES,
            NEWS_SUBCATEGORIES.TRANSPORTATION,
            NEWS_SUBCATEGORIES.VENDOR_SPOTLIGHT,
            NEWS_SUBCATEGORIES.WEDDING_PLANNING_CONSULTING
        ]
    },
    CELEBRITY_STYLE: {
        name: "Celebrity Style",
        title: "Celebrity Style",
        categorySlug: "celebrity-style",
        introduction: 'Inside Weddings shares the latest celebrity engagements and proposals, celebrity wedding ideas from the celebrations of your favorite stars from TV, movies, sports, and more!',
        description: '',
        subCategories: [
            NEWS_SUBCATEGORIES.CELEBRITY_WEDDINGS,
            NEWS_SUBCATEGORIES.HOT_TRENDS
        ]
    },
    FASHION: {
        name: "Wedding Fashion",
        title: "Wedding Fashion",
        categorySlug: "fashion",
        introduction: 'Inside Weddings shares the latest wedding fashion trends, from bridal gowns and bridesmaid dresses, to mother of the bride gowns, groom’s attire, and so much more!',
        description: '',
        subCategories: [
            NEWS_SUBCATEGORIES.ACCESSORIES,
            NEWS_SUBCATEGORIES.BRIDAL_GOWNS,
            NEWS_SUBCATEGORIES.BRIDESMAIDS_ATTIRE,
            NEWS_SUBCATEGORIES.CHILDRENS_ATTIRE,
            NEWS_SUBCATEGORIES.DESIGNER_SPOTLIGHT,
            NEWS_SUBCATEGORIES.FASHION_EVENTS,
            NEWS_SUBCATEGORIES.INTIMATE_ATTIRE,
            NEWS_SUBCATEGORIES.MENS_ATTIRE,
            NEWS_SUBCATEGORIES.MOTHERS_ATTIRE,
            NEWS_SUBCATEGORIES.RUNWAY
        ]
    },
    JEWELRY: {
        name: "Wedding Jewelry",
        title: "Engagement & Wedding Jewelry",
        categorySlug: "jewelry",
        introduction: 'Inside Weddings shares the latest wedding jewelry trends, from engagement rings and wedding bands, to fine jewelry and costume jewelry for brides, bridesmaids, guests, and more!',
        description: '',
        subCategories: [
            NEWS_SUBCATEGORIES.COSTUME_JEWELRY,
            NEWS_SUBCATEGORIES.DESIGNER_SPOTLIGHT_2,
            NEWS_SUBCATEGORIES.FINE_JEWELRY,
            NEWS_SUBCATEGORIES.JEWELRY_EVENTS,
            NEWS_SUBCATEGORIES.RINGS
        ]
    },
    BEAUTY: {
        name: "Beauty",
        title: "Wedding Beauty",
        categorySlug: "beauty",
        introduction: 'Inside Weddings shares the latest beauty trends and ideas for wedding hair, makeup, health and fitness, nails, and skincare to help brides, bridesmaids, wedding guests, and more!',
        description: '',
        subCategories: [
            NEWS_SUBCATEGORIES.FRAGRANCES,
            NEWS_SUBCATEGORIES.HAIR_NAILS,
            NEWS_SUBCATEGORIES.HEALTH_FITNESS,
            NEWS_SUBCATEGORIES.MAKEUP_SKINCARE
        ]
    },
    TRAVEL_HONEYMOON: {
        name: "Travel & Honeymoon",
        title: "Travel & Honeymoon",
        categorySlug: "travel-honeymoon",
        introduction: 'Inside Weddings shares the latest wedding travel and honeymoon trends, from destination weddings, to honeymoon ideas and itineraries, featured locations and resorts, and more!',
        description: '',
        subCategories: [
            NEWS_SUBCATEGORIES.FEATURED_RESORTS_DESTINATIONS,
            NEWS_SUBCATEGORIES.SPECIALS_PROMOTIONS,
            NEWS_SUBCATEGORIES.TRAVEL_TIPS
        ]
    },
    WEDDING_REGISTRY: {
        name: "Wedding Registry",
        title: "Wedding Registry & Bridal Gift Ideas",
        categorySlug: "wedding-registry",
        introduction: 'Inside Weddings shares the latest wedding registry and bridal gift trends, from wish lists curated by real couples, to registry tips and advice, wedding gift ideas, and more!',
        description: '',
        subCategories: [
            NEWS_SUBCATEGORIES.FEATURED_REGISTRIES,
            NEWS_SUBCATEGORIES.INDUSTRY_EVENTS_6,
            NEWS_SUBCATEGORIES.REGISTRY,
            NEWS_SUBCATEGORIES.REGISTRY_TIPS,
            NEWS_SUBCATEGORIES.WISH_LIST
        ]
    },
    // EXPERT_ADVICE: {
    //     name: "Expert Advice",
    //     categorySlug: "expert-advice",
    //     subCategories: [
    //         NEWS_SUBCATEGORIES.BEAUTY,
    //         NEWS_SUBCATEGORIES.CAKE_DESSERT,
    //         NEWS_SUBCATEGORIES.CATERING_2,
    //         NEWS_SUBCATEGORIES.CEREMONY_TRADITIONS_2,
    //         NEWS_SUBCATEGORIES.ENTERTAINMENT_2,
    //         NEWS_SUBCATEGORIES.ETIQUETTE,
    //         NEWS_SUBCATEGORIES.FASHION,
    //         NEWS_SUBCATEGORIES.FAVORS_GIFTS_2,
    //         NEWS_SUBCATEGORIES.FLORAL_DESIGN_2,
    //         NEWS_SUBCATEGORIES.INVITATIONS_MORE_2,
    //         NEWS_SUBCATEGORIES.JEWELRY,
    //         NEWS_SUBCATEGORIES.LEGAL_2,
    //         NEWS_SUBCATEGORIES.PHOTOGRAPHY_VIDEOGRAPHY_2,
    //         NEWS_SUBCATEGORIES.REGISTRY_2,
    //         NEWS_SUBCATEGORIES.RELATIONSHIP_ADVICE_2,
    //         NEWS_SUBCATEGORIES.TRANSPORTATION_2,
    //         NEWS_SUBCATEGORIES.WEDDING_PLANNING_CONSULTING_2
    //     ]
    // }
};

export default Object.values(NEWS_CATEGORIES);

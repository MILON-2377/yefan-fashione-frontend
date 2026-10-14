export const dictionaries = {
    en: {
        nav: {
            home: "Home",
            products: "Products",
            about: "About Us",
            reviews: "Reviews",
            news: "News",
            downloads: "Downloads",
            faq: "FAQ",
            contact: "Contact",
            inquireNow: "Inquire Now",
            searchPlaceholder: "Search SKUs, products...",
            // Navigation Links
            links: {
                home: "Home",
                about: "About Us",
                reviews: "Reviews & Testimonials",
                downloads: "Downloads",
                faq: "FAQ",
                contact: "Contact",
            },
            // Apparel & Atelier Product Categories
            categories: [
                {
                    title: "Couture Evening Gowns",
                    description: "Hand-finished evening dresses, crystal embellishments, and red-carpet couture.",
                },
                {
                    title: "Bridal Wear & Veils",
                    description: "Bespoke bridal gowns, delicate lace veils, and luxury wedding attire.",
                },
                {
                    title: "Bespoke Cocktail Dresses",
                    description: "Tailored cocktail dresses and contemporary high-end party wear.",
                },
                {
                    title: "Silk & Satin Slip Dresses",
                    description: "Pure Mulberry silk slip dresses, satin slips, and resort wear.",
                },
                {
                    title: "Tailored Women Suits",
                    description: "Precision-cut women suits, blazer sets, and executive formalwear.",
                },
                {
                    title: "Custom OEM/ODM Apparel",
                    description: "Precision garment manufacturing built strictly to client tech-packs.",
                },
            ],
        },

        hero: {
            badge: "Verified Haute Couture & Bespoke Manufacturer",
            title: "Bespoke Couture & Luxury Apparel Manufacturing",
            subtitle: "Direct factory production tailored to international couture standards.",
            primaryCta: "Request Product Quote",
            secondaryCta: "View All Catalogs",
        },

        heroBanners: [
            {
                id: "1",
                badge: "Direct Factory Manufacturer",
                title: "Guangzhou Yifan Trading Co., Ltd.",
                subtitle:
                    "Professional bridal fashion company specializing in original design, manufacturing, and global export of wedding dresses, evening gowns, and customized bridal collections.",
                primaryCtaText: "Request Wholesale Quote",
                primaryCtaLink: "/contact",
                secondaryCtaText: "Inquiry",
                secondaryCtaLink: "/downloads",
                bgImageUrl: "/banner1.jpg",
                metrics: [
                    { value: "Est. 2017", label: "Bridal Manufacturer" },
                    { value: "30+", label: "Global Expos" },
                    { value: "3 Brands", label: "YEEFANS | KissMarch | Soiowar" },
                ],
            },
            {
                id: "2",
                badge: "YEEFANS Brand",
                title: "Spacetime Prism 2026 Collection",
                subtitle:
                    "Discover the brand-new 2026 collection featuring signature bridal gowns, including models W2604, W2608, W2609, W2612, W2613, W2615, W5638, W5639, W5641, and W5643.",
                primaryCtaText: "View YEEFANS Catalog",
                primaryCtaLink: "/collections/yeefans",
                secondaryCtaText: "Request Price List",
                secondaryCtaLink: "/contact",
                bgImageUrl:
                    "https://images.unsplash.com/photo-1546804784-896d0dca3800?q=80&w=2070&auto=format&fit=crop",
                metrics: [
                    { value: "10 Styles", label: "2026 Collection" },
                    { value: "60 Days", label: "Sample Lead Time" },
                    { value: "Original", label: "In-House Design" },
                ],
            },
            {
                id: "3",
                badge: "KissMarch Brand",
                title: "Playful Gatsby & Vintage Romantic Series",
                subtitle:
                    "Featuring timeless vintage aesthetics and elegant designs across 30+ signature styles, including K5368, K5369 (Dance of Time), K5370A (Moonfall), K5375 (Nietzsche Poetry), K5376 (Turandot), and K5892 (Holy Girl).",
                primaryCtaText: "Explore KissMarch Series",
                primaryCtaLink: "/collections/kissmarch",
                secondaryCtaText: "View All Catalog",
                secondaryCtaLink: "/downloads",
                bgImageUrl:
                    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
                metrics: [
                    { value: "30+ Models", label: "Vintage Designs" },
                    { value: "6-12 Pcs", label: "Standard MOQ" },
                    { value: "EXW", label: "Ex-Works Terms" },
                ],
            },
            {
                id: "4",
                badge: "Soiowar Brand",
                title: "Autumn/Winter Chapter 1: Sparse Shadows (疏影)",
                subtitle:
                    "Classic French vintage chic blended with quiet afternoon charm and intricate floral details. Showcasing 16 curated designs including S5387, S5388, S5392, S6383, S6901 (Lolita), and S6906 (Green Rose).",
                primaryCtaText: "Explore Soiowar Collection",
                primaryCtaLink: "/collections/soiowar",
                secondaryCtaText: "Request Fabric Swatches",
                secondaryCtaLink: "/contact",
                bgImageUrl:
                    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
                metrics: [
                    { value: "16 Styles", label: "Chapter 1 Lineup" },
                    { value: "Velvet", label: "Premium Fabrics" },
                    { value: "French Vintage", label: "Design Identity" },
                ],
            },
            {
                id: "5",
                badge: "Wholesale & OEM/ODM Services",
                title: "Tiered Pricing & Flexible Customization",
                subtitle:
                    "Scaled volume discounts from 3% up to 15% off bulk orders, along with dedicated picture sampling, custom sizing, fabric changes, and full private label production.",
                primaryCtaText: "View Wholesale Policy",
                primaryCtaLink: "/wholesale-policy",
                secondaryCtaText: "Start Custom Order",
                secondaryCtaLink: "/custom-order",
                bgImageUrl:
                    "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=2070&auto=format&fit=crop",
                metrics: [
                    { value: "Up to 15%", label: "Bulk Tier Discount" },
                    { value: "90 Days", label: "Bulk Lead Time" },
                ],
            },
        ],

        advantages: {
            tagline: "Guangzhou Yifan Trading",
            heading: "Why Partner With Yifan Bridal & Couture",
            subheading:
                "Delivering high-end French retro couture and bridal fashion to global distributors, boutiques, and private labels.",
            oemTitle: "OEM / ODM & Custom Design",
            oemDesc:
                "Full picture-to-sample customization, bespoke sizing, and custom fabric adjustments tailored for boutique private labels.",
            wholesaleTitle: "Flexible Tiered Wholesale",
            wholesaleDesc:
                "Scalable order tiers from standard 1-piece sampling up to 100+ bulk production with competitive volume pricing.",
            craftsmanshipTitle: "Signature Couture Craftsmanship",
            craftsmanshipDesc:
                "Featuring French retro aesthetics, intricate floral lace embroidery, velvet detailing, and premium bridal fabrics.",
            leadTimeTitle: "Transparent Lead Times",
            leadTimeDesc:
                "Standardized 60 to 90-day production scheduling with expedited rush-order capabilities for time-sensitive seasons.",
        },

        categorySection: {
            noData: "No product categories available at this moment.",
            errorMsg: "Failed to load categories. Please try again later.",
        },

        heroSection: {
            badge: "Verified Haute Couture & Bespoke Manufacturer",
            title: "Bespoke Couture & Luxury Apparel Manufacturing",
            subtitle:
                "Direct factory production tailored to international couture standards. Delivering certified craftsmanship, custom fitting services, and premium global distribution.",
            primaryCta: "Request Product Quote",
            secondaryCta: "View All Catalogs",
            exportMarkets: "50+ Countries",
            qualityStandard: "ISO & Couture Certified",
            leadTime: "7-14 Days",
            metrics: {
                exportMarkets: "Global Export Reach",
                qualityStandard: "Quality Certified",
                leadTime: "Sample Lead Time",
            },
            showroomBadge: "Verified Factory",
            showroomTitle: "Yee Fans Factory Showroom",
            showroomDesc: "Custom manufacturing capabilities & export-ready products",
        },

        advantageSection: {
            companyTag: "Guangzhou Yifan Trading",
            heading: "Why Partner With Yifan Bridal & Couture",
            subheading: "Delivering high-end French retro couture and bridal fashion to global distributors, boutiques, and private labels.",
            advantages: [
                {
                    title: "OEM / ODM & Custom Design",
                    description: "Full picture-to-sample customization, bespoke sizing, and custom fabric adjustments tailored for boutique private labels.",
                },
                {
                    title: "Flexible Tiered Wholesale",
                    description: "Scalable order tiers from standard 1-piece sampling up to 100+ bulk production with competitive volume pricing.",
                },
                {
                    title: "Signature Couture Craftsmanship",
                    description: "Featuring French retro aesthetics, intricate floral lace embroidery, velvet detailing, and premium bridal fabrics.",
                },
                {
                    title: "Transparent Lead Times",
                    description: "Standardized 60 to 90-day production scheduling with expedited rush-order capabilities for time-sensitive seasons.",
                },
            ],
        },

        featuredProducts: {
            tagline: "Top Catalog Picks",
            heading: "Featured Products",
            prevProduct: "Previous product",
            nextProduct: "Next product",
            noProducts: "No featured products available at this moment.",
            viewDetails: "View Details",
            inquire: "Inquire",
            codeLabel: "CODE:",
        },

        aboutSection: {
            badge: "Excellence in Craftsmanship",
            companyName: "Guangzhou Yifan Apparel Co., Ltd.",
            description: "Specializing in high-end couture, bridal wear, and bespoke apparel manufacturing. We provide tier-one OEM/ODM production, precise pattern creation, and reliable direct-from-factory global export logistics tailored for boutique brands and international wholesalers.",
            metricsLabels: {
                yearsInBusiness: "Years Manufacturing Experience",
                globalPartners: "Global Boutique Partners",
                monthlyCapacity: "Monthly Production Output",
                qualityPassRate: "Export Quality Pass Rate",
            },
            policiesTitle: "Our Corporate & Export Policies",
            policiesSubtitle: "Standard operating guidelines for wholesale, sample production, and international shipping.",
            specSheetBtn: "Request Full Spec Sheet (PDF)",
            policies: [
                {
                    title: "1. 100% Quality Inspection Policy",
                    description: "Every unit passes through a 4-stage inspection (Fabric, In-line Stitching, Finished Garment, and Packaging) prior to dispatch.",
                    bullets: ["AQL 2.5 Standard Verification", "Defect-free shipment guarantee"],
                },
                {
                    title: "2. Design NDA & IP Protection",
                    description: "We sign formal Non-Disclosure Agreements for all custom tech-packs, brand patterns, and exclusive boutique designs.",
                    bullets: ["Zero third-party design leaks", "Exclusive mold & pattern retention"],
                },
                {
                    title: "3. Lead Times & Flexible MOQ",
                    description: "Streamlined sample production within 7-10 business days and bulk order fulfilment within 20-30 days.",
                    bullets: ["Low MOQ options for startups", "Express air & sea freight routing"],
                },
            ],
            certTitle: "Compliant & Internationally Certified Facility",
            certDesc: "Our facilities strictly observe global ethical labor practices and environmental standards.",
        },

        clientReviewsSection: {
            badge: "Verified Buyer Trust",
            heading: "Global Client Reviews",
            subheading: "Read how international boutique owners, importers, and fashion houses evaluate our apparel production.",
            scoreOutOf: "Out of 5.0",
            satisfiedPartners: "99% Satisfied Export Partners",
            noReviews: "No client reviews available at this moment.",
            productLabel: "Product:",
        },

        footer: {
            brandName: "Yifan Apparel",
            brandDesc: "Guangzhou Yifan Trading Co., Ltd. - B2B Manufacturer and Global Exporter of High-End French Couture & Bridal Wear.",
            quickNavTitle: "Quick Navigation",
            productCatalog: "Product Catalog",
            aboutFactory: "About Factory",
            resourceCenter: "Resource Center",
            orderingFaq: "Ordering FAQ",
            ourBrandsTitle: "Our Signature Brands",
            contactTitle: "Direct Contact",
            address: "Guangzhou City, Guangdong Province, China",
            emailLabel: "Email:",
            allRightsReserved: "All rights reserved.",
            adminPortal: "Staff Portal",
        },

        footerWhatsApp: {
            title: "Instant WhatsApp Sales",
            scanPrompt: "Scan QR Code to Start Live Chat",
            defaultPrefix: "Hello, I want to inquire about OEM wholesale.",
            qrAlt: "WhatsApp Contact QR Code",
        },

        aboutPage: {
            badge: "Premier Couture & Garment OEM / ODM Atelier",
            heading: "Crafting High-End Boutique Dresses & Evening Couture",
            descriptionStrong: "Guangzhou Yifan Apparel Co., Ltd.",
            descriptionText: " is a dedicated fashion manufacturing atelier specializing in luxury evening gowns, boutique dresses, bridal wear, and tailored apparel. Combining traditional hand craftsmanship with modern pattern-making technology, we partner with boutique owners, designer labels, and global fashion brands across 50+ countries.",
            metrics: {
                experience: "Years Atelier Craftsmanship",
                output: "Monthly Garment Output",
                partners: "Boutique Partners Worldwide",
                certified: "Certified Fashion Factory",
            },
            videoSectionTitle: "Inside Our Fashion Atelier & Sewing Floor",
            videoSectionDesc: "Watch our master tailors, pattern cutting, and quality finishing in motion.",
            capabilitiesTitle: "Atelier & Workshop Capabilities",
            capabilitiesDesc: "From initial sketch to bulk garment dispatch, designed for luxury finishing.",
            facilities: [
                {
                    id: "pattern",
                    title: "Pattern Making & Sample Studio",
                    description: "Master patternmakers and 3D Clo3D designers turn tech-packs into precise paper patterns and physical samples with a 7-10 day turnaround.",
                    specs: [
                        "3D Digital Sample Rendering",
                        "Custom Tech-Pack Development",
                        "7-Day Sample Dispatch",
                    ],
                },
                {
                    id: "tailoring",
                    title: "Hand-Crafted Sewing & Beading",
                    description: "Specialized atelier team delivering fine hand-embroidery, delicate lace applique, corset boning, and French seam finishings.",
                    specs: [
                        "Hand Embroidery & Beading",
                        "Imported French Lace Sourcing",
                        "High-End Corsetry",
                    ],
                },
                {
                    id: "inspection",
                    title: "Fabric Sourcing & AQL 2.5 Lab",
                    description: "Eco-certified fabric testing for colorfastness, shrinkage, and seam strength before full-scale bulk garment production.",
                    specs: [
                        "OEKO-TEX Standard 100",
                        "AQL 2.5 Quality Inspection",
                        "Direct Mill Fabric Sourcing",
                    ],
                },
            ],
            galleryTitle: "Atelier Gallery & Dress Details",
            galleryItems: [
                "Hand Beading & Seaming",
                "Pattern Cutting Room",
                "Evening Gown Finishing",
                "Silk & Lace Sourcing",
                "Mannequin Fitting",
                "Export Garment Packing",
            ],
            ctaHeading: "Have a Fashion Tech-Pack or Custom Design?",
            ctaDesc: "Send us your sketches, tech-packs, or sample requests for a direct production estimate within 24 hours.",
            ctaButton: "Request Sample Quote",
            sidebarCollections: "Boutique Collections",
            viewAll: "View All",
            consultationTitle: "OEM / ODM Fashion Consultation",
            consultationDesc: "Speak directly with our apparel merchandisers regarding fabric options, minimums, or sampling.",
            consultationButton: "Contact Merchandiser",
        },

        downloadPage: {
            badge: "Boutique Lookbooks & Product Specs",
            heading: "Preview The Official Product Catalogs",
            subheading: "Access high-resolution PDF lookbooks, fashion collections, fabric material guides, and manufacturing specification sheets directly from Guangzhou Yifan Apparel Co., Ltd.",
            loadingFeatured: "Loading featured lookbook...",
            loadingList: "Fetching digital catalogs...",
            listHeading: "All Available Downloads",
            documentsCount: "Documents Available",
            noCatalogsTitle: "No Catalogs Published Yet",
            noCatalogsDesc: "Check back soon or contact our merchandising team to request custom tech-packs directly.",
            ctaHeading: "Need High-Res Printable CAD or Vectors?",
            ctaDesc: "Contact our design department for uncompressed CAD pattern files, tech-pack templates, or confidential wholesale price sheets.",
            ctaButton: "Request Custom Tech-Pack",
        },

        featuredCatalogCard: {
            flagshipBadge: "Flagship Catalog",
            pdfSpecSheet: "PDF Specification Sheet",
            digitalCatalog: "Digital Catalog",
            downloadBtn: "View & Download PDF Catalog",
            pendingUpload: "PDF file pending upload",
            previewAlt: "PDF Catalog Preview",
        },

        publicCatalogCard: {
            pdfBadge: "PDF Lookbook",
            pdfDocument: "PDF Document",
            highRes: "High Resolution",
            viewBtn: "View Catalog",
            unavailableBtn: "Unavailable",
            fallbackCoverText: "PDF Catalog",
            dateFormatLocale: "en-US",
        },

        catalogSidebarCategories: {
            title: "Boutique Collections",
            viewAll: "View All",
            loading: "Loading categories...",
            noCategories: "No categories found.",
            exploreCollection: "Explore Collection",
            consultationTitle: "OEM / ODM Fashion Consultation",
            consultationDesc: "Speak directly with our apparel merchandisers regarding fabric options, minimums, or sampling.",
            contactBtn: "Contact Merchandiser",
        },

        faqPage: {
            badge: "Help Center & Interactive RAG Assistant",
            heading: "Got Questions? Ask Our AI or Browse Common FAQs",
            subheading: "Interact with our RAG-enabled AI assistant on the left for tailored answers, or explore common wholesale, manufacturing, and shipping questions on the right.",
        },

        faqAccordion: {
            title: "Frequently Asked Questions",
            qaCountSuffix: "Standard Q&As",
            items: [
                {
                    id: "faq-1",
                    category: "Ordering & MOQs",
                    question: "What is the Minimum Order Quantity (MOQ) for custom vs ready stock?",
                    answer: "For custom OEM/ODM manufacturing (bespoke patterns, colors, or tech-packs), our standard MOQ is 50 to 100 pieces per style. For ready-to-ship boutique stock from our lookbook, the MOQ is 10 pieces with mixed sizing permitted.",
                },
                {
                    id: "faq-2",
                    category: "Sampling & Lead Times",
                    question: "How long does pattern making and sample creation take?",
                    answer: "Once tech-packs, CAD sketches, and fabric selections are finalized, initial samples take 7 to 10 working days. Rush sampling (5 days) is available for urgent fashion show or boutique launching events.",
                },
                {
                    id: "faq-3",
                    category: "Materials & Fabrics",
                    question: "Can I request custom fabric dyeing, lace appliques, or embroidery?",
                    answer: "Yes. We partner with OEKO-TEX certified dye houses and lace mills in Guangdong. We can match Pantone color codes and source custom hand-beaded lace, stretch satin, or 100% Mulberry silk according to your specifications.",
                },
                {
                    id: "faq-4",
                    category: "Production & Quality Control",
                    question: "What quality control standards does Guangzhou Yifan Atelier follow?",
                    answer: "We operate an inline AQL 2.5 inspection process. Every evening gown and bridal dress undergoes fabric stress testing, zipper durability checks, seam reinforcement audits, and strict thread trimming before final steaming and poly-bagging.",
                },
                {
                    id: "faq-5",
                    category: "Shipping & Logistics",
                    question: "Do you offer international DDP (Delivered Duty Paid) shipping?",
                    answer: "Yes, we ship globally via DHL, FedEx, UPS, air freight, and sea freight. We offer full DDP services to North America, Europe, Australia, and the Middle East, handling all import customs and tariffs on your behalf.",
                },
                {
                    id: "faq-6",
                    category: "Branding & Packaging",
                    question: "Can you attach our brand's custom woven labels, hangtags, and garment bags?",
                    answer: "Absolutely. We offer complete private label packaging services, including woven neck labels, care tags, custom satin garment bags, and branded shipping boxes.",
                },
            ],
        },

        contactPage: {
            badge: "Atelier & Garment Factory Contact",
            heading: "Get in Touch with Our Merchandising Team",
            subheading: "Have a custom dress design, tech-pack, or wholesale inquiry? Submit your project details below and our fashion merchandisers will respond within 24 hours.",
        },

        inquiryFormSection: {
            title: "Send Us an Apparel Inquiry",
            subtitle: "Fill out the form below for sampling, bulk quotes, or custom production.",
            itemAttached: "Attached Item Code:",
            color: "Color:",
            size: "Size:",
            errorMessage: "Failed to submit inquiry. Please double-check your inputs and try again.",
            fullName: "Full Name",
            fullNamePlaceholder: "e.g. Sarah Jenkins",
            email: "Work Email",
            emailPlaceholder: "e.g. sarah@boutiquelabel.com",
            phone: "Phone / WhatsApp",
            phonePlaceholder: "+1 (555) 000-0000",
            country: "Country",
            countryPlaceholder: "e.g. United States",
            companyName: "Brand / Company",
            companyNamePlaceholder: "e.g. Maison Elegance Studio",
            jobTitle: "Job Title",
            jobTitlePlaceholder: "e.g. Lead Apparel Buyer",
            inquiryType: "Inquiry Type",
            inquiryTypeOptions: {
                GENERAL: "General Inquiry",
                PRODUCT: "Specific Product Catalog Request",
                CUSTOMIZATION: "Customization / Tailoring",
                OEM: "OEM Manufacturing",
                ODM: "ODM Design & Production",
                PRIVATE_LABEL: "Private Label Apparel",
                WHOLESALE: "Wholesale Orders",
            },
            quantityRange: "Quantity Range Target",
            quantityRangeOptions: {
                SAMPLE: "Sample Run",
                SMALL_BATCH: "Small Batch Run",
                WHOLESALE: "Wholesale Volume",
                LARGE_VOLUME: "Large Volume Production",
                NOT_SURE: "Not Sure Yet",
            },
            message: "Project Details & Message",
            messagePlaceholder: "Provide dress styles, fabric specifications, target delivery dates, or tech-pack details...",
            submitBtn: "Submit Inquiry Request",
            submittingText: "Submitting Inquiry...",
            privacyNotice: "We respect your privacy. Non-Disclosure Agreements (NDA) available upon request.",
            successTitle: "Inquiry Received!",
            successDesc: "Thank you for reaching out. Our garment merchandising team has received your project request and will respond within 24 hours.",
            sendAnotherBtn: "Send Another Inquiry",
        },

        factoryInfoSidebar: {
            hqBadge: "Guangzhou Headquarters",
            companyName: "Guangzhou Yifan Apparel Co., Ltd.",
            addressTitle: "Factory & Atelier Address:",
            addressText: "Building B3, Haizhu Garment & Textile Industrial Zone, Haizhu District, Guangzhou, Guangdong, China",
            phoneTitle: "Direct Merchandising Line:",
            emailTitle: "Official Email:",
            hoursTitle: "Operating Hours:",
            hoursText: "Monday - Saturday: 8:30 AM - 6:30 PM (GMT+8)",
            worldwideShipping: "Worldwide Shipping",
            bsciCertified: "BSCI Certified Factory",
            mapTitle: "Interactive Factory Location",
            mapLocation: "Guangzhou, China",
            openMapsBtn: "Open in Google Maps",
            showroomTitle: "Visiting Our Guangzhou Atelier?",
            showroomDesc: "Schedule a private showroom tour and fabric swatch viewing with our senior tailoring team.",
        },

        productsPage: {
            loadingCatalog: "Loading product catalog...",
        },

        productCatalog: {
            badge: "2026 Wholesale & OEM Catalog",
            heading: "Haute Couture & Apparel Catalog",
            subheading: "Explore luxury silk eveningwear, bespoke bridal gowns, and custom apparel tech-packs produced to international export standards.",
            allCatalogsBtn: "All Product Catalogs",
            searchPlaceholder: "Search by product code, name, or description...",
            noProductsFound: "No products found matching your active filter criteria.",
            clearFiltersBtn: "Clear all search and filters",
            brandTabs: {
                all: "All Brands & Lines",
                couture: "Yee Fans Haute Couture",
                atelier: "Yee Fans Atelier",
                readyToWear: "Yee Fans Ready-to-Wear",
                pureSilk: "Yee Fans Pure Silk",
            },
        },

        mobileFilter: {
            filterBtn: "Filter & Sort Catalog",
            applyBtn: "Apply Filters",
        },

        filterContent: {
            title: "Filter Catalog",
            categories: "Categories",
            allCategories: "All Categories",
            collections: "Collections",
            allCollections: "All Collections",
            loadingCollections: "Loading collections...",
            resetFilters: "Reset All Filters",
            fallbackCollections: [
                { id: "2026-spring-summer", name: "2026 Spring / Summer Lookbook" },
                { id: "royal-bridal", name: "2026 Royal Bridal Series" },
                { id: "ready-stock", name: "Ready-to-Ship Wholesale Stock" },
                { id: "custom-techpack", name: "OEM Custom Tech-Pack Series" },
            ],
        },


        productCard: {
            verifiedBadge: "Verified Item",
            quickView: "Quick View Specs",
            fullDetails: "Full Details",
            inquire: "Inquire",
        },

        faqChat: {
            title: "Ask Yifan AI",
            ragBadge: "RAG Active",
            subheading: "Instant answers powered by our 2026 product knowledge base",
            initialGreeting: "Hello! I am Yifan Atelier's AI Assistant. You can ask me anything about our 2026 dress collections, fabric specifications, OEM manufacturing process, MOQs, or shipping schedules.",
            resetChatTitle: "Reset Chat",
            resetGreeting: "Chat reset. How else can I assist your boutique or brand today?",
            searchingText: "Searching catalog specifications & policy docs...",
            suggestionsLabel: "Suggestions:",
            inputPlaceholder: "Ask AI about dresses, fabrics, MOQs, or lead times...",
            errorMessage: "Failed to connect to AI Assistant. Please try again.",
            quickPrompts: [
                {
                    label: "What is your Minimum Order Quantity (MOQ)?",
                    query: "What is the Minimum Order Quantity (MOQ) for custom OEM evening gowns and ready-to-ship stock?",
                },
                {
                    label: "How long does custom sampling take?",
                    query: "What is the turnaround time for sample development and pattern making?",
                },
                {
                    label: "What fabrics and materials do you stock?",
                    query: "Do you supply OEKO-TEX certified mulberry silk, stretch satins, and French lace?",
                },
                {
                    label: "What are your payment terms for bulk orders?",
                    query: "What payment methods and deposit structures do you accept for bulk manufacturing?",
                },
            ],
        },

        reviewForm: {
            badge: "Client Testimonials",
            heading: "Share Your Atelier Experience",
            subheading:
                "Your feedback helps us continuously elevate our OEM / ODM garment craftsmanship, sample turnaround, and merchandising support.",
            overallRating: "Overall Rating",
            outOfFiveStars: "out of 5 Stars",
            fullNameLabel: "Full Name",
            fullNamePlaceholder: "e.g. Victoria Sterling",
            companyLabel: "Company / Brand",
            companyPlaceholder: "e.g. Sterling Couture Boutique",
            jobTitleLabel: "Job Title / Role",
            jobTitlePlaceholder: "e.g. Creative Director",
            countryLabel: "Country",
            countryPlaceholder: "e.g. United States",
            messageLabel: "Testimonial Message",
            messagePlaceholder:
                "Share details regarding fabric quality, fit precision, sample lead time, and overall communication during production...",
            avatarLabel: "Profile Photo / Avatar",
            optionalText: "(Optional)",
            photoAttachedTitle: "Photo Attached",
            photoAttachedSub: "Ready to upload with review",
            removePhotoTitle: "Remove photo",
            submitBtn: "Submit Review",
            submittingBtn: "Submitting Review...",
            defaultError:
                "An unexpected error occurred while submitting your review.",
            successTitle: "Thank You for Your Review",
            successDescription:
                "Your feedback has been received and submitted for review. We deeply value our partnership and look forward to continuing our collaboration.",
            returnHomeBtn: "Return to Homepage",
            validation: {
                name: "Please enter your name",
                companyName: "Please enter your company or brand name",
                jobTitle: "Please enter your job title or position",
                country: "Please enter your country",
                rating: "Please select a star rating",
                message: "Please share a detailed review (at least 10 characters)",
            },
        },

        reviewsCatalog: {
            badge: "Client Testimonials",
            heading: "Partner Experience & Feedback",
            subheading:
                "Read authentic reviews from global fashion brands, boutiques, and apparel merchandisers partnering with our OEM / ODM atelier.",
            writeReviewBtn: "Write a Review",
            allReviews: "All Reviews",
            verifiedPartner: "Verified Partner",
            noReviewsFound: "No Reviews Found",
            noReviewsSub:
                "Be the first partner to share feedback on working with our apparel atelier.",
            submitFirstReviewBtn: "Submit First Review",
        },
    },
    zh: {
        nav: {
            home: "首页",
            products: "产品中心",
            about: "关于我们",
            reviews: "客户评价",
            news: "新闻动态",
            downloads: "资料下载",
            faq: "常见问题",
            contact: "联系我们",
            inquireNow: "立即咨询",
            searchPlaceholder: "搜索产品编号、品类...",
            links: {
                home: "首页",
                about: "关于我们",
                reviews: "客户评价与反馈",
                downloads: "产品目录",
                faq: "常见问题",
                contact: "联系我们",
            },
            categories: [
                {
                    title: "高定晚礼服系列",
                    description: "纯手工修饰晚礼服、水晶镶嵌与红毯高定礼服。",
                },
                {
                    title: "奢华婚纱头纱",
                    description: "私人定制婚纱、精致蕾丝头纱与奢华婚嫁服饰。",
                },
                {
                    title: "定制鸡尾酒裙",
                    description: "精修剪裁鸡尾酒裙与现代高端派对礼服。",
                },
                {
                    title: "真丝缎面吊带裙",
                    description: "100% 桑蚕丝吊带裙、真丝缎面裙及度假服饰。",
                },
                {
                    title: "优雅职业女西装",
                    description: "精密剪裁女式西服、西装套装及高阶商务正装。",
                },
                {
                    title: "定制 OEM / ODM 服饰",
                    description: "严格按照客户技术图纸 (Tech-Pack) 精密制造的服装代工服务。",
                },
            ],
        },
        hero: {
            badge: "认证高定礼服源头生产厂家",
            title: "高定礼服与高级服装定制生产",
            subtitle: "源头工厂直营生产，紧跟国际高定标准。",
            primaryCta: "获取产品报价",
            secondaryCta: "查看全部图册",
        },

        heroBanners: [
            {
                id: "1",
                badge: "源头工厂直供",
                title: "广州一帆贸易有限公司",
                subtitle:
                    "专业的婚纱礼服企业，专注于婚纱、晚礼服及定制婚纱系列的原创设计、生产制造与全球出口。",
                primaryCtaText: "获取批发报价",
                primaryCtaLink: "/contact",
                secondaryCtaText: "在线咨询",
                secondaryCtaLink: "/downloads",
                bgImageUrl: "/banner1.jpg",
                metrics: [
                    { value: "2017年成立", label: "婚纱制造工厂" },
                    { value: "30+", label: "全球展会" },
                    { value: "3大品牌", label: "YEEFANS | KissMarch | Soiowar" },
                ],
            },
            {
                id: "2",
                badge: "YEEFANS 品牌",
                title: "时空三棱镜 2026 婚纱新品系列",
                subtitle:
                    "探索全新的2026年主打婚纱系列，包含 W2604、W2608、W2609、W2612、W2613、W2615、W5638、W5639、W5641 及 W5643 等精选款。",
                primaryCtaText: "浏览 YEEFANS 目录",
                primaryCtaLink: "/collections/yeefans",
                secondaryCtaText: "索取价格表",
                secondaryCtaLink: "/contact",
                bgImageUrl:
                    "https://images.unsplash.com/photo-1546804784-896d0dca3800?q=80&w=2070&auto=format&fit=crop",
                metrics: [
                    { value: "10款新品", label: "2026系列" },
                    { value: "60天", label: "样衣周期" },
                    { value: "自主原创", label: "设计研发" },
                ],
            },
            {
                id: "3",
                badge: "KissMarch 品牌",
                title: "戏谑盖茨比与复古浪漫系列",
                subtitle:
                    "展现永恒复古美学与优雅设计，涵盖30多款经典款式，包括 K5368、K5369（时光之舞）、K5370A（月落）、K5375（尼采之诗）、K5376（图兰朵）及 K5892（圣女）。",
                primaryCtaText: "探索 KissMarch 系列",
                primaryCtaLink: "/collections/kissmarch",
                secondaryCtaText: "查看完整目录",
                secondaryCtaLink: "/downloads",
                bgImageUrl:
                    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
                metrics: [
                    { value: "30+款", label: "复古款式" },
                    { value: "6-12件", label: "起订量 MOQ" },
                    { value: "EXW", label: "工厂交货价" },
                ],
            },
            {
                id: "4",
                badge: "Soiowar 品牌",
                title: "秋冬第一章：疏影系列",
                subtitle:
                    "经典法式复古风尚融汇午后慵懒魅力与细腻花卉细节。精选16款特色设计，包含 S5387、S5388、S5392、S6383、S6901（洛丽塔）与 S6906（绿玫瑰）。",
                primaryCtaText: "探索 Soiowar 系列",
                primaryCtaLink: "/collections/soiowar",
                secondaryCtaText: "索取面料样卡",
                secondaryCtaLink: "/contact",
                bgImageUrl:
                    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
                metrics: [
                    { value: "16款设计", label: "第一波新品" },
                    { value: "丝绒面料", label: "臻选材质" },
                    { value: "法式复古", label: "品牌调性" },
                ],
            },
            {
                id: "5",
                badge: "批发与 OEM/ODM 定制服务",
                title: "阶梯式批发折扣与灵活定制",
                subtitle:
                    "大货订单可享3%至15%阶梯式折扣，并提供看图打样、尺码定制、面料调整及全套贴牌OEM生产服务。",
                primaryCtaText: "查看批发政策",
                primaryCtaLink: "/wholesale-policy",
                secondaryCtaText: "发起定制需求",
                secondaryCtaLink: "/custom-order",
                bgImageUrl:
                    "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=2070&auto=format&fit=crop",
                metrics: [
                    { value: "高达 15%", label: "批量阶梯折扣" },
                    { value: "90天", label: "大货周期" },
                ],
            },
        ],
        advantages: {
            tagline: "广州一帆贸易有限公司",
            heading: "为什么选择一帆婚纱与高定礼服",
            subheading:
                "为全球分销商、精品店和自主品牌提供高端法式复古与婚纱时尚源头制造支持。",
            oemTitle: "OEM / ODM 看图打样",
            oemDesc:
                "支持看图打样、定制尺寸及面料调整，专为精品店及自主品牌量身打造。",
            wholesaleTitle: "阶梯式灵活批发",
            wholesaleDesc:
                "支持1件起样样衣制作至100+件大货批量生产，享有阶梯式优惠批价。",
            craftsmanshipTitle: "匠心高定工艺",
            craftsmanshipDesc:
                "延续法式复古美学，精选精致蕾丝、刺绣花卉与丝绒面料，打磨高品质细节。",
            leadTimeTitle: "透明交期保证",
            leadTimeDesc:
                "标准60至90天生产周期，提供加急生产通道，保障旺季按时交付。",
        },
        categorySection: {
            noData: "暂无可用产品品类。",
            errorMsg: "加载品类失败，请稍后重试。",
        },

        heroSection: {
            badge: "认证高定礼服源头生产厂家",
            title: "高定礼服与高级服装定制生产",
            subtitle:
                "源头工厂直营生产，紧跟国际高定标准。提供权威品质认证、量体定制服务及可靠的全球配送支持。",
            primaryCta: "获取产品报价",
            secondaryCta: "查看全部图册",
            exportMarkets: "50+ 国家",
            qualityStandard: "ISO及高定质量认证",
            leadTime: "7-14 天",
            metrics: {
                exportMarkets: "全球出口覆盖",
                qualityStandard: "权威品质认证",
                leadTime: "打样周期",
            },
            showroomBadge: "实力验厂认证",
            showroomTitle: "一帆工厂实景展厅",
            showroomDesc: "专业定制生产实力与出口级产品展示",
        },

        advantageSection: {
            companyTag: "广州一帆贸易有限公司",
            heading: "为什么选择与一帆婚纱高定合作",
            subheading: "为全球分销商、精品店和独立品牌提供高端法式复古婚纱与礼服时尚。",
            advantages: [
                {
                    title: "OEM / ODM 贴牌定制设计",
                    description: "支持看图打样、尺码定制与面料细节微调，专为高定精品店与私享品牌打造。",
                },
                {
                    title: "灵活阶梯式批发",
                    description: "支持从单件打样到100+大货批量生产的灵活阶梯订货，享受最具竞争力的批发起订价。",
                },
                {
                    title: "独具匠心的高定工艺",
                    description: "主打法式复古美学，融入精致蕾丝刺绣、奢华丝绒与臻选婚纱主面料。",
                },
                {
                    title: "透明高效的生产交期",
                    description: "标准60-90天大货生产周期，并提供旺季紧急加急打样与生产服务支持。",
                },
            ],
        },

        featuredProducts: {
            tagline: "目录精选款式",
            heading: "特色推荐产品",
            prevProduct: "上一件产品",
            nextProduct: "下一件产品",
            noProducts: "暂无可用的推荐产品。",
            viewDetails: "查看详情",
            inquire: "在线询价",
            codeLabel: "编号:",
        },


        aboutSection: {
            badge: "精益求精的匠心工艺",
            companyName: "广州一帆服饰有限公司",
            description: "专注于高端高定礼服、婚纱及服装定制生产。我们为精品品牌与国际批发商提供一流的 OEM/ODM 生产、精准纸样裁剪及可靠的工厂直发全球出口物流服务。",
            metricsLabels: {
                yearsInBusiness: "年服装制造经验",
                globalPartners: "全球精品店合作伙伴",
                monthlyCapacity: "每月产能输出",
                qualityPassRate: "出口品质合格率",
            },
            policiesTitle: "企业政策与出口规范",
            policiesSubtitle: "针对批发、样衣生产及国际海空运的标准运营准则。",
            specSheetBtn: "索取完整规格表 (PDF)",
            policies: [
                {
                    title: "1. 100% 品质检验政策",
                    description: "每件产品在发货前均须通过四阶段检验（面料、车缝、成品及包装）。",
                    bullets: ["AQL 2.5 标准验货把关", "零瑕疵出货质量保证"],
                },
                {
                    title: "2. 设计保密与知识产权保护",
                    description: "针对所有定制工艺单、品牌纸样及独家高定设计签署正式保密协议 (NDA)。",
                    bullets: ["严防第三方设计外泄", "专版专属模具与纸样保留"],
                },
                {
                    title: "3. 生产周期与灵活起订量",
                    description: "7-10个工作日内高效完成打样，20-30天内快速交付大货订单。",
                    bullets: ["支持初创品牌灵活起订量 (MOQ)", "空运海运多路线畅达全球"],
                },
            ],
            certTitle: "合规认证的国际标准生产基地",
            certDesc: "我们的生产车间严格遵守全球道德劳工准则与环保生产标准。",
        },


        clientReviewsSection: {
            badge: "真实采买买家认可",
            heading: "全球客户评价",
            subheading: "了解国际精品店主、进口商及时尚品牌对我们服装生产与品质的真实反馈。",
            scoreOutOf: "满分 5.0",
            satisfiedPartners: "99% 满意度的出口合作伙伴",
            noReviews: "暂无客户评价。",
            productLabel: "对应产品:",
        },

        footer: {
            brandName: "一帆高定服饰",
            brandDesc: "广州一帆贸易有限公司 - 专注于高端法式复古婚纱与礼服制造及全球出口的B2B源头工厂。",
            quickNavTitle: "快速导航",
            productCatalog: "产品目录",
            aboutFactory: "关于工厂",
            resourceCenter: "资源下载",
            orderingFaq: "常见订购问题",
            ourBrandsTitle: "旗下高定品牌",
            contactTitle: "联系方式",
            address: "中国广东省广州市",
            emailLabel: "邮箱:",
            allRightsReserved: "保留所有权利。",
            adminPortal: "管理后台登录",
        },

        footerWhatsApp: {
            title: "WhatsApp 实时沟通",
            scanPrompt: "扫码开启实时在线咨询",
            defaultPrefix: "您好，我想咨询关于服装OEM/ODM批发的业务。",
            qrAlt: "WhatsApp 联系二维码",
        },

        aboutPage: {
            badge: "顶尖高定礼服与服装 OEM / ODM 工坊",
            heading: "匠心智造高端精品礼服与晚装高定",
            descriptionStrong: "广州一帆服饰有限公司",
            descriptionText: "是一家专注于奢华晚礼服、精品时装、婚纱及量身定制服装的专业服装制造工坊。我们将传统手工工艺与现代制版技术相结合，为横跨50多个国家的精品店主、独立设计师品牌及全球时尚买家提供优质服务。",
            metrics: {
                experience: "年工坊匠心制造经验",
                output: "每月服装成衣产量",
                partners: "全球精品买家合作伙伴",
                certified: "认证服装制造工厂",
            },
            videoSectionTitle: "探索我们的时装工坊与车缝流水线",
            videoSectionDesc: "直击大师级裁缝、纸样裁剪及精致后整工艺的实景运作。",
            capabilitiesTitle: "工坊与车间核心工艺能力",
            capabilitiesDesc: "从原始设计手稿到大货批量交付，为奢华工艺品控保驾护航。",
            facilities: [
                {
                    id: "pattern",
                    title: "纸样研发与样衣制作中心",
                    description: "资深制版师与 3D Clo3D 设计师将工艺单转化为精准纸样与实体样衣，支持 7-10 天快速出样。",
                    specs: [
                        "3D 数字样衣渲染仿真",
                        "定制工艺单 (Tech-Pack) 开发",
                        "7天样衣极速寄出",
                    ],
                },
                {
                    id: "tailoring",
                    title: "手工刺绣缝制与珠片工艺",
                    description: "专业高定工坊团队，精于精细手工刺绣、精致蕾丝拼花、鱼骨胸衣及法式无骨缝合。",
                    specs: [
                        "手工刺绣与珠片镶嵌",
                        "进口法国蕾丝寻源",
                        "高级胸衣结构支撑",
                    ],
                },
                {
                    id: "inspection",
                    title: "面料寻源与 AQL 2.5 质检实验室",
                    description: "在大货全面剪裁生产前，进行环保色牢度、缩水率及拉力强度的严苛实验室检测。",
                    specs: [
                        "OEKO-TEX 100 环保认证",
                        "AQL 2.5 国际出口标准质检",
                        "源头直采优质面料",
                    ],
                },
            ],
            galleryTitle: "工坊图库与精工细节展示",
            galleryItems: [
                "手工珠绣与无缝拼接",
                "纸样裁剪工作室",
                "晚礼服精细后整",
                "真丝与蕾丝选料",
                "立体人体模特试衣",
                "出口服装打包发运",
            ],
            ctaHeading: "您有服装工艺单 (Tech-Pack) 或定制设计吗？",
            ctaDesc: "欢迎发送设计手稿、工艺单或样衣需求，我们将在 24 小时内为您提供直接生产报价。",
            ctaButton: "获取样衣与大货报价",
            sidebarCollections: "精品系列导航",
            viewAll: "查看全部",
            consultationTitle: "OEM / ODM 服装定制咨询",
            consultationDesc: "直接与我们的专业外贸服装跟单经理沟通面料选项、起订量及打样事宜。",
            consultationButton: "联系外贸顾问",
        },

        downloadPage: {
            badge: "精选Lookbook与产品规格书",
            heading: "在线浏览与下载官方产品图册",
            subheading: "直接获取广州一帆服饰有限公司的高清 PDF 造型册、最新时尚系列图册、面料指南及工厂生产规格说明书。",
            loadingFeatured: "正在加载推荐造型册...",
            loadingList: "正在获取电子图册数据...",
            listHeading: "所有可下载资源",
            documentsCount: "份可用文档",
            noCatalogsTitle: "暂无发布的画册",
            noCatalogsDesc: "请稍后再试，或直接联系我们的外贸跟单团队索取专属工艺单 (Tech-pack)。",
            ctaHeading: "需要高清晰度可打印 CAD 或矢量图纸？",
            ctaDesc: "联系我们的设计部门，索取无损 CAD 纸样文件、工艺单模板或保密批发价格表。",
            ctaButton: "索取定制工艺单",
        },

        featuredCatalogCard: {
            flagshipBadge: "主打重磅画册",
            pdfSpecSheet: "PDF 规格说明书",
            digitalCatalog: "电子画册",
            downloadBtn: "在线预览与下载 PDF 画册",
            pendingUpload: "PDF 文件待上传",
            previewAlt: "PDF 画册封面预览",
        },

        publicCatalogCard: {
            pdfBadge: "PDF 造型册",
            pdfDocument: "PDF 电子文档",
            highRes: "高清原版",
            viewBtn: "查看画册",
            unavailableBtn: "暂无资源",
            fallbackCoverText: "PDF 画册",
            dateFormatLocale: "zh-CN",
        },

        catalogSidebarCategories: {
            title: "精品系列导航",
            viewAll: "查看全部",
            loading: "正在加载品类...",
            noCategories: "暂无品类数据。",
            exploreCollection: "探索精选系列",
            consultationTitle: "OEM / ODM 服装定制咨询",
            consultationDesc: "直接与我们的专业外贸服装跟单经理沟通面料选项、起订量及打样事宜。",
            contactBtn: "联系外贸顾问",
        },

        faqPage: {
            badge: "帮助中心与 AI 智能问答助手",
            heading: "遇到问题？问问我们的 AI 或浏览常见解答",
            subheading: "在左侧与我们的 RAG 智能 AI 助手对话获取定制解答，或在右侧浏览有关批发、生产及物流的常见问题。",
        },

        faqAccordion: {
            title: "常见问题解答",
            qaCountSuffix: "条标准问答",
            items: [
                {
                    id: "faq-1",
                    category: "起订量与订货",
                    question: "定制款与现货款的最低起订量 (MOQ) 是多少？",
                    answer: "针对 OEM/ODM 贴牌定制（专版纸样、专属颜色或工艺单），我们的标准起订量为每款 50 至 100 件。针对造型册中的现货精品，起订量低至 10 件，支持混码采买。",
                },
                {
                    id: "faq-2",
                    category: "打样与周期",
                    question: "打样制版与样衣制作需要多长时间？",
                    answer: "在确定工艺单 (Tech-pack)、CAD 图纸及面料后，初打样衣需 7 至 10 个工作日。针对紧急时装秀或精品店新品发布，提供 5 天加急打样服务。",
                },
                {
                    id: "faq-3",
                    category: "面料与材质",
                    question: "是否支持定制面料染色、蕾丝拼花或刺绣？",
                    answer: "支持。我们与广东拥有 OEKO-TEX 认证的染厂及蕾丝织造厂深度合作，可按潘通色号对色，并按要求提供定制手工珠绣蕾丝、弹力缎面或 100% 桑蚕丝。",
                },
                {
                    id: "faq-4",
                    category: "生产与品控",
                    question: "广州一帆高定工坊执行什么样的质量控制标准？",
                    answer: "我们严格执行 AQL 2.5 出口品检流程。每件晚礼服与婚纱在熨烫打包前，均需通过面料拉力测试、拉链耐用度检查、车缝加固审计及严苛的剪线头检验。",
                },
                {
                    id: "faq-5",
                    category: "物流与发货",
                    question: "是否提供国际 DDP（包税到门）运输服务？",
                    answer: "提供。我们通过 DHL、FedEx、UPS、空运及海运发往全球。我们为北美、欧洲、澳洲及中东地区提供完整的 DDP 包税到门服务，全程代办进口清关及关税。",
                },
                {
                    id: "faq-6",
                    category: "品牌与包装",
                    question: "能否定制并缝制我们品牌的织唛主标、吊牌和防尘袋？",
                    answer: "完全可以。我们提供完整的私享品牌 (Private Label) 包装服务，包括定制织唛领标、洗水标、定制缎面婚纱防尘袋及品牌专属外包装箱。",
                },
            ],
        },

        contactPage: {
            badge: "服装工坊与工厂直连",
            heading: "联系我们的外贸跟单团队",
            subheading: "无论您是有定制礼服设计手稿、工艺单 (Tech-pack) 还是批量批发需求，请在下方提交项目详情，我们的外贸跟单经理将在 24 小时内回复您。",
        },

        inquiryFormSection: {
            title: "发送服装询盘与定制需求",
            subtitle: "请填写下方表单索取样衣、大货报价或专版定制等服务。",
            itemAttached: "关联产品编号:",
            color: "颜色:",
            size: "尺码:",
            errorMessage: "提交询盘失败，请核对输入内容后重试。",
            fullName: "您的姓名",
            fullNamePlaceholder: "如：张经理 / Sarah Jenkins",
            email: "工作邮箱",
            emailPlaceholder: "如：sarah@boutiquelabel.com",
            phone: "联系电话 / WhatsApp",
            phonePlaceholder: "+86 138-0000-0000",
            country: "国家 / 地区",
            countryPlaceholder: "如：中国 / 美国",
            companyName: "品牌 / 公司名称",
            companyNamePlaceholder: "如：广州精品高定服饰工作室",
            jobTitle: "职位头衔",
            jobTitlePlaceholder: "如：服装采购总监",
            inquiryType: "询盘类型",
            inquiryTypeOptions: {
                GENERAL: "常规业务咨询",
                PRODUCT: "特定产品图册索取",
                CUSTOMIZATION: "高定改版与精细裁剪",
                OEM: "OEM 贴牌代工生产",
                ODM: "ODM 设计研发与生产",
                PRIVATE_LABEL: "自主品牌标签定制",
                WHOLESALE: "现货批量批发",
            },
            quantityRange: "目标预估数量",
            quantityRangeOptions: {
                SAMPLE: "样衣试制打样",
                SMALL_BATCH: "精品店小批量试单",
                WHOLESALE: "中等批货数量",
                LARGE_VOLUME: "大型大货订单生产",
                NOT_SURE: "暂时未定",
            },
            message: "项目需求说明与留言",
            messagePlaceholder: "请提供款式风格、面料规格、交货期或工艺单 (Tech-pack) 细节...",
            submitBtn: "提交询盘需求",
            submittingText: "正在提交询盘...",
            privacyNotice: "我们严格尊重并保护您的商业隐私。可根据需求签署保密协议 (NDA)。",
            successTitle: "询盘已成功接收！",
            successDesc: "感谢您的联系。我们的外贸跟单团队已收到您的项目需求，将在 24 小时内与您回复沟通。",
            sendAnotherBtn: "发送另一条询盘",
        },

        factoryInfoSidebar: {
            hqBadge: "广州总部基地",
            companyName: "广州一帆服饰有限公司",
            addressTitle: "工厂与高定工坊地址：",
            addressText: "中国广东省广州市海珠区海珠服装纺织工业园 B3 栋",
            phoneTitle: "外贸跟单直连热线：",
            emailTitle: "官方业务邮箱：",
            hoursTitle: "工作时间：",
            hoursText: "周一至周六：上午 8:30 - 下午 6:30 (GMT+8)",
            worldwideShipping: "全球配送发货",
            bsciCertified: "BSCI 认证标准工厂",
            mapTitle: "工厂实景与地理位置",
            mapLocation: "中国 广州",
            openMapsBtn: "在谷歌地图中打开",
            showroomTitle: "计划参观我们的广州高定展厅？",
            showroomDesc: "预约私享展厅导览，并与资深剪裁团队面对面沟通面料色卡与工艺细节。",
        },

        productsPage: {
            loadingCatalog: "正在加载产品目录...",
        },

        productCatalog: {
            badge: "2026 批发与 OEM 代工图册",
            heading: "高定礼服与精品服装目录",
            subheading: "探索遵循国际出口标准打造的真丝晚礼服、定制婚纱及专属服装工艺单 (Tech-packs)。",
            allCatalogsBtn: "所有产品画册",
            searchPlaceholder: "按产品编号、名称或描述搜索...",
            noProductsFound: "未找到符合您当前筛选条件的产品。",
            clearFiltersBtn: "清除所有搜索与筛选",
            brandTabs: {
                all: "全部品牌与系列",
                couture: "一帆高定礼服",
                atelier: "一帆高定工坊",
                readyToWear: "一帆成衣系列",
                pureSilk: "一帆真丝系列",
            },
        },

        mobileFilter: {
            filterBtn: "筛选与排序目录",
            applyBtn: "应用筛选条件",
        },

        filterContent: {
            title: "筛选目录",
            categories: "产品品类",
            allCategories: "全部品类",
            collections: "特选系列",
            allCollections: "全部系列",
            loadingCollections: "正在加载系列...",
            resetFilters: "重置所有筛选",
            fallbackCollections: [
                { id: "2026-spring-summer", name: "2026 春夏高级定制造型册" },
                { id: "royal-bridal", name: "2026 皇室新娘婚纱系列" },
                { id: "ready-stock", name: "现货即发批发系列" },
                { id: "custom-techpack", name: "OEM 专属工艺单定制系列" },
            ],
        },

        productCard: {
            verifiedBadge: "官方认证商品",
            quickView: "快速查看规格",
            fullDetails: "完整详情",
            inquire: "询价 / 咨询",
        },


        faqChat: {
            title: "咨询一帆 AI 助手",
            ragBadge: "RAG 知识库已启用",
            subheading: "基于 2026 礼服产品知识库为您提供即时解答",
            initialGreeting: "您好！我是广州一帆高定工坊的 AI 智能助手。关于 2026 时尚造型册、面料规格、OEM 代工流程、起订量 (MOQ) 或国际物流，您可以随时向我提问。",
            resetChatTitle: "重置对话",
            resetGreeting: "对话已重置。今天还有什么我可以协助您的品牌或精品店的吗？",
            searchingText: "正在检索产品规格图册与工厂政策文件...",
            suggestionsLabel: "常见提问推荐:",
            inputPlaceholder: "向 AI 询问礼服款式、面料、MOQ 或打样周期...",
            errorMessage: "无法连接到 AI 助手，请重试。",
            quickPrompts: [
                {
                    label: "定制与现货的起订量 (MOQ) 是多少？",
                    query: "定制 OEM 晚礼服与现货精品款式的最低起订量 (MOQ) 分别是多少？",
                },
                {
                    label: "打样与制版需要多长时间？",
                    query: "版型开发与样衣制作的具体周期和加急选项是什么？",
                },
                {
                    label: "工坊常备哪些高端面料与材质？",
                    query: "你们是否提供 OEKO-TEX 认证桑蚕丝、重磅弹力缎及法国蕾丝？",
                },
                {
                    label: "大货生产的付款方式与定金比例是什么？",
                    query: "针对大货批量生产，你们接受哪些付款方式与定金结构？",
                },
            ],
        },

        reviewForm: {
            badge: "客户评价",
            heading: "分享您的定制与合作体验",
            subheading:
                "您的反馈将帮助我们不断提升服装 OEM / ODM 工艺品质、样品交付效率与供应链支持服务。",
            overallRating: "总体评分",
            outOfFiveStars: "星（满分 5 星）",
            fullNameLabel: "您的姓名",
            fullNamePlaceholder: "例如：维多利亚·斯特林",
            companyLabel: "公司 / 品牌名称",
            companyPlaceholder: "例如：斯特林高定时装精品店",
            jobTitleLabel: "职位 / 头衔",
            jobTitlePlaceholder: "例如：创意总监",
            countryLabel: "国家 / 地区",
            countryPlaceholder: "例如：美国",
            messageLabel: "评价与反馈内容",
            messagePlaceholder:
                "请分享关于面料品质、版型精密度、打样周期及生产沟通合作的详细评价...",
            avatarLabel: "个人头像 / 品牌照片",
            optionalText: "（选填）",
            photoAttachedTitle: "已附加照片",
            photoAttachedSub: "准备随评价一同提交",
            removePhotoTitle: "删除照片",
            submitBtn: "提交评价",
            submittingBtn: "正在提交评价...",
            defaultError: "提交评价时发生未知错误，请重试。",
            successTitle: "感谢您的真实评价！",
            successDescription:
                "您的反馈已成功接收并进入审核阶段。我们非常珍视与您的合作关系，期待未来继续携手共进。",
            returnHomeBtn: "返回首页",
            validation: {
                name: "请输入您的姓名",
                companyName: "请输入您的公司或品牌名称",
                jobTitle: "请输入您的职位或头衔",
                country: "请输入您的国家或地区",
                rating: "请选择星级评分",
                message: "请填写详细评价内容（不少于 10 个字符）",
            },
        },


        reviewsCatalog: {
            badge: "客户评价",
            heading: "合作伙伴体验与反馈",
            subheading:
                "阅读来自全球时尚品牌、精品店和服装采购商与我们 OEM / ODM 高定工坊合作的真实评价。",
            writeReviewBtn: "撰写评价",
            allReviews: "全部评价",
            verifiedPartner: "认证合作伙伴",
            noReviewsFound: "暂无评价数据",
            noReviewsSub: "成为首位分享与我们服装工坊合作体验的合作伙伴。",
            submitFirstReviewBtn: "提交首条评价",
        },

    },
} as const;

export type Language = "en" | "zh";

export function getDictionary(lang: Language) {
    return dictionaries[lang] || dictionaries.en;
}

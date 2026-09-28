export const dictionaries = {
    en: {
        nav: {
            home: "Home",
            products: "Products",
            about: "About Us",
            news: "News",
            downloads: "Downloads",
            faq: "FAQ",
            contact: "Contact",
            inquireNow: "Inquire Now",
            searchPlaceholder: "Search SKUs, products...",
        },
        hero: {
            badge: "Direct Factory Manufacturer",
            title: "High-End Couture & Bridal Wholesale",
            subtitle:
                "Guangzhou Yifan Trading provides exquisite French retro couture, floral lace gowns, and custom OEM/ODM solutions for boutique buyers worldwide.",
            primaryCta: "Request Instant Quote",
            secondaryCta: "Download Spec Sheet",
            metrics: {
                exportMarkets: "Export Markets",
                qualityStandard: "Quality Standard",
                leadTime: "Avg Lead Time",
            },
        },
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
    },
    zh: {
        nav: {
            home: "首页",
            products: "产品中心",
            about: "关于我们",
            news: "新闻动态",
            downloads: "资料下载",
            faq: "常见问题",
            contact: "联系我们",
            inquireNow: "立即咨询",
            searchPlaceholder: "搜索产品编号、品类...",
        },
        hero: {
            badge: "源头工厂直供",
            title: "高端法式复古婚纱与礼服批发定制",
            subtitle:
                "广州一帆贸易专注于精致法式复古礼服、蕾丝花卉婚纱及高定OEM/ODM服务，为全球精品店及品牌商提供高品质源头供货。",
            primaryCta: "获取实时报价",
            secondaryCta: "下载产品目录",
            metrics: {
                exportMarkets: "覆盖出口国家",
                qualityStandard: "质量标准",
                leadTime: "平均生产周期",
            },
        },
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
    },
} as const;

export type Language = "en" | "zh";

export function getDictionary(lang: Language) {
    return dictionaries[lang] || dictionaries.en;
}
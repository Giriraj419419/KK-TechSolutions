import { useEffect } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  faq?: FAQItem[];
  breadcrumbs?: BreadcrumbItem[];
}

const DEFAULT_KEYWORDS = 'Microsoft 365, Microsoft Azure, AWS Cloud, Adobe Solutions, Autodesk Solutions, CorelDRAW Licensing, GstarCAD Solutions, Dell PowerEdge Servers, HPE ProLiant Servers, Lenovo ThinkSystem, Enterprise IT Solutions, Cloud Infrastructure, Software Licensing, Business Technology Solutions, IT Consulting India';
const DEFAULT_IMAGE = 'https://kktechsolutions.in/og-image.jpg';
const BASE_URL = 'https://kktechsolutions.in';

export default function SEO({ 
  title, 
  description, 
  keywords = DEFAULT_KEYWORDS,
  ogImage = DEFAULT_IMAGE,
  canonicalUrl,
  noindex = false,
  faq,
  breadcrumbs
}: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // Helper to create or update meta tags
    const updateMetaTag = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.includes('name=')) {
          const nameMatch = selector.match(/name="([^"]+)"/);
          if (nameMatch) element.setAttribute('name', nameMatch[1]);
        }
        if (selector.includes('property=')) {
          const propMatch = selector.match(/property="([^"]+)"/);
          if (propMatch) element.setAttribute('property', propMatch[1]);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    // Helper to update link tags (e.g., canonical)
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Helper to inject/update JSON-LD script tags
    const updateJsonLd = (id: string, data: object | null) => {
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!data) {
        if (script) script.remove();
        return;
      }
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data, null, 2);
    };

    // 2. Determine Canonical URL
    const currentPath = window.location.pathname;
    const computedCanonical = canonicalUrl || `${BASE_URL}${currentPath === '/' ? '' : currentPath}`;

    // 3. Standard Meta Tags
    updateMetaTag('meta[name="title"]', 'content', title);
    updateMetaTag('meta[name="description"]', 'content', description);
    updateMetaTag('meta[name="keywords"]', 'content', keywords);
    updateMetaTag('meta[name="robots"]', 'content', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    updateLinkTag('canonical', computedCanonical);

    // 4. Open Graph / Facebook
    updateMetaTag('meta[property="og:site_name"]', 'content', 'KK Tech Solutions');
    updateMetaTag('meta[property="og:type"]', 'content', 'website');
    updateMetaTag('meta[property="og:url"]', 'content', computedCanonical);
    updateMetaTag('meta[property="og:title"]', 'content', title);
    updateMetaTag('meta[property="og:description"]', 'content', description);
    updateMetaTag('meta[property="og:image"]', 'content', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`);
    updateMetaTag('meta[property="og:locale"]', 'content', 'en_US');

    // 5. Twitter / X Metadata
    updateMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    updateMetaTag('meta[name="twitter:url"]', 'content', computedCanonical);
    updateMetaTag('meta[name="twitter:title"]', 'content', title);
    updateMetaTag('meta[name="twitter:description"]', 'content', description);
    updateMetaTag('meta[name="twitter:image"]', 'content', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`);

    // 6. JSON-LD Organization Schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'KK Tech Solutions',
      url: BASE_URL,
      logo: `${BASE_URL}/kk-logo-transparent.png`,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+91-7048214373',
          contactType: 'sales',
          email: 'info@kktechsolutions.in',
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi', 'Gujarati']
        }
      ],
      sameAs: [
        'https://www.linkedin.com/company/kktechsolutions',
        'https://wa.me/917048214373'
      ]
    };
    updateJsonLd('json-ld-organization', organizationSchema);

    // 7. JSON-LD LocalBusiness Schema
    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${BASE_URL}/#localbusiness`,
      name: 'KK Tech Solutions',
      image: `${BASE_URL}/kk-logo-transparent.png`,
      telephone: '+91-7048214373',
      email: 'info@kktechsolutions.in',
      url: BASE_URL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '715, Shilp Arista, Sindhu Bhavan Road, Bodakdev',
        addressLocality: 'Ahmedabad',
        addressRegion: 'Gujarat',
        postalCode: '380054',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 23.0384,
        longitude: 72.5119
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '10:00',
          closes: '18:00'
        }
      ],
      priceRange: '₹₹₹'
    };
    updateJsonLd('json-ld-localbusiness', localBusinessSchema);

    // 8. JSON-LD FAQ Schema (if provided)
    if (faq && faq.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      };
      updateJsonLd('json-ld-faq', faqSchema);
    } else {
      updateJsonLd('json-ld-faq', null);
    }

    // 9. JSON-LD BreadcrumbList Schema (if provided)
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((bc, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: bc.name,
          item: bc.item.startsWith('http') ? bc.item : `${BASE_URL}${bc.item}`
        }))
      };
      updateJsonLd('json-ld-breadcrumb', breadcrumbSchema);
    } else {
      updateJsonLd('json-ld-breadcrumb', null);
    }

  }, [title, description, keywords, ogImage, canonicalUrl, noindex, faq, breadcrumbs]);

  return null;
}

import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

export default function SEO({ 
  title, 
  description, 
  keywords = 'IT Infrastructure, Cloud Solutions, AWS, Azure, Microsoft 365, Enterprise Servers',
  ogImage = '/og-image.jpg'
}: SEOProps) {
  useEffect(() => {
    // Update Title
    document.title = title;

    // Helper to update meta tags
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

    // Standard Meta Tags
    updateMetaTag('meta[name="title"]', 'content', title);
    updateMetaTag('meta[name="description"]', 'content', description);
    updateMetaTag('meta[name="keywords"]', 'content', keywords);

    // Open Graph / Facebook
    updateMetaTag('meta[property="og:title"]', 'content', title);
    updateMetaTag('meta[property="og:description"]', 'content', description);
    updateMetaTag('meta[property="og:image"]', 'content', ogImage);

    // Twitter
    updateMetaTag('meta[property="twitter:title"]', 'content', title);
    updateMetaTag('meta[property="twitter:description"]', 'content', description);
    updateMetaTag('meta[property="twitter:image"]', 'content', ogImage);

  }, [title, description, keywords, ogImage]);

  return null; // This component doesn't render anything
}

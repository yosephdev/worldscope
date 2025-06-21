declare global {  
  var gtag: ((command: string, action: string, params: Record<string, unknown>) => void) | undefined;
}

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

class Analytics {
  private isProduction = import.meta.env.PROD;

  track(event: AnalyticsEvent) {
    if (!this.isProduction) {
      console.log('Analytics Event:', event);
      return;
    }
     
    if (typeof gtag !== 'undefined') {
      gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }
  }

  trackPageView(path: string) {
    this.track({
      action: 'page_view',
      category: 'navigation',
      label: path,
    });
  }

  trackCountryView(countryName: string) {
    this.track({
      action: 'country_view',
      category: 'engagement',
      label: countryName,
    });
  }

  trackSearch(searchTerm: string) {
    this.track({
      action: 'search',
      category: 'engagement',
      label: searchTerm,
    });
  }

  trackFilter(region: string) {
    this.track({
      action: 'filter',
      category: 'engagement',
      label: region,
    });
  }
}

export const analytics = new Analytics();
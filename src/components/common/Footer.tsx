import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

export default function Footer() {
  const footerLinks = {
    product: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Properties", href: "/property-listings" },
      { label: "Profiles", href: "/user-profiles" },
      { label: "Credit Score", href: "/credit-score" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Support", href: "/support" },
      { label: "Help Center", href: "/help-center" },
      { label: "Contact", href: "/support" },
    ],
    support: [
      { label: "Help Center", href: "/help-center" },
      { label: "Trust & Safety", href: "/safety-and-trust" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
    ],
  };

  const socialLinks = [
    { name: "Twitter", icon: "twitter", href: "#" },
    { name: "LinkedIn", icon: "linkedin", href: "#" },
    { name: "Instagram", icon: "instagram", href: "#" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Row - Link Groups */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/homepage" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="HomeModernIcon" variant="solid" size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Nivaas<span className="text-primary">Cred</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              India's first rental platform with verified reviews and credit scoring for both landlords and tenants.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks?.product?.map((link) => (
                <li key={link?.label}>
                  <Link
                    href={link?.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link) => (
                <li key={link?.label}>
                  <Link
                    href={link?.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks?.support?.map((link) => (
                <li key={link?.label}>
                  <Link
                    href={link?.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Row - Legal & Social */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2026 NivaasCred. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks?.map((social) => (
              <a
                key={social?.name}
                href={social?.href}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={social?.name}
              >
                <Icon name="GlobeAltIcon" size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
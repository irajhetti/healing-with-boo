import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface-container-lowest w-full pt-16 pb-8 border-t border-outline-variant/30">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="col-span-1">
          <span className="font-headline text-xl text-primary mb-4 block">
            Healing with Boo
          </span>
          <p className="text-on-surface-variant/80 font-body text-sm mb-6 leading-relaxed">
            A sacred space for deep physical restoration and spiritual
            exploration in the heart of Boscombe.
          </p>
          <div className="flex space-x-4">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-secondary">
              public
            </span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-secondary">
              nest_eco_leaf
            </span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-secondary">
              auto_awesome
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-secondary font-bold uppercase text-xs tracking-widest mb-6">
            Navigation
          </h4>
          <ul className="space-y-4">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/services", label: "Services" },
              { href: "/booking", label: "Booking" },
              { href: "/testimonials", label: "Testimonials" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-on-surface-variant/70 hover:text-secondary font-body text-sm transition-transform hover:translate-x-1 inline-block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-secondary font-bold uppercase text-xs tracking-widest mb-6">
            Connect
          </h4>
          <ul className="space-y-4">
            <li>
              <a
                href="tel:07425018335"
                className="text-on-surface-variant/70 hover:text-secondary font-body text-sm flex items-center"
              >
                <span className="material-symbols-outlined text-[16px] mr-2">
                  call
                </span>
                07425018335
              </a>
            </li>
            <li>
              <a
                href="mailto:zonedoutbeauty@gmail.com"
                className="text-on-surface-variant/70 hover:text-secondary font-body text-sm flex items-center"
              >
                <span className="material-symbols-outlined text-[16px] mr-2">
                  mail
                </span>
                zonedoutbeauty@gmail.com
              </a>
            </li>
            <li className="text-on-surface-variant/70 font-body text-sm flex items-start">
              <span className="material-symbols-outlined text-[16px] mr-2 mt-0.5">
                location_on
              </span>
              <span>Boscombe BH1 4ES</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-secondary font-bold uppercase text-xs tracking-widest mb-6">
            Legal
          </h4>
          <ul className="space-y-4">
            {[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Service" },
              { href: "/cookies", label: "Cookie Notice" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-on-surface-variant/70 hover:text-secondary font-body text-sm transition-transform hover:translate-x-1 inline-block"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-outline-variant/20 max-w-7xl mx-auto px-12 text-center">
        <p className="text-on-surface-variant/40 text-xs tracking-wide">
          &copy; {new Date().getFullYear()} Healing with Boo. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}

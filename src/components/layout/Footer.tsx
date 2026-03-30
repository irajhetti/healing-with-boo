import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary w-full pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="col-span-1">
          <span className="font-headline text-xl text-surface-container-low mb-4 block">
            Healing with Boo
          </span>
          <p className="text-surface-container/80 font-body text-sm mb-6 leading-relaxed">
            A sacred space for deep physical restoration and spiritual
            exploration in the heart of Boscombe.
          </p>
          <div className="flex space-x-4">
            <span className="material-symbols-outlined text-surface-container-low cursor-pointer hover:text-secondary">
              public
            </span>
            <span className="material-symbols-outlined text-surface-container-low cursor-pointer hover:text-secondary">
              nest_eco_leaf
            </span>
            <span className="material-symbols-outlined text-surface-container-low cursor-pointer hover:text-secondary">
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
              { href: "/blog", label: "Blog" },
              { href: "/testimonials", label: "Testimonials" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-surface-container-low/80 hover:text-secondary font-body text-sm transition-transform hover:translate-x-1 inline-block"
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
                className="text-surface-container-low/80 hover:text-secondary font-body text-sm flex items-center"
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
                className="text-surface-container-low/80 hover:text-secondary font-body text-sm flex items-center"
              >
                <span className="material-symbols-outlined text-[16px] mr-2">
                  mail
                </span>
                zonedoutbeauty@gmail.com
              </a>
            </li>
            <li className="text-surface-container-low/80 font-body text-sm flex items-start">
              <span className="material-symbols-outlined text-[16px] mr-2 mt-0.5">
                location_on
              </span>
              <span>
                Boscombe, Bournemouth
                <br />
                United Kingdom
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-secondary font-bold uppercase text-xs tracking-widest mb-6">
            Legal
          </h4>
          <ul className="space-y-4">
            {["Privacy Policy", "Terms of Service", "Cancellation Policy"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-surface-container-low/80 hover:text-secondary font-body text-sm transition-transform hover:translate-x-1 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-surface-container-low/10 max-w-7xl mx-auto px-12 text-center">
        <p className="text-surface-container/40 text-xs tracking-wide">
          &copy; {new Date().getFullYear()} Healing with Boo. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}

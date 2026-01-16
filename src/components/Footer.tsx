export default function Footer() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <footer className="bg-charcoal py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <img
            src={`${baseUrl}images/logo-circular.png`}
            alt="Solid Gear Designs"
            className="h-16 w-16 mb-6"
          />
          <div className="flex gap-6 text-gray-400 text-sm mb-4">
            <a href="#privacy" className="hover:text-copper transition-colors">
              Privacy
            </a>
            <span>|</span>
            <a href="#terms" className="hover:text-copper transition-colors">
              Terms
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Solid Gear Designs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

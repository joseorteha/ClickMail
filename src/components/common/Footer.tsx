const Footer = () => (
  <footer className="w-full bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100 py-4 mt-8">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-2 text-gray-600 text-sm">
      <span>© {new Date().getFullYear()} ClickMail. Todos los derechos reservados.</span>
      <div className="flex gap-3">
        <a href="#" className="hover:text-indigo-600">Twitter</a>
        <a href="#" className="hover:text-indigo-600">LinkedIn</a>
        <a href="#" className="hover:text-indigo-600">Instagram</a>
      </div>
    </div>
  </footer>
);

export default Footer; 
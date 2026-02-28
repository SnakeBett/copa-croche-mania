import { SITE } from "@/data/site";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-12 px-4">
    <div className="max-w-4xl mx-auto text-center space-y-6">
      <h3 className="text-xl font-display font-bold">Curso Copa Crochê Mania</h3>
      <nav className="flex justify-center gap-6 text-sm font-body opacity-70">
        <a href="#" className="hover:text-secondary transition-colors">Termos de uso</a>
        <a href="#" className="hover:text-secondary transition-colors">Política de privacidade</a>
      </nav>
      <p className="text-sm font-body opacity-50">
        Feito com carinho para quem ama criar 🧶⚽
      </p>
    </div>
  </footer>
);

export default Footer;

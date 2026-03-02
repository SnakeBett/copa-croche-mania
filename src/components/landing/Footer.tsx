const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-12 px-4">
    <div className="max-w-4xl mx-auto text-center space-y-6">
      <h3 className="text-xl font-display font-bold">Curso Copa Crochê Mania</h3>
      <nav className="flex justify-center gap-6 text-sm font-body opacity-70">
        <a href="#" className="hover:text-secondary transition-colors">Termos de uso</a>
        <a href="#" className="hover:text-secondary transition-colors">Política de privacidade</a>
      </nav>
      <p className="text-sm font-body opacity-50">
        Copyright &copy; 2026 | Todos os direitos reservados.
      </p>
      <p className="text-[10px] font-body opacity-40 max-w-2xl mx-auto leading-relaxed">
        Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook.
        Depois que você sair do Facebook, a responsabilidade não é deles e sim do nosso site.
        A compra desse material não garante nenhum tipo de resultado. Fazemos todos os esforços
        para indicar claramente e mostrar todas as provas do produto e usamos resultados reais de alunos.
        Os resultados podem variar de acordo com o esforço e dedicação de cada pessoa.
      </p>
    </div>
  </footer>
);

export default Footer;

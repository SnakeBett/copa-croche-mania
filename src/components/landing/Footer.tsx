const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-12 px-4">
    <div className="max-w-4xl mx-auto text-center space-y-6">
      <h3 className="text-xl font-display font-bold">Curso Copa Croche Mania</h3>
      <nav className="flex justify-center gap-6 text-sm font-body opacity-70">
        <a href="#" className="hover:text-secondary transition-colors">Termos de uso</a>
        <a href="#" className="hover:text-secondary transition-colors">Politica de privacidade</a>
      </nav>
      <p className="text-sm font-body opacity-50">
        Copyright &copy; 2026 | Todos os direitos reservados.
      </p>
      <p className="text-[10px] font-body opacity-40 max-w-2xl mx-auto leading-relaxed">
        Este site nao e afiliado ao Facebook ou a qualquer entidade do Facebook.
        Depois que voce sair do Facebook, a responsabilidade nao e deles e sim do nosso site.
        A compra desse material nao garante nenhum tipo de resultado. Fazemos todos os esforcos
        para indicar claramente e mostrar todas as provas do produto e usamos resultados reais de alunos.
        Os resultados podem variar de acordo com o esforco e dedicacao de cada pessoa.
      </p>
    </div>
  </footer>
);

export default Footer;

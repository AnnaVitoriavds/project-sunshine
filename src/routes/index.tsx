import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Instagram, MapPin, Menu, Phone, Star, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const whatsapp = "https://wa.me/5561999143292?text=" + encodeURIComponent("Olá! Vim pelo site do Studio Hair Cláudio Baltazar e gostaria de agendar um horário.");
const instagram = "https://www.instagram.com/claudiobaltazar2010/";
const directions = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Qd. 58, Lote 16 Rua 16, Loja 02 Jardim Oriente Valparaíso de Goiás GO 72870-213");

const photos = [
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1500&q=86",
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=84",
  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1200&q=84",
  "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=84",
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=84",
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=84",
];

const services = ["Corte de cabelo","Coloração & loiros","Tratamentos capilares","Design de sobrancelhas","Manicure","Pedicure","Penteados","Maquiagem","Tratamentos à base de carbocisteína"];
const reviews = [
  ["“Foi muito bom... profissional no trabalho que faz. Recomendo a todos.”","Rosemary Soares Gomes Rocha"],
  ["“Super indico, ótimo atendimento, ótimos profissionais.”","Claudia Silva"],
  ["“Minha primeira vez fui ao salão do Cláudio por indicação e amei.”","Angélica Alves"],
];

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [review, setReview] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [filter, setFilter] = useState("Todos");
  const [scrollY, setScrollY] = useState(0);
  const gallery = useMemo(() => filter === "Todos" ? photos : photos.slice((["Cortes","Loiros","Coloração","Penteados","Tratamentos"].indexOf(filter)+1)%3, 6), [filter]);

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 50); setScrollY(window.scrollY); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  const submitBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const message = `Olá! Vim pelo site do Studio Hair Cláudio Baltazar e gostaria de solicitar um agendamento.\
\
Nome: ${fd.get("nome") || ""}\
WhatsApp: ${fd.get("telefone") || ""}\
Serviço: ${fd.get("servico") || ""}\
Data: ${fd.get("data") || ""}\
Horário: ${fd.get("horario") || ""}\
Observações: ${fd.get("mensagem") || "Sem observações."}`;
    window.open(`https://wa.me/5561999143292?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return <main className="site-shell">
    <header className={"nav reference-nav " + (scrolled ? "nav-scrolled" : "")}>
      <a className="brand reference-brand" href="#inicio"><span>STUDIO</span><strong>HAIR</strong><b>CLÁUDIO BALTAZAR</b></a>
      <nav className="desktop-nav">{["Início","O Studio","Serviços","Transformações","Galeria","Avaliações","Contato"].map((x,i)=><a key={x} href={"#"+["inicio","studio","servicos","transformacoes","transformacoes","avaliacoes","contato"][i]}>{x}</a>)}</nav>
      <a className="nav-cta" href={whatsapp} target="_blank" rel="noreferrer">Agendar horário <ArrowRight size={15}/></a>
      <button className="menu-btn" onClick={()=>setMenu(true)} aria-label="Abrir menu"><Menu/></button>
    </header>

    {menu && <div className="mobile-menu"><button onClick={()=>setMenu(false)} aria-label="Fechar menu"><X/></button><div className="mobile-brand">STUDIO HAIR <em>CLÁUDIO BALTAZAR</em></div>{["Início","O Studio","Serviços","Transformações","Avaliações","Contato"].map((x,i)=><a onClick={()=>setMenu(false)} key={x} href={"#"+["inicio","studio","servicos","transformacoes","avaliacoes","contato"][i]}>{x}<ArrowRight/></a>)}</div>}

    <section id="inicio" className="hero reference-hero">
      <div className="hero-photo" style={{ transform: `translate3d(0, ${Math.min(scrollY * .12, 90)}px, 0) scale(1.08)` }}/>
      <div className="hero-shade"/>
      <div className="hero-side">VALPARAÍSO DE GOIÁS · BEAUTY STUDIO</div><div className="hero-frame"/>
      <div className="hero-content reveal is-visible">
        <p className="eyebrow">STUDIO HAIR · CLÁUDIO BALTAZAR</p>
        <h1>Sua beleza.<br/><i>Sua identidade.</i><br/>Seu momento.</h1>
        <p className="hero-kicker">Experiência de beleza 360°</p><div className="hero-copy-line"/><p className="hero-copy hero-reveal r5">Cortes, loiros, coloração, tratamentos e beleza — reunidos em uma experiência de cuidado, técnica e transformação.</p>
        <div className="hero-actions hero-reveal r6"><a className="btn-gold" href={whatsapp} target="_blank" rel="noreferrer">Agendar pelo WhatsApp <ArrowRight/></a><a className="btn-line" href="#studio">Conhecer o studio</a></div>
        <div className="hero-rating hero-reveal r7"><span>★★★★★</span><b>4,8 no Google</b><small>58 avaliações</small></div>
      </div>
      <a className="scroll-hint" href="#studio">ROLE PARA DESCOBRIR <ArrowDown/></a>
    </section>

    <div className="credibility reference-marquee"><div className="ticker"><span>4,8 ★ NO GOOGLE</span><i/> <span>58 AVALIAÇÕES</span><i/> <span>ATENDIMENTO PROFISSIONAL</span><i/> <span>VALPARAÍSO DE GOIÁS</span></div></div>

    <section id="studio" className="about section-pad"><div className="editorial-word" aria-hidden="true">ATELIER</div>
      <div className="about-visual reveal"><img src={photos[2]} alt="Experiência de beleza no Studio Hair" loading="lazy"/><span className="vertical-note">BELEZA · ESTILO · IDENTIDADE</span><div className="image-index">01</div></div>
      <div className="about-copy reveal"><p className="section-tag">01 / O STUDIO</p><h2>Beleza começa<br/>com <i>confiança.</i></h2><p>No Studio Hair Cláudio Baltazar, cada atendimento é pensado para valorizar a beleza, a personalidade e o estilo de cada cliente.</p><p>Técnica, experiência e cuidado se encontram em um ambiente dedicado a proporcionar transformações e momentos especiais.</p><blockquote>“Mais do que transformar cabelos,<br/> valorizamos pessoas.”</blockquote><div className="micro-stats"><span><b>4,8</b> Google</span><span><b>+58</b> avaliações</span><span><b>01:01</b> atendimento personalizado</span></div></div>
    </section>

    <section id="servicos" className="services section-pad"><div className="ghost-word" aria-hidden="true">BEAUTY</div>
      <div className="section-head reveal"><div><p className="section-tag">02 / SERVIÇOS</p><h2>Tudo para cuidar<br/>da sua <i>beleza.</i></h2></div><p>Experiência, técnica e cuidado reunidos em um só lugar.</p></div>
      <div className="service-list">{services.map((s,i)=><a className="service-row reveal" href={whatsapp} target="_blank" rel="noreferrer" key={s}><span>{String(i+1).padStart(2,"0")}</span><h3>{s}</h3><em>AGENDAR</em><ArrowRight/></a>)}</div>
    </section>

    <section id="transformacoes" className="gallery section-pad"><div className="gallery-rule"><span>STUDIO HAIR</span><i/><span>SELECTED WORK</span></div>
      <div className="section-head reveal"><div><p className="section-tag">03 / TRANSFORMAÇÕES</p><h2>Resultados que<br/><i>falam por si.</i></h2></div><p>Uma seleção visual de beleza, textura, cor e movimento.</p></div>
      <div className="filters">{["Todos","Cortes","Loiros","Coloração","Penteados","Tratamentos"].map(x=><button className={filter===x?"active":""} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div>
      <div className="masonry">{gallery.map((p,i)=><button className="gallery-item reveal" key={p+i} onClick={()=>setLightbox(photos.indexOf(p))}><img src={p} alt={"Transformação Studio Hair "+(i+1)} loading="lazy"/><span>VER TRABALHO <ArrowRight/></span></button>)}</div>
    </section>

    <section className="experience section-pad"><div className="experience-kicker">THE ART OF<br/>BEAUTY</div>
      <div className="experience-title reveal"><p className="section-tag dark-tag">A EXPERIÊNCIA</p><h2>Cada detalhe faz<br/>parte da <i>experiência.</i></h2></div>
      <div className="experience-grid">{[["01","ATENDIMENTO","Escutamos você antes de qualquer transformação."],["02","TÉCNICA","Experiência e conhecimento aplicados em cada procedimento."],["03","CUIDADO","Produtos e técnicas pensados para preservar a saúde e beleza."],["04","RESULTADO","Um visual desenvolvido para valorizar sua personalidade."]].map(x=><article className="experience-item reveal" key={x[0]}><b>{x[0]}</b><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div>
    </section>

    <section id="avaliacoes" className="reviews section-pad"><div className="reviews-index">04</div>
      <div className="rating-block reveal"><p className="section-tag">04 / EXPERIÊNCIAS</p><div className="rating-number">4,8</div><div className="stars">★★★★★</div><p>58 avaliações no Google</p></div>
      <div className="review-slider reveal"><h2>Quem conhece,<br/><i>recomenda.</i></h2><div className="quote-mark">“</div><blockquote>{reviews[review]?.[0]}</blockquote><p>— {reviews[review]?.[1]}</p><div className="slider-controls"><button onClick={()=>setReview((review+2)%3)} aria-label="Anterior"><ChevronLeft/></button><span>{String(review+1).padStart(2,"0")} / 03</span><button onClick={()=>setReview((review+1)%3)} aria-label="Próximo"><ChevronRight/></button></div></div>
    </section>

    <section className="instagram-section section-pad">
      <div className="insta-head reveal"><div><p className="section-tag dark-tag">SOCIAL</p><h2>Siga nossas<br/><i>transformações.</i></h2></div><a href={instagram} target="_blank" rel="noreferrer"><Instagram/> @claudiobaltazar2010 <ArrowRight/></a></div>
      <div className="insta-grid">{photos.slice(1,5).map((p,i)=><a href={instagram} target="_blank" rel="noreferrer" key={p} className="insta-tile reveal"><img src={p} loading="lazy" alt={"Studio Hair no Instagram "+(i+1)}/><span>VER NO INSTAGRAM ↗</span></a>)}</div>
    </section>

    <section id="agendamento" className="booking section-pad">
      <div className="booking-art reveal">
        <img src={photos[5]} alt="Experiência Studio Hair Cláudio Baltazar" loading="lazy"/>
        <div className="booking-art-shade"/>
        <div className="booking-art-copy"><span>PRIVATE APPOINTMENT</span><p>Um momento pensado<br/>especialmente para você.</p></div>
        <div className="booking-number">05</div>
      </div>
      <div className="booking-form-wrap reveal">
        <p className="section-tag">AGENDAMENTO / CONTATO</p>
        <h2>Vamos cuidar<br/><i>de você?</i></h2>
        <p className="booking-intro">Preencha seus dados e fale com o Studio Hair Cláudio Baltazar.</p>
        <form className="booking-form" onSubmit={submitBooking}>
          <label className="field field-wide"><span>Nome completo</span><input name="nome" type="text" placeholder="Seu nome" required autoComplete="name"/></label>
          <label className="field"><span>WhatsApp</span><input name="telefone" type="tel" placeholder="(61) 9 9999-9999" required autoComplete="tel"/></label>
          <label className="field"><span>Serviço desejado</span><select name="servico" required defaultValue=""><option value="" disabled>Selecione</option><option>Corte</option><option>Coloração/Loiros</option><option>Tratamento Capilar</option><option>Design de Sobrancelhas</option><option>Manicure</option><option>Pedicure</option><option>Penteado</option><option>Maquiagem</option><option>Outros</option></select></label>
          <label className="field"><span>Data desejada</span><input name="data" type="date" required/></label>
          <label className="field"><span>Horário de preferência</span><input name="horario" type="time" required/></label>
          <label className="field field-wide"><span>Mensagem / observações</span><textarea name="mensagem" rows={3} placeholder="Conte-nos algum detalhe importante..."/></label>
          <button className="booking-submit field-wide" type="submit"><span>Solicitar agendamento</span><ArrowRight/></button>
        </form>
        <div className="booking-foot"><span>01</span><p>Ao enviar, sua solicitação será organizada e aberta diretamente no WhatsApp do Studio.</p></div>
      </div>
    </section>

    <section className="big-cta"><div className="cta-caption">VALPARAÍSO · GO <span>EST. BEAUTY EXPERIENCE</span></div><div className="cta-photo"/><div className="cta-overlay"/><div className="cta-copy reveal"><p className="section-tag">SEU MOMENTO</p><h2>Pronto para<br/>uma nova versão<br/><i>de você?</i></h2><p>Reserve seu horário e viva a experiência Studio Hair Cláudio Baltazar.</p><a className="btn-gold" href={whatsapp} target="_blank" rel="noreferrer">Agendar pelo WhatsApp <ArrowRight/></a><a className="phone-link" href="tel:+556136272800"><Phone/> (61) 3627-2800</a></div></section>

    <section id="contato" className="location section-pad">
      <div className="location-copy reveal"><p className="section-tag dark-tag">05 / VISITE O STUDIO</p><h2>Seu momento<br/><i>começa aqui.</i></h2><h3>Studio Hair Cláudio Baltazar</h3><p>Qd. 58, Lote 16 · Rua 16, Loja 02<br/>Jardim Oriente · Valparaíso de Goiás – GO<br/>CEP 72870-213</p><div className="location-rating"><Star fill="currentColor"/> <b>4,8 no Google</b> · 58 avaliações</div><div className="location-actions"><a href={directions} target="_blank" rel="noreferrer">Como chegar <MapPin/></a><a href={whatsapp} target="_blank" rel="noreferrer">Agendar horário <ArrowRight/></a></div></div>
      <div className="map-wrap reveal"><iframe title="Mapa do Studio Hair Cláudio Baltazar" loading="lazy" src={"https://www.google.com/maps?q="+encodeURIComponent("Qd. 58 Lote 16 Rua 16 Loja 02 Jardim Oriente Valparaíso de Goiás GO 72870-213")+"&output=embed"}/></div>
    </section>

    <footer><div className="footer-top"><div className="footer-brand">STUDIO HAIR<em>CLÁUDIO BALTAZAR</em><small>Beleza · Estilo · Identidade</small></div><div className="footer-contact"><span>CONTATO</span><a href="tel:+556136272800">(61) 3627-2800</a><a href={whatsapp} target="_blank" rel="noreferrer">(61) 9 9914-3292</a><a href={instagram} target="_blank" rel="noreferrer">@claudiobaltazar2010</a></div><div className="footer-contact"><span>NAVEGAÇÃO</span><a href="#studio">O Studio</a><a href="#servicos">Serviços</a><a href="#transformacoes">Galeria</a><a href="#avaliacoes">Avaliações</a></div></div><div className="footer-bottom"><span>© 2026 Studio Hair Cláudio Baltazar. Todos os direitos reservados.</span><a href="#inicio">VOLTAR AO TOPO ↑</a></div></footer>

    <a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Agendar pelo WhatsApp"><span className="wa-icon">◔</span><b>Agendar horário</b></a>

    {lightbox !== null && <div className="lightbox" onClick={()=>setLightbox(null)}><button aria-label="Fechar"><X/></button><img src={photos[lightbox]} alt="Trabalho Studio Hair ampliado"/></div>}
  </main>;
}

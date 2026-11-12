const CONFIG = {
  nome: "meu Amor",
  //(AAAA-MM-DDTHH:MM:SS)
  inicioNamoro: "2025-12-19T00:00:00",

  subtitulo: "Hoje é o dia da minha princesaaaaa. Saiba que te amo muito, e preparei com muito amor.",
  capa: { src: "fotos/capa.jpg", legenda: "A minha amada Riri", pos: "50% 35%" },

  carta: {
    titulo: "Pra ti meu amor",
    paragrafos: [
      "Em primeiro lugar quero agradecer a Deus por ter te guardado ate aqui e por nos colocar na vida um do outro.",
       "E desejar-te um feliz aniversário meu amor, que continues sendo essa mulher alegre determinada e que sempre esta la pra ajudar.",
       "Tu tens sido um grande suporte na minha vida, me fizeste crescer em várias vertentes.",
      " E contigo os dias normais ficam mais leves e os difíceis ficam melhores. O teu jeito de rir, de cuidar e de me olhar me faz querer ser melhor todos os dias.",
      "Este é um pequeno pedaço de tudo o que sinto. Espero que te faça sorrir o tanto quanto tu me fazes."
    ],
    assinatura: "Tuqburni amor, Plínio..."
  },

  /* Nossos momentos juntos (fotos e vídeos) */
  nos: {
    titulo: "Um pouco da nossa história",
    intro: "Alguns momentos nossos que eu levarei comigo pra sempre.",
    itens: [
      { tipo: "foto", src: "fotos/nos-1.jpg", legenda: "No Centenário, onde tudo foi fluindo", pos: "50% 40%" },
      { tipo: "video", src: "videos/nos-video-1.mp4", poster: "fotos/nos-video-1-capa.jpg", legenda: "Quem diria que hoje seriamos esse casal." },
      { tipo: "video", src: "videos/nos-video-2.mp4", poster: "fotos/nos-video-2-capa.jpg", legenda: "O dia mais dolorido e do melhor abraço" }
    ]
  },

  /* ELA */
  ela: {
    titulo: "Tu és muito linda",
    mensagem: [
      "Agradeço por sempre fazeres parte da minha vida e por estares aqui sempre que mais precisei.",
      "E eu sempre vou cuidar de ti meu amor."
    ],
    itens: [
      { tipo: "foto", src: "fotos/ela-01.jpg", legenda: "O sorriso que me alegra", pos: "50% 40%" },
      { tipo: "foto", src: "fotos/ela-02.jpg", legenda: "Como é linda a minha namorada", pos: "50% 30%" },
      { tipo: "foto", src: "fotos/ela-03.jpg", legenda: "Sempre brilhando", pos: "50% 45%" },
      { tipo: "foto", src: "fotos/ela-05.jpg", legenda: "Sempre elegante", pos: "50% 20%" },
      { tipo: "foto", src: "fotos/ela-06.jpg", legenda: "No pique profissional", pos: "50% 35%" },
      { tipo: "foto", src: "fotos/ela-07.jpg", legenda: "A minha linda natural", pos: "50% 45%" },
      { tipo: "foto", src: "fotos/ela-08.jpg", legenda: "Binhada kkskskks", pos: "50% 70%" },
      { tipo: "foto", src: "fotos/ela-09.jpg", legenda: "O sono que nao acaba", pos: "50% 55%" },
      { tipo: "foto", src: "fotos/ela-12.jpg", legenda: "Hora de estar gangsta", pos: "50% 35%" },
      { tipo: "foto", src: "fotos/ela-13.jpg", legenda: "A blogueira", pos: "50% 40%" },
      { tipo: "video", src: "videos/ela-video-1.mp4", poster: "fotos/ela-video-1-capa.jpg", legenda: " E tudo isso é a minha mulher, a rainha suprema da minha vida" }
    ]
  },

  contador: {
    titulo: "E aqui temos o tempo juntos, de onde nós decidimos marcar (Dia 19 de Dezembro de 2025)",
    mensagemFinal: "E que este contador nunca pare. Feliz aniversário, meu amor."
  },

  rodape: "Feito com carinho, só pra ti ♥"
};

const $ = (id) => document.getElementById(id);

function el(tag, classe, texto) {
  const e = document.createElement(tag);
  if (classe) e.className = classe;
  if (texto) e.textContent = texto;
  return e;
}

function criarImagem(item, alt, caixa) {
  const img = document.createElement("img");
  img.src = item.src;
  img.alt = alt;
  img.loading = "lazy";
  if (item.pos) img.style.objectPosition = item.pos;
  img.addEventListener("error", () => {
    caixa.classList.add("sem-foto");
    img.remove();
  });
  return img;
}

const videos = [];
function criarVideo(item, alt, caixa) {
  const v = document.createElement("video");
  v.controls = true;
  v.playsInline = true;
  v.preload = "metadata";
  if (item.poster) v.poster = item.poster;
  v.setAttribute("aria-label", alt);
  const s = document.createElement("source");
  s.src = item.src;
  s.type = "video/mp4";
  v.appendChild(s);
  s.addEventListener("error", () => {
    caixa.classList.add("sem-foto");
    v.remove();
  });

  //play de um por vez
  v.addEventListener("play", () => videos.forEach((o) => { if (o !== v) o.pause(); }));
  videos.push(v);
  return v;
}

function midia(item, alt, caixa) {
  return item.tipo === "video" ? criarVideo(item, alt, caixa) : criarImagem(item, alt, caixa);
}

function polaroid(item, alt) {
  const fig = el("figure", "polaroid");
  const moldura = el("div", item.tipo === "video" ? "moldura video" : "moldura");
  moldura.appendChild(midia(item, alt, fig));
  fig.appendChild(moldura);
  fig.appendChild(el("figcaption", "", item.legenda));
  return fig;
}

function arco(item, alt) {
  const bloco = el("figure", "arco");
  const moldura = el("div", item.tipo === "video" ? "arco-moldura video" : "arco-moldura");
  moldura.appendChild(midia(item, alt, moldura));
  bloco.appendChild(moldura);
  bloco.appendChild(el("p", "", item.legenda));
  return bloco;
}

/* Textos */
document.title = "Feliz aniversário, " + CONFIG.nome;
$("titulo").textContent = "Feliz aniversário, " + CONFIG.nome;
$("subtitulo").textContent = CONFIG.subtitulo;
$("rodape").textContent = CONFIG.rodape;

/* Capa*/
const capa = $("capa");
const capaMoldura = el("div", "moldura");
capaMoldura.appendChild(criarImagem(CONFIG.capa, CONFIG.capa.alt, capa));
capa.appendChild(capaMoldura);
capa.appendChild(el("figcaption", "", CONFIG.capa.legenda));

/* Carta */
$("carta-titulo").textContent = CONFIG.carta.titulo;
CONFIG.carta.paragrafos.forEach((p) => $("carta-texto").appendChild(el("p", "", p)));
$("carta-assinatura").textContent = CONFIG.carta.assinatura;

/* Nos */
$("nos-titulo").textContent = CONFIG.nos.titulo;
$("nos-intro").textContent = CONFIG.nos.intro;
CONFIG.nos.itens.forEach((it) => {
  $("mural-nos").appendChild(polaroid(it, "Nós dois: " + it.legenda));
});

/* Ela */
$("ela-titulo").textContent = CONFIG.ela.titulo;
CONFIG.ela.mensagem.forEach((p) => $("ela-texto").appendChild(el("p", "", p)));
CONFIG.ela.itens.forEach((it) => {
  $("arcos-ela").appendChild(arco(it, "Ela: " + it.legenda));
});

/* Contador */
$("contador-titulo").textContent = CONFIG.contador.titulo;
$("mensagem-final").textContent = CONFIG.contador.mensagemFinal;

const inicio = new Date(CONFIG.inicioNamoro);
const unidades = ["anos", "meses", "dias", "horas", "minutos", "segundos"];
const singulares = { anos: "ano", meses: "mês", dias: "dia", horas: "hora", minutos: "minuto", segundos: "segundo" };
const caixasTempo = {};
unidades.forEach((u) => {
  const d = el("div");
  const n = el("strong", "", "0");
  const rotulo = el("span", "", u);
  d.appendChild(n);
  d.appendChild(rotulo);
  $("tempo").appendChild(d);
  caixasTempo[u] = { n, rotulo };
});

function calcularTempo() {
  const agora = new Date();
  if (agora < inicio) return null;

  let cursor = new Date(inicio);
  let anos = 0;
  let meses = 0;

  let prox = new Date(cursor);
  prox.setFullYear(prox.getFullYear() + 1);
  while (prox <= agora) {
    cursor = prox;
    anos++;
    prox = new Date(cursor);
    prox.setFullYear(prox.getFullYear() + 1);
  }

  prox = new Date(cursor);
  prox.setMonth(prox.getMonth() + 1);
  while (prox <= agora) {
    cursor = prox;
    meses++;
    prox = new Date(cursor);
    prox.setMonth(prox.getMonth() + 1);
  }

  let resto = Math.floor((agora - cursor) / 1000);
  const dias = Math.floor(resto / 86400); resto %= 86400;
  const horas = Math.floor(resto / 3600); resto %= 3600;
  const minutos = Math.floor(resto / 60);
  const segundos = resto % 60;

  return { anos, meses, dias, horas, minutos, segundos };
}

function atualizarTempo() {
  const t = calcularTempo();
  if (!t) return;
  unidades.forEach((u) => {
    caixasTempo[u].n.textContent = t[u];
    caixasTempo[u].rotulo.textContent = t[u] === 1 ? singulares[u] : u;
  });
}
atualizarTempo();
setInterval(atualizarTempo, 1000);

/* Chuva de pétalas */
(function petalas() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const caixa = $("petalas");
  for (let i = 0; i < 26; i++) {
    const p = el("span", "petala");
    const tam = 10 + Math.random() * 14;
    p.style.width = tam + "px";
    p.style.height = tam + "px";
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = 6 + Math.random() * 5 + "s";
    p.style.animationDelay = Math.random() * 3 + "s";
    p.style.setProperty("--deriva", (Math.random() * 140 - 70) + "px");
    p.style.setProperty("--giro", (Math.random() * 720 - 360) + "deg");
    caixa.appendChild(p);
  }
  setTimeout(() => caixa.remove(), 25000);
})();

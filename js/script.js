document.addEventListener('DOMContentLoaded', () => {

  'use strict';

  /* =========================================================
     0. BIBLIOTECAS (com fallback gracioso)
     ========================================================= */
  const temGSAP = typeof gsap !== 'undefined';
  const temST = temGSAP && typeof ScrollTrigger !== 'undefined';
  const temLenis = typeof Lenis !== 'undefined';
  const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // As animações de entrada fazem parte do conceito do site: mantidas mesmo
  // quando o navegador sinaliza movimento reduzido (apenas loops são silenciados no CSS).
  const anima = temGSAP;

  if (temST) gsap.registerPlugin(ScrollTrigger);

  /* =========================================================
     1. DADOS — MOLDE (sem textos reais)
     ➜ Preencha aqui. Os títulos das ABAS ficam no HTML.
     ========================================================= */

  // Aba direita: 17 redações (imagens permitidas — molde)
    const REDACOES_MOLDE = [
    { 
      id: 1, 
      titulo: 'Mudanças climáticas e a crise hídrica no Brasil', 
      tema: 'Quando a seca encontra a enchente: impactos sociais e econômicos das mudanças no ciclo hidrológico', 
      categoria: 'Meio Ambiente', 
      imagem: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80', 
      texto: 'Na mitologia grega, é contada a história de Pandora e sua caixa. Diz-se que toda maldade do mundo saiu da caixa de Pandora. Atualmente parece que esta caixa é a do clima, visto que a crise hídrica vivida no Brasil se tornou a nova maldade de Pandora, ora com secas históricas, ora com chuvas catastróficas. O caos criado pela falta de planejamento das cidades e a fragilidade do agronegócio brasileiro são reflexos diretos dessa crise socioeconômica que tem se intensificado.\n\nPrimeiramente, a ideia de que a chuva traz vida não se aplica mais às cidades. Ela agora se transformou numa tragédia. E isso ocorre porque, como já havia advertido Milton Santos, o crescimento desordenado das cidades é perigoso. O solo, impermeabilizado pelos exageros de asfalto, não consegue mais escoar a água, que, então, entra nas casas. Os moradores de áreas de risco, geralmente populares, sem estrutura básica de infraestrutura, sofrem mais com as enchentes, perdas materiais e doenças.\n\nNo campo a situação não é diferente. A falta de chuva por longos períodos provoca o desaparecimento das plantações. O resultado é o aumento do preço do alimento na mesa do brasileiro. A obra "Vidas Secas", de Graciliano Ramos, nunca saiu de moda. A seca continua obrigando milhares de pessoas a buscarem sobrevivência nas grandes cidades. O agronegócio vem sofrendo prejuízos bilionários. O efeito dominó se instala na inflação e no desemprego.\n\nDiante do exposto, fica claro que a necessidade de adaptação é urgente. É preciso que o governo, junto com o Ministério do Meio Ambiente, invista em sistemas de drenagem nas cidades. Também deve criar fundos de ajuda emergencial para os pequenos agricultores. As campanhas de conscientização sobre o uso da água devem começar em casa e nas escolas. O futuro depende do que fazemos hoje.' 
    },
    { 
      id: 2, 
      titulo: 'Canetas emagrecedoras e a pressão estética', 
      tema: 'A estética como imperativo: riscos e implicações do uso indiscriminado de canetas emagrecedoras', 
      categoria: 'Sociedade', 
      imagem: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80', 
      texto: 'No livro "O Retrato de Dorian Gray", de Oscar Wilde, o protagonista é um homem que se vê dominado pela obsessão de possuir uma beleza perpétua. O seu desejo desenfreado pelo que é belo traz consigo a ruína do personagem. Em tempos atuais, esse livro parece ter tomado conta do mundo real, pois a popularização das canetas emagrecedoras parece ser um reflexo da obra de Wilde. Em virtude disso, muitos brasileiros estão colocando suas vidas em jogo com o objetivo de obter um corpo perfeito. Tal fato denota uma grave crise de saúde que assola a população mundial.\n\nEm primeiro plano, o mundo virtual foi um solo fértil para a criação de uma obsessão pelo corpo. Como afirmou o filósofo Michel Foucault, a sociedade sempre controlou os corpos. Atualmente, isso é feito através de algoritmos e fotos fortemente manipuladas. A consequência disso é que muitos indivíduos se submetem a um consumo desenfreado dessas canetas (muitas delas obtidas de forma ilegal) em busca de um corpo transformado rapidamente. Mas o que não é visto é que o preço a ser pago é altíssimo. As pessoas acabam sofrendo graves problemas metabólicos, problemas cardíacos enormes e transtornos alimentares.\n\nEm segundo plano, a pressão psicológica contribui bastante para esse problema. O mito de Narciso, que se via fascinado pelo seu próprio reflexo, retrata exatamente o que ocorre hoje. Jovens se isolam em busca de algo que nunca será alcançado. Eles são constantemente bombardeados por corpos irreais. Isso gera ansiedade, depressão e leva os sujeitos a prejudicarem seus próprios corpos em nome de um padrão de beleza comercial determinado. Nenhuma preocupação é levada em conta quanto às consequências irreversíveis.\n\nPor fim, a Anvisa e o Ministério da Saúde precisam reforçar a luta contra a venda irregular destas fármacos. Isso pode ser feito através de sanções financeiras rigorosas. A maior mudança, porém, precisa vir da educação. As escolas precisam criar espaços para que conferências com psicólogos sejam feitas. Além disso, elas precisam falar abertamente sobre a diversidade de corpos. É necessário que os jovens saibam que nada substitui a saúde e a autoestima.' 
    },
    { 
      id: 3, 
      titulo: 'Deepfakes e desinformação na era da IA', 
      tema: 'O uso da Inteligência Artificial e as deepfakes: o que é real e o que é fictício na vida online?', 
      categoria: 'Tecnologia', 
      imagem: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80', 
      texto: 'Todos que assistiram ao filme Matrix lembram-se da cena marcante em que um homem passa uma pílula vermelha para outro alegando que a realidade pode ser, de fato, um grande ilusionismo. Na contemporaneidade, com o advento das deepfakes na era da Inteligência artificial, a metáfora ganhou nuances assustadoras. O que antes era uma linha tênue entre o real e a ficção atualmente ameaça a credibilidade das pessoas e, também, as próprias dinâmicas da democracia.\n\nNão obstante, a manipulação da verdade não é algo recente. A tecnologia apenas deu poder a esse processo. Em 2016, o Dicionário Oxford escolheu “pós-verdade” como palavra do ano justamente para caracterizar que a realidade objetiva foi substituída por apelos à emoção ou crendices individuais. As deepfakes permitem que discursos falsos de figuras públicas sejam criados, visando, seja, a manipular pleitos, seja, a incitar a violência. O cidadão comum está totalmente exposto às telas sem qualquer forma de se proteger contra a falsificação.\n\nAlém do problema político, as deepfakes têm sido utilizadas para gerar uma economia do crime. O Efeito Bumerangue é um conceito sociológico que define que as consequências de um determinado ato retornam para quem o realizou. Nesse contexto, criminosos usam a voz clonada de parentes para extorquir dinheiro deles. A credibilidade nas comunicações digitais vem sendo desmontada e as vítimas ficam desassistidas tendo que arcar com prejuízos materiais e irrecuperáveis no âmbito emocional.\n\nNão há espaço para omissão. É necessário que o Estado crie leis severas para que a criação maliciosa de deepfakes seja crime. Além disso, as plataformas digitais devem investir em sistemas que possam detectar tal prática. Também, cabe às instituições educacionais investirem na literacia digital, para que os jovens saibam questionar o que consumem na internet, e não aceitem como verdadeiro tudo o que ela expõe.' 
    },
    { 
      id: 4, 
      titulo: 'Bets e o endividamento dos jovens', 
      tema: 'Da diversão ao endividamento: efeitos socioeconômicos das bets na vida de jovens brasileiros', 
      categoria: 'Sociedade', 
      imagem: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80', 
      texto: 'Na obra "Casa de Bonecas", de Henrik Ibsen, é retratada a destruição de uma família através de aparências e decisões irracionais de investimentos. O drama do escritor norueguês poderia ser aplicado à realidade brasileira atual em que, devido ao crescimento das "bets" (apostas esportivas), milhares de jovens estão sendo levados à falência. As "bets" são apresentadas como um lazer acessível e acabam se tornando uma epidemia de dividas e vicio. O papel do Estado é urgente na solução desse problema.\n\nA forma predatória de marketing é a principal responsável pelo aliciamento dessas empresas. Segundo a teoria do "Nudge" (empurrão) de Richard Thaler, os gatilhos psicológicos usados pelos influenciadores digitais para manipular o comportamento de seus seguidores são bem nítidos. Eles convencem os jovens que essa forma de obtenção de dinheiro rápido é um meio para ascender socialmente, não revelando as estatísticas de perdas. Na verdade, isso é o início de um grande buraco de dívida com os agiotas.\n\nCom o fim dos recursos, toda a família é afetada. Segundo Marx, o trabalhador sofre alienação pois não pode usufruir do produto de seu trabalho. Essa alienação acontece em poucos segundos, quando o jovem vê seu salário árduo sendo consumido pelos algoritmos das plataformas de "bets". A falta de ensino financeiro nas escolas permite que essa vulnerabilidade continue existindo. Assim, a indústria do vício ameaça a sanidade mental e a situação econômica de incontáveis famílias.\n\nPortanto, é necessário que o governo federal tome atitudes enérgicas. É imprescindível que haja a censura às propagandas feitas por influenciadores digitais dessas plataformas. Além disso, é necessário que o Ministério da Educação insira o ensino financeiro como matéria obrigatória na grade curricular. O melhor plano para garantir o futuro financeiro do país é preparar os jovens para gerenciarem seus recursos e saberem das armadilhas do vício.' 
    },
    { 
      id: 5, 
      titulo: 'Inclusão digital no Brasil', 
      tema: 'Inclusão digital no Brasil: caminhos e desafios na sociedade contemporânea', 
      categoria: 'Tecnologia', 
      imagem: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80', 
      texto: 'Na Grécia antiga, o filósofo Sócrates temia que a criação da escrita enfraquecesse a memória. Hoje, se observarmos o impacto da tecnologia na sociedade, veremos que a preocupação é outra existe uma nova categoria de analfabetos que surgiu: os analfabetos do século XXI. A exclusão digital vem gerando essa realidade.\n\nPrimeiramente, as dificuldades de infraestrutura vêm sendo um grande problema. Ainda que o Marco Civil da Internet (Lei 12.965/2014) garanta o acesso à internet como direito fundamental, a realidade mostra-se outra. As regiões periféricas e rurais não são atendidas pela rede. Isso significa que esse grupo de pessoas não consegue usufruir de serviços públicos, não pode fazer cursos online e sequer buscar um emprego formal —todos os processos de recrutamento estão definitivamente online.\n\nMas, além do problema de infraestrutura (cabos e aparelhos móveis), existe outro grande problema: a falta de conhecimento. Como dizia o educador Paulo Freire, "Educação é a prática da liberdade". E no espaço digital não basta ter um aparelho para navegar. É necessário saber fazê-lo criticamente. Sem o letramento digital, o indivíduo fica exposto a golpes, fake news e à alienação. É incapaz de usar o instrumento para melhorar sua vida.\n\nTodavia, a inclusão digital não pode ser parcial. É necessário que o poder público, junto das escolas, providencie internet de alta velocidade (fibra ótica) para as comunidades carentes. É importante também a distribuição de equipamentos. Mas mais importante que isso tudo é capacitar docentes e discentes, para que a tecnologia deixe de ser fator de exclusão e se torne uma verdadeira ponte para o conhecimento e para a emancipação.' 
    },
    { 
      id: 6, 
      titulo: 'Cultura fitness e transtornos corporais', 
      tema: 'Cultura fitness: bem-estar ou busca por estética inatingível?', 
      categoria: 'Sociedade', 
      imagem: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80', 
      texto: 'A figura de Apolo, na mitologia grega, representava a beleza e a perfeição física. Na atualidade, o que antigamente era admirado nas estátuas transformou-se numa ditadura nas redes sociais. A cultura do fitness, que deveria ser apenas uma forma de incentivar a prática de exercícios físicos para manter a saúde, se tornou um problema grave: muitas vezes é vistada como uma doença obsessiva, levando aos jovens transtornos como vigorexia e ortorexia na busca de um padrão impossível de se conseguir.\n\nEm primeiro lugar, é preciso entender a diferença entre estar atento ao seu corpo e se render à imagem. O exercício físico é um direito, mas, quando o espelho se transforma em um opositor, a saúde se perde. Na teoria de Michel Foucault, “corpo dócil” é definido como aquele que se submete à sociedade. Hoje, o jovem não pratica mais por prazer e saúde, mas sim para se enquadrar a um padrão de corpo musculoso e dieta imposta pelas telas.\n\nAlém disso, o mundo virtual intensifica esse sentimento de insatisfação constante. Na obra de Naomi Wolf ‘’O Mito da Beleza’’, é mostrado como a indústria se lucra na insegurança do outro. As pessoas são expostas a imagens editadas, além de usarem anabolizantes sem receita médica, prejudicando órgãos vitais e levando a sérias situações de depressão e ansiedade. Tudo isso acontece sob o disfarce de que, um dia, serão aceitos pela sociedade.\n\nPortanto, precisa haver uma mudança na visão de saúde nas escolas. Os professores e psicólogos devem incentivar as rodas de conversas sobre a diversidade de corpos e autoconhecimento, mostrando que não há corpo errado. Além disso, o Ministério da Saúde deve criar campanhas alertando sobre os riscos dos transtornos alimentares e do uso abusivo de anabolizantes. O verdadeiro bem-estar não é uma questão de beleza, mas de equilíbrio.' 
    },
    { 
      id: 7, 
      titulo: 'Direitos indígenas e demarcação de terras', 
      tema: 'Povos originários e direitos constitucionais: desafios para a efetivação da cidadania indígena no Brasil', 
      categoria: 'Sociedade', 
      imagem: 'https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&w=600&q=80', 
      texto: 'José de Alencar, em sua obra “O Guarani”, retrata o índio Peri como um herói romântico, que obedece às vontades do colonizador. Entretanto, o indígena retratado pelo autor é muito diferente daquele que se encontra atualmente. Os povos originários lutam incansavelmente para preservar a vida e seus territórios. O problema do conflito fundiário no Brasil ainda marca profundamente a história do país e coloca em xeque a cidadania e o direito à vida dos povos indígenas.\n\nSobretudo, a ganância econômica é um grande impulsionador dessa barbárie. Aníbal Quijano, sociólogo, criou o conceito “Colonialidade do Poder” para explicar como as relações de dominação e exploração, criadas no período colonial, permanecem até hoje. A expansão da chamada “fronteira agrícola” e o garimpo ilegal invadem territórios já homologados, matando líderes e contaminando rios. O território indígena não é visto como direito originário. Ele é visto como um obstáculo ao “progresso” econômico.\n\nAlém disso, os povos indígenas sofrem com a falta de políticas públicas que respeitem sua cultura. A Convenção 169 da Organização Internacional do Trabalho (OIT) obriga que os povos indígenas sejam consultados antes de qualquer medida que afete sua vida. Isso nunca acontece. Além disso, a saúde e a educação prestada a essa população são ruins e desrespeitosas. Elas ignoram a medicina tradicional e as línguas nativas. Isso contribui para que esses povos continuem excluídos e abandonados.\n\nPortanto, faz-se necessário que o Estado tome providências para que esses povos possam continuar existindo. É fundamental que a FUNAI e o IBAMA sejam fortalecidos para que possam fazer valer a lei e punir invasores. A Lei 11.645/08 também deve ser cumprida de fato para que a história e a cultura dos povos indígenas sejam ensinadas nas escolas. Isso visa a desconstruir o preconceito. Apenas assim, os povos originários deixarão de ser lembrados como algo do passado e serão tratados como cidadãos de hoje.' 
    },
    { 
      id: 8, 
      titulo: 'Algoritmos, bolhas e autonomia individual', 
      tema: 'Consumo, mídia e cultura: como referências mediadas por algoritmos influenciam os modos de vida na sociedade contemporânea', 
      categoria: 'Tecnologia', 
      imagem: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80', 
      texto: 'No livro “Fahrenheit 451”, da autoria de Ray Bradbury, os bombeiros não combatem incêndios, eles queimam livros para que as pessoas não pensem. Hoje em dia o fogo já não é mais literal, as redes sociais possuem algoritmos que selecionam as informações que chegam até a pessoa, isso gera bolhas de informação nas quais as pessoas só assistem a informações que elas já acreditam. Isso não é progresso, isso é perigoso, pois as pessoas continuam alienadas e vulneráveis a qualquer tipo de manipulação, seja ela de consumo ou de opinião.\n\nA formação dessas bolhas de informações fragiliza o debate democrático. Eli Pariser criou o termo “Câmara de Eco” para explicar que os algoritmos nos isolam e nos dão a sensação de que há um consenso. As pessoas pensam que todo mundo está de acordo, pois só veem pessoas que pensam igual a elas. Com isso temos uma polarização extrema, no qual as fake news e os discursos de ódio ganham espaço, pois eles são disseminados rapidamente e não são contestados.\n\nAlém do mais, o consumismo desenfreado é incentivado pelos influenciadores. Shoshana Zuboff criou o termo “Capitalismo de Vigilância” para explicar que utilizam os dados das pessoas para vendê-las produtos. Nas redes sociais as pessoas assistem a vidas montadas de sucesso e luxo, o indivíduo se sente frustrado e começa a comprar compulsivamente para atingir o padrão. O que importa não é o que somos, mas sim o que consumimos.\n\nPara quebrar esse ciclo é necessário que a escola ensine educação midiática. É necessário que os alunos saibam questionar os algoritmos, buscar diferentes fontes de informação e consumir conscientemente. Além disso é necessário que o poder público regule essas plataformas e exija que elas informem os critérios que usam para filtrar os conteúdos. A tecnologia precisa ser aliada da liberdade, não uma jaula invisível.' 
    },
    { 
      id: 9, 
      titulo: 'Preservação do patrimônio histórico', 
      tema: 'Os desafios para a preservação dos monumentos históricos no Brasil contemporâneo', 
      categoria: 'Sociedade', 
      imagem: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=600&q=80', 
      texto: 'Para Maurice Halbwachs, autor da Teoria da Memória Coletiva, são necessárias referências no espaço que permitam à coletividade construir e manter seu passado. No Brasil, os monumentos assumem esse papel; contudo, devido à falta de cuidado, verbas e às conquistas made-in imobiliário, a conservação dos bens históricos transformou-se numa questão recorrente e ameaça apagar a cultura brasileira.\n\nÉ perceptível a falta de ações do Estado no sentido de restaurar esses imóveis. Como exemplo, podemos citar o fogo que destruiu grande parte do Palácio de Manguinhos (RJ), memorial de importantes avanços científicos e históricos. Diversos prédios encontram-se abandonados e deteriorados, sendo alvos constantes de crimes, enquanto a falta de conservação faz com que muitos museus e templos religiosos se tornem focos de perigo, podendo levar à destruição de acervos e peças.\n\nAlém disso, os próprios cidadãos tendem a não se identificar com esses locais. Tal processo de "perda de raízes" é agravado pela falta de iniciativas de educação patrimonial, já que quando o indivíduo não tem consciência sobre a importância e origem de determinado bem histórico, tende a não se importar e até mesmo a danificá-lo (ex: grafites). Outro elemento que contribui para a destruição desses patrimônios é o avanço imobiliário, que busca demoli-los sob a pretensão de "evoluir" a cidade.\n\nPortanto, torna-se necessária a criação de uma rede de cooperação entre Estado e setor privado para garantir a revitalização e ocupação desses prédios. Por fim, cabe aos professores e instituições de ensino desenvolver atividades como visitas e cursos de educação patrimonial, que possam contribuir para que a nova geração identifique-se com a história do Brasil.' 
    },
    { 
      id: 10, 
      titulo: 'Exploração espacial e desigualdade', 
      tema: 'Exploração espacial no século XXI: desafios para a conciliação entre avanço científico e responsabilidade social', 
      categoria: 'Tecnologia', 
      imagem: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=80', 
      texto: 'Na série “Star Trek”, o objetivo da exploração do universo pelos seres humanos era encontrar outras civilizações e evoluir juntos. Porém, na realidade, a corrida espacial está longe de ser assim. Enquanto bilionários concorrem para oferecer turismo no espaço, milhões de pessoas morrem de fome na Terra. Esse fato evidencia uma mudança de prioridades que leva à questão da ética e da responsabilidade social associadas ao desenvolvimento da ciência.\n\nEm primeiro lugar, há a extrema desigualdade de situação. Nas palavras do filósofo Hans Jonas, “O Princípio Responsabilidade” defende que a tecnologia deve ser utilizada para garantir a continuidade da vida humana. Entretanto, milhões de dólares estão sendo investidos em passeios no espaço, enquanto grande parte do mundo não tem acesso ao saneamento básico. Desse modo, a ciência que deveria salvar vidas acaba reduzindo-se a uma forma de vaidade de alguns.\n\nAlém disso, essa ocupação desorganizada do espaço gera um novo tipo de lixo. O “Tratado do Espaço Exterior” de 1967 foi criado para evitar a militarização do espaço. No entanto, não foi previsto que o espaço seria explorado para fins comerciais. Dessa forma, satélites mortos e detritos ameaçam as comunicações mundiais. Assim, o que ocorre é uma nova versão da “Tragédia dos Comuns”. O espaço é de todos, mas ninguém cuida dele.\n\nPortanto, é imprescindível que haja regulamentação internacional sobre a exploração do espaço para que ela possa ser benéfica. A Organização das Nações Unidas deve criar tratados que obriguem os países a utilizarem parte do lucro proveniente da mineração espacial em fundos contra a fome. O desenvolvimento da tecnologia é importante, mas deve ser utilizado para resolver os problemas da Terra e não para construir paraísos artificiais para poucos.' 
    },
    { 
      id: 11, 
      titulo: 'Conservação da fauna brasileira', 
      tema: 'Espécies em extinção e equilíbrio ecológico: desafios para a conservação da fauna brasileira', 
      categoria: 'Meio Ambiente', 
      imagem: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=600&q=80', 
      texto: 'Na obra "A Metamorfose" de Franz Kafka, o protagonista, Gregor Samsa, acorda transformado em inseto e sofre o repúdio de toda a sociedade. De maneira análoga à ficção, o processo de transformação de inseto acontece na realidade da fauna silvestre brasileira. Ocorrem constantemente a destruição dos ambientes naturais, forçando a espécie animal a uma mudança de seu nicho ecológico. Além disso, o rápido processo de erosão da biodiversidade afeta diretamente o balanço ecológico e, por fim, a sobrevivência da própria humanidade.\n\nPrimeiramente, a perda dos habitats naturais é a principal responsável pela extinção das espécies. O desmatamento e as queimadas são responsáveis pela destruição do ambiente necessário para a sobrevivência de inúmeras espécies. Em 1972, a Declaração de Estocolmo já alertava para a urgência da preservação do meio ambiente. Contudo, a fronteira agrícola ainda continua avançando de maneira desordenada. Sem a manutenção da mata, a espécie animal ou morre no lugar ou é obrigada a entrar em contato com o meio urbano. Lá, a morte pode acontecer de várias formas, como atropelamento e ataques.\n\nAdemais, o tráfico de animais silvestres contribui para a crueldade do problema. Anualmente, milhões de aves e mamíferos são retirados de seus ecossistemas. Eles sofrem maus-tratos e grande índice de mortandade na hora do deslocamento. Tudo isso para suprir o mercado ilegal. A falta de fiscalização e a cultura de impunidade contribuem para a continuidade desse crime. Como disse Ignacy Sachs, "O ecodesenvolvimento diz-nos que a economia de longo prazo não é possível sem a preservação do patrimônio ambiental". Assim, a destruição do meio natural é uma ruína de dois lados.\n\nDiante dessa realidade, o combate a essa crise exige tecnologia aliada aos processos educacionais. O Estado precisa investir em tecnologias, como drones e imagens de satélite, para o monitoramento constante das florestas. As punições para os crimes contra o meio ambiente também precisam ser mais severas. As comunidades locais devem ser incluídas nas estratégias de preservação. Eles podem ser incentivados economicamente para agirem como guardiões do território. Desse modo, a proteção da fauna passa a ser fonte de renda sustentável. Assim, o ciclo que colocava a proteção da fauna em contraponto ao desenvolvimento é quebrado.' 
    },
    { 
      id: 12, 
      titulo: 'Migração e acolhimento de refugiados', 
      tema: 'Migração e acolhimento: desafios da convivência em contextos globais', 
      categoria: 'Sociedade', 
      imagem: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=600&q=80', 
      texto: 'Na obra A Odisseia de Homero, o protagonista Ulisses passa por diversos obstáculos durante sua jornada de dez anos, a qual tem como objetivo retornar ao seu lar. Assim, desde sempre a experiência do homem foi marcada pela dor de se deslocar. Hoje, vivemos uma nova Odisseia diante da realidade de milhões de refugiados e migrantes que buscam emigrar as fronteiras em busca de segurança. O desafio maior de nossa sociedade é acolher esse novo grupo de pessoas.\n\nPrimeiramente, o preconceito é um grande desafio. Na obra Teoria da Hospitalidade, do filósofo Jacques Derrida, ele defende que o outro deve ser acolhido sem esperar de volta qualquer retorno. Entretanto, a realidade é bem diferente. Muitos refugiados sofrem com a xenofobia, problemas de língua, discriminação no mercado de trabalho. Ademais, também sofrem com a falta de validação dos seus diplomas, o que os obriga a ocupar o mercado informal e precário de trabalho, privando-os de sua dignidade.\n\nOutro problema é a falha das políticas públicas voltadas para o acolhimento desses migrantes. Embora o ACNUR (Alto Comissariado da ONU para Refugiados) faça o trabalho importante, dificilmente o governo local garante às pessoas um lugar decente para viver, acompanhamento psicológico e assistência social. Segundo Giorgio Agamben, a vida na condição de "vida nua" é aquela em que o homem se encontra apenas para sobreviver, sem direito algum, e está presente na lotação dos abrigos e na separação das famílias.\n\nSendo assim, para que a integração aconteça, é necessário que o Estado seja ágil nas questões de documentação e crie programas de capacitação profissional. Além disso, a mídia e as escolas têm fundamental importância para combater a desinformação e desenvolver o sentimento de empatia. É preciso entender que os migrantes não são uma ameaça, mas sim uma diversidade cultural e de mão de obra qualificada. Esse é o primeiro passo para construirmos uma sociedade realmente humana.' 
    },
    { 
      id: 13, 
      titulo: 'Eventos climáticos extremos', 
      tema: 'El Niño e mudanças climáticas: desafios para a preparação da sociedade diante de eventos extremos', 
      categoria: 'Meio Ambiente', 
      imagem: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=600&q=80', 
      texto: 'Em A Tempestade, de William Shakespeare, uma terrível tempestade faz com que o navio em que navegam seja desviado, alterando o rumo da vida de todos os passageiros. Atualmente, a situação não é diferente para muitos brasileiros. Fenômenos como secas e tempestades extremas, agravados pelo El Niño e pelas mudanças climáticas, têm reescrito o destino de milhões de pessoas. O que se vê é a incapacidade das cidades de se prepararem para enfrentarem tais situações, o que revela a falha na administração pública e, consequentemente, a exposição de riscos cotidianamente.\n\nO mais grave de tudo isso, porém, é a falta de infraestrutura. Como bem definido no conceito de Antropoceno, a era em que o homem passa a ser a força transformadora do planeta, ele acaba por agravar os fenômenos naturais. Na realidade, a falta de planejamento na ocupação das terras e a ausência de sistema de escoamento de água potencializam as enchentes e os deslizamentos de terra. Muitas vezes a Defesa Civil não consegue agir antes da tragédia e fica apenas registrando as vítimas.\n\nAlém disso, a crise climática também é uma questão de justiça social. Nas palavras de Murray Bookchin, em seu livro Ecologia Política, "quem pior sofre com a crise climática são os mais pobres". As famílias são empurradas para as áreas de risco, como encostas e margens de rios, pela especulação imobiliária e, assim, perdem tudo quando chega a época das chuvas. A falta de planejamento das cidades é a sentença de morte desses mais vulneráveis.\n\nPara resolver essa problemática é necessário não apenas investir como prevenir. O poder público precisa criar cidades resilientes com sistema de drenagem e alerta eficiente. A criação de um fundo nacional de adaptação climática é fundamental para a reconstrução das áreas afetadas e para a evacuação preventiva das áreas de risco. Somente a prevenção poderá proteger a população.' 
    },
    { 
      id: 14, 
      titulo: 'Caminhos para combater a intolerância religiosa', 
      tema: 'Caminhos para combater a intolerância religiosa no Brasil', 
      categoria: 'Sociedade', 
      imagem: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=600&q=80', 
      texto: 'Conforme o artigo 5º da Constituição Federal de 1988, conhecida também como Constituição Cidadã, é garantida a liberdade de consciência e de crença a toda pessoa. Entretanto, o Brasil ainda vive diversos casos de intolerância religiosa, apesar de ser um Estado laico. Nesse sentido, são necessárias medidas do Estado para combater a problemática e fomentar a prática educativa voltada à diversidade.\n\nEm primeiro plano, nota-se que a intolerância religiosa decorre de um preconceito histórico-estrutural. Isso pode ser compreendido a partir do conceito de racismo estrutural criado pelo jurista Silvio Almeida. De acordo com o autor, a prevalência das religiões de matriz africana, como o Candomblé e a Umbanda, como alvo principal de ataques na sociedade brasileira ocorre porque a herança escravocrata do país levou à marginalização e satanização de sua crença e prática. Dessa forma, percebe-se que a violência contra a religião não é algo individual, mas sim um reflexo de uma sociedade incapaz de superar um passado excludente.\n\nAdemais, a brandura do sistema penal e a omissão da sociedade contribuem para manutenção da violência. Hannah Arendt criou o conceito de banalidade do mal para expressar como a indiferença e falta de reflexão de pessoas comuns possibilitam a concretização de ações atrozes. Sob esse viés, a depredação de terreiros e a agressão contra fiéis, em um cenário de silenciamento coletivo, evidenciam a incapacidade do Estado de cumprir sua função protetora. Assim, vê-se que a ausência de punição exemplar gera um clima de impunidade, o que incita a repetição da violência.\n\nPortanto, caminhos precisam ser traçados para que seja possível enfrentar a questão. Para isso, é importante que o Ministério Público e as Secretarias de Segurança Pública criem delegacias especializadas no combate aos crimes de ódio e intolerância religiosa, a fim de acolher adequadamente as vítimas. Além disso, as instituições de ensino devem incluir em seus currículos a educação para o respeito entre as religiões. Isso será possível por meio de visitas e diálogo com diferentes matrizes de fé. Somente quando a sociedade internalizar o respeito à crença do outro é que a liberdade de culto será plena.' 
    },
    { 
      id: 15, 
      titulo: 'Agro forte, futuro sustentável', 
      tema: 'Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente', 
      categoria: 'Agro', 
      imagem: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80', 
      texto: 'Na década de 60, a chamada Revolução Verde prometia erradicar a fome no mundo. Com o uso de agrotóxicos e fertilizantes, o Brasil adotou este conceito e se tornou um grande produtor de agronegócio. Porém, a longo prazo, isso não se mostrou sustentável. Hoje, o desafio é ser um forte produtor rural, mas garantir o meio ambiente para continuar sendo terra fértil no futuro.\n\nO grande perigo é a exploração predatória. O Relatório do Clube de Roma (1972) já alertava sobre os limites do crescimento e o esgotamento dos recursos da natureza. No campo, a preocupação é o retorno imediato. Desmatamento, uso desenfreado de agrotóxicos, contaminando os rios e degradando o solo, são realidades. Aumenta a produção a curto prazo. Porém, a terra vai se esgotando. E, no fim, a crise é na agricultura.\n\nPor outro lado, a Agroecologia, propagada por Miguel Altieri, mostra que é possível produzir sem destruir. A Integração Lavoura-Pecuária-Floresta (ILPF), por exemplo, recupera pastos degradados, sequestra carbono e aumenta a produtividade. Com uso consciente, a tecnologia passa a ser uma grande aliada do meio ambiente. É possível ter floresta e produzir.\n\nPara que o futuro seja sustentável, é importante que o Estado estimule os produtores a adotarem práticas verdes. Isso pode ser feito com crédito e desoneração de impostos. Também é fundamental que a educação no campo e a extensão rural mostrem que o melhor negócio de um agricultor é a proteção da natureza. O agro forte é aquele que respeita a terra e garante o amanhã.' 
    },
    { 
      id: 16, 
      titulo: 'O respeito às diferenças como caminho para a superação dos conflitos sociais', 
      tema: 'O respeito às diferenças como caminho para a superação dos conflitos sociais na sociedade contemporânea', 
      categoria: 'Sociedade', 
      imagem: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80', 
      texto: 'Voltaire filósofo iluminista dizia no seu Tratado sobre a Tolerância, "Somos todos muito diferentes, mas somos todos iguais no nosso direito à tolerância". Apesar disso, conflitos ainda são muito presentes na sociedade hodierna, originados pela intolerância.\n\nPrimeiramente, é importante entender que esses conflitos surgiram pelo etnocentrismo ideia de que a minha cultura é melhor que todas as demais. As ideias da Revolução Francesa (Liberdade, Igualdade, Fraternidade), embora tenham inspirado a luta pelos Direitos Humanos, muitas vezes ainda excluem minorias, como negros, LGBTQI+, mulheres, por exemplo. Esse pensamento equivocado leva ao preconceito e consequentemente à violência –simbólica e física. Isso forma um ciclo vicioso de exclusão social que impede o desenvolvimento de toda uma sociedade.\n\nPortanto, é necessário entender que a empatia é o meio de curar tal abismo. Na verdade, segundo Charles Taylor, em seu conceito Multiculturalismo, devemos aceitar todas as culturas e valorizar-as como únicas. Assim, o que antes era julgamento e ataque agora se torna um diálogo nas redes sociais ou fora delas. A escuta ativa é uma forma de resistir ao ódio e à intolerância. Permite que possamos ver o outro como igual.\n\nPor fim, é importante perceber o papel da educação e do Estado nessa problemática. É dever do Ministério da Educação promover projetos pedagógicos que estimulem a diversidade cultural e de gênero, preparando professores para mediarem debates. Além de que o poder público deve punir severamente crimes de ódio e fomentar campanhas na mídia que estimulem a paz. A diferença não é um obstáculo, antes uma riqueza.' 
    },
    { 
      id: 17, 
      titulo: 'Obsolescência programada e o descarte de lixo eletrônico', 
      tema: 'Obsolescência tecnológica e descarte de resíduos eletrônicos: desafios para a sustentabilidade no Brasil', 
      categoria: 'Meio Ambiente', 
      imagem: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80', 
      texto: 'Na obra cinematográfica “Wall-E”, o planeta Terra é evacuado pelos seres humanos, pois tornou-se um imenso lixão, sem vida e tomado pelo lixo. Apesar de ter sido criada há algum tempo, a história se torna realidade no Brasil contemporâneo, haja vista o descarte inadequado do lixo eletrônico. Toneladas de aparelhos eletrônicos –celulares, computadores, baterias são despejados em lixões comuns que soltam tóxicos no solo e na água.\n\nEsse cenário de destruição é movido pela chamada “obsolescência programada”. Na década de 1930, esse conceito foi cunhado para explicar a intencional limitação da durabilidade de um produto pelas indústrias, a fim de obrigar o consumidor a comprar outro. O documentário “Comprar, Tirar, Comprar” mostra como isso ocorre, levando à loucura consumista e ao acúmulo de lixo tóxico que não é digerido pela natureza.\n\nAlém do impacto ambiental, o desperdício também é enorme. A “Pegada Ecológica” foi criada por Mathis Wackernagel para medir o que estamos deixando no planeta, e o lixo eletrônico é um dos grandes vilões. Afinal, muitos metais preciosos como o ouro, a prata e o cobre estão nos aparelhos eletrônicos e podem ser reciclados. Porém, devido à falta de pontos de coleta e de informação, toneladas de riquezas são enterradas.\n\nPara que tal cenário seja revertido, a Política Nacional de Resíduos Sólidos deve ser implantada de fato. É necessário que o Poder Público exija dos fabricantes que eles sejam responsáveis pela coleta de seus produtos obsoletos (logística reversa), por meio da instalação de pontos de recolhimento em todos os bairros. Além disso, as escolas devem disseminar a ideia do “Cradle to Cradle” (do berço ao berço). Ou seja, a economia circular, que mostra que qualquer resíduo pode virar matéria-prima.' 
    }
  ];
  // Aba esquerda: memórias (COM imagens — 5 registros)
  const MEMORIAS_MOLDE = [
    { id: 1, ano: '2014', etapa: 'Educação Infantil', titulo: 'Prezinho', texto: 'Ainda me lembro do cheirinho de giz de cera novo e do vestido rosa com laço na cabeça. Eu corria pelos corredores da escola com as mãozinhas cheias de desenhos coloridos para mostrar à professora, sentindo que o mundo era inteiro feito de brincadeira e colinho. Aquela foto guarda o brilho nos meus olhos de criança que acreditava que cada dia de aula era uma nova aventura.', imagem: 'assets/img/memoria-prezinho.jpeg' },
    { id: 2, ano: '2015-2019', etapa: 'Anos Iniciais do Fundamental', titulo: 'Início do Ensino Fundamental', texto: 'Foi o primeiro dia com mochila nas costas e caderno novinho. Eu cheguei timida, de mãos dadas com a mamãe, mas logo percebi que aquele lugar seria meu segundo lar. Amizades que nasceram no recreio, trocas de figurinhas, cartas escritas a lápis e aquele sentimento gostoso de estar crescendo junto com as amigas. Cada risada no pátio ecoa no meu coração até hoje.', imagem: 'assets/img/memoria-fundamental.jpeg' },
    { id: 3, ano: '2025', etapa: 'Ensino Médio', titulo: 'Segundo Ano do Ensino Médio', texto: 'O ano em que as amizades se aprofundaram de verdade. Fomos descobrir quem éramos além da sala de aula, entre troca de figurinhas de caderno, lanches divididos no recreio e aquelas conversas longas no corredor que pareciam não ter fim. Aprendemos que crescer também significa aprender a dizer adeus, mas com o coração cheio de lembranças boas.', imagem: 'assets/img/memoria-segundo-ano.jpeg' },
    { id: 4, ano: '2024-2026', etapa: 'Ensino Médio', titulo: 'Início do Terceirão', texto: 'O começo do terceirão foi marcado por muita união e risadas. Nessa foto, a turma toda se reuniu para registrar o início do nosso último ano juntos. Entre poses no chão, sorrisos abertos e a lousa verde ao fundo, a gente já sabia que essa seria uma jornada inesquecível. Cada um ali tem uma história, mas juntos formamos uma família que vai deixar muitas saudades.', imagem: 'assets/img/10.jpeg' },
    { id: 5, ano: '2024-2026', etapa: 'Ensino Médio', titulo: 'Final do Ensino Médio — Professor Padrinho de Formatura', texto: 'Ele esteve conosco não apenas como professor, mas como aquele padrinho que acreditou em cada um de nós. Nas aulas, nos conselhos, nos momentos de insegurança antes das provas e nos sonhos sussurrados entre colegas. Essa foto guarda o olhar de gratidão e o abraço apertado de despedida, com a certeza de que levamos consigo muito mais que conteúdo: levamos cuidado, incentivo e um pedaço de quem nos acolheu até o fim.', imagem: 'assets/img/memoria-ensino-medio.jpeg' }
  ];

  /* =========================================================
     2. UTILITÁRIOS
     ========================================================= */
  function escapeHtml(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
  }
  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  function tempoLeitura(texto) {
    return Math.max(1, Math.ceil((texto || '').split(/\s+/).length / 200));
  }

  /* =========================================================
     3. SMOOTH SCROLL (Lenis)
     ========================================================= */
  let lenis = null;
  if (temLenis) {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    if (temGSAP) {
      lenis.on('scroll', () => { if (temST) ScrollTrigger.update(); });
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const loop = (t) => { lenis.raf(t); requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    }
  }

  /* =========================================================
     4. TEMA (mármore escuro ↔ pergaminho claro)
     ========================================================= */
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const icones = { dark: '☀️', light: '🌙' };

  function atualizaIcone() {
    themeToggle.textContent = icones[html.getAttribute('data-theme')] || '☀️';
  }
  atualizaIcone();

  themeToggle.addEventListener('click', () => {
    const proximo = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', proximo);
    localStorage.setItem('tema-advocacia', proximo);
    atualizaIcone();
  });

  /* =========================================================
     5. GATE — split do título + animações de entrada
     ========================================================= */
  const gate = document.getElementById('gate');
  const gateTitulo = document.getElementById('gate-titulo');
  const gateSubtitulo = document.getElementById('gate-subtitulo');
  const gateSelo = document.querySelector('.gate-selo');

  const textoDoTitulo = gateTitulo.textContent.trim();
  const palavras = textoDoTitulo.split(' ');
  gateTitulo.textContent = '';
  palavras.forEach((palavra, i) => {
    const envelope = document.createElement('span');
    envelope.style.display = 'inline-block';
    envelope.style.whiteSpace = 'nowrap';
    [...palavra].forEach(caractere => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = caractere;
      envelope.appendChild(span);
    });
    gateTitulo.appendChild(envelope);
    if (i < palavras.length - 1) gateTitulo.appendChild(document.createTextNode(' '));
  });

  if (anima) {
    gsap.from('.gate-titulo .char', { y: 100, opacity: 0, duration: 0.9, stagger: 0.035, ease: 'power4.out', delay: 0.45 });
    gsap.from(gateSubtitulo, { opacity: 0, y: 22, duration: 1, ease: 'power3.out', delay: 1.15 });
    gsap.from(gateSelo, { opacity: 0, scale: 0.6, rotate: -60, duration: 1.1, ease: 'back.out(1.7)', delay: 0.2 });
    gsap.from('#balanca', { opacity: 0, scale: 0.92, y: 30, duration: 1.1, ease: 'power3.out', delay: 0.55, clearProps: 'transform' });
  }

  /* =========================================================
     6. SCROLL REVEAL
     ========================================================= */
  if (anima && temST) {
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 42 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }
      );
    });
  }

  /* =========================================================
     7. LOADER
     ========================================================= */
  const loader = document.getElementById('page-loader');
  const loaderBar = document.querySelector('.loader-bar');
  const loaderPct = document.getElementById('loader-pct');
  let progresso = 0;
  const timer = setInterval(() => {
    progresso = Math.min(100, progresso + Math.random() * 14);
    loaderBar.style.width = progresso + '%';
    loaderPct.textContent = Math.floor(progresso) + '%';
    if (progresso >= 100) {
      clearInterval(timer);
      setTimeout(() => loader.classList.add('hidden'), 350);
    }
  }, 95);

  /* =========================================================
     8. BALANÇA — o cursor SÓ inclina; a escolha é por CLIQUE
     ========================================================= */
  const braco = document.getElementById('braco');
  const pratoEsq = document.getElementById('prato-esquerdo');
  const pratoDir = document.getElementById('prato-direito');
  const haloEsq = pratoEsq.querySelector('.halo');
  const haloDir = pratoDir.querySelector('.halo');

  const ANGULO_MAX = 12;
  const ZONA_MORTA = 0.1;
  let gateAberto = true;
  let escolhendo = false;
  let modalAberto = false;

  function aplicarInclinacao(angulo) {
    const rad = angulo * Math.PI / 180;
    const dx = 250 * (1 - Math.cos(rad));
    const dy = 250 * Math.sin(rad);

    braco.style.transform = `rotate(${angulo.toFixed(2)}deg)`;
    pratoEsq.style.transform = `translate(${dx.toFixed(2)}px, ${(-dy).toFixed(2)}px)`;
    pratoDir.style.transform = `translate(${(-dx).toFixed(2)}px, ${dy.toFixed(2)}px)`;

    haloEsq.style.opacity = Math.max(0, -angulo / ANGULO_MAX * 0.2).toFixed(3);
    haloDir.style.opacity = Math.max(0, angulo / ANGULO_MAX * 0.2).toFixed(3);
  }

  function reagirAoCursor(clientX) {
    if (!gateAberto || escolhendo) return;
    const meio = window.innerWidth / 2;
    let norm = Math.max(-1, Math.min(1, (clientX - meio) / meio));

    let sinal = 0, mag = 0;
    if (norm > ZONA_MORTA) { sinal = 1; mag = (norm - ZONA_MORTA) / (1 - ZONA_MORTA); }
    else if (norm < -ZONA_MORTA) { sinal = -1; mag = (-norm - ZONA_MORTA) / (1 - ZONA_MORTA); }

    aplicarInclinacao(sinal * mag * ANGULO_MAX);

    if (anima) {
      const x = norm * 4;
      gsap.to(gateTitulo, { rotateY: x, x: norm * 10, duration: 0.9, ease: 'power2.out' });
    }
  }

  let balanceando = false;
  window.addEventListener('mousemove', (e) => {
    if (balanceando) return;
    requestAnimationFrame(() => {
      reagirAoCursor(e.clientX);
      balanceando = false;
    });
    balanceando = true;
  }, { passive: true });

  gate.addEventListener('touchmove', (e) => {
    if (e.touches.length) reagirAoCursor(e.touches[0].clientX);
  }, { passive: true });

  aplicarInclinacao(0);

  /* =========================================================
     9. ABAS + ABRIR / FECHAR O GATE
     ========================================================= */
  const barra = document.getElementById('barra-navegacao');
  const abas = {
    memorias: { botao: document.getElementById('tab-memorias'), painel: document.getElementById('painel-memorias') },
    redacoes: { botao: document.getElementById('tab-redacoes'), painel: document.getElementById('painel-redacoes') }
  };
  let abaAtiva = 'memorias';

  function setAba(nome, moverBalanca = true) {
    if (!abas[nome]) return;
    abaAtiva = nome;

    Object.entries(abas).forEach(([chave, item]) => {
      const ativo = chave === nome;
      item.botao.classList.toggle('active', ativo);
      item.botao.setAttribute('aria-selected', String(ativo));
      item.painel.hidden = false;
      item.painel.classList.toggle('active', ativo);
    });

    if (moverBalanca) {
      aplicarInclinacao(nome === 'redacoes' ? ANGULO_MAX : -ANGULO_MAX);
    }
    setTimeout(() => animarPainel(abas[nome].painel), 90);
    if (temST) setTimeout(() => ScrollTrigger.refresh(), 520);
  }

  function travarPagina() {
    html.classList.add('travado');
    document.body.classList.add('travado');
    if (lenis) lenis.stop();
  }
  function destravarPagina() {
    html.classList.remove('travado');
    document.body.classList.remove('travado');
    if (lenis) lenis.start();
  }

  // Volta sempre ao início da seção ao entrar/trocar de aba
  function irParaPainel(lado, duracao = 1.1) {
    const alvo = abas[lado]?.painel;
    if (!alvo) return;
    const y = Math.max(0, Math.round(alvo.getBoundingClientRect().top + window.scrollY - 200));
    if (lenis) lenis.scrollTo(y, { duration: duracao });
    else window.scrollTo({ top: y, behavior: 'smooth' });
    if (temST) setTimeout(() => ScrollTrigger.refresh(), 250);
  }

  function escolherLado(lado) {
    if (!gateAberto || escolhendo || !abas[lado]) return;
    escolhendo = true;

    // 1) a balança inclina totalmente para o lado escolhido
    aplicarInclinacao(lado === 'redacoes' ? ANGULO_MAX : -ANGULO_MAX);

    // 2) o gate sai de cena
    setTimeout(() => {
      gate.classList.add('saindo');

      setTimeout(() => {
        gate.classList.add('oculto');
        gateAberto = false;
        escolhendo = false;
        destravarPagina();
        barra.classList.remove('oculta');

        // 3) rolagem suave DENTRO da página até o topo da seção escolhida
        setAba(lado, false);
        setTimeout(() => irParaPainel(lado, 1.2), 90);
      }, 620);
    }, 420);
  }

  function abrirGate() {
    gateAberto = true;
    escolhendo = false;
    barra.classList.add('oculta');
    gate.classList.remove('saindo', 'oculto');
    aplicarInclinacao(0);
    travarPagina();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    if (anima) {
      gsap.fromTo(gateTitulo, { opacity: 0.4, y: 18 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
    }
    const primeiro = gate.querySelector('[tabindex="0"]');
    if (primeiro) setTimeout(() => primeiro.focus(), 200);
  }

  // Clique nos pratos e nos botões
  document.querySelectorAll('.prato-clicavel').forEach(prato => {
    prato.addEventListener('click', () => escolherLado(prato.dataset.lado));
    prato.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); escolherLado(prato.dataset.lado); }
    });
  });
  document.querySelectorAll('.aba-tab').forEach(botao => {
    botao.addEventListener('click', () => {
      const lado = botao.dataset.aba;
      setAba(lado);
      irParaPainel(lado, 1);
    });
  });
  document.getElementById('voltar-balanca').addEventListener('click', abrirGate);

  // Teclado: setas inclinam no gate / trocam de aba depois; Enter confirma.
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.target.isContentEditable) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const angulo = (e.key === 'ArrowRight' ? 1 : -1) * ANGULO_MAX;
      if (gateAberto) aplicarInclinacao(angulo);
      else {
        const lado = e.key === 'ArrowRight' ? 'redacoes' : 'memorias';
        setAba(lado);
        irParaPainel(lado, 1);
      }
    }

    // Mantém o foco dentro do gate enquanto ele estiver aberto
    if (e.key === 'Tab' && gateAberto) {
      const focaveis = [...gate.querySelectorAll('button, [tabindex="0"]')];
      if (!focaveis.length) return;
      const atual = focaveis.indexOf(document.activeElement);
      if (e.shiftKey && (atual <= 0)) { e.preventDefault(); focaveis[focaveis.length - 1].focus(); }
      else if (!e.shiftKey && atual === focaveis.length - 1) { e.preventDefault(); focaveis[0].focus(); }
    }
  });

  /* =========================================================
     10. CARDS — MEMÓRIAS (sem imagem)
     ========================================================= */
  const gridMemorias = document.getElementById('memorias-grid');

  function renderMemorias() {
    gridMemorias.innerHTML = '';
    MEMORIAS_MOLDE.forEach(mem => {
      const card = document.createElement('article');
      card.className = 'memoria-card';
      const imagemHtml = mem.imagem
        ? `<img class="memoria-imagem" src="${escapeHtml(mem.imagem)}" alt="${escapeHtml(mem.titulo)}" loading="lazy">`
        : `<div class="memoria-imagem-placeholder" aria-hidden="true">📷 Aguardando imagem…</div>`;
      card.innerHTML = `
        <span class="memoria-fita" aria-hidden="true"></span>
        <span class="memoria-node" aria-hidden="true"></span>
        <span class="memoria-carimbo">REGISTRO ${String(mem.id).padStart(2, '0')}</span>
        <div class="memoria-topo">
          <span class="memoria-ano">${escapeHtml(mem.ano)}</span>
          <span class="memoria-etapa">${escapeHtml(mem.etapa)}</span>
        </div>
        ${imagemHtml}
        <h3 class="memoria-titulo">${escapeHtml(mem.titulo)}</h3>
        <p class="memoria-texto">${escapeHtml(mem.texto)}</p>
        <div class="memoria-pe">
          <span>Registro nº ${String(mem.id).padStart(2, '0')}</span>
          <span>⚖ Arquivo escolar</span>
        </div>
      `;
      gridMemorias.appendChild(card);
    });
  }

  /* =========================================================
     11. REDAÇÕES — AUTOS + BUSCA / FILTRO / ORDEM + MODAL
     ========================================================= */
  const gridRedacoes = document.getElementById('redacoes-grid');
  const buscaInput = document.getElementById('busca-input');
  const buscaDica = document.getElementById('busca-dica');
  const filtroBotoes = document.querySelectorAll('.filtro-btn');
  const ordemSelect = document.getElementById('ordem-select');

  let filtroAtivo = 'all';
  let buscaAtiva = '';
  let ordemAtiva = 'default';
  let triggersCartoes = [];

  // Entrada coreografada do painel ativo (cabeçalho + cartões em cascata)
  function animarPainel(painel) {
    if (!anima || !painel) return;

    triggersCartoes.forEach(t => t.kill());
    triggersCartoes = [];

    const cabecalho = painel.querySelectorAll('.panel-cabecalho > *, .processo-topo > *, .controles > *');
    if (cabecalho.length) {
      gsap.fromTo(cabecalho,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.06, ease: 'power3.out', overwrite: 'auto' }
      );
    }

    const cartoes = [...painel.querySelectorAll('.memoria-card, .peca-card')];
    if (!cartoes.length) return;

    if (!temST) {
      gsap.fromTo(cartoes,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out', overwrite: 'auto' }
      );
      return;
    }

    cartoes.forEach((cartao, i) => {
      gsap.set(cartao, {
        opacity: 0,
        y: i % 2 ? 90 : -75,
        rotate: i % 2 ? 4 : -4,
        scale: 0.94
      });
      const trigger = ScrollTrigger.create({
        trigger: cartao,
        start: 'top 92%',
        once: true,
        onEnter: () => gsap.to(cartao, {
          opacity: 1, y: 0, rotate: 0, scale: 1,
          duration: 0.95, delay: (i % 2) * 0.09, ease: 'back.out(1.25)', overwrite: 'auto'
        })
      });
      triggersCartoes.push(trigger);
    });
  }

  function aplicarFiltros() {
    let resultado = REDACOES_MOLDE.filter(r => {
      const passaFiltro = filtroAtivo === 'all' || r.categoria === filtroAtivo;
      const passaBusca = !buscaAtiva ||
        r.titulo.toLowerCase().includes(buscaAtiva) ||
        r.tema.toLowerCase().includes(buscaAtiva);
      return passaFiltro && passaBusca;
    });

    if (ordemAtiva === 'titulo') resultado = [...resultado].sort((a, b) => a.titulo.localeCompare(b.titulo));
    else if (ordemAtiva === 'tempo') resultado = [...resultado].sort((a, b) => tempoLeitura(a.texto) - tempoLeitura(b.texto));

    gridRedacoes.innerHTML = '';
    if (!resultado.length) {
      gridRedacoes.innerHTML = '<p class="vazio">Nenhum documento encontrado neste molde.</p>';
    } else {
      resultado.forEach(r => {
        const card = document.createElement('article');
        card.className = 'peca-card';
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Abrir ' + r.titulo);

        let tituloHTML = escapeHtml(r.titulo);
        if (buscaAtiva) {
          tituloHTML = tituloHTML.replace(new RegExp(`(${escapeRegExp(buscaAtiva)})`, 'gi'), '<mark>$1</mark>');
        }

        card.innerHTML = `
          <div class="peca-lateral">
            <span class="peca-numero">${String(r.id).padStart(2, '0')}</span>
            <span class="peca-selo" aria-hidden="true">⚖</span>
          </div>
          <div class="peca-corpo">
            <img src="${r.imagem}" alt="Ilustração de ${escapeHtml(r.titulo)}" class="peca-imagem" loading="lazy" width="400" height="250">
            <div class="peca-info">
              <span class="peca-carimbo">CORRIGIDA</span>
              <h3 class="peca-titulo">${tituloHTML}</h3>
              <p class="peca-tema">${escapeHtml(r.tema)} · ${escapeHtml(r.categoria)}</p>
              <div class="peca-pe">
                <span>Folhas: ${tempoLeitura(r.texto)}</span>
                <span class="peca-abrir">Abrir peça →</span>
              </div>
            </div>
          </div>
        `;
        card.addEventListener('click', () => abrirModal(r));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrirModal(r); }
        });
        gridRedacoes.appendChild(card);
      });
    }

    const contador = document.getElementById('contador-pecas');
    if (contador) contador.textContent = String(resultado.length);
    buscaDica.textContent = buscaAtiva ? `${resultado.length} resultado(s)` : `${resultado.length} documento(s)`;
    if (abaAtiva === 'redacoes') animarPainel(document.getElementById('painel-redacoes'));
    if (temST) ScrollTrigger.refresh();
  }

  buscaInput.addEventListener('input', (e) => {
    buscaAtiva = e.target.value.toLowerCase().trim();
    aplicarFiltros();
  });
  filtroBotoes.forEach(btn => btn.addEventListener('click', () => {
    filtroBotoes.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filtroAtivo = btn.dataset.filtro;
    aplicarFiltros();
  }));
  ordemSelect.addEventListener('change', (e) => {
    ordemAtiva = e.target.value;
    aplicarFiltros();
  });

  /* =========================================================
     12. MODAL
     ========================================================= */
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalTitulo = document.getElementById('modal-titulo');
  const modalTema = document.getElementById('modal-tema');
  const modalTempo = document.getElementById('modal-tempo');
  const modalTexto = document.getElementById('modal-texto');
  const modalIndicador = document.getElementById('modal-indicador');
  const focaveis = 'button, a, input, select, textarea, [tabindex]:not([tabindex="-"])';

  function abrirModal(r) {
    modalTitulo.textContent = r.titulo;
    modalTema.textContent = `${r.tema} · ${r.categoria}`;
    modalTempo.textContent = `Leitura: ${tempoLeitura(r.texto)} min`;
    modalIndicador.textContent = `Documento ${r.id} de ${REDACOES_MOLDE.length}`;
    modalTexto.textContent = r.texto || '[ Texto será inserido aqui. ]';

    modalOverlay.classList.add('active');
    modalAberto = true;
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();

    modalTexto.classList.remove('glitch');
    void modalTexto.offsetWidth;
    modalTexto.classList.add('glitch');

    setTimeout(() => {
      const alvo = modalOverlay.querySelector(focaveis);
      if (alvo) alvo.focus(); else modalClose.focus();
    }, 320);
  }

  function fecharModal() {
    modalOverlay.classList.remove('active');
    modalAberto = false;
    document.body.style.overflow = '';
    if (!gateAberto && lenis) lenis.start();
  }

  modalClose.addEventListener('click', fecharModal);
  modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) fecharModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalAberto) fecharModal();
  });

  /* =========================================================
     13. ÂNCORAS SUAVES
     ========================================================= */
  document.querySelectorAll('a[href^="#"]').forEach(ancora => {
    ancora.addEventListener('click', (e) => {
      const id = ancora.getAttribute('href');
      if (id === '#') return;
      const alvo = document.querySelector(id);
      if (!alvo) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(alvo, { offset: -80, duration: 1.1 });
      else alvo.scrollIntoView({ behavior: reduzMovimento ? 'auto' : 'smooth' });
    });
  });

  /* =========================================================
     14. EASTER EGG (Código Konami adaptado)
     ========================================================= */
  const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let indiceKonami = 0;
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.target.isContentEditable) {
      indiceKonami = 0;
      return;
    }
    if (e.key === konami[indiceKonami]) {
      indiceKonami++;
      if (indiceKonami === konami.length) { indiceKonami = 0; modoTribunal(); }
    } else {
      indiceKonami = 0;
    }
  });

  function modoTribunal() {
    const aviso = document.createElement('div');
    aviso.textContent = '⚖ MODO TRIBUNAL ATIVADO';
    Object.assign(aviso.style, {
      position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      zIndex: '99999', fontFamily: 'Cinzel, serif', fontSize: 'clamp(1rem, 4vw, 2rem)',
      background: '#12100e', color: '#d4af37', padding: '1.2rem 2rem',
      border: '2px solid #d4af37', textAlign: 'center', boxShadow: '0 0 40px rgba(212,175,55,.35)'
    });
    document.body.appendChild(aviso);
    setTimeout(() => {
      aviso.style.transition = 'opacity 1s';
      aviso.style.opacity = '0';
      setTimeout(() => aviso.remove(), 1000);
    }, 2800);
  }

  /* =========================================================
     15. INICIALIZAÇÃO
     ========================================================= */
  travarPagina();
  renderMemorias();
  aplicarFiltros();
  setAba('memorias', false);
  aplicarInclinacao(0);
  if (temST) setTimeout(() => ScrollTrigger.refresh(), 600);

});

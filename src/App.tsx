import React, { useState } from 'react';
import { 
  User, 
  Trophy, 
  AlertCircle, 
  PlayCircle, 
  CheckCircle2, 
  Lock,
  ChevronRight,
  BookOpen,
  Target,
  Award,
  BarChart,
  RefreshCw
} from 'lucide-react';

// --- DATA: 20 Levels of Event Management (SENA Curriculum) ---
const PILLARS = [
  { id: 'conceptos', name: 'Conceptos de Eventos', color: 'bg-blue-500' },
  { id: 'tipos', name: 'Tipos de Eventos', color: 'bg-emerald-500' },
  { id: 'procedimientos', name: 'Procedimientos', color: 'bg-amber-500' },
  { id: 'proyectos', name: 'Proyectos de Eventos', color: 'bg-purple-500' }
];

const LEVELS = [
  // PILAR 1: Conceptos
  { id: 1, pillar: 'conceptos', title: 'El Despertar del Organizador', comp: 'Identificar', status: 'completed',
    desc: 'Diferencia entre evento estructurado y reunión informal.',
    problem: 'La empresa sugiere celebrar su aniversario yendo todos a un bar libremente. RRHH pide un "evento oficial". ¿Cómo transformas la reunión en evento?',
    options: [
      { id: 'A', text: 'Pagar el consumo total de bebidas de los invitados sin programar una agenda', isCorrect: false },
      { id: 'B', text: 'Establecer un objetivo claro, una agenda técnica, delimitar el lugar y definir el público', isCorrect: true },
      { id: 'C', text: 'Mandar invitaciones impresas pero mantener el evento en formato libre de asistencia', isCorrect: false },
      { id: 'D', text: 'Pedir código de vestimenta de gala obligatorio y contratar servicio de transporte', isCorrect: false }
    ], feedback: 'Correctiva: Todo evento requiere objetivos, tiempo y espacio estructurados, más allá de la inversión económica.' },
  { id: 2, pillar: 'conceptos', title: 'Elementos Básicos', comp: 'Relacionar', status: 'completed',
    desc: 'Identifica componentes: tiempo, espacio, objetivo, público.',
    problem: 'Para un evento de caridad, tienes el salón más costoso, un gran presupuesto y la fecha pactada. El cliente exige contratar a los artistas ya mismo. ¿Qué componente clave falta definir antes?',
    options: [
      { id: 'A', text: 'El menú y los maridajes del banquete principal', isCorrect: false },
      { id: 'B', text: 'El diseño de los gafetes y elementos de branding', isCorrect: false },
      { id: 'C', text: 'El perfil exacto del público objetivo (Target) para segmentarlos', isCorrect: true },
      { id: 'D', text: 'Los arreglos florales y la gama de color corporativa', isCorrect: false }
    ], feedback: 'Refuerzo: El público objetivo determina la personalidad del artista y el tipo de contenido que va a generar engagement.' },
  { id: 3, pillar: 'conceptos', title: 'El Público Objetivo', comp: 'Analizar', status: 'completed',
    desc: 'Aprende a segmentar y entender a la audiencia.',
    problem: 'Estás lanzando un nuevo videojuego para adolescentes entre 13 y 17 años. El patrocinador corporativo insiste en realizar un cóctel nocturno en un club de golf privado con código de etiqueta. ¿Por qué es un error?',
    options: [
      { id: 'A', text: 'Porque resulta económicamente inviable financiar cócteles en clubes', isCorrect: false },
      { id: 'B', text: 'Porque el formato no concuerda en absoluto con la edad, intereses ni hábitos de la audiencia', isCorrect: true },
      { id: 'C', text: 'Porque el horario nocturno podría interferir con las tareas escolares al día siguiente', isCorrect: false },
      { id: 'D', text: 'Porque los clubes de golf suelen tener ubicaciones geográficamente complejas', isCorrect: false }
    ], feedback: 'Explicativa: Por regla de oro, el formato y el estilo del evento siempre deben adaptarse directamente a las características del público participante.' },
  { id: 4, pillar: 'conceptos', title: 'Objetivos SMART', comp: 'Aplicar', status: 'completed',
    desc: 'Metas Específicas, Medibles, Alcanzables, Realistas y a Tiempo.',
    problem: 'Durante el Briefing, el vicepresidente de la empresa te dice: "Nuestro objetivo es que la marca sea muy famosa y a todo el mundo le encante el evento". ¿Cuál de las siguientes opciones convierte esto en un verdadero objetivo SMART?',
    options: [
      { id: 'A', text: 'Lograr que literalmente todo el mundo hable de la marca durante el año', isCorrect: false },
      { id: 'B', text: 'Invitar a la mayor cantidad de influencers e invitados famosos posible al show', isCorrect: false },
      { id: 'C', text: 'Aumentar las descargas de la app e interacciones digitales un 20% durante los 3 días del congreso', isCorrect: true },
      { id: 'D', text: 'Crear una campaña publicitaria exterior gigantesca en la ciudad sede', isCorrect: false }
    ], feedback: 'Formativa: Los objetivos organizacionales en MKT deben ser trazables y medibles (20%) y estrictamente delimitados en el tiempo (3 días).' },
  { id: 5, pillar: 'conceptos', title: 'El Brief Inicial', comp: 'Sintetizar', status: 'completed',
    desc: 'Conoce bien el documento de origen de tu evento.',
    problem: 'En una reunión inicial, el cliente te entrega un Brief para un congreso y solicita una estimación financiera urgente. Tienes la fecha, el lugar y la temática, pero te faltan datos críticos. ¿Qué debes exigir para darle un presupuesto lógico?',
    options: [
      { id: 'A', text: 'Que entregue el logo final vectorizado en alta calidad', isCorrect: false },
      { id: 'B', text: 'Conocer de antemano el nombre de la empresa proveedora de mobiliario', isCorrect: false },
      { id: 'C', text: 'La parrilla de canciones o playlist para la ambientación técnica', isCorrect: false },
      { id: 'D', text: 'Cantidad estimada de asistentes (aforo) y su techo máximo presupuestario', isCorrect: true }
    ], feedback: 'Global: No es posible tasar costos de A&B (Alimentos y Bebidas), espacios ni recursos logísticos sin el cálculo del aforo o volumen meta.' },
  
  // PILAR 2: Tipos
  { id: 6, pillar: 'tipos', title: 'Corporativo vs Social', comp: 'Clasificar', status: 'completed',
    desc: 'Diferencias clave en tono comercial, presupuestos y expectativas.',
    problem: 'Tu agencia debe coordinar de simultánea un simposio farmacéutico (Corporativo) y un aniversario de bodas (Social). En una reunión de status, tienes que aclarar a tu equipo una diferencia medular entre ambos para enfocar los recursos.',
    options: [
      { id: 'A', text: 'Los eventos corporativos siempre operan de día y los sociales operan de noche', isCorrect: false },
      { id: 'B', text: 'El evento corporativo persigue métricas y un ROI; el social prioriza una experiencia puramente afectiva y familiar', isCorrect: true },
      { id: 'C', text: 'Las celebraciones sociales siempre tendrán exigencias de rider técnico mayores', isCorrect: false },
      { id: 'D', text: 'Los eventos empresariales nunca suministran catering por optimización de costos', isCorrect: false }
    ], feedback: 'Correctiva: Toda actuación planificada a nivel corporativo se considera una inversión, no un gasto, y por lo tanto requiere calcular un Retorno (ROI).' },
  { id: 7, pillar: 'tipos', title: 'Formatos Académicos', comp: 'Identificar', status: 'completed',
    desc: 'Simposio, Seminario, Congreso y Foro.',
    problem: 'Una Universidad te contacta para reunir a 5 grandes especialistas para debatir un tema en particular. Desean que expongan puntos de vista divergentes e interactuen en vivo con preguntas del auditorio durante 2 horas. ¿Qué formato es el mejor?',
    options: [
      { id: 'A', text: 'Una Feria Comercial o de exposiciones (Tradeshow)', isCorrect: false },
      { id: 'B', text: 'Una Mesa Redonda o un Panel de Discusiones Guiado', isCorrect: true },
      { id: 'C', text: 'Un Congreso de dimensión y cobertura internacional', isCorrect: false },
      { id: 'D', text: 'Un Workshop o actividad teórica intensiva para certificación', isCorrect: false }
    ], feedback: 'Formativa: La Mesa Redonda empodera el contraste de opiniones simultáneas respaldado un fuerte papel del moderador ante el público.' },
  { id: 8, pillar: 'tipos', title: 'La Era Híbrida', comp: 'Analizar', status: 'active',
    desc: 'Eventos presenciales con participación telemática y online.',
    problem: 'Ejecutando un ciclo de conferencias híbrido para 2.000 personas virtuales, los asistentes online se quejan de visualizar una toma fija a lo lejos, el audio ruidoso y de no poder intervenir. ¿Cómo rescatas la experiencia Híbrida?',
    options: [
      { id: 'A', text: 'Desestimando la virtualidad y pidiendo foco exclusivo al espectador físico', isCorrect: false },
      { id: 'B', text: 'Habilitando interactividad Q&A asincrónica y switcheo de múltipes cámaras para emular lenguaje televisivo', isCorrect: true },
      { id: 'C', text: 'Pidiendo disculpas por correo y bajando drásticamente el costo de las entradas en línea', isCorrect: false },
      { id: 'D', text: 'Suspendiendo temporalmente la señal streaming', isCorrect: false }
    ], feedback: 'Refuerzo: El formato contemporáneo híbrido exige fluidez audiovisual multicámara para no caer en la monotonía pasiva.' },
  { id: 9, pillar: 'tipos', title: 'Ferias y Exposiciones', comp: 'Planificar', status: 'locked',
    desc: 'Gestión compleja de stands, branding y flujos de desplazamiento masivo.',
    problem: 'Implementaste un pabellón modular rectangular. Identificas un "pasillo muerto" al fondo al que los visitantes nunca van. Los stands locales te exigen la devolución de la inversión porque están ocultos.',
    options: [
      { id: 'A', text: 'Pides al personal de admisión redireccionar físicamente el embotellamiento hacia ese corredor de manera forzosa', isCorrect: false },
      { id: 'B', text: 'Aplicas descuentos directos del 50% de alquiler para paliar quejas', isCorrect: false },
      { id: 'C', text: 'Trasladas y reubicas un nodo principal (ej. Café, Show, o sorteo digital) para inyectar tráfico como "zona caliente"', isCorrect: true },
      { id: 'D', text: 'Manejas la situación cancelando iluminación general sectorizada, y concentrando brillos visuales', isCorrect: false }
    ], feedback: 'Explicativa: El comportamiento peatonal se gobierna mediante la distribución planeada de "zonas de anclaje" y focos de interés.' },
  { id: 10, pillar: 'tipos', title: 'El Gran Congreso', comp: 'Estructurar', status: 'locked',
    desc: 'Dinámica de un evento de macro aforo, varios días y formatos multisesión.',
    problem: 'Inició tu convención empresarial. Tienes un aforo asegurado de 1.100 clientes anotados, pero las tres salas Breakout (Talleres) que arrendaste admiten apenas un aforo sumado de 350 plazas técnicas concurrentes.',
    options: [
      { id: 'A', text: 'Reestructuras el salón demoliendo separaciones y ubicando 1.100 sillas apretadas', isCorrect: false },
      { id: 'B', text: 'Garantizas una gran Plenaria Master en paralelo (800 Plazas) e iscribes anticipadamente a los Talleres (300 plazas limitadas)', isCorrect: true },
      { id: 'C', text: 'Evades el problema dejando en standby técnico las conferencias para evitar avalanchas humanas', isCorrect: false },
      { id: 'D', text: 'Otorgas accesos directos por franjas limitadas, cancelando ingresos por 6 horas a la mitad del estadio', isCorrect: false }
    ], feedback: 'Global: Se resuelven déficit físicos organizando "Tracks Multidisciplinares" o Breakouts con programación de sesiones en bloque paralelo.' },

  // PILAR 3: Procedimientos
  { id: 11, pillar: 'procedimientos', title: 'Fases del Evento', comp: 'Ordenar', status: 'locked',
    desc: 'Las tres fases vitales: Pre, Pro y Post.',
    problem: 'Te encuentras en la zona VIP en pleno Día D del torneo musical (Producción Oficial) y de pronto la Policía interrumpe amenazando cancelar porque ninguna persona tramitó las pólizas de cierre de calle exterior. ¿Qué fallo metódico hubo?',
    options: [
      { id: 'A', text: 'Fue una negligencia puntual atada a la Posproducción de Eventos (Post)', isCorrect: false },
      { id: 'B', text: 'Fue un grave cuello de botella en la fase temporal de Preproducción y Permisología Institucional (Pre)', isCorrect: true },
      { id: 'C', text: 'Pertenecía netamente a una omisión delegable de Producción en Vivo (Pro)', isCorrect: false },
      { id: 'D', text: 'La entidad fiscalizadora debió tramitar y notificar unilateralmente', isCorrect: false }
    ], feedback: 'Correctiva: La Preproducción encaja toda la base legal y burocrática esencial, y nunca se deja para instancias terminales.' },
  { id: 12, pillar: 'procedimientos', title: 'El Cronograma', comp: 'Analizar', status: 'locked',
    desc: 'Gestión y control de una eficiente Ruta Crítica temporal.',
    problem: 'Pautaste un Timing Maestro. El responsable de audio entra a las 2 PM; el rigguer iluminador entra a las 4 PM. Inesperadamente, los de luces estacionan a las 2 PM para montar puentes y andamios pesados y demandan empezar ya. ¿Qué decisión asumes de inmediato?',
    options: [
      { id: 'A', text: 'Abres las puertas permitiendo a todas las cuadrillas maniobrar a destajo libre simultáneo', isCorrect: false },
      { id: 'B', text: 'Fuerzas al cumplimiento estricto del cronograma y relegas a los de iluminación fuera hasta su bloque temporal', isCorrect: false },
      { id: 'C', text: 'Adaptas la lógica Crítica reestructurando en el instante: El colgado aéreo (Rigging de Luz) forzosamente bloquea la zona y antecede al altavoz en piso o "Line Array". Modificas la grilla por funcionalidad espacial.', isCorrect: true },
      { id: 'D', text: 'Rompes el lazo contractual suspendiendo proveedores por incumplimiento de puntualidad e irresponsabilidad', isCorrect: false }
    ], feedback: 'Formativa: La lógica mecánica del espacio físico gobierna el Gantt: Si hay trabajos de carga colgada, la planimetría de suelo se congela (Regla Cero).' },
  { id: 13, pillar: 'procedimientos', title: 'Protocolo Ejecutivo', comp: 'Aplicar', status: 'locked',
    desc: 'Manejo riguroso de normativas y tratamientos en precedencias.',
    problem: 'La mesa principal en la entrega de las Medallas Nacionales tiene sólo dos sillas para discursos. En sala están aguardando tu Gobernador (Autoridad) y el propio Rector del Colegio que organiza e invita directamente a los alumnos. ¿Quién preside la línea 1?',
    options: [
      { id: 'A', text: 'El Rector ocupará lateral izquierdo (2), Gobernador Lateral Derecho (1)', isCorrect: false },
      { id: 'B', text: 'Gobernador centro absoluto, Rector ubicado y desplazado hacia derecha inmediata por cortesía', isCorrect: false },
      { id: 'C', text: 'Rector (anfitrión legítimo) toma la posición 1 y amparándose en la Ley de la Derecha aloja al Gobernador en el escaño 2', isCorrect: true },
      { id: 'D', text: 'El manual ordena dejar libre albedrío jerárquico según hora de ingreso personal de directivos', isCorrect: false }
    ], feedback: 'Explicativa: A nivel Protocolo Universal, el Anfitrión Titular conserva o puede ceder su plaza, situando comúnmente en Puesto 2 Derecha al Mayor Rango (Visita de Gobierno)' },
  { id: 14, pillar: 'procedimientos', title: 'Seguridad y Salud', comp: 'Evaluar', status: 'locked',
    desc: 'Leyes de prevención de riesgos (PRL) y aforos preventivos (SST).',
    problem: 'En plano general notas cómo 10 obreros se instalan sobre una cornisa de un escenario tridimensional a 4.5 metros, sin líneas de vida mecánicas, y omites tener la carpeta habilitada de Salidas de Evacuación local.',
    options: [
      { id: 'A', text: 'Utilizas tu Autoridad y detienes fulminante el rigging para imponer amarres salvavidas, junto a un cese preventivo para verificar Extintores y Puertas', isCorrect: true },
      { id: 'B', text: 'Asumes un rol burocrático y abres actas fotográficas únicamente para los Seguros de Cancelación ex post factum', isCorrect: false },
      { id: 'C', text: 'Redactas y anexas internamente una carta liberatoria evadiendo responsabilidades corporativas o penales', isCorrect: false },
      { id: 'D', text: 'Aceleras intensamente los montajes y exiges menos horas de pernocta en la faena crítica', isCorrect: false }
    ], feedback: 'Refuerzo: Normativa PRL manda parar la fuente de amenaza vital (Caída Cero). Un Administrador debe proteger la integridad per saltum cualquier contrato.' },
  { id: 15, pillar: 'procedimientos', title: 'Presupuesto Maestro', comp: 'Gestionar', status: 'locked',
    desc: 'Dinámica crítica económica en proyectos finitos e indexaciones inflacionarias.',
    problem: 'Siete días antes del mega evento, el cambio monetario se dispara encareciendo el pasaje aéreo y caché internacional pactado de tu exponente norteamericano un 30% en local. El saldo proyectado era Cero Mermas. Estás ahogado.',
    options: [
      { id: 'A', text: 'Acatas inmediatamente una caída comercial de evento declarada por Fuerza Mayor Cambiaria', isCorrect: false },
      { id: 'B', text: 'Desafectas las cuotas programadas de proveedores lumínicos internos o del alquiler principal', isCorrect: false },
      { id: 'C', text: 'Aulas o sobrecargas sorpresivamente montos impositivos hacia un canal de tickets previamente despachados', isCorrect: false },
      { id: 'D', text: 'Empleas holgadamente el % de Contingencias oculto en presupuesto P&L base, frenando de urgencia contrataciones no misionales anexas periféricas (exceso floristería/merchandising).', isCorrect: true }
    ], feedback: 'Global: Nunca existe presupuesto exento ni libre. El gestor siempre aisla un % intangible (Bottom-line Contingency) y ataca rubros "Deséables pero no Core" prioritariamente.' },

  // PILAR 4: Proyectos
  { id: 16, pillar: 'proyectos', title: 'Cotización al Cliente', comp: 'Argumentar', status: 'locked',
    desc: 'Metodologías para defensas ejecutivas ante pliegos exigentes.',
    problem: 'El consorcio promotor envía lineamientos exigiéndote integrar un escenario perimetral panorámico completo LCD pero ofertando un capital asignado para tableros pintados modestos convencionales. ¿Tu respuesta como Project Manager a cargo de la Venta Consultiva es...?',
    options: [
      { id: 'A', text: 'Afirmar el sí y construirlo luego bajo estándares mediocres engañosos amparados en subestimaciones', isCorrect: false },
      { id: 'B', text: 'Romper lazos y declinar de plano y unilateral el contacto ejecutivo aduciendo ofensa arancelaria', isCorrect: false },
      { id: 'C', text: 'Exhibir un dossier detallado con alternativas viables en rangos justificados y documentados, protegiendo técnicamente hasta la última fracción de inversión posible y con transparencia total de escalabilidad', isCorrect: true },
      { id: 'D', text: 'Exigir compulsivamente préstamos e inflación de cobros encubiertos mediante patrocinios dudosos extra para concretar la visión a pesar del dolor financiero', isCorrect: false }
    ], feedback: 'Formativa: El rol vital de las agencias (Account Management) es aterrizar ilusiones en planchas cotizables realistas para no dinamitar relaciones futuras.' },
  { id: 17, pillar: 'proyectos', title: 'Riders Estratégicos', comp: 'Evaluar', status: 'locked',
    desc: 'Toma de decisiones de contratación contractual e interpretación de "Hospitality riders".',
    problem: 'Revisando los Anexos y Riders de un Artista Extranjero, observas condiciones insólitas, excéntricas y extremadamente onerosas de marca en cáterin líquido para los camerinos aislados ("Agua Fiji Cristalizada", Expresos Moka Importados).',
    options: [
      { id: 'A', text: 'Acatas callando y despilfarras un diferencial abrumador del fondo o deudas forzadas internacionales o de divisas', isCorrect: false },
      { id: 'B', text: 'Abres una cadena urgente con Tour/Road Manager convalidando la sustitución con ofertas hídricas locales y equivalentes bajo previo mutuo o aval explícito', isCorrect: true },
      { id: 'C', text: 'Traspapelas su anexo técnico, montas tu logística barata y aduces escasez e inconseguibles horas previas evitando diálogo', isCorrect: false },
      { id: 'D', text: 'Cancelas unilateral y sancionatoriamente por vulnerar las normas territoriales, derivando conflicto judicial mercantil', isCorrect: false }
    ], feedback: 'Correctiva: Riders Hosteleros a menudo son estandarizados mundiales. Pueden y deben purificarse razonablemente sin amenazar las condiciones medulares (ej. Audio FOH o Backlines) negociando en fase contrato.' },
  { id: 18, pillar: 'proyectos', title: 'Simulador de Crisis', comp: 'Resolver', status: 'locked',
    desc: 'Liderar escenarios terminales para el "Directo" del Show.',
    problem: 'Escenario Fatal: Estadio repleto con 3,500 entradas VIP vendidas. A 40 minutos del Show Central se desata falla catastrófica en transformadores de calle perdiendo iluminación matriz y pantallas. Operas los Power-Banks autónomos a combustión logrando prender. ¿El accionar primario indispensable...?',
    options: [
      { id: 'A', text: 'Exigir aceleración de audio y pirotecnia de forma precipitada y lanzar artista en off por emergencia al show', isCorrect: false },
      { id: 'B', text: 'Emitir orden de Evacuaciones automáticas con aperturas forzosas provocando éxodo de 3,500 en ceguera e intentando reembolsar las pasarelas bancarias a todos', isCorrect: false },
      { id: 'C', text: 'Encender pasillos con lámparas de seguridad autónomas, estabilizar vías de salida con Guardias (Anti-pánico), realizar anunciador Voice Of God mitigando caos antes de enlazar la potencia limpia para el DJ alterno', isCorrect: true },
      { id: 'D', text: 'Conceder control a terceras partes ajenas como gerentes edilicios abandonando postestades al resguardo técnico perimetral', isCorrect: false }
    ], feedback: 'Explicativa: Toda matriz vital apunta al Antipánico general; asegurar sendas Vías y Evacuaciones pasivas en calma evita muertes (Tragedias por avalancha), relegando la fiesta a un escalafón secundario absoluto.' },
  { id: 19, pillar: 'proyectos', title: 'El Post-Evento (ROI)', comp: 'Medir', status: 'locked',
    desc: 'Midiendo la efectividad y la Evaluación final (Key Performance Indicators).',
    problem: 'Llegó el día después y tu Director Patrocinador convoca reunión sumariante y duda respecto a tus proyecciones. Indaga: "Costó carísimo, todos pernoctaron con barra libre y vi luces locas pero ¿valió eso nuestra inyección millonaria de Euros?". Tu refutación corporativa y gerencial debe ser:',
    options: [
      { id: 'A', text: 'Abrumarlos con testimonios, videos emocionales de invitados llorando de jolgorio, sin exhibir cifras pero imponiendo empatías visuales artísticas o estéticas para esquivar escrutinios financieros', isCorrect: false },
      { id: 'B', text: 'Desestimar dudas amparándose superficialmente en "el hecho empírico es que nadie acabo arrestado ni fracturado"', isCorrect: false },
      { id: 'C', text: 'Suministrar portafolios (Business Reviews) evidenciando "Leads Adquiridos, KPIs, Metricas de Redes Sociales englobadas por Hashtags de ROI netas e incrementos del MKT versus encuestas ponderables CSAT y NPS recogidas en tickets"', isCorrect: true },
      { id: 'D', text: 'Apelación rápida forzando facturaciones adelantadas y aduciendo que evaluar intangibles corporativos jamás competerá al organizador ferial ni agencia BTL', isCorrect: false }
    ], feedback: 'Refuerzo: El evento moderno consolida bases como Herramienta Estratégica. Retornar utilidades a través de leads generados y retornos pautados ratifica al Planner.' },
  { id: 20, pillar: 'proyectos', title: 'El Cierre Perfecto', comp: 'Liderar', status: 'locked',
    desc: 'La desconsolidación de campo (Load-out).',
    problem: 'Ceremonia de clausura: Aplausos de pie, VIPs complacidísimos. Extenuado todo el "Staff Táctico Tecnicolor", marchan veloces a hoteles. Al amanecer, auditores del Estado incautan depósitos bancarios tuyos (retienen fianza) y te notifican una Demanda Administrativa por Daños. ¿Cuál grave impericia omitiste en tu plan global?',
    options: [
      { id: 'A', text: 'Confiaste erradicadamente la limpieza pesada, depuraciones y desmontajes a empresas y dueños del local omitiendo tu cadena responsable y obligaciones de desconsolidar sin rastros dañinos u obscenos medioambientales (Load-out phase) que eviten menoscabar el ecosistema base', isCorrect: true },
      { id: 'B', text: 'No cobraste cuotas penalizadoras u "overs" por hora vencida en barras ni extorsionaste a asistentes rezagados asumiendo cargos o peajes', isCorrect: false },
      { id: 'C', text: 'Es un problema ajeno de un fiscal ajeno corruptible al cual olvidaste sobornar perdiendo inmunidades de tu Staff', isCorrect: false },
      { id: 'D', text: 'La omisión fue no obligar jurídicamente a que Proveedores retiren materiales de sus fletes u orquestas mediante contratos amparables', isCorrect: false }
    ], feedback: 'Cierre Pedagógico: La Ejecución fenece recién al entregar predios impecables (Cierre Técnico/Limpieza). Al lograr el equilibrio de Fases Eres un TECNÓLOGO SENA GRADUADO CON MATRÍCULA DE HONOR.' },
];

export default function App() {
  const [gameLevels] = useState(() => {
    const shuffleArray = <T,>(array: T[]): T[] => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };
    
    return shuffleArray(LEVELS).map((level, index) => {
      const labelIds = ['A', 'B', 'C', 'D'];
      const shuffledOptions = shuffleArray(level.options).map((opt, optIndex) => ({
        ...opt,
        id: labelIds[optIndex]
      }));
      
      return {
        ...level,
        id: index + 1,
        options: shuffledOptions
      };
    });
  });

  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [activeLevelId, setActiveLevelId] = useState(1);
  const [temporarySelection, setTemporarySelection] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // User Identification State
  const [isIdentified, setIsIdentified] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  const isGameFinished = Object.keys(answers).length === gameLevels.length;

  const dynamicLevels = gameLevels.map(l => {
    const hasAnswered = !!answers[l.id];
    const isCorrect = hasAnswered && l.options.find(o => o.id === answers[l.id])?.isCorrect;
    return {
      ...l,
      hasAnswered,
      isCorrect,
      status: hasAnswered ? 'completed' : l.id === unlockedLevel ? 'active' : 'locked'
    };
  });

  const currentLevel = dynamicLevels.find(l => l.id === activeLevelId) || dynamicLevels[0];
  const showFeedback = currentLevel.hasAnswered;
  const selectedOptionId = showFeedback ? answers[currentLevel.id] : temporarySelection;

  const getPillarInfo = (pillarId: string) => PILLARS.find(p => p.id === pillarId);
  const pillarInfo = getPillarInfo(currentLevel.pillar);

  // Helper for Sidebar Nodes
  const renderNavNode = (level: any) => {
    const isSelected = level.id === activeLevelId;
    let nodeClass = 'w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border shrink-0 transition-all cursor-pointer ';
    
    if (isSelected) {
      nodeClass += 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 ring-4 ring-indigo-50 border-indigo-600 z-10';
    } else if (level.hasAnswered) {
      if (level.isCorrect) {
        nodeClass += 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100';
      } else {
        nodeClass += 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100';
      }
    } else if (level.status === 'active') {
      nodeClass += 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50';
    } else {
      return (
        <div 
          key={level.id}
          onClick={() => {
            setActiveLevelId(level.id);
            setTemporarySelection(null);
          }}
          className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-[10px] text-slate-400 cursor-not-allowed shrink-0"
        >
          {level.id < 10 ? `0${level.id}` : level.id}
        </div>
      );
    }

    return (
      <div 
        key={level.id}
        onClick={() => {
          setActiveLevelId(level.id);
          setTemporarySelection(null);
        }}
        className={nodeClass}
      >
        {level.id < 10 ? `0${level.id}` : level.id}
      </div>
    );
  };

  const handleValidation = () => {
    if (temporarySelection && !currentLevel.hasAnswered) {
      setAnswers(prev => ({ ...prev, [currentLevel.id]: temporarySelection }));
      setUnlockedLevel(prev => Math.max(prev, currentLevel.id + 1));
      setTemporarySelection(null);
    }
  };

  const handleRestart = () => {
    if (showFeedback && isGameFinished) {
      const newAnswers = { ...answers };
      delete newAnswers[currentLevel.id];
      setAnswers(newAnswers);
      setTemporarySelection(selectedOptionId);
    } else if (!showFeedback) {
      setTemporarySelection(null);
    }
  };

  const correctAnswersCount = Object.entries(answers).filter(([levelIdStr, optionId]) => {
    const lvl = gameLevels.find(l => l.id === parseInt(levelIdStr));
    return lvl?.options.find(o => o.id === optionId)?.isCorrect;
  }).length;

  if (!isIdentified) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-slate-900 font-sans relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 max-w-md w-full z-10 mx-4 flex flex-col gap-6">
          <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl mx-auto mb-2 shadow-inner">
             <Trophy size={32} strokeWidth={2.5} />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">EVENT MASTER <span className="text-indigo-600">SENA</span></h1>
            <p className="text-sm text-slate-500 mt-2 font-medium">Identificación de Aprendiz</p>
          </div>
          
          <form className="flex flex-col gap-5 mt-2" onSubmit={(e) => { e.preventDefault(); if(userName.trim() && userId.trim()) setIsIdentified(true); }}>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nombre Completo</label>
              <input 
                type="text" 
                required
                value={userName}
                onChange={e => setUserName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-700"
                placeholder="Ej. Ana Gómez"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Documento de Identidad</label>
              <input 
                type="text" 
                required
                value={userId}
                onChange={e => setUserId(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-700"
                placeholder="Ej. 1020304050"
              />
            </div>
            <button 
              type="submit"
              disabled={!userName.trim() || !userId.trim()}
              className="mt-4 w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:bg-slate-300 rounded-xl text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
            >
              Comenzar Reto
              <ChevronRight size={18} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 font-sans text-slate-800 overflow-hidden">
      
      {/* HEADER - Sleek Theme */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm">
            <Trophy size={20} strokeWidth={2.5} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
            EVENT MASTER <span className="text-indigo-600 font-medium">SENA</span>
          </h1>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nivel {currentLevel.status === 'locked' ? 'Bloqueado' : 'Actual'}</span>
            <span className="text-sm font-bold text-indigo-600 max-w-[200px] sm:max-w-none truncate">{currentLevel.id < 10 ? `0${currentLevel.id}` : currentLevel.id}/20: {currentLevel.title}</span>
          </div>
          <div className="hidden md:block h-2.5 w-48 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{width: `${(Object.keys(answers).length / gameLevels.length) * 100}%`}}></div>
          </div>
          <div className="flex items-center gap-3 border-l pl-8 border-slate-200">
            <div className="text-right hidden sm:block max-w-[150px]">
              <p className="text-sm font-bold leading-none truncate">{userName}</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium truncate uppercase tracking-wide">ID: {userId}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400">
              <User size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* SIDEBAR (Progress/Levels) - Sleek Theme */}
        <aside className="w-20 bg-white border-r border-slate-200 flex flex-col items-center py-6 overflow-y-auto z-10 custom-scrollbar hide-scrollbar">
          <div className="relative flex flex-col items-center gap-4 py-4 w-full">
            {/* Connecting line behind nodes */}
            <div className="absolute top-0 bottom-0 w-[2px] bg-slate-100 left-1/2 -translate-x-1/2 z-0"></div>
            {dynamicLevels.map(renderNavNode)}
          </div>
        </aside>

        {/* CONTENT AREA - Sleek Theme */}
        <main className="flex-1 p-4 sm:p-8 flex flex-col gap-6 overflow-y-auto bg-slate-50/50">
          
          {/* Hero Banner */}
          <section className="bg-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden shrink-0">
            <div className="relative z-10">
              <span className="px-3 py-1.5 bg-indigo-500/30 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 inline-flex items-center gap-2 border border-indigo-400/20">
                <Target size={12} className="text-indigo-300"/>
                Pilar: {pillarInfo?.name}
              </span>
              <h2 className="text-3xl font-extrabold mb-3 tracking-tight">{currentLevel.title}</h2>
              <p className="text-indigo-100 max-w-3xl text-sm leading-relaxed text-balance opacity-90">
                {currentLevel.desc}
              </p>
            </div>
            {/* Decorative Gradients */}
            <div className="absolute right-[-10%] top-[-20%] w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute left-[30%] bottom-[-50%] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          </section>

          {/* Bento Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 min-h-0">
            
            {/* Left Column: Interactive Challenge Area */}
            <div className="col-span-1 md:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                    <PlayCircle size={20} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">Reto: Evaluación Situacional</h3>
                </div>
              </div>
              
              <div className="flex flex-col flex-1">
                {currentLevel.status === 'locked' ? (
                  <div className="flex-1 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col items-center justify-center p-6 min-h-[250px] relative text-slate-400 gap-3">
                    <Lock size={32} />
                    <span className="text-sm font-semibold">Nivel Bloqueado</span>
                    <span className="text-xs text-center max-w-xs">(Completa los niveles anteriores en secuencia para desbloquear este simulador).</span>
                  </div>
                ) : (
                  <>
                    <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 mb-6 shrink-0">
                      <div className="flex gap-4">
                        <AlertCircle className="text-amber-500 shrink-0 mt-1" size={24}/>
                         <p className="text-[15px] sm:text-base text-slate-700 font-medium leading-relaxed">
                           {currentLevel.problem}
                         </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                      {currentLevel.options.map(option => {
                        const isSelected = selectedOptionId === option.id;
                        let btnClass = "text-left p-4 rounded-xl border flex flex-col transition-all font-medium text-sm text-slate-700 h-full ";
                        
                        // Interaction styles
                        if (showFeedback) {
                           if (option.isCorrect) {
                             btnClass += "border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20";
                           } else if (isSelected && !option.isCorrect) {
                             btnClass += "border-red-400 bg-red-50 text-red-900 opacity-80 ring-2 ring-red-500/20";
                           } else {
                             btnClass += "border-slate-200 bg-slate-50 opacity-40 cursor-default";
                           }
                        } else {
                           if (isSelected) {
                             btnClass += "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/20 text-indigo-900 cursor-pointer shadow-md";
                           } else {
                             btnClass += "border-slate-200 bg-white shadow-sm cursor-pointer hover:border-indigo-300 hover:bg-slate-50 hover:shadow-md";
                           }
                        }

                        return (
                          <button 
                            key={option.id}
                            disabled={showFeedback}
                            onClick={() => setTemporarySelection(option.id)}
                            className={btnClass}
                          >
                            <span className="font-bold text-[11px] opacity-60 mb-2 tracking-wider flex items-center justify-between w-full">
                              OPCIÓN {option.id}
                              {showFeedback && option.isCorrect && <CheckCircle2 size={14} className="text-emerald-500"/>}
                            </span>
                            <span className="leading-relaxed">{option.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
              
              <div className="mt-8 flex justify-end gap-3 shrink-0 border-t border-slate-100 pt-6">
                <button 
                  onClick={handleRestart}
                  className={`px-6 py-2.5 border border-slate-300 hover:bg-slate-50 rounded-xl text-sm font-bold text-slate-600 transition-colors flex items-center gap-2 ${(currentLevel.status === 'locked' || (!selectedOptionId && !showFeedback)) ? 'opacity-0 pointer-events-none' : ''} ${showFeedback && !isGameFinished ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={showFeedback && !isGameFinished}
                >
                  <RefreshCw size={16}/>
                  Modificar
                </button>
                {showFeedback ? (
                  <button 
                    onClick={() => {
                      const nextId = currentLevel.id + 1;
                      if (nextId <= gameLevels.length) {
                        setActiveLevelId(nextId);
                        setTemporarySelection(null);
                      }
                    }}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl text-sm font-bold text-white shadow-lg shadow-emerald-200 transition-all flex items-center gap-2"
                  >
                    {currentLevel.id < gameLevels.length ? "Siguiente Nivel" : "Finalizar Reto"}
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button 
                    onClick={handleValidation}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 flex items-center gap-2"
                    disabled={currentLevel.status === 'locked' || !selectedOptionId || showFeedback}
                  >
                    Validar Decisión
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Info & Feedback */}
            <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
              
              {/* Technical Data Card */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 relative overflow-hidden shrink-0">
                {/* Accent line top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100">
                  <div className={`h-full w-1/3 ${pillarInfo?.color || 'bg-slate-300'}`}></div>
                </div>
                
                <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <BarChart size={16} className="text-slate-400"/>
                  Análisis Pedagógico
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Competencia a Evaluar</span>
                    <div className="inline-flex items-center bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold">
                      {currentLevel.comp}
                    </div>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Retroalimentación Técnica</span>
                    <p className={`text-sm font-medium p-4 rounded-xl leading-relaxed border transition-colors duration-500
                      ${showFeedback 
                        ? (currentLevel.options.find(o => o.id === selectedOptionId)?.isCorrect 
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                            : 'bg-red-50 border-red-100 text-red-800')
                        : 'bg-white border-slate-100 text-slate-400 italic'
                      }
                    `}>
                      {showFeedback ? currentLevel.feedback : "Selecciona una opción y valídala para visualizar la retroalimentación del sistema."}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Feedback / Progress Card */}
              <div className={`rounded-3xl border p-6 flex-1 flex flex-col relative overflow-hidden transition-colors duration-500 min-h-[150px]
                 ${showFeedback 
                  ? (currentLevel.options.find(o => o.id === selectedOptionId)?.isCorrect 
                      ? 'bg-emerald-50 border-emerald-100' 
                      : 'bg-red-50 border-red-100')
                  : 'bg-slate-50 border-slate-100'}
              `}>
                <div className={`absolute top-0 right-0 p-4 opacity-10 pointer-events-none
                   ${showFeedback && currentLevel.options.find(o => o.id === selectedOptionId)?.isCorrect ? 'text-emerald-900' : 'text-slate-900'}
                `}>
                   <Award size={64} />
                </div>
                
                <h3 className={`font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider
                  ${showFeedback 
                    ? (currentLevel.options.find(o => o.id === selectedOptionId)?.isCorrect 
                        ? 'text-emerald-900' 
                        : 'text-red-900')
                    : 'text-slate-500'}
                `}>
                  <CheckCircle2 size={16} />
                  Resultado del Reto
                </h3>
                
                <p className={`text-xs leading-relaxed mb-6 font-medium relative z-10
                  ${showFeedback 
                    ? (currentLevel.options.find(o => o.id === selectedOptionId)?.isCorrect 
                        ? 'text-emerald-700' 
                        : 'text-red-700')
                    : 'text-slate-400'}
                `}>
                  {showFeedback 
                    ? (currentLevel.options.find(o => o.id === selectedOptionId)?.isCorrect 
                        ? "¡Decisión Correcta! Has aplicado la competencia técnica eficientemente para el Programa de Producción de Eventos."
                        : "Decisión Incorrecta. Analiza la retroalimentación técnica y continúa con el siguiente nivel.")
                    : "Analiza el escenario crítico y selecciona la respuesta más profesional que brinde solución operativa y administrativa al caso expuesto."
                  }
                </p>
                
                <div className="mt-auto space-y-2">
                  <div className={`flex justify-between text-[10px] font-extrabold tracking-widest uppercase
                     ${showFeedback && currentLevel.options.find(o => o.id === selectedOptionId)?.isCorrect ? 'text-emerald-800' : 'text-slate-400'}
                  `}>
                    <span>Reputación Obtenida</span>
                    <span>{showFeedback && currentLevel.options.find(o => o.id === selectedOptionId)?.isCorrect ? '100 PI Pts' : '0 PI'}</span>
                  </div>
                  <div className={`h-2.5 w-full rounded-full overflow-hidden shadow-inner
                     ${showFeedback && currentLevel.options.find(o => o.id === selectedOptionId)?.isCorrect ? 'bg-emerald-200/50' : 'bg-slate-200/50'}
                  `}>
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 
                         ${showFeedback && currentLevel.options.find(o => o.id === selectedOptionId)?.isCorrect ? 'bg-emerald-500 w-full' : 'bg-slate-300 w-0'}
                      `}
                    ></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* FOOTER - Sleek Theme */}
      <footer className="h-12 bg-slate-900 text-white flex items-center justify-between px-4 sm:px-8 text-[10px] font-bold tracking-widest uppercase z-20 shrink-0">
        <div className="flex gap-4 sm:gap-8 opacity-60">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Event Planner</span>
          <span className="hidden sm:flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> SENA Regional</span>
        </div>
        <div className="flex gap-4 sm:gap-6 items-center bg-slate-800 px-4 py-1.5 rounded-full">
          <span className="text-indigo-400 flex items-center gap-1.5">
            <Trophy size={12}/>
            {correctAnswersCount * 250} XP
          </span>
          <span className="w-px h-3 bg-slate-600 hidden sm:block"></span>
          <span className="text-slate-300 hidden sm:block">Rango: <span className="text-white">Organizador Junior</span></span>
        </div>
      </footer>

      {/* Global CSS required to hide the ugly native scrollbars but keep functionality */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
}

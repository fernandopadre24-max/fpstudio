import { StudioService, StudioRoom, UserProfile, BookingRequest, ChatMessage, PushNotification, TransactionRecord, PixQuote, AdminCredentials } from '../types';

export const INITIAL_ADMIN_CREDENTIALS: AdminCredentials = {
  name: "Fernando Padre",
  email: "fpstudio2027@gmail.com",
  phone: "(71) 9 8118-4589",
  password: "123456",
  pin: "0000",
  backupPins: ["0000"],
  updatedAt: new Date().toISOString(),
};

export const INITIAL_STUDIO_INFO = {
  name: "FPStudio",
  subtitle: "Gravações e Edição Video",
  cnpj: "12.345.678/0001-90",
  pixKey: "36790486534",
  pixKeyType: "CPF / Chave PIX" as const,
  pixBeneficiary: "FPStudio (Nubank)",
  city: "Salvador - BA",
  address: "Trav. Dois Leões, 19 - Pernambués",
  fullAddress: "Travessa Dois Leões, 19 - Pernambués, Salvador - BA, CEP 41110-050",
  cep: "41110-050",
  phone: "(71) 9 8118-4589",
  whatsapp: "5571981184589",
  email: "fpstudio2027@gmail.com",
};

export const INITIAL_ROOMS: StudioRoom[] = [
  {
    id: "room-a",
    name: "Sala A - Gravação Principal & Produção",
    description: "Ambiente acústico completo do FPStudio equipado com DAW Pro-Tools, placa M-Audio Pro, monitoramento caixas TOMATO e microfonação KADOSH 412.",
    hourlyRate: 130,
    capacity: 8,
    equipmentList: [
      "DAW Pro-Tools",
      "Microfone KADOSH 412",
      "Placa de Áudio M-Audio Pro",
      "Caixas TOMATO",
      "Guitarras Ibanez e Memphis",
      "Baixo 6 cordas e 5 cordas",
      "Violão Aço e Nylon"
    ],
  },
  {
    id: "room-b",
    name: "Sala B - Estúdio de Instrumentos & Edição",
    description: "Espaço projetado para gravação de Bateria, Baixo, Guitarras, Teclado, Percussão, Sanfona e Violino com acústica tratada.",
    hourlyRate: 95,
    capacity: 6,
    equipmentList: [
      "DAW Pro-Tools",
      "Placa de Áudio M-Audio Pro",
      "Caixas TOMATO",
      "Microfones KADOSH 412",
      "Guitarras Ibanez & Memphis",
      "Baixo 5 e 6 cordas",
      "Violão Aço & Nylon"
    ],
  },
  {
    id: "room-c",
    name: "Cabine Vocal & Edição de Vídeo",
    description: "Cabine acústica isolada para gravação de Voz, Voz Guia, Afinação de Voz, Edição de Bateria e Produção de Vinhetas.",
    hourlyRate: 85,
    capacity: 4,
    equipmentList: [
      "DAW Pro-Tools",
      "Microfone KADOSH 412",
      "Placa de Áudio M-Audio Pro",
      "Caixas TOMATO",
      "Ilha de Edição de Vídeo Pro"
    ],
  },
];

export const FPSTUDIO_EQUIPMENT = [
  { category: "DAW & Áudio", item: "DAW Pro-Tools (Incluso)" },
  { category: "Microfonação", item: "Microfone KADOSH 412 (Incluso)" },
  { category: "Placa de Áudio", item: "Placa de Áudio M-Audio Pro (Incluso)" },
  { category: "Monitoramento", item: "Caixas TOMATO" },
  { category: "Guitarras", item: "Guitarra Ibanez e Memphis" },
  { category: "Baixos", item: "Baixo 6 cordas e Baixo 5 cordas" },
  { category: "Violões", item: "Violão Aço e Violão Nylon" },
];

export interface RecordingOption {
  id: string;
  label: string;
  instrumentName?: string;
  sublabel?: string;
  categoryGroup?: string;
  type: 'instrument' | 'vocal' | 'edition';
  price: number;
}

export const RECORDING_OPTIONS: RecordingOption[] = [
  // Equipamentos & DAWs Inclusos (R$ 0)
  { id: "pro_tools", label: "DAW Avid Pro-Tools 2024", instrumentName: "Pro-Tools 2024", sublabel: "Estação de trabalho de áudio digital profissional", categoryGroup: "Inclusos", type: "edition", price: 0 },
  { id: "microfone", label: "Microfone Condensador Kadosh 412", instrumentName: "Microfone Kadosh 412", sublabel: "Cápsula de grande diafragma para vozes e acústicos", categoryGroup: "Inclusos", type: "edition", price: 0 },
  { id: "placa_audio", label: "Placa de Áudio M-Audio Pro HD", instrumentName: "Placa M-Audio Pro", sublabel: "Conversores 24-bit/192kHz de baixíssima latência", categoryGroup: "Inclusos", type: "edition", price: 0 },
  { id: "monitores_tomato", label: "Monitores de Referência TOMATO", instrumentName: "Caixas TOMATO", sublabel: "Monitoramento de estúdio de alta fidelidade", categoryGroup: "Inclusos", type: "edition", price: 0 },

  // Guitarras & Baixos
  { id: "guitarra_ibanez", label: "Guitarra Ibanez Steve Vai Signature", instrumentName: "Guitarra Ibanez Steve Vai", sublabel: "Ponte Floyd Rose, captadores DiMarzio para solos e riffs", categoryGroup: "Guitarras & Baixos", type: "instrument", price: 130 },
  { id: "guitarra_memphis", label: "Guitarra Memphis by Tagima ST-180", instrumentName: "Guitarra Memphis Tagima", sublabel: "Timbre clássico Strato para bases limpas e funk/pop", categoryGroup: "Guitarras & Baixos", type: "instrument", price: 130 },
  { id: "guitarra_strinberg", label: "Guitarra Strinberg EAD-20 Les Paul", instrumentName: "Guitarra Strinberg Les Paul", sublabel: "Corpo em mogno com timbre encorpado e sustain", categoryGroup: "Guitarras & Baixos", type: "instrument", price: 130 },
  { id: "baixo_6cordas", label: "Contrabaixo 6 Cordas Ativo Pro", instrumentName: "Baixo 6 Cordas Ativo", sublabel: "Afinação B-E-A-D-G-C com pré-amp 3 bandas ativo", categoryGroup: "Guitarras & Baixos", type: "instrument", price: 120 },
  { id: "baixo_5cordas", label: "Contrabaixo 5 Cordas Jazz Bass Ativo", instrumentName: "Baixo 5 Cordas Jazz Bass", sublabel: "Graves profundos na corda B para Sertanejo e Piseiro", categoryGroup: "Guitarras & Baixos", type: "instrument", price: 120 },
  { id: "baixo_4cordas", label: "Contrabaixo 4 Cordas Precision Bass", instrumentName: "Baixo 4 Cordas Precision", sublabel: "Pegada clássica encorpada para Rock, Pop e Reggae", categoryGroup: "Guitarras & Baixos", type: "instrument", price: 120 },

  // Violões & Sanfona
  { id: "violao_aco", label: "Violão Aço Folk Tampo Sólido", instrumentName: "Violão Aço Folk", sublabel: "Brilho cristalino e harmônicos com captação dupla", categoryGroup: "Violões & Sanfona", type: "instrument", price: 100 },
  { id: "violao_nylon", label: "Violão Nylon Clássico Cutaway", instrumentName: "Violão Nylon Clássico", sublabel: "Tampo em pinho selecionado para MPB, Samba e Bossa", categoryGroup: "Violões & Sanfona", type: "instrument", price: 100 },
  { id: "sanfona_todeschini", label: "Sanfona Todeschini 80/120 Baixos", instrumentName: "Sanfona Todeschini 80/120 Baixos", sublabel: "Vozes de aço sueco para Forró, Baião e Sertanejo", categoryGroup: "Violões & Sanfona", type: "instrument", price: 160 },

  // Bateria & Percussão
  { id: "bateria_acustica", label: "Bateria Acústica Completa Multicanal", instrumentName: "Bateria Acústica Multicanal", sublabel: "Captação independente de bumbo, caixa, tons e over estéreo", categoryGroup: "Bateria & Percussão", type: "instrument", price: 180 },
  { id: "percussao_completa", label: "Percussão Completa & Acessórios", instrumentName: "Percussão Completa (Pandeiro/Rebolo/Shaker)", sublabel: "Pandeiro, rebolo, tantan, shaker, triângulo e zabumba", categoryGroup: "Bateria & Percussão", type: "instrument", price: 100 },

  // Teclados, Sintetizadores & Violino
  { id: "teclado_midi", label: "Teclado Controlador MIDI + Pianos VST", instrumentName: "Teclado MIDI + Pianos Kontakt/Keyscape", sublabel: "Pianos Steinway, Rhodes, Hammond B3 e Omnisphere 2", categoryGroup: "Teclados & Cordas", type: "instrument", price: 110 },
  { id: "violino_acustico", label: "Violino Acústico Orquestral", instrumentName: "Violino Acústico Orquestral", sublabel: "Gravação expressiva de cordas para arranjos acústicos", categoryGroup: "Teclados & Cordas", type: "instrument", price: 150 },

  // Vocais
  { id: "voz_principal", label: "Voz Principal (Captação Microfone Kadosh 412)", instrumentName: "Voz Principal (Microfone Kadosh)", sublabel: "Captação em cabine tratada acusticamente com pop-filter", categoryGroup: "Vocais", type: "vocal", price: 130 },
  { id: "voz_guia_backing", label: "Backing Vocal / Voz Guia & Dobras", instrumentName: "Backing Vocal & Voz Guia", sublabel: "Harmonias, tercinas e guias melódicas para arranjo", categoryGroup: "Vocais", type: "vocal", price: 90 },

  // Edição & Tratamento Pro-Tools
  { id: "afinacao_melodyne", label: "Afinação de Voz Cirúrgica (Melodyne Pro 5)", instrumentName: "Afinação de Voz (Melodyne Pro)", sublabel: "Correção de pitch nota por nota mantendo a naturalidade", categoryGroup: "Edição Pro-Tools", type: "edition", price: 120 },
  { id: "edicao_bateria_grid", label: "Edição e Alinhamento de Bateria no Grid", instrumentName: "Alinhamento de Bateria no Grid", sublabel: "Quantização precisa de bumbo, caixa e pratos no Pro-Tools", categoryGroup: "Edição Pro-Tools", type: "edition", price: 140 },

  // Compatibilidade com IDs anteriores
  { id: "bateria", label: "Bateria (Gravação & Quantização)", instrumentName: "Bateria Acústica", sublabel: "Bateria completa com edição no Pro-Tools", categoryGroup: "Bateria & Percussão", type: "instrument", price: 180 },
  { id: "guitarra", label: "Guitarra (Base/Solo & Timbragem)", instrumentName: "Guitarras Ibanez / Memphis", sublabel: "Guitarras elétricas com timbragem e gravação", categoryGroup: "Guitarras & Baixos", type: "instrument", price: 130 },
  { id: "violao", label: "Violão Aço/Nylon", instrumentName: "Violão Aço / Nylon", sublabel: "Violões profissionais para base e solo", categoryGroup: "Violões & Sanfona", type: "instrument", price: 100 },
  { id: "baixo", label: "Baixo 4/5/6 Cordas", instrumentName: "Baixo Elétrico 4/5/6 Cordas", sublabel: "Contrabaixos com gravação em Direct Box ativo", categoryGroup: "Guitarras & Baixos", type: "instrument", price: 120 },
  { id: "teclado", label: "Teclado / VSTs MIDI", instrumentName: "Teclado / VSTs MIDI", sublabel: "Arranjos de teclado e sintetizador", categoryGroup: "Teclados & Cordas", type: "instrument", price: 110 },
  { id: "percussao", label: "Percussão Completa", instrumentName: "Percussão Geral", sublabel: "Instrumentos de percussão acústica", categoryGroup: "Bateria & Percussão", type: "instrument", price: 100 },
  { id: "sanfona", label: "Sanfona Todeschini", instrumentName: "Sanfona Todeschini", sublabel: "Acordeon tradicional para Forró e Sertanejo", categoryGroup: "Violões & Sanfona", type: "instrument", price: 160 },
  { id: "violino", label: "Violino Acústico", instrumentName: "Violino Acústico", sublabel: "Captação acústica de violino", categoryGroup: "Teclados & Cordas", type: "instrument", price: 150 },
  { id: "voz_guia", label: "Voz Guia / Backing Vocal", instrumentName: "Voz Guia / Backing Vocal", sublabel: "Gravação de guia e segundas vozes", categoryGroup: "Vocais", type: "vocal", price: 90 },
  { id: "voz", label: "Voz Principal (Captação Pro)", instrumentName: "Voz Principal", sublabel: "Captação profissional de vocal", categoryGroup: "Vocais", type: "vocal", price: 130 },
  { id: "afinacao_voz", label: "Afinação de Voz (Melodyne Pro)", instrumentName: "Afinação Melodyne", sublabel: "Correção de afinação vocal", categoryGroup: "Edição Pro-Tools", type: "edition", price: 120 },
  { id: "edicao_bateria", label: "Edição e Alinhamento de Bateria", instrumentName: "Edição de Bateria", sublabel: "Alinhamento de bateria no tempo", categoryGroup: "Edição Pro-Tools", type: "edition", price: 140 },
];

export const INITIAL_SERVICES: StudioService[] = [
  {
    id: "srv-autoral-com-arranjo",
    name: "Música Autoral (Com Arranjo)",
    description: "Produção completa de composição autoral no FPStudio com criação de arranjo instrumental sob medida, captação multicanal e gravação no Pro-Tools.",
    category: "produção",
    defaultRoomId: "room-a",
    defaultRoomName: "Sala A - Gravação Principal & Produção",
    durationHours: 4,
    basePrice: 1200,
    iconName: "Music2",
    imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "srv-autoral-sem-arranjo",
    name: "Música Autoral (Sem Arranjo)",
    description: "Gravação direta e captação da sua música autoral com voz guia, instrumento base (violão/teclado) ou acompanhamento simples.",
    category: "gravação",
    defaultRoomId: "room-a",
    defaultRoomName: "Sala A - Gravação Principal & Produção",
    durationHours: 2,
    basePrice: 550,
    iconName: "Mic2",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "srv-comum-com-arranjo",
    name: "Música Comum (Com Arranjo)",
    description: "Gravação de música comum/cover com arranjo instrumental exclusivo personalizado com instrumentos da sua escolha.",
    category: "produção",
    defaultRoomId: "room-a",
    defaultRoomName: "Sala A - Gravação Principal & Produção",
    durationHours: 3,
    basePrice: 850,
    iconName: "Sliders",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "srv-comum-sem-arranjo",
    name: "Música Comum (Sem Arranjo)",
    description: "Captação rápida de voz e instrumentos para reprodução de música comum sobre playback/VS com alinhamento.",
    category: "gravação",
    defaultRoomId: "room-b",
    defaultRoomName: "Sala B - Estúdio de Instrumentos & Edição",
    durationHours: 2,
    basePrice: 350,
    iconName: "Disc3",
    imageUrl: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "srv-vinheta",
    name: "Vinheta Profissional",
    description: "Criação, locução profissional, gravação, efeitos e edição de vinheta para comerciais, podcasts, rádio e redes sociais.",
    category: "dublagem",
    defaultRoomId: "room-c",
    defaultRoomName: "Cabine Vocal & Edição de Vídeo",
    durationHours: 1,
    basePrice: 280,
    iconName: "Radio",
    imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "srv-edicao-afinacao",
    name: "Edição de Bateria & Afinação de Voz",
    description: "Tratamento de áudio em Pro-Tools: quantização/alinhamento de bateria e afinação nota por nota de vozes no Melodyne Pro.",
    category: "mix_master",
    defaultRoomId: "room-c",
    defaultRoomName: "Cabine Vocal & Edição de Vídeo",
    durationHours: 2,
    basePrice: 350,
    iconName: "AudioWaveform",
    imageUrl: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "srv-mix-master",
    name: "Mixagem & Masterização Profissional",
    description: "Equilíbrio de frequências, espacialidade estéreo, processamento analógico virtual (SSL/Neve) e masterização padrão streaming (-14 LUFS).",
    category: "mix_master",
    defaultRoomId: "room-a",
    defaultRoomName: "Sala A - Gravação Principal & Produção",
    durationHours: 3,
    basePrice: 450,
    iconName: "Sliders",
    imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "srv-video-session",
    name: "Live Session & Gravação em Vídeo",
    description: "Captação de vídeo de alta definição em estúdio com iluminação cênica, áudio multicanal sincronizado e edição para YouTube e Redes Sociais.",
    category: "produção",
    defaultRoomId: "room-a",
    defaultRoomName: "Sala A - Gravação Principal & Produção",
    durationHours: 3,
    basePrice: 800,
    iconName: "Music2",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
  },
];

export const INITIAL_CLIENTS: UserProfile[] = [];

export const INITIAL_BOOKINGS: BookingRequest[] = [];

export const INITIAL_QUOTES: PixQuote[] = [];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [];

export const INITIAL_NOTIFICATIONS: PushNotification[] = [
  {
    id: "notif-init-1",
    targetRole: "studio",
    title: "🎉 Bem-vindo ao Painel FPStudio!",
    message: "A central de avisos está conectada em tempo real. Novos pedidos, comprovantes PIX e avaliações aparecerão aqui.",
    type: "system",
    read: false,
    timestamp: new Date().toISOString(),
  },
  {
    id: "notif-init-2",
    targetRole: "studio",
    title: "⚡ Alertas em Tempo Real Ativos",
    message: "Notificações instantâneas ativadas para controle de agenda, pagamentos e chat direto com artistas.",
    type: "info",
    read: false,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "notif-init-3",
    targetRole: "client",
    title: "🎧 Bem-vindo ao FPStudio!",
    message: "Escolha seu serviço de gravação, agende um horário e receba seu orçamento e chave PIX oficial instantaneamente.",
    type: "info",
    read: false,
    timestamp: new Date().toISOString(),
  },
];

export const INITIAL_TRANSACTIONS: TransactionRecord[] = [];

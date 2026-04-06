// ===== TYPES GLOBAIS =====

export interface Jogador {
  id: string;
  nome: string;
  email?: string;
  master: boolean;
  fotoUrl?: string;
  criadoEm: any;
}

export interface Time {
  id: string;
  nome: string;
  escudo?: string;
  jogadores: string[]; // IDs
}

export interface ClubePadrao {
  id: string;
  nome: string;
  forca: number;
  bandeira: string;
  liga: string;
  logo: string;
}

export interface SelecaoPadrao {
  id: string;
  nome: string;
  forca: number;
  bandeira: string;
}

export interface Dupla {
  id: string;
  jogador1Id: string;
  jogador2Id: string;
  nome?: string;
}

export interface DuplaSelecao {
  clube?: ClubePadrao;
  selecao?: SelecaoPadrao;
}

export interface Amistoso {
  id: string;
  time1: {
    nome: string;
    jogadores: Jogador[];
    duplas?: Dupla[];
    clube?: ClubePadrao;
    selecao?: SelecaoPadrao;
  };
  time2: {
    nome: string;
    jogadores: Jogador[];
    duplas?: Dupla[];
    clube?: ClubePadrao;
    selecao?: SelecaoPadrao;
  };
  placar?: { time1: number; time2: number };
  status: 'sorteando' | 'confirmado' | 'finalizado';
  resultado?: { vencedor: string; placar: { time1: number; time2: number } };
  emModoDupla?: boolean;
  tipoSelecionado?: 'clube' | 'selecao';
  criadoEm: any;
}

export interface Torneio {
  id: string;
  nome: string;
  tipo: 'champions' | 'brasileirao' | 'libertadores' | 'paulistao' | 'copa-brasil' | 'copa-do-mundo';
  status: 'ativo' | 'finalizado';
  fase: 'grupos' | 'classificatorias';
  participantes: Participante[];
  grupos?: Grupo[];
  emModoDupla?: boolean;
  tipoParticipante?: 'clube' | 'selecao';
  criadoEm: any;
}

export interface Grupo {
  id: string;
  nome: string;
  times: Time[];
  tabela: TabelaPosicao[];
  amistosos?: Amistoso[];
}

export interface TabelaPosicao {
  time: Time;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  gp: number;
  gc: number;
  pontos: number;
}

export interface Participante {
  id: string;
  nome: string;
  tipo: 'clube' | 'selecao';
}

export interface HistoricoJogo {
  id: string;
  jogadorId: string;
  tipo: 'amistoso' | 'torneio' | 'dupla';
  adversarioId?: string;
  adversarioNome?: string;
  resultado: 'vitoria' | 'derrota' | 'empate';
  gp: number;
  gc: number;
  placarTime1: number;
  placarTime2: number;
  data: any;
  timeId?: string;
  timeName?: string;
  duplaId?: string;
}

export interface Estatistica {
  jogadorId: string;
  nome: string;
  time?: Time;
  vitorias: number;
  empates: number;
  derrotas: number;
  gp: number;
  gc: number;
  pontos: number;
  historicoJogos?: HistoricoJogo[];
}

export interface TorneioMeta {
  nome: string;
  tipo: 'clubes' | 'selecoes';
  logo: string;
}

export interface DadosTime {
  abrev: string;
  fundo: string;
  cor: string;
  pais: string;
  paisNome: string;
  crest: string;
}

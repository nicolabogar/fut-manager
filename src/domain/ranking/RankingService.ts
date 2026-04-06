import { rankingRepository } from './RankingRepository';
import type { Estatistica, HistoricoJogo } from '@config/types';
import {
  collection, addDoc, getDocs, query, where, orderBy, serverTimestamp
} from 'firebase/firestore';
import { db } from '@config/firebase';

export class RankingService {
  private historicoCollection = 'historico_jogos';

  async getTop(n: number = 10): Promise<Estatistica[]> {
    return rankingRepository.getTopN(n);
  }

  async getEstatisticas(jogadorId: string): Promise<Estatistica | null> {
    return rankingRepository.getByJogadorId(jogadorId);
  }

  async getTodos(): Promise<Estatistica[]> {
    const todos = await rankingRepository.getAll();
    return todos.sort((a, b) => b.pontos - a.pontos);
  }

  /** Busca histórico real do Firestore, com filtros opcionais */
  async getHistorico(
    jogadorId: string,
    tipo?: 'amistoso' | 'torneio' | 'dupla',
    adversarioNome?: string
  ): Promise<HistoricoJogo[]> {
    try {
      const colRef = collection(db, this.historicoCollection);
      const q = query(colRef, where('jogadorId', '==', jogadorId), orderBy('data', 'desc'));
      const snap = await getDocs(q);
      let jogos = snap.docs.map(d => ({ id: d.id, ...d.data() } as HistoricoJogo));

      if (tipo) {
        jogos = jogos.filter(j => j.tipo === tipo);
      }
      if (adversarioNome) {
        const lower = adversarioNome.toLowerCase();
        jogos = jogos.filter(j => j.adversarioNome?.toLowerCase().includes(lower));
      }
      return jogos;
    } catch {
      return [];
    }
  }

  /** Registra resultado e grava no histórico */
  private async registrarHistorico(
    jogadorId: string,
    tipo: HistoricoJogo['tipo'],
    resultado: HistoricoJogo['resultado'],
    adversarioNome: string,
    gp: number,
    gc: number,
    placarTime1: number,
    placarTime2: number
  ): Promise<void> {
    try {
      await addDoc(collection(db, this.historicoCollection), {
        jogadorId,
        tipo,
        resultado,
        adversarioNome,
        gp,
        gc,
        placarTime1,
        placarTime2,
        data: serverTimestamp(),
      });
    } catch (e) {
      console.error('Erro ao gravar histórico:', e);
    }
  }

  /** Registra vitória — se emDupla, aplica para os 2 jogadores */
  async registrarResultado(params: {
    jogadorIds: string[];
    nomes: string[];
    resultado: 'vitoria' | 'derrota' | 'empate';
    tipo: HistoricoJogo['tipo'];
    adversarioNome: string;
    gp: number;
    gc: number;
    placarTime1: number;
    placarTime2: number;
    emDupla?: boolean;
  }): Promise<void> {
    const pontosPorResultado = { vitoria: 3, empate: 1, derrota: 0 };

    for (let i = 0; i < params.jogadorIds.length; i++) {
      const jogadorId = params.jogadorIds[i];
      const nome = params.nomes[i];
      const pontos = pontosPorResultado[params.resultado];

      const existente = await rankingRepository.getByJogadorId(jogadorId);
      if (existente && existente.id) {
        await rankingRepository.update(existente.id, {
          vitorias: existente.vitorias + (params.resultado === 'vitoria' ? 1 : 0),
          empates:  existente.empates  + (params.resultado === 'empate'  ? 1 : 0),
          derrotas: existente.derrotas + (params.resultado === 'derrota' ? 1 : 0),
          gp:       existente.gp + params.gp,
          gc:       existente.gc + params.gc,
          pontos:   existente.pontos + pontos,
        } as any);
      } else {
        await rankingRepository.add({
          jogadorId,
          nome,
          vitorias: params.resultado === 'vitoria' ? 1 : 0,
          empates:  params.resultado === 'empate'  ? 1 : 0,
          derrotas: params.resultado === 'derrota' ? 1 : 0,
          gp:       params.gp,
          gc:       params.gc,
          pontos,
        } as any);
      }

      await this.registrarHistorico(
        jogadorId,
        params.tipo,
        params.resultado,
        params.adversarioNome,
        params.gp,
        params.gc,
        params.placarTime1,
        params.placarTime2
      );
    }
  }

  // ─── Atalhos legados ──────────────────────────────────────
  async registrarVitoria(jogadorId: string, nome: string, gp = 0, gc = 0): Promise<void> {
    await this.registrarResultado({ jogadorIds: [jogadorId], nomes: [nome], resultado: 'vitoria', tipo: 'amistoso', adversarioNome: '', gp, gc, placarTime1: gp, placarTime2: gc });
  }
  async registrarEmpate(jogadorId: string, nome: string, gp = 0, gc = 0): Promise<void> {
    await this.registrarResultado({ jogadorIds: [jogadorId], nomes: [nome], resultado: 'empate', tipo: 'amistoso', adversarioNome: '', gp, gc, placarTime1: gp, placarTime2: gc });
  }
  async registrarDerrota(jogadorId: string, nome: string, gp = 0, gc = 0): Promise<void> {
    await this.registrarResultado({ jogadorIds: [jogadorId], nomes: [nome], resultado: 'derrota', tipo: 'amistoso', adversarioNome: '', gp, gc, placarTime1: gp, placarTime2: gc });
  }
}

export const rankingService = new RankingService();

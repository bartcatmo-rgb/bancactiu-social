'use client';

import React, { useState } from 'react';
import {
  HeartHandshake,
  Wrench,
  Gift,
  Users,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Clock,
  FileText,
  Hammer
} from 'lucide-react';
import {
  RadialAuraBackground,
  GlassCard,
  GlassButton,
  GlassBadge,
  GlassHeader,
  GlassModal,
  GatewayLauncher,
  AppDefinition
} from '@bancactiu/ui-glass';
import { BancActiuSocialWorkspace } from '../components/workspaces/BancActiuSocialWorkspace';

export default function BancActiuSocialPage() {
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'fitxa-social' | 'taller-solidari'>('fitxa-social');

  const reparacionsTaller = [
    { id: 'rep-1', codi: 'CR-LUG-04', element: 'Cadira de Rodes Autopropulsable', accio: 'Ajust de rodaments i frens bilaterals', voluntari: 'Albert Puig (Mecànic Voluntari)', estat: 'PUNT_A_PUNT' },
    { id: 'rep-2', codi: 'CAM-ROD-09', element: 'Caminador 4 Rodes', accio: 'Substitució de gomes antilliscants i seient', voluntari: 'Josep Maria Almirall', estat: 'PUNT_A_PUNT' },
    { id: 'rep-3', codi: 'LLIT-ART-01', element: 'Llit Articulat Elèctric', accio: 'Revisió de motor de pujada i comandament', voluntari: 'Carles Miralles', estat: 'EN_TALLER' },
  ];

  const handleAppSelect = (app: AppDefinition) => {
    if (app.id === 'bancactiu-social') {
      setIsLauncherOpen(false);
      return;
    }
    window.location.href = `http://localhost:${app.port}`;
  };

  return (
    <RadialAuraBackground variant="social">
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col justify-between min-h-screen">
        <GlassHeader
          appName="BancActiu Social (Creu Roja & Serveis Socials)"
          badgeText="Tercer Sector & Voluntariat"
          badgeVariant="rose"
          userNom="Carles Miralles (Coordinador Creu Roja)"
          userRol="Xarxa de Suport Comunitari Cornellà"
          onOpenLauncher={() => setIsLauncherOpen(true)}
        />

        <main className="flex-1 my-6 space-y-6">
          {/* BANNER DE BENWINGUDA & SELECTOR DE PESTANYES */}
          <GlassCard variant="glow" glowColor="rose" className="p-4 sm:p-6 border-rose-500/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <HeartHandshake className="w-6 h-6 text-rose-400" />
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Portal de Serveis Socials, Voluntariat i Ajudes Tècniques
                  </h2>
                  <GlassBadge variant="rose">Assemblea Creu Roja Cornellà</GlassBadge>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  Coordinació municipal entre els Serveis Socials de l'Ajuntament de Cornellà, les assemblees de Creu Roja
                  i les associacions veïnals per a la gestió integral de dependència, ajudes tècniques i voluntariat comunitari.
                </p>
              </div>

              {/* TABS SELECTOR */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/60 border border-white/10 shrink-0">
                <button
                  onClick={() => setActiveTab('fitxa-social')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'fitxa-social'
                      ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-lg shadow-rose-500/25 border border-rose-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FileText size={15} />
                  <span>Fitxa Social & Dependència</span>
                </button>
                <button
                  onClick={() => setActiveTab('taller-solidari')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'taller-solidari'
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/25 border border-amber-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Hammer size={15} />
                  <span>Taller Tècnic Solidari</span>
                </button>
              </div>
            </div>
          </GlassCard>

          {/* VISTA 1: BANCACTIU SOCIAL WORKSPACE (FITXA D'INTERVENCIÓ, DEPENDÈNCIA & INTEROPERABILITAT) */}
          {activeTab === 'fitxa-social' && (
            <BancActiuSocialWorkspace />
          )}

          {/* VISTA 2: TALLER TÈCNIC & VOLUNTARIAT */}
          {activeTab === 'taller-solidari' && (
            <div className="space-y-6">
              {/* Mètriques socials */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <GlassCard className="p-4 flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-400/30">
                    <Users size={22} />
                  </div>
                  <div>
                    <div className="text-xl font-black text-white">38 Voluntaris</div>
                    <div className="text-xs text-slate-400">Actius en Torns Domiciliaris</div>
                  </div>
                </GlassCard>

                <GlassCard className="p-4 flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
                    <Wrench size={22} />
                  </div>
                  <div>
                    <div className="text-xl font-black text-white">12 Elements</div>
                    <div className="text-xs text-slate-400">En Taller Solidari de Reparació</div>
                  </div>
                </GlassCard>

                <GlassCard className="p-4 flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
                    <Gift size={22} />
                  </div>
                  <div>
                    <div className="text-xl font-black text-white">87 Donacions</div>
                    <div className="text-xs text-slate-400">Material Recuperat de Famílies</div>
                  </div>
                </GlassCard>
              </div>

              {/* Taller solidari */}
              <GlassCard className="p-6">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <Wrench size={18} className="text-amber-400" />
                  Banc de Treball del Taller Tècnic d'Ajudes
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-white/10 text-slate-400 text-[11px] uppercase">
                      <tr>
                        <th className="p-3">Codi Material</th>
                        <th className="p-3">Descripció Material</th>
                        <th className="p-3">Operació de Manteniment</th>
                        <th className="p-3">Responsable Tècnic</th>
                        <th className="p-3">Estat Taller</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-slate-200">
                      {reparacionsTaller.map((r) => (
                        <tr key={r.id} className="hover:bg-white/5 transition">
                          <td className="p-3 font-mono font-bold text-amber-300">{r.codi}</td>
                          <td className="p-3 font-semibold text-white">{r.element}</td>
                          <td className="p-3 text-slate-300">{r.accio}</td>
                          <td className="p-3 text-slate-400">{r.voluntari}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                              r.estat === 'PUNT_A_PUNT'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            }`}>
                              {r.estat === 'PUNT_A_PUNT' ? 'Llest per Reutilitzar' : 'En Reparació'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </div>
          )}

          {/* LAUNCHER BAR */}
          <div className="mt-8">
            <GatewayLauncher
              currentAppId="bancactiu-social"
              currentUserRole="TERCER_SECTOR"
              onSelectApp={handleAppSelect}
            />
          </div>
        </main>

        <GlassModal
          isOpen={isLauncherOpen}
          onClose={() => setIsLauncherOpen(false)}
          title="Navegador de Micro-Aplicacions BancActiu 2.0"
          maxWidth="4xl"
        >
          <GatewayLauncher
            currentAppId="bancactiu-social"
            currentUserRole="TERCER_SECTOR"
            onSelectApp={handleAppSelect}
          />
        </GlassModal>

        <footer className="mt-6 pt-3 border-t border-white/10 text-center text-xs text-slate-500">
          BancActiu Social 2.0 &middot; Creu Roja Catalunya & Associacions Veïnals &middot; Voluntariat i Solidaritat
        </footer>
      </div>
    </RadialAuraBackground>
  );
}

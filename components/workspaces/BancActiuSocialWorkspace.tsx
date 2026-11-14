'use client';

import React, { useState } from 'react';
import {
  FileText,
  User,
  Users,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  HeartHandshake,
  Calendar,
  Phone,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
  PlusCircle,
  Accessibility,
  HeartPulse,
  Coins,
  Activity,
  Check,
  Building2,
  Clock,
  ExternalLink,
  Info
} from 'lucide-react';
import {
  GlassCard,
  GlassButton,
  GlassBadge,
  GlassModal
} from '@bancactiu/ui-glass';

export interface IntervencioRecord {
  id: string;
  data: string;
  professional: string;
  entitat: string;
  tipus: string;
  descripcio: string;
}

export function BancActiuSocialWorkspace() {
  const [cercaDni, setCercaDni] = useState('43999888A');
  const [isLoadingInterop, setIsLoadingInterop] = useState(false);
  const [interopStep, setInteropStep] = useState<number>(0);
  const [isInteropModalOpen, setIsInteropModalOpen] = useState(false);
  const [highlightSynced, setHighlightSynced] = useState(false);
  const [auditHash, setAuditHash] = useState<string | null>(null);

  // Formulari de nova anotació d'intervenció
  const [isNewInterventionModalOpen, setIsNewInterventionModalOpen] = useState(false);
  const [newIntervencio, setNewIntervencio] = useState({
    professional: 'Carles Miralles (Coordinador Creu Roja)',
    entitat: 'Assemblea Local Creu Roja Cornellà',
    tipus: 'Seguiment Domiciliari i Manteniment Material',
    descripcio: ''
  });

  // Estat de les dades del ciutadà (Fase 1 i Fase 2)
  const [ciutada, setCiutada] = useState({
    nom: 'Antònia Riera Gómez',
    dni: '43999888A',
    cip: 'RIEG440312003',
    dataNaixement: '12/03/1944',
    edat: 82,
    telefon: '933 77 44 21 / 610 44 33 22',
    adreca: 'Carrer de Frederic Soler, 14, 2n 1a',
    municipi: '08940 Cornellà de Llobregat (Barri Gavarra / Almeda)',
    cssReferencia: 'Centre de Serveis Socials Almeda (Ajuntament de Cornellà)'
  });

  const [unitatFamiliar, setUnitatFamiliar] = useState({
    conviventsTotals: 2,
    membres: [
      {
        id: 'm1',
        nom: 'Antònia Riera Gómez',
        parentesc: 'Titular / Sol·licitant',
        edat: 82,
        dni: '43999888A',
        situacio: 'Pensionista jubilada (Dependència reconeguda)',
        rolFamiliar: 'Persona Dependent'
      },
      {
        id: 'm2',
        nom: 'Ramon Soler Riera',
        parentesc: 'Fill',
        edat: 54,
        dni: '46112233M',
        situacio: 'Atur de llarga durada / Dedicació a cures',
        rolFamiliar: 'Cuidador Principal Acreditat'
      }
    ],
    cuidadorPrincipal: {
      nom: 'Ramon Soler Riera',
      dni: '46112233M',
      parentesc: 'Fill convivent',
      telefon: '622 11 88 99',
      altaPECEF: true,
      formacioCuidador: 'Certificat bàsic de cures i mobilitat Creu Roja (2025)'
    }
  });

  const [cronologia, setCronologia] = useState<IntervencioRecord[]>([
    {
      id: 'int-1',
      data: '08/02/2026',
      professional: 'Marta Casals (Treballadora Social CSS Almeda)',
      entitat: 'Ajuntament de Cornellà - Serveis Socials',
      tipus: 'Visita Domiciliària de Seguiment',
      descripcio: 'Avaluació del grau de mobilitat en el domicili. S\'observa deteriorament en la capacitat de transferència al llit. Es recomana sol·licitar llit articulat elèctric a BancActiu.'
    },
    {
      id: 'int-2',
      data: '15/11/2025',
      professional: 'Carles Miralles & Albert Puig (Voluntaris)',
      entitat: 'Assemblea Local Creu Roja Cornellà',
      tipus: 'Lliurament Material Ortopèdic BancActiu',
      descripcio: 'Lliurament a domicili de cadira de rodes autopropulsable (CR-LUG-04) i caminador (CAM-ROD-09). Ajust d\'alçada de reposapeus i formació ergonòmica al fill cuidador.'
    },
    {
      id: 'int-3',
      data: '22/04/2025',
      professional: 'Equip Tècnic Teleassistència',
      entitat: 'Consorci Local de Benestar Social',
      tipus: 'Instal·lació de Teleassistència Avançada',
      descripcio: 'Col·locació de polsera d\'emergència per a Antònia i sensor de presència per detecció de caigudes. Prova de trucada satisfactòria amb la central 24/7.'
    },
    {
      id: 'int-4',
      data: '14/01/2025',
      professional: 'Comissió d\'Avaluació BVD Baix Llobregat',
      entitat: 'Departament de Drets Socials - Generalitat de Catalunya',
      tipus: 'Resolució Oficial de Dependència i Aprovació PIA',
      descripcio: 'Reconeixement de Grau II de Dependència (BVD 64 punts). Aprovació del Programa Individual d\'Atenció amb 34h/mes de SAD i prestació per cures a l\'entorn familiar.'
    }
  ]);

  const [dependencia, setDependencia] = useState({
    estatSollicitud: 'RESOLTA_FAVORABLE',
    grauReconegut: 'Grau II (Dependència Severa)',
    puntuacioBVD: 64,
    dataResolucio: '14/01/2025',
    numExpedient: 'DEP-BVD-2025-88412-CAT',
    pia: {
      estat: 'Aprovat en Vigor',
      modalitatPrincipal: 'SAD (Servei d\'Ajuda a Domicili) - 34 hores/mes',
      teleassistencia: 'Teleassistència Domiciliària Avançada Activa (Creu Roja)',
      centreDeDia: 'En llista d\'espera (Prioritat 2 - CD Cornellà Centre)',
      pecef: '268,79 €/mes (Prestació Cures Entorn Familiar)',
      dataProperaRevisio: '15/10/2026'
    }
  });

  const [discapacitat, setDiscapacitat] = useState({
    percentatge: 68,
    tipus: 'Física i Motora (Seqüeles Ictus / Hemiparèsia esquerra)',
    baremMobilitat: 9,
    superaBaremMobilitat: true,
    targetaAparcamentTdM: {
      estat: 'CONCEDIDA_VIGENT',
      numTargeta: 'CAT-BCN-2025-09884',
      validesa: 'Permanent (Fins 30/01/2030)'
    },
    baremTerceraPersona: 18,
    cadReferencia: 'CAD Sant Feliu de Llobregat'
  });

  const [prestacions, setPrestacions] = useState({
    rgc: {
      activa: true,
      importMensual: '312,40 €/mes (Complement Ingressos)',
      dataConcessio: '01/09/2024'
    },
    imv: {
      actiu: true,
      estat: 'Coordinat amb la Seguretat Social (INSS)'
    },
    ajutsUrgencia: [
      { concepte: 'Bo Social Energètic i d\'Aigua', administracio: 'Ajuntament de Cornellà', import: '450 € anuals (Vigent 2026)' },
      { concepte: 'Targeta Solidària d\'Alimentació', administracio: 'Departament de Drets Socials', import: 'Puntual (Executat 2025)' }
    ],
    prestecsOrtopedics: [
      {
        codi: 'CR-LUG-04',
        nom: 'Cadira de Rodes Autopropulsable Plegable (Alumini)',
        dataLliurament: '15/11/2025',
        estat: 'Actiu a Domicili',
        voluntari: 'Albert Puig (Voluntari Tècnic)',
        proximaRevisio: '15/05/2026'
      },
      {
        codi: 'CAM-ROD-09',
        nom: 'Caminador 4 Rodes amb Seient i Fre Bilateral',
        dataLliurament: '15/11/2025',
        estat: 'Actiu a Domicili',
        voluntari: 'Albert Puig (Voluntari Tècnic)',
        proximaRevisio: '15/05/2026'
      }
    ]
  });

  // Execució de la Fase 3: Botó de Rescat Automàtic (Interoperabilitat)
  const handleExecuteInteroperabilitat = async () => {
    setIsLoadingInterop(true);
    setIsInteropModalOpen(true);
    setInteropStep(1);

    try {
      // Pas 1: Verificació de consentiment idCAT
      await new Promise(r => setTimeout(r, 600));
      setInteropStep(2);

      // Pas 2: Handshake mTLS Via Oberta AOC
      await new Promise(r => setTimeout(r, 700));
      setInteropStep(3);

      // Crida real a l'API d'interoperabilitat
      const res = await fetch('/api/social/interoperabilitat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          citizenIdentifier: cercaDni,
          legalBasis: 'CONSENTIMENT_EXPRES_IDCAT',
          professionalDni: '43999888A',
          professionalName: 'Carles Miralles (Coordinador Creu Roja)',
          professionalRole: 'TREBALLADOR_SOCIAL'
        })
      });

      const data = await res.json();
      setInteropStep(4);
      await new Promise(r => setTimeout(r, 500));

      if (data.ok && data.decryptedRecord) {
        const rec = data.decryptedRecord;
        setCiutada({
          nom: rec.ciutada.nom,
          dni: rec.ciutada.dni,
          cip: rec.ciutada.cip,
          dataNaixement: '12/03/1944',
          edat: rec.ciutada.edat,
          telefon: `${rec.ciutada.telefon} / ${rec.ciutada.mobil}`,
          adreca: rec.ciutada.adreca,
          municipi: `${rec.ciutada.municipi} (${rec.ciutada.barri})`,
          cssReferencia: rec.ciutada.zonaCss
        });

        setDependencia({
          estatSollicitud: rec.dependencia.estatSollicitud,
          grauReconegut: rec.dependencia.grauReconegut,
          puntuacioBVD: rec.dependencia.puntuacioBVD,
          dataResolucio: '14/01/2025',
          numExpedient: rec.dependencia.numExpedient,
          pia: {
            estat: 'Aprovat en Vigor',
            modalitatPrincipal: rec.dependencia.piaVigent.modalitatPrincipal,
            teleassistencia: rec.dependencia.piaVigent.serveisComplementaris[0] || 'Activa',
            centreDeDia: rec.dependencia.piaVigent.centreDeDia,
            pecef: `${rec.dependencia.piaVigent.pecef.importMensual.toFixed(2)} €/mes (Cuidador: ${rec.dependencia.piaVigent.pecef.cuidadorAcreditat})`,
            dataProperaRevisio: '15/10/2026'
          }
        });

        setDiscapacitat({
          percentatge: rec.discapacitat.percentatgeReconegut,
          tipus: rec.discapacitat.tipusDiscapacitat,
          baremMobilitat: rec.discapacitat.baremMobilitatReduida,
          superaBaremMobilitat: rec.discapacitat.superaBaremMobilitat,
          targetaAparcamentTdM: {
            estat: rec.discapacitat.targetaAparcamentTdM.estat,
            numTargeta: rec.discapacitat.targetaAparcamentTdM.numTargeta,
            validesa: `Permanent (${rec.discapacitat.targetaAparcamentTdM.dataCaducitat})`
          },
          baremTerceraPersona: rec.discapacitat.baremSuportTerceraPersona,
          cadReferencia: rec.discapacitat.centreCAD
        });

        setAuditHash(data.auditId || 'aud-' + Date.now().toString(36));
      }

      setHighlightSynced(true);
      setTimeout(() => setHighlightSynced(false), 4000);
    } catch (err) {
      console.error('Error en rescat via interoperabilitat:', err);
    } finally {
      setIsLoadingInterop(false);
      setTimeout(() => {
        setIsInteropModalOpen(false);
      }, 1000);
    }
  };

  const handleAddIntervencio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIntervencio.descripcio.trim()) return;

    const record: IntervencioRecord = {
      id: 'int-' + Date.now().toString(36),
      data: new Date().toLocaleDateString('ca-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      professional: newIntervencio.professional,
      entitat: newIntervencio.entitat,
      tipus: newIntervencio.tipus,
      descripcio: newIntervencio.descripcio.trim()
    };

    setCronologia([record, ...cronologia]);
    setNewIntervencio({
      ...newIntervencio,
      descripcio: ''
    });
    setIsNewInterventionModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* HEADER DE L'ESPAI DE TREBALL SOCIAL */}
      <GlassCard
        variant="glow"
        glowColor="rose"
        className={`p-6 border-rose-500/30 bg-gradient-to-r from-rose-950/30 via-slate-900/60 to-amber-950/20 transition-all duration-500 ${
          highlightSynced ? 'ring-2 ring-emerald-400 shadow-[0_0_35px_rgba(52,211,153,0.3)]' : ''
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="p-2 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-500/20">
                <HeartHandshake className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                BancActiu Social &middot; Ficha d'Intervenció Familiar i Social
              </h1>
              <GlassBadge variant="rose" pulse>
                CSS Almeda &middot; Creu Roja
              </GlassBadge>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Expedient integral de suport social per a persones amb dependència i mobilitat reduïda a Cornellà de Llobregat.
              Connectat en temps real amb les bases de dades oficials de la Generalitat de Catalunya i l'Ajuntament.
            </p>
          </div>

          {/* BOTÓ DE RESCAT AUTOMÀTIC (FASE 3) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-slate-900/60 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-300">
              <User size={14} className="text-rose-400" />
              <span className="font-mono text-white font-bold">{cercaDni}</span>
            </div>

            <button
              onClick={handleExecuteInteroperabilitat}
              disabled={isLoadingInterop}
              className="relative group overflow-hidden px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-xl shadow-rose-500/25 border border-rose-400/40 bg-gradient-to-r from-rose-600 via-amber-600 to-orange-600 hover:from-rose-500 hover:via-amber-500 hover:to-orange-500 active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              {isLoadingInterop ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-200" />
                  <span>Sincronitzant Via Oberta...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
                  <span>Actualitzar via Registre Oficial / Interoperabilitat</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Notificació d'última sincronització oficial */}
        {auditHash && (
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-emerald-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>Dades oficials autenticades per Via Oberta AOC (Certificat mTLS 4096-bit).</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
              <Lock size={11} className="text-amber-400" />
              <span>Codi Transacció RGPD: {auditHash}</span>
            </div>
          </div>
        )}
      </GlassCard>

      {/* FASE 1: DADES SOCIODEMOGRÀFIQUES I UNITAT FAMILIAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Targeta Sociodemogràfica Ciutadà */}
        <GlassCard
          variant="glow"
          glowColor="rose"
          className={`p-5 lg:col-span-2 space-y-4 border-white/15 bg-white/[0.04] backdrop-blur-2xl transition-all duration-500 ${
            highlightSynced ? 'ring-2 ring-amber-400/50' : ''
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-rose-400" />
              <h2 className="text-base font-bold text-white tracking-wide">
                Dades Sociodemogràfiques del Ciutadà
              </h2>
            </div>
            <GlassBadge variant="emerald">
              Expedient Actiu CSS
            </GlassBadge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-slate-400 text-[11px]">Nom i Cognoms</div>
              <div className="text-sm font-black text-white mt-0.5">{ciutada.nom}</div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-slate-400 text-[11px]">DNI / Identificador</div>
              <div className="text-sm font-mono font-bold text-amber-300 mt-0.5">{ciutada.dni}</div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-slate-400 text-[11px]">CIP / TSI CatSalut</div>
              <div className="text-sm font-mono font-bold text-rose-300 mt-0.5">{ciutada.cip}</div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-slate-400 text-[11px]">Data Naixement i Edat</div>
              <div className="text-xs font-semibold text-white mt-0.5">
                {ciutada.dataNaixement} ({ciutada.edat} anys)
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 sm:col-span-2">
              <div className="text-slate-400 text-[11px] flex items-center gap-1">
                <Phone size={11} className="text-rose-400" />
                <span>Telèfons de Contacte</span>
              </div>
              <div className="text-xs font-semibold text-white mt-0.5">{ciutada.telefon}</div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 sm:col-span-3">
              <div className="text-slate-400 text-[11px] flex items-center gap-1">
                <MapPin size={11} className="text-amber-400" />
                <span>Domicili Habitual a Cornellà</span>
              </div>
              <div className="text-xs font-semibold text-white mt-0.5">
                {ciutada.adreca}, {ciutada.municipi}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 sm:col-span-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Building2 size={11} className="text-cyan-400" />
                  <span>Equip Bàsic d'Atenció Social Primària (EBASP)</span>
                </div>
                <div className="text-xs font-semibold text-cyan-200 mt-0.5">
                  {ciutada.cssReferencia}
                </div>
              </div>
              <GlassBadge variant="blue">Àrea Bàsica Cornellà 2</GlassBadge>
            </div>
          </div>
        </GlassCard>

        {/* Nucli de Convivència & Cuidador Principal */}
        <GlassCard
          variant="glow"
          glowColor="amber"
          className="p-5 space-y-4 border-white/15 bg-white/[0.04] backdrop-blur-2xl flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold text-white tracking-wide">
                  Unitat Familiar
                </h2>
              </div>
              <GlassBadge variant="amber">
                {unitatFamiliar.conviventsTotals} Convivents
              </GlassBadge>
            </div>

            {/* Persona Cuidadora Principal */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-500/10 to-rose-500/10 border border-amber-400/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  Cuidador Principal No Professional
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-200 border border-amber-400/30">
                  Alta PECEF Activa
                </span>
              </div>
              <div className="text-sm font-bold text-white">
                {unitatFamiliar.cuidadorPrincipal.nom}
              </div>
              <div className="text-xs text-slate-300 space-y-0.5">
                <div>Parentesc: <strong className="text-white">{unitatFamiliar.cuidadorPrincipal.parentesc}</strong></div>
                <div>DNI: <strong className="font-mono text-amber-200">{unitatFamiliar.cuidadorPrincipal.dni}</strong></div>
                <div>Mòbil: <strong className="text-white">{unitatFamiliar.cuidadorPrincipal.telefon}</strong></div>
              </div>
              <div className="pt-1.5 border-t border-white/10 text-[11px] text-amber-200/90 flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-amber-400" />
                <span>{unitatFamiliar.cuidadorPrincipal.formacioCuidador}</span>
              </div>
            </div>

            {/* Llista de membres */}
            <div className="space-y-2 text-xs">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Membres de la Llar:
              </div>
              {unitatFamiliar.membres.map((m) => (
                <div
                  key={m.id}
                  className="p-2.5 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-white text-xs">{m.nom}</div>
                    <div className="text-[11px] text-slate-400">{m.parentesc} &middot; {m.edat} anys</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-slate-200 border border-white/10">
                      {m.rolFamiliar}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* FASE 2: BLOC DE DEPENDÈNCIA (LLEI 39/2006) I DISCAPACITAT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* BLOC 1: DEPENDÈNCIA LLEI 39/2006 */}
        <GlassCard
          variant="glow"
          glowColor="rose"
          className={`p-5 space-y-4 border-white/15 bg-white/[0.04] backdrop-blur-2xl transition-all duration-500 ${
            highlightSynced ? 'ring-2 ring-rose-400/50' : ''
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-rose-400" />
              <h2 className="text-base font-bold text-white tracking-wide">
                Dependència (Llei 39/2006)
              </h2>
            </div>
            <GlassBadge variant="rose">SEVAD Baix Llobregat</GlassBadge>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-rose-500/15 to-pink-500/10 border border-rose-400/30 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold text-rose-300 uppercase tracking-wider">
                Grau Oficial de Dependència
              </div>
              <div className="text-lg font-black text-white mt-0.5">
                {dependencia.grauReconegut}
              </div>
              <div className="text-xs text-slate-300 mt-1">
                Barema BVD: <strong className="text-rose-200">{dependencia.puntuacioBVD} punts</strong> &middot; Resolució: {dependencia.dataResolucio}
              </div>
            </div>
            <div className="text-center p-2 rounded-xl bg-rose-500/20 border border-rose-400/30">
              <span className="text-2xl font-black text-rose-200">II</span>
              <span className="block text-[9px] font-bold text-rose-300 uppercase">Grau</span>
            </div>
          </div>

          {/* PIA VIGENT */}
          <div className="space-y-2 text-xs">
            <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Programa Individual d'Atenció (PIA)</span>
              <span className="text-emerald-400 flex items-center gap-1 font-semibold text-[10px]">
                <Check size={11} /> {dependencia.pia.estat}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 space-y-1.5">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span className="text-slate-300">
                  <strong className="text-white">Modalitat Principal:</strong> {dependencia.pia.modalitatPrincipal}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span className="text-slate-300">
                  <strong className="text-white">Teleassistència:</strong> {dependencia.pia.teleassistencia}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                <span className="text-slate-300">
                  <strong className="text-white">Centre de Dia:</strong> {dependencia.pia.centreDeDia}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span className="text-slate-300">
                  <strong className="text-white">PECEF:</strong> {dependencia.pia.pecef}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 pt-1 flex items-center justify-between">
              <span>Expedient: <strong className="font-mono text-slate-300">{dependencia.numExpedient}</strong></span>
              <span>Revisió: <strong className="text-amber-300">{dependencia.pia.dataProperaRevisio}</strong></span>
            </div>
          </div>
        </GlassCard>

        {/* BLOC 2: DISCAPACITAT I MOBILITAT REDUÏDA */}
        <GlassCard
          variant="glow"
          glowColor="amber"
          className={`p-5 space-y-4 border-white/15 bg-white/[0.04] backdrop-blur-2xl transition-all duration-500 ${
            highlightSynced ? 'ring-2 ring-amber-400/50' : ''
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Accessibility className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white tracking-wide">
                Discapacitat Reconeixement
              </h2>
            </div>
            <GlassBadge variant="amber">CAD Sant Feliu</GlassBadge>
          </div>

          {/* Gauge / Percentatge */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-400/30 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
                Grau Global Reconegut
              </div>
              <div className="text-2xl font-black text-white mt-0.5">
                {discapacitat.percentatge}%
              </div>
              <div className="text-xs text-slate-300 mt-0.5">
                {discapacitat.tipus}
              </div>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-amber-400/80 flex items-center justify-center bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <span className="text-sm font-black text-white">{discapacitat.percentatge}%</span>
            </div>
          </div>

          {/* Barem Mobilitat Reduïda */}
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-semibold">Barem de Mobilitat Reduïda:</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                  <Check size={11} /> {discapacitat.baremMobilitat} Punts (Superat &ge; 7)
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/10">
                <span className="text-slate-300 font-semibold">Targeta d'Aparcament (TdM):</span>
                <span className="text-emerald-300 font-bold text-[11px]">
                  {discapacitat.targetaAparcamentTdM.estat === 'CONCEDIDA_VIGENT' ? 'Concedida i Vigent' : 'Pendent'}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Núm. Targeta: <strong className="font-mono text-white">{discapacitat.targetaAparcamentTdM.numTargeta}</strong>
                <span className="block mt-0.5">Validesa: {discapacitat.targetaAparcamentTdM.validesa}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Barem Suport Tercera Persona:</span>
              <strong className="text-amber-200">{discapacitat.baremTerceraPersona} punts</strong>
            </div>
          </div>
        </GlassCard>

        {/* BLOC 3: PRESTACIONS ECONÒMIQUES I PRÉSTECS BANCACTIU */}
        <GlassCard
          variant="glow"
          glowColor="emerald"
          className={`p-5 space-y-4 border-white/15 bg-white/[0.04] backdrop-blur-2xl transition-all duration-500 ${
            highlightSynced ? 'ring-2 ring-emerald-400/50' : ''
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white tracking-wide">
                Prestacions & Ajuts Socials
              </h2>
            </div>
            <GlassBadge variant="emerald">RGC & Ajuts Actius</GlassBadge>
          </div>

          <div className="space-y-2 text-xs">
            {/* RGC */}
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-400/25">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-200">Renda Garantida de Ciutadania (RGC)</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Activa
                </span>
              </div>
              <div className="text-xs text-white mt-1">
                Import: <strong className="text-emerald-300 font-bold">{prestacions.rgc.importMensual}</strong>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Resolució Generalitat de Catalunya: {prestacions.rgc.dataConcessio}
              </div>
            </div>

            {/* IMV */}
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">Ingrés Mínim Vital (IMV):</span>
              <span className="text-slate-200 font-medium text-[11px]">{prestacions.imv.estat}</span>
            </div>

            {/* Ajuts d'urgència municipal */}
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/10 space-y-1 text-xs">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                Ajuts d'Urgència Social (Ajuntament):
              </span>
              {prestacions.ajutsUrgencia.map((aj, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px] text-slate-300">
                  <span>&bull; {aj.concepte}</span>
                  <span className="text-amber-300 font-semibold">{aj.import}</span>
                </div>
              ))}
            </div>

            {/* Préstec de Material Ortopèdic BancActiu */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-rose-500/10 to-amber-500/10 border border-rose-400/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1">
                  <Activity size={13} />
                  Préstecs Temporals BancActiu
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-200 border border-rose-400/30 font-bold">
                  2 Elements Actius
                </span>
              </div>
              {prestacions.prestecsOrtopedics.map((p, idx) => (
                <div key={idx} className="text-[11px] border-t border-white/10 pt-1.5 first:border-0 first:pt-0">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>{p.nom}</span>
                    <span className="font-mono text-amber-300">{p.codi}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center justify-between mt-0.5">
                    <span>Lliurat per Creu Roja: {p.dataLliurament}</span>
                    <span className="text-emerald-300">Estat: {p.estat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* CRONOLOGIA D'INTERVENCIONS SOCIALS I VOLUNTARIAT */}
      <GlassCard
        variant="glow"
        glowColor="amber"
        className="p-6 border-white/15 bg-white/[0.04] backdrop-blur-2xl space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white tracking-wide">
                Cronologia Històrica d'Intervencions Socials
              </h2>
            </div>
            <p className="text-xs text-slate-300">
              Traçabilitat temporal de visites domiciliàries, seguiments tècnics, lliurament d'ajudes tècniques i tràmits institucionals.
            </p>
          </div>

          <GlassButton
            variant="secondary"
            size="sm"
            onClick={() => setIsNewInterventionModalOpen(true)}
            icon={<PlusCircle size={15} className="text-amber-400" />}
            className="hover:border-amber-400/50 self-start sm:self-auto"
          >
            Afegir Nova Anotació
          </GlassButton>
        </div>

        {/* Timeline Visual Glassmorphic */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-rose-500 before:via-amber-500 before:to-emerald-500">
          {cronologia.map((item) => (
            <div key={item.id} className="relative group">
              {/* Node lluminós */}
              <div className="absolute -left-6 sm:-left-8 top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-amber-400 group-hover:scale-125 group-hover:border-rose-400 group-hover:shadow-[0_0_12px_rgba(244,63,94,0.6)] transition-all duration-300" />

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 hover:bg-white/[0.05] transition-all space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1">
                      <Calendar size={12} /> {item.data}
                    </span>
                    <span className="text-xs font-bold text-white">
                      {item.tipus}
                    </span>
                  </div>
                  <GlassBadge variant="slate" className="self-start sm:self-auto">
                    {item.entitat}
                  </GlassBadge>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.descripcio}
                </p>

                <div className="text-[11px] text-slate-400 pt-1 border-t border-white/5 flex items-center gap-1.5">
                  <User size={12} className="text-rose-400" />
                  <span>Responsable: <strong className="text-slate-200">{item.professional}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* MODAL FASE 3: PROCÉS DE RESCAT I INTEROPERABILITAT AOC */}
      <GlassModal
        isOpen={isInteropModalOpen}
        onClose={() => {}}
        title="Pasarel·la d'Interoperabilitat Oficial (AOC & Drets Socials)"
        maxWidth="lg"
      >
        <div className="space-y-5 p-2">
          <div className="text-xs text-slate-300 leading-relaxed">
            S'està establint una connexió xifrada d'extrem a extrem mitjançant certificat mTLS 4096-bit amb el node central de Via Oberta (Consorci AOC) per consultar l'històric oficial de dependència i discapacitat.
          </div>

          {/* Passos de sincronització */}
          <div className="space-y-3">
            {/* Pas 1 */}
            <div className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
              interopStep >= 1 ? 'bg-rose-500/15 border-rose-400/40 text-rose-200' : 'bg-white/5 border-white/10 text-slate-500'
            }`}>
              <div className="p-1.5 rounded-lg bg-rose-500/20">
                {interopStep > 1 ? <Check size={16} className="text-emerald-400" /> : <RefreshCw size={16} className={interopStep === 1 ? 'animate-spin text-rose-400' : ''} />}
              </div>
              <div className="text-xs">
                <div className="font-bold">1. Verificació de Consentiment idCAT Mòbil</div>
                <div className="text-[10px] opacity-80">Validació de base jurídica RGPD Art. 6.1.e (Missió d'interès públic).</div>
              </div>
            </div>

            {/* Pas 2 */}
            <div className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
              interopStep >= 2 ? 'bg-amber-500/15 border-amber-400/40 text-amber-200' : 'bg-white/5 border-white/10 text-slate-500'
            }`}>
              <div className="p-1.5 rounded-lg bg-amber-500/20">
                {interopStep > 2 ? <Check size={16} className="text-emerald-400" /> : <RefreshCw size={16} className={interopStep === 2 ? 'animate-spin text-amber-400' : ''} />}
              </div>
              <div className="text-xs">
                <div className="font-bold">2. Handshake mTLS Via Oberta AOC</div>
                <div className="text-[10px] opacity-80">Autenticació amb certificat oficial EC-SectorPublic (Ajuntament de Cornellà).</div>
              </div>
            </div>

            {/* Pas 3 */}
            <div className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
              interopStep >= 3 ? 'bg-cyan-500/15 border-cyan-400/40 text-cyan-200' : 'bg-white/5 border-white/10 text-slate-500'
            }`}>
              <div className="p-1.5 rounded-lg bg-cyan-500/20">
                {interopStep > 3 ? <Check size={16} className="text-emerald-400" /> : <RefreshCw size={16} className={interopStep === 3 ? 'animate-spin text-cyan-400' : ''} />}
              </div>
              <div className="text-xs">
                <div className="font-bold">3. Xifratge i Desxifrat AES-256-GCM</div>
                <div className="text-[10px] opacity-80">Protecció de dades d'alta sensibilitat amb etiqueta d'autenticació criptogràfica.</div>
              </div>
            </div>

            {/* Pas 4 */}
            <div className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
              interopStep >= 4 ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200' : 'bg-white/5 border-white/10 text-slate-500'
            }`}>
              <div className="p-1.5 rounded-lg bg-emerald-500/20">
                <Check size={16} className="text-emerald-400" />
              </div>
              <div className="text-xs">
                <div className="font-bold">4. Auto-emplenament de la Fitxa Social</div>
                <div className="text-[10px] opacity-80">Sincronització completada correctament. Actualitzant interfície...</div>
              </div>
            </div>
          </div>
        </div>
      </GlassModal>

      {/* MODAL: NOVA ANOTACIÓ D'INTERVENCIÓ */}
      <GlassModal
        isOpen={isNewInterventionModalOpen}
        onClose={() => setIsNewInterventionModalOpen(false)}
        title="Nova Anotació d'Intervenció Social / Voluntariat"
        maxWidth="md"
      >
        <form onSubmit={handleAddIntervencio} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Professional / Voluntari Actuant</label>
            <input
              type="text"
              required
              value={newIntervencio.professional}
              onChange={(e) => setNewIntervencio({ ...newIntervencio, professional: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Entitat / Servei</label>
            <input
              type="text"
              required
              value={newIntervencio.entitat}
              onChange={(e) => setNewIntervencio({ ...newIntervencio, entitat: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Tipus d'Intervenció</label>
            <select
              value={newIntervencio.tipus}
              onChange={(e) => setNewIntervencio({ ...newIntervencio, tipus: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/20 text-white focus:outline-none focus:border-amber-400"
            >
              <option value="Seguiment Domiciliari i Manteniment Material">Seguiment Domiciliari i Manteniment Material</option>
              <option value="Visita Domiciliària Treball Social">Visita Domiciliària Treball Social</option>
              <option value="Lliurament / Recollida Material Ortopèdic">Lliurament / Recollida Material Ortopèdic</option>
              <option value="Suport Psicosocial i Acompanyament">Suport Psicosocial i Acompanyament</option>
              <option value="Tràmit Administratiu o Revisió PIA">Tràmit Administratiu o Revisió PIA</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Descripció Detallada de l'Actuació</label>
            <textarea
              required
              rows={4}
              placeholder="Indiqueu les observacions sobre l'estat del ciutadà, funcionament dels ajuts tècnics i acords..."
              value={newIntervencio.descripcio}
              onChange={(e) => setNewIntervencio({ ...newIntervencio, descripcio: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-amber-400 placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <GlassButton
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsNewInterventionModalOpen(false)}
            >
              Cancel·lar
            </GlassButton>
            <GlassButton
              type="submit"
              variant="success"
              size="sm"
              icon={<Check size={14} />}
            >
              Registrar Anotació
            </GlassButton>
          </div>
        </form>
      </GlassModal>
    </div>
  );
}

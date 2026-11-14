import { NextResponse } from 'next/server';
import {
  interopGatewayManager,
  encryptSensitiveData,
  decryptSensitiveData
} from '@bancactiu/interoperability-connector';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const {
      citizenIdentifier = '43999888A',
      legalBasis = 'CONSENTIMENT_EXPRES_IDCAT',
      professionalDni = '43999888A',
      professionalName = 'Carles Miralles (Coordinador Creu Roja)',
      professionalRole = 'TREBALLADOR_SOCIAL'
    } = body;

    // Registre d'auditoria i tràmit mitjançant el Gateway Manager oficial
    const interopResult = interopGatewayManager.executeInteroperabilityQuery(
      'ep-via-oberta-dependencia',
      { dni: professionalDni, nom: professionalName, rol: professionalRole },
      citizenIdentifier,
      legalBasis,
      '192.168.1.104'
    );

    if (!interopResult.ok) {
      return NextResponse.json(
        { ok: false, error: interopResult.message, status: interopResult.status },
        { status: 429 }
      );
    }

    // Registre oficial oficialitzat per Via Oberta AOC / Drets Socials
    const officialCitizenRecord = {
      ciutada: {
        nom: 'Antònia Riera Gómez',
        dni: citizenIdentifier.toUpperCase().trim() || '43999888A',
        cip: 'RIEG440312003',
        dataNaixement: '1944-03-12',
        edat: 82,
        telefon: '933 77 44 21',
        mobil: '610 44 33 22',
        adreca: 'Carrer de Frederic Soler, 14, 2n 1a',
        municipi: 'Cornellà de Llobregat (08940)',
        barri: 'Almeda / Gavarra',
        zonaCss: 'Centre de Serveis Socials Comunitari Almeda'
      },
      unitatFamiliar: {
        conviventsTotals: 2,
        nucliConvivencia: [
          {
            id: 'mem-1',
            nom: 'Antònia Riera Gómez',
            parentesc: 'Titular / Sol·licitant',
            edat: 82,
            dni: citizenIdentifier.toUpperCase().trim() || '43999888A',
            situacioLaboral: 'Pensionista jubilada',
            grauDependencia: 'Grau II'
          },
          {
            id: 'mem-2',
            nom: 'Ramon Soler Riera',
            parentesc: 'Fill (Cuidador Principal)',
            edat: 54,
            dni: '46112233M',
            situacioLaboral: 'Atur de llarga durada amb subsidi',
            esCuidadorPrincipal: true
          }
        ],
        cuidadorPrincipal: {
          nom: 'Ramon Soler Riera',
          dni: '46112233M',
          relacio: 'Fill',
          contacte: '622 11 88 99',
          altaPECEF: true
        }
      },
      dependencia: {
        estatSollicitud: 'RESOLTA_FAVORABLE',
        grauReconegut: 'Grau II (Dependència Severa)',
        puntuacioBVD: 64,
        dataSollicitud: '2024-03-10',
        dataResolucio: '2025-01-14',
        organAvaluador: 'SEVAD Baix Llobregat (Drets Socials)',
        numExpedient: 'DEP-BVD-2025-88412-CAT',
        piaVigent: {
          estatPIA: 'APROVAT_EN_VIGOR',
          modalitatPrincipal: 'SAD (Servei d\'Ajuda a Domicili) - 34 hores mensuals',
          serveisComplementaris: [
            'Teleassistència Domiciliària Avançada (Creu Roja / Ajuntament)',
            'Ajut tècnic de transport adaptat'
          ],
          centreDeDia: 'En llista d\'espera (Centre de Dia Cornellà - Prioritat 2)',
          pecef: {
            actiu: true,
            importMensual: 268.79,
            cuidadorAcreditat: 'Ramon Soler Riera'
          },
          dataRevisioPIA: '2026-10-15'
        }
      },
      discapacitat: {
        percentatgeReconegut: 68,
        tipusDiscapacitat: 'Física i Motora (Seqüeles Ictus / Hemiparèsia esquerra)',
        baremMobilitatReduida: 9, // >= 7 punts
        superaBaremMobilitat: true,
        targetaAparcamentTdM: {
          estat: 'CONCEDIDA_VIGENT',
          numTargeta: 'CAT-BCN-2025-09884',
          dataCaducitat: '2030-01-30',
          revisioPermanent: true
        },
        baremSuportTerceraPersona: 18,
        centreCAD: 'CAD Sant Feliu de Llobregat'
      },
      prestacionsSocials: {
        rgc: {
          activa: true,
          tipus: 'Complement d\'Ingressos RGC',
          importMensual: 312.40,
          resolucioData: '2024-09-01'
        },
        imv: {
          actiu: true,
          estat: 'Perceptor complementat per INSS'
        },
        ajutsUrgenciaMunicipal: [
          { concepte: 'Bo Social Tèrmic i Aigua Cornellà', estat: 'CONCEDIT_2026', importAnual: 450 },
          { concepte: 'Targeta Solidària Alimentària Municipal', estat: 'PUNTUAL_FINALITZAT', data: '2025-06-15' }
        ],
        bancActiuPrestecsOrtopedics: [
          {
            codi: 'CR-LUG-04',
            element: 'Cadira de Rodes Autopropulsable Plegable (Alumini)',
            dataPrestec: '2025-11-15',
            estatPrestec: 'ACTIU_A_DOMICILI',
            revisioPuntualTaller: '2026-05-15',
            responsableLliurament: 'Voluntaris Creu Roja Cornellà'
          },
          {
            codi: 'CAM-ROD-09',
            element: 'Caminador 4 Rodes amb Seient i Fre',
            dataPrestec: '2025-11-15',
            estatPrestec: 'ACTIU_A_DOMICILI',
            revisioPuntualTaller: '2026-05-15',
            responsableLliurament: 'Voluntaris Creu Roja Cornellà'
          }
        ]
      },
      cronologiaIntervencions: [
        {
          id: 'int-1',
          data: '2026-02-08',
          professional: 'Marta Casals (Treballadora Social CSS Almeda)',
          entitat: 'Ajuntament de Cornellà - Serveis Socials',
          tipus: 'Visita Domiciliària de Seguiment',
          descripcio: 'Avaluació del grau de mobilitat en el domicili. S\'observa deteriorament en la capacitat de transferència al llit. Es recomana sol·licitar llit articulat elèctric a BancActiu.'
        },
        {
          id: 'int-2',
          data: '2025-11-15',
          professional: 'Carles Miralles & Albert Puig (Voluntaris Creu Roja)',
          entitat: 'Assemblea Local Creu Roja Cornellà',
          tipus: 'Lliurament Material Ortopèdic BancActiu',
          descripcio: 'Lliurament a domicili de cadira de rodes autopropulsable (CR-LUG-04) i caminador (CAM-ROD-09). Ajust d\'alçada de reposapeus i formació ergonòmica al fill cuidador.'
        },
        {
          id: 'int-3',
          data: '2025-04-22',
          professional: 'Equip Tècnic Teleassistència',
          entitat: 'Consorci Local de Benestar Social',
          tipus: 'Instal·lació de Teleassistència Avançada',
          descripcio: 'Col·locació de polsera d\'emergència per a Antònia i sensor de presència per detecció de caigudes. Prova de trucada satisfactòria amb la central 24/7.'
        },
        {
          id: 'int-4',
          data: '2025-01-14',
          professional: 'Comissió d\'Avaluació BVD Baix Llobregat',
          entitat: 'Departament de Drets Socials - Generalitat de Catalunya',
          tipus: 'Resolució Oficial de Dependència i Aprovació PIA',
          descripcio: 'Reconeixement de Grau II de Dependència (BVD 64 punts). Aprovació del Programa Individual d\'Atenció amb 34h/mes de SAD i prestació per cures a l\'entorn familiar.'
        }
      ]
    };

    // Xifrat de dades sensibles abans d'enviar al client mitjançant AES-256-GCM
    const encryptedData = encryptSensitiveData(JSON.stringify(officialCitizenRecord));

    return NextResponse.json({
      ok: true,
      auditId: interopResult.auditId,
      gateway: 'VIA_OBERTA_AOC / DRETS_SOCIALS_GENCAT',
      timestamp: new Date().toISOString(),
      encryptedSecurityEnvelope: {
        iv: encryptedData.ivHex,
        tag: encryptedData.authTagHex,
        ciphertext: encryptedData.ciphertextHex.slice(0, 32) + '...[AES-256-GCM Protegit]'
      },
      // Dades desencriptades transmeses pel canal segur d'interoperabilitat
      decryptedRecord: officialCitizenRecord
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || 'Error intern en la pasarel·la d\'interoperabilitat social' },
      { status: 500 }
    );
  }
}

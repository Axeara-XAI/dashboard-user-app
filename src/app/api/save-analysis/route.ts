import { NextResponse } from 'next/server';
import { db } from '../../../db'; 
import { patients, assessments, assessmentResults, shapExplanations, diceScenarios, diceChanges } from '../../../db/schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formData, apiData } = body;

    // 1. Insert Data Pasien 
    const rmNumber = `RM-${Date.now()}`;
    const [newPatient] = await db.insert(patients).values({
      patientName: formData.nama_ibu || 'Anonim',
      dateOfBirth: '1990-01-01', 
      medicalRecordNumber: rmNumber,
    }).returning({ id: patients.id });

    // 2. Insert Data Assessment 
    const [newAssessment] = await db.insert(assessments).values({
      patientId: newPatient.id,
      mage: Number(formData.mage) || 0,
      fage: Number(formData.fage) || 0,
      gained: parseFloat(formData.gained) || 0,
      hemoglob: parseFloat(formData.hemoglob) || 0,
      cignum: Number(formData.cignum) || 0,
      drinknum: Number(formData.drinknum) || 0,
      visits: Number(formData.visits) || 0,
      totalp: Number(formData.totalp) || 0,
      bdead: Number(formData.bdead) || 0,
      terms: 1, // Default terms
      preterm: Number(formData.preterm) || 0,
      pinfant: Number(formData.pinfant) || 0,
      meduc: formData.meduc_raw || 1,
      feduc: formData.feduc_raw || 1,
      marital: Number(formData.marital) || 1,
      racemom: Number(formData.racemom) || 0,
      racedad: Number(formData.racedad) || 0,
      loutcome: Number(formData.loutcome) || 1,
      hispmom: formData.hispmom || 'N',
      hispdad: formData.hispdad || 'N',
      rhsen: formData.rhsen ? 1 : 0,
      
      // Riwayat Penyakit 
      anemia: formData.anemia ? 1 : 0,
      jantung: formData.jantung ? 1 : 0,
      paru: formData.paru ? 1 : 0,
      diabetes: formData.diabetes ? 1 : 0,
      herpes: formData.herpes ? 1 : 0,
      ginjal: formData.ginjal ? 1 : 0,
      hipertensiKronis: formData.hipertensi_kronis ? 1 : 0,
      hipertensiGestasional: formData.hipertensi_gestasional ? 1 : 0,
      eklamsia: formData.eklamsia ? 1 : 0,
      serviks: formData.cervix ? 1 : 0,
      rahim: formData.uterine ? 1 : 0,
      hydram: formData.hydram ? 1 : 0,
    }).returning({ id: assessments.id });

    // 3. Insert Hasil Prediksi & Narasi Gemini
    await db.insert(assessmentResults).values({
      assessmentId: newAssessment.id,
      riskLabel: apiData.prediction.label,
      probability: apiData.prediction.probability_fgr,
      narrativeExplanation: apiData.narrative.explanation,
      narrativeRecommendation: apiData.narrative.recommendation,
    });

    // 4. Insert Top 5 Fitur SHAP ke Database
    if (apiData.xai?.shap?.top_features) {
      const shapInserts = apiData.xai.shap.top_features.slice(0, 5).map((feat: any) => ({
        assessmentId: newAssessment.id,
        featureName: feat.feature,
        featureValue: parseFloat(feat.value) || 0,
        shapValue: feat.shap_value,
        direction: feat.direction,
        rankOrder: feat.rank,
      }));
      
      await db.insert(shapExplanations).values(shapInserts);
    }

    // 5. Insert DiCE Counterfactuals
    // Struktur API: xai.counterfactual.scenarios[*].changes = { featureName: { from, to } }
    const diceScenarioData = apiData.xai?.counterfactual?.scenarios ?? [];
    for (const scenario of diceScenarioData) {
      const [newScenario] = await db.insert(diceScenarios).values({
        assessmentId: newAssessment.id,
        scenarioNumber: scenario.scenario_id,
        newProbabilityFgr: scenario.new_probability_fgr,
        riskReductionPct: scenario.risk_reduction_pct,
      }).returning({ id: diceScenarios.id });

      // changes adalah object: { HEMOGLOB: {from: 4.0, to: 12.3}, ... }
      if (scenario.changes && newScenario?.id) {
        const changeInserts = Object.entries(scenario.changes).map(
          ([featureName, change]: [string, any]) => ({
            scenarioId: newScenario.id,
            featureName,
            originalValue: change.from,
            newValue: change.to,
          })
        );
        if (changeInserts.length > 0) {
          await db.insert(diceChanges).values(changeInserts);
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Data rekam medis berhasil disimpan ke Turso DB!' });

  } catch (error: any) {
    console.error('Error saving to Turso:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
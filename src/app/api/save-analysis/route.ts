import { NextResponse } from 'next/server';
import { db } from '../../../db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formData, apiData, editId } = body;

    let guestUser = await db.users.findUnique({ where: { email: 'guest@axara.com' } });
    if (!guestUser) {
      guestUser = await db.users.create({
        data: {
          email: 'guest@axara.com',
          name: 'Guest User',
        },
      });
    }

    const rmNumber = `RM-${Date.now()}`;

    await db.$transaction(async (tx) => {
      if (editId) {
        const oldPatientId = parseInt(editId, 10);
        if (!isNaN(oldPatientId)) {
          await tx.patients.delete({ where: { id: oldPatientId } }).catch(() => {});
        }
      }

      const newPatient = await tx.patients.create({
        data: {
          patient_name: formData.nama_ibu || 'Anonim',
          father_name: formData.nama_ayah || null,
          date_of_birth: new Date('1990-01-01'),
          medical_record_number: rmNumber,
          users: { connect: { id: guestUser.id } },
        },
      });

      const newAssessment = await tx.assessments.create({
        data: {
          patients: { connect: { id: newPatient.id } },
          mage: Number(formData.mage) || 0,
          fage: Number(formData.fage) || 0,
          gained: parseFloat(formData.gained) || 0,
          hemoglob: parseFloat(formData.hemoglob) || 0,
          cignum: Number(formData.cignum) || 0,
          drinknum: Number(formData.drinknum) || 0,
          visits: Number(formData.visits) || 0,
          totalp: Number(formData.totalp) || 0,
          bdead: Number(formData.bdead) || 0,
          terms: 1,
          preterm: Number(formData.preterm) || 0,
          pinfant: Number(formData.pinfant) || 0,
          meduc: formData.meduc_raw || 1,
          feduc: formData.feduc_raw || 1,
          marital: Number(formData.marital) || 1,
          racemom: Number(formData.racemom) || 0,
          racedad: Number(formData.racedad) || 0,
          loutcome: Number(formData.loutcome) || 1,
          hispmom: formData.hispmom === 'Y' ? 1 : 0,
          hispdad: formData.hispdad === 'Y' ? 1 : 0,
          rhsen: formData.rhsen ? 1 : 0,
          anemia: formData.anemia ? 1 : 0,
          jantung: formData.jantung ? 1 : 0,
          paru: formData.paru ? 1 : 0,
          diabetes: formData.diabetes ? 1 : 0,
          herpes: formData.herpes ? 1 : 0,
          ginjal: formData.ginjal ? 1 : 0,
          hipertensi_kronis: formData.hipertensi_kronis ? 1 : 0,
          hipertensi_gestasional: formData.hipertensi_gestasional ? 1 : 0,
          eklamsia: formData.eklamsia ? 1 : 0,
          serviks: formData.cervix ? 1 : 0,
          rahim: formData.uterine ? 1 : 0,
          hydram: formData.hydram ? 1 : 0,
        },
      });

      await tx.assessment_results.create({
        data: {
          assessments: { connect: { id: newAssessment.id } },
          risk_label: apiData.prediction.label === 'FGR' ? 'FGR' : 'Non_FGR',
          probability: apiData.prediction.probability_fgr,
          narrative_explanation: apiData.narrative?.explanation || '-',
          narrative_recommendation: apiData.narrative?.recommendation || '-',
        },
      });

      if (apiData.xai?.shap?.top_features) {
        const shapData = apiData.xai.shap.top_features.slice(0, 5).map((feat: any) => ({
          assessment_id: newAssessment.id,
          feature_name: feat.feature,
          feature_value: parseFloat(feat.value) || 0,
          shap_value: feat.shap_value,
          direction: feat.direction === 'increases_risk' ? 'increases_risk' : 'decreases_risk',
          rank_order: feat.rank,
        }));
        await tx.shap_explanations.createMany({ data: shapData });
      }

      const diceScenarioData = apiData.xai?.counterfactual?.scenarios ?? [];
      for (const scenario of diceScenarioData) {
        const newScenario = await tx.dice_scenarios.create({
          data: {
            assessments: { connect: { id: newAssessment.id } },
            scenario_number: scenario.scenario_id,
            new_probability_fgr: scenario.new_probability_fgr,
            risk_reduction_pct: scenario.risk_reduction_pct,
          },
        });

        if (scenario.changes && newScenario.id) {
          const changeInserts = Object.entries(scenario.changes).map(
            ([featureName, change]: [string, any]) => ({
              scenario_id: newScenario.id,
              feature_name: featureName,
              original_value: change.from,
              new_value: change.to,
            })
          );
          if (changeInserts.length > 0) {
            await tx.dice_changes.createMany({ data: changeInserts });
          }
        }
      }
    });

    return NextResponse.json({ success: true, message: 'Data rekam medis berhasil disimpan ke Azure DB!' });
  } catch (error: any) {
    console.error('Error saving to Azure DB:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
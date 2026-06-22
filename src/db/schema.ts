import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// ============================================================================
// 1. TABLE PATIENTS
// ============================================================================
export const patients = sqliteTable('patients', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id'), // Tetap dicatat sebagai referensi ID tanpa hard-FK dulu
  patientName: text('patient_name').notNull(),
  dateOfBirth: text('date_of_birth').notNull(), // Menyimpan tanggal format YYYY-MM-DD
  medicalRecordNumber: text('medical_record_number').notNull().unique(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// ============================================================================
// 2. TABLE ASSESSMENTS (Menampung semua variabel input medis)
// ============================================================================
export const assessments = sqliteTable('assessments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  patientId: integer('patient_id').notNull().references(() => patients.id, { onDelete: 'cascade' }),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  
  // Identitas Orang Tua & Sosioekonomi
  mage: integer('mage').notNull(),
  fage: integer('fage').notNull(),
  gained: real('gained').notNull(),
  hemoglob: real('hemoglob').notNull(),
  cignum: integer('cignum').notNull(),
  drinknum: integer('drinknum').notNull(),
  visits: integer('visits').notNull(),
  totalp: integer('totalp').notNull(),
  bdead: integer('bdead').notNull(),
  terms: integer('terms').notNull(),
  preterm: integer('preterm').notNull(),
  pinfant: integer('pinfant').notNull(),
  meduc: integer('meduc').notNull(),
  feduc: integer('feduc').notNull(),
  marital: integer('marital').notNull(),
  racemom: integer('racemom').notNull(),
  racedad: integer('racedad').notNull(),
  loutcome: integer('loutcome').notNull(),
  hispmom: text('hispmom').notNull(),
  hispdad: text('hispdad').notNull(),
  rhsen: integer('rhsen').notNull(),
  
  // Riwayat Penyakit & Kondisi Klinis Ibu
  anemia: integer('anemia').notNull(),
  jantung: integer('jantung').notNull(),
  paru: integer('paru').notNull(),
  diabetes: integer('diabetes').notNull(),
  herpes: integer('herpes').notNull(),
  ginjal: integer('ginjal').notNull(),
  hipertensiKronis: integer('hipertensi_kronis').notNull(),
  hipertensiGestasional: integer('hipertensi_gestasional').notNull(),
  eklamsia: integer('eklamsia').notNull(),
  serviks: integer('serviks').notNull(),
  rahim: integer('rahim').notNull(),
  hydram: integer('hydram').notNull(),
});

// ============================================================================
// 3. TABLE ASSESSMENT_RESULTS (Hasil utama model AI + Gemini)
// ============================================================================
export const assessmentResults = sqliteTable('assessment_results', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  assessmentId: integer('assessment_id').notNull().references(() => assessments.id, { onDelete: 'cascade' }),
  riskLabel: text('risk_label').notNull(), // FGR / Non-FGR
  probability: real('probability').notNull(),
  narrativeExplanation: text('narrative_explanation'),
  narrativeRecommendation: text('narrative_recommendation'),
});

// ============================================================================
// 4. TABLE SHAP_EXPLANATIONS (Daftar kontribusi fitur XAI)
// ============================================================================
export const shapExplanations = sqliteTable('shap_explanations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  assessmentId: integer('assessment_id').notNull().references(() => assessments.id, { onDelete: 'cascade' }),
  featureName: text('feature_name').notNull(), // e.g., HEMOGLOB
  featureValue: real('feature_value').notNull(),
  shapValue: real('shap_value').notNull(),
  direction: text('direction').notNull(), // increases_risk / decreases_risk
  rankOrder: integer('rank_order').notNull(), // 1 sampai 10
});

// ============================================================================
// 5. TABLE DICE_SCENARIOS (Skenario alternatif kontrafaktual)
// ============================================================================
export const diceScenarios = sqliteTable('dice_scenarios', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  assessmentId: integer('assessment_id').notNull().references(() => assessments.id, { onDelete: 'cascade' }),
  scenarioNumber: integer('scenario_number').notNull(),
  newProbabilityFgr: real('new_probability_fgr').notNull(),
  riskReductionPct: real('risk_reduction_pct').notNull(),
});

// ============================================================================
// 6. TABLE DICE_CHANGES (Detail modifikasi fitur dari skenario kontrafaktual)
// ============================================================================
export const diceChanges = sqliteTable('dice_changes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  scenarioId: integer('scenario_id').notNull().references(() => diceScenarios.id, { onDelete: 'cascade' }),
  featureName: text('feature_name').notNull(),
  originalValue: real('original_value').notNull(),
  newValue: real('new_value').notNull(),
});
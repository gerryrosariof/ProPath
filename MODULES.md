# ProPath — System Modules

This document describes the functional modules of the ProPath College Program Recommendation System. Each module is presented with a short description, the actors who interact with it, the use cases it fulfills, and the page files that implement it.

---

## 1. Account and Profile Management

**Description.**
This module governs user identity and academic profile data. It handles the creation of user accounts, authentication of existing users, and the collection of a student's academic record — including Senior High School track, strand, grade level, General Weighted Average (GWA), subject-area grades, and target universities. The academic profile serves as one of two primary inputs to the recommendation engine, the other being the career assessment.

**Actors.**
- Student
- Guidance Counselor
- System Administrator

**Use Cases / Functions.**
1. Register a new account with role selection (Student, Guidance Counselor, or System Administrator).
2. Log in to the system using an email address.
3. Log out of the system.
4. View the student dashboard with overall progress tracking (profile, assessment, results).
5. Enter and edit the academic profile (track, strand, grade level, GWA, subject grades, target schools).
6. Save the academic profile and update the completion status on the dashboard.
7. Role-based route protection — restrict access to pages based on the authenticated user's role.

**Implementing Page Files.**
- `src/pages/public/Landing.tsx` — Public landing page with system overview and calls to action.
- `src/pages/public/Login.tsx` — Login form with demo account selection.
- `src/pages/public/Register.tsx` — Registration form with role selection.
- `src/pages/student/StudentDashboard.tsx` — Student dashboard with step-based progress tracking.
- `src/pages/student/AcademicProfile.tsx` — Academic profile entry form with validation.
- `src/components/ProtectedRoute.tsx` — Route guard component enforcing role-based access.
- `src/context/AuthContext.tsx` — Authentication state provider (login, register, logout, profile status).
- `src/context/ProfileContext.tsx` — Academic profile state provider.

---

## 2. Career Assessment

**Description.**
This module administers the five-part career assessment battery. The instruments are: Academic Aptitude Test, Program Aptitude Test, Interest Inventory (RIASEC), Skill Set and College Readiness Survey, and Personality Test (Big Five). Each instrument contains multiple questions presented one at a time. Students can save progress mid-instrument and return to complete it later. The module tracks per-instrument completion status and prevents result generation until all five instruments are submitted.

**Actors.**
- Student

**Use Cases / Functions.**
1. View the assessment hub with an overview of all five instruments and overall progress.
2. Start, continue, or review an individual assessment instrument.
3. Answer multiple-choice and Likert-scale questions presented one at a time.
4. Navigate between questions within an instrument (previous, next, question dots).
5. Save progress within an instrument without submitting.
6. Submit an instrument after all questions are answered.
7. View the assessment confirmation page with per-instrument completion status.
8. Proceed to results only after all five instruments are completed.

**Implementing Page Files.**
- `src/pages/student/AssessmentHub.tsx` — Assessment overview with per-instrument status and progress bar.
- `src/pages/student/TestPlayer.tsx` — Individual question player with navigation and submission.
- `src/pages/student/AssessmentConfirmation.tsx` — Review and confirmation page before results.
- `src/components/assessment/LikertScale.tsx` — Likert-scale response input component.
- `src/context/AssessmentContext.tsx` — Assessment state provider (answers, statuses, completion tracking).
- `src/data/assessments.ts` — Assessment instrument definitions, question sets, options, and trait mappings.

---

## 3. Profile Categorization

**Description.**
This module transforms raw assessment scores and academic record data into a categorized profile. It normalizes raw scores into percentages, applies configurable Low/Average/High thresholds to each attribute, computes the RIASEC top-three code, and categorizes GWA and individual subject grades. The resulting categorized profile is the structured input consumed by the recommendation engine and is also displayed to the student as a visual breakdown.

**Actors.**
- Student
- Guidance Counselor (read-only view of a student's categorized profile)

**Use Cases / Functions.**
1. Compute per-trait scores from raw assessment answers using trait-to-option mappings.
2. Normalize raw scores to percentages using per-instrument maximums.
3. Categorize each attribute as Low, Average, or High using configurable thresholds.
4. Compute the RIASEC top-three interest code from the Interest Inventory scores.
5. Categorize GWA and subject-area grades from the academic profile.
6. Assemble the complete categorized profile structure for downstream consumption.
7. Display the categorized profile visually with bar charts, donut charts, and category badges.
8. Allow threshold adjustments that re-categorize the profile in real time.

**Implementing Page Files.**
- `src/pages/student/ProfileCategory.tsx` — Categorized profile visualization with charts per instrument.
- `src/utils/categorize.ts` — Scoring engine: normalization, categorization, RIASEC computation, and profile assembly.
- `src/data/thresholds.ts` — Default threshold definitions for each instrument and GWA.
- `src/context/ThresholdContext.tsx` — Threshold state provider with update and reset capabilities.
- `src/components/charts/BarChart.tsx` — Bar chart component for score visualization.
- `src/components/charts/DonutChart.tsx` — Donut chart component for RIASEC code visualization.

---

## 4. C4.5 Engine

**Description.**
This module encapsulates the C4.5 decision tree model used to generate program recommendations. It manages the training dataset, model training configuration (confidence factor and minimum instances per leaf), model evaluation metrics (accuracy, confusion matrix, per-program precision/recall/F1), and the resulting decision tree structure and extracted classification rules. The module presents these elements to the administrator for inspection and retraining. The decision tree and rules form the inference model that maps a categorized student profile to a recommended college program.

**Actors.**
- System Administrator

**Use Cases / Functions.**
1. View the historical training dataset in a searchable, filterable table.
2. Upload additional training data via CSV (simulated in the prototype).
3. Configure C4.5 pruning parameters (confidence factor, minimum instances per leaf).
4. Train (or retrain) the decision tree model from the training dataset.
5. View model evaluation results: overall accuracy, correct/total predictions, and number of decision rules.
6. Inspect the confusion matrix showing predicted versus actual program assignments.
7. Inspect per-program precision, recall, and F1 scores.
8. View the trained decision tree structure in a visual tree viewer.
9. View extracted if-then decision rules with confidence and coverage values.

**Implementing Page Files.**
- `src/pages/admin/TrainingData.tsx` — Training data table with search, filters, and CSV upload modal.
- `src/pages/admin/ModelPage.tsx` — Model training configuration, execution, and evaluation results display.
- `src/pages/admin/DecisionTreeViewer.tsx` — Visual decision tree viewer and extracted rules.
- `src/data/model.ts` — Training records, model results, decision tree structure, decision rules, and program list.

---

## 5. Recommendation and Explanation

**Description.**
This module produces ranked college program recommendations from a student's categorized profile and presents them with transparent, confidence-based explanations. For each recommended program, the module displays the confidence score, a plain-language reason, a step-by-step decision path showing how the C4.5 model classified the student, and associated career outcomes. The explanation is designed to be readable by both students and guidance counselors, with a clear disclaimer that the recommendation guides rather than replaces professional counseling.

**Actors.**
- Student
- Guidance Counselor (read-only view of a student's recommendations and explanations)

**Use Cases / Functions.**
1. Generate ranked program recommendations from the categorized profile using the decision model.
2. Display a profile summary alongside the recommendations (GWA, RIASEC code, key strengths, subject performance).
3. Show the top five recommendations with rank, program name, field, confidence percentage, and plain-language reason.
4. Open a detailed explanation page for any single recommendation.
5. Present the decision path as a visual step-by-step flow with attribute, value, and explanation per step.
6. Display career outcomes associated with each recommended program.
7. Navigate between recommendation explanations (previous and next ranks).
8. Print or save the results page and individual explanation pages as PDF.

**Implementing Page Files.**
- `src/pages/student/Results.tsx` — Ranked recommendations list with profile summary and print support.
- `src/pages/student/ProgramExplanation.tsx` — Per-recommendation explanation with decision path and career outcomes.
- `src/data/recommendations.ts` — Recommendation data including rank, confidence, reason, decision path, and career outcomes.
- `src/data/programs.ts` — College program catalog with descriptions, strand requirements, and career paths.

---

## 6. Counselor

**Description.**
This module provides guidance counselors with tools to monitor student progress, review individual student profiles, and examine program recommendations assigned to each student. The counselor views are read-only; they do not allow modification of student data or recommendations. The module surfaces aggregate statistics (total students, completion rates, results generated) and a searchable, filterable student list. From the student list, the counselor can drill into an individual student's categorized profile and recommendation explanations.

**Actors.**
- Guidance Counselor

**Use Cases / Functions.**
1. View the counselor dashboard with aggregate student statistics and completion rates.
2. View recent assessment completions across the caseload.
3. Search and filter the student list by name, email, track, strand, and completion status.
4. View an individual student's read-only profile summary including academic record, RIASEC code, and categorized assessment scores.
5. View a student's ranked program recommendations.
6. Open the program explanation page for a specific student and recommendation rank.
7. View the decision path and career outcomes for a student's recommendation.

**Implementing Page Files.**
- `src/pages/counselor/CounselorDashboard.tsx` — Counselor overview with statistics and recent completions.
- `src/pages/counselor/CounselorStudentList.tsx` — Searchable, filterable student list table.
- `src/pages/counselor/CounselorStudentProfile.tsx` — Read-only student profile with categorized scores and recommendations.
- `src/pages/counselor/CounselorProgramExplanation.tsx` — Read-only program explanation for a specific student.
- `src/data/users.ts` — Seed student and managed user data used in counselor views.

---

## 7. Administration and Model Management

**Description.**
This module provides system administrators with tools to manage the program catalog, assessment items, user accounts, and system-wide configuration. It also encompasses the C4.5 model management workflow (training data, model training, decision tree inspection) described in Module 4, presented here from the administrative perspective. The administrator dashboard surfaces system-wide statistics and quick-action links to all management pages.

**Actors.**
- System Administrator

**Use Cases / Functions.**
1. View the administrator dashboard with system-wide statistics (users, programs, training records, assessment items) and quick-action links.
2. Manage the college program catalog (add, edit, and view programs with descriptions and strand requirements).
3. Manage assessment items per instrument (view and edit questions, options, and trait mappings).
4. Manage user accounts (view, add, edit, and disable users).
5. Configure system-wide threshold settings for score categorization.
6. Access training data management, model training, and decision tree viewing (covered in Module 4).

**Implementing Page Files.**
- `src/pages/admin/AdminDashboard.tsx` — Administrator overview with statistics and quick-action links.
- `src/pages/admin/ProgramCatalog.tsx` — College program catalog management.
- `src/pages/admin/AssessmentItemManagement.tsx` — Assessment question and option management per instrument.
- `src/pages/admin/UserManagement.tsx` — User account management.
- `src/pages/admin/AdminSettings.tsx` — Threshold configuration and system settings.
- `src/pages/admin/TrainingData.tsx` — Training data management (shared with Module 4).
- `src/pages/admin/ModelPage.tsx` — Model training and evaluation (shared with Module 4).
- `src/pages/admin/DecisionTreeViewer.tsx` — Decision tree and rules viewer (shared with Module 4).
- `src/data/programs.ts` — Program catalog data.
- `src/data/assessments.ts` — Assessment instrument and question data.
- `src/data/users.ts` — Managed user and student data.
- `src/data/thresholds.ts` — Default threshold configuration data.

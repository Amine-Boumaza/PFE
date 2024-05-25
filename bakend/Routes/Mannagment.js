import express from "express";
import { GetAllTeams, GetAllRapports } from "../Controllers/Mannagment.js";
import {
  GetCoachData,
  PlayersList,
  AddRapport,
  GetTeams,
  GetTrainingSessions,
  GetTrainingSessionsWeakly,
  AddInjuryRapport,
} from "../Controllers/Coach.js";
import { GetTenents, NmbrAdmins } from "../Controllers/Admin.js";
import {
  GetInjuryRapports,
  AddMedicalForm,
  GetDoctorData,
} from "../Controllers/Doctor.js";
import {
  VerifyToken,
  GetTransections,
  AddTransections,
} from "../Controllers/FinnanceMannager.js";
import { player } from "../Controllers/Player.js";

const router = express.Router();
// Coach Links
router.get("/coach/data", GetCoachData); // done
router.get("/coach/list", PlayersList); // done
router.post("/coach/Rapport", AddRapport);
router.post("/coach/InjuryRapport", AddInjuryRapport);
router.get("/coach/Teams", GetTeams); // done
router.get("/coach/Sessions", GetTrainingSessions); //done
router.get("/coach/SessionsWeak", GetTrainingSessionsWeakly);
//Admin Links
router.post("/admin/nbadmins", NmbrAdmins);
router.post("/admin/gettenents", GetTenents);

//Doctor Links
router.get("/doctor/data", GetDoctorData); // done
router.get("/doctor/injuryrapports", GetInjuryRapports); // done
router.post("/doctor/addmedicalform", AddMedicalForm);
//Finnance Links
router.get("/finance/VerifyToken", VerifyToken); // done
router.get("/finance/transections", GetTransections); // done
router.post("/finance/addtransections", AddTransections);
//mannager Links
router.get("/mannager/VerifyToken", VerifyToken);
router.get("/mannager/GetAllTeams", GetAllTeams);
router.get("/mannager/GetAllRapports", GetAllRapports);
router.post("/mannager/Add"); // a discuter

//Player Links
router.get("/player/info", player); // done

export default router;

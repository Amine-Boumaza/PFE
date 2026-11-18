import express from "express";
import {
  GetAllTeams,
  GetAllRapports,
  GetUsersN,
  GetTeamsN,
  GetTeamsPlayers,
  GetCoaches,
  AddTeam,
  AddPlayer,
  EditTeam,
  UpdatePlayer,
  DeleteTeam,
  DeletePlayer,
  GetAllSessions,
  EditSession,
  GetRapports,
  EditRapport,
  AddSession,
  GetAttendence,
  DeleteSession,
} from "../Controllers/Mannagment.js";
import {
  GetCoachData,
  PlayersList,
  GetTeams,
  GetTrainingSessions,
  GetTrainingSessionsWeakly,
  AddInjuryRapport,
  GetCoachTeamsN,
  PlayersNB,
  GetCoachSessions,
  GetTeamBySID,
  AddSessionRapport,
} from "../Controllers/Coach.js";
import {
  GetTenents,
  NmbrAdmins,
  GetAllUsers,
  NmbrUsers,
  NmbrTenants,
  AddPlayers,
} from "../Controllers/Admin.js";
import {
  GetDoctorData,
  FormResponse,
  GEtForms,
} from "../Controllers/Doctor.js";
import {
  VerifyToken,
  GetTransactions,
  GetNBTransections,
  GetNBImports,
  GetNBExports,
  GetImports,
  GetExports,
  EditTransactions,
  AddTransactions,
} from "../Controllers/FinnanceMannager.js";
import { player } from "../Controllers/Player.js";

const router = express.Router();
// Coach Links
router.get("/coach/data", GetCoachData); // done
router.get("/coach/GetTeamsNb", GetCoachData);
router.get("/coach/GetPlayersNB", PlayersNB);
router.get("/coach/list", PlayersList); // done
router.post("/coach/AddRapport", AddSessionRapport);
router.post("/coach/InjuryRapport", AddInjuryRapport);
router.get("/coach/Teams", GetTeams);
router.get("/coach/TeamsNB", GetCoachTeamsN); // done
router.get("/coach/Sessions", GetTrainingSessions);
router.get("/coach/GetCoachSessions", GetCoachSessions);
router.get("/coach/GetTeamsBySID", GetTeamBySID); //done
router.get("/coach/SessionsWeak", GetTrainingSessionsWeakly);
//Admin Links
router.get("/admin/NbAdmins", NmbrAdmins);
router.get("/admin/GetTenents", GetTenents);
router.get("/admin/GetNbTenents", NmbrTenants);
router.get("/admin/GetNbUsers", NmbrUsers);
router.get("/admin/GetUsers", GetAllUsers);
router.post("/admin/AddPlayer", AddPlayer);

//Doctor Links
router.get("/doctor/data", GetDoctorData); // done
router.get("/doctor/injuryrapports", FormResponse);
router.get("/doctor/Forms", GEtForms); // done

//Finnance Links
router.get("/finance/VerifyToken", VerifyToken); // done
router.get("/finance/GetExports", GetExports);
router.get("/finance/GetImports", GetImports);
router.get("/finance/NBtransections", GetNBTransections); // done
router.get("/finance/GetImportsVal", GetNBImports);
router.get("/finance/GetExportsVal", GetNBExports);
router.get("/finance/GetTransactions", GetTransactions);
router.post("/finance/AddTransactions", AddTransactions);
router.put("/finance/EditTransactions", EditTransactions);
//mannager Links
router.get("/mannager/VerifyToken", VerifyToken);
router.get("/mannager/GetAllTeams", GetAllTeams);
router.get("/mannager/GetAllSessions", GetAllSessions); //done used
router.get("/mannager/GetAllRapports", GetAllRapports); //done used
router.get("/mannager/GetRapport", GetRapports);
router.get("/mannager/GetUsersNb", GetUsersN);
router.get("/mannager/GetTeamsNb", GetTeamsN);
router.get("/mannager/GetTeamsPlayers", GetTeamsPlayers);
router.get("/mannager/GetCoaches", GetCoaches);
router.get("/mannager/GetAttenance", GetAttendence);
router.post("/mannager/AddTeams", AddTeam);
router.post("/mannager/AddPlayer", AddPlayer);
router.post("/mannager/AddSession", AddSession);
router.delete("/mannager/DeleteTeam", DeleteTeam);
router.delete("/mannager/DeleteSession", DeleteSession);
router.delete("/mannager/DeletePlayer", DeletePlayer);

router.put("/mannager/EditPlayer", UpdatePlayer);
router.put("/mannager/EditTeam", EditTeam);
router.put("/mannager/EditRapport", EditRapport);
router.put("/mannager/EditSession", EditSession); // a discuter

//Player Links
router.get("/player/info", player); // done

export default router;

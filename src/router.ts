import * as express from "express";
import CompanyController from "./controllers/CompanyController";

const router = express.Router()

router.get('/company', CompanyController.getCompanies)
router.get('/company/:companyId', CompanyController.getCompanyById)
router.post('/company', CompanyController.addCompany)
router.put('/company/:companyId', CompanyController.updateCompany)
router.delete('/company/:companyId', CompanyController.deleteCompany)

export default router

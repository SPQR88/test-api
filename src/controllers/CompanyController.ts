import {Request, Response} from "express";
import { getConnection, getManager } from 'typeorm';
import { Company } from "../entity/Company";
import BaseController from "./BaseController";

class CompanyController extends BaseController {
    constructor() {
        super();
    }

    public async getCompanies (req: Request, res: Response) {
        let companies = await getManager().find(Company)

        return this.Ok(res, companies)
    }

    public async getCompanyById (req: Request, res: Response) {
        let company = await getConnection().manager.findOne(Company, req.params.companyId)

        if (company) {
            return this.Ok(res, company)
        } else {
            return this.NotFound(res)
        }
    }

    public async addCompany(req: Request, res: Response) {
        let request = req.body;

        let company = new Company();
        company.title = request.title;
        await company.setServices(request.services)

        await getConnection().manager.save(company)

        return this.Ok(res, {message: "Company was added"})
    }

    public async updateCompany(req: Request, res: Response) {
        let request = req.body;

        let company: Company = await getConnection().manager.findOne(Company, req.params.companyId)

        if (company) {
            company.title = request.title;
            await company.setServices(request.services)

            await getConnection().manager.save(company)

            return this.Ok(res, company)
        } else {
            return this.NotFound(res)
        }
    }

    public async deleteCompany (req: Request, res: Response) {
        let company: Company = await getConnection().manager.findOne(Company, req.params.companyId)

        if (company) {
            await company.setServices([])
            await getConnection().manager.remove(company/*, {id: req.params.companyId}*/);

            return this.Ok(res, {message: "Company was deleted"})
        } else {
            return this.NotFound(res)
        }
    }
}

export default new CompanyController()

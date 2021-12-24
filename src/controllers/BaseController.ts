import {Response} from "express";

class BaseController {
    constructor() {
        // Get all defined class methods
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));

        // Bind all methods
        methods
            .filter(method => (method !== 'constructor'))
            .forEach((method) => { this[method] = this[method].bind(this); });
    }

    public Ok (res: Response, data) {
        return res.status(200).json({
            success: true,
            data
        })
    }

    public NotFound (res: Response) {
        return res.status(404).json({
            success: false
        })
    }

    public BadRequest (res: Response, message) {
        return res.status(400).json({
            success: false,
            message
        })
    }
}

export default BaseController

import { ReactElement, JSXElementConstructor } from "react";
import { IModule } from "../types";
import { RouteObject } from "react-router-dom";

export class EGTModule implements IModule {
    name = "egt"

    getCompetitionRoutes(): RouteObject[] {
        return []
    }

    renderMenu(): ReactElement<any, string | JSXElementConstructor<any>>[] {
        return []
    }
}

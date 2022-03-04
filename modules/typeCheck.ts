import { mmFetchGraphReturn } from "./types"
export default class mmTypeCheck {

    public static isGraphReturn = (data: Object): data is mmFetchGraphReturn => {
            return data.hasOwnProperty("keys") && data.hasOwnProperty("values");
    }

}
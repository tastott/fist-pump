import { Spectacle } from "../../../models/spectacle";
import { KeyedItem } from "./keyed";
export interface AppState {
    Spectacles: Array<Spectacle & KeyedItem>;
}

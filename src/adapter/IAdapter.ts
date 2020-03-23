import { IItemMeta } from "../interface/IItemMeta";

export interface IAdapter{
    set: (itemMeta: IItemMeta) => Promise<string | undefined>
    read: (itemMeta: IItemMeta) => Promise<object| undefined>
    destroy: (itemMeta: IItemMeta) => Promise<string | undefined>
    has: (itemMeta: IItemMeta) => Promise<boolean>
    close: () => Promise<void>
}
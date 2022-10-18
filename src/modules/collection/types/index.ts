import { IQueryResult } from "@/lib/graphql/hooks/cw721/useQueryCw721Info";

type _Data = NonNullable<IQueryResult['data']>
export interface ICollection extends _Data {
    address: string;
}
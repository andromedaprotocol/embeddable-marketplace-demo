import { IQueryResult } from "@/lib/graphql/hooks/cw721/useQueryCw721Token";

type _Data = NonNullable<IQueryResult['data']>
export interface IToken extends _Data {
}
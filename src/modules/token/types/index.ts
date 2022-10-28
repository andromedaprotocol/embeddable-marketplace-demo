import { IQueryResult } from "@/lib/graphql/hooks/collection/useGetToken";

type _Data = NonNullable<IQueryResult['data']>
export interface IToken extends _Data {
}
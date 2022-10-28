import { IQueryResult } from "@/lib/graphql/hooks/collection/useGetCollection";

type _Data = NonNullable<IQueryResult['data']>
export interface ICollection extends _Data {
    address: string;
}
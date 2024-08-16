import { IExchangeCollection } from "@/lib/app/types";
import { Flex } from "@chakra-ui/react";
import React, { ChangeEvent, FC, useState } from "react";
import ExchangeIntro from "./ExchangeIntro";
import ExchangeCard from "./ExchangeCard";

interface Props {
    collection: IExchangeCollection;
}

const ExchangePage: FC<Props> = (props) => {
    const { collection } = props;
    
    const [nativeAmount, setNativeAmount] = useState(0);
    const handleAndrInput = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value ? parseInt(e.currentTarget.value) : 0;
        if (value >= 0) {
            setNativeAmount(value);
        }
    }
    
    return (
        <Flex direction="row" justify={"space-between"} data-testid="exchange-page">
            <ExchangeIntro cw20={collection.cw20} data-testid="exchange-intro" />
            <ExchangeCard
                handleAndrInput={handleAndrInput}
                nativeAmount={nativeAmount}
                exchange={collection.exchange}
                cw20={collection.cw20}
                data-testid="exchange-card"
            />
        </Flex>
    )
}

export default ExchangePage;

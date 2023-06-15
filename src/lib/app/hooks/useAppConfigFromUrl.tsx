import { APP_ENV } from "@/appEnv";
import { useGetPrimitiveValue } from "@/lib/graphql/hooks/primitive/useGetValue";
import { parseEmbeddableUrl } from "@/utils/config";
import { SESSION_KEYS, setSessionStorage } from "@/utils/storage";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { IConfig } from "../types";

export const useAppConfigFromUrl = () => {
    const router = useRouter();
    const [configState, setConfigState] = useState<IConfig>();

    // Get Config uri from url
    const configUri = useMemo(() => {
        return router.query.config as string ?? Object.keys(APP_ENV.EXAMPLES_MAP)[0];
    }, [router.query])

    const { primitive, key } = useMemo(() => {
        if (configUri in APP_ENV.EXAMPLES_MAP) {
            return {
                primitive: APP_ENV.EXAMPLES_MAP[configUri].primitive,
                key: APP_ENV.EXAMPLES_MAP[configUri].key
            };
        }
        if (configUri.startsWith('(')) return {};
        const [primitive, key] = configUri.split('--');
        return { primitive, key }
    }, [configUri])

    const { data: primitiveValue } = useGetPrimitiveValue(primitive ?? '', key, !primitive);

    useEffect(() => {
        try {
            setSessionStorage(SESSION_KEYS.CONFIG_URI, configUri);
            let _config = configState;
            if (primitive) {
                if (!primitiveValue) return;
                console.log(primitiveValue, "PRIMITIVE")
                _config = JSON.parse(primitiveValue.value.string)
            } else {
                // TODO: Check if url is contract address or json url
                _config = parseEmbeddableUrl(configUri);
            }
            setConfigState(_config);
        } catch (err) {
            console.log(err)
        }
    }, [configUri, primitiveValue, primitive])

    return { configState }
}
import { Provider } from "@ethersproject/providers";

export type StartEndDelayConstructParams = {
    start?: string | number,
    end?: string | number,
    delay?: string,
    provider: Provider
}

const startEndDelayHelper = async ({start, end, delay, provider}: StartEndDelayConstructParams) => {

    if(delay) {
        const block = await provider.getBlock("latest");
        return {
            start: block.timestamp,
            end: block.timestamp + (3600 * 24 * parseInt(delay))
        }
    } else if (start === undefined || end === undefined) {
        throw Error("You must specify one of the options: --delay or --start && --end");
    }

    return {
        start,
        end
    }
}

export default startEndDelayHelper;
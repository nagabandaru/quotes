

export const PERIODS = Object.freeze({
    MONTHLY:   Symbol("MONTHLY"),
    ANNUAL:  Symbol("ANNUAL")
});

export const periodHumanReadable = {
    [PERIODS.MONTHLY]: "per month",
    [PERIODS.ANNUAL]: "per annum"
}
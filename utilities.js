export async function convertStringToNumber(str) {
    return Number((await str.innerText()).replace("$", ""));
}

    // const totalValueNumber = Number(
    //   (await this.totalValue.innerText()).replace("$", "")
    // );
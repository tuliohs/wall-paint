import sides from "../constants/config/sides"

export const calculaQuantidadeTinta = (tamanho) => {
    let front = tamanho[sides.front].width * tamanho[sides.front].width
    let back = tamanho[sides.back].width * tamanho[sides.back].width
    let right = tamanho[sides.right].width * tamanho[sides.right].width
    let left = tamanho[sides.left].width * tamanho[sides.left].width
    let soma = left + back + right + front

    let latas18 = Math.trunc(soma / 18)
    let litrosContabilizados = latas18 * 18

    let latas3_5 = Math.trunc((soma - litrosContabilizados) / 3.5)
    litrosContabilizados += latas3_5 * 3.5

    let latas2_5 = Math.trunc((soma - litrosContabilizados) / 2.5)
    litrosContabilizados += latas2_5 * 2.5

    let latas0_5 = Math.trunc((soma - litrosContabilizados) / 2.5)
    litrosContabilizados += latas0_5 * 2.5

    return {
        soma: soma,
        latas18: latas18,
        latas3_5: latas3_5,
        latas2_5: latas2_5,
        latas0_5: latas0_5,
        toString: "18 L ➡️" + latas18 +
            "   3,5 L ➡️" + latas3_5 +
            "   2,5 L ➡️" + latas2_5 +
            "   0,5 L ➡️" + latas0_5
    }
}
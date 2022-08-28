import { useEffect, useState } from "react"

const getRandBetween = (maxNum: number) => Math.floor(Math.random() * maxNum)

const tiltStyle = {
    left: "hover:-rotate-2 hover:translate-y-1",
    neutral: "hover:rotate-0 hover:translate-y-0.5",
    right: "hover:rotate-2 hover:translate-y-1",
}
type TiltType = keyof typeof tiltStyle
const characterStyle = {
    first: "capitalize transition hover:scale-110",
    rest: "transition hover:scale-110",
}
type TailwindFontSizeType =
    | "text-5xl"
    | "text-4xl"
    | "text-3xl"
    | "text-2xl"
    | "text-xl"
interface ColorTitleProps {
    title: string
    hex: string
    size: TailwindFontSizeType
}
function ColorTitle({ title, hex, size }: ColorTitleProps) {
    const titleLength = title.length

    const [focusNum, setFocusNum] = useState(titleLength + 1)
    const [tilte, setTilte] = useState<TiltType>("neutral")
    useEffect(() => {
        setFocusNum(getRandBetween(titleLength))
    }, [titleLength])

    useEffect(() => {
        const isEven = titleLength % 2 === 0
        const mid = titleLength / 2
        const focusLocation = focusNum + 1
        switch (isEven) {
            case true:
                if (focusLocation <= mid) setTilte("left")
                else setTilte("right")
                return
            case false:
                if (focusLocation < mid) setTilte("left")
                else if (focusLocation === mid) setTilte("neutral")
                else setTilte("right")
                return
            default:
                return
        }
    }, [focusNum, titleLength])

    return (
        <div
            className={`${tiltStyle[tilte]} ${size} py-4 truncate font-bold flex flex-row select-none transition`}
        >
            {title.split("").map((character, index) => {
                const isFirstCharacter = index === 0
                if (index === focusNum)
                    return (
                        <p
                            key={character + index}
                            className={
                                isFirstCharacter
                                    ? characterStyle.first
                                    : characterStyle.rest
                            }
                            style={{
                                color: hex,
                            }}
                            onPointerEnter={() => setFocusNum(index)}
                        >
                            {character}
                        </p>
                    )
                return (
                    <p
                        key={character + index}
                        className={
                            isFirstCharacter
                                ? characterStyle.first
                                : characterStyle.rest
                        }
                        onPointerEnter={() => setFocusNum(index)}
                    >
                        {character}
                    </p>
                )
            })}
        </div>
    )
}

export default ColorTitle
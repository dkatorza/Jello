import CheckIcon from '@material-ui/icons/Check';

export function ColorPalette({ handleChange, selectedColor, isGradient, isColor, count }) {

    const colorCodes = [
        {
            'color': '#61bd4f',
            'hover': '#519839'
        },
        {
            'color': '#f2d600',
            'hover': '#d9b51c'
        },
        {
            'color': '#ff9f1a',
            'hover': '#cd8313'
        },
        {
            'color': '#eb5a46',
            'hover': '#b04632'
        },
        {
            'color': '#c377e0',
            'hover': '#89609e'
        },
        {
            'color': '#0079bf',
            'hover': '#055a8c'
        },
        {
            'color': '#00c2e0',
            'hover': '#0098b7'
        },
        {
            'color': '#51e898',
            'hover': '#4bbf6b'
        },
        {
            'color': '#ff78cb',
            'hover': '#c9558f'
        },
        {
            'color': '#344563',
            'hover': '#091e42'
        }
    ]


    const gradientStyles = [
        {
            'color': 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)'
        },
        {
            'color': 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)'
        },
        {
            'color': 'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)'
        },
        {
            'color': 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)'
        },
        {
            'color': 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)'
        },
        {
            'color': 'linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)'
        }
    ]

    function getStyles() {
        const styles = isGradient ? gradientStyles : colorCodes
        return count ? styles.slice(0, count) : styles
    }

    return <div className="color-palette">
        {getStyles().map(colorCode => {
            return <label key={colorCode.color} className="flex align-center justify-center" style={{ background: colorCode.color }} name="label-color" htmlFor={`color-${colorCode.color}`}>
                <input type="radio" data-hover={colorCode.hover} name="color" id={`color-${colorCode.color}`} value={colorCode.color} onClick={handleChange} />
                {selectedColor === colorCode.color && <CheckIcon key={colorCode.color} style={{ width: '16px', height: '16px', color: 'white' }} />}
            </label>
        })}


    </div>
}
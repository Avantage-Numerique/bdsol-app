import chroma from 'chroma-js';


export const defaultColor = "black";

export const colorDict = {
    skills: "teal",
    occupations:"blue",
    technologies:"green",
    domains:"purple"
}

export const getColor = (data, chromatise=false) => {
    let color =  defaultColor;
    if (data.type === "Taxonomy"){
        color = colorDict[data.category] ?? defaultColor;
    }
    if (data.type === "Person"){
        color = defaultColor;
    }
    if (data.type === "Organisation"){
        color = defaultColor;
    }
    if (data.type == "Event"){
        color = defaultColor;
    }
    return chromatise ? chroma(color) : color;
}

export const selectStyle = () => {

    const control = { control: (styles, state) => ({ 
        ...styles,
        border: state.isFocused ? 0 : 0,
        // This line disable the blue border
        boxShadow: state.isFocused ? 0 : 0,
        '&:hover': {
           border: state.isFocused ? 0 : 0
        },
        //backgroundColor: 'white' 
    }) };

    const option = { 
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = data.color ? chroma(data.color) : chroma(defaultColor);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                    ? data.category
                    : isFocused
                    ? color.alpha(0.1).css()
                    : undefined,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                    ? chroma.contrast(color, 'white') > 2
                    ? 'white'
                    : 'black'
                    : colorDict[data.category],
                cursor: isDisabled ? 'not-allowed' : 'default',
            
                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                    ? isSelected
                        ? data.color
                        : color.alpha(0.3).css()
                    : undefined,
                },
            };
        }
    };
    
    const multiValue = {
        multiValue: (styles, { data }) => {
            const color = data.color ? chroma(data.color) : chroma(defaultColor);//getColor(data);//chroma(colorDict[data.category]);
            return {
              ...styles,
              backgroundColor: color.alpha(0.1).css(),
            };
        }
    }

    const multiValueLabel = {
        multiValueLabel: (styles, { data }) => {
            return {
                ...styles,
                color: data.color,
            }
        }
    }

    const multiValueRemove = {
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: data.color,
            ':hover': {
                backgroundColor: data.color,
                color: 'white',
            },
        })
    }

    return {
        ...control,
        ...option,
        ...multiValue,
        ...multiValueLabel,
        ...multiValueRemove
    };
}
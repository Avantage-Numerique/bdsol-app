import chroma from 'chroma-js';


export const selectStyle = () => {

    const defaultColor = "black";
  
    const colorDict = {
        skills: "red",
        occupations:"blue",
        technologies:"green",
        domains:"purple"
    }

    const getColor = (data) => {
        if (data.type == "taxonomy"){
            if (data.category){
                return chroma( colorDict[data.category] );
            }
            return chroma(defaultColor)
        }
        if (data.type == "person"){
            return defaultColor;
        }
        if (data.type == "organisation"){
            return defaultColor;
        }

        //if no type, it probably is inputValue with the create option that gets the default color 
        return chroma(defaultColor);
    }

    const control = { control: (styles) => ({ ...styles, backgroundColor: 'white' }) };

    const option = { 
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = getColor(data);
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
            const color = chroma(colorDict[data.category]);
            return {
              ...styles,
              backgroundColor: color.alpha(0.1).css(),
            };
        }
    }

    const multiValueLabel = {
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: colorDict[data.category],
        })
    }

    const multiValueRemove = {
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: colorDict[data.category],
            ':hover': {
                backgroundColor: colorDict[data.category],
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
import chroma from 'chroma-js';


export const selectStyle = () => {
    const colorDict = {
        skills: "red",
        occupations:"blue",
        technologies:"green",
        domains:"purple"
    }

    return {
        control: (styles) => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          const color = chroma("red");
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
        },
        multiValue: (styles, { data }) => {
          const color = chroma(colorDict[data.category]);
          return {
            ...styles,
            backgroundColor: color.alpha(0.1).css(),
          };
        },
        multiValueLabel: (styles, { data }) => ({
          ...styles,
          color: colorDict[data.category],
        }),
        multiValueRemove: (styles, { data }) => ({
          ...styles,
          color: colorDict[data.category],
          ':hover': {
            backgroundColor: colorDict[data.category],
            color: 'white',
          },
        }),
    };    
}
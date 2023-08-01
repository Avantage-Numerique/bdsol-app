import DOMPurify from 'isomorphic-dompurify';

export const sanitizedString = (value) => {
    return DOMPurify.sanitize( value )
}

export default sanitizedString
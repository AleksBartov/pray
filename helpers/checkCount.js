export const checkCount = c => {
    
    const r = /1[1-9]$/.test(c) ? 'имён'
                : /(\d)?1$/.test(c) ? 'имя'
                : /(\d)?[2-4]$/.test(c) ? 'имени' : 'имён';

    return r;
}

